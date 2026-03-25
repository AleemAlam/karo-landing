'use client';

import { useTranslations } from 'next-intl';
import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { motion } from 'framer-motion';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

type PaymentPlan = 'weekly' | 'onetime';

// Checkmark icon component
const CheckIcon = ({ className = "text-orange-500" }: { className?: string }) => (
    <svg className={`w-5 h-5 flex-shrink-0 ${className}`} viewBox="0 0 20 20" fill="currentColor">
        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
    </svg>
);

// Gift icon component
const GiftIcon = () => (
    <svg className="w-5 h-5 flex-shrink-0 text-orange-500" viewBox="0 0 20 20" fill="currentColor">
        <path fillRule="evenodd" d="M5 5a3 3 0 015-2.236A3 3 0 0114.83 6H16a2 2 0 110 4h-5V9a1 1 0 10-2 0v1H4a2 2 0 110-4h1.17C5.06 5.687 5 5.35 5 5zm4 1V5a1 1 0 10-1 1h1zm2 0a1 1 0 10-1-1v1h1z" clipRule="evenodd" />
        <path d="M9 11H3v5a2 2 0 002 2h4v-7zM11 18h4a2 2 0 002-2v-5h-6v7z" />
    </svg>
);

// Green shield/check icon
const ShieldCheckIcon = () => (
    <svg className="w-5 h-5 flex-shrink-0 text-green-500" viewBox="0 0 20 20" fill="currentColor">
        <path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
    </svg>
);

