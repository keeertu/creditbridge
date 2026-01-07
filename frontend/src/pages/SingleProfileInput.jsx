import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../components/ui/card';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Shield, ArrowRight, LayoutGrid, ArrowLeft } from 'lucide-react';

const SingleProfileInput = () => {
    const navigate = useNavigate();

    const handleRunAssessment = () => {
        navigate('/report', { state: { showReport: true } });
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
                            <CardDescription>Enter applicant details to generate a credit reliability report.</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            <div className="space-y-2">
                                <Label htmlFor="applicant-id">Applicant ID</Label>
                                <Input id="applicant-id" placeholder="e.g. APP-2024-001" defaultValue="APP-2024-X82" />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="income">Monthly Income ($)</Label>
                                <Input id="income" type="number" placeholder="0.00" />
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="tenure">Tenure (Months)</Label>
                                    <Input id="tenure" type="number" placeholder="12" />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="consistency">Consistency Score</Label>
                                    <Input id="consistency" placeholder="0.0 - 1.0" />
                                </div>
                            </div>

                            <div className="pt-4 space-y-4">
                                <Button
                                    className="w-full bg-slate-900 hover:bg-slate-800 h-11 text-base"
                                    onClick={handleRunAssessment}
                                >
                                    Run Credit Assessment
                                    <ArrowRight className="w-4 h-4 ml-2" />
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
                                    variant="outline"
                                    className="w-full text-slate-600"
                                    onClick={() => navigate('/bulk')}
                                >
                                    <LayoutGrid className="w-4 h-4 mr-2" />
                                    Switch to Bulk Dataset Analysis
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                    <p className="text-center text-xs text-slate-400 mt-6">
                        CreditBridge Artificial Intelligence Model v2.1
                    </p>
                </div>
            </main>
        </div>
    );
};

export default SingleProfileInput;
