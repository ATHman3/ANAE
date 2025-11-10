"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import DonationModal from "./DonationModal";

interface DonateButtonProps {
  className?: string;
}

export default function DonateButton({ className = "" }: DonateButtonProps) {
  const t = useTranslations("nav");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleDonateClick = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <div className={`relative group ${className}`}>
        {/* Animated border background */}
        <div 
          className="absolute -inset-1 rounded-lg blur opacity-90 animate-pulse"
          style={{
            background: 'linear-gradient(to right, #42b883, #42b883)'
          }}
        ></div>
        
        {/* Button content */}
        <button onClick={handleDonateClick}>
          <div 
            className="relative px-4 py-2 rounded-sm leading-none flex items-center justify-center space-x-2 rtl:space-x-reverse hover:shadow-lg transition-all duration-300 transform active:scale-95 group-hover:scale-105 min-w-[170px] w-fit cursor-pointer"
            style={{
              background: 'linear-gradient(to right, #42b883, #369870)',
              boxShadow: '0 0 0 0 rgba(66, 184, 131, 0)'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.boxShadow = '0 10px 25px rgba(66, 184, 131, 0.5)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.boxShadow = '0 0 0 0 rgba(66, 184, 131, 0)';
            }}
          >
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              className="w-6 h-6 text-red-500 flex-shrink-0 transition-all duration-300 transform group-hover:scale-105 group-hover:drop-shadow-[0_4px_8px_rgba(220,38,38,0.4)]" 
              width={22} 
              height={22} 
              viewBox="0 0 24 24"
            >
              <path 
                fill="currentColor" 
                d="m12 21.35l-1.45-1.32C5.4 15.36 2 12.27 2 8.5C2 5.41 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.08C13.09 3.81 14.76 3 16.5 3C19.58 3 22 5.41 22 8.5c0 3.77-3.4 6.86-8.55 11.53z" 
              />
            </svg>
            <span className="text-white font-semibold text-base whitespace-nowrap transition-all duration-300 transform group-hover:scale-105 group-hover:drop-shadow-[0_4px_8px_rgba(255,255,255,0.4)]">{t('donate').toLocaleUpperCase()}</span>
          </div>
        </button>
      </div>

      {/* Donation Modal */}
      <DonationModal isOpen={isModalOpen} onClose={handleCloseModal} />
    </>
  );
}
