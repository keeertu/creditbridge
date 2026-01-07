import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { Card, CardContent } from '../components/ui/card';
import { Shield, PlayCircle } from 'lucide-react';

const Landing = () => {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen bg-slate-50 flex flex-col">
            {/* Header */}
            <header className="bg-white border-b border-slate-200">
                <div className="max-w-7xl mx-auto px-6 py-4">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-slate-900 rounded-lg flex items-center justify-center">
                            <Shield className="w-6 h-6 text-white" />
                        </div>
                        <div>
                            <h1 className="text-xl font-bold text-slate-900">CreditBridge</h1>
                            <p className="text-xs text-slate-500">Alternative Credit Assessment</p>
                        </div>
                    </div>
                </div>
            </header>

            <main className="flex-1 max-w-7xl mx-auto px-6 py-8 w-full flex flex-col items-center justify-center min-h-[60vh]">
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
                            onClick={() => navigate('/mode-selection')}
                            className="w-full bg-slate-900 hover:bg-slate-800 text-white py-6 text-base font-medium"
                        >
                            <PlayCircle className="w-5 h-5 mr-2" />
                            Evaluate Profile
                        </Button>
                        <p className="text-xs text-slate-400 mt-4">
                            Using sample gig worker profile data
                        </p>
                    </CardContent>
                </Card>
            </main>
        </div>
    );
};

export default Landing;
