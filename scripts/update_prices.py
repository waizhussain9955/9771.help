#!/usr/bin/env python3
"""
9771.help — Daily fuel price updater (runs via GitHub Actions).

Fetches the latest OGRA-notified petrol & diesel prices from
https://petrolratetoday.pk/ (falls back to pakistanstoday.com.pk),
then updates:
  - index.html   : the 3 price spans, footer "last updated" date,
                   JSON-LD dateModified
  - js/app.js    : LAST_UPDATED (en/ur), "Notified Rate (date)" labels (en/ur)
  - sitemap.xml  : <lastmod>

Exits 0 with NO file changes if the source cannot be parsed or if
nothing changed (the workflow then skips the commit).
"""

import re
import sys
import urllib.request
from datetime import datetime

HEADERS = {"User-Agent": "Mozilla/5.0 (9771.help price updater)"}

URDU_MONTHS = {
    1: "جنوری", 2: "فروری", 3: "مارچ", 4: "اپریل",
    5: "مئی", 6: "جون", 7: "جولائی", 8: "اگست",
    9: "ستمبر", 10: "اکتوبر", 11: "نومبر", 12: "دسمبر",
}

EN_MONTHS_SHORT = ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
                   "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
EN_MONTHS_LONG = ["January", "February", "March", "April", "May", "June",
                  "July", "August", "September", "October", "November", "December"]


def fetch(url, timeout=25):
    req = urllib.request.Request(url, headers=HEADERS)
    with urllib.request.urlopen(req, timeout=timeout) as r:
        return r.read().decode("utf-8", errors="replace")


def textify(html):
    t = re.sub(r"<script[\s\S]*?</script>", " ", html)
    t = re.sub(r"<style[\s\S]*?</style>", " ", t)
    t = re.sub(r"<[^>]+>", "|", t)
    t = re.sub(r"\|+", "|", t)
    return t


def parse_primary(html):
    """petrolratetoday.pk"""
    t = textify(html)
    petrol = re.search(r"Petrol [·•] Nationwide\|Rs\|([\d.]+)\|/L", t)
    diesel = re.search(r"High-Speed Diesel\|Rs\s*([\d.]+)\s*/L", t)
    date = re.search(r"Effective\s*\|?\s*([A-Z]+DAY,\s*[A-Z]+\s*\d{1,2},\s*\d{4})", t)
    if not (petrol and diesel and date):
        return None
    dt = datetime.strptime(date.group(1).title(), "%A, %B %d, %Y")
    return float(petrol.group(1)), float(diesel.group(1)), dt


def parse_fallback(html):
    """pakistanstoday.com.pk fuel prices page"""
    t = textify(html)
    petrol = re.search(r"Petrol \(Premier[^|]*\)\|[^|]*?Rs\.?\s*([\d.]+)", t)
    diesel = re.search(r"High-Speed Diesel[^|]*\)\|[^|]*?Rs\.?\s*([\d.]+)", t)
    date = re.search(r"Effective Date:\s*([A-Z][a-z]+\s*\d{1,2}[^|\d]*\d{4})", t)
    if not (petrol and diesel):
        return None
    dt = None
    if date:
        try:
            dt = datetime.strptime(
                re.sub(r"\s+", " ", date.group(1)).strip(), "%B %d, %Y")
        except ValueError:
            dt = None
    return float(petrol.group(1)), float(diesel.group(1)), dt


def sane(price):
    return price is not None and 150.0 <= price <= 700.0


def main():
    petrol = diesel = eff_date = None
    for name, url, parser in [
        ("primary", "https://petrolratetoday.pk/", parse_primary),
        ("fallback", "https://pakistanstoday.com.pk/business/fuel-prices/"
                     "pakistan-fuel-prices-today-updated-petrol-and-diesel-rates-5/",
         parse_fallback),
    ]:
        try:
            res = parser(fetch(url))
        except Exception as e:  # noqa: BLE001 - scraper must never crash the job
            print(f"[{name}] fetch/parse failed: {e}")
            continue
        if res and sane(res[0]) and sane(res[1]):
            petrol, diesel, eff_date = res
            print(f"[{name}] petrol={petrol} diesel={diesel} date={eff_date}")
            break
        print(f"[{name}] parse incomplete, trying next source")

    if petrol is None:
        print("Could not determine prices from any source - no changes made.")
        return 0

    subsidized = round(petrol - 100.0, 2)
    fmt = lambda v: f"{v:.2f}"  # noqa: E731

    if eff_date:
        en_long = f"{EN_MONTHS_LONG[eff_date.month - 1]} {eff_date.day}, {eff_date.year}"
        en_short = f"{eff_date.day} {EN_MONTHS_SHORT[eff_date.month - 1]} {eff_date.year}"
        ur_date = f"{eff_date.day} {URDU_MONTHS[eff_date.month]} {eff_date.year}"
        iso = eff_date.strftime("%Y-%m-%d")
    else:
        en_long = en_short = ur_date = iso = None

    changed = []

    # ---- index.html ----
    p = "index.html"
    s = open(p, encoding="utf-8").read()
    orig = s
    s = re.sub(r'(price-val-regular">Rs\. )[\d.]+', rf"\g<1>{fmt(petrol)}", s)
    s = re.sub(r'(price-val-subsidized">Rs\. )[\d.]+', rf"\g<1>{fmt(subsidized)}", s)
    s = re.sub(r'(price-val-standard">Rs\. )[\d.]+', rf"\g<1>{fmt(diesel)}", s)
    if en_long:
        s = re.sub(r'(<strong id="last-updated-date">)[^<]+',
                   rf"\g<1>{en_long}", s)
        s = re.sub(r'("dateModified": ")[^"]+', rf"\g<1>{iso}T10:00:00+05:00", s)
    if s != orig:
        open(p, "w", encoding="utf-8").write(s)
        changed.append(p)

    # ---- js/app.js ----
    p = "js/app.js"
    s = open(p, encoding="utf-8").read()
    orig = s
    if en_long:
        s = re.sub(r'(en: ")[A-Z][a-z]+ \d{1,2}, \d{4}(",\n  ur: ")',
                   rf"\g<1>{en_long}\g<2>", s, count=1)
        s = s.replace('ur: "17 اکتوبر 2026"', f'ur: "{ur_date}"')
        # date-stamped price labels (en + ur)
        s = re.sub(r"Notified Rate \(\d{1,2} [A-Z][a-z]{2} \d{4}\):",
                   f"Notified Rate ({en_short}):", s)
        s = re.sub(r"نوٹیفائیڈ قیمت \(\d{1,2} \S+ \d{4}\):",
                   f"نوٹیفائیڈ قیمت ({ur_date}):", s)
    if s != orig:
        open(p, "w", encoding="utf-8").write(s)
        changed.append(p)

    # ---- sitemap.xml ----
    if iso:
        p = "sitemap.xml"
        s = open(p, encoding="utf-8").read()
        orig = s
        s = re.sub(r"<lastmod>\d{4}-\d{2}-\d{2}</lastmod>",
                   f"<lastmod>{iso}</lastmod>", s)
        if s != orig:
            open(p, "w", encoding="utf-8").write(s)
            changed.append(p)

    if changed:
        print("Updated: " + ", ".join(changed))
    else:
        print("Prices already current - no changes made.")
    return 0


if __name__ == "__main__":
    sys.exit(main())
