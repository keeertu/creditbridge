import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent } from './ui/card';
import { X, Check, AlertTriangle, TrendingUp, Shield, Sparkles, Ban, ThumbsUp } from 'lucide-react';
import ScoreGauge from './ScoreGauge';
import RiskBadge from './RiskBadge';

/**
 * ScoreComparison - Dramatic Split-Screen Comparison
 * Visually demonstrates the stark difference between traditional and CreditBridge scoring
 */

const ScoreComparison = ({
    creditBridgeScore,
    riskBand,
    traditionalStatus = 'No Credit History',
    showExplanation = true
}) => {
    const isApproved = creditBridgeScore >= 50;
    const isExcellent = creditBridgeScore >= 70;

    // Animation variants
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.2, delayChildren: 0.1 }
        }
    };

    const cardVariants = {
        hidden: { opacity: 0, scale: 0.9 },
        visible: { opacity: 1, scale: 1, transition: { duration: 0.5 } }
    };

    return (
        <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="space-y-6"
        >
            {/* Main Comparison Grid */}
            <div className="grid md:grid-cols-2 gap-0 md:gap-1 relative">

                {/* VS Divider - Center */}
                <div className="hidden md:flex absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10">
                    <motion.div
                        initial={{ scale: 0, rotate: -180 }}
                        animate={{ scale: 1, rotate: 0 }}
                        transition={{ type: "spring", delay: 0.5 }}
                        className="w-16 h-16 bg-surface-900 rounded-2xl flex items-center justify-center shadow-xl"
                    >
                        <span className="text-white font-bold text-xl">VS</span>
                    </motion.div>
                </div>

                {/* ════════════════════════════════════════════════════════════
            LEFT SIDE - Traditional Credit (DECLINED)
            ════════════════════════════════════════════════════════════ */}
                <motion.div variants={cardVariants} className="relative">
                    <Card className="h-full border-0 rounded-2xl md:rounded-r-none overflow-hidden">
                        {/* Red gradient background */}
                        <div className="absolute inset-0 bg-gradient-to-br from-danger-50 via-surface-50 to-surface-100" />
                        <div className="absolute top-0 left-0 w-full h-1 bg-danger-500" />

                        {/* Diagonal stripes pattern (visual noise for "bad" side) */}
                        <div
                            className="absolute inset-0 opacity-5"
                            style={{
                                backgroundImage: 'repeating-linear-gradient(45deg, transparent, transparent 10px, #ef4444 10px, #ef4444 20px)'
                            }}
                        />

                        <CardContent className="relative p-6 md:p-8 lg:p-10">
                            <div className="text-center space-y-6">
                                {/* Header */}
                                <div>
                                    <motion.p
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        transition={{ delay: 0.3 }}
                                        className="text-sm font-semibold text-danger-600 uppercase tracking-wider flex items-center justify-center gap-2"
                                    >
                                        <Ban className="w-4 h-4" />
                                        Traditional Credit Score
                                    </motion.p>
                                </div>

                                {/* Big X icon */}
                                <motion.div
                                    initial={{ scale: 0, rotate: -180 }}
                                    animate={{ scale: 1, rotate: 0 }}
                                    transition={{ type: "spring", delay: 0.4 }}
                                    className="relative"
                                >
                                    <div className="w-32 h-32 mx-auto rounded-full bg-danger-100 border-4 border-danger-200 flex items-center justify-center">
                                        <motion.div
                                            animate={{
                                                scale: [1, 1.1, 1],
                                            }}
                                            transition={{ duration: 2, repeat: Infinity }}
                                        >
                                            <X className="w-16 h-16 text-danger-500" strokeWidth={3} />
                                        </motion.div>
                                    </div>

                                    {/* Floating "NO" badges */}
                                    <motion.div
                                        className="absolute -top-2 -right-2 bg-danger-500 text-white text-xs font-bold px-2 py-1 rounded-full"
                                        animate={{ rotate: [0, 5, 0, -5, 0] }}
                                        transition={{ duration: 2, repeat: Infinity }}
                                    >
                                        NO DATA
                                    </motion.div>
                                </motion.div>

                                {/* Status */}
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.6 }}
                                    className="space-y-3"
                                >
                                    <div className="inline-flex items-center gap-2 bg-danger-500 text-white px-6 py-3 rounded-full font-bold text-lg shadow-lg">
                                        <X className="w-5 h-5" />
                                        DECLINED
                                    </div>

                                    <p className="text-surface-700 font-medium text-lg">
                                        {traditionalStatus}
                                    </p>

                                    <p className="text-surface-500 text-sm max-w-xs mx-auto">
                                        Traditional systems can't assess gig worker creditworthiness
                                    </p>
                                </motion.div>

                                {/* Separator */}
                                <motion.div
                                    initial={{ scaleX: 0 }}
                                    animate={{ scaleX: 1 }}
                                    transition={{ delay: 0.7 }}
                                    className="h-px bg-danger-200 w-full"
                                />

                                {/* Bottom message */}
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ delay: 0.8 }}
                                    className="flex items-center justify-center gap-2 text-surface-500"
                                >
                                    <AlertTriangle className="w-4 h-4 text-danger-400" />
                                    <span className="text-sm">No credit history = No chance</span>
                                </motion.div>
                            </div>
                        </CardContent>
                    </Card>
                </motion.div>

                {/* ════════════════════════════════════════════════════════════
            RIGHT SIDE - CreditBridge (APPROVED)
            ════════════════════════════════════════════════════════════ */}
                <motion.div variants={cardVariants} className="relative">
                    <Card className="h-full border-0 rounded-2xl md:rounded-l-none overflow-hidden">
                        {/* Green/brand gradient background */}
                        <div className={`absolute inset-0 ${isExcellent
                                ? 'bg-gradient-to-br from-success-50 via-brand-50 to-accent-pink/10'
                                : 'bg-gradient-to-br from-brand-50 via-surface-50 to-warning-50/30'
                            }`} />
                        <div className={`absolute top-0 left-0 w-full h-1 bg-gradient-to-r ${isExcellent
                                ? 'from-success-500 via-brand-500 to-accent-pink'
                                : 'from-brand-500 to-warning-500'
                            }`} />

                        {/* Sparkle decoration */}
                        <motion.div
                            className="absolute top-4 right-4 text-brand-400"
                            animate={{ rotate: 360 }}
                            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                        >
                            <Sparkles className="w-6 h-6" />
                        </motion.div>

                        <CardContent className="relative p-6 md:p-8 lg:p-10">
                            <div className="text-center space-y-6">
                                {/* Header */}
                                <div>
                                    <motion.p
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        transition={{ delay: 0.3 }}
                                        className={`text-sm font-semibold uppercase tracking-wider flex items-center justify-center gap-2 ${isExcellent ? 'text-success-600' : 'text-brand-600'
                                            }`}
                                    >
                                        <Shield className="w-4 h-4" />
                                        CreditBridge Score
                                    </motion.p>
                                </div>

                                {/* Score Gauge */}
                                <motion.div
                                    initial={{ scale: 0, opacity: 0 }}
                                    animate={{ scale: 1, opacity: 1 }}
                                    transition={{ type: "spring", delay: 0.5 }}
                                >
                                    <ScoreGauge score={creditBridgeScore} riskBand={riskBand} size="medium" />
                                </motion.div>

                                {/* Status */}
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.7 }}
                                    className="space-y-3"
                                >
                                    <motion.div
                                        className={`inline-flex items-center gap-2 px-6 py-3 rounded-full font-bold text-lg shadow-lg ${isApproved
                                                ? 'bg-success-500 text-white'
                                                : 'bg-warning-500 text-white'
                                            }`}
                                        animate={isExcellent ? { scale: [1, 1.05, 1] } : {}}
                                        transition={{ duration: 1, repeat: isExcellent ? Infinity : 0, repeatDelay: 2 }}
                                    >
                                        {isApproved ? (
                                            <>
                                                <Check className="w-5 h-5" />
                                                APPROVED
                                            </>
                                        ) : (
                                            <>
                                                <TrendingUp className="w-5 h-5" />
                                                BUILDING
                                            </>
                                        )}
                                    </motion.div>

                                    <div className="flex justify-center">
                                        <RiskBadge riskBand={riskBand} />
                                    </div>

                                    <p className="text-surface-500 text-sm max-w-xs mx-auto">
                                        Assessed using real gig economy work patterns
                                    </p>
                                </motion.div>

                                {/* Separator */}
                                <motion.div
                                    initial={{ scaleX: 0 }}
                                    animate={{ scaleX: 1 }}
                                    transition={{ delay: 0.8 }}
                                    className={`h-px w-full ${isExcellent ? 'bg-success-200' : 'bg-brand-200'}`}
                                />

                                {/* Bottom message */}
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ delay: 0.9 }}
                                    className={`flex items-center justify-center gap-2 ${isExcellent ? 'text-success-600' : 'text-brand-600'
                                        }`}
                                >
                                    <ThumbsUp className="w-4 h-4" />
                                    <span className="text-sm font-medium">Fair assessment for gig workers</span>
                                </motion.div>
                            </div>
                        </CardContent>
                    </Card>
                </motion.div>
            </div>

            {/* Explanation Section */}
            {showExplanation && (
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1 }}
                >
                    <Card className="bg-surface-900 text-white border-0 overflow-hidden">
                        <div className="absolute inset-0 mesh-bg-dark opacity-50" />
                        <CardContent className="relative p-6 md:p-8">
                            <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
                                <motion.div
                                    className="w-14 h-14 bg-gradient-to-br from-brand-500 to-accent-pink rounded-2xl flex items-center justify-center flex-shrink-0 shadow-lg"
                                    whileHover={{ scale: 1.1, rotate: 5 }}
                                >
                                    <TrendingUp className="w-7 h-7" />
                                </motion.div>
                                <div className="flex-1">
                                    <h3 className="font-bold text-xl mb-2">
                                        Why Traditional Scoring Fails Gig Workers
                                    </h3>
                                    <p className="text-surface-300 leading-relaxed">
                                        Traditional credit scores rely on loan history and employment records.
                                        Gig workers often have none of these, despite consistent earnings.
                                        CreditBridge analyzes <span className="text-brand-400 font-medium">actual work patterns</span>,
                                        <span className="text-brand-400 font-medium"> income consistency</span>, and
                                        <span className="text-brand-400 font-medium"> tenure</span> to create a fair assessment.
                                    </p>
                                </div>
                            </div>

                            {/* Factor icons */}
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8 pt-6 border-t border-surface-700">
                                {[
                                    { label: 'Income Patterns', icon: '📊' },
                                    { label: 'Work Consistency', icon: '📅' },
                                    { label: 'Platform Ratings', icon: '⭐' },
                                    { label: 'Tenure History', icon: '📈' }
                                ].map((item, index) => (
                                    <motion.div
                                        key={item.label}
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 1.2 + index * 0.1 }}
                                        className="text-center"
                                    >
                                        <span className="text-3xl">{item.icon}</span>
                                        <p className="text-xs text-surface-400 mt-2">{item.label}</p>
                                    </motion.div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>
                </motion.div>
            )}
        </motion.div>
    );
};

export default ScoreComparison;
