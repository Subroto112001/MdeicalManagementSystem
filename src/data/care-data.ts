export const services = [
  { slug: "emergency", name: "Emergency care", summary: "Urgent assessment and stabilisation when every moment counts.", icon: "🚑", details: "Our emergency team provides prompt initial assessment, stabilisation, and coordination for urgent medical needs, 24 hours a day.", highlights: ["24/7 emergency response", "On-site medical team", "Ambulance coordination"] },
  { slug: "icu", name: "Intensive care (ICU)", summary: "Continuous monitoring and specialist support for critical illness.", icon: "♡", details: "The intensive care unit provides close observation and coordinated support for patients who need advanced monitoring and treatment.", highlights: ["Continuous monitoring", "Critical care specialists", "Family updates"] },
  { slug: "cabin", name: "Private cabins", summary: "Comfortable inpatient rooms with attentive nursing care.", icon: "▣", details: "Our inpatient cabins are designed for privacy and comfort, with nursing support and access to the clinical team throughout the stay.", highlights: ["Private and shared options", "Round-the-clock nursing", "Visitor support"] },
  { slug: "ambulance", name: "Ambulance service", summary: "Call for help and arrange safe patient transfer.", icon: "✚", details: "Our coordination team can help arrange patient transport and connect you with emergency support.", highlights: ["24/7 dispatch line", "Trained attendants", "Hospital transfer coordination"] },
  { slug: "pharmacy", name: "Pharmacy", summary: "Convenient access to prescribed medicines and guidance.", icon: "✚", details: "The clinic pharmacy helps patients access prescribed medicines and get practical guidance on their treatment plan.", highlights: ["Prescription support", "Medicine availability guidance", "Clear usage instructions"] },
  { slug: "diagnostics", name: "Diagnostic services", summary: "Laboratory and screening services with clear reporting.", icon: "⌕", details: "From routine blood work to preventive screening, our diagnostic services support timely decisions and coordinated follow-up.", highlights: ["Routine and specialist tests", "Digital report access", "Preparation guidance"] },
  { slug: "surgery", name: "Surgical care", summary: "Coordinated surgical assessment and recovery support.", icon: "＋", details: "Our surgical services coordinate assessment, procedure planning, and post-operative follow-up with the relevant specialists.", highlights: ["Pre-operative assessment", "Coordinated clinical team", "Recovery follow-up"] },
  { slug: "outpatient", name: "Outpatient clinic", summary: "Consultations and follow-up visits across specialties.", icon: "♡", details: "Book consultations with experienced doctors and receive a clear plan for treatment, diagnostics, and follow-up.", highlights: ["Multiple specialties", "Appointment scheduling", "Follow-up care"] },
];

export const testCategories = ["All tests", "Blood", "Imaging", "Cardiac", "Hormone", "Urine"] as const;
export type TestCategory = (typeof testCategories)[number];
export const tests = [
  { id: "cbc", name: "Complete Blood Count (CBC)", category: "Blood", price: 600, sample: "Blood", turnaround: "Same day", preparation: "No fasting required." },
  { id: "fasting-glucose", name: "Fasting Blood Glucose", category: "Blood", price: 350, sample: "Blood", turnaround: "Same day", preparation: "Fast for 8–10 hours; water is allowed." },
  { id: "lipid-profile", name: "Lipid Profile", category: "Blood", price: 1200, sample: "Blood", turnaround: "Same day", preparation: "Fast for 9–12 hours unless your doctor advises otherwise." },
  { id: "hba1c", name: "HbA1c", category: "Blood", price: 900, sample: "Blood", turnaround: "Next day", preparation: "No fasting required." },
  { id: "thyroid-profile", name: "Thyroid Profile (TSH, FT4)", category: "Hormone", price: 1500, sample: "Blood", turnaround: "Next day", preparation: "Tell your doctor about thyroid medicines before the test." },
  { id: "vitamin-d", name: "Vitamin D (25-OH)", category: "Blood", price: 1800, sample: "Blood", turnaround: "2 days", preparation: "No fasting required." },
  { id: "urine-rme", name: "Urine R/M/E", category: "Urine", price: 300, sample: "Urine", turnaround: "Same day", preparation: "Collect a clean-catch midstream sample." },
  { id: "ecg", name: "Resting ECG", category: "Cardiac", price: 500, sample: "Non-invasive", turnaround: "Within 1 hour", preparation: "Avoid applying lotion to the chest on the day." },
  { id: "echo", name: "Echocardiogram", category: "Cardiac", price: 2500, sample: "Non-invasive", turnaround: "Same day", preparation: "No special preparation is usually needed." },
  { id: "chest-xray", name: "Chest X-ray (PA view)", category: "Imaging", price: 800, sample: "Imaging", turnaround: "Same day", preparation: "Remove metal objects; inform staff if pregnant." },
  { id: "ultrasound-abdomen", name: "Ultrasound Whole Abdomen", category: "Imaging", price: 2200, sample: "Imaging", turnaround: "Same day", preparation: "Fast for 6 hours; follow the booking team's instructions." },
  { id: "lft", name: "Liver Function Tests", category: "Blood", price: 1100, sample: "Blood", turnaround: "Same day", preparation: "Fasting may be requested; confirm with your doctor." },
];

export const packages = [
  { slug: "essential-wellness", name: "Essential Wellness", audience: "A simple starting point for routine preventive care.", price: 2500, tests: ["Complete Blood Count (CBC)", "Fasting Blood Glucose", "Urine R/M/E", "Doctor consultation"], featured: false },
  { slug: "complete-health", name: "Complete Health Check", audience: "A broader annual overview for adults.", price: 5900, tests: ["Complete Blood Count (CBC)", "Fasting Blood Glucose", "Lipid Profile", "Liver Function Tests", "Thyroid Profile (TSH, FT4)", "Doctor consultation"], featured: true },
  { slug: "heart-screening", name: "Heart Health Screen", audience: "Core checks to discuss your cardiovascular health.", price: 4200, tests: ["Lipid Profile", "Resting ECG", "Echocardiogram", "Cardiology consultation"], featured: false },
  { slug: "womens-wellness", name: "Women’s Wellness", audience: "Preventive checks tailored to women’s health needs.", price: 4800, tests: ["Complete Blood Count (CBC)", "Thyroid Profile (TSH, FT4)", "Vitamin D (25-OH)", "Doctor consultation"], featured: false },
];
