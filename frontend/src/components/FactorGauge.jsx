import React, { useEffect, useState } from 'react';
import { getRiskColor } from '../utils/riskColors';

const FactorGauge = ({ factor }) => {
  const [animatedScore, setAnimatedScore] = useState(0);
  const { label, score, description } = factor;
  const colors = getRiskColor(score);
  
  const size = 100;
  const stroke = 8;
  const radius = 38;
  const circumference = 2 * Math.PI * radius;
  const progress = (animatedScore / 100) * circumference;
  const dashOffset = circumference - progress;

  useEffect(() => {
    const duration = 1000;
    const startTime = Date.now();
    const delay = Math.random() * 300; // Stagger animations
    
    const timeout = setTimeout(() => {
      const animate = () => {
        const elapsed = Date.now() - startTime - delay;
        const progress = Math.min(Math.max(elapsed / duration, 0), 1);
        const easeOut = 1 - Math.pow(1 - progress, 3);
        const currentScore = score * easeOut;
        
        setAnimatedScore(currentScore);
        
        if (progress < 1) {
          requestAnimationFrame(animate);
        }
      };
      animate();
    }, delay);
    
    return () => clearTimeout(timeout);
  }, [score]);

  return (
    <div className="bg-white rounded-xl border border-slate-200 p-5 hover:shadow-md transition-shadow duration-200">
      <div className="flex items-center gap-4">
        <div className="relative" style={{ width: size, height: size }}>
          <svg width={size} height={size} className="transform -rotate-90">
            <circle
              cx={size / 2}
              cy={size / 2}
              r={radius}
              fill="none"
              stroke="#e5e7eb"
              strokeWidth={stroke}
            />
            <circle
              cx={size / 2}
              cy={size / 2}
              r={radius}
              fill="none"
              stroke={colors.primary}
              strokeWidth={stroke}
              strokeLinecap="round"
              strokeDasharray={circumference}
              strokeDashoffset={dashOffset}
              className="transition-all duration-300"
            />
          </svg>
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-lg font-semibold" style={{ color: colors.primary }}>
              {Math.round(animatedScore)}
            </span>
          </div>
        </div>
        
        <div className="flex-1">
          <h3 className="font-semibold text-slate-800">{label}</h3>
          <p className="text-sm text-slate-500 mt-0.5">{description}</p>
        </div>
      </div>
    </div>
  );
};

export default FactorGauge;
