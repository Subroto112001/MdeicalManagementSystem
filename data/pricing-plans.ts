import {PricingPlan} from "@/types/pricing"

export const pricingPlans: PricingPlan[] = [
  {
    id: "basic",
    name: "Basic Plan",
    price: 150,
    billingPeriod: "Monthly",
    description: "Essential healthcare coverage for individuals seeking routine monitoring.",
    features: [
      "Routine health checkups included.",
      "Basic blood test reports.",
      "General physician video consultations.",
      "Standard prescription delivery service.",
      "Monthly health tracking updates.",
      "Email customer support access.",
    ],
    buttonText: "Choose Plan",
  },
  {
    id: "standard",
    name: "Standard Plan",
    price: 200,
    billingPeriod: "Monthly",
    description: "Advanced medical services with priority booking and diagnostics.",
    features: [
      "Priority doctor appointment bookings.",
      "Comprehensive diagnostic lab tests.",
      "Specialist consultation discount offers.",
      "24/7 urgent helpline access.",
      "Personalized wellness diet plans.",
      "Family health record management.",
    ],
    buttonText: "Choose Plan",
    highlighted: true,
  },
  {
    id: "premium",
    name: "Premium Plan",
    price: 250,
    billingPeriod: "Monthly",
    description: "Ultimate VIP healthcare and complete wellness management.",
    features: [
      "Unlimited specialist doctor consultations.",
      "Complete annual health screening.",
      "Dedicated personal care coordinator.",
      "Free home sample collection.",
      "24/7 emergency medical support.",
      "VIP health lounge access.",
    ],
    buttonText: "Choose Plan",
  },
];