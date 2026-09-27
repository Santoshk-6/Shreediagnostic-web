export interface Article {
  id: string;
  slug: string;
  title: string;
  category: string;
  summary: string;
  readTime: string;
  date: string;
  author: string;
  content: string[];
  keyTakeaways: string[];
}

export const ARTICLES: Article[] = [
  {
    id: "art-1",
    slug: "do-i-need-to-fast-before-a-blood-test",
    title: "Do I Need to Fast Before a Blood Test? Essential Guidelines",
    category: "Fasting & Preparation",
    summary: "Understand why fasting is mandatory for tests like Lipid Profile and Glucose, and how drinking plain water affects your results.",
    readTime: "4 min read",
    date: "September 18, 2026",
    author: "Dr. Ananya Sharma, Senior Pathologist",
    keyTakeaways: [
      "Fasting is typically 8-12 hours prior to sample collection.",
      "Plain water is permitted and actually recommended to make blood draw easier.",
      "Coffee, tea, juice, chewing gum, and smoking interfere with test accuracy.",
      "Always inform your phlebotomist about daily prescription medications."
    ],
    content: [
      "Fasting before specific blood tests is one of the most critical steps to ensuring accurate laboratory diagnostic results. When you digest food, nutrients like carbohydrates, proteins, and fats enter your bloodstream, temporarily elevating glucose, triglyceride, and liver enzyme readings.",
      "Which tests require strict fasting? Tests such as Fasting Blood Sugar (FBS), Lipid Profile, Fasting Insulin, and Iron Profile require 10 to 12 hours of overnight fasting. On the other hand, Complete Blood Count (CBC), HbA1c, and Thyroid Stimulating Hormone (TSH) generally do not require strict fasting unless ordered as part of a combined package.",
      "Can you drink water while fasting? Yes! Drinking plain water is not only permitted but encouraged. Staying hydrated increases blood volume and dilates veins, making the venipuncture process faster and less painful.",
      "What should you avoid? Avoid tea, coffee (even black coffee without sugar), fruit juices, alcohol, milk, and smoking. Nicotine and caffeine can alter blood vessel tension and hormone secretion."
    ]
  },
  {
    id: "art-2",
    slug: "what-does-a-cbc-test-check",
    title: "What Does a CBC Test Check? Decoding Your Blood Count Report",
    category: "Understanding Common Tests",
    summary: "Learn how to read Hemoglobin, WBC, RBC, and Platelet parameters in your Complete Blood Count report.",
    readTime: "5 min read",
    date: "September 12, 2026",
    author: "Dr. Rajesh Varma, Clinical Biochemist",
    keyTakeaways: [
      "Hemoglobin & RBC measure oxygen-carrying capacity; low values indicate anemia.",
      "White Blood Cells (WBC) fight viral and bacterial infections; elevated levels signal inflammation.",
      "Platelets enable blood clotting; low counts (thrombocytopenia) are common in Dengue or viral fevers.",
      "CBC is recommended annually for routine physical health evaluation."
    ],
    content: [
      "A Complete Blood Count (CBC) is often called the ultimate window into your body's vital health status. It measures the three main components of blood: red cells, white cells, and platelets.",
      "Red Blood Cell (RBC) & Hemoglobin Count: Hemoglobin is the protein in red blood cells that transports oxygen from your lungs to the rest of your body. Low hemoglobin or RBC count indicates anemia, causing fatigue, shortness of breath, and pale skin.",
      "White Blood Cell (WBC) & Differential Count: WBCs act as your immune defense shield. An elevated total leukocyte count (TLC) usually indicates an active bacterial or viral infection, inflammation, or physical stress. Differential counts (Neutrophils, Lymphocytes, Eosinophils) help narrow down whether the cause is bacterial, viral, or allergic.",
      "Platelets & PCV: Platelets are essential for blood clotting and wound healing. Monitoring platelet levels is especially critical during seasonal viral illnesses such as Dengue fever."
    ]
  },
  {
    id: "art-3",
    slug: "when-should-you-get-a-thyroid-test",
    title: "When Should You Get a Thyroid Test? Key Symptoms & Frequency",
    category: "Thyroid & Endocrinology",
    summary: "Unexplained weight gain, chronic fatigue, cold sensitivity, or hair thinning? Check if your thyroid requires testing.",
    readTime: "4 min read",
    date: "August 28, 2026",
    author: "Dr. Meera Nambiar, Endocrinologist Specialist",
    keyTakeaways: [
      "Hypothyroidism causes sluggish metabolism, weight gain, fatigue, and dry skin.",
      "Hyperthyroidism leads to rapid heart rate, anxiety, unexplained weight loss, and heat intolerance.",
      "TSH is the primary screening parameter; T3 and T4 confirm metabolic rate.",
      "Annual thyroid screening is recommended for adult women and individuals with family history."
    ],
    content: [
      "The thyroid gland, located at the base of your neck, controls your metabolic rate, body temperature, heart rhythm, and energy production. Even subtle disruptions in thyroid hormone production can significantly impact your daily wellness.",
      "Recognizing Hypothyroidism Symptoms: When the thyroid produces inadequate hormones, metabolic processes slow down. Common signs include unexplained weight gain, extreme fatigue, constipation, hair fall, depression, and sensitivity to cold weather.",
      "Recognizing Hyperthyroidism Symptoms: Overactive thyroid produces excess hormones, accelerating your metabolism. Symptoms include rapid weight loss despite increased appetite, racing pulse, hand tremors, insomnia, and heat intolerance.",
      "How to get tested: A simple blood sample taken in the morning evaluates TSH, Total T3, and Total T4. If antibodies are suspected, an Anti-TPO antibody test confirms autoimmune thyroiditis."
    ]
  },
  {
    id: "art-4",
    slug: "what-is-a-full-body-health-checkup",
    title: "What Is a Full Body Health Checkup and Why Is Prevention Vital?",
    category: "Preventive Care",
    summary: "Discover how annual preventative health screening catches silent conditions like high cholesterol and fatty liver early.",
    readTime: "6 min read",
    date: "August 15, 2026",
    author: "Dr. Ananya Sharma, Senior Pathologist",
    keyTakeaways: [
      "Preventive screening identifies disease markers long before physical symptoms appear.",
      "Key organs evaluated: Heart, Liver, Kidneys, Thyroid, Blood, and Glucose metabolism.",
      "Reduces long-term medical expenditures through early intervention.",
      "Recommended once every 12 months for adults aged 25 and above."
    ],
    content: [
      "Many serious health conditions—such as fatty liver disease, early-stage chronic kidney disease, hypertension, and high cholesterol—develop silently over months or years without obvious early warning signs.",
      "A comprehensive full body checkup combines essential panels including CBC, Lipid Profile, Liver Function, Kidney Function, Diabetes, and Thyroid evaluation into a single diagnostic routine.",
      "By establishing baseline values year over year, doctors can spot trends (like gradually rising blood glucose or creatinine levels) and recommend lifestyle modifications long before medical intervention becomes severe."
    ]
  }
];
