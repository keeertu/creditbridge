import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { User, Users, ArrowRight, Shield, ArrowLeft } from 'lucide-react';

const ModeSelection = () => {
    const navigate = useNavigate();

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
                        <Button variant="ghost" onClick={() => navigate('/')} className="text-slate-500">
                            <ArrowLeft className="w-4 h-4 mr-2" />
                            Back
                        </Button>
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <main className="flex-1 max-w-7xl mx-auto px-6 py-12 w-full flex flex-col items-center justify-center">
                <div className="text-center mb-12">
                    <h2 className="text-3xl font-bold text-slate-900 mb-4">Select Assessment Mode</h2>
                    <p className="text-slate-500 max-w-2xl mx-auto">
                        Choose how you would like to evaluate credit reliability. You can assess an individual gig worker profile or process a bulk dataset.
                    </p>
                </div>

                <div className="grid md:grid-cols-2 gap-8 w-full max-w-4xl">
                    {/* Single Profile Option */}
                    <Card className="hover:shadow-lg transition-shadow cursor-pointer border-slate-200" onClick={() => navigate('/single-input')}>
                        <CardContent className="p-8 flex flex-col h-full items-center text-center">
                            <div className="w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center mb-6">
                                <User className="w-8 h-8 text-blue-600" />
                            </div>
                            <h3 className="text-xl font-bold text-slate-900 mb-2">Single Applicant Analysis</h3>
                            <p className="text-slate-500 mb-8 flex-1">
                                Evaluate a single applicant using the detailed interactive dashboard. Best for individual case reviews.
                            </p>
                            <Button className="w-full" onClick={(e) => { e.stopPropagation(); navigate('/single-input'); }}>
                                Start Single Analysis
                                <ArrowRight className="w-4 h-4 ml-2" />
                            </Button>
                        </CardContent>
                    </Card>

                    {/* Bulk Analysis Option */}
                    <Card className="hover:shadow-lg transition-shadow cursor-pointer border-slate-200" onClick={() => navigate('/bulk')}>
                        <CardContent className="p-8 flex flex-col h-full items-center text-center">
                            <div className="w-16 h-16 bg-purple-50 rounded-full flex items-center justify-center mb-6">
                                <Users className="w-8 h-8 text-purple-600" />
                            </div>
                            <h3 className="text-xl font-bold text-slate-900 mb-2">Bulk Dataset Analysis</h3>
                            <p className="text-slate-500 mb-8 flex-1">
                                Upload a CSV or Excel file to process multiple profiles at once. Ideal for batch processing and portfolio assessment.
                            </p>
                            <Button className="w-full bg-purple-600 hover:bg-purple-700" onClick={(e) => { e.stopPropagation(); navigate('/bulk'); }}>
                                Start Bulk Analysis
                                <ArrowRight className="w-4 h-4 ml-2" />
                            </Button>
                        </CardContent>
                    </Card>
                </div>
            </main>
        </div>
    );
};

export default ModeSelection;
