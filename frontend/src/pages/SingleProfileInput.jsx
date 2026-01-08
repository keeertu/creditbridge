import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../components/ui/card';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '../components/ui/select';
import { Progress } from '../components/ui/progress';
import { fetchCreditScore } from '../services/creditApi';
import {
    ArrowLeft, Shield, Zap, CheckCircle, AlertCircle,
    Info, Link2, Sparkles, User, TrendingUp, Clock,
    DollarSign, Activity, HelpCircle
} from 'lucide-react';
import { demoPersonas, getPersonaById } from '../data/demoPersonas';

/**
 * SingleProfileInput - Premium Form Experience
 * Features real-time validation, animated feedback, and demo personas
 */

// Tooltip component
const Tooltip = ({ children, content }) => (
    <div className="group relative inline-block">
        {children}
        <div className="invisible group-hover:visible absolute z-10 w-64 p-3 mt-2 text-sm text-white bg-surface-900 rounded-xl shadow-xl opacity-0 group-hover:opacity-100 transition-all duration-200 -translate-y-1 group-hover:translate-y-0 left-1/2 -translate-x-1/2">
            {content}
            <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-surface-900 rotate-45" />
        </div>
    </div>
);

// Animated input field
const FormField = ({ label, tooltip, icon: Icon, error, valid, children, delay = 0 }) => (
    <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay }}
        className="space-y-2"
    >
        <div className="flex items-center justify-between">
            <Label className="text-sm font-medium text-surface-700 flex items-center gap-2">
                {Icon && <Icon className="w-4 h-4 text-surface-400" />}
                {label}
                {tooltip && (
                    <Tooltip content={tooltip}>
                        <HelpCircle className="w-3.5 h-3.5 text-surface-400 cursor-help" />
                    </Tooltip>
                )}
            </Label>
            <AnimatePresence>
                {valid && (
                    <motion.span
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0, opacity: 0 }}
                        className="flex items-center gap-1 text-xs text-success-600"
                    >
                        <CheckCircle className="w-3.5 h-3.5" />
                        Valid
                    </motion.span>
                )}
                {error && (
                    <motion.span
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0, opacity: 0 }}
                        className="flex items-center gap-1 text-xs text-danger-600"
                    >
                        <AlertCircle className="w-3.5 h-3.5" />
                        {error}
                    </motion.span>
                )}
            </AnimatePresence>
        </div>
        {children}
    </motion.div>
);

// Persona card
const PersonaCard = ({ persona, isSelected, onClick }) => (
    <motion.button
        onClick={onClick}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className={`w-full p-4 rounded-xl border-2 text-left transition-all ${isSelected
                ? 'border-brand-500 bg-brand-50 shadow-glow-sm'
                : 'border-surface-200 bg-white hover:border-brand-300 hover:shadow-md'
            }`}
    >
        <div className="flex items-center gap-3">
            <img src={persona.photo} alt={persona.name} className="w-12 h-12 rounded-full ring-2 ring-white shadow" />
            <div className="flex-1 min-w-0">
                <p className="font-semibold text-surface-900 truncate">{persona.name}</p>
                <p className="text-sm text-surface-500 truncate">{persona.role}</p>
            </div>
            <div className="text-right">
                <span className="text-xs font-medium text-brand-600 bg-brand-100 px-2 py-1 rounded-full">
                    Score: {persona.expectedScore}
                </span>
            </div>
        </div>
    </motion.button>
);

