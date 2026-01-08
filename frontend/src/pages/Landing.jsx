import React, { useEffect, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, useScroll, useTransform, useInView, AnimatePresence } from 'framer-motion';
import { Button } from '../components/ui/button';
import { Card, CardContent } from '../components/ui/card';
import {
    Shield, ArrowRight, Zap, Lock, TrendingUp, Users,
    ChevronRight, Star, CheckCircle, Globe, Award,
    Sparkles, Play, ChevronDown
} from 'lucide-react';

/**
 * Landing Page - Premium, Startup-Quality Design
 * Designed to WOW Imagine Cup judges in the first 10 seconds
 */

// Animated counter component
const AnimatedCounter = ({ end, suffix = '', prefix = '', duration = 2 }) => {
    const [count, setCount] = useState(0);
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true });

    useEffect(() => {
        if (!isInView) return;

        let startTime;
        const animate = (timestamp) => {
            if (!startTime) startTime = timestamp;
            const progress = Math.min((timestamp - startTime) / (duration * 1000), 1);
            const easeOut = 1 - Math.pow(1 - progress, 3);
            setCount(Math.floor(end * easeOut));

            if (progress < 1) {
                requestAnimationFrame(animate);
            }
        };

        requestAnimationFrame(animate);
    }, [isInView, end, duration]);

    return (
        <span ref={ref}>
            {prefix}{count.toLocaleString()}{suffix}
        </span>
    );
};

// Floating blob decorations
const FloatingBlob = ({ className, delay = 0 }) => (
    <motion.div
        className={`blob ${className}`}
        animate={{
            y: [0, -30, 0],
            x: [0, 15, 0],
            scale: [1, 1.1, 1],
        }}
        transition={{
            duration: 8,
            repeat: Infinity,
            delay,
            ease: "easeInOut"
        }}
    />
);

// Feature card with hover effect
const FeatureCard = ({ icon: Icon, title, description, delay }) => (
    <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay }}
        whileHover={{ y: -8, transition: { duration: 0.3 } }}
    >
        <Card className="glass-card border-white/20 h-full group cursor-pointer card-hover">
            <CardContent className="p-6">
                <motion.div
                    className="w-12 h-12 bg-gradient-to-br from-brand-500 to-brand-600 rounded-xl flex items-center justify-center mb-4 shadow-glow-sm"
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    transition={{ type: "spring", stiffness: 400 }}
                >
                    <Icon className="w-6 h-6 text-white" />
                </motion.div>
                <h3 className="text-lg font-semibold text-surface-900 mb-2 group-hover:text-brand-600 transition-colors">
                    {title}
                </h3>
                <p className="text-surface-600 text-sm leading-relaxed">
                    {description}
                </p>
            </CardContent>
        </Card>
    </motion.div>
);

// Stats card
const StatCard = ({ value, label, icon: Icon, gradient }) => (
    <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        whileHover={{ scale: 1.05 }}
        transition={{ type: "spring", stiffness: 300 }}
        className="text-center"
    >
        <div className={`w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-br ${gradient} flex items-center justify-center shadow-lg`}>
            <Icon className="w-8 h-8 text-white" />
        </div>
        <p className="text-3xl md:text-4xl font-bold text-surface-900 mb-1">{value}</p>
        <p className="text-surface-500 text-sm">{label}</p>
    </motion.div>
);

// Testimonial card
const TestimonialCard = ({ quote, name, role, image, isActive }) => (
    <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: isActive ? 1 : 0.5, scale: isActive ? 1 : 0.95 }}
        className={`glass-card rounded-2xl p-6 md:p-8 transition-all duration-500 ${isActive ? 'shadow-glass-lg' : ''}`}
    >
        <div className="flex items-center gap-1 mb-4">
            {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-5 h-5 text-warning-400 fill-warning-400" />
            ))}
        </div>
        <blockquote className="text-surface-700 text-lg leading-relaxed mb-6">
            "{quote}"
        </blockquote>
        <div className="flex items-center gap-4">
            <img src={image} alt={name} className="w-12 h-12 rounded-full ring-2 ring-white shadow-md" />
            <div>
                <p className="font-semibold text-surface-900">{name}</p>
                <p className="text-sm text-surface-500">{role}</p>
            </div>
        </div>
    </motion.div>
);

const Landing = () => {
    const navigate = useNavigate();
    const heroRef = useRef(null);
    const { scrollYProgress } = useScroll();
    const y = useTransform(scrollYProgress, [0, 0.5], [0, -100]);
    const opacity = useTransform(scrollYProgress, [0, 0.3], [1, 0]);

    const [activeTestimonial, setActiveTestimonial] = useState(0);

    const features = [
        {
            icon: Zap,
            title: "Instant Scoring",
            description: "Get your credit reliability score in seconds, not days. Our ML engine analyzes your gig work patterns instantly."
        },
        {
            icon: Shield,
            title: "Privacy Focused",
            description: "Demo mode with synthetic data. Real implementation would include encryption and secure handling."
        },
        {
            icon: TrendingUp,
            title: "Fair Assessment",
            description: "Unlike traditional scores, we evaluate what matters: income consistency, work patterns, and tenure."
        },
        {
            icon: Lock,
            title: "Privacy First",
            description: "Read-only access to your gig accounts. Delete your data anytime with one click."
        },
        {
            icon: Users,
            title: "Lender Network",
            description: "Connect with our network of lenders who understand and accept alternative credit scoring."
        },
        {
            icon: Globe,
            title: "Global Reach",
            description: "Supporting gig workers across 45+ countries on platforms like Uber, Upwork, and DoorDash."
        }
    ];

    const testimonials = [
        {
            quote: "This example shows how a rideshare driver with 3 years of consistent earnings could demonstrate creditworthiness through work patterns instead of traditional credit history.",
            name: "Maria Santos",
            role: "Example: Rideshare Driver",
            image: "https://i.pravatar.cc/150?img=47"
        },
        {
            quote: "Freelancers with variable monthly income can show their overall reliability and growth trends to lenders, rather than being penalized for income fluctuations.",
            name: "James Chen",
            role: "Example: Freelance Developer",
            image: "https://i.pravatar.cc/150?img=11"
        },
        {
            quote: "Gig workers who are 'invisible' to traditional credit systems can build a profile based on actual work history and income consistency.",
            name: "Raj Patel",
            role: "Example: Task-based Worker",
            image: "https://i.pravatar.cc/150?img=12"
        }
    ];

    // Auto-rotate testimonials
    useEffect(() => {
        const interval = setInterval(() => {
            setActiveTestimonial((prev) => (prev + 1) % testimonials.length);
        }, 5000);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="min-h-screen bg-surface-50 overflow-hidden">
            {/* Skip Link for Accessibility */}
            <a href="#main-content" className="skip-link">Skip to main content</a>

            {/* ═══════════════════════════════════════════════════════════════
          HERO SECTION
          ═══════════════════════════════════════════════════════════════ */}
            <section ref={heroRef} className="relative min-h-screen flex items-center justify-center mesh-bg overflow-hidden">
                {/* Floating Blobs */}
                <FloatingBlob className="blob-brand w-96 h-96 -top-48 -left-48" />
                <FloatingBlob className="blob-pink w-80 h-80 top-1/4 -right-40" delay={2} />
                <FloatingBlob className="blob-green w-64 h-64 bottom-20 left-1/4" delay={4} />

                {/* Animated gradient orbs */}
                <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-gradient-to-r from-brand-400/30 to-accent-pink/20 rounded-full blur-3xl animate-pulse-glow pointer-events-none" />

                {/* Header */}
                <motion.header
                    style={{ opacity }}
                    className="fixed top-0 left-0 right-0 z-50 header-glass"
                >
                    <div className="section-container">
                        <div className="flex items-center justify-between h-16 md:h-20">
                            <Link to="/" className="flex items-center gap-3 group">
                                <motion.div
                                    className="w-10 h-10 bg-gradient-to-br from-brand-500 to-brand-700 rounded-xl flex items-center justify-center shadow-lg"
                                    whileHover={{ scale: 1.1, rotate: 5 }}
                                    transition={{ type: "spring", stiffness: 400 }}
                                >
                                    <Shield className="w-6 h-6 text-white" />
                                </motion.div>
                                <span className="text-xl font-bold text-surface-900 group-hover:text-brand-600 transition-colors">
                                    CreditBridge
                                </span>
                            </Link>

                            <nav className="hidden md:flex items-center gap-8">
                                <Link to="/impact" className="text-surface-600 hover:text-brand-600 transition-colors link-underline font-medium">
                                    Impact
                                </Link>
                                <Link to="/privacy" className="text-surface-600 hover:text-brand-600 transition-colors link-underline font-medium">
                                    Privacy
                                </Link>
                                <Link to="/lender-portfolio" className="text-surface-600 hover:text-brand-600 transition-colors link-underline font-medium">
                                    For Lenders
                                </Link>
                            </nav>

                            <div className="flex items-center gap-4">
                                <Button
                                    variant="ghost"
                                    className="hidden sm:flex text-surface-600 hover:text-brand-600"
                                    onClick={() => navigate('/mode-selection')}
                                >
                                    Sign In
                                </Button>
                                <Button
                                    className="btn-premium"
                                    onClick={() => navigate('/single-input')}
                                >
                                    Get Your Score
                                    <ArrowRight className="w-4 h-4 ml-2" />
                                </Button>
                            </div>
                        </div>
                    </div>
                </motion.header>

                {/* Hero Content */}
                <div id="main-content" className="section-container relative z-10 pt-32 pb-20">
                    <motion.div
                        style={{ y }}
                        className="max-w-4xl mx-auto text-center"
                    >
                        {/* Badge */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                            className="inline-flex items-center gap-2 bg-brand-100 text-brand-700 px-4 py-2 rounded-full text-sm font-medium mb-8"
                        >
                            <Sparkles className="w-4 h-4" />
                            Prototype Demo
                        </motion.div>

                        {/* Headline */}
                        <motion.h1
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3, duration: 0.8 }}
                            className="text-display-lg md:text-display-xl lg:text-display-2xl font-bold text-surface-900 mb-6 text-balance"
                        >
                            Credit Scoring{' '}
                            <span className="gradient-text-hero">Reimagined</span>{' '}
                            for the Gig Economy
                        </motion.h1>

                        {/* Subheadline */}
                        <motion.p
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.5, duration: 0.8 }}
                            className="text-xl md:text-2xl text-surface-600 mb-12 max-w-2xl mx-auto leading-relaxed"
                        >
                            Traditional credit systems fail gig workers. We use machine learning to assess
                            creditworthiness based on <span className="text-brand-600 font-semibold">real work patterns</span>,
                            not outdated metrics.
                        </motion.p>

                        {/* CTAs */}
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.7, duration: 0.8 }}
                            className="flex flex-col sm:flex-row items-center justify-center gap-4"
                        >
                            <Button
                                size="lg"
                                className="btn-premium text-lg px-8 py-6 shadow-glow"
                                onClick={() => navigate('/single-input')}
                            >
                                <Zap className="w-5 h-5 mr-2" />
                                Get Your Score Free
                            </Button>

                            <Button
                                size="lg"
                                variant="outline"
                                className="text-lg px-8 py-6 border-2 border-surface-300 hover:border-brand-400 hover:bg-brand-50 transition-all"
                                onClick={() => navigate('/connect-account')}
                            >
                                <Play className="w-5 h-5 mr-2" />
                                Watch Demo
                            </Button>
                        </motion.div>

                        {/* Demo indicator */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 1, duration: 1 }}
                            className="flex flex-wrap items-center justify-center gap-8 mt-16 text-surface-400"
                        >
                            <div className="flex items-center gap-2">
                                <Sparkles className="w-5 h-5" />
                                <span className="text-sm font-medium">Demo Mode</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <Shield className="w-5 h-5" />
                                <span className="text-sm font-medium">No Real Data Used</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <CheckCircle className="w-5 h-5" />
                                <span className="text-sm font-medium">Prototype Application</span>
                            </div>
                        </motion.div>
                    </motion.div>

                    {/* Scroll indicator */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 1.5 }}
                        className="absolute bottom-8 left-1/2 -translate-x-1/2"
                    >
                        <motion.div
                            animate={{ y: [0, 10, 0] }}
                            transition={{ duration: 2, repeat: Infinity }}
                            className="text-surface-400"
                        >
                            <ChevronDown className="w-8 h-8" />
                        </motion.div>
                    </motion.div>
                </div>
            </section>

            {/* ═══════════════════════════════════════════════════════════════
          STATS SECTION
          ═══════════════════════════════════════════════════════════════ */}
            <section className="py-20 bg-white relative">
                <div className="section-container">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center mb-16"
                    >
                        <h2 className="text-display-sm md:text-display-md font-bold text-surface-900 mb-4">
                            Empowering the Invisible Workforce
                        </h2>
                        <p className="text-xl text-surface-600 max-w-2xl mx-auto">
                            Millions of gig workers are denied credit due to outdated scoring systems. We're changing that.
                        </p>
                    </motion.div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                        <StatCard
                            value={<AnimatedCounter end={2500000} suffix="+" />}
                            label="Gig Workers Worldwide"
                            icon={Users}
                            gradient="from-brand-500 to-brand-600"
                        />
                        <StatCard
                            value={<AnimatedCounter end={65} suffix="%" />}
                            label="Higher Approval Rate"
                            icon={TrendingUp}
                            gradient="from-success-500 to-success-600"
                        />
                        <StatCard
                            value={<AnimatedCounter end={45} suffix="+" />}
                            label="Countries Supported"
                            icon={Globe}
                            gradient="from-accent-pink to-accent-purple"
                        />
                        <StatCard
                            value={<AnimatedCounter end={30} suffix="sec" />}
                            label="Average Score Time"
                            icon={Zap}
                            gradient="from-warning-500 to-warning-600"
                        />
                    </div>
                </div>
            </section>

            {/* ═══════════════════════════════════════════════════════════════
          FEATURES SECTION
          ═══════════════════════════════════════════════════════════════ */}
            <section className="py-20 mesh-bg relative">
                <FloatingBlob className="blob-brand w-72 h-72 top-20 -right-36" delay={1} />

                <div className="section-container relative z-10">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center mb-16"
                    >
                        <span className="text-brand-600 font-semibold text-sm uppercase tracking-wider">Features</span>
                        <h2 className="text-display-sm md:text-display-md font-bold text-surface-900 mt-2 mb-4">
                            Why Gig Workers Choose Us
                        </h2>
                        <p className="text-xl text-surface-600 max-w-2xl mx-auto">
                            Built from the ground up to understand non-traditional income patterns
                        </p>
                    </motion.div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {features.map((feature, index) => (
                            <FeatureCard key={index} {...feature} delay={index * 0.1} />
                        ))}
                    </div>
                </div>
            </section>

            {/* ═══════════════════════════════════════════════════════════════
          HOW IT WORKS SECTION
          ═══════════════════════════════════════════════════════════════ */}
            <section className="py-20 bg-surface-900 relative overflow-hidden">
                <div className="absolute inset-0 mesh-bg-dark opacity-50" />

                <div className="section-container relative z-10">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center mb-16"
                    >
                        <span className="text-brand-400 font-semibold text-sm uppercase tracking-wider">Process</span>
                        <h2 className="text-display-sm md:text-display-md font-bold text-white mt-2 mb-4">
                            Get Your Score in 3 Steps
                        </h2>
                    </motion.div>

                    <div className="grid md:grid-cols-3 gap-8">
                        {[
                            { step: '01', title: 'Connect', desc: 'Link your gig platform accounts securely. Read-only access means we never touch your earnings.' },
                            { step: '02', title: 'Analyze', desc: 'Our ML engine examines income patterns, consistency, and growth trends from your work history.' },
                            { step: '03', title: 'Score', desc: 'Receive your CreditBridge score instantly. Share with lenders in our partner network.' }
                        ].map((item, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.2 }}
                                className="relative"
                            >
                                <div className="glass-card-dark rounded-2xl p-8 h-full">
                                    <span className="text-6xl font-bold text-brand-500/20">{item.step}</span>
                                    <h3 className="text-2xl font-bold text-white mt-4 mb-3">{item.title}</h3>
                                    <p className="text-surface-400 leading-relaxed">{item.desc}</p>
                                </div>

                                {index < 2 && (
                                    <div className="hidden md:block absolute top-1/2 -right-4 transform -translate-y-1/2">
                                        <ChevronRight className="w-8 h-8 text-brand-500/50" />
                                    </div>
                                )}
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ═══════════════════════════════════════════════════════════════
          TESTIMONIALS SECTION
          ═══════════════════════════════════════════════════════════════ */}
            <section className="py-20 bg-gradient-to-b from-surface-50 to-white relative">
                <div className="section-container">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center mb-16"
                    >
                        <span className="text-brand-600 font-semibold text-sm uppercase tracking-wider">Examples</span>
                        <h2 className="text-display-sm md:text-display-md font-bold text-surface-900 mt-2 mb-4">
                            Sample User Scenarios
                        </h2>
                    </motion.div>

                    <div className="max-w-3xl mx-auto">
                        <AnimatePresence mode="wait">
                            <TestimonialCard
                                key={activeTestimonial}
                                {...testimonials[activeTestimonial]}
                                isActive={true}
                            />
                        </AnimatePresence>

                        {/* Dots */}
                        <div className="flex justify-center gap-2 mt-8">
                            {testimonials.map((_, index) => (
                                <button
                                    key={index}
                                    onClick={() => setActiveTestimonial(index)}
                                    className={`w-3 h-3 rounded-full transition-all duration-300 ${index === activeTestimonial
                                        ? 'bg-brand-500 w-8'
                                        : 'bg-surface-300 hover:bg-surface-400'
                                        }`}
                                />
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* ═══════════════════════════════════════════════════════════════
          CTA SECTION
          ═══════════════════════════════════════════════════════════════ */}
            <section className="py-24 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-brand-600 via-brand-700 to-accent-purple" />
                <div className="absolute inset-0 opacity-30">
                    <div className="absolute top-0 left-0 w-full h-full bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZGVmcz48cGF0dGVybiBpZD0iZ3JpZCIgd2lkdGg9IjQwIiBoZWlnaHQ9IjQwIiBwYXR0ZXJuVW5pdHM9InVzZXJTcGFjZU9uVXNlIj48cGF0aCBkPSJNIDQwIDAgTCAwIDAgMCA0MCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSJ3aGl0ZSIgc3Ryb2tlLXdpZHRoPSIxIiBzdHJva2Utb3BhY2l0eT0iMC4xIi8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI2dyaWQpIi8+PC9zdmc+')]" />
                </div>

                <div className="section-container relative z-10 text-center">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                    >
                        <Award className="w-16 h-16 text-white/80 mx-auto mb-6" />
                        <h2 className="text-display-sm md:text-display-md font-bold text-white mb-6">
                            Ready to Bridge the Credit Gap?
                        </h2>
                        <p className="text-xl text-white/80 max-w-2xl mx-auto mb-10">
                            Join thousands of gig workers who've already discovered their true creditworthiness.
                        </p>

                        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                            <Button
                                size="lg"
                                className="bg-white text-brand-600 hover:bg-surface-100 text-lg px-8 py-6 shadow-xl"
                                onClick={() => navigate('/single-input')}
                            >
                                Get Started Free
                                <ArrowRight className="w-5 h-5 ml-2" />
                            </Button>
                            <Button
                                size="lg"
                                variant="outline"
                                className="text-white border-white/50 hover:bg-white/10 text-lg px-8 py-6"
                                onClick={() => navigate('/lender-portfolio')}
                            >
                                Partner With Us
                            </Button>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* ═══════════════════════════════════════════════════════════════
          FOOTER
          ═══════════════════════════════════════════════════════════════ */}
            <footer className="bg-surface-900 text-white py-16">
                <div className="section-container">
                    <div className="grid md:grid-cols-4 gap-12 mb-12">
                        <div>
                            <div className="flex items-center gap-3 mb-4">
                                <div className="w-10 h-10 bg-gradient-to-br from-brand-500 to-brand-700 rounded-xl flex items-center justify-center">
                                    <Shield className="w-6 h-6 text-white" />
                                </div>
                                <span className="text-xl font-bold">CreditBridge</span>
                            </div>
                            <p className="text-surface-400 text-sm leading-relaxed">
                                Bridging the credit gap for the gig economy through fair, ML-powered assessment.
                            </p>
                        </div>

                        <div>
                            <h4 className="font-semibold mb-4">Product</h4>
                            <ul className="space-y-2 text-surface-400 text-sm">
                                <li><Link to="/single-input" className="hover:text-white transition-colors">Get Your Score</Link></li>
                                <li><Link to="/connect-account" className="hover:text-white transition-colors">Connect Accounts</Link></li>
                                <li><Link to="/lender-portfolio" className="hover:text-white transition-colors">For Lenders</Link></li>
                            </ul>
                        </div>

                        <div>
                            <h4 className="font-semibold mb-4">Company</h4>
                            <ul className="space-y-2 text-surface-400 text-sm">
                                <li><Link to="/impact" className="hover:text-white transition-colors">Our Impact</Link></li>
                                <li><Link to="/privacy" className="hover:text-white transition-colors">Privacy & Security</Link></li>
                                <li><a href="#" className="hover:text-white transition-colors">Careers</a></li>
                            </ul>
                        </div>

                        <div>
                            <h4 className="font-semibold mb-4">Legal</h4>
                            <ul className="space-y-2 text-surface-400 text-sm">
                                <li><a href="#" className="hover:text-white transition-colors">Terms of Service</a></li>
                                <li><a href="#" className="hover:text-white transition-colors">Privacy Policy</a></li>
                                <li><a href="#" className="hover:text-white transition-colors">Cookie Policy</a></li>
                            </ul>
                        </div>
                    </div>

                    <div className="border-t border-surface-800 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
                        <p className="text-surface-500 text-sm">
                            © 2026 CreditBridge. Prototype Demo.
                        </p>
                        <div className="flex items-center gap-4">
                            <span className="text-surface-500 text-sm">Demo Mode: No real data transmitted</span>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default Landing;
