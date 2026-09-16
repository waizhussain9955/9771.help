/**
 * 9771.help - Production Application Script
 * Features:
 *  - 100% Client-Side Privacy (Zero backend transmission, zero personal data caching)
 *  - Bilingual Support (English ⮂ اردو) with RTL/LTR dynamic handling
 *  - Neutral, verified eligibility phrasing (no unverified claims about SIM or fixed token validity)
 *  - Configurable Province Codes Object with automatic first-letter code injection
 *  - Real-time SMS Generator with DDMMYYYY date parser
 *  - Mobile native SMS deep-linking (iOS & Android compatible) & Desktop fallback modal
 *  - 1-Click "At the Pump" TOK generator
 *  - Interactive Fuel Quota & Savings Calculator (20L vs 30L limits)
 *  - WhatsApp viral sharing link generator
 *  - Toast notifications and modal handlers
 */

// ==========================================================================
// 1. Central Configurations
// ==========================================================================

// Update this date whenever official guidelines are updated
const LAST_UPDATED = {
  en: "September 16, 2026",
  ur: "16 ستمبر 2026"
};

// Configurable Province Codes (First Letter Logic)
// User selects clean province name; code is automatically used in the SMS.
const PROVINCE_CODES = {
  P: { en: "Punjab", ur: "پنجاب" },
  S: { en: "Sindh", ur: "سندھ" },
  K: { en: "Khyber Pakhtunkhwa", ur: "خیبر پختونخوا" },
  B: { en: "Balochistan", ur: "بلوچستان" },
  I: { en: "Islamabad Capital Territory", ur: "اسلام آباد" },
  A: { en: "Azad Jammu & Kashmir", ur: "آزاد کشمیر" },
  G: { en: "Gilgit-Baltistan", ur: "گلگت بلتستان" }
};

// ==========================================================================
// 2. Bilingual Translations Dictionary (English & Urdu)
// ==========================================================================

const TRANSLATIONS = {
  en: {
    // Top disclaimer
    topNoticeBadge: "Independent Guide",
    topNoticeText: "9771.help is an independent informational website and is not affiliated with, operated by, or endorsed by the Government of Pakistan.",
    langSwitchBtn: "اردو میں دیکھیں",

    // Header & Nav
    brandName: "9771.help",
    brandTag: "Petrol Relief Guide",
    navEligibility: "Who Can Apply",
    navSmsTool: "Prepare SMS",
    navVisualGuide: "Visual Examples",
    navVideo: "Video Guide",
    navTokenGuide: "Token Guide",
    navCalculator: "Calculator",
    navFaq: "FAQs",
    navApplyBtn: "Apply via 9771",


    // Hero
    heroPill: "PM Petrol Relief Scheme 2026",
    heroTitlePrefix: "9771 Fuel Quota",
    heroTitleHighlight: "Online Apply 2026",
    heroClarityLead: "Registration is completed by SMS to 9771.",
    heroClaritySub: "This website helps you check eligibility, prepare the exact required SMS message, and learn how to claim your fuel relief without errors.",
    heroBtnPrimary: "📱 Prepare 9771 SMS",
    heroBtnSecondary: "ℹ️ How It Works",
    heroPrivacyBadge: "100% Client-Side: Your CNIC is never collected or stored online.",

    // At the Pump Card (Neutral instruction: request token & present according to official instructions)
    pumpBadge: "At the Petrol Station?",
    pumpTitle: "Already Registered? Need Your Token?",
    pumpDesc: "Before fueling up, send TOK to 9771 to request your token, then present the received token at a participating petrol station according to the latest official instructions.",
    pumpBtnText: "Send TOK to 9771",
    pumpTip: "Present the received token at a participating petrol station according to official instructions.",

    // Section 2: At a Glance
    glanceTag: "Overview",
    glanceTitle: "PM Fuel Relief Scheme 2026 at a Glance",
    glanceDesc: "Key numbers and quotas announced for the targeted petrol relief initiative.",
    stat1Val: "Rs. 100",
    stat1Unit: "/ Litre",
    stat1Label: "Petrol Relief",
    stat1Sub: "Discount applied via SMS token",
    stat2Val: "20",
    stat2Unit: "Litres",
    stat2Label: "2 & 3 Wheelers",
    stat2Sub: "Monthly quota for motorcycles & rickshaws",
    stat3Val: "30",
    stat3Unit: "Litres",
    stat3Label: "Cars up to 800cc",
    stat3Sub: "Monthly quota for eligible small cars",
    stat4Val: "9771",
    stat4Unit: "SMS Code",
    stat4Label: "Official Shortcode",
    stat4Sub: "For registration (REG) & token (TOK)",

    // Section 3: Who Can Apply (Neutral eligibility verification)
    whoTag: "Eligibility",
    whoTitle: "Who Can Apply?",
    whoDesc: "The announced scheme is targeted at eligible non-commercial vehicle owners.",
    bikeTitle: "Motorcycles & Scooters",
    bikeDesc: "Eligible for up to 20 litres per month. Eligibility and registration details are verified through the relevant government systems.",
    rickshawTitle: "Rickshaws",
    rickshawDesc: "Three-wheeler public and private rickshaws registered with provincial excise departments.",
    qingqiTitle: "Qingqi / Chingchi 3-Wheelers",
    qingqiDesc: "Eligible registered loader/passenger 3-wheelers within the 20-litre monthly category.",
    carTitle: "Cars with engine capacity up to 800cc",
    carDesc: "Cars with engine capacity up to 800cc. Eligible for up to 30 litres per month. Eligibility depends on the vehicle records used by the scheme.",
    eligibilityQuota20: "Max 20 Litres / Month",
    eligibilityQuota30: "Max 30 Litres / Month",
    eligibilityNotice: "Important: The announced scheme is targeted at eligible non-commercial users. Eligibility and registration details are verified through the relevant government systems. Check the latest official rules before applying.",

    // Section 4: Interactive SMS Generator
    toolTag: "Interactive Helper",
    toolTitle: "Prepare Your 9771 Registration SMS",
    toolDesc: "Fill in your details below to generate the exact SMS format. We do not store or transmit any information.",
    toolPrivacyPill: "🔒 Client-Side Only: No data is saved or sent to any server.",
    labelCnic: "CNIC Number",
    hintCnic: "13 digits without dashes",
    placeholderCnic: "e.g. 4210112345671",
    labelVehicle: "Vehicle Plate / Number",
    hintVehicle: "Letters and digits",
    placeholderVehicle: "e.g. KHI-1234 or LEB-2022",
    labelProvince: "Province / Region of Registration",
    hintProvince: "Select your region",
    labelDate: "Vehicle Registration Date",
    hintDate: "Format DDMMYYYY",
    terminalTitle: "LIVE SMS PREVIEW",
    terminalTarget: "Send to SMS Shortcode:",
    btnSendSms: "📱 Send SMS to 9771",
    btnCopySms: "📋 Copy SMS",
    btnReset: "Clear Form",
    terminalTip: "Eligibility and registration details are verified through the relevant government systems.",

    // Section 5: Roadmap (Neutral Token Presentation)
    roadTag: "Process",
    roadTitle: "How to Get Your Fuel Token",
    roadDesc: "A simple 4-step walkthrough from initial registration to availing your fuel discount.",
    step1Title: "1. Register via SMS",
    step1Desc: "Send your formatted REG SMS with your CNIC, vehicle number, province code, and registration date to 9771.",
    step1Code: "REG [CNIC] [Vehicle] [Province] [Date]",
    step2Title: "2. Verification Process",
    step2Desc: "Eligibility and registration details are verified through the relevant government systems, followed by an official SMS reply.",
    step2Code: "Official Verification SMS",
    step3Title: "3. Request Token (TOK)",
    step3Desc: "Send TOK to 9771 to request your token before visiting a participating petrol station according to official instructions.",
    step3Code: "Send: TOK → 9771",
    step4Title: "4. Claim Your Relief",
    step4Desc: "Present the received token at a participating petrol station according to the latest official instructions.",
    step4Code: "Rs. 100/L Relief Applied",

    // Visual Infographic Showcase
    infoTag: "Visual Infographic Guide",
    infoTitle: "PM Fuel Relief Scheme 2026 Step-by-Step Poster",
    infoDesc: "Official visual summary of the SMS registration format and fuel token redemption steps.",
    infoCaption: "Official visual infographic guide for 9771 Petrol Relief Scheme 2026.",

    // Visual Guide Examples Section
    visualGuideTag: "Visual Examples & Guides",
    visualGuideTitle: "Understand the Details Before You Send",
    visualGuideDesc: "Visual examples showing where to find your vehicle registration date and how the actual 9771 SMS conversation looks.",
    cardGuideTitle: "Where to Find Vehicle Registration Date",
    cardGuideDesc: "Look at your vehicle Excise Smart Card or registration book. Look specifically for 'Date of Reg' (not 'Card Issue Date'). Format must be DDMMYYYY.",
    smsGuideTitle: "Real Mobile SMS Conversation Example",
    smsGuideDesc: "See how your sent REG & TOK messages and official replies from 9771 will appear in your phone messaging app.",

    // Video Guide Section
    videoTag: "Video Tutorial",
    videoTitle: "Watch: Complete 9771 Step-by-Step Video Guide",
    videoDesc: "Learn how to format your registration message, check your quota, and claim your Rs. 100/litre petrol discount at the pump.",
    videoFallbackText: "Having trouble playing the video? You can watch it directly on YouTube.",
    btnWatchYoutube: "Watch on YouTube ↗",



    // Section 6: Calculator
    calcTag: "Quota Estimator",
    calcTitle: "Understand Your Monthly Fuel Relief",
    calcDesc: "Calculate your maximum possible monthly subsidy. Retail pump prices fluctuate and are not included.",
    calcOpt1Label: "Motorcycle / Rickshaw / 3-Wheeler",
    calcOpt1Sub: "Eligible quota: 20 litres/month",
    calcOpt2Label: "Car with engine capacity up to 800cc",
    calcOpt2Sub: "Eligible quota: 30 litres/month",
    calcQuotaLabel: "Monthly Quota",
    calcReliefLabel: "Relief Rate",
    calcTotalLabel: "Maximum Monthly Relief",
    calcNotice: "Note: Relief calculation is based strictly on the announced Rs. 100/litre subsidy limit. Eligibility depends on the vehicle records used by the scheme.",

    // Section 7: Anti Scam
    scamTitle: "Stay Safe From Fake Registration Websites",
    scamDesc: "Never share your CNIC, OTP, banking PIN, passwords, or fee payments with any website, WhatsApp agent, or caller claiming to register you for this scheme. The Government does not charge any registration fees.",
    scamStrong: "9771.help is an independent educational and registration-assistance guide. We never ask for payments, passwords, or personal submissions.",

    // Section 8: Official Source
    officialBadge: "Designated Official Channel",
    officialTitle: "Verify Latest Information with Official Portal",
    officialDesc: "For official scheme guidelines, rollout updates in your province, and customer support, always consult the Government's designated portal.",
    btnOfficial: "Visit pmfuelrelief.pk →",

    // Section 9: FAQs
    faq1Q: "What is the 9771 fuel relief scheme?",
    faq1A: "The 9771 scheme is a targeted fuel relief program announced by the Government of Pakistan to provide a subsidy of Rs. 100 per litre on petrol for eligible vehicle owners (motorcycles, rickshaws, and cars with engine capacity up to 800cc).",
    faq2Q: "How do I register for the scheme?",
    faq2A: "Registration is done via SMS. You send a formatted message containing 'REG', your 13-digit CNIC (without dashes), vehicle registration number, province code, and vehicle registration date (DDMMYYYY) to the shortcode 9771.",
    faq3Q: "What information do I need to prepare before registering?",
    faq3A: "You need: 1) Your 13-digit CNIC number, 2) Your vehicle registration/plate number, 3) The province or region where the vehicle is registered, and 4) The exact vehicle registration date printed on your excise registration smart card or book.",
    faq4Q: "What exact SMS do I send to 9771?",
    faq4A: "The format is: REG [CNIC] [Vehicle Number] [Province Code] [Registration Date DDMMYYYY]. For example: REG 4210112345671 KHI1234 S 15082020. You can use the free interactive SMS builder on this page to create it automatically.",
    faq5Q: "How do I get the fuel token before visiting the petrol station?",
    faq5A: "Once your initial registration is verified, text 'TOK' to 9771. You will receive an SMS containing an active digital token code that you present at a participating petrol station according to the latest official instructions.",
    faq6Q: "How much relief can motorcycles and rickshaws receive?",
    faq6A: "Eligible motorcycles, scooters, rickshaws, and 3-wheelers receive a quota of up to 20 litres per month. At Rs. 100 per litre discount, this equals up to Rs. 2,000 in monthly relief.",
    faq7Q: "How much relief can eligible 800cc cars receive?",
    faq7A: "Eligible cars with an engine capacity up to 800cc receive a quota of up to 30 litres per month. At Rs. 100 per litre discount, this equals up to Rs. 3,000 in monthly relief.",
    faq8Q: "Is 9771.help an official government website?",
    faq8A: "No. 9771.help is an independent informational guide and helper tool created for public assistance. It is NOT affiliated with, operated by, or endorsed by the Government of Pakistan. It does not collect, store, or process applications.",

    // Section 10: WhatsApp Share
    shareTitle: "Help Friends & Family Save on Petrol",
    shareDesc: "Share 9771.help on WhatsApp so your contacts can format their registration SMS accurately and avoid fake website scams.",
    btnShare: "Share via WhatsApp",

    // Footer
    footerDesc: "Simple, independent guidance for Pakistan's 9771 Fuel Relief Scheme. Helping citizens prepare registration messages and claim targeted subsidies without errors.",
    footerNavHeading: "Navigation",
    footerLegalHeading: "Legal & Trust",
    footerHome: "Home",
    footerPrivacy: "Privacy Policy (Zero Data Stored)",
    footerTerms: "Terms of Use",
    footerDisclaimer: "Official Portal",
    footerCopyright: "© 2026 9771.help. All rights reserved.",
    lastUpdatedText: "Last Updated:",
    footerFullDisclaimer: "Disclaimer: 9771.help is an independent informational website. It is not affiliated with, operated by, or endorsed by the Government of Pakistan or any provincial excise department. Registration for the Fuel Relief Scheme is conducted exclusively via SMS to the official shortcode 9771 or designated government portals.",

    // Sticky mobile bar
    stickyApply: "Prepare SMS",
    stickyTok: "Send TOK",

    navFuelPrices: "Fuel Prices Today",
    heroKeywordSub: "Shahbaz Sharif Rs. 100 Petrol Relief Scheme • Official 9771 REG SMS & TOK Guide",
    heroBtnRates: "⛽ Petrol Price Today",
    fuelRatesTag: "Live Daily Rates & Quota",
    fuelRatesTitle: "Petrol Price in Pakistan Today & 9771 Subsidized Rate",
    fuelRatesDesc: "Official OGRA notification fuel prices in Pakistan today compared with the subsidized rate under Prime Minister Shehbaz Sharif's Rs. 100/Litre relief scheme.",
    fuelCardBadge: "Most Popular • 9771 Subsidized",
    fuelPetrolName: "Super Petrol (Motor Gasoline)",
    fuelPetrolSub: "Bikes, Cars & Rickshaws (Al-Makhsoos)",
    fuelOgraRate: "Official OGRA Market Rate:",
    fuel9771Discount: "9771 PM Subsidy Discount:",
    fuelNetRate: "Effective Subsidized Price:",
    fuelMonthlySavings: "💡 Monthly Savings: Rs. 2,000 for Bikes (20L) • Rs. 3,000 for 800cc Cars (30L)",
    fuelDieselName: "High-Speed Diesel (HSD)",
    fuelDieselSub: "Heavy Vehicles, Vans & Commercial",
    fuelMarketRateLabel: "Official Market Rate:",
    fuelStatusLabel: "Status:",
    fuelStatusNotified: "OGRA Notified Rate",
    fuelDieselNote: "Commercial and public transport fuels follow standard federal notification tariffs.",
    fuelHobcName: "High Octane (HOBC 97)",
    fuelHobcSub: "Premium Performance & Luxury Vehicles",
    fuelCategoryLabel: "Category:",
    fuelDeregulated: "Deregulated Premium",
    fuelHobcNote: "Recommended for sports motorcycles, turbo engines, and imported luxury automobiles.",
    fuelKeroseneName: "Kerosene Oil & Light Diesel",
    fuelKeroseneSub: "Mitti Ka Tel & Agricultural LDO",
    fuelKeroseneLabel: "Kerosene Oil Rate:",
    fuelLdoLabel: "Light Diesel (LDO):",
    fuelKeroseneNote: "Standard rates applicable for tube-wells, agricultural machinery, and rural domestic heating.",
    cityRatesTitle: "📍 City-Wise Petrol Price in Pakistan Today (Karachi, Lahore, Islamabad, etc.)",
    cityRatesSub: "Uniform official rate notified across all major regional hubs with minor freight margins.",
    thCity: "City / Region",
    thRegularPetrol: "Petrol (Super)",
    thSubsidizedPetrol: "With 9771 Token",
    thDiesel: "Diesel (HSD)",
    thCng: "CNG Rate",
    notificationScheduleText: "📅 Next Petrol Price Notification Schedule: The Government of Pakistan and OGRA review and notify fuel price adjustments every 15 days (effective from the 1st and 16th of each calendar month). Register on 9771 today to lock in your Rs. 100/L relief voucher regardless of market rate surges.",
    faq9Q: "9771 per SMS kaise kare? (How to format 9771 registration SMS)",
    faq9A: "Apne mobile ke SMS app me likhein: REG [13-digit CNIC] [Vehicle Number] [Province Code] [Date of Registration DDMMYYYY] aur isko 9771 par bhej dein. Misal ke tor par: REG 4210112345671 KHI1234 S 15082020.",
    faq10Q: "Shahbaz Sharif 100 rupees petrol relief scheme me apply kaise kare?",
    faq10A: "Wazir-e-Azam Shehbaz Sharif ki fuel subsidy scheme me shamil hone ke liye kisi daftari chakar ya lambi form filling ki zaroorat nahi hai. Registration sirf 9771 par SMS bhej kar mukammal hoti hai.",
    faq11Q: "Bike petrol relief scheme aur 800cc car quota kitna hai?",
    faq11A: "Hukoomat-e-Pakistan ke mutabiq motorcycles, scooters, auto-rickshaws aur Qingqi 3-wheelers ko 20 litre mahana quota (Rs. 2,000 subsidy) milta hai. Jabke 800cc tak ki registered choti cars (Mehran, Alto wagera) ko 30 litre mahana quota (Rs. 3,000 subsidy) diya jata hai.",
    faq12Q: "Petrol price in Pakistan today par 9771 fuel relief ka kya faida hai?",
    faq12A: "OGRA ki janib se aam market me petrol ki qeemat Rs. 279.75 per litre hai. Lekin 9771 token holders ko seedha Rs. 100 per litre ki choot milti hai, jis se subsidized petrol rate sirf Rs. 179.75 per litre parhta hai.",

    // Modal & Toast
    modalTitle: "How to Send Your SMS",
    modalInstruction: "Copy the pre-formatted text below and send it via your phone's SMS app to shortcode 9771:",
    modalBtnCopy: "Copy Message & Close",
    toastCopied: "Copied to clipboard!",
    toastError: "Please fill in all fields to generate the SMS."
  },

  ur: {
    // Top disclaimer
    topNoticeBadge: "آزاد معلوماتی گائیڈ",
    topNoticeText: "9771.help ایک آزاد معلوماتی ویب سائٹ ہے۔ اس کا حکومتِ پاکستان سے کوئی براہِ راست یا سرکاری تعلق نہیں ہے۔",
    langSwitchBtn: "English",

    // Header & Nav
    brandName: "9771.help",
    brandTag: "پیٹرول ریلیف گائیڈ",
    navEligibility: "اہلیت",
    navSmsTool: "ایس ایم ایس بنائیں",
    navVisualGuide: "تصویری مثالیں",
    navVideo: "ویڈیو گائیڈ",
    navTokenGuide: "ٹوکن گائیڈ",
    navCalculator: "کیلکولیٹر",
    navFaq: "عام سوالات",
    navApplyBtn: "9771 پر اپلائی کریں",


    // Hero
    heroPill: "وزیرِ اعظم پیٹرول ریلیف اسکیم 2026",
    heroTitlePrefix: "9771 فیول کوٹہ",
    heroTitleHighlight: "آن لائن اپلائی گائیڈ 2026",
    heroClarityLead: "رجسٹریشن مکمل طور پر 9771 پر ایس ایم ایس کے ذریعے ہوتی ہے۔",
    heroClaritySub: "یہ ویب سائٹ آپ کو اہلیت جانچنے، بغیر غلطی کے درست ایس ایم ایس تیار کرنے اور پیٹرول پمپ سے 100 روپے فی لیٹر رعایت حاصل کرنے کا طریقہ سکھاتی ہے۔",
    heroBtnPrimary: "📱 9771 ایس ایم ایس تیار کریں",
    heroBtnSecondary: "ℹ️ طریقہ کار دیکھیں",
    heroPrivacyBadge: "100% پرائیویسی: آپ کا شناختی کارڈ یا گاڑی کا ڈیٹا آن لائن محفوظ نہیں کیا جاتا۔",

    // At the Pump Card (Neutral)
    pumpBadge: "پٹرول پمپ پر موجود ہیں؟",
    pumpTitle: "پہلے سے رجسٹرڈ ہیں؟ اپنا فیول ٹوکن لیں",
    pumpDesc: "پٹرول ڈلوانے سے پہلے 9771 پر TOK لکھ کر بھیجیں اور موصول ہونے والا ٹوکن سرکاری ہدایات کے مطابق نامزد پٹرول پمپ پر دکھائیں۔",
    pumpBtnText: "9771 پر TOK بھیجیں",
    pumpTip: "موصول ہونے والا ایس ایم ایس ٹوکن سرکاری ہدایات کے مطابق پٹرول پمپ پر دکھائیں۔",

    // Section 2: At a Glance
    glanceTag: "اسکیم کا خلاصہ",
    glanceTitle: "پی ایم فیول ریلیف اسکیم 2026 ایک نظر میں",
    glanceDesc: "حکومت کی جانب سے اعلان کردہ اہم کوٹہ اور ریلیف کی تفصیلات۔",
    stat1Val: "100 روپے",
    stat1Unit: "/ لیٹر",
    stat1Label: "پیٹرول پر رعایت",
    stat1Sub: "ایس ایم ایس ٹوکن کے ذریعے فوری رعایت",
    stat2Val: "20",
    stat2Unit: "لیٹر",
    stat2Label: "2 اور 3 پہیوں والی گاڑیاں",
    stat2Sub: "موٹر سائیکل اور رکشہ کا ماہانہ کوٹہ",
    stat3Val: "30",
    stat3Unit: "لیٹر",
    stat3Label: "800cc تک کی گاڑیاں",
    stat3Sub: "اہل چھوٹی گاڑیوں کا ماہانہ کوٹہ",
    stat4Val: "9771",
    stat4Unit: "شارٹ کوڈ",
    stat4Label: "سرکاری ایس ایم ایس کوڈ",
    stat4Sub: "رجسٹریشن (REG) اور ٹوکن (TOK) کے لیے",

    // Section 3: Who Can Apply (Neutral)
    whoTag: "کون اہل ہے؟",
    whoTitle: "کون اپلائی کر سکتا ہے؟",
    whoDesc: "یہ اسکیم مخصوص غیر تجارتی گاڑیوں کے لیے مختص کی گئی ہے۔",
    bikeTitle: "موٹر سائیکل اور اسکوٹر",
    bikeDesc: "ماہانہ 20 لیٹر تک کوٹہ۔ اہلیت اور رجسٹریشن کی تفصیلات متعلقہ سرکاری نظام کے تحت تصدیق کی جاتی ہیں۔",
    rickshawTitle: "آٹو رکشہ",
    rickshawDesc: "ایکسائز میں رجسٹرڈ 3 پہیوں والے آٹو رکشہ (20 لیٹر ماہانہ کوٹہ)۔",
    qingqiTitle: "چنگ چی / چنگچی 3 وہیلر",
    qingqiDesc: "رجسٹرڈ لوڈر اور مسافر چنگ چی جو 20 لیٹر کوٹہ کیٹیگری میں شامل ہیں۔",
    carTitle: "800cc تک انجن والی کاریں",
    carDesc: "وہ گاڑیاں جن کا انجن 800cc تک ہو۔ 30 لیٹر ماہانہ کوٹہ۔ اہلیت کا دارومدار اسکیم میں استعمال ہونے والے گاڑیوں کے سرکاری ریکارڈ پر ہے۔",
    eligibilityQuota20: "زیادہ سے زیادہ 20 لیٹر / مہینہ",
    eligibilityQuota30: "زیادہ سے زیادہ 30 لیٹر / مہینہ",
    eligibilityNotice: "اہم نوٹ: یہ اسکیم اہل غیر تجارتی صارفین کے لیے ہے۔ اہلیت اور رجسٹریشن کی تفصیلات متعلقہ سرکاری نظام کے ذریعے تصدیق کی جاتی ہیں۔ اپلائی کرنے سے پہلے سرکاری قواعد ضرور دیکھیں۔",

    // Section 4: Interactive SMS Generator
    toolTag: "ایس ایم ایس ٹول",
    toolTitle: "9771 رجسٹریشن ایس ایم ایس تیار کریں",
    toolDesc: "اپنی معلومات درج کریں تاکہ بغیر کسی غلطی کے درست فارمیٹ خود بخود تیار ہو سکے۔ ہم آپ کا کوئی ڈیٹا محفوظ نہیں کرتے۔",
    toolPrivacyPill: "🔒 100% محفوظ: آپ کی معلومات کسی سرور پر نہیں جاتی۔",
    labelCnic: "شناختی کارڈ نمبر (CNIC)",
    hintCnic: "13 ہندسے بغیر ڈیشز کے",
    placeholderCnic: "مثلاً 4210112345671",
    labelVehicle: "گاڑی کا نمبر",
    hintVehicle: "انگریزی حروف اور نمبر",
    placeholderVehicle: "مثلاً KHI-1234 یا LEB-2022",
    labelProvince: "رجسٹریشن کا صوبہ / خطہ",
    hintProvince: "صوبہ منتخب کریں",
    labelDate: "گاڑی کی رجسٹریشن کی تاریخ",
    hintDate: "فارمیٹ DDMMYYYY",
    terminalTitle: "ایس ایم ایس لائیو پیش نظارہ",
    terminalTarget: "اس نمبر پر بھیجیں:",
    btnSendSms: "📱 9771 پر ایس ایم ایس بھیجیں",
    btnCopySms: "📋 ایس ایم ایس کاپی کریں",
    btnReset: "فارم خالی کریں",
    terminalTip: "اہلیت اور رجسٹریشن کی تفصیلات متعلقہ سرکاری نظام کے ذریعے تصدیق کی جاتی ہیں۔",

    // Section 5: Roadmap
    roadTag: "طریقہ کار",
    roadTitle: "فیول ٹوکن حاصل کرنے کا طریقہ",
    roadDesc: "رجسٹریشن سے لے کر پیٹرول رعایت حاصل کرنے تک 4 آسان مراحل:",
    step1Title: "1. ایس ایم ایس رجسٹریشن",
    step1Desc: "اپنا شناختی کارڈ، گاڑی کا نمبر، صوبہ اور تاریخ 9771 پر بھیجیں۔",
    step1Code: "REG [شناختی کارڈ] [گاڑی] [صوبہ] [تاریخ]",
    step2Title: "2. تصدیقی مرحلہ",
    step2Desc: "اہلیت اور رجسٹریشن کی تفصیلات متعلقہ سرکاری نظام کے ذریعے تصدیق کی جاتی ہیں جس کے بعد تصدیقی ایس ایم ایس موصول ہوتا ہے۔",
    step2Code: "سرکاری تصدیقی جوابی ایس ایم ایس",
    step3Title: "3. ٹوکن طلب کریں (TOK)",
    step3Desc: "سرکاری ہدایات کے مطابق پٹرول پمپ جانے سے پہلے 9771 پر TOK لکھ کر بھیجیں۔",
    step3Code: "بھیجیں: TOK → 9771",
    step4Title: "4. رعایت وصول کریں",
    step4Desc: "موصول ہونے والا ٹوکن تازہ ترین سرکاری ہدایات کے مطابق نامزد پٹرول پمپ پر دکھائیں اور 100 روپے فی لیٹر رعایت حاصل کریں۔",
    step4Code: "100 روپے فی لیٹر رعایت",

    // Visual Infographic Showcase
    infoTag: "باضابطہ تصویری گائیڈ",
    infoTitle: "وزیراعظم فیول ریلیف اسکیم 2026 معلوماتی پوسٹر",
    infoDesc: "9771 پر رجسٹریشن اور فیول ٹوکن حاصل کرنے کے مراحل کا تصویری خلاصہ۔",
    infoCaption: "وزیراعظم فیول ریلیف اسکیم 2026 کا باضابطہ تصویری رہنمائی پوسٹر۔",

    // Visual Guide Examples Section
    visualGuideTag: "تصویری رہنمائی اور مثالیں",
    visualGuideTitle: "ایس ایم ایس بھیجنے سے پہلے تفصیلات سمجھیں",
    visualGuideDesc: "گاڑی کے رجسٹریشن کارڈ پر تاریخ تلاش کرنے اور موبائل پر 9771 کے پیغامات کا تصویری نمونہ۔",
    cardGuideTitle: "گاڑی کی رجسٹریشن کی تاریخ کہاں ہوتی ہے؟",
    cardGuideDesc: "اپنی گاڑی کے ایکسائز اسمارٹ کارڈ یا بک پر 'Date of Reg' دیکھیں۔ تاریخ کا فارمیٹ DDMMYYYY ہونا چاہیے (مثلاً 15 اگست 2020 کو 15082020 لکھیں)۔",
    smsGuideTitle: "موبائل پر 9771 چیٹ کا اصل نمونہ",
    smsGuideDesc: "دیکھیں کہ آپ کا بھیجا گیا REG اور TOK میسج اور 9771 سے موصول ہونے والا جواب موبائل پر کیسا نظر آتا ہے۔",

    // Video Guide Section
    videoTag: "ویڈیو ٹیوٹوریل",
    videoTitle: "ویڈیو دیکھیں: 9771 رجسٹریشن اور ٹوکن کا مکمل طریقہ",
    videoDesc: "ویڈیو کے ذریعے سمجھیں کہ کس طرح بغیر کسی غلطی کے 9771 پر رجسٹریشن کر کے پیٹرول پر 100 روپے فی لیٹر رعایت حاصل کی جائے۔",
    videoFallbackText: "اگر ویڈیو یہاں نہ چلے تو آپ اسے براہِ راست یوٹیوب پر بھی دیکھ سکتے ہیں۔",
    btnWatchYoutube: "یوٹیوب پر دیکھیں ↗",



    // Section 6: Calculator
    calcTag: "بچت کیلکولیٹر",
    calcTitle: "اپنی ماہانہ فیول رعایت معلوم کریں",
    calcDesc: "اپنے ماہانہ ممکنہ ریلیف کا حساب لگائیں۔ پیٹرول کی اصل خوردہ قیمت شامل نہیں کی گئی کیونکہ وہ بدلتی رہتی ہے۔",
    calcOpt1Label: "موٹر سائیکل / رکشہ / 3 وہیلر",
    calcOpt1Sub: "اہل کوٹہ: 20 لیٹر فی مہینہ",
    calcOpt2Label: "800cc تک انجن والی کار",
    calcOpt2Sub: "اہل کوٹہ: 30 لیٹر فی مہینہ",
    calcQuotaLabel: "ماہانہ کوٹہ",
    calcReliefLabel: "رعایت کی شرح",
    calcTotalLabel: "زیادہ سے زیادہ ماہانہ رعایت",
    calcNotice: "نوٹ: یہ حساب حکومت کی اعلان کردہ 100 روپے فی لیٹر رعایت پر مبنی ہے۔ اہلیت کا دارومدار اسکیم میں استعمال ہونے والے گاڑیوں کے سرکاری ریکارڈ پر ہے۔",

    // Section 7: Anti Scam
    scamTitle: "جعلی رجسٹریشن ویب سائٹس سے ہوشیار رہیں!",
    scamDesc: "اپنا شناختی کارڈ، او ٹی پی (OTP)، بینک پن، یا پاس ورڈ کسی بھی غیر سرکاری ویب سائٹ یا واٹس ایپ ایجنٹ کے ساتھ کبھی شیئر نہ کریں۔ حکومت رجسٹریشن کی کوئی فیس نہیں لیتی۔",
    scamStrong: "9771.help صرف ایک معلوماتی رہنما ویب سائٹ ہے۔ ہم کبھی بھی پاس ورڈ یا پیسوں کا مطالبہ نہیں کرتے۔",

    // Section 8: Official Source
    officialBadge: "نامزد سرکاری ذریعہ",
    officialTitle: "تازہ ترین تفصیلات سرکاری پورٹل سے تصدیق کریں",
    officialDesc: "سرکاری پالیسی، صوبائی شیڈول اور رہنمائی کے لیے ہمیشہ حکومت کے نامزد پورٹل سے تصدیق کریں۔",
    btnOfficial: "سرکاری پورٹل (pmfuelrelief.pk) دیکھیں ←",

    // Section 9: FAQs
    faq1Q: "9771 فیول ریلیف اسکیم کیا ہے؟",
    faq1A: "یہ حکومتِ پاکستان کی طرف سے کم آمدن اور مخصوص گاڑیوں (موٹر سائیکل، رکشہ اور 800cc تک کی کاروں) کے مالکان کے لیے پیٹرول پر 100 روپے فی لیٹر رعایت دینے کا پروگرام ہے۔",
    faq2Q: "اس اسکیم کے لیے رجسٹریشن کیسے کی جاتی ہے؟",
    faq2A: "رجسٹریشن ایس ایم ایس کے ذریعے ہوتی ہے۔ آپ کو REG لکھ کر شناختی کارڈ، گاڑی کا نمبر، صوبائی کوڈ اور رجسٹریشن کی تاریخ ملا کر 9771 پر بھیجنا ہوتی ہے۔",
    faq3Q: "رجسٹریشن کے لیے کن معلومات کی ضرورت ہوتی ہے؟",
    faq3A: "آپ کے پاس: 1) اپنا 13 ہندسوں کا شناختی کارڈ نمبر، 2) گاڑی کا نمبر، 3) گاڑی کا صوبہ، اور 4) گاڑی کے رجسٹریشن کارڈ پر لکھی ہوئی رجسٹریشن کی تاریخ درکار ہوتی ہے۔",
    faq4Q: "9771 پر بھیجے جانے والے ایس ایم ایس کا درست طریقہ کیا ہے؟",
    faq4A: "فارمیٹ یہ ہے: REG [شناختی کارڈ] [گاڑی کا نمبر] [صوبہ کوڈ] [تاریخ DDMMYYYY]۔ مثلاً: REG 4210112345671 KHI1234 S 15082020۔ آپ اس صفحے پر موجود ٹول سے باآسانی تیار کر سکتے ہیں۔",
    faq5Q: "پٹرول پمپ جانے سے پہلے فیول ٹوکن کیسے حاصل کریں؟",
    faq5A: "جب آپ کی ابتدائی رجسٹریشن کی تصدیق ہو جائے تو 9771 پر TOK لکھ کر بھیجیں۔ آپ کو ایک ڈیجیٹل کوڈ موصول ہوگا جو سرکاری ہدایات کے مطابق نامزد پٹرول پمپ پر دکھانا ہوگا۔",
    faq6Q: "موٹر سائیکل اور رکشہ کو کتنی رعایت ملے گی؟",
    faq6A: "موٹر سائیکل اور رکشہ کا کوٹہ 20 لیٹر فی مہینہ ہے۔ 100 روپے فی لیٹر کی رعایت سے ماہانہ 2,000 روپے تک کی بچت ہوگی۔",
    faq7Q: "800cc تک کی گاڑیوں کو کتنی رعایت ملے گی؟",
    faq7A: "800cc تک کی گاڑیوں کا کوٹہ 30 لیٹر فی مہینہ ہے۔ 100 روپے فی لیٹر کی رعایت سے ماہانہ 3,000 روپے تک کی بچت ہوگی۔",
    faq8Q: "کیا 9771.help حکومت کی سرکاری ویب سائٹ ہے؟",
    faq8A: "نہیں! 9771.help ایک آزاد عوامی معلوماتی پورٹل ہے۔ اس کا حکومتِ پاکستان سے کوئی سرکاری تعلق نہیں ہے اور یہ ویب سائٹ نہ تو کوئی ڈیٹا محفوظ کرتی ہے نہ ہی سرکاری درخواستیں پراسیس کرتی ہے۔",

    // Section 10: WhatsApp Share
    shareTitle: "دوستوں اور فیملی کے ساتھ شیئر کریں",
    shareDesc: "واٹس ایپ پر 9771.help شیئر کریں تاکہ آپ کے پیارے بھی درست ایس ایم ایس بنا کر ماہانہ 2,000 سے 3,000 روپے سستا پیٹرول حاصل کر سکیں۔",
    btnShare: "واٹس ایپ پر شیئر کریں",

    // Footer
    footerDesc: "پاکستان کی 9771 فیول ریلیف اسکیم کے لیے آزاد اور آسان معلوماتی گائیڈ۔ شہریوں کو درست ایس ایم ایس اور ٹوکن حاصل کرنے میں معاونت فراہم کرتا ہے۔",
    footerNavHeading: "اہم لنکس",
    footerLegalHeading: "قانونی نوٹس",
    footerHome: "ہوم پیج",
    footerPrivacy: "پرائیویسی پالیسی (زیرو ڈیٹا اسٹوریج)",
    footerTerms: "استعمال کی شرائط",
    footerDisclaimer: "سرکاری پورٹل",
    footerCopyright: "© 2026 9771.help. جملہ حقوق محفوظ ہیں۔",
    lastUpdatedText: "آخری تجدید:",
    footerFullDisclaimer: "ڈس کلیمر: 9771.help ایک آزاد معلوماتی ویب سائٹ ہے جس کا حکومتِ پاکستان، نادرا، یا ایکسائز ڈپارٹمنٹ سے کوئی باقاعدہ یا سرکاری تعلق نہیں ہے۔ فیول ریلیف اسکیم کے لیے رجسٹریشن صرف اور صرف 9771 ایس ایم ایس یا سرکاری پورٹل کے ذریعے ہوتی ہے۔",

    // Sticky mobile bar
    stickyApply: "ایس ایم ایس بنائیں",
    stickyTok: "TOK حاصل کریں",

    navFuelPrices: "آج کے پیٹرول ریٹس",
    heroKeywordSub: "شہباز شریف 100 روپے پیٹرول ریلیف اسکیم • آفیشل 9771 ایس ایم ایس اور ٹوکن گائیڈ",
    heroBtnRates: "⛽ آج کے پیٹرول ریٹس",
    fuelRatesTag: "روزانہ ریٹس اور کوٹہ",
    fuelRatesTitle: "پاکستان میں آج پیٹرول کی قیمت اور 9771 رعایتی ریٹ",
    fuelRatesDesc: "اوگرا (OGRA) کے نوٹیفائی کردہ پیٹرول ریٹس کا موازنہ وزیرِ اعظم شہباز شریف کی 100 روپے فی لیٹر ریلیف اسکیم کے ساتھ۔",
    fuelCardBadge: "سب سے زیادہ استعمال • 9771 رعایتی",
    fuelPetrolName: "سپر پیٹرول (موٹر گیسولین)",
    fuelPetrolSub: "موٹر سائیکل، کار اور رکشہ کے لیے (مخصوص)",
    fuelOgraRate: "سرکاری اوگرا مارکیٹ ریٹ:",
    fuel9771Discount: "9771 پی ایم اسکیم رعایت:",
    fuelNetRate: "رعایت کے بعد حتمی قیمت:",
    fuelMonthlySavings: "💡 ماہانہ بچت: بائیک کے لیے 2,000 روپے (20 لیٹر) • 800cc کار کے لیے 3,000 روپے (30 لیٹر)",
    fuelDieselName: "ہائی اسپیڈ ڈیزل (HSD)",
    fuelDieselSub: "ہیوی گاڑیاں، وین اور کمرشل ٹرانسپورٹ",
    fuelMarketRateLabel: "سرکاری مارکیٹ ریٹ:",
    fuelStatusLabel: "حیثیت:",
    fuelStatusNotified: "اوگرا نوٹیفائیڈ ریٹ",
    fuelDieselNote: "کمرشل اور پبلک ٹرانسپورٹ کے ایندھن پر فیڈرل ٹیرف کے مطابق ریٹ لاگو ہوتے ہیں۔",
    fuelHobcName: "ہائی اوکٹین (HOBC 97)",
    fuelHobcSub: "اسپورٹس اور لگژری گاڑیوں کے لیے",
    fuelCategoryLabel: "کیٹیگری:",
    fuelDeregulated: "ڈی ریگولیٹڈ پریمیم",
    fuelHobcNote: "اسپورٹس موٹر سائیکلوں، ٹربو اور امپورٹڈ گاڑیوں کے لیے موزوں ہے۔",
    fuelKeroseneName: "مٹی کا تیل اور لائٹ ڈیزل",
    fuelKeroseneSub: "گھریلو استعمال اور زرعی ٹیوب ویل",
    fuelKeroseneLabel: "مٹی کے تیل کا ریٹ:",
    fuelLdoLabel: "لائٹ ڈیزل (LDO):",
    fuelKeroseneNote: "زرعی مشینری، ٹیوب ویل اور گھریلو ایندھن کے لیے سرکاری نرخ۔",
    cityRatesTitle: "📍 پاکستان کے بڑے شہروں میں پیٹرول کی قیمت (کراچی، لاہور، اسلام آباد)",
    cityRatesSub: "پورے ملک کے بڑے ریجنز کے لیے سرکاری یکساں ریٹس۔",
    thCity: "شہر / صوبہ",
    thRegularPetrol: "پیٹرول (مارکیٹ)",
    thSubsidizedPetrol: "9771 ٹوکن کے ساتھ",
    thDiesel: "ڈیزل (HSD)",
    thCng: "سی این جی ریٹ",
    notificationScheduleText: "📅 پیٹرول کی قیمتوں کے نوٹیفکیشن کا شیڈول: حکومتِ پاکستان اور اوگرا ہر 15 دن بعد (یکم اور 16 تاریخ کو) پیٹرولیم مصنوعات کی قیمتوں کا جائزہ لے کر نوٹیفکیشن جاری کرتے ہیں۔ 9771 پر رجسٹریشن کر کے پیٹرول مہنگا ہونے کی پریشانی سے نجات پائیں۔",
    faq9Q: "9771 پر ایس ایم ایس کیسے کریں؟",
    faq9A: "اپنے موبائل میں REG لکھ کر 13 ہندسوں کا شناختی کارڈ نمبر، گاڑی کا نمبر، صوبہ اور تاریخ ملا کر 9771 پر بھیجیں۔",
    faq10Q: "شہباز شریف 100 روپے پیٹرول ریلیف اسکیم میں اپلائی کیسے کریں؟",
    faq10A: "اس اسکیم میں کسی دفتری چکر کی ضرورت نہیں۔ رجسٹریشن صرف 9771 پر ایس ایم ایس بھیج کر ہوتی ہے اور پھر TOK لکھ کر واؤچر ملتا ہے۔",
    faq11Q: "موٹر سائیکل اور 800cc کار کا کتنا کوٹہ ہے؟",
    faq11A: "موٹر سائیکل اور رکشہ کے لیے ماہانہ 20 لیٹر (2,000 روپے رعایت) اور 800cc کار کے لیے 30 لیٹر (3,000 روپے رعایت) ہے۔",
    faq12Q: "پاکستان میں آج پیٹرول کی قیمت پر 9771 اسکیم کا کیا فائدہ ہے؟",
    faq12A: "مارکیٹ میں پیٹرول اگر 279.75 روپے کا ہے، تو 9771 ٹوکن کے ساتھ آپ کو صرف 179.75 روپے فی لیٹر پڑے گا (100 روپے بچت)۔",

    // Modal & Toast
    modalTitle: "ایس ایم ایس بھیجنے کا طریقہ",
    modalInstruction: "نیچے دیے گئے میسج کو کاپی کریں اور اپنے موبائل کی میسج ایپ سے شارٹ کوڈ 9771 پر بھیجیں:",
    modalBtnCopy: "کاپی کریں اور بند کریں",
    toastCopied: "میسج کلپ بورڈ پر کاپی ہو گیا!",
    toastError: "ایس ایم ایس بنانے کے لیے تمام خانے پُر کریں۔"
  }
};

