import React, { useEffect, useState } from 'react';
import { getRiskColor } from '../utils/riskColors';
import { formatScore } from '../utils/scoreMapping';

const ScoreGauge = ({ score, riskBand, size = 'large' }) => {
  const [animatedScore, setAnimatedScore] = useState(0);
  const colors = getRiskColor(score);
  
  // Dimensions based on size
  const dimensions = size === 'large' 
    ? { width: 280, stroke: 16, radius: 120 }
    : { width: 140, stroke: 8, radius: 58 };
  
  const { width, stroke, radius } = dimensions;
  const circumference = 2 * Math.PI * radius;
  const progress = (animatedScore / 100) * circumference;
  const dashOffset = circumference - progress;

  // Animate score on mount/change
  useEffect(() => {
    const duration = 1200;
    const startTime = Date.now();
    const startScore = 0;
    
    const animate = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);
      
      // Easing function for smooth animation
      const easeOut = 1 - Math.pow(1 - progress, 3);
      const currentScore = startScore + (score - startScore) * easeOut;
      
      setAnimatedScore(currentScore);
      
      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };
    
    animate();
  }, [score]);

  return (
    <div className="flex flex-col items-center">
      <div className="relative" style={{ width, height: width }}>
        <svg
          width={width}
          height={width}
          className="transform -rotate-90"
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
          {/* Progress circle */}
          <circle
            cx={width / 2}
            cy={width / 2}
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
        
        {/* Center content */}
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span 
            className={`font-bold ${size === 'large' ? 'text-5xl' : 'text-2xl'}`}
            style={{ color: colors.primary }}
          >
            {formatScore(animatedScore)}
          </span>
          {size === 'large' && (
            <span className="text-sm text-slate-500 mt-1">out of 100</span>
          )}
        </div>
      </div>
      
      {size === 'large' && riskBand && (
        <p className="mt-4 text-lg font-medium text-slate-600">
          Credit Reliability Score
        </p>
      )}
    </div>
  );
};

export default ScoreGauge;
