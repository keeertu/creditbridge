import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import Confetti from 'react-confetti';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Progress } from '../components/ui/progress';
import ScoreGauge from '../components/ScoreGauge';
import FactorGauge from '../components/FactorGauge';
import RiskBadge from '../components/RiskBadge';
import ExplanationCard from '../components/ExplanationCard';
import KeyInsights from '../components/KeyInsights';
import RoleToggle from '../components/RoleToggle';
import ScoreComparison from '../components/ScoreComparison';
import { useRole } from '../context/RoleContext';
import { fetchCreditScore } from '../services/creditApi';
import { deriveFactorScores } from '../utils/scoreMapping';
import { samplePayload } from '../data/mockData';
import {
  PlayCircle, RefreshCw, Shield, Activity, Share2,
  ArrowLeft, Lock, Target, Zap, TrendingUp, ChevronRight,
  Sparkles, CheckCircle, Download, Star
} from 'lucide-react';

/**
 * Dashboard - Dramatic Score Reveal Experience
 * Creates anticipation and celebration for credit score results
 */

// Loading phase messages
const loadingPhases = [
  { message: "Connecting to your data...", icon: Shield, progress: 15 },
  { message: "Analyzing income patterns...", icon: TrendingUp, progress: 35 },
  { message: "Evaluating work consistency...", icon: Activity, progress: 55 },
  { message: "Calculating reliability score...", icon: Zap, progress: 75 },
  { message: "Finalizing assessment...", icon: Star, progress: 95 },
];

// Dramatic Loading Component
const DramaticLoading = ({ onComplete }) => {
  const [phase, setPhase] = useState(0);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const phaseInterval = setInterval(() => {
      setPhase(prev => {
        if (prev >= loadingPhases.length - 1) {
          clearInterval(phaseInterval);
          setTimeout(onComplete, 500);
          return prev;
        }
        return prev + 1;
      });
    }, 600);

    return () => clearInterval(phaseInterval);
  }, [onComplete]);

  useEffect(() => {
    setProgress(loadingPhases[phase].progress);
  }, [phase]);

  const CurrentIcon = loadingPhases[phase].icon;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-surface-900/95 backdrop-blur-md z-50 flex items-center justify-center"
    >
      <div className="text-center max-w-md mx-auto px-6">
        {/* Animated rings */}
        <div className="relative w-32 h-32 mx-auto mb-8">
          <motion.div
            className="absolute inset-0 rounded-full border-4 border-brand-500/20"
            animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0, 0.5] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
          <motion.div
            className="absolute inset-2 rounded-full border-4 border-brand-500/40"
            animate={{ scale: [1, 1.15, 1], opacity: [0.5, 0, 0.5] }}
            transition={{ duration: 2, repeat: Infinity, delay: 0.3 }}
          />
          <motion.div
            className="absolute inset-4 rounded-full bg-gradient-to-br from-brand-500 to-brand-700 flex items-center justify-center shadow-glow"
            animate={{ rotate: 360 }}
            transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
          >
            <CurrentIcon className="w-12 h-12 text-white" />
          </motion.div>
        </div>

        {/* Phase message */}
        <AnimatePresence mode="wait">
          <motion.p
            key={phase}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="text-xl font-medium text-white mb-6"
          >
            {loadingPhases[phase].message}
          </motion.p>
        </AnimatePresence>

        {/* Progress bar */}
        <div className="relative h-2 bg-surface-700 rounded-full overflow-hidden mb-4">
          <motion.div
            className="absolute inset-y-0 left-0 bg-gradient-to-r from-brand-500 to-accent-pink rounded-full"
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          />
          <motion.div
            className="absolute inset-y-0 left-0 w-full"
            style={{
              background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent)',
              backgroundSize: '200% 100%'
            }}
            animate={{ backgroundPosition: ['200% 0', '-200% 0'] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        </div>

        <p className="text-surface-400 text-sm">{progress}% complete</p>
      </div>
    </motion.div>
  );
};

