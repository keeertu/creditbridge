import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../components/ui/table';
import { Shield, Upload, FileSpreadsheet, FileText, CheckCircle, ArrowLeft, RefreshCw, AlertCircle } from 'lucide-react';
import { uploadBulkData, exportXLS } from '../services/creditApi';

const BulkAnalysis = () => {
    const navigate = useNavigate();
    const [file, setFile] = useState(null);
    const [results, setResults] = useState([]);
    const [status, setStatus] = useState('idle'); // idle, loading, ready, error
    const [error, setError] = useState(null);

    const handleFileChange = async (e) => {
        const selectedFile = e.target.files[0];
        if (!selectedFile) return;

        setFile(selectedFile);
        setStatus('loading');
        setError(null);

        try {
            const data = await uploadBulkData(selectedFile);
            setResults(data.results);
            setStatus('ready');
        } catch (err) {
            console.error('Bulk upload failed:', err);
            setError('Failed to process file. Please ensure it follows the required schema.');
            setStatus('error');
        }
    };

    const handleDownloadXLS = async () => {
        if (results.length === 0) return;
        setStatus('loading');
        try {
            const exportData = results.map(r => ({
                applicant_id: r.applicant_id,
                credit_reliability_score: r.credit_reliability_score,
                risk_band: r.risk_band,
                key_reasons: r.key_reasons
            }));
            await exportXLS(exportData);
            setStatus('ready');
        } catch (err) {
            console.error('XLS Export failed:', err);
            alert('Failed to generate XLS report.');
            setStatus('ready');
        }
    };

    const getRiskBadgeColor = (band) => {
        switch (band) {
            case 'Low Risk': return 'bg-emerald-100 text-emerald-800 border-emerald-200';
            case 'Medium Risk': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
            case 'High Risk': return 'bg-red-100 text-red-800 border-red-200';
            default: return 'bg-slate-100 text-slate-800';
        }
    };

    return (
        <div className="min-h-screen bg-slate-50 flex flex-col">
            {/* Header */}
            <header className="bg-white border-b border-slate-200 sticky top-0 z-10">
                <div className="max-w-7xl mx-auto px-6 py-4">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-slate-900 rounded-lg flex items-center justify-center cursor-pointer" onClick={() => navigate('/')}>
                                <Shield className="w-6 h-6 text-white" />
                            </div>
                            <div>
                                <h1 className="text-xl font-bold text-slate-900">CreditBridge</h1>
                                <p className="text-xs text-slate-500">Bulk Assessment Module</p>
                            </div>
                        </div>
                        <Button variant="ghost" onClick={() => navigate('/')} className="text-slate-500">
                            <ArrowLeft className="w-4 h-4 mr-2" />
                            Back to Mode Selection
                        </Button>
                    </div>
                </div>
            </header>

            <main className="flex-1 max-w-7xl mx-auto px-6 py-8 w-full">

                {/* Loading State */}
                {status === 'loading' && (
                    <div className="flex flex-col items-center justify-center min-h-[50vh] space-y-4">
                        <RefreshCw className="w-12 h-12 text-slate-400 animate-spin" />
                        <p className="text-slate-500 font-medium text-lg">Processing dataset...</p>
                    </div>
                )}

                {/* Error State */}
                {status === 'error' && (
                    <div className="max-w-xl mx-auto mt-12">
                        <Card className="border-red-200 bg-red-50">
                            <CardContent className="p-8 text-center flex flex-col items-center">
                                <AlertCircle className="w-12 h-12 text-red-500 mb-4" />
                                <h3 className="text-lg font-bold text-red-900 mb-2">Upload Failed</h3>
                                <p className="text-red-700 mb-6">{error}</p>
                                <Button className="bg-red-600 hover:bg-red-700 text-white" onClick={() => setStatus('idle')}>
                                    Try Again
                                </Button>
                            </CardContent>
                        </Card>
                    </div>
                )}

                {/* State 1: Upload Section */}
                {status === 'idle' && (
                    <div className="max-w-xl mx-auto mt-12">
                        <Card>
                            <CardHeader>
                                <CardTitle>Upload Dataset</CardTitle>
                                <CardDescription>Upload your applicant data for batch processing (CSV or XLSX).</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="border-2 border-dashed border-slate-300 rounded-lg p-12 text-center hover:bg-slate-50 transition-colors cursor-pointer relative">
                                    <input
                                        type="file"
                                        accept=".csv,.xlsx"
                                        onChange={handleFileChange}
                                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                                    />
                                    <div className="flex flex-col items-center">
                                        <div className="w-12 h-12 bg-slate-100 rounded-full flex items-center justify-center mb-4">
                                            <Upload className="w-6 h-6 text-slate-600" />
                                        </div>
                                        <h3 className="text-lg font-medium text-slate-900 mb-1">Click to upload or drag and drop</h3>
                                        <p className="text-sm text-slate-500 mb-4">CSV or Excel files only</p>
                                        <Button variant="outline" className="pointer-events-none">Select File</Button>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                )}

                {/* State 2: Report & Download */}
                {status === 'ready' && (
                    <div className="space-y-6">
                        {/* Summary Panel */}
                        <Card>
                            <CardContent className="p-6 flex items-center justify-between">
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                                        <CheckCircle className="w-6 h-6 text-green-600" />
                                    </div>
                                    <div>
                                        <h2 className="text-lg font-semibold text-slate-900">Analysis Complete</h2>
                                        <p className="text-slate-500 text-sm">Processed {results.length} records from <span className="font-medium text-slate-700">{file?.name}</span></p>
                                    </div>
                                </div>
                                <div className="flex gap-3">
                                    <Button variant="outline" onClick={() => setStatus('idle')}>
                                        Upload New File
                                    </Button>
                                    <Button className="gap-2 bg-slate-900 hover:bg-slate-800" onClick={handleDownloadXLS}>
                                        <FileSpreadsheet className="w-4 h-4" />
                                        Download XLS Report
                                    </Button>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Report Table */}
                        <Card>
                            <CardHeader className="flex flex-row items-center justify-between">
                                <div>
                                    <CardTitle>Assessment Report</CardTitle>
                                    <CardDescription>Detailed breakdown of credit reliability scores.</CardDescription>
                                </div>
                            </CardHeader>
                            <CardContent>
                                <div className="rounded-md border">
                                    <Table>
                                        <TableHeader>
                                            <TableRow>
                                                <TableHead>Applicant ID</TableHead>
                                                <TableHead>Credit Score</TableHead>
                                                <TableHead>Risk Band</TableHead>
                                                <TableHead>Key Factors</TableHead>
                                            </TableRow>
                                        </TableHeader>
                                        <TableBody>
                                            {results.map((row, idx) => (
                                                <TableRow key={idx}>
                                                    <TableCell className="font-medium">{row.applicant_id}</TableCell>
                                                    <TableCell>
                                                        <span className="font-semibold text-slate-900">{row.credit_reliability_score}</span>
                                                    </TableCell>
                                                    <TableCell>
                                                        <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getRiskBadgeColor(row.risk_band)}`}>
                                                            {row.risk_band}
                                                        </span>
                                                    </TableCell>
                                                    <TableCell className="text-slate-500 text-sm max-w-xs truncate">
                                                        {row.key_reasons.join(', ')}
                                                    </TableCell>
                                                </TableRow>
                                            ))}
                                        </TableBody>
                                    </Table>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                )}
            </main>
        </div>
    );
};

export default BulkAnalysis;
