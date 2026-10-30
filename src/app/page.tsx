"use client"

import Image from 'next/image';
import Link from 'next/link';

// Import your centralized icon provider (adjust path relative to your folder structure)
 import {IconProvider} from "@/Iconprovider/IconproviderFIle"
import { pricingPlans } from '../../data/pricing-plans';
import { PricingCard } from '@/components/FrontendComponent/pricing/PricingCard';
import { FiTag } from 'react-icons/fi';

export default function HomeHero() {


  const handleSelectPlan = (planId: string) => {
    // Placeholder handler for selection or redirect
    console.log(`Selected plan: ${planId}`);
  };


  return (
    <>
      <section className="relative isolate w-full min-h-[650px] overflow-hidden bg-[#10283A] text-white flex items-center">
        {/* Background Image & Cinematic Overlay */}
        <div className="absolute inset-0 -z-20 overflow-hidden">
          <Image
            src="https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?auto=format&fit=crop&q=80&w=2000"
            alt="Medical consultation background"
            fill
            priority
            className="object-cover object-center opacity-25 scale-105 transform animate-pulse duration-[10000ms]"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#10283A] via-[#10283A]/90 to-[#10283A]/60" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#10283A] via-transparent to-black/30" />
        </div>

        {/* Main Content Container */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full py-16 lg:py-24">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
            
            {/* Left-Side Content */}
            <div className="lg:col-span-7 flex flex-col items-start z-10 space-y-6">
              
              <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-white/10 border border-white/10 backdrop-blur-md">
                <span className="w-2 h-2 rounded-full bg-[#3268F5] animate-ping" />
                <span className="text-xs sm:text-sm font-semibold tracking-wider uppercase text-white/90">
                  TRUSTED HEALTHCARE SOLUTIONS
                </span>
              </div>

              <h1 className="text-3xl sm:text-5xl lg:text-[52px] font-bold tracking-tight leading-[1.15]">
                Your Health, Our <br className="hidden sm:inline" />
                Priority For A <br className="hidden sm:inline" />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-[#D0D8E0] to-[#4C7DFF]">
                  Healthier Tomorrow
                </span>
              </h1>

              <p className="text-sm sm:text-base text-[#D0D8E0] max-w-xl leading-relaxed">
                Experience compassionate, reliable, and modern healthcare services designed around your needs. From expert consultations to advanced medical care, we&apos;re here to support your healthier life.
              </p>

              <div className="flex flex-wrap items-center gap-4 pt-2">
                <Link
                  href="/services"
                  className="inline-flex items-center justify-center bg-[#3268F5] hover:bg-[#2552d0] text-white font-semibold py-3.5 px-7 rounded-full shadow-lg shadow-[#3268F5]/25 transition-all duration-300 group focus:outline-none focus:ring-2 focus:ring-white/50"
                >
                  <span>Discover More</span>
                  <span className="ml-3 w-8 h-8 rounded-full bg-white/20 flex items-center justify-center transition-transform duration-300 group-hover:translate-x-1">
                    <IconProvider.ArrowRight className="w-3.5 h-3.5 text-white" />
                  </span>
                </Link>

                <button
                  type="button"
                  onClick={() => console.log('Video action triggered')}
                  className="inline-flex items-center space-x-3 py-3 px-5 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 backdrop-blur-md transition-all duration-300 group focus:outline-none focus:ring-2 focus:ring-white/50"
                >
                  <span className="relative w-10 h-10 rounded-full bg-[#3268F5]/30 flex items-center justify-center">
                    <span className="absolute inset-0 rounded-full bg-[#3268F5] animate-ping opacity-30" />
                    <IconProvider.Play className="w-3.5 h-3.5 text-white ml-0.5" />
                  </span>
                  <span className="font-semibold text-sm sm:text-base text-white">Watch Video</span>
                </button>
              </div>

              <div className="pt-4 flex items-center space-x-6 text-xs sm:text-sm text-[#D0D8E0]">
                <div className="flex items-center space-x-2">
                  <IconProvider.CheckCircle className="text-[#4C7DFF] w-4 h-4" />
                  <span>24/7 Emergency Support</span>
                </div>
                <div className="flex items-center space-x-2">
                  <IconProvider.CheckCircle className="text-[#4C7DFF] w-4 h-4" />
                  <span>Certified Specialists</span>
                </div>
              </div>
            </div>

            {/* Right-Side Foreground Doctor Image & Floating Cards */}
            <div className="lg:col-span-5 relative flex items-center justify-center min-h-[500px] lg:min-h-[600px]">
              <div className="absolute w-72 h-72 sm:w-96 sm:h-96 bg-[#3268F5]/20 rounded-full blur-3xl -z-10 pointer-events-none" />

              <div className="relative w-full h-[480px] sm:h-[560px] flex items-end justify-center">
                <Image
                  src="https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&q=80&w=1000"
                  alt="Professional Healthcare Doctor"
                  fill
                  priority
                  className="object-contain object-bottom drop-shadow-2xl"
                />
              </div>

              <div className="absolute top-4 right-0 sm:right-2 bg-white/10 border border-white/15 backdrop-blur-md rounded-xl p-3.5 shadow-xl flex items-center space-x-3 animate-bounce duration-1000">
                <div className="w-10 h-10 rounded-lg bg-[#3268F5] flex items-center justify-center text-white shrink-0">
                  <IconProvider.UserMd className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-lg font-bold text-white">2000+</div>
                  <div className="text-xs text-[#D0D8E0]">Trusted Specialists</div>
                </div>
              </div>

              <div className="absolute top-28 left-0 sm:-left-4 bg-[#17364B]/80 border border-white/10 backdrop-blur-md rounded-xl p-3 shadow-lg max-w-[200px] transform -rotate-3 hover:rotate-0 transition-transform">
                <div className="flex items-start space-x-2.5">
                  <div className="p-2 rounded-lg bg-[#4C7DFF]/20 text-[#4C7DFF]">
                    <IconProvider.Stethoscope className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-white">Expert Care</h4>
                    <p className="text-[11px] text-[#D0D8E0] leading-tight mt-0.5">Patient-first medical approach.</p>
                  </div>
                </div>
              </div>

              <div className="absolute top-1/2 -right-4 sm:-right-8 transform -translate-y-1/2 bg-[#17364B]/90 border border-white/15 backdrop-blur-md rounded-xl p-3.5 shadow-xl max-w-[220px] hidden sm:block">
                <div className="flex items-start space-x-3">
                  <div className="p-2 rounded-lg bg-[#3268F5]/20 text-[#4C7DFF] shrink-0">
                    <IconProvider.ShieldAlt className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-white">Advanced Technology</h4>
                    <p className="text-[11px] text-[#D0D8E0] leading-tight mt-0.5">Modern treatment methods & equipment.</p>
                  </div>
                </div>
              </div>

              <div className="absolute bottom-16 left-2 sm:left-0 bg-white/10 border border-white/10 backdrop-blur-md rounded-xl p-3 shadow-lg flex items-center space-x-3">
                <div className="flex -space-x-2 overflow-hidden">
                  <img className="inline-block h-7 w-7 rounded-full ring-2 ring-[#10283A]" src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=100" alt="Patient 1" />
                  <img className="inline-block h-7 w-7 rounded-full ring-2 ring-[#10283A]" src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=100" alt="Patient 2" />
                  <img className="inline-block h-7 w-7 rounded-full ring-2 ring-[#10283A]" src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=100" alt="Patient 3" />
                </div>
                <div>
                  <div className="flex items-center space-x-1">
                    <IconProvider.Star className="w-3 h-3 text-yellow-400" />
                    <span className="text-xs font-bold text-white">4.9</span>
                  </div>
                  <div className="text-[11px] text-[#D0D8E0]">Reviews from 5.6k patient.</div>
                </div>
              </div>

              <div className="absolute bottom-2 right-2 sm:right-4 bg-[#17364B]/90 border border-white/15 backdrop-blur-md rounded-xl p-3 shadow-xl max-w-[210px]">
                <div className="flex items-start space-x-2.5">
                  <div className="p-2 rounded-lg bg-emerald-500/20 text-emerald-400 shrink-0">
                    <IconProvider.ShieldAlt className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-white">Safe & Quality Care</h4>
                    <p className="text-[11px] text-[#D0D8E0] leading-tight mt-0.5">Focused on safety & trusted outcomes.</p>
                  </div>
                </div>
              </div>

            </div>

          </div>
        </div>
      </section>

      <section className="relative w-full py-20 bg-slate-50 text-slate-900 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            
            <div className="lg:col-span-6 relative flex items-center justify-center">
              <div className="relative w-full max-w-[560px] h-[460px] sm:h-[500px] bg-[#17364B] rounded-2xl overflow-hidden shadow-xl flex items-end justify-center">
                <div className="absolute inset-0 bg-gradient-to-t from-[#10283A] via-transparent to-transparent opacity-60" />
                <div className="relative w-full h-[480px] sm:h-[520px] flex items-end justify-center z-10">
                  <Image
                    src="https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&q=80&w=1000"
                    alt="Professional male doctor with stethoscope"
                    fill
                    className="object-contain object-bottom drop-shadow-2xl"
                  />
                </div>
              </div>

              <div className="absolute -top-4 left-2 sm:-left-4 z-20 w-32 h-32 sm:w-36 sm:h-36 rounded-full bg-white shadow-xl flex items-center justify-center border border-slate-100 p-2">
                <svg className="absolute w-full h-full animate-[spin_20s_linear_infinite]" viewBox="0 0 100 100" width="100%" height="100%">
                  <defs>
                    <path id="circlePath" d="M 50, 50 m -37, 0 a 37,37 0 1,1 74,0 a 37,37 0 1,1 -74,0" />
                  </defs>
                  <text className="text-[10px] font-bold tracking-widest fill-[#10283A]" style={{ textTransform: 'uppercase' }}>
                    <textPath href="#circlePath" startOffset="0%">
                      GENTLE TOUCH • EXPERT HANDS •
                    </textPath>
                  </text>
                </svg>
                <div className="w-12 h-12 rounded-full bg-[#3268F5] text-white flex items-center justify-center shadow-md z-10">
                  <IconProvider.ArrowRight className="w-4 h-4 transform -rotate-45" />
                </div>
              </div>

              <div className="absolute top-6 right-2 sm:-right-4 z-20 space-y-3">
                <div className="bg-white/95 backdrop-blur-md border border-slate-100 shadow-lg rounded-full py-2.5 px-5 flex items-center space-x-3 max-w-[220px]">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#3268F5] shrink-0" />
                  <span className="text-xs sm:text-sm font-semibold text-[#10283A] truncate">Comfortable Clinic</span>
                </div>
                <div className="bg-white/95 backdrop-blur-md border border-slate-100 shadow-lg rounded-full py-2.5 px-5 flex items-center space-x-3 max-w-[220px] ml-4">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#4C7DFF] shrink-0" />
                  <span className="text-xs sm:text-sm font-semibold text-[#10283A] truncate">Stress-Free Experience</span>
                </div>
                <div className="bg-white/95 backdrop-blur-md border border-slate-100 shadow-lg rounded-full py-2.5 px-5 flex items-center space-x-3 max-w-[220px]">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#3268F5] shrink-0" />
                  <span className="text-xs sm:text-sm font-semibold text-[#10283A] truncate">Honest Guidance</span>
                </div>
              </div>
            </div>

            <div className="lg:col-span-6 flex flex-col items-start space-y-6">
              <div className="inline-flex items-center space-x-2 text-[#3268F5] font-semibold text-sm tracking-wide uppercase bg-blue-50 px-3.5 py-1.5 rounded-full border border-blue-100">
                <IconProvider.Stethoscope className="w-4 h-4 text-[#3268F5]" />
                <span>Why Choose Us</span>
              </div>

              <h2 className="text-3xl sm:text-4xl xl:text-[46px] font-bold text-[#10283A] tracking-tight leading-[1.15]">
                Exceptional Medical Care You <br className="hidden sm:inline" />
                Can Trust
              </h2>

              <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
                At Healtho, we combine innovation, expertise, and compassionate care to deliver a healthcare experience that is not only effective but truly comfortable and personalized for every patient.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full pt-2">
                <div className="bg-white border border-slate-100 rounded-xl p-5 shadow-sm hover:shadow-md transition-shadow flex flex-col items-start">
                  <div className="w-11 h-11 rounded-full bg-[#3268F5] flex items-center justify-center text-white mb-4 shadow-sm shadow-[#3268F5]/30">
                    <IconProvider.Heartbeat className="w-5 h-5" />
                  </div>
                  <h3 className="text-base font-bold text-[#10283A] mb-2">
                    Advanced Medical Technology
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    Utilizing state-of-the-art diagnostic equipment and cutting-edge clinical tools to ensure accurate and effective treatments.
                  </p>
                </div>

                <div className="bg-white border border-slate-100 rounded-xl p-5 shadow-sm hover:shadow-md transition-shadow flex flex-col items-start">
                  <div className="w-11 h-11 rounded-full bg-[#3268F5] flex items-center justify-center text-white mb-4 shadow-sm shadow-[#3268F5]/30">
                    <IconProvider.UserMd className="w-5 h-5" />
                  </div>
                  <h3 className="text-base font-bold text-[#10283A] mb-2">
                    Personalized Treatment Plans
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    Every patient receives customized care strategies tailored specifically to their unique health requirements and medical history.
                  </p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>
      <section className="relative w-full py-20 px-4 sm:px-6 lg:px-8 bg-[#F3F5F7] text-slate-900 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center space-x-2 text-blue-600 font-semibold text-sm tracking-wide uppercase bg-blue-50 px-4 py-1.5 rounded-full border border-blue-100 mb-4 shadow-sm">
            <FiTag className="w-4 h-4" aria-hidden="true" />
            <span>Pricing</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 tracking-tight leading-tight">
            Choose Your Health Care &amp; Wellness Package
          </h2>
          <p className="text-base sm:text-lg text-slate-600 mt-4 leading-relaxed">
            Select the optimal healthcare plan tailored to your medical needs, offering complete peace of mind and expert professional support.
          </p>
        </div>

        {/* Pricing Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 items-stretch">
          {pricingPlans.map((plan) => (
            <PricingCard key={plan.id} plan={plan} onSelectPlan={handleSelectPlan} />
          ))}
        </div>
      </div>
    </section>
    </>
  );
}