"use client";

import { useState, useEffect, useCallback } from "react";
import { createPortal } from "react-dom";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { X, Shield, Copy, Check } from "lucide-react";
import { Button } from "./button";

interface DonationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function DonationModal({ isOpen, onClose }: DonationModalProps) {
  const t = useTranslations("donation");
  const [copiedField, setCopiedField] = useState<string | null>(null);
  const [showSepaDetails, setShowSepaDetails] = useState(false);
  const [showBizumDetails, setShowBizumDetails] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleCopy = useCallback(async (text: string, field: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedField(field);
      setTimeout(() => setCopiedField(null), 2000);
    } catch (err) {
      if (process.env.NODE_ENV === 'development') {
        console.error("Failed to copy text: ", err);
      }
    }
  }, []);

  const handlePayPalClick = useCallback(() => {
    // Ici vous pouvez ajouter l'intégration PayPal réelle
    window.open("https://paypal.com", "_blank");
  }, []);

  if (!isOpen || !mounted) return null;


  const modalContent = (
    <div 
      className="fixed inset-0 z-[100]"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        width: '100vw',
        height: '100vh'
      }}
    >
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/50 backdrop-blur-sm"
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          width: '100vw',
          height: '100vh',
          zIndex: 1
        }}
        onClick={onClose}
      />
      
      {/* Modal Container */}
      <div 
        className="relative flex items-center justify-center p-4"
        style={{
          position: 'relative',
          zIndex: 2,
          width: '100%',
          height: '100%'
        }}
      >
      
      {/* Modal */}
      <div className="relative bg-white dark:bg-gray-900 rounded-lg shadow-2xl max-w-4xl lg:max-w-5xl w-full max-h-[90vh] overflow-y-auto" style={{ margin: 'auto' }}>
        {/* Close Button - positioned absolutely in top right corner */}
        <Button
          variant="ghost"
          size="icon"
          onClick={onClose}
          className="absolute top-4 right-4 z-10 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800"
        >
          <X className="h-6 w-6" />
        </Button>
        
        {/* Header */}
        <div className="p-6 lg:p-7 border-b border-gray-200 dark:border-gray-700">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
              {t("title")}
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mt-1">
              {t("subtitle")}
            </p>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 lg:p-7">
          {/* Payment Methods Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-7 mb-8">
            {/* PayPal */}
            <div className="group relative h-full">
              <div className="absolute -inset-1 rounded-lg bg-gradient-to-r from-blue-500 to-blue-600 opacity-75 group-hover:opacity-100 transition duration-300 blur"></div>
              <div className="relative h-full flex flex-col bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-all duration-300">
                <div className="flex items-start mb-4">
                  <div className="rounded-lg flex items-center justify-center bg-blue-50 dark:bg-blue-900/20 flex-shrink-0" style={{ width: '48px', height: '48px' }}>
                    <Image 
                      src="/images/icons/paypal-logo.svg"
                      alt="PayPal"
                      width={28}
                      height={28}
                      className="w-7 h-7 object-contain"
                    />
                  </div>
                  <div className="ms-4 flex-1">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                      {t("methods.paypal.title")}
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {t("methods.paypal.description")}
                    </p>
                  </div>
                </div>
                <Button
                  onClick={handlePayPalClick}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white mt-auto"
                >
                  {t("methods.paypal.button")}
                </Button>
              </div>
            </div>

            {/* Bizum */}
            <div className="group relative h-full">
              <div className="absolute -inset-1 rounded-lg opacity-75 group-hover:opacity-100 transition duration-300 blur" style={{ background: 'linear-gradient(to right, #078387, #0a9da2)' }}></div>
              <div className="relative h-full flex flex-col bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-all duration-300">
                <div className="flex items-start mb-4">
                  <div className="rounded-lg flex items-center justify-center flex-shrink-0" style={{ backgroundColor: 'rgba(7, 131, 135, 0.1)', width: '48px', height: '48px' }}>
                    <Image 
                      src="/images/icons/bizum-logo.svg"
                      alt="Bizum"
                      width={28}
                      height={28}
                      className="w-7 h-7 object-contain"
                    />
                  </div>
                  <div className="ms-4 flex-1">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                      {t("methods.bizum.title")}
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {t("methods.bizum.description")}
                    </p>
                  </div>
                </div>
                <Button
                  onClick={() => {
                    if (showBizumDetails) {
                      setShowBizumDetails(false);
                    } else {
                      setShowBizumDetails(true);
                      setShowSepaDetails(false);
                    }
                  }}
                  className="w-full text-white mt-auto"
                  style={{ backgroundColor: '#078387' }}
                  onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#066b6f'}
                  onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#078387'}
                >
                  {t("methods.bizum.button")}
                </Button>
              </div>
            </div>

            {/* Bizum Details - Mobile only (appears right after Bizum card) */}
            {showBizumDetails && (
              <div className="md:hidden col-span-1 bg-gray-50 dark:bg-gray-800 rounded-lg p-6 -mt-2">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                  {t("methods.bizum.details.title")}
                </h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between bg-white dark:bg-gray-700 p-3 rounded-lg">
                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                      {t("methods.bizum.details.phone")}
                    </span>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleCopy("654155924", "bizum-phone")}
                      className="ms-2"
                    >
                      {copiedField === "bizum-phone" ? (
                        <Check className="h-4 w-4 text-green-600" />
                      ) : (
                        <Copy className="h-4 w-4" />
                      )}
                    </Button>
                  </div>
                </div>
              </div>
            )}

            {/* SEPA */}
            <div className="group relative h-full">
              <div className="absolute -inset-1 rounded-lg opacity-75 group-hover:opacity-100 transition duration-300 blur" style={{ background: 'linear-gradient(to right, #0F2A8E, #1a3fb8)' }}></div>
              <div className="relative h-full flex flex-col bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-all duration-300">
                <div className="flex items-start mb-4">
                  <div className="rounded-lg flex items-center justify-center flex-shrink-0" style={{ backgroundColor: 'rgba(15, 42, 142, 0.1)', width: '48px', height: '48px' }}>
                    <Image 
                      src="/images/icons/sepa-logo.svg"
                      alt="SEPA"
                      width={28}
                      height={28}
                      className="w-7 h-7 object-contain"
                    />
                  </div>
                  <div className="ms-4 flex-1">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                      {t("methods.sepa.title")}
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {t("methods.sepa.description")}
                    </p>
                  </div>
                </div>
                <Button
                  onClick={() => {
                    if (showSepaDetails) {
                      setShowSepaDetails(false);
                    } else {
                      setShowSepaDetails(true);
                      setShowBizumDetails(false);
                    }
                  }}
                  className="w-full text-white mt-auto"
                  style={{ backgroundColor: '#0F2A8E' }}
                  onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#0c2270'}
                  onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#0F2A8E'}
                >
                  {t("methods.sepa.button")}
                </Button>
              </div>
            </div>
          </div>

          {/* Bizum Details - Desktop only (appears at bottom) */}
          {showBizumDetails && (
            <div className="hidden md:block bg-gray-50 dark:bg-gray-800 rounded-lg p-6 mb-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                {t("methods.bizum.details.title")}
              </h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between bg-white dark:bg-gray-700 p-3 rounded-lg">
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    {t("methods.bizum.details.phone")}
                  </span>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handleCopy("654155924", "bizum-phone")}
                    className="ms-2"
                  >
                    {copiedField === "bizum-phone" ? (
                      <Check className="h-4 w-4 text-green-600" />
                    ) : (
                      <Copy className="h-4 w-4" />
                    )}
                  </Button>
                </div>
              </div>
            </div>
          )}

          {/* SEPA Details */}
          {showSepaDetails && (
            <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-6 mb-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                {t("methods.sepa.details.title")}
              </h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between bg-white dark:bg-gray-700 p-3 rounded-lg">
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    {t("methods.sepa.details.iban")}
                  </span>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handleCopy("ES8100490401112210272614", "iban")}
                    className="ms-2"
                  >
                    {copiedField === "iban" ? (
                      <Check className="h-4 w-4 text-green-600" />
                    ) : (
                      <Copy className="h-4 w-4" />
                    )}
                  </Button>
                </div>
                <div className="flex items-center justify-between bg-white dark:bg-gray-700 p-3 rounded-lg">
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    {t("methods.sepa.details.beneficiary")}
                  </span>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handleCopy("Asociación Nacional de Argelinos en España", "beneficiary")}
                    className="ms-2"
                  >
                    {copiedField === "beneficiary" ? (
                      <Check className="h-4 w-4 text-green-600" />
                    ) : (
                      <Copy className="h-4 w-4" />
                    )}
                  </Button>
                </div>
              </div>
            </div>
          )}

          {/* Security & Transparency */}
          <div className="flex flex-col sm:flex-row items-center justify-between bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
            <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400 mb-2 sm:mb-0">
              <Shield className="h-4 w-4 text-green-600" />
              <span>{t("secure")}</span>
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400">
              {t("transparency")}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex justify-end p-6 lg:p-7 border-t border-gray-200 dark:border-gray-700">
          <Button variant="outline" onClick={onClose}>
            {t("close")}
          </Button>
        </div>
      </div>
      </div>
    </div>
  );

  return createPortal(modalContent, document.body);
}