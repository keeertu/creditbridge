import React, { useEffect, useState } from 'react';
import Confetti from 'react-confetti';
import { motion } from 'framer-motion';
import { getRiskColor } from '../utils/riskColors';
import { formatScore } from '../utils/scoreMapping';

/**
 * ScoreGauge - Animated circular score display with confetti for high scores
 * Features smooth count-up animation, glow effects, and celebration confetti
 */
const ScoreGauge = ({ score, riskBand, size = 'large' }) => {
  const [animatedScore, setAnimatedScore] = useState(0);
  const [showConfetti, setShowConfetti] = useState(false);
  const [animationComplete, setAnimationComplete] = useState(false);
  const colors = getRiskColor(score);

  // Dimensions based on size
  const dimensions = size === 'large'
    ? { width: 280, stroke: 16, radius: 120 }
    : size === 'medium'
      ? { width: 180, stroke: 12, radius: 75 }
      : { width: 140, stroke: 8, radius: 58 };

  const { width, stroke, radius } = dimensions;
  const circumference = 2 * Math.PI * radius;
  const progress = (animatedScore / 100) * circumference;
  const dashOffset = circumference - progress;

  // Animate score on mount/change
  useEffect(() => {
    const duration = 1500;
    const startTime = Date.now();
    const startScore = 0;

    const animate = () => {
      const elapsed = Date.now() - startTime;
      const progressRatio = Math.min(elapsed / duration, 1);

      // Easing function for smooth animation
      const easeOut = 1 - Math.pow(1 - progressRatio, 3);
      const currentScore = startScore + (score - startScore) * easeOut;

      setAnimatedScore(currentScore);

      if (progressRatio < 1) {
        requestAnimationFrame(animate);
      } else {
        setAnimationComplete(true);
        // Trigger confetti for high scores
        if (score >= 70) {
          setShowConfetti(true);
          setTimeout(() => setShowConfetti(false), 4000);
        }
      }
    };

    animate();

    return () => {
      setAnimationComplete(false);
      setShowConfetti(false);
    };
  }, [score]);

  // Calculate glow intensity based on score
  const getGlowStyle = () => {
    if (!animationComplete || score < 60) return {};

    const intensity = score >= 80 ? 20 : score >= 70 ? 15 : 10;
    return {
      filter: `drop-shadow(0 0 ${intensity}px ${colors.primary})`,
    };
  };

  return (
    <div className="flex flex-col items-center relative">
      {/* Confetti for high scores */}
      {showConfetti && size === 'large' && (
        <Confetti
          width={400}
          height={400}
          recycle={false}
          numberOfPieces={150}
          gravity={0.3}
          style={{ position: 'absolute', top: -50, left: '50%', transform: 'translateX(-50%)' }}
          colors={['#22c55e', '#3b82f6', '#f59e0b', '#8b5cf6', '#ec4899']}
        />
      )}

      <motion.div
        className="relative"
        style={{ width, height: width }}
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
      >
        <svg
          width={width}
          height={width}
          className="transform -rotate-90"
          style={getGlowStyle()}
        >
          {/* Background circle */}
          <circle
            cx={width / 2}
            cy={width / 2}
            r={radius}
            fill="none"
            stroke="#e5e7eb"
            strokeWidth={stroke}
          />

          {/* Progress circle with gradient */}
          <defs>
            <linearGradient id={`scoreGradient-${size}`} x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor={colors.primary} />
              <stop offset="100%" stopColor={colors.secondary || colors.primary} />
            </linearGradient>
          </defs>

          <motion.circle
            cx={width / 2}
            cy={width / 2}
            r={radius}
            fill="none"
            stroke={`url(#scoreGradient-${size})`}
            strokeWidth={stroke}
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={dashOffset}
            initial={{ strokeDashoffset: circumference }}
            animate={{ strokeDashoffset: dashOffset }}
            transition={{ duration: 1.5, ease: 'easeOut' }}
          />
        </svg>

        {/* Center content */}
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <motion.span
            className={`font-bold ${size === 'large' ? 'text-5xl' :
                size === 'medium' ? 'text-4xl' :
                  'text-2xl'
              }`}
            style={{ color: colors.primary }}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            {formatScore(animatedScore)}
          </motion.span>
          {(size === 'large' || size === 'medium') && (
            <motion.span
              className="text-sm text-slate-500 mt-1"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              out of 100
            </motion.span>
          )}
        </div>

        {/* Pulse effect for excellent scores */}
        {animationComplete && score >= 80 && size === 'large' && (
          <motion.div
            className="absolute inset-0 rounded-full"
            style={{
              border: `2px solid ${colors.primary}`,
              opacity: 0
            }}
            animate={{
              scale: [1, 1.1, 1],
              opacity: [0, 0.3, 0]
            }}
            transition={{
              repeat: Infinity,
              duration: 2,
              ease: 'easeInOut'
            }}
          />
        )}
      </motion.div>

      {size === 'large' && riskBand && (
        <motion.p
          className="mt-4 text-lg font-medium text-slate-600"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
        >
          Credit Reliability Score
        </motion.p>
      )}
    </div>
  );
};

export default ScoreGauge;
