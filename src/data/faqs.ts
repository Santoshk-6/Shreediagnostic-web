export interface FAQItem {
  id: string;
  category: "Booking" | "Test Preparation" | "Reports" | "Home Collection" | "Payment";
  question: string;
  answer: string;
}

export const FAQ_DATA: FAQItem[] = [
  // Booking
  {
    id: "faq-b1",
    category: "Booking",
    question: "How do I book a lab test or health package?",
    answer: "You can book directly on our website by clicking 'Book a Test' or 'Book Package', choosing your preferred date, time slot, and address. You can also book via phone at +91 98765 43210 or via WhatsApp instantly."
  },
  {
    id: "faq-b2",
    category: "Booking",
    question: "Can I book a test through WhatsApp?",
    answer: "Yes! Simply click the WhatsApp CTA button or message +91 98765 43210 with the test name and your preferred location. Our support team will assist and confirm your booking in minutes."
  },
  {
    id: "faq-b3",
    category: "Booking",
    question: "Can I visit the laboratory directly without an appointment?",
    answer: "Yes, walk-ins are always welcome at our main laboratory and collection centers during operational hours (6:30 AM to 8:30 PM). However, pre-booking online guarantees zero waiting time."
  },

  // Test Preparation
  {
    id: "faq-p1",
    category: "Test Preparation",
    question: "Do I need fasting before taking a blood test?",
    answer: "Fasting depends on the specific test. Lipid Profile, Fasting Blood Sugar, and Full Body Packages require 10-12 hours of overnight fasting (water is allowed). Tests like CBC, HbA1c, and Thyroid generally do not require fasting."
  },
  {
    id: "faq-p2",
    category: "Test Preparation",
    question: "What preparation is required before sample collection?",
    answer: "Drink plenty of water before blood draw to ensure easy venipuncture. Avoid heavy meals, alcohol, and strenuous exercise 24 hours prior. For urine tests, collect the first-morning midstream sample in a sterile container provided by us."
  },
  {
    id: "faq-p3",
    category: "Test Preparation",
    question: "Can I take my regular daily prescription medications before the test?",
    answer: "Most routine daily medications can be taken with water, but inform your phlebotomist or doctor. If taking thyroid medications, take your blood sample before your morning dose unless instructed otherwise by your physician."
  },

  // Reports
  {
    id: "faq-r1",
    category: "Reports",
    question: "How long does it take to receive test reports?",
    answer: "Routine tests like CBC, Blood Sugar, LFT, and KFT are delivered the same day within 6-8 hours. Specialized tests like Vitamin D3, B12, or Hormone Panels are ready within 24 hours."
  },
  {
    id: "faq-r2",
    category: "Reports",
    question: "How can I download or view my test report?",
    answer: "As soon as your report is ready, you will receive an SMS and WhatsApp notification with a direct secure download link. You can also visit our 'Reports' page on the website and log in using your Mobile Number or Booking ID."
  },
  {
    id: "faq-r3",
    category: "Reports",
    question: "What if I have an inquiry or discrepancy regarding my report?",
    answer: "Our senior pathologist helpline is available at reports@pathology.lab or +91 98765 43210. We offer complimentary pathologist consultations to explain test findings."
  },

  // Home Collection
  {
    id: "faq-h1",
    category: "Home Collection",
    question: "Is doorstep home sample collection available?",
    answer: "Yes! We offer convenient home sample collection performed by certified, hygienic, and experienced phlebotomists."
  },
  {
    id: "faq-h2",
    category: "Home Collection",
    question: "Which areas and pincodes are covered for home collection?",
    answer: "We cover all major metropolitan areas and suburban pincodes across the region. Use our Pincode Availability Checker on the Home Sample Collection page to verify instantly."
  },
  {
    id: "faq-h3",
    category: "Home Collection",
    question: "What are the available timings for home sample collection?",
    answer: "Phlebotomists are available every day from 6:00 AM to 6:00 PM. Morning slots (6:00 AM - 11:00 AM) are ideal for fasting blood tests."
  },

  // Payment
  {
    id: "faq-pm1",
    category: "Payment",
    question: "What payment methods are accepted?",
    answer: "We accept Cash on Collection, UPI (Google Pay, PhonePe, Paytm), Credit/Debit Cards, Net Banking, and Online Portal Payments."
  },
  {
    id: "faq-pm2",
    category: "Payment",
    question: "Can I pay online or pay the phlebotomist directly?",
    answer: "Both options are available! You can pay online while booking or pay the phlebotomist directly via UPI QR code or cash after sample collection."
  }
];