// ==========================================================================
// 3. Application State
// ==========================================================================

let currentLang = "en"; // default language
let activeCalcQuota = 20; // default 20L for bikes

// ==========================================================================
// 4. Initialization & Event Listeners
// ==========================================================================

document.addEventListener("DOMContentLoaded", () => {
  initLanguageSwitcher();
  initProvinceDropdown();
  initSmsGenerator();
  initPumpTokenCard();
  initCalculator();
  initWhatsAppShare();
  initModalAndToast();
  initMobileMenu();
  initCleanAnchorScroll();
  initLeftStickyAd();
  updateLastUpdatedDate();
});

// ==========================================================================
// Left Sticky Skyscraper Ad (Pushes Up Cleanly Before Footer)
// ==========================================================================

function initLeftStickyAd() {
  const closeBtn = document.getElementById("close-left-ad-btn");
  const adAside = document.getElementById("fixed-left-ad");
  const footer = document.querySelector(".main-footer");
  if (!adAside) return;

  if (closeBtn) {
    closeBtn.addEventListener("click", () => {
      adAside.style.display = "none";
    });
  }

  function adjustAdPosition() {
    // On mobile & tablet (< 1200px), ad is static in-flow
    if (window.innerWidth < 1200) {
      adAside.style.top = "";
      return;
    }

    if (!footer) return;

    const defaultTop = 90; // Top offset below sticky header
    const footerRect = footer.getBoundingClientRect();
    const adHeight = adAside.offsetHeight || 635;
    const gap = 24; // 24px clean buffer above footer

    // As soon as footer enters within ad's reach, push the ad up
    if (footerRect.top < (defaultTop + adHeight + gap)) {
      const newTop = footerRect.top - adHeight - gap;
      adAside.style.top = `${newTop}px`;
    } else {
      adAside.style.top = `${defaultTop}px`;
    }
  }

  window.addEventListener("scroll", adjustAdPosition, { passive: true });
  window.addEventListener("resize", adjustAdPosition, { passive: true });
  adjustAdPosition();
}

