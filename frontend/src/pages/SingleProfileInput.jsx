import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../components/ui/card';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Shield, ArrowRight, LayoutGrid, ArrowLeft, RefreshCw } from 'lucide-react';
import { fetchCreditScore } from '../services/creditApi';

const SingleProfileInput = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        avg_daily_income: '',
        income_std_dev: '',
        active_days_ratio: '',
        max_income_gap: '',
        tenure_months: '',
        income_trend: '',
    });

    const handleChange = (e) => {
        const { id, value } = e.target;
        setFormData(prev => ({ ...prev, [id]: value }));
    };

    const isFormValid = Object.values(formData).every(val => val !== '' && !isNaN(val));

    const handleRunAssessment = async (e) => {
        e.preventDefault();
        if (!isFormValid) return;

        setLoading(true);
        try {
            const payload = {
                avg_daily_income: Number(formData.avg_daily_income),
                income_std_dev: Number(formData.income_std_dev),
                active_days_ratio: Number(formData.active_days_ratio),
                max_income_gap: parseInt(formData.max_income_gap, 10),
                tenure_months: parseInt(formData.tenure_months, 10),
                income_trend: Number(formData.income_trend),
            };

            // Hard validation guard
            const hasInvalid = Object.values(payload).some(v => Number.isNaN(v));
            if (hasInvalid) {
                alert("All fields must be valid numeric values.");
                setLoading(false);
                return;
            }

            const response = await fetchCreditScore(payload);
            navigate('/report', { state: { showReport: true, scoreData: response } });
        } catch (error) {
            console.error('Assessment error:', error.response?.data || error);
            alert('Failed to run assessment. Check console for details.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-slate-50 flex flex-col">
            {/* Header */}
            <header className="bg-white border-b border-slate-200">
                <div className="max-w-7xl mx-auto px-6 py-4">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-slate-900 rounded-lg flex items-center justify-center cursor-pointer" onClick={() => navigate('/')}>
                                <Shield className="w-6 h-6 text-white" />
                            </div>
                            <div>
                                <h1 className="text-xl font-bold text-slate-900">CreditBridge</h1>
                                <p className="text-xs text-slate-500">Alternative Credit Assessment</p>
                            </div>
                        </div>
                        <Button variant="ghost" onClick={() => navigate('/mode-selection')} className="text-slate-500">
                            <ArrowLeft className="w-4 h-4 mr-2" />
                            Back to Mode Selection
                        </Button>
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <main className="flex-1 max-w-7xl mx-auto px-6 py-12 w-full flex flex-col items-center justify-center">
                <div className="max-w-md w-full">
                    <Card className="border-slate-200 shadow-sm">
                        <CardHeader>
                            <CardTitle className="text-xl">Single Profile Analysis</CardTitle>
                            <CardDescription>Enter exact applicant features for the ML scoring engine.</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <form onSubmit={handleRunAssessment} className="space-y-4">
                                <div className="space-y-2">
                                    <Label htmlFor="avg_daily_income">Average Daily Income ($)</Label>
                                    <Input id="avg_daily_income" type="number" step="0.01" placeholder="e.g. 150.50" value={formData.avg_daily_income} onChange={handleChange} required />
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="income_std_dev">Income Variability (Std Dev)</Label>
                                    <Input id="income_std_dev" type="number" step="0.01" placeholder="e.g. 45.20" value={formData.income_std_dev} onChange={handleChange} required />
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <Label htmlFor="active_days_ratio">Active Days Ratio (0-1)</Label>
                                        <Input id="active_days_ratio" type="number" step="0.01" min="0" max="1" placeholder="0.85" value={formData.active_days_ratio} onChange={handleChange} required />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="max_income_gap">Max Income Gap (Days)</Label>
                                        <Input id="max_income_gap" type="number" placeholder="5" value={formData.max_income_gap} onChange={handleChange} required />
                                    </div>
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <Label htmlFor="tenure_months">Work Tenure (Months)</Label>
                                        <Input id="tenure_months" type="number" placeholder="24" value={formData.tenure_months} onChange={handleChange} required />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="income_trend">Income Trend</Label>
                                        <Input id="income_trend" type="number" step="0.01" placeholder="e.g. 0.05" value={formData.income_trend} onChange={handleChange} required />
                                    </div>
                                </div>

                                <div className="pt-4 space-y-4">
                                    <Button
                                        type="submit"
                                        className="w-full bg-slate-900 hover:bg-slate-800 h-11 text-base"
                                        disabled={!isFormValid || loading}
                                    >
                                        {loading ? (
                                            <><RefreshCw className="w-4 h-4 mr-2 animate-spin" /> Analyzing...</>
                                        ) : (
                                            <><Shield className="w-4 h-4 mr-2" /> Run Credit Assessment</>
                                        )}
                                    </Button>

                                    <div className="relative">
                                        <div className="absolute inset-0 flex items-center">
                                            <span className="w-full border-t border-slate-200" />
                                        </div>
                                        <div className="relative flex justify-center text-xs uppercase">
                                            <span className="bg-white px-2 text-slate-500">Or</span>
                                        </div>
                                    </div>

                                    <Button
                                        type="button"
                                        variant="outline"
                                        className="w-full text-slate-600"
                                        onClick={() => navigate('/bulk')}
                                    >
                                        <LayoutGrid className="w-4 h-4 mr-2" />
                                        Switch to Bulk Dataset Analysis
                                    </Button>
                                </div>
                            </form>
                        </CardContent>
                    </Card>
                    <p className="text-center text-xs text-slate-400 mt-6">
                        CreditBridge ML Engine v1.0 • Schema Validated
                    </p>
                </div>
            </main>
        </div>
    );
};

export default SingleProfileInput;
