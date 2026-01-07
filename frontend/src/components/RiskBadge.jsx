import React from 'react';
import { getRiskBandLabel, getRiskBandColor } from '../utils/riskColors';

const RiskBadge = ({ riskBand }) => {
  const label = getRiskBandLabel(riskBand);
  const colors = getRiskBandColor(riskBand);

  return (
    <div
      className="inline-flex items-center px-4 py-2 rounded-full font-semibold text-sm tracking-wide border-2"
      style={{
        backgroundColor: colors.secondary,
        borderColor: colors.border,
        color: colors.text
      }}
    >
      <span
        className="w-2.5 h-2.5 rounded-full mr-2"
        style={{ backgroundColor: colors.primary }}
      />
      {label}
    </div>
  );
};

export default RiskBadge;