// ==========================================================================
// Clean In-Page Scrolling (Eliminates '#' in Address Bar)
// ==========================================================================

function initCleanAnchorScroll() {
  // If the page loaded with a hash in URL (e.g. /#roadmap or /#faqs), remove it immediately
  if (window.location.hash) {
    const initialTargetId = window.location.hash.replace("#", "");
    if (window.history && window.history.replaceState) {
      window.history.replaceState(null, "", window.location.pathname + window.location.search);
    }
    setTimeout(() => {
      scrollToTargetId(initialTargetId);
    }, 150);
  }

  // Intercept all anchor clicks with hash href
  document.addEventListener("click", (e) => {
    const anchor = e.target.closest('a[href^="#"]');
    if (!anchor) return;

    const href = anchor.getAttribute("href");
    if (!href || href === "#") return;

    e.preventDefault();
    const targetId = href.replace("#", "");
    scrollToTargetId(targetId);

    // Keep URL clean without appending '#...'
    if (window.history && window.history.replaceState) {
      window.history.replaceState(null, "", window.location.pathname + window.location.search);
    }
  });
}

function scrollToTargetId(id) {
  if (!id) return;
  if (id === "top") {
    window.scrollTo({ top: 0, behavior: "smooth" });
    return;
  }

  const target = document.getElementById(id);
  if (!target) return;

  const header = document.getElementById("main-header");
  const offset = (header ? header.offsetHeight : 65) + 10;
  const targetPosition = target.getBoundingClientRect().top + window.pageYOffset;

  window.scrollTo({
    top: Math.max(0, targetPosition - offset),
    behavior: "smooth"
  });
}