// Score Reveal Animation
const ScoreReveal = ({ score, riskBand, onRevealComplete }) => {
  const [revealed, setRevealed] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const isApproved = score >= 50;

  useEffect(() => {
    // Delay reveal for dramatic effect
    const timer = setTimeout(() => {
      setRevealed(true);
      if (score >= 70) {
        setShowConfetti(true);
        setTimeout(() => setShowConfetti(false), 5000);
      }
      onRevealComplete?.();
    }, 500);

    return () => clearTimeout(timer);
  }, [score, onRevealComplete]);

  return (
    <div className="relative">
      {/* Confetti celebration */}
      {showConfetti && (
        <Confetti
          width={window.innerWidth}
          height={window.innerHeight}
          recycle={false}
          numberOfPieces={300}
          gravity={0.3}
          colors={['#6366f1', '#ec4899', '#10b981', '#f59e0b', '#8b5cf6']}
          style={{ position: 'fixed', top: 0, left: 0, zIndex: 100 }}
        />
      )}

      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: "spring", duration: 0.8 }}
        className="text-center"
      >
        {/* Glow ring behind gauge */}
        <motion.div
          className={`absolute inset-0 -m-8 rounded-full ${score >= 70 ? 'bg-success-500/10' : score >= 50 ? 'bg-brand-500/10' : 'bg-warning-500/10'
            }`}
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1.5, opacity: [0, 0.5, 0] }}
          transition={{ duration: 1.5, repeat: isApproved ? 2 : 0 }}
        />

        {/* Score gauge with dramatic reveal */}
        <motion.div
          initial={{ rotateY: 180, opacity: 0 }}
          animate={{ rotateY: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="perspective-1000"
        >
          <ScoreGauge score={score} riskBand={riskBand} size="large" />
        </motion.div>

        {/* Approval badge */}
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: "spring", delay: 1 }}
          className="mt-6"
        >
          {isApproved ? (
            <motion.div
              className="inline-flex items-center gap-2 bg-success-100 text-success-700 px-6 py-3 rounded-full font-semibold text-lg shadow-glow-success"
              animate={score >= 70 ? { scale: [1, 1.05, 1] } : {}}
              transition={{ duration: 0.5, repeat: score >= 70 ? Infinity : 0, repeatDelay: 2 }}
            >
              <CheckCircle className="w-5 h-5" />
              CREDIT APPROVED
            </motion.div>
          ) : (
            <div className="inline-flex items-center gap-2 bg-warning-100 text-warning-700 px-6 py-3 rounded-full font-semibold text-lg">
              <TrendingUp className="w-5 h-5" />
              BUILDING CREDIT
            </div>
          )}
        </motion.div>

        {/* Risk badge */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 1.3 }}
          className="mt-4"
        >
          <RiskBadge riskBand={riskBand} />
        </motion.div>
      </motion.div>
    </div>
  );
};

