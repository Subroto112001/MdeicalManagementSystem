export type PricingPlan = {
  id: string;
  name: string;
  price: number;
  billingPeriod: string;
  description?: string;
  features: string[];
  buttonText: string;
  highlighted?: boolean;
};