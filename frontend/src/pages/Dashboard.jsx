import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { Card, CardContent } from '../components/ui/card';
import ScoreGauge from '../components/ScoreGauge';
import FactorGauge from '../components/FactorGauge';
import RiskBadge from '../components/RiskBadge';
import ExplanationCard from '../components/ExplanationCard';
import KeyInsights from '../components/KeyInsights';
import RoleToggle from '../components/RoleToggle';
import { useRole } from '../context/RoleContext';
import { fetchCreditScore } from '../services/creditApi';
import { deriveFactorScores } from '../utils/scoreMapping';
import { samplePayload } from '../data/mockData';
import { PlayCircle, RefreshCw, Shield, Activity } from 'lucide-react';

const Dashboard = () => {
  const [scoreData, setScoreData] = useState(null);
  const [loading, setLoading] = useState(false);
  const location = useLocation();
  const [evaluated, setEvaluated] = useState(location.state?.showReport || false);
  const { isLender } = useRole();

  // If directly navigated with showReport, trigger evaluation
  // eslint-disable-next-line react-hooks/exhaustive-deps
  React.useEffect(() => {
    if (location.state?.showReport && !scoreData) {
      handleEvaluate();
    }
  }, [location.state]);

  const handleEvaluate = async () => {
    setLoading(true);
    try {
      const data = await fetchCreditScore(samplePayload);
      setScoreData(data);
      setEvaluated(true);
    } catch (error) {
      console.error('Evaluation failed:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setScoreData(null);
    setEvaluated(false);
  };

  // Derive factor scores from main score
  const factorScores = scoreData
    ? deriveFactorScores(
      scoreData.score.credit_reliability_score,
      scoreData.score.key_reasons
    )
    : null;

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <header className="bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-slate-900 rounded-lg flex items-center justify-center">
                <Shield className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-slate-900">CreditBridge</h1>
                <p className="text-xs text-slate-500">Alternative Credit Assessment</p>
              </div>
            </div>
            <div className="flex items-center gap-2 text-sm text-slate-500">
              <Activity className="w-4 h-4" />
              <span className="mx-2 text-slate-300">|</span>
              <RoleToggle />
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-8">
        {!evaluated ? (
          /* Initial State - Evaluate Button */
          <div className="flex flex-col items-center justify-center min-h-[60vh]">
            <Card className="max-w-md w-full bg-white border-slate-200 shadow-sm">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Shield className="w-8 h-8 text-slate-600" />
                </div>
                <h2 className="text-2xl font-bold text-slate-900 mb-2">
                  Credit Assessment
                </h2>
                <p className="text-slate-500 mb-8">
                  Evaluate a non-traditional income profile using our alternative credit scoring system.
                </p>
                <Button
                  onClick={handleEvaluate}
                  disabled={loading}
                  className="w-full bg-slate-900 hover:bg-slate-800 text-white py-6 text-base font-medium"
                >
                  {loading ? (
                    <>
                      <RefreshCw className="w-5 h-5 mr-2 animate-spin" />
                      Evaluating...
                    </>
                  ) : (
                    <>
                      <PlayCircle className="w-5 h-5 mr-2" />
                      Evaluate Profile
                    </>
                  )}
                </Button>
                <p className="text-xs text-slate-400 mt-4">
                  Using sample gig worker profile data
                </p>
              </CardContent>
            </Card>
          </div>
        ) : (
          /* Results Dashboard */
          <div className="space-y-8">
            {/* Top Section - Score & Badge */}
            <div className="flex flex-col items-center">
              <Card className="bg-white border-slate-200 shadow-sm w-full max-w-2xl">
                <CardContent className="p-8">
                  <div className="flex flex-col items-center">
                    <ScoreGauge
                      score={scoreData.score.credit_reliability_score}
                      riskBand={scoreData.score.risk_band}
                      size="large"
                    />
                    <div className="mt-6">
                      <RiskBadge riskBand={scoreData.score.risk_band} />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Supporting Factors */}
            <section>
              <h2 className="text-lg font-semibold text-slate-800 mb-4">Supporting Factors</h2>
              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {factorScores && Object.values(factorScores).map((factor, idx) => (
                  <FactorGauge key={idx} factor={factor} />
                ))}
              </div>
            </section>

            {/* Key Insights - Hide suggestions for lenders (applicant-facing content) */}
            <section>
              <h2 className="text-lg font-semibold text-slate-800 mb-4">Analysis</h2>
              <KeyInsights
                reasons={scoreData.score.key_reasons}
                suggestions={scoreData.score.suggestions}
                showSuggestions={!isLender}
              />
            </section>

            {/* Explanations - STRICT ROLE SEPARATION */}
            <section>
              <h2 className="text-lg font-semibold text-slate-800 mb-4">
                {isLender ? 'Risk Assessment' : 'Your Summary'}
              </h2>
              <div className="max-w-2xl">
                {isLender ? (
                  /* LENDER VIEW: Lender explanation ONLY */
                  <ExplanationCard
                    type="lender"
                    content={scoreData.explanations.lender}
                  />
                ) : (
                  /* APPLICANT VIEW: User explanation ONLY */
                  <ExplanationCard
                    type="user"
                    content={scoreData.explanations.user}
                  />
                )}
              </div>
            </section>

            {/* Reset Button */}
            <div className="flex justify-center pt-4">
              <Button
                onClick={handleReset}
                variant="outline"
                className="border-slate-300 text-slate-600 hover:bg-slate-100"
              >
                <RefreshCw className="w-4 h-4 mr-2" />
                Evaluate Another Profile
              </Button>
            </div>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="mt-auto border-t border-slate-200 bg-white">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between text-sm text-slate-500">
            <span>CreditBridge Assessment System</span>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Dashboard;