const Dashboard = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [scoreData, setScoreData] = useState(location.state?.scoreData || null);
  const [loading, setLoading] = useState(false);
  const [dramaticLoading, setDramaticLoading] = useState(false);
  const [scoreRevealed, setScoreRevealed] = useState(!!location.state?.scoreData);
  const [detailsVisible, setDetailsVisible] = useState(false);
  const [applicantId] = useState(location.state?.applicantId || 'Sample Profile');
  const persona = location.state?.persona || null;
  const { isLender } = useRole();

  // If navigated with showReport but no scoreData, show dramatic loading
  useEffect(() => {
    if (location.state?.showReport && !scoreData && !loading) {
      handleEvaluate();
    }
  }, [location.state]);

  const handleEvaluate = async () => {
    setLoading(true);
    setDramaticLoading(true);
    setScoreRevealed(false);
    setDetailsVisible(false);

    try {
      const data = await fetchCreditScore(samplePayload);
      setScoreData(data);
    } catch (error) {
      console.error('Evaluation failed:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleLoadingComplete = () => {
    setDramaticLoading(false);
  };

  const handleRevealComplete = () => {
    // Stagger in the details after score reveal
    setTimeout(() => setDetailsVisible(true), 500);
  };

  const handleReset = () => {
    setScoreData(null);
    setScoreRevealed(false);
    setDetailsVisible(false);
  };

  const handleShare = () => {
    alert('Demo: Sharing score with verified lenders...');
  };

  // Derive factor scores
  const factorScores = scoreData
    ? deriveFactorScores(scoreData.score.credit_reliability_score, scoreData.score.key_reasons)
    : null;

  // Journey data
  const getJourneyData = (score) => {
    if (score >= 80) return { nextMilestone: 'Excellent', points: 0, message: "You've reached excellent status!" };
    if (score >= 70) return { nextMilestone: 'Low Risk (80)', points: 80 - score, message: `${Math.round(80 - score)} points to reach Low Risk` };
    if (score >= 55) return { nextMilestone: 'Good (70)', points: 70 - score, message: `${Math.round(70 - score)} points to Good standing` };
    return { nextMilestone: 'Fair (55)', points: 55 - score, message: `${Math.round(55 - score)} points to reach Fair` };
  };

  const journeyData = scoreData ? getJourneyData(scoreData.score.credit_reliability_score) : null;

  // Stagger animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15, delayChildren: 0.3 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };

  return (
    <div className="min-h-screen mesh-bg">
      {/* Dramatic Loading Overlay */}
      <AnimatePresence>
        {dramaticLoading && scoreData && (
          <DramaticLoading onComplete={handleLoadingComplete} />
        )}
      </AnimatePresence>

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

            <div className="flex items-center gap-4">
              <div className="hidden sm:flex items-center gap-3">
                <RoleToggle />
              </div>
              <Button variant="ghost" size="sm" onClick={() => navigate('/single-input')}>
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back
              </Button>
            </div>
          </div>
        </div>
      </header>

      <main className="section-container py-8">
        {!scoreData ? (
          /* Initial State */
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col items-center justify-center min-h-[60vh]"
          >
            <Card className="max-w-md w-full glass-card border-white/20 shadow-glass">
              <CardContent className="p-8 text-center">
                <motion.div
                  className="w-20 h-20 bg-gradient-to-br from-brand-500 to-brand-700 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-glow"
                  animate={{ rotate: [0, 5, -5, 0] }}
                  transition={{ duration: 4, repeat: Infinity }}
                >
                  <Shield className="w-10 h-10 text-white" />
                </motion.div>
                <h2 className="text-2xl font-bold text-surface-900 mb-2">
                  Credit Assessment
                </h2>
                <p className="text-surface-600 mb-8">
                  Evaluate a non-traditional income profile using our ML-powered scoring system.
                </p>
                <Button
                  onClick={handleEvaluate}
                  disabled={loading}
                  className="btn-premium w-full text-lg py-6"
                >
                  {loading ? (
                    <>
                      <RefreshCw className="w-5 h-5 mr-2 animate-spin" />
                      Processing...
                    </>
                  ) : (
                    <>
                      <Zap className="w-5 h-5 mr-2" />
                      Reveal My Score
                    </>
                  )}
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        ) : (
          /* Results Dashboard */
          <motion.div
            className="space-y-8"
            initial="hidden"
            animate="visible"
            variants={containerVariants}
          >
            {/* Applicant Banner */}
            {(applicantId || persona) && (
              <motion.div variants={itemVariants}>
                <Card className="glass-card border-brand-200/50">
                  <CardContent className="p-4">
                    <div className="flex items-center gap-4">
                      {persona?.photo && (
                        <img src={persona.photo} alt={persona.name} className="w-14 h-14 rounded-full ring-2 ring-brand-500/20" />
                      )}
                      <div className="flex-1">
                        <p className="font-semibold text-surface-900">{persona?.name || applicantId}</p>
                        {persona && <p className="text-sm text-surface-500">{persona.role} • {persona.location}</p>}
                      </div>
                      <span className="text-xs bg-brand-100 text-brand-700 px-3 py-1.5 rounded-full font-medium">
                        ID: {applicantId}
                      </span>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            )}

            {/* Score Reveal Section */}
            <motion.section variants={itemVariants} className="flex justify-center py-8">
              <Card className="glass-card border-white/20 shadow-glass-lg max-w-xl w-full">
                <CardContent className="p-8 md:p-12">
                  <ScoreReveal
                    score={scoreData.score.credit_reliability_score}
                    riskBand={scoreData.score.risk_band}
                    onRevealComplete={handleRevealComplete}
                  />
                </CardContent>
              </Card>
            </motion.section>

            {/* Details fade in after reveal */}
            <AnimatePresence>
              {detailsVisible && (
                <motion.div
                  initial="hidden"
                  animate="visible"
                  variants={containerVariants}
                  className="space-y-8"
                >
                  {/* Score Comparison */}
                  <motion.section variants={itemVariants}>
                    <ScoreComparison
                      creditBridgeScore={scoreData.score.credit_reliability_score}
                      riskBand={scoreData.score.risk_band}
                      traditionalStatus={persona?.traditionalStatus || 'No Credit History'}
                      showExplanation={false}
                    />
                  </motion.section>

                  {/* Factor Gauges */}
                  <motion.section variants={itemVariants}>
                    <h2 className="text-xl font-bold text-surface-900 mb-6 flex items-center gap-2">
                      <Sparkles className="w-5 h-5 text-brand-500" />
                      Score Factors
                    </h2>
                    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
                      {factorScores && Object.values(factorScores).map((factor, idx) => (
                        <motion.div
                          key={idx}
                          initial={{ opacity: 0, scale: 0.9 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: idx * 0.1 }}
                        >
                          <FactorGauge factor={factor} />
                        </motion.div>
                      ))}
                    </div>
                  </motion.section>

                  {/* Financial Journey (Applicant only) */}
                  {!isLender && (
                    <motion.section variants={itemVariants}>
                      <h2 className="text-xl font-bold text-surface-900 mb-6 flex items-center gap-2">
                        <Target className="w-5 h-5 text-brand-500" />
                        Your Financial Journey
                      </h2>
                      <Card className="bg-gradient-to-br from-brand-50 to-accent-pink/10 border-brand-200/50">
                        <CardContent className="p-6">
                          <div className="grid md:grid-cols-2 gap-6">
                            <div>
                              <p className="text-sm text-surface-500 mb-2">Next Milestone</p>
                              <p className="text-2xl font-bold text-surface-900 mb-4">{journeyData?.nextMilestone}</p>
                              <div className="space-y-2">
                                <Progress value={journeyData?.points === 0 ? 100 : Math.max(0, 100 - journeyData.points * 3)} className="h-3" />
                                <p className="text-sm text-brand-600 font-medium">{journeyData?.message}</p>
                              </div>
                            </div>
                            <div>
                              <p className="text-sm text-surface-500 mb-2 flex items-center gap-2">
                                <Zap className="w-4 h-4 text-warning-500" />
                                Quick Wins
                              </p>
                              <ul className="space-y-2">
                                <li className="flex items-start gap-2 text-sm text-surface-700">
                                  <TrendingUp className="w-4 h-4 text-success-500 flex-shrink-0 mt-0.5" />
                                  Maintain consistent daily work patterns
                                </li>
                                <li className="flex items-start gap-2 text-sm text-surface-700">
                                  <TrendingUp className="w-4 h-4 text-success-500 flex-shrink-0 mt-0.5" />
                                  Reduce income gaps to under 5 days
                                </li>
                              </ul>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </motion.section>
                  )}

                  {/* Key Insights */}
                  <motion.section variants={itemVariants}>
                    <h2 className="text-xl font-bold text-surface-900 mb-6">Analysis</h2>
                    <KeyInsights
                      reasons={scoreData.score.key_reasons}
                      suggestions={scoreData.score.suggestions}
                      showSuggestions={!isLender}
                    />
                  </motion.section>

                  {/* Explanations */}
                  {scoreData.explanations && (
                    <motion.section variants={itemVariants}>
                      <h2 className="text-xl font-bold text-surface-900 mb-6">
                        {isLender ? 'Risk Assessment' : 'Your Summary'}
                      </h2>
                      <div className="max-w-2xl">
                        {isLender ? (
                          <ExplanationCard type="lender" content={scoreData.explanations.lender || 'Risk assessment not available.'} />
                        ) : (
                          <ExplanationCard type="user" content={scoreData.explanations.user || 'Summary not available.'} />
                        )}
                      </div>
                    </motion.section>
                  )}

                  {/* Action Buttons */}
                  <motion.div variants={itemVariants} className="flex flex-col sm:flex-row justify-center gap-4 pt-8">
                    {!isLender && (
                      <Button onClick={handleShare} className="btn-premium">
                        <Share2 className="w-4 h-4 mr-2" />
                        Share with Lenders
                      </Button>
                    )}
                    <Button onClick={handleReset} variant="outline" className="card-hover">
                      <RefreshCw className="w-4 h-4 mr-2" />
                      Evaluate Another
                    </Button>
                    <Link to="/privacy">
                      <Button variant="ghost" className="text-surface-500">
                        <Lock className="w-4 h-4 mr-2" />
                        Privacy Settings
                      </Button>
                    </Link>
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-surface-200 bg-white/50 mt-16">
        <div className="section-container py-6">
          <div className="flex items-center justify-between text-sm text-surface-500">
            <span>CreditBridge Assessment System</span>
            <Link to="/impact" className="flex items-center gap-1 text-brand-600 hover:text-brand-700 font-medium">
              See Our Impact
              <ChevronRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Dashboard;
