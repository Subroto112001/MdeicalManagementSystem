import React from "react";
import { PricingPlan } from "@/types/pricing";
import { IconProvider } from "@/Iconprovider/IconproviderFIle";

interface PricingCardProps {
  plan: PricingPlan;
  onSelectPlan?: (planId: string) => void;
}

export const PricingCard: React.FC<PricingCardProps> = ({ plan, onSelectPlan }) => {
  const { id, name, price, billingPeriod, description, features, buttonText, highlighted } = plan;

  return (
    <div
      className={`hover:scale-102 relative flex flex-col h-full rounded-2xl p-6 sm:p-8 transition-all duration-300 ${
        highlighted
          ? "bg-white ring-2 ring-blue-600 shadow-xl lg:-translate-y-2"
          : "bg-white border border-slate-200 shadow-sm hover:shadow-md"
      }`}
    >
      {highlighted && (
        <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-blue-600 text-white text-xs font-semibold uppercase tracking-wider px-4 py-1 rounded-full shadow-md">
          Most Popular
        </div>
      )}

      {/* Plan Title & Description */}
      <div className="mb-6">
        <h3 className="text-xl font-bold text-slate-900 tracking-tight">{name}</h3>
        {description && <p className="text-sm text-slate-500 mt-1">{description}</p>}
      </div>

      {/* Price Badge / Display */}
      <div className="mb-6 pb-6 border-b border-slate-100 flex items-baseline justify-between">
        <div>
          <span className="text-4xl font-extrabold text-slate-900 tracking-tight">${price}</span>
          <span className="text-slate-500 text-sm font-medium ml-1">/ {billingPeriod.toLowerCase()}</span>
        </div>
        <div
          className={`text-xs font-semibold px-2.5 py-1 rounded-full ${
            highlighted ? "bg-emerald-50 text-emerald-700" : "bg-slate-100 text-slate-600"
          }`}
        >
          {billingPeriod}
        </div>
      </div>

      {/* Feature List */}
      <div className="flex-1 mb-8">
        <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-4">
          What&apos;s included
        </p>
        <ul role="list" className="space-y-3.5">
          {features.map((feature, index) => (
            <li key={`${id}-feature-${index}`} className="flex items-start text-sm text-slate-700">
              <span className="flex-shrink-0 w-5 h-5 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center mr-3 mt-0.5" aria-hidden="true">
                <IconProvider.Check className="w-3.5 h-3.5" />
              </span>
              <span className="leading-snug">{feature}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* CTA Button */}
      <div className="mt-auto pt-2">
        <button
          type="button"
          onClick={() => onSelectPlan?.(id)}
          className={`cursor-pointer w-full inline-flex items-center justify-center font-semibold py-3 px-6 rounded-full transition-all duration-200 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-600 ${
            highlighted
              ? "bg-blue-600 hover:bg-blue-700 text-white shadow-md shadow-blue-600/25"
              : "bg-slate-900 hover:bg-slate-800 text-white"
          }`}
        >
          <span>{buttonText}</span>
          <span className="ml-2 w-5 h-5 rounded-full bg-white/20 flex items-center justify-center transition-transform duration-200 group-hover:translate-x-0.5" aria-hidden="true">
            <IconProvider.FiArrowRight className="w-3 h-3 text-white" />
          </span>
        </button>
      </div>
    </div>
  );
};