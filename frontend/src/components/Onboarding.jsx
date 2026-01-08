import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from './ui/button';
import { Card, CardContent } from './ui/card';
import { Shield, Link2, Zap, Share2, ChevronRight, X } from 'lucide-react';

/**
 * Onboarding - Multi-step welcome modal for first-time users
 * Stores completion in localStorage to only show once
 */
const Onboarding = ({ onComplete }) => {
    const [currentStep, setCurrentStep] = useState(0);
    const [isVisible, setIsVisible] = useState(false);

    const steps = [
        {
            icon: Shield,
            title: 'Welcome to CreditBridge',
            description: 'The alternative credit scoring system designed for gig workers. Get fair credit access based on your real work patterns, not traditional credit history.',
            color: 'bg-blue-500'
        },
        {
            icon: Link2,
            title: 'Connect Your Gig Accounts',
            description: 'Link your Uber, Upwork, DoorDash, or other gig platform accounts. We securely analyze your earnings to calculate your credit reliability.',
            color: 'bg-purple-500'
        },
        {
            icon: Zap,
            title: 'Get Your Score Instantly',
            description: 'Our ML-powered engine calculates your creditworthiness in seconds. See detailed factors that contribute to your score.',
            color: 'bg-green-500'
        },
        {
            icon: Share2,
            title: 'Share with Lenders',
            description: 'Control what data you share. Connect with partner lenders who accept CreditBridge scores for loans, credit cards, and more.',
            color: 'bg-amber-500'
        }
    ];

    useEffect(() => {
        // Check if onboarding has been completed
        const hasCompleted = localStorage.getItem('creditbridge-onboarding-complete');
        if (!hasCompleted) {
            setIsVisible(true);
        }
    }, []);

    const handleNext = () => {
        if (currentStep < steps.length - 1) {
            setCurrentStep(prev => prev + 1);
        } else {
            handleComplete();
        }
    };

    const handlePrev = () => {
        if (currentStep > 0) {
            setCurrentStep(prev => prev - 1);
        }
    };

    const handleComplete = () => {
        localStorage.setItem('creditbridge-onboarding-complete', 'true');
        setIsVisible(false);
        onComplete?.();
    };

    const handleSkip = () => {
        localStorage.setItem('creditbridge-onboarding-complete', 'true');
        setIsVisible(false);
        onComplete?.();
    };

    if (!isVisible) return null;

    const CurrentIcon = steps[currentStep].icon;

    return (
        <AnimatePresence>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            >
                <motion.div
                    initial={{ scale: 0.95, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.95, opacity: 0 }}
                    className="w-full max-w-lg"
                >
                    <Card className="relative overflow-hidden">
                        {/* Skip button */}
                        <button
                            onClick={handleSkip}
                            className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 z-10"
                        >
                            <X className="w-5 h-5" />
                        </button>

                        {/* Progress bar */}
                        <div className="h-1 bg-slate-100">
                            <motion.div
                                className="h-full bg-blue-500"
                                initial={{ width: 0 }}
                                animate={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
                                transition={{ duration: 0.3 }}
                            />
                        </div>

                        <CardContent className="p-8">
                            <motion.div
                                key={currentStep}
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -20 }}
                                className="text-center"
                            >
                                {/* Icon */}
                                <motion.div
                                    initial={{ scale: 0 }}
                                    animate={{ scale: 1 }}
                                    transition={{ type: 'spring', delay: 0.1 }}
                                    className={`w-20 h-20 ${steps[currentStep].color} rounded-2xl flex items-center justify-center mx-auto mb-6`}
                                >
                                    <CurrentIcon className="w-10 h-10 text-white" />
                                </motion.div>

                                {/* Content */}
                                <h2 className="text-2xl font-bold text-slate-900 mb-4">
                                    {steps[currentStep].title}
                                </h2>
                                <p className="text-slate-600 leading-relaxed mb-8">
                                    {steps[currentStep].description}
                                </p>

                                {/* Navigation */}
                                <div className="flex items-center justify-between">
                                    <Button
                                        variant="ghost"
                                        onClick={handlePrev}
                                        disabled={currentStep === 0}
                                        className={currentStep === 0 ? 'invisible' : ''}
                                    >
                                        Back
                                    </Button>

                                    {/* Step indicators */}
                                    <div className="flex gap-2">
                                        {steps.map((_, index) => (
                                            <button
                                                key={index}
                                                onClick={() => setCurrentStep(index)}
                                                className={`w-2 h-2 rounded-full transition-colors ${index === currentStep ? 'bg-blue-500' : 'bg-slate-200'
                                                    }`}
                                            />
                                        ))}
                                    </div>

                                    <Button onClick={handleNext}>
                                        {currentStep === steps.length - 1 ? (
                                            'Get Started'
                                        ) : (
                                            <>
                                                Next
                                                <ChevronRight className="w-4 h-4 ml-1" />
                                            </>
                                        )}
                                    </Button>
                                </div>

                                {/* Skip link */}
                                <button
                                    onClick={handleSkip}
                                    className="mt-6 text-sm text-slate-400 hover:text-slate-600"
                                >
                                    Skip Tutorial
                                </button>
                            </motion.div>
                        </CardContent>
                    </Card>
                </motion.div>
            </motion.div>
        </AnimatePresence>
    );
};

export default Onboarding;
