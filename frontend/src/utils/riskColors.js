// Risk color utilities for CreditBridge dashboard
// Bank-grade, muted enterprise color palette
// Colors reinforce risk classification only - no flashy or neon tones

/**
 * Centralized risk color map
 * Uses desaturated, institutional colors suitable for financial dashboards
 */
const RISK_COLORS = {
  low: {
    ring: '#2d8a6e',           // Muted forest green - desaturated
    background: '#f0f7f4',     // Very subtle green tint
    border: '#a3d4c2',         // Soft sage border
    text: '#1a5742',           // Deep institutional green
    accent: '#e6f2ed'          // Lighter accent for hover states
  },
  medium: {
    ring: '#b8860b',           // Dark goldenrod - muted amber
    background: '#faf8f3',     // Very subtle warm tint
    border: '#dac896',         // Soft tan border
    text: '#7a5c1a',           // Deep bronze text
    accent: '#f5f0e3'          // Lighter accent for hover states
  },
  high: {
    ring: '#a84040',           // Muted brick red - desaturated
    background: '#faf5f5',     // Very subtle red tint
    border: '#d4a5a5',         // Soft rose border
    text: '#6b2d2d',           // Deep burgundy text
    accent: '#f5e8e8'          // Lighter accent for hover states
  }
};

/**
 * Get risk color palette based on numeric score
 * @param {number} score - Credit score (0-100)
 * @returns {Object} Color palette object
 */
export const getRiskColor = (score) => {
  if (score >= 75) {
    return {
      primary: RISK_COLORS.low.ring,
      secondary: RISK_COLORS.low.background,
      border: RISK_COLORS.low.border,
      text: RISK_COLORS.low.text,
      accent: RISK_COLORS.low.accent
    };
  } else if (score >= 50) {
    return {
      primary: RISK_COLORS.medium.ring,
      secondary: RISK_COLORS.medium.background,
      border: RISK_COLORS.medium.border,
      text: RISK_COLORS.medium.text,
      accent: RISK_COLORS.medium.accent
    };
  } else {
    return {
      primary: RISK_COLORS.high.ring,
      secondary: RISK_COLORS.high.background,
      border: RISK_COLORS.high.border,
      text: RISK_COLORS.high.text,
      accent: RISK_COLORS.high.accent
    };
  }
};

/**
 * Get formatted risk band label
 */
export const getRiskBandLabel = (riskBand) => {
  const labels = {
    'Low Risk': 'LOW RISK',
    'Medium Risk': 'MEDIUM RISK',
    'High Risk': 'HIGH RISK'
  };
  return labels[riskBand] || riskBand?.toUpperCase() || 'UNKNOWN';
};

/**
 * Get risk color palette based on risk band string
 */
export const getRiskBandColor = (riskBand) => {
  switch (riskBand) {
    case 'Low Risk':
      return getRiskColor(80);
    case 'Medium Risk':
      return getRiskColor(60);
    case 'High Risk':
      return getRiskColor(30);
    default:
      return getRiskColor(50);
  }
};

/**
 * Export raw color map for advanced usage
 */
export { RISK_COLORS };
