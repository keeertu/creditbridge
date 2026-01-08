import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Input } from '../components/ui/input';
import { Checkbox } from '../components/ui/checkbox';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '../components/ui/select';
import {
    Shield, ArrowLeft, Download, Search, Filter,
    Users, TrendingUp, AlertTriangle, CheckCircle,
    ChevronUp, ChevronDown, MoreHorizontal
} from 'lucide-react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import { demoPersonas } from '../data/demoPersonas';
import RiskBadge from '../components/RiskBadge';

/**
 * LenderPortfolio - Dashboard for lenders to view and manage applicants
 * Features filtering, sorting, bulk actions, and data visualization
 */
const LenderPortfolio = () => {
    const navigate = useNavigate();
    const [searchQuery, setSearchQuery] = useState('');
    const [riskFilter, setRiskFilter] = useState('all');
    const [sortField, setSortField] = useState('score');
    const [sortDirection, setSortDirection] = useState('desc');
    const [selectedApplicants, setSelectedApplicants] = useState([]);

    // Generate applicant data from personas + additional mock data
    const applicants = useMemo(() => {
        const baseApplicants = demoPersonas.map(persona => ({
            id: persona.id,
            name: persona.name,
            photo: persona.photo,
            platform: persona.platforms[0],
            score: persona.expectedScore,
            riskBand: persona.expectedScore >= 75 ? 'Low Risk' : persona.expectedScore >= 50 ? 'Medium Risk' : 'High Risk',
            dateAssessed: new Date(Date.now() - Math.random() * 7 * 24 * 60 * 60 * 1000).toLocaleDateString(),
            monthlyIncome: persona.monthlyIncome,
            tenure: persona.metrics.tenure_months
        }));

        // Add more mock applicants
        const additionalApplicants = [
            { id: 'app-6', name: 'Alex Thompson', photo: 'https://i.pravatar.cc/150?img=8', platform: 'DoorDash', score: 61, riskBand: 'Medium Risk', dateAssessed: '01/05/2026', monthlyIncome: 2400, tenure: 8 },
            { id: 'app-7', name: 'Priya Sharma', photo: 'https://i.pravatar.cc/150?img=32', platform: 'Upwork', score: 79, riskBand: 'Low Risk', dateAssessed: '01/04/2026', monthlyIncome: 4200, tenure: 22 },
            { id: 'app-8', name: 'Marcus Johnson', photo: 'https://i.pravatar.cc/150?img=13', platform: 'Uber', score: 42, riskBand: 'High Risk', dateAssessed: '01/03/2026', monthlyIncome: 1800, tenure: 4 },
            { id: 'app-9', name: 'Emily Chen', photo: 'https://i.pravatar.cc/150?img=26', platform: 'Fiverr', score: 88, riskBand: 'Low Risk', dateAssessed: '01/02/2026', monthlyIncome: 5500, tenure: 28 },
            { id: 'app-10', name: 'David Okonkwo', photo: 'https://i.pravatar.cc/150?img=15', platform: 'TaskRabbit', score: 54, riskBand: 'Medium Risk', dateAssessed: '01/01/2026', monthlyIncome: 2100, tenure: 6 },
        ];

        return [...baseApplicants, ...additionalApplicants];
    }, []);

    // Calculate summary stats
    const summaryStats = useMemo(() => {
        const total = applicants.length;
        const avgScore = Math.round(applicants.reduce((sum, a) => sum + a.score, 0) / total);
        const riskCounts = {
            low: applicants.filter(a => a.riskBand === 'Low Risk').length,
            medium: applicants.filter(a => a.riskBand === 'Medium Risk').length,
            high: applicants.filter(a => a.riskBand === 'High Risk').length
        };
        return { total, avgScore, riskCounts };
    }, [applicants]);

    // Filter and sort applicants
    const filteredApplicants = useMemo(() => {
        let result = [...applicants];

        // Search filter
        if (searchQuery) {
            result = result.filter(a =>
                a.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                a.platform.toLowerCase().includes(searchQuery.toLowerCase())
            );
        }

        // Risk filter
        if (riskFilter !== 'all') {
            result = result.filter(a => a.riskBand.toLowerCase().includes(riskFilter));
        }

        // Sort
        result.sort((a, b) => {
            let comparison = 0;
            if (sortField === 'score') comparison = a.score - b.score;
            else if (sortField === 'name') comparison = a.name.localeCompare(b.name);
            else if (sortField === 'income') comparison = a.monthlyIncome - b.monthlyIncome;
            else if (sortField === 'tenure') comparison = a.tenure - b.tenure;

            return sortDirection === 'desc' ? -comparison : comparison;
        });

        return result;
    }, [applicants, searchQuery, riskFilter, sortField, sortDirection]);

    // Pie chart data
    const pieData = [
        { name: 'Low Risk', value: summaryStats.riskCounts.low, fill: '#22c55e' },
        { name: 'Medium Risk', value: summaryStats.riskCounts.medium, fill: '#f59e0b' },
        { name: 'High Risk', value: summaryStats.riskCounts.high, fill: '#ef4444' }
    ];

    const toggleSort = (field) => {
        if (sortField === field) {
            setSortDirection(prev => prev === 'asc' ? 'desc' : 'asc');
        } else {
            setSortField(field);
            setSortDirection('desc');
        }
    };

    const toggleSelectAll = () => {
        if (selectedApplicants.length === filteredApplicants.length) {
            setSelectedApplicants([]);
        } else {
            setSelectedApplicants(filteredApplicants.map(a => a.id));
        }
    };

    const toggleSelectOne = (id) => {
        setSelectedApplicants(prev =>
            prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]
        );
    };

    const handleBulkAction = (action) => {
        alert(`Demo: ${action} ${selectedApplicants.length} applicants`);
        setSelectedApplicants([]);
    };

    const exportToCSV = () => {
        const headers = ['Name', 'Platform', 'Score', 'Risk Band', 'Monthly Income', 'Tenure (months)', 'Date Assessed'];
        const rows = filteredApplicants.map(a => [
            a.name, a.platform, a.score, a.riskBand, a.monthlyIncome, a.tenure, a.dateAssessed
        ]);

        const csv = [headers, ...rows].map(row => row.join(',')).join('\n');
        const blob = new Blob([csv], { type: 'text/csv' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'creditbridge-applicants.csv';
        a.click();
    };

    const SortIcon = ({ field }) => {
        if (sortField !== field) return null;
        return sortDirection === 'desc' ?
            <ChevronDown className="w-4 h-4 inline ml-1" /> :
            <ChevronUp className="w-4 h-4 inline ml-1" />;
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex flex-col">
            {/* Header */}
            <header className="bg-white/80 backdrop-blur-sm border-b border-slate-200 sticky top-0 z-10">
                <div className="max-w-7xl mx-auto px-6 py-4">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-slate-900 rounded-lg flex items-center justify-center cursor-pointer" onClick={() => navigate('/')}>
                                <Shield className="w-6 h-6 text-white" />
                            </div>
                            <div>
                                <h1 className="text-xl font-bold text-slate-900">CreditBridge</h1>
                                <p className="text-xs text-slate-500">Lender Portal</p>
                            </div>
                        </div>
                        <Button variant="ghost" onClick={() => navigate(-1)} className="text-slate-500">
                            <ArrowLeft className="w-4 h-4 mr-2" />
                            Back
                        </Button>
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <main className="flex-1 max-w-7xl mx-auto px-6 py-8 w-full">
                {/* Summary Cards */}
                <div className="grid md:grid-cols-4 gap-6 mb-8">
                    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
                        <Card>
                            <CardContent className="p-6">
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                                        <Users className="w-6 h-6 text-blue-600" />
                                    </div>
                                    <div>
                                        <p className="text-2xl font-bold text-slate-900">{summaryStats.total}</p>
                                        <p className="text-sm text-slate-500">Total Applicants</p>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </motion.div>

                    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
                        <Card>
                            <CardContent className="p-6">
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                                        <TrendingUp className="w-6 h-6 text-green-600" />
                                    </div>
                                    <div>
                                        <p className="text-2xl font-bold text-slate-900">{summaryStats.avgScore}</p>
                                        <p className="text-sm text-slate-500">Average Score</p>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </motion.div>

                    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
                        <Card>
                            <CardContent className="p-6">
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 bg-emerald-100 rounded-xl flex items-center justify-center">
                                        <CheckCircle className="w-6 h-6 text-emerald-600" />
                                    </div>
                                    <div>
                                        <p className="text-2xl font-bold text-slate-900">{summaryStats.riskCounts.low}</p>
                                        <p className="text-sm text-slate-500">Low Risk</p>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </motion.div>

                    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
                        <Card className="overflow-hidden">
                            <CardContent className="p-4">
                                <div className="h-24">
                                    <ResponsiveContainer width="100%" height="100%">
                                        <PieChart>
                                            <Pie
                                                data={pieData}
                                                innerRadius={25}
                                                outerRadius={40}
                                                paddingAngle={2}
                                                dataKey="value"
                                            >
                                                {pieData.map((entry, index) => (
                                                    <Cell key={`cell-${index}`} fill={entry.fill} />
                                                ))}
                                            </Pie>
                                            <Tooltip />
                                        </PieChart>
                                    </ResponsiveContainer>
                                </div>
                                <p className="text-xs text-slate-500 text-center">Risk Distribution</p>
                            </CardContent>
                        </Card>
                    </motion.div>
                </div>

                {/* Filters and Actions */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    className="mb-6"
                >
                    <Card>
                        <CardContent className="p-4">
                            <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
                                <div className="flex flex-1 gap-4 w-full md:w-auto">
                                    <div className="relative flex-1">
                                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                                        <Input
                                            placeholder="Search by name or platform..."
                                            className="pl-10"
                                            value={searchQuery}
                                            onChange={(e) => setSearchQuery(e.target.value)}
                                        />
                                    </div>

                                    <Select value={riskFilter} onValueChange={setRiskFilter}>
                                        <SelectTrigger className="w-40">
                                            <Filter className="w-4 h-4 mr-2" />
                                            <SelectValue placeholder="Filter" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="all">All Risks</SelectItem>
                                            <SelectItem value="low">Low Risk</SelectItem>
                                            <SelectItem value="medium">Medium Risk</SelectItem>
                                            <SelectItem value="high">High Risk</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>

                                <div className="flex gap-2">
                                    {selectedApplicants.length > 0 && (
                                        <>
                                            <Button variant="outline" size="sm" className="text-green-600" onClick={() => handleBulkAction('Approved')}>
                                                <CheckCircle className="w-4 h-4 mr-1" />
                                                Approve ({selectedApplicants.length})
                                            </Button>
                                            <Button variant="outline" size="sm" className="text-red-600" onClick={() => handleBulkAction('Declined')}>
                                                <AlertTriangle className="w-4 h-4 mr-1" />
                                                Decline
                                            </Button>
                                        </>
                                    )}
                                    <Button variant="outline" size="sm" onClick={exportToCSV}>
                                        <Download className="w-4 h-4 mr-1" />
                                        Export CSV
                                    </Button>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </motion.div>

                {/* Applicants Table */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                >
                    <Card>
                        <CardContent className="p-0">
                            <div className="overflow-x-auto">
                                <table className="w-full">
                                    <thead className="bg-slate-50 border-b border-slate-200">
                                        <tr>
                                            <th className="p-4 text-left">
                                                <Checkbox
                                                    checked={selectedApplicants.length === filteredApplicants.length && filteredApplicants.length > 0}
                                                    onCheckedChange={toggleSelectAll}
                                                />
                                            </th>
                                            <th
                                                className="p-4 text-left text-sm font-medium text-slate-600 cursor-pointer hover:text-slate-900"
                                                onClick={() => toggleSort('name')}
                                            >
                                                Applicant <SortIcon field="name" />
                                            </th>
                                            <th className="p-4 text-left text-sm font-medium text-slate-600">Platform</th>
                                            <th
                                                className="p-4 text-left text-sm font-medium text-slate-600 cursor-pointer hover:text-slate-900"
                                                onClick={() => toggleSort('score')}
                                            >
                                                Score <SortIcon field="score" />
                                            </th>
                                            <th className="p-4 text-left text-sm font-medium text-slate-600">Risk Band</th>
                                            <th
                                                className="p-4 text-left text-sm font-medium text-slate-600 cursor-pointer hover:text-slate-900"
                                                onClick={() => toggleSort('income')}
                                            >
                                                Monthly Income <SortIcon field="income" />
                                            </th>
                                            <th
                                                className="p-4 text-left text-sm font-medium text-slate-600 cursor-pointer hover:text-slate-900"
                                                onClick={() => toggleSort('tenure')}
                                            >
                                                Tenure <SortIcon field="tenure" />
                                            </th>
                                            <th className="p-4 text-left text-sm font-medium text-slate-600">Date</th>
                                            <th className="p-4"></th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {filteredApplicants.map((applicant, index) => (
                                            <motion.tr
                                                key={applicant.id}
                                                initial={{ opacity: 0 }}
                                                animate={{ opacity: 1 }}
                                                transition={{ delay: 0.05 * index }}
                                                className="border-b border-slate-100 hover:bg-slate-50"
                                            >
                                                <td className="p-4">
                                                    <Checkbox
                                                        checked={selectedApplicants.includes(applicant.id)}
                                                        onCheckedChange={() => toggleSelectOne(applicant.id)}
                                                    />
                                                </td>
                                                <td className="p-4">
                                                    <div className="flex items-center gap-3">
                                                        <img
                                                            src={applicant.photo}
                                                            alt={applicant.name}
                                                            className="w-10 h-10 rounded-full"
                                                        />
                                                        <span className="font-medium text-slate-900">{applicant.name}</span>
                                                    </div>
                                                </td>
                                                <td className="p-4 text-slate-600">{applicant.platform}</td>
                                                <td className="p-4">
                                                    <span className={`font-bold ${applicant.score >= 75 ? 'text-green-600' :
                                                            applicant.score >= 50 ? 'text-amber-600' :
                                                                'text-red-600'
                                                        }`}>
                                                        {applicant.score}
                                                    </span>
                                                </td>
                                                <td className="p-4">
                                                    <RiskBadge riskBand={applicant.riskBand} />
                                                </td>
                                                <td className="p-4 text-slate-600">${applicant.monthlyIncome.toLocaleString()}</td>
                                                <td className="p-4 text-slate-600">{applicant.tenure} mo</td>
                                                <td className="p-4 text-slate-500 text-sm">{applicant.dateAssessed}</td>
                                                <td className="p-4">
                                                    <Button variant="ghost" size="icon">
                                                        <MoreHorizontal className="w-4 h-4" />
                                                    </Button>
                                                </td>
                                            </motion.tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>

                            {filteredApplicants.length === 0 && (
                                <div className="p-12 text-center text-slate-500">
                                    <Search className="w-12 h-12 mx-auto mb-4 opacity-50" />
                                    <p>No applicants match your search criteria</p>
                                </div>
                            )}
                        </CardContent>
                    </Card>
                </motion.div>

                {/* Demo Notice */}
                <div className="mt-6 text-center">
                    <p className="text-sm text-slate-500 bg-slate-100 inline-block px-4 py-2 rounded-full">
                        📊 Demo Mode: Displaying sample applicant data
                    </p>
                </div>
            </main>
        </div>
    );
};

export default LenderPortfolio;
