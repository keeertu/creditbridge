import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Shield, ArrowLeft, Users, TrendingUp, Globe, Award, ChevronLeft, ChevronRight } from 'lucide-react';
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { demoPersonas } from '../data/demoPersonas';

/**
 * ImpactMetrics - Showcases the social impact and reach of CreditBridge
 * Features animated stats, charts, and success stories
 */
const ImpactMetrics = () => {
    const navigate = useNavigate();
    const [currentStory, setCurrentStory] = useState(0);
    const [animatedStats, setAnimatedStats] = useState({
        workers: 0,
        approvalRate: 0,
        avgScore: 0,
        countries: 0
    });

    // Animate stats on mount
    useEffect(() => {
        const duration = 2000;
        const steps = 60;
        const interval = duration / steps;

        const targets = {
            workers: 2500000,
            approvalRate: 65,
            avgScore: 72,
            countries: 45
        };

        let step = 0;
        const timer = setInterval(() => {
            step++;
            const progress = step / steps;
            const easeOut = 1 - Math.pow(1 - progress, 3);

            setAnimatedStats({
                workers: Math.round(targets.workers * easeOut),
                approvalRate: Math.round(targets.approvalRate * easeOut),
                avgScore: Math.round(targets.avgScore * easeOut),
                countries: Math.round(targets.countries * easeOut)
            });

            if (step >= steps) clearInterval(timer);
        }, interval);

        return () => clearInterval(timer);
    }, []);

    // Data for charts
    const approvalData = [
        { name: 'Traditional', value: 30, fill: '#ef4444' },
        { name: 'CreditBridge', value: 65, fill: '#22c55e' }
    ];

    const underbankedData = [
        { region: 'Asia Pacific', population: 1200 },
        { region: 'Latin America', population: 400 },
        { region: 'Sub-Saharan Africa', population: 350 },
        { region: 'Middle East', population: 150 },
        { region: 'North America', population: 80 },
        { region: 'Europe', population: 50 }
    ];

    const formatNumber = (num) => {
        if (num >= 1000000) {
            return (num / 1000000).toFixed(1) + 'M';
        }
        if (num >= 1000) {
            return (num / 1000).toFixed(0) + 'K';
        }
        return num.toString();
    };

    const nextStory = () => {
        setCurrentStory((prev) => (prev + 1) % demoPersonas.length);
    };

    const prevStory = () => {
        setCurrentStory((prev) => (prev - 1 + demoPersonas.length) % demoPersonas.length);
    };

    const currentPersona = demoPersonas[currentStory];

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 to-blue-900 flex flex-col">
            {/* Header */}
            <header className="bg-slate-900/50 backdrop-blur-sm border-b border-slate-700 sticky top-0 z-10">
                <div className="max-w-7xl mx-auto px-6 py-4">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center cursor-pointer" onClick={() => navigate('/')}>
                                <Shield className="w-6 h-6 text-slate-900" />
                            </div>
                            <div>
                                <h1 className="text-xl font-bold text-white">CreditBridge</h1>
                                <p className="text-xs text-slate-400">Impact & Reach</p>
                            </div>
                        </div>
                        <Button variant="ghost" onClick={() => navigate(-1)} className="text-slate-300 hover:text-white">
                            <ArrowLeft className="w-4 h-4 mr-2" />
                            Back
                        </Button>
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <main className="flex-1 max-w-7xl mx-auto px-6 py-12 w-full">
                {/* Hero Stats */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center mb-16"
                >
                    <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
                        Financial Inclusion by the Numbers
                    </h1>
                    <p className="text-xl text-slate-300 max-w-2xl mx-auto">
                        Empowering gig workers worldwide with fair credit access
                    </p>
                </motion.div>

                {/* Animated Stats Grid */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
                    {[
                        { value: formatNumber(animatedStats.workers), label: 'Gig Workers Could Benefit', icon: Users, color: 'from-blue-500 to-cyan-500' },
                        { value: `${animatedStats.approvalRate}%`, label: 'Approval Rate', icon: TrendingUp, color: 'from-green-500 to-emerald-500' },
                        { value: animatedStats.avgScore.toString(), label: 'Average Score', icon: Award, color: 'from-purple-500 to-pink-500' },
                        { value: animatedStats.countries.toString(), label: 'Countries Reached', icon: Globe, color: 'from-orange-500 to-amber-500' }
                    ].map((stat, index) => (
                        <motion.div
                            key={stat.label}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 * index }}
                        >
                            <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm overflow-hidden">
                                <div className={`h-1 bg-gradient-to-r ${stat.color}`} />
                                <CardContent className="p-6 text-center">
                                    <div className={`w-12 h-12 bg-gradient-to-br ${stat.color} rounded-xl flex items-center justify-center mx-auto mb-4`}>
                                        <stat.icon className="w-6 h-6 text-white" />
                                    </div>
                                    <p className="text-3xl md:text-4xl font-bold text-white mb-2">{stat.value}</p>
                                    <p className="text-sm text-slate-400">{stat.label}</p>
                                </CardContent>
                            </Card>
                        </motion.div>
                    ))}
                </div>

                {/* Comparison Chart */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="grid md:grid-cols-2 gap-8 mb-16"
                >
                    <Card className="bg-slate-800/50 border-slate-700">
                        <CardHeader>
                            <CardTitle className="text-white">Approval Rate Comparison</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="h-64">
                                <ResponsiveContainer width="100%" height="100%">
                                    <BarChart data={approvalData} layout="vertical">
                                        <XAxis type="number" domain={[0, 100]} tick={{ fill: '#94a3b8' }} />
                                        <YAxis type="category" dataKey="name" tick={{ fill: '#94a3b8' }} width={100} />
                                        <Tooltip
                                            contentStyle={{ backgroundColor: '#1e293b', border: '1px solid #475569' }}
                                            labelStyle={{ color: '#fff' }}
                                        />
                                        <Bar dataKey="value" radius={[0, 8, 8, 0]}>
                                            {approvalData.map((entry, index) => (
                                                <Cell key={`cell-${index}`} fill={entry.fill} />
                                            ))}
                                        </Bar>
                                    </BarChart>
                                </ResponsiveContainer>
                            </div>
                            <p className="text-center text-slate-400 text-sm mt-4">
                                CreditBridge approves <span className="text-green-400 font-semibold">2x more</span> gig workers than traditional credit
                            </p>
                        </CardContent>
                    </Card>

                    <Card className="bg-slate-800/50 border-slate-700">
                        <CardHeader>
                            <CardTitle className="text-white">Underbanked Population by Region (Millions)</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="h-64">
                                <ResponsiveContainer width="100%" height="100%">
                                    <BarChart data={underbankedData}>
                                        <XAxis dataKey="region" tick={{ fill: '#94a3b8', fontSize: 10 }} angle={-45} textAnchor="end" height={80} />
                                        <YAxis tick={{ fill: '#94a3b8' }} />
                                        <Tooltip
                                            contentStyle={{ backgroundColor: '#1e293b', border: '1px solid #475569' }}
                                            labelStyle={{ color: '#fff' }}
                                        />
                                        <Bar dataKey="population" fill="#3b82f6" radius={[4, 4, 0, 0]} />
                                    </BarChart>
                                </ResponsiveContainer>
                            </div>
                        </CardContent>
                    </Card>
                </motion.div>

                {/* Success Stories Carousel */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    className="mb-16"
                >
                    <h2 className="text-2xl font-bold text-white text-center mb-8">Success Stories</h2>

                    <Card className="bg-slate-800/50 border-slate-700 max-w-3xl mx-auto">
                        <CardContent className="p-8">
                            <div className="flex items-center gap-6">
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    onClick={prevStory}
                                    className="text-slate-400 hover:text-white"
                                >
                                    <ChevronLeft className="w-6 h-6" />
                                </Button>

                                <div className="flex-1 text-center">
                                    <img
                                        src={currentPersona.photo}
                                        alt={currentPersona.name}
                                        className="w-24 h-24 rounded-full mx-auto mb-4 border-4 border-blue-500"
                                    />
                                    <h3 className="text-xl font-bold text-white">{currentPersona.name}</h3>
                                    <p className="text-blue-400 mb-4">{currentPersona.role} • {currentPersona.location}</p>

                                    <blockquote className="text-slate-300 italic mb-6">
                                        "{currentPersona.backstory}"
                                    </blockquote>

                                    <div className="grid grid-cols-3 gap-4 max-w-sm mx-auto">
                                        <div className="text-center">
                                            <p className="text-red-400 text-sm font-medium">Before</p>
                                            <p className="text-slate-500 text-xs">{currentPersona.traditionalStatus}</p>
                                        </div>
                                        <div className="text-center">
                                            <p className="text-2xl font-bold text-green-400">{currentPersona.expectedScore}</p>
                                            <p className="text-slate-500 text-xs">CreditBridge Score</p>
                                        </div>
                                        <div className="text-center">
                                            <p className="text-green-400 text-sm font-medium">Approved</p>
                                            <p className="text-slate-500 text-xs">For credit access</p>
                                        </div>
                                    </div>
                                </div>

                                <Button
                                    variant="ghost"
                                    size="icon"
                                    onClick={nextStory}
                                    className="text-slate-400 hover:text-white"
                                >
                                    <ChevronRight className="w-6 h-6" />
                                </Button>
                            </div>

                            {/* Dots indicator */}
                            <div className="flex justify-center gap-2 mt-6">
                                {demoPersonas.map((_, index) => (
                                    <button
                                        key={index}
                                        onClick={() => setCurrentStory(index)}
                                        className={`w-2 h-2 rounded-full transition-colors ${index === currentStory ? 'bg-blue-500' : 'bg-slate-600'
                                            }`}
                                    />
                                ))}
                            </div>
                        </CardContent>
                    </Card>
                </motion.div>

                {/* CTA */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                    className="text-center"
                >
                    <Card className="bg-gradient-to-r from-blue-600 to-indigo-600 border-0 max-w-2xl mx-auto">
                        <CardContent className="p-8">
                            <h2 className="text-2xl font-bold text-white mb-4">
                                Join the Financial Inclusion Movement
                            </h2>
                            <p className="text-blue-100 mb-6">
                                Whether you're a gig worker seeking fair credit or a lender looking to expand your market,
                                CreditBridge opens doors for everyone.
                            </p>
                            <div className="flex flex-col sm:flex-row gap-4 justify-center">
                                <Button
                                    className="bg-white text-blue-600 hover:bg-blue-50"
                                    onClick={() => navigate('/single-input')}
                                >
                                    Get Your Score
                                </Button>
                                <Button
                                    variant="outline"
                                    className="text-white border-white hover:bg-white/10"
                                    onClick={() => navigate('/lender-portfolio')}
                                >
                                    For Lenders
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                </motion.div>
            </main>
        </div>
    );
};

export default ImpactMetrics;