// ==========================================================================
// Mobile Navigation Drawer Toggle
// ==========================================================================

function initMobileMenu() {
  const toggleBtn = document.getElementById("mobile-nav-toggle");
  const navLinks = document.getElementById("nav-links");
  const backdrop = document.getElementById("nav-backdrop");
  if (!toggleBtn || !navLinks) return;

  function closeMenu() {
    navLinks.classList.remove("mobile-open");
    toggleBtn.classList.remove("active");
    toggleBtn.setAttribute("aria-expanded", "false");
    if (backdrop) backdrop.classList.remove("active");
  }

  function toggleMenu() {
    const isOpen = navLinks.classList.toggle("mobile-open");
    toggleBtn.classList.toggle("active", isOpen);
    toggleBtn.setAttribute("aria-expanded", isOpen);
    if (backdrop) {
      backdrop.classList.toggle("active", isOpen);
    }
  }

  toggleBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    toggleMenu();
  });

  if (backdrop) {
    backdrop.addEventListener("click", closeMenu);
  }

  // Automatically close menu when any navigation link is clicked
  navLinks.querySelectorAll("a").forEach(link => {
    link.addEventListener("click", closeMenu);
  });

  // Close when clicking outside
  document.addEventListener("click", (e) => {
    if (!toggleBtn.contains(e.target) && !navLinks.contains(e.target)) {
      closeMenu();
    }
  });

  // Close on Escape key
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      closeMenu();
    }
  });
}


