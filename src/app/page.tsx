"use client"

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

import { 
  FaArrowRight, 
  FaPlay, 
  FaUserMd, 
  FaShieldAlt, 
  FaStethoscope, 
  FaStar, 
  FaCheckCircle 
} from 'react-icons/fa';

export default function HomeHero() {
  return (
    <section className="relative isolate w-full min-h-[650px] overflow-hidden bg-[#10283A] text-white flex items-center">
      {/* Background Image & Cinematic Overlay */}
      <div className="absolute inset-0 -z-20 overflow-hidden">
        {/* Replace with your project's medical consultation background image path or reliable URL */}
        <Image
          src="https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?auto=format&fit=crop&q=80&w=2000"
          alt="Medical consultation background"
          fill
          priority
          className="object-cover object-center opacity-25 scale-105 transform animate-pulse duration-[10000ms]"
        />
        {/* Multi-layered navy gradient for optimal contrast */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#10283A] via-[#10283A]/90 to-[#10283A]/60" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#10283A] via-transparent to-black/30" />
      </div>

      {/* Main Content Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full py-16 lg:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left-Side Content (40-45% width on desktop -> 7 columns) */}
          <div className="lg:col-span-7 flex flex-col items-start z-10 space-y-6">
            
            {/* Eyebrow Label */}
            <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-white/10 border border-white/10 backdrop-blur-md">
              <span className="w-2 h-2 rounded-full bg-[#3268F5] animate-ping" />
              <span className="text-xs sm:text-sm font-semibold tracking-wider uppercase text-white/90">
                TRUSTED HEALTHCARE SOLUTIONS
              </span>
            </div>

            {/* Main Headline */}
            <h1 className="text-3xl sm:text-5xl lg:text-[52px] font-bold tracking-tight leading-[1.15]">
              Your Health, Our <br className="hidden sm:inline" />
              Priority For A <br className="hidden sm:inline" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-[#D0D8E0] to-[#4C7DFF]">
                Healthier Tomorrow
              </span>
            </h1>

            {/* Supporting Description */}
            <p className="text-sm sm:text-base text-[#D0D8E0] max-w-xl leading-relaxed">
              Experience compassionate, reliable, and modern healthcare services designed around your needs. From expert consultations to advanced medical care, we&apos;re here to support your healthier life.
            </p>

            {/* CTA Buttons Action Group */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              {/* Primary CTA Button */}
              <Link
                href="/services"
                className="inline-flex items-center justify-center bg-[#3268F5] hover:bg-[#2552d0] text-white font-semibold py-3.5 px-7 rounded-full shadow-lg shadow-[#3268F5]/25 transition-all duration-300 group focus:outline-none focus:ring-2 focus:ring-white/50"
              >
                <span>Discover More</span>
                <span className="ml-3 w-8 h-8 rounded-full bg-white/20 flex items-center justify-center transition-transform duration-300 group-hover:translate-x-1">
                  <FaArrowRight className="w-3.5 h-3.5 text-white" />
                </span>
              </Link>

              {/* Watch Video Action */}
              <button
                type="button"
                onClick={() => console.log('Video action triggered')}
                className="inline-flex items-center space-x-3 py-3 px-5 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 backdrop-blur-md transition-all duration-300 group focus:outline-none focus:ring-2 focus:ring-white/50"
              >
                <span className="relative w-10 h-10 rounded-full bg-[#3268F5]/30 flex items-center justify-center">
                  <span className="absolute inset-0 rounded-full bg-[#3268F5] animate-ping opacity-30" />
                  <FaPlay className="w-3.5 h-3.5 text-white ml-0.5" />
                </span>
                <span className="font-semibold text-sm sm:text-base text-white">Watch Video</span>
              </button>
            </div>

            {/* Trust Badges / Quick Highlights */}
            <div className="pt-4 flex items-center space-x-6 text-xs sm:text-sm text-[#D0D8E0]">
              <div className="flex items-center space-x-2">
                <FaCheckCircle className="text-[#4C7DFF] w-4 h-4" />
                <span>24/7 Emergency Support</span>
              </div>
              <div className="flex items-center space-x-2">
                <FaCheckCircle className="text-[#4C7DFF] w-4 h-4" />
                <span>Certified Specialists</span>
              </div>
            </div>
          </div>

          {/* Right-Side Foreground Doctor Image & Floating Cards (5 columns) */}
          <div className="lg:col-span-5 relative flex items-center justify-center min-h-[500px] lg:min-h-[600px]">
            
            {/* Background Glow / Backdrop Shape */}
            <div className="absolute w-72 h-72 sm:w-96 sm:h-96 bg-[#3268F5]/20 rounded-full blur-3xl -z-10 pointer-events-none" />

            {/* Healthcare Professional Image (Foreground Doctor) */}
            <div className="relative w-full h-[480px] sm:h-[560px] flex items-end justify-center">
              {/* Replace with your project's doctor image asset or public path */}
              <Image
                src="https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&q=80&w=1000"
                alt="Professional Healthcare Doctor"
                fill
                priority
                className="object-contain object-bottom drop-shadow-2xl"
              />
            </div>

            {/* --- FLOATING INFORMATION CARDS --- */}

            {/* Card 1: Trusted Specialists (Upper-Right Corner) */}
            <div className="absolute top-4 right-0 sm:right-2 bg-white/10 border border-white/15 backdrop-blur-md rounded-xl p-3.5 shadow-xl flex items-center space-x-3 animate-bounce duration-1000">
              <div className="w-10 h-10 rounded-lg bg-[#3268F5] flex items-center justify-center text-white shrink-0">
                <FaUserMd className="w-5 h-5" />
              </div>
              <div>
                <div className="text-lg font-bold text-white">2000+</div>
                <div className="text-xs text-[#D0D8E0]">Trusted Specialists</div>
              </div>
            </div>

            {/* Card 5: Trusted Healthcare Professionals (Upper-Middle, Tilted) */}
            <div className="absolute top-28 left-0 sm:-left-4 bg-[#17364B]/80 border border-white/10 backdrop-blur-md rounded-xl p-3 shadow-lg max-w-[200px] transform -rotate-3 hover:rotate-0 transition-transform">
              <div className="flex items-start space-x-2.5">
                <div className="p-2 rounded-lg bg-[#4C7DFF]/20 text-[#4C7DFF]">
                  <FaStethoscope className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-white">Expert Care</h4>
                  <p className="text-[11px] text-[#D0D8E0] leading-tight mt-0.5">Patient-first medical approach.</p>
                </div>
              </div>
            </div>

            {/* Card 2: Advanced Medical Technology (Middle-Right) */}
            <div className="absolute top-1/2 -right-4 sm:-right-8 transform -translate-y-1/2 bg-[#17364B]/90 border border-white/15 backdrop-blur-md rounded-xl p-3.5 shadow-xl max-w-[220px] hidden sm:block">
              <div className="flex items-start space-x-3">
                <div className="p-2 rounded-lg bg-[#3268F5]/20 text-[#4C7DFF] shrink-0">
                  <FaShieldAlt className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-white">Advanced Technology</h4>
                  <p className="text-[11px] text-[#D0D8E0] leading-tight mt-0.5">Modern treatment methods & equipment.</p>
                </div>
              </div>
            </div>

            {/* Card 4: Patient Reviews (Lower-Middle area) */}
            <div className="absolute bottom-16 left-2 sm:left-0 bg-white/10 border border-white/10 backdrop-blur-md rounded-xl p-3 shadow-lg flex items-center space-x-3">
              <div className="flex -space-x-2 overflow-hidden">
                <img className="inline-block h-7 w-7 rounded-full ring-2 ring-[#10283A]" src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=100" alt="Patient 1" />
                <img className="inline-block h-7 w-7 rounded-full ring-2 ring-[#10283A]" src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=100" alt="Patient 2" />
                <img className="inline-block h-7 w-7 rounded-full ring-2 ring-[#10283A]" src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=100" alt="Patient 3" />
              </div>
              <div>
                <div className="flex items-center space-x-1">
                  <FaStar className="w-3 h-3 text-yellow-400" />
                  <span className="text-xs font-bold text-white">4.9</span>
                </div>
                <div className="text-[11px] text-[#D0D8E0]">Reviews from 5.6k patient.</div>
              </div>
            </div>

            {/* Card 3: Safe & Quality Care (Lower-Right Corner) */}
            <div className="absolute bottom-2 right-2 sm:right-4 bg-[#17364B]/90 border border-white/15 backdrop-blur-md rounded-xl p-3 shadow-xl max-w-[210px]">
              <div className="flex items-start space-x-2.5">
                <div className="p-2 rounded-lg bg-emerald-500/20 text-emerald-400 shrink-0">
                  <FaShieldAlt className="w-4 h-4" />
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
  );
}