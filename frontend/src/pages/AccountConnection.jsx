import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../components/ui/card';
import { Progress } from '../components/ui/progress';
import {
    Shield, ArrowLeft, Check, ChevronRight, Lock,
    Zap, AlertCircle, ExternalLink, Sparkles
} from 'lucide-react';
import { gigPlatforms, demoPersonas } from '../data/demoPersonas';

/**
 * AccountConnection - Premium OAuth Flow Experience
 * Features 3D tilt cards, branded loading, and satisfying animations
 */

// 3D Tilt Platform Card
const PlatformCard = ({ platform, onClick, isConnected }) => {
    const [tilt, setTilt] = useState({ x: 0, y: 0 });
    const [isHovered, setIsHovered] = useState(false);

    const handleMouseMove = (e) => {
        const card = e.currentTarget;
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        const rotateX = (y - centerY) / 10;
        const rotateY = (centerX - x) / 10;
        setTilt({ x: rotateX, y: rotateY });
    };

    const handleMouseLeave = () => {
        setTilt({ x: 0, y: 0 });
        setIsHovered(false);
    };

    return (
        <motion.button
            onClick={onClick}
            onMouseMove={handleMouseMove}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={handleMouseLeave}
            className="relative w-full perspective-1000"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            disabled={isConnected}
        >
            <motion.div
                className={`p-6 rounded-2xl border-2 transition-all duration-200 ${isConnected
                    ? 'border-success-500 bg-success-50'
                    : isHovered
                        ? 'border-brand-400 bg-white shadow-glow-sm'
                        : 'border-surface-200 bg-white'
                    }`}
                style={{
                    transform: `rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
                    transformStyle: 'preserve-3d',
                }}
            >
                {/* Platform logo/icon area */}
                <div
                    className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4 text-3xl font-bold shadow-lg"
                    style={{
                        background: `linear-gradient(135deg, ${platform.color}20, ${platform.color}40)`,
                        color: platform.color,
                        transform: 'translateZ(20px)'
                    }}
                >
                    {platform.icon}
                </div>

                <h3
                    className="font-semibold text-surface-900 mb-1"
                    style={{ transform: 'translateZ(15px)' }}
                >
                    {platform.name}
                </h3>
                <p
                    className="text-sm text-surface-500"
                    style={{ transform: 'translateZ(10px)' }}
                >
                    {platform.type}
                </p>

                {/* Connected badge */}
                {isConnected && (
                    <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="absolute top-3 right-3 bg-success-500 text-white rounded-full p-1"
                    >
                        <Check className="w-4 h-4" />
                    </motion.div>
                )}

                {/* Shine effect on hover */}
                {isHovered && !isConnected && (
                    <motion.div
                        className="absolute inset-0 rounded-2xl pointer-events-none"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        style={{
                            background: 'linear-gradient(135deg, transparent, rgba(255,255,255,0.4), transparent)',
                            transform: 'translateZ(30px)'
                        }}
                    />
                )}
            </motion.div>
        </motion.button>
    );
};

// Connection phases
const connectionPhases = [
    { id: 'auth', message: 'Opening secure connection...', progress: 20 },
    { id: 'verify', message: 'Verifying credentials...', progress: 40 },
    { id: 'fetch', message: 'Fetching your data...', progress: 60 },
    { id: 'analyze', message: 'Analyzing patterns...', progress: 80 },
    { id: 'complete', message: 'Almost there...', progress: 95 },
];

// Loading animation with platform branding
const ConnectionLoader = ({ platform, onComplete }) => {
    const [phase, setPhase] = useState(0);
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            setPhase(prev => {
                if (prev >= connectionPhases.length - 1) {
                    clearInterval(timer);
                    setTimeout(onComplete, 800);
                    return prev;
                }
                return prev + 1;
            });
        }, 700);

        return () => clearInterval(timer);
    }, [onComplete]);

    useEffect(() => {
        setProgress(connectionPhases[phase].progress);
    }, [phase]);

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="text-center py-12"
        >
            {/* Platform icon with pulsing ring */}
            <div className="relative w-24 h-24 mx-auto mb-8">
                {/* Pulsing rings */}
                <motion.div
                    className="absolute inset-0 rounded-full"
                    style={{ border: `3px solid ${platform.color}30` }}
                    animate={{ scale: [1, 1.3, 1], opacity: [0.5, 0, 0.5] }}
                    transition={{ duration: 2, repeat: Infinity }}
                />
                <motion.div
                    className="absolute inset-0 rounded-full"
                    style={{ border: `3px solid ${platform.color}30` }}
                    animate={{ scale: [1, 1.5, 1], opacity: [0.5, 0, 0.5] }}
                    transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
                />

                {/* Center icon */}
                <motion.div
                    className="absolute inset-2 rounded-full flex items-center justify-center text-4xl font-bold shadow-xl"
                    style={{
                        background: `linear-gradient(135deg, ${platform.color}, ${platform.color}dd)`,
                        color: 'white'
                    }}
                    animate={{ rotate: 360 }}
                    transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                >
                    {platform.icon}
                </motion.div>
            </div>

            <h3 className="text-xl font-semibold text-surface-900 mb-2">
                Connecting to {platform.name}
            </h3>

            <AnimatePresence mode="wait">
                <motion.p
                    key={phase}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="text-surface-600 mb-8"
                >
                    {connectionPhases[phase].message}
                </motion.p>
            </AnimatePresence>

            {/* Progress bar with platform color */}
            <div className="max-w-xs mx-auto">
                <div className="h-2 bg-surface-200 rounded-full overflow-hidden">
                    <motion.div
                        className="h-full rounded-full"
                        style={{ background: platform.color }}
                        initial={{ width: 0 }}
                        animate={{ width: `${progress}%` }}
                        transition={{ duration: 0.5 }}
                    />
                </div>
                <p className="text-sm text-surface-500 mt-2">{progress}%</p>
            </div>
        </motion.div>
    );
};

// Success screen
const ConnectionSuccess = ({ platform, onContinue }) => {
    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center py-12"
        >
            {/* Success animation */}
            <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", duration: 0.6 }}
                className="w-24 h-24 mx-auto mb-8 bg-success-500 rounded-full flex items-center justify-center shadow-glow-success"
            >
                <motion.div
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                >
                    <Check className="w-12 h-12 text-white" strokeWidth={3} />
                </motion.div>
            </motion.div>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
            >
                <h3 className="text-2xl font-bold text-surface-900 mb-2">
                    Connected Successfully!
                </h3>
                <p className="text-surface-600 mb-8">
                    We've securely linked your {platform.name} account
                </p>

                {/* Data fetched summary */}
                <Card className="max-w-sm mx-auto mb-8 border-success-200 bg-success-50">
                    <CardContent className="p-4">
                        <div className="grid grid-cols-2 gap-4 text-sm">
                            <div className="text-left">
                                <p className="text-surface-500">Work Days Found</p>
                                <p className="font-semibold text-surface-900">247 days</p>
                            </div>
                            <div className="text-left">
                                <p className="text-surface-500">Time Period</p>
                                <p className="font-semibold text-surface-900">12 months</p>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <Button onClick={onContinue} className="btn-premium">
                    <Zap className="w-4 h-4 mr-2" />
                    Continue to Assessment
                </Button>
            </motion.div>
        </motion.div>
    );
};

const AccountConnection = () => {
    const navigate = useNavigate();
    const [state, setState] = useState('select'); // select, connecting, success
    const [selectedPlatform, setSelectedPlatform] = useState(null);
    const [connectedPlatforms, setConnectedPlatforms] = useState([]);

    const handlePlatformSelect = (platform) => {
        setSelectedPlatform(platform);
        setState('connecting');
    };

    const handleConnectionComplete = () => {
        setConnectedPlatforms(prev => [...prev, selectedPlatform.id]);
        setState('success');
    };

    const handleContinue = () => {
        // Pick a random persona for demo
        const randomPersona = demoPersonas[Math.floor(Math.random() * demoPersonas.length)];
        navigate('/single-input', {
            state: {
                prefillData: randomPersona.metrics,
                personaId: randomPersona.id
            }
        });
    };

    return (
        <div className="min-h-screen mesh-bg">
            {/* Header */}
            <header className="header-glass">
                <div className="section-container">
                    <div className="flex items-center justify-between h-16 md:h-20">
                        <Link to="/" className="flex items-center gap-3 group">
                            <motion.div
                                className="w-10 h-10 bg-gradient-to-br from-brand-500 to-brand-700 rounded-xl flex items-center justify-center shadow-lg"
                                whileHover={{ scale: 1.1, rotate: 5 }}
                            >
                                <Shield className="w-6 h-6 text-white" />
                            </motion.div>
                            <span className="text-xl font-bold text-surface-900 group-hover:text-brand-600 transition-colors">
                                CreditBridge
                            </span>
                        </Link>

                        <Button variant="ghost" onClick={() => navigate('/single-input')}>
                            <ArrowLeft className="w-4 h-4 mr-2" />
                            Skip to Manual Entry
                        </Button>
                    </div>
                </div>
            </header>

            <main className="section-container py-8 pb-16">
                <div className="max-w-4xl mx-auto">
                    {/* Title Section */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-center mb-10"
                    >
                        <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ type: "spring", delay: 0.2 }}
                            className="w-16 h-16 bg-gradient-to-br from-brand-500 to-accent-pink rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-glow"
                        >
                            <ExternalLink className="w-8 h-8 text-white" />
                        </motion.div>
                        <h1 className="text-display-sm font-bold text-surface-900 mb-3">
                            Connect Your Gig Accounts
                        </h1>
                        <p className="text-lg text-surface-600 max-w-xl mx-auto">
                            Securely link your platforms to auto-import your work history
                        </p>
                    </motion.div>

                    {/* Security Banner */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                        className="mb-8"
                    >
                        <Card className="border-surface-200 bg-white">
                            <CardContent className="p-4">
                                <div className="flex items-center gap-4 text-sm">
                                    <div className="flex items-center gap-2 text-success-600">
                                        <Lock className="w-4 h-4" />
                                        <span className="font-medium">Read-only access</span>
                                    </div>
                                    <span className="text-surface-300">|</span>
                                    <div className="flex items-center gap-2 text-surface-600">
                                        <Shield className="w-4 h-4" />
                                        <span>Simulated OAuth</span>
                                    </div>
                                    <span className="text-surface-300">|</span>
                                    <div className="flex items-center gap-2 text-surface-600">
                                        <AlertCircle className="w-4 h-4" />
                                        <span>Demo mode - no real data</span>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </motion.div>

                    {/* Main Content Card */}
                    <Card className="glass-card border-white/20 shadow-glass overflow-hidden">
                        <AnimatePresence mode="wait">
                            {state === 'select' && (
                                <motion.div
                                    key="select"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                >
                                    <CardHeader className="text-center pb-4">
                                        <CardTitle className="flex items-center justify-center gap-2">
                                            <Sparkles className="w-5 h-5 text-brand-500" />
                                            Select a Platform
                                        </CardTitle>
                                        <CardDescription>
                                            Choose where you do most of your gig work
                                        </CardDescription>
                                    </CardHeader>
                                    <CardContent>
                                        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                                            {gigPlatforms.map((platform, index) => (
                                                <motion.div
                                                    key={platform.id}
                                                    initial={{ opacity: 0, y: 20 }}
                                                    animate={{ opacity: 1, y: 0 }}
                                                    transition={{ delay: index * 0.1 }}
                                                >
                                                    <PlatformCard
                                                        platform={platform}
                                                        onClick={() => handlePlatformSelect(platform)}
                                                        isConnected={connectedPlatforms.includes(platform.id)}
                                                    />
                                                </motion.div>
                                            ))}
                                        </div>

                                        {/* Connected count */}
                                        {connectedPlatforms.length > 0 && (
                                            <motion.div
                                                initial={{ opacity: 0 }}
                                                animate={{ opacity: 1 }}
                                                className="mt-6 text-center"
                                            >
                                                <p className="text-sm text-success-600 font-medium">
                                                    ✓ {connectedPlatforms.length} platform(s) connected
                                                </p>
                                                <Button
                                                    onClick={handleContinue}
                                                    className="mt-4 btn-premium"
                                                >
                                                    Continue with Connected Accounts
                                                    <ChevronRight className="w-4 h-4 ml-2" />
                                                </Button>
                                            </motion.div>
                                        )}
                                    </CardContent>
                                </motion.div>
                            )}

                            {state === 'connecting' && selectedPlatform && (
                                <motion.div
                                    key="connecting"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                >
                                    <CardContent className="py-8">
                                        <ConnectionLoader
                                            platform={selectedPlatform}
                                            onComplete={handleConnectionComplete}
                                        />
                                    </CardContent>
                                </motion.div>
                            )}

                            {state === 'success' && selectedPlatform && (
                                <motion.div
                                    key="success"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                >
                                    <CardContent className="py-8">
                                        <ConnectionSuccess
                                            platform={selectedPlatform}
                                            onContinue={handleContinue}
                                        />
                                    </CardContent>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </Card>

                    {/* Footer note */}
                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.5 }}
                        className="mt-6 text-center text-sm text-surface-500"
                    >
                        Don't see your platform?{' '}
                        <Link to="/single-input" className="text-brand-600 hover:underline font-medium">
                            Enter data manually
                        </Link>
                    </motion.p>
                </div>
            </main>
        </div>
    );
};

export default AccountConnection;