// ==========================================================================
// 5. Bilingual Logic (Instant Language Switch)
// ==========================================================================

function initLanguageSwitcher() {
  const langBtn = document.getElementById("lang-switch-btn");
  if (!langBtn) return;

  langBtn.addEventListener("click", () => {
    currentLang = currentLang === "en" ? "ur" : "en";
    applyLanguage(currentLang);
  });
}

function applyLanguage(lang) {
  const t = TRANSLATIONS[lang];
  if (!t) return;

  // Set HTML attributes
  document.documentElement.lang = lang;
  document.documentElement.dir = lang === "ur" ? "rtl" : "ltr";

  // Translate all data-i18n elements
  document.querySelectorAll("[data-i18n]").forEach(el => {
    const key = el.getAttribute("data-i18n");
    if (t[key]) {
      el.textContent = t[key];
    }
  });

  // Translate all data-i18n-placeholder elements
  document.querySelectorAll("[data-i18n-placeholder]").forEach(el => {
    const key = el.getAttribute("data-i18n-placeholder");
    if (t[key]) {
      el.placeholder = t[key];
    }
  });

  // Re-populate Province Dropdown to match current language
  initProvinceDropdown();

  // Re-render terminal display
  renderSmsPreview();

  // Update calculator texts
  updateCalculatorDisplay();

  // Update last updated text
  updateLastUpdatedDate();
}

