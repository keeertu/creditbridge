import React from 'react';
import { AlertCircle, TrendingUp } from 'lucide-react';

/**
 * KeyInsights Component
 * 
 * Shows key factors (reasons) and optionally improvement suggestions.
 * Suggestions are applicant-facing content and should be hidden in lender view.
 */
const KeyInsights = ({ reasons = [], suggestions = [], showSuggestions = true }) => {
  return (
    <div className={`grid gap-6 ${showSuggestions ? 'md:grid-cols-2' : 'md:grid-cols-1 max-w-2xl'}`}>
      {/* Key Factors - shown to both roles */}
      <div className="bg-white rounded-xl border border-slate-200 p-5">
        <h3 className="flex items-center gap-2 font-semibold text-slate-800 mb-4">
          <AlertCircle className="w-5 h-5 text-amber-600" />
          Key Factors
        </h3>
        <ul className="space-y-3">
          {reasons.map((reason, idx) => (
            <li key={idx} className="flex items-start gap-3">
              <span className="w-6 h-6 rounded-full bg-amber-50 text-amber-700 flex items-center justify-center text-xs font-medium flex-shrink-0 mt-0.5">
                {idx + 1}
              </span>
              <span className="text-slate-600">{reason}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Suggestions - APPLICANT ONLY (contains direct-address language) */}
      {showSuggestions && (
        <div className="bg-white rounded-xl border border-slate-200 p-5">
          <h3 className="flex items-center gap-2 font-semibold text-slate-800 mb-4">
            <TrendingUp className="w-5 h-5 text-emerald-600" />
            Improvement Suggestions
          </h3>
          <ul className="space-y-3">
            {suggestions.map((suggestion, idx) => (
              <li key={idx} className="flex items-start gap-3">
                <span className="w-6 h-6 rounded-full bg-emerald-50 text-emerald-700 flex items-center justify-center text-xs font-medium flex-shrink-0 mt-0.5">
                  {idx + 1}
                </span>
                <span className="text-slate-600">{suggestion}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default KeyInsights;