export default function BuyPage() {
    const t = useTranslations('buyPage');
    const searchParams = useSearchParams();
    const [isLoading, setIsLoading] = useState(false);
    const [paymentSuccess, setPaymentSuccess] = useState(false);
    const [formData, setFormData] = useState({ name: '', email: '' });
    const [selectedPlan, setSelectedPlan] = useState<PaymentPlan>('onetime');

    useEffect(() => {
        const status = searchParams.get('status');
        if (status === 'success') {
            setPaymentSuccess(true);
        }
    }, [searchParams]);

    const getPaymentAmount = () => {
        return selectedPlan === 'weekly' ? 1.00 : 1134.00;
    };

    const getPaymentDescription = () => {
        return selectedPlan === 'weekly'
            ? 'Migraine Without Secrets - Founders Edition (Weekly Plan - First Payment)'
            : 'Migraine Without Secrets - Founders Edition (One-Time Payment)';
    };

    const handlePayment = async () => {
        if (!formData.name || !formData.email) {
            alert('Please fill in all fields');
            return;
        }

        setIsLoading(true);
        try {
            const response = await fetch('/api/tpay/create-transaction', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    amount: getPaymentAmount(),
                    description: getPaymentDescription(),
                    paymentType: selectedPlan,
                    payer: { email: formData.email, name: formData.name },
                }),
            });

            const data = await response.json();
            if (data.paymentUrl) {
                window.location.href = data.paymentUrl;
            } else {
                console.error('Payment error:', data.error);
                setIsLoading(false);
            }
        } catch (error) {
            console.error('Payment error:', error);
            setIsLoading(false);
        }
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    // Radio button component
    const RadioDot = ({ selected }: { selected: boolean }) => (
        <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${selected ? 'border-orange-500' : 'border-gray-300'
            }`}>
            {selected && <div className="w-3 h-3 rounded-full bg-orange-500" />}
        </div>
    );

    // ==================== SUCCESS VIEW ====================
    if (paymentSuccess) {
        return (
            <div className="min-h-screen bg-white">
                <Navbar />
                <main className="pt-24 pb-16">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        className="max-w-2xl mx-auto px-4"
                    >
                        <div className="text-center mb-8">
                            <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
                                <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                </svg>
                            </div>
                            <h1 className="text-3xl lg:text-5xl font-bold text-black mb-4">{t('successTitle')}</h1>
                            <p className="text-gray-600 text-lg">{t('successSubtitle')}</p>
                        </div>
                        <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100">
                            <div className="bg-linear-to-r from-[#2B183D] to-[#3d2456] px-5 py-4">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 bg-orange-500 rounded-full flex items-center justify-center">
                                        <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                        </svg>
                                    </div>
                                    <div>
                                        <h2 className="text-xl font-semibold text-white">{t('formTitle')}</h2>
                                        <p className="text-purple-200 text-sm">{t('formSubtitle')}</p>
                                    </div>
                                </div>
                            </div>
                            <div className="p-3 bg-[#fafafa]">
                                <div className="relative w-full" style={{ paddingBottom: '100%' }}>
                                    <iframe
                                        src="https://docs.google.com/forms/d/e/1FAIpQLSd4RYGqdSsp66nnlNaD_IZMfU7s6Mc_c7fx4YqAR-KS7xnU_w/viewform?embedded=true"
                                        className="absolute inset-0 w-full h-full border-0 rounded-lg"
                                        title="Registration Form"
                                    >Loading…</iframe>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </main>
                <Footer />
            </div>
        );
    }

    // ==================== PAYMENT VIEW ====================
    return (
        <div className="min-h-screen bg-[#F3F3EF]">
            <Navbar />

            <main className="pt-24 pb-16">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="max-w-5xl mx-auto px-4 lg:px-8"
                >
                    {/* ===== HEADER ===== */}
                    <div className="text-center mb-6 lg:mb-8">
                        <h1 className="text-2xl lg:text-5xl font-extrabold text-black mb-2 lg:mb-3 italic">
                            {t('title')}
                        </h1>
                        <p className="text-gray-600 text-sm lg:text-base">
                            {t('subtitle')}
                        </p>
                    </div>

                    {/* ===== LIMITED SPOTS ALERT ===== */}
                    <div className="flex justify-center mb-6 lg:mb-8">
                        <div className="border border-orange-300 bg-orange-50 rounded-full px-5 py-2 flex items-center gap-2">
                            <span className="text-orange-500 text-sm">⚠</span>
                            <p className="text-orange-600 text-sm font-medium">{t('limitedAlert')}</p>
                        </div>
                    </div>

                    {/* ===== CHOOSE OPTION HEADING ===== */}
                    <h2 className="text-lg lg:text-2xl font-bold text-black mb-5 lg:mb-6 text-center">
                        {t('chooseOption')}
                    </h2>

                    {/* ===== PRICING CARDS ===== */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-6 mb-8 lg:mb-10 max-w-4xl mx-auto">

                        {/* --- WEEKLY PLAN CARD --- */}
                        <div
                            onClick={() => setSelectedPlan('weekly')}
                            className={`relative bg-white rounded-2xl p-5 lg:p-6 cursor-pointer border-2 transition-all duration-200 ${selectedPlan === 'weekly'
                                ? 'border-orange-400 shadow-lg'
                                : 'border-gray-200 hover:border-orange-200'
                                }`}
                        >
                            {/* Title + Radio */}
                            <div className="flex justify-between items-start mb-3">
                                <h3 className="text-base lg:text-lg font-bold text-black">
                                    {t('weeklyTitle')}
                                </h3>
                                <RadioDot selected={selectedPlan === 'weekly'} />
                            </div>

                            {/* Price */}
                            <p className="text-2xl lg:text-3xl font-bold text-orange-500 mb-1">
                                239 zł <span className="text-sm lg:text-base font-normal text-gray-500">/ {t('weekUnit')}</span>
                            </p>

                            {/* Note badge */}
                            <div className="inline-block bg-orange-50 rounded-full px-3 py-1 mb-4">
                                <p className="text-orange-500 text-xs font-medium">{t('weeklyNote')}</p>
                            </div>

                            {/* Feature list */}
                            <ul className="space-y-3">
                                <li className="flex items-start gap-2.5">
                                    <CheckIcon />
                                    <span className="text-gray-700 text-sm">{t('feature1')}</span>
                                </li>
                                <li className="flex items-start gap-2.5">
                                    <CheckIcon />
                                    <span className="text-gray-700 text-sm">{t('feature2')}</span>
                                </li>
                                <li className="flex items-start gap-2.5">
                                    <CheckIcon />
                                    <span className="text-gray-700 text-sm">{t('feature3')}</span>
                                </li>
                                <li className="flex items-start gap-2.5">
                                    <GiftIcon />
                                    <span className="text-gray-700 text-sm">{t('weeklyGlasses')}</span>
                                </li>
                                <li className="flex items-start gap-2.5">
                                    <CheckIcon />
                                    <span className="text-gray-700 text-sm">{t('weeklyCancel')}</span>
                                </li>
                            </ul>
                        </div>

                        {/* --- ONE-TIME PLAN CARD --- */}
                        <div
                            onClick={() => setSelectedPlan('onetime')}
                            className={`relative bg-white rounded-2xl p-5 lg:p-6 cursor-pointer border-2 transition-all duration-200 ${selectedPlan === 'onetime'
                                ? 'border-orange-400 shadow-lg'
                                : 'border-gray-200 hover:border-orange-200'
                                }`}
                        >
                            {/* Save badge */}
                            <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 z-10">
                                <span className="bg-orange-500 text-white text-xs font-bold uppercase rounded-full px-4 py-1 whitespace-nowrap tracking-wide">
                                    {t('saveBadge')}
                                </span>
                            </div>

                            {/* Title + Radio */}
                            <div className="flex justify-between items-start mb-3 mt-1">
                                <h3 className="text-base lg:text-lg font-bold text-black">
                                    {t('onetimeTitle')}
                                </h3>
                                <RadioDot selected={selectedPlan === 'onetime'} />
                            </div>

                            {/* Price */}
                            <div className="flex items-baseline gap-2 mb-1">
                                <span className="text-gray-400 line-through text-base lg:text-lg">1 434 zł</span>
                                <span className="text-2xl lg:text-4xl font-bold text-orange-500">1 134 zł</span>
                            </div>

                            {/* Equiv badge */}
                            <div className="inline-block bg-orange-50 rounded-full px-3 py-1 mb-4">
                                <p className="text-orange-500 text-xs font-medium">{t('onetimeEquiv')}</p>
                            </div>

                            {/* Feature list */}
                            <ul className="space-y-3">
                                <li className="flex items-start gap-2.5">
                                    <CheckIcon />
                                    <span className="text-gray-700 text-sm">{t('feature1')}</span>
                                </li>
                                <li className="flex items-start gap-2.5">
                                    <CheckIcon />
                                    <span className="text-gray-700 text-sm">{t('feature2')}</span>
                                </li>
                                <li className="flex items-start gap-2.5">
                                    <CheckIcon />
                                    <span className="text-gray-700 text-sm">{t('feature3')}</span>
                                </li>
                                <li className="flex items-start gap-2.5">
                                    <GiftIcon />
                                    <span className="text-gray-700 text-sm font-bold">{t('onetimeGlasses')}</span>
                                </li>
                            </ul>

                            {/* Guarantee callout */}
                            <div className="mt-4 bg-green-50 border border-green-200 rounded-lg p-3 flex items-start gap-2.5">
                                <ShieldCheckIcon />
                                <span className="text-green-700 text-sm font-medium">{t('onetimeGuarantee')}</span>
                            </div>

                            {/* Most popular */}
                            <p className="text-orange-500 text-sm font-medium mt-3 italic">
                                ★ {t('mostPopular')}
                            </p>
                        </div>
                    </div>

                    {/* ===== ORDER FORM ===== */}
                    <div className="max-w-xl mx-auto mb-10 lg:mb-14">
                        <div className="bg-white rounded-2xl p-5 lg:p-8 border border-orange-300 border-dashed">
                            <h3 className="text-lg lg:text-xl font-bold text-black mb-6 text-center">
                                {t('paymentTitle')}
                            </h3>

                            {/* Name */}
                            <div className="mb-4">
                                <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5">
                                    {t('nameLabel')}
                                </label>
                                <input
                                    type="text"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleInputChange}
                                    placeholder={t('namePlaceholder')}
                                    className="w-full p-3.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 text-black bg-white text-base outline-none"
                                />
                            </div>

                            {/* Email */}
                            <div className="mb-6">
                                <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5">
                                    {t('emailLabel')}
                                </label>
                                <input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleInputChange}
                                    placeholder={t('emailPlaceholder')}
                                    className="w-full p-3.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 text-black bg-white text-base outline-none"
                                />
                            </div>

                            {/* Safe Checkout badges */}
                            <div className="mb-5">
                                <p className="text-gray-400 text-xs uppercase tracking-wider mb-3 text-center">
                                    {t('guaranteedCheckout')}
                                </p>
                                <div className="flex items-center justify-center gap-2 flex-wrap">
                                    {['visa', 'master', 'maestro', 'przelewy24', 'blik'].map((icon) => (
                                        <div key={icon} className="bg-white border border-gray-200 rounded px-2 py-1 flex items-center justify-center h-8 w-14">
                                            <img src={`/icons/payment/${icon}.svg`} alt={icon} className="h-4 w-auto" />
                                        </div>
                                    ))}
                                    {['google_pay', 'apple_pay'].map((icon) => (
                                        <div key={icon} className="bg-white border border-gray-200 rounded px-2 py-1 flex items-center justify-center h-8 w-14">
                                            <img src={`/icons/payment/${icon}.svg`} alt={icon} className="h-4 w-auto" />
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Pay Button */}
                            <button
                                onClick={handlePayment}
                                disabled={isLoading}
                                className="w-full bg-[#F79155] hover:bg-orange-500 disabled:bg-gray-400 text-white font-bold px-8 py-4 transition-all duration-300 inline-flex items-center justify-center gap-2 shadow-lg hover:shadow-xl cursor-pointer text-lg rounded-xl mb-4"
                            >
                                {isLoading ? t('processing') : <>{t('payButton')} →</>}
                            </button>

                            {/* Guarantee */}
                            <div className="border-2 border-orange-400 rounded-xl text-center py-3 px-4">
                                <p className="text-black font-semibold">{t('guarantee')}</p>
                            </div>
                        </div>
                    </div>

                    {/* ===== PARTICIPANTS REPORT SECTION ===== */}
                    <div className="max-w-3xl mx-auto mb-10 lg:mb-14">
                        <div className="bg-white rounded-2xl p-5 lg:p-8">
                            <p className="text-center font-bold text-base lg:text-lg text-black mb-5">
                                ★ {t('participantsTitle')}
                            </p>
                            <div className="grid grid-cols-2 gap-3 lg:gap-4">
                                <div className="bg-[#F3F3EF] rounded-xl p-3 lg:p-4 flex items-center gap-2">
                                    <CheckIcon />
                                    <span className="text-gray-800 text-xs lg:text-sm">{t('report1')}</span>
                                </div>
                                <div className="bg-[#F3F3EF] rounded-xl p-3 lg:p-4 flex items-center gap-2">
                                    <CheckIcon />
                                    <span className="text-gray-800 text-xs lg:text-sm">{t('report2')}</span>
                                </div>
                                <div className="bg-[#F3F3EF] rounded-xl p-3 lg:p-4 flex items-center gap-2">
                                    <CheckIcon />
                                    <span className="text-gray-800 text-xs lg:text-sm">{t('report3')}</span>
                                </div>
                                <div className="bg-[#F3F3EF] rounded-xl p-3 lg:p-4 flex items-center gap-2">
                                    <CheckIcon />
                                    <span className="text-gray-800 text-xs lg:text-sm">{t('report4')}</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* ===== BEFORE / AFTER SECTION ===== */}
                    <div className="max-w-2xl mx-auto mb-10 lg:mb-14">
                        <div className="rounded-2xl overflow-hidden">
                            <img src="/before-after.jpg" alt="Before and After - 2021 vs 2022" className="w-full h-auto" />
                        </div>

                        <p className="text-center text-gray-600 italic text-sm lg:text-base mt-5 px-4">
                            {t('creatorQuote')}
                        </p>
                    </div>

                </motion.div>
            </main>

            <Footer />
        </div>
    );
}