function updateLastUpdatedDate() {
  const el = document.getElementById("last-updated-date");
  if (el && LAST_UPDATED[currentLang]) {
    el.textContent = LAST_UPDATED[currentLang];
  }
}

// ==========================================================================
// 6. Province Dropdown Setup (Using Clean Name in UI, Code in Value)
// ==========================================================================

function initProvinceDropdown() {
  const select = document.getElementById("sms-province");
  if (!select) return;

  const currentVal = select.value || "";
  select.innerHTML = "";

  // Add default prompt option
  const defaultOpt = document.createElement("option");
  defaultOpt.value = "";
  defaultOpt.textContent = currentLang === "ur" ? "-- صوبہ / خطہ منتخب کریں --" : "-- Select Province / Region --";
  select.appendChild(defaultOpt);

  for (const [code, info] of Object.entries(PROVINCE_CODES)) {
    const opt = document.createElement("option");
    opt.value = code;
    // Show only the clean Province/Region name to the user
    opt.textContent = info[currentLang] || info.en;
    if (code === currentVal) {
      opt.selected = true;
    }
    select.appendChild(opt);
  }
}

// ==========================================================================
// 7. Interactive SMS Generator Logic (100% Client-Side)
// ==========================================================================

function initSmsGenerator() {
  const cnicInput = document.getElementById("sms-cnic");
  const vehicleInput = document.getElementById("sms-vehicle");
  const provinceSelect = document.getElementById("sms-province");
  const dateInput = document.getElementById("sms-date");

  const sendBtn = document.getElementById("btn-send-sms");
  const copyBtn = document.getElementById("btn-copy-sms");
  const resetBtn = document.getElementById("btn-reset-form");

  // Real-time CNIC input cleaning: digits only, max 13
  if (cnicInput) {
    cnicInput.addEventListener("input", (e) => {
      let val = e.target.value.replace(/[^0-9]/g, "");
      if (val.length > 13) val = val.slice(0, 13);
      e.target.value = val;
      renderSmsPreview();
    });
  }

  // Vehicle input cleaning: uppercase
  if (vehicleInput) {
    vehicleInput.addEventListener("input", (e) => {
      e.target.value = e.target.value.toUpperCase();
      renderSmsPreview();
    });
  }

  if (provinceSelect) {
    provinceSelect.addEventListener("change", renderSmsPreview);
  }

  if (dateInput) {
    dateInput.addEventListener("input", renderSmsPreview);
  }

  // Copy SMS Handler
  if (copyBtn) {
    copyBtn.addEventListener("click", () => {
      const smsText = generateSmsText();
      copyToClipboard(smsText);
      showToast(TRANSLATIONS[currentLang].toastCopied);
    });
  }

  // Send SMS Handler (Mobile Deep Link & Desktop Fallback)
  if (sendBtn) {
    sendBtn.addEventListener("click", () => {
      const smsText = generateSmsText();
      triggerSendSms(smsText);
    });
  }

  // Reset Form Handler
  if (resetBtn) {
    resetBtn.addEventListener("click", () => {
      if (cnicInput) cnicInput.value = "";
      if (vehicleInput) vehicleInput.value = "";
      if (provinceSelect) provinceSelect.value = "";
      if (dateInput) dateInput.value = "";
      renderSmsPreview();
    });
  }

  renderSmsPreview();
}

/**
 * Parses <input type="date"> (YYYY-MM-DD) into DDMMYYYY format required by 9771
 */
function parseDateToDDMMYYYY(dateVal) {
  if (!dateVal || !dateVal.includes("-")) return "";
  const parts = dateVal.split("-"); // [YYYY, MM, DD]
  if (parts.length === 3) {
    const yyyy = parts[0];
    const mm = parts[1];
    const dd = parts[2];
    return `${dd}${mm}${yyyy}`;
  }
  return "";
}

/**
 * Builds the exact SMS string based on current input values
 */
function generateSmsText() {
  const cnic = document.getElementById("sms-cnic")?.value.trim() || "";
  const vehicle = document.getElementById("sms-vehicle")?.value.trim().replace(/\s+/g, "") || "";
  const province = document.getElementById("sms-province")?.value || "";
  const rawDate = document.getElementById("sms-date")?.value || "";
  const formattedDate = parseDateToDDMMYYYY(rawDate);

  const parts = ["REG"];
  if (cnic) parts.push(cnic);
  if (vehicle) parts.push(vehicle);
  if (province) parts.push(province);
  if (formattedDate) parts.push(formattedDate);

  return parts.join(" ");
}

/**
 * Updates the dark terminal preview box
 */
function renderSmsPreview() {
  const previewEl = document.getElementById("terminal-sms-content");
  if (!previewEl) return;

  const cnic = document.getElementById("sms-cnic")?.value.trim() || "";
  const vehicle = document.getElementById("sms-vehicle")?.value.trim() || "";
  const province = document.getElementById("sms-province")?.value || "";
  const rawDate = document.getElementById("sms-date")?.value || "";
  const formattedDate = parseDateToDDMMYYYY(rawDate);

  const cnicDisplay = cnic || "[CNIC]";
  const vehicleDisplay = vehicle ? vehicle.replace(/\s+/g, "") : "[VEHICLE]";
  const provinceDisplay = province || "[PROVINCE]";
  const dateDisplay = formattedDate || "[DDMMYYYY]";

  previewEl.innerHTML = `REG ${cnicDisplay} ${vehicleDisplay} ${provinceDisplay} ${dateDisplay} <span class="cursor"></span>`;
}

/**
 * Triggers the SMS application with compatibility for iOS and Android
 */
function triggerSendSms(bodyText) {
  const shortcode = "9771";
  const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

  if (isMobile) {
    // iOS uses &body=, Android/others use ?body=
    const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
    const separator = isIOS ? "&" : "?";
    const smsUrl = `sms:${shortcode}${separator}body=${encodeURIComponent(bodyText)}`;
    window.location.href = smsUrl;
  } else {
    // On desktop, show a helpful instruction modal
    openDesktopSmsModal(bodyText);
  }
}

// ==========================================================================
// 8. 1-Click "At the Pump" TOK Generator
// ==========================================================================

function initPumpTokenCard() {
  const tokBtns = document.querySelectorAll(".trigger-tok-action");
  tokBtns.forEach(btn => {
    btn.addEventListener("click", () => {
      triggerSendSms("TOK");
    });
  });
}

// ==========================================================================
// 9. Interactive Fuel Relief & Savings Calculator
// ==========================================================================

function initCalculator() {
  const optBike = document.getElementById("calc-opt-bike");
  const optCar = document.getElementById("calc-opt-car");

  if (optBike && optCar) {
    optBike.addEventListener("click", () => {
      optBike.classList.add("active");
      optCar.classList.remove("active");
      activeCalcQuota = 20;
      updateCalculatorDisplay();
    });

    optCar.addEventListener("click", () => {
      optCar.classList.add("active");
      optBike.classList.remove("active");
      activeCalcQuota = 30;
      updateCalculatorDisplay();
    });
  }

  updateCalculatorDisplay();
}

function updateCalculatorDisplay() {
  const quotaValEl = document.getElementById("calc-res-quota");
  const rateValEl = document.getElementById("calc-res-rate");
  const totalValEl = document.getElementById("calc-res-total");

  if (!quotaValEl || !rateValEl || !totalValEl) return;

  const quota = activeCalcQuota;
  const rate = 100; // Rs. 100 per litre relief
  const totalSavings = quota * rate;

  if (currentLang === "ur") {
    quotaValEl.textContent = `${quota} لیٹر`;
    rateValEl.textContent = `100 روپے`;
    totalValEl.textContent = `${totalSavings.toLocaleString()} روپے`;
  } else {
    quotaValEl.textContent = `${quota} Litres`;
    rateValEl.textContent = `Rs. ${rate}`;
    totalValEl.textContent = `Rs. ${totalSavings.toLocaleString()}`;
  }
}

// ==========================================================================
// 10. Viral WhatsApp Share Button
// ==========================================================================

function initWhatsAppShare() {
  const shareBtn = document.getElementById("btn-whatsapp-share");
  if (!shareBtn) return;

  shareBtn.addEventListener("click", () => {
    let msg = "";
    if (currentLang === "ur") {
      msg = `وزیراعظم پیٹرول ریلیف اسکیم (100 روپے فی لیٹر رعایت) کے لیے 9771 پر درست ایس ایم ایس تیار کرنے اور رہنمائی کے لیے وزٹ کریں:\nhttps://9771.help/`;
    } else {
      msg = `Learn how to apply for the Rs. 100/L Petrol Relief Scheme via 9771 SMS and check your quota here:\nhttps://9771.help/`;
    }

    const shareUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(msg)}`;
    window.open(shareUrl, "_blank");
  });
}

// ==========================================================================
// 11. Modal & Toast Notifications
// ==========================================================================

function initModalAndToast() {
  const modal = document.getElementById("sms-modal");
  const closeBtn = document.getElementById("modal-close-btn");
  const modalCopyBtn = document.getElementById("modal-copy-btn");

  if (closeBtn && modal) {
    closeBtn.addEventListener("click", () => {
      modal.classList.remove("active");
    });
  }

  if (modal) {
    modal.addEventListener("click", (e) => {
      if (e.target === modal) {
        modal.classList.remove("active");
      }
    });
  }

  if (modalCopyBtn) {
    modalCopyBtn.addEventListener("click", () => {
      const codeText = document.getElementById("modal-sms-text")?.textContent || "";
      copyToClipboard(codeText);
      showToast(TRANSLATIONS[currentLang].toastCopied);
      if (modal) modal.classList.remove("active");
    });
  }
}

function openDesktopSmsModal(bodyText) {
  const modal = document.getElementById("sms-modal");
  const textEl = document.getElementById("modal-sms-text");
  if (!modal || !textEl) return;

  textEl.textContent = bodyText;
  modal.classList.add("active");
}

function copyToClipboard(text) {
  if (navigator.clipboard && window.isSecureContext) {
    navigator.clipboard.writeText(text);
  } else {
    // Fallback for older browsers
    const textarea = document.createElement("textarea");
    textarea.value = text;
    textarea.style.position = "fixed";
    textarea.style.left = "-999999px";
    document.body.appendChild(textarea);
    textarea.focus();
    textarea.select();
    document.execCommand("copy");
    document.body.removeChild(textarea);
  }
}

function showToast(msg) {
  const container = document.getElementById("toast-container");
  if (!container) return;

  const toast = document.createElement("div");
  toast.className = "toast";
  toast.innerHTML = `<span>✓</span> <span>${msg}</span>`;
  container.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = "0";
    toast.style.transition = "opacity 0.3s ease";
    setTimeout(() => {
      if (container.contains(toast)) container.removeChild(toast);
    }, 300);
  }, 2500);
}