const SingleProfileInput = () => {
    const navigate = useNavigate();
    const location = useLocation();

    // Form state
    const [formData, setFormData] = useState({
        applicantId: 'APP-' + Math.random().toString(36).substr(2, 9).toUpperCase(),
        avgDailyIncome: '',
        incomeStdDev: '',
        activeDaysRatio: '',
        maxIncomeGap: '',
        tenureMonths: '',
        incomeTrend: ''
    });

    const [selectedPersona, setSelectedPersona] = useState(null);
    const [animatingFields, setAnimatingFields] = useState({});
    const [loading, setLoading] = useState(false);
    const [formProgress, setFormProgress] = useState(0);
    const [showPersonaSelector, setShowPersonaSelector] = useState(true);

    // Validation
    const [touched, setTouched] = useState({});
    const [errors, setErrors] = useState({});

    // Handle prefill from AccountConnection
    useEffect(() => {
        if (location.state?.prefillData) {
            const { prefillData, personaId } = location.state;
            handlePersonaSelect(personaId);
        }
    }, [location.state]);

    // Calculate form progress
    useEffect(() => {
        const fields = ['avgDailyIncome', 'incomeStdDev', 'activeDaysRatio', 'maxIncomeGap', 'tenureMonths', 'incomeTrend'];
        const filledFields = fields.filter(field => formData[field] !== '' && formData[field] !== undefined);
        setFormProgress((filledFields.length / fields.length) * 100);
    }, [formData]);

    // Validate field
    const validateField = (name, value) => {
        const numValue = parseFloat(value);
        switch (name) {
            case 'avgDailyIncome':
                if (!value) return 'Required';
                if (numValue < 0) return 'Must be positive';
                if (numValue > 10000) return 'Max $10,000';
                return null;
            case 'incomeStdDev':
                if (!value) return 'Required';
                if (numValue < 0) return 'Must be positive';
                return null;
            case 'activeDaysRatio':
                if (!value) return 'Required';
                if (numValue < 0 || numValue > 1) return '0-1 range';
                return null;
            case 'maxIncomeGap':
                if (!value) return 'Required';
                if (numValue < 0) return 'Must be positive';
                if (numValue > 90) return 'Max 90 days';
                return null;
            case 'tenureMonths':
                if (!value) return 'Required';
                if (numValue < 1) return 'Min 1 month';
                if (numValue > 120) return 'Max 120 months';
                return null;
            case 'incomeTrend':
                if (!value && value !== 0) return 'Required';
                if (numValue < -1 || numValue > 1) return '-1 to 1 range';
                return null;
            default:
                return null;
        }
    };

    // Handle input change
    const handleInputChange = (name, value) => {
        setFormData(prev => ({ ...prev, [name]: value }));

        if (touched[name]) {
            const error = validateField(name, value);
            setErrors(prev => ({ ...prev, [name]: error }));
        }
    };

    // Handle blur
    const handleBlur = (name) => {
        setTouched(prev => ({ ...prev, [name]: true }));
        const error = validateField(name, formData[name]);
        setErrors(prev => ({ ...prev, [name]: error }));
    };

    // Handle persona selection
    const handlePersonaSelect = (personaId) => {
        const persona = getPersonaById(personaId);
        if (!persona) return;

        setSelectedPersona(persona);
        setShowPersonaSelector(false);

        // Animate field population
        const fields = ['avgDailyIncome', 'incomeStdDev', 'activeDaysRatio', 'maxIncomeGap', 'tenureMonths', 'incomeTrend'];
        const metrics = persona.metrics;

        fields.forEach((field, index) => {
            setTimeout(() => {
                setAnimatingFields(prev => ({ ...prev, [field]: true }));

                const mapping = {
                    avgDailyIncome: metrics.avg_daily_income,
                    incomeStdDev: metrics.income_std_dev,
                    activeDaysRatio: metrics.active_days_ratio,
                    maxIncomeGap: metrics.max_income_gap,
                    tenureMonths: metrics.tenure_months,
                    incomeTrend: metrics.income_trend
                };

                setFormData(prev => ({ ...prev, [field]: mapping[field] }));
                setTouched(prev => ({ ...prev, [field]: true }));

                setTimeout(() => {
                    setAnimatingFields(prev => ({ ...prev, [field]: false }));
                }, 500);
            }, index * 150);
        });
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();

        // Validate all fields
        const allErrors = {};
        Object.keys(formData).forEach(key => {
            if (key !== 'applicantId') {
                const error = validateField(key, formData[key]);
                if (error) allErrors[key] = error;
            }
        });

        setErrors(allErrors);
        setTouched(Object.keys(formData).reduce((acc, key) => ({ ...acc, [key]: true }), {}));

        if (Object.keys(allErrors).length > 0) return;

        setLoading(true);
        try {
            const payload = {
                applicant_id: formData.applicantId,
                avg_daily_income: parseFloat(formData.avgDailyIncome),
                income_std_dev: parseFloat(formData.incomeStdDev),
                active_days_ratio: parseFloat(formData.activeDaysRatio),
                max_income_gap: parseInt(formData.maxIncomeGap),
                tenure_months: parseInt(formData.tenureMonths),
                income_trend: parseFloat(formData.incomeTrend)
            };

            const response = await fetchCreditScore(payload);

            navigate('/report', {
                state: {
                    scoreData: response,
                    applicantId: formData.applicantId,
                    persona: selectedPersona,
                    showReport: true
                }
            });
        } catch (error) {
            console.error('Submission failed:', error);
        } finally {
            setLoading(false);
        }
    };

    const isFormValid = formProgress === 100 && Object.keys(errors).filter(k => errors[k]).length === 0;

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

                        <Button variant="ghost" onClick={() => navigate('/mode-selection')}>
                            <ArrowLeft className="w-4 h-4 mr-2" />
                            Back to Mode Selection
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
                            className="w-16 h-16 bg-gradient-to-br from-brand-500 to-brand-700 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-glow"
                        >
                            <User className="w-8 h-8 text-white" />
                        </motion.div>
                        <h1 className="text-display-sm font-bold text-surface-900 mb-3">
                            Single Profile Analysis
                        </h1>
                        <p className="text-lg text-surface-600 max-w-xl mx-auto">
                            Enter applicant income metrics to generate a credit reliability report.
                        </p>
                    </motion.div>

                    {/* Demo Mode Banner */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                        className="mb-8"
                    >
                        <Card className="border-brand-200 bg-gradient-to-r from-brand-50 to-accent-pink/10">
                            <CardContent className="p-4">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 bg-brand-100 rounded-xl flex items-center justify-center">
                                        <Sparkles className="w-5 h-5 text-brand-600" />
                                    </div>
                                    <div className="flex-1">
                                        <p className="font-semibold text-surface-900">Demo Mode</p>
                                        <p className="text-sm text-surface-600">Select a sample persona or enter custom values</p>
                                    </div>
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        onClick={() => navigate('/connect-account')}
                                        className="hidden sm:flex border-brand-300 text-brand-700 hover:bg-brand-100"
                                    >
                                        <Link2 className="w-4 h-4 mr-2" />
                                        Connect Gig Account
                                    </Button>
                                </div>
                            </CardContent>
                        </Card>
                    </motion.div>

                    {/* Persona Selector */}
                    <AnimatePresence>
                        {showPersonaSelector && (
                            <motion.div
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: 'auto' }}
                                exit={{ opacity: 0, height: 0 }}
                                className="mb-8 overflow-hidden"
                            >
                                <Card className="glass-card border-white/20">
                                    <CardHeader>
                                        <CardTitle className="text-lg flex items-center gap-2">
                                            <User className="w-5 h-5 text-brand-500" />
                                            Select Demo Persona
                                        </CardTitle>
                                        <CardDescription>Choose a sample profile to auto-fill the form</CardDescription>
                                    </CardHeader>
                                    <CardContent>
                                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                                            {demoPersonas.map((persona) => (
                                                <PersonaCard
                                                    key={persona.id}
                                                    persona={persona}
                                                    isSelected={selectedPersona?.id === persona.id}
                                                    onClick={() => handlePersonaSelect(persona.id)}
                                                />
                                            ))}
                                        </div>
                                    </CardContent>
                                </Card>
                            </motion.div>
                        )}
                    </AnimatePresence>

                    {/* Selected Persona Banner */}
                    {selectedPersona && !showPersonaSelector && (
                        <motion.div
                            initial={{ opacity: 0, y: -20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="mb-8"
                        >
                            <Card className="border-success-200 bg-success-50">
                                <CardContent className="p-4">
                                    <div className="flex items-center gap-4">
                                        <img src={selectedPersona.photo} alt={selectedPersona.name} className="w-12 h-12 rounded-full ring-2 ring-white shadow" />
                                        <div className="flex-1">
                                            <p className="font-semibold text-surface-900">{selectedPersona.name}</p>
                                            <p className="text-sm text-surface-600">{selectedPersona.role}</p>
                                        </div>
                                        <Button variant="ghost" size="sm" onClick={() => setShowPersonaSelector(true)}>
                                            Change
                                        </Button>
                                    </div>
                                </CardContent>
                            </Card>
                        </motion.div>
                    )}

                    {/* Progress Bar */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.4 }}
                        className="mb-8"
                    >
                        <div className="flex items-center justify-between mb-2">
                            <span className="text-sm font-medium text-surface-600">Form Completion</span>
                            <span className="text-sm font-bold text-brand-600">{Math.round(formProgress)}%</span>
                        </div>
                        <Progress value={formProgress} className="h-2" />
                    </motion.div>

                    {/* Form */}
                    <form onSubmit={handleSubmit}>
                        <Card className="glass-card border-white/20 shadow-glass mb-8">
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <Activity className="w-5 h-5 text-brand-500" />
                                    Income Metrics
                                </CardTitle>
                                <CardDescription>Enter gig work income data for credit assessment</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-6">
                                {/* Applicant ID */}
                                <FormField
                                    label="Applicant ID"
                                    icon={User}
                                    delay={0.1}
                                >
                                    <Input
                                        value={formData.applicantId}
                                        onChange={(e) => handleInputChange('applicantId', e.target.value)}
                                        className="bg-surface-50 border-surface-200 focus:border-brand-500 focus:ring-brand-500/20"
                                    />
                                </FormField>

                                <div className="grid md:grid-cols-2 gap-6">
                                    {/* Average Daily Income */}
                                    <FormField
                                        label="Avg Daily Income ($)"
                                        tooltip="Average daily earnings from gig work over the past months"
                                        icon={DollarSign}
                                        error={touched.avgDailyIncome && errors.avgDailyIncome}
                                        valid={touched.avgDailyIncome && !errors.avgDailyIncome && formData.avgDailyIncome}
                                        delay={0.15}
                                    >
                                        <Input
                                            type="number"
                                            step="0.01"
                                            placeholder="e.g., 150"
                                            value={formData.avgDailyIncome}
                                            onChange={(e) => handleInputChange('avgDailyIncome', e.target.value)}
                                            onBlur={() => handleBlur('avgDailyIncome')}
                                            className={`transition-all duration-300 ${animatingFields.avgDailyIncome ? 'bg-brand-100 border-brand-500' : 'bg-white'
                                                } ${errors.avgDailyIncome && touched.avgDailyIncome ? 'border-danger-500' : ''}`}
                                        />
                                    </FormField>

                                    {/* Income Std Dev */}
                                    <FormField
                                        label="Income Std Dev ($)"
                                        tooltip="Standard deviation of daily income - measures consistency"
                                        icon={Activity}
                                        error={touched.incomeStdDev && errors.incomeStdDev}
                                        valid={touched.incomeStdDev && !errors.incomeStdDev && formData.incomeStdDev}
                                        delay={0.2}
                                    >
                                        <Input
                                            type="number"
                                            step="0.01"
                                            placeholder="e.g., 45"
                                            value={formData.incomeStdDev}
                                            onChange={(e) => handleInputChange('incomeStdDev', e.target.value)}
                                            onBlur={() => handleBlur('incomeStdDev')}
                                            className={`transition-all duration-300 ${animatingFields.incomeStdDev ? 'bg-brand-100 border-brand-500' : 'bg-white'
                                                } ${errors.incomeStdDev && touched.incomeStdDev ? 'border-danger-500' : ''}`}
                                        />
                                    </FormField>

                                    {/* Active Days Ratio */}
                                    <FormField
                                        label="Active Days Ratio"
                                        tooltip="Ratio of working days to total days (0-1)"
                                        icon={TrendingUp}
                                        error={touched.activeDaysRatio && errors.activeDaysRatio}
                                        valid={touched.activeDaysRatio && !errors.activeDaysRatio && formData.activeDaysRatio}
                                        delay={0.25}
                                    >
                                        <Input
                                            type="number"
                                            step="0.01"
                                            min="0"
                                            max="1"
                                            placeholder="e.g., 0.75"
                                            value={formData.activeDaysRatio}
                                            onChange={(e) => handleInputChange('activeDaysRatio', e.target.value)}
                                            onBlur={() => handleBlur('activeDaysRatio')}
                                            className={`transition-all duration-300 ${animatingFields.activeDaysRatio ? 'bg-brand-100 border-brand-500' : 'bg-white'
                                                } ${errors.activeDaysRatio && touched.activeDaysRatio ? 'border-danger-500' : ''}`}
                                        />
                                    </FormField>

                                    {/* Max Income Gap */}
                                    <FormField
                                        label="Max Income Gap (days)"
                                        tooltip="Longest gap without income in days"
                                        icon={Clock}
                                        error={touched.maxIncomeGap && errors.maxIncomeGap}
                                        valid={touched.maxIncomeGap && !errors.maxIncomeGap && formData.maxIncomeGap}
                                        delay={0.3}
                                    >
                                        <Input
                                            type="number"
                                            min="0"
                                            placeholder="e.g., 5"
                                            value={formData.maxIncomeGap}
                                            onChange={(e) => handleInputChange('maxIncomeGap', e.target.value)}
                                            onBlur={() => handleBlur('maxIncomeGap')}
                                            className={`transition-all duration-300 ${animatingFields.maxIncomeGap ? 'bg-brand-100 border-brand-500' : 'bg-white'
                                                } ${errors.maxIncomeGap && touched.maxIncomeGap ? 'border-danger-500' : ''}`}
                                        />
                                    </FormField>

                                    {/* Tenure Months */}
                                    <FormField
                                        label="Tenure (Months)"
                                        tooltip="How long on gig platforms"
                                        icon={Clock}
                                        error={touched.tenureMonths && errors.tenureMonths}
                                        valid={touched.tenureMonths && !errors.tenureMonths && formData.tenureMonths}
                                        delay={0.35}
                                    >
                                        <Input
                                            type="number"
                                            min="1"
                                            placeholder="e.g., 12"
                                            value={formData.tenureMonths}
                                            onChange={(e) => handleInputChange('tenureMonths', e.target.value)}
                                            onBlur={() => handleBlur('tenureMonths')}
                                            className={`transition-all duration-300 ${animatingFields.tenureMonths ? 'bg-brand-100 border-brand-500' : 'bg-white'
                                                } ${errors.tenureMonths && touched.tenureMonths ? 'border-danger-500' : ''}`}
                                        />
                                    </FormField>

                                    {/* Income Trend */}
                                    <FormField
                                        label="Income Trend"
                                        tooltip="Growth rate: -1 (declining) to 1 (growing)"
                                        icon={TrendingUp}
                                        error={touched.incomeTrend && errors.incomeTrend}
                                        valid={touched.incomeTrend && !errors.incomeTrend && (formData.incomeTrend !== '' && formData.incomeTrend !== undefined)}
                                        delay={0.4}
                                    >
                                        <Input
                                            type="number"
                                            step="0.01"
                                            min="-1"
                                            max="1"
                                            placeholder="e.g., 0.05"
                                            value={formData.incomeTrend}
                                            onChange={(e) => handleInputChange('incomeTrend', e.target.value)}
                                            onBlur={() => handleBlur('incomeTrend')}
                                            className={`transition-all duration-300 ${animatingFields.incomeTrend ? 'bg-brand-100 border-brand-500' : 'bg-white'
                                                } ${errors.incomeTrend && touched.incomeTrend ? 'border-danger-500' : ''}`}
                                        />
                                    </FormField>
                                </div>

                                {/* Submit Button */}
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.5 }}
                                    className="pt-6"
                                >
                                    <Button
                                        type="submit"
                                        disabled={!isFormValid || loading}
                                        className={`w-full text-lg py-6 transition-all duration-300 ${isFormValid
                                                ? 'btn-premium shadow-glow'
                                                : 'bg-surface-300 text-surface-500 cursor-not-allowed'
                                            }`}
                                    >
                                        {loading ? (
                                            <>
                                                <motion.div
                                                    animate={{ rotate: 360 }}
                                                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                                                    className="w-5 h-5 mr-2 border-2 border-white border-t-transparent rounded-full"
                                                />
                                                Analyzing Profile...
                                            </>
                                        ) : (
                                            <>
                                                <Zap className="w-5 h-5 mr-2" />
                                                Run Credit Assessment
                                            </>
                                        )}
                                    </Button>
                                    {!isFormValid && (
                                        <p className="text-center text-sm text-surface-500 mt-3">
                                            Complete all fields to enable assessment
                                        </p>
                                    )}
                                </motion.div>
                            </CardContent>
                        </Card>
                    </form>

                    {/* Info Card */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.6 }}
                    >
                        <Card className="border-surface-200 bg-surface-50">
                            <CardContent className="p-4">
                                <div className="flex items-start gap-3">
                                    <Info className="w-5 h-5 text-brand-500 flex-shrink-0 mt-0.5" />
                                    <div className="text-sm text-surface-600">
                                        <p className="font-medium text-surface-900 mb-1">How we calculate your score</p>
                                        <p>Our ML model analyzes income consistency, work patterns, and growth trends to create a fair assessment that traditional credit scores miss.</p>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </motion.div>
                </div>
            </main>
        </div>
    );
};

export default SingleProfileInput;
