import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../components/ui/card';
import { Switch } from '../components/ui/switch';
import {
    Shield, ArrowLeft, Lock, Eye, Trash2, Download,
    CheckCircle, Globe, Server, FileText, Bell, User,
    AlertTriangle
} from 'lucide-react';

/**
 * PrivacyDashboard - User data control and security features page
 * Builds trust by showing security measures and data control options
 */
const PrivacyDashboard = () => {
    const navigate = useNavigate();
    const [permissions, setPermissions] = useState({
        shareWithLenders: true,
        anonymizedAnalytics: true,
        platformDataAccess: true,
        emailNotifications: true,
        marketingComms: false
    });
    const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

    const securityFeatures = [
        {
            icon: Lock,
            title: 'End-to-End Encryption',
            description: 'All data is encrypted in transit and at rest using AES-256',
            color: 'bg-blue-500'
        },
        {
            icon: CheckCircle,
            title: 'GDPR Compliant',
            description: 'Full compliance with European data protection regulations',
            color: 'bg-green-500'
        },
        {
            icon: Trash2,
            title: 'Delete Data Anytime',
            description: 'Request complete deletion of your data with one click',
            color: 'bg-red-500'
        },
        {
            icon: User,
            title: 'You Control Sharing',
            description: 'Choose exactly what data is shared with lenders',
            color: 'bg-purple-500'
        },
        {
            icon: Server,
            title: 'Bank-Level Security',
            description: 'SOC 2 Type II certified infrastructure',
            color: 'bg-indigo-500'
        },
        {
            icon: FileText,
            title: 'Transparent Usage',
            description: 'Clear documentation of how your data is used',
            color: 'bg-teal-500'
        }
    ];

    const handleToggle = (key) => {
        setPermissions(prev => ({
            ...prev,
            [key]: !prev[key]
        }));
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
                                <p className="text-xs text-slate-500">Privacy & Security</p>
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
            <main className="flex-1 max-w-5xl mx-auto px-6 py-12 w-full">
                {/* Hero Section */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center mb-12"
                >
                    <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
                        <Lock className="w-10 h-10 text-white" />
                    </div>
                    <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
                        Your Data, Your Control
                    </h1>
                    <p className="text-lg text-slate-600 max-w-2xl mx-auto">
                        At CreditBridge, we believe you should own your financial data.
                        Control exactly what's shared and with whom.
                    </p>
                </motion.div>

                {/* Security Features Grid */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="mb-12"
                >
                    <h2 className="text-xl font-semibold text-slate-900 mb-6">Security Features</h2>
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {securityFeatures.map((feature, index) => (
                            <motion.div
                                key={feature.title}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.1 + index * 0.05 }}
                            >
                                <Card className="h-full hover:shadow-md transition-shadow">
                                    <CardContent className="p-6">
                                        <div className={`w-12 h-12 ${feature.color} rounded-xl flex items-center justify-center mb-4`}>
                                            <feature.icon className="w-6 h-6 text-white" />
                                        </div>
                                        <h3 className="font-semibold text-slate-900 mb-2">{feature.title}</h3>
                                        <p className="text-sm text-slate-600">{feature.description}</p>
                                    </CardContent>
                                </Card>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>

                {/* Data Permissions */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="mb-12"
                >
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <Eye className="w-5 h-5" />
                                Data Permissions
                            </CardTitle>
                            <CardDescription>
                                Control how your data is used and shared
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="flex items-center justify-between p-4 bg-slate-50 rounded-lg">
                                <div>
                                    <p className="font-medium text-slate-900">Share credit score with lenders</p>
                                    <p className="text-sm text-slate-500">Allow verified lenders to view your CreditBridge score</p>
                                </div>
                                <Switch
                                    checked={permissions.shareWithLenders}
                                    onCheckedChange={() => handleToggle('shareWithLenders')}
                                />
                            </div>

                            <div className="flex items-center justify-between p-4 bg-slate-50 rounded-lg">
                                <div>
                                    <p className="font-medium text-slate-900">Anonymized analytics</p>
                                    <p className="text-sm text-slate-500">Help improve our algorithms with anonymized data</p>
                                </div>
                                <Switch
                                    checked={permissions.anonymizedAnalytics}
                                    onCheckedChange={() => handleToggle('anonymizedAnalytics')}
                                />
                            </div>

                            <div className="flex items-center justify-between p-4 bg-slate-50 rounded-lg">
                                <div>
                                    <p className="font-medium text-slate-900">Connected platform data</p>
                                    <p className="text-sm text-slate-500">Continue syncing data from your gig platforms</p>
                                </div>
                                <Switch
                                    checked={permissions.platformDataAccess}
                                    onCheckedChange={() => handleToggle('platformDataAccess')}
                                />
                            </div>

                            <div className="flex items-center justify-between p-4 bg-slate-50 rounded-lg">
                                <div>
                                    <p className="font-medium text-slate-900">Email notifications</p>
                                    <p className="text-sm text-slate-500">Receive updates about your score and account</p>
                                </div>
                                <Switch
                                    checked={permissions.emailNotifications}
                                    onCheckedChange={() => handleToggle('emailNotifications')}
                                />
                            </div>

                            <div className="flex items-center justify-between p-4 bg-slate-50 rounded-lg">
                                <div>
                                    <p className="font-medium text-slate-900">Marketing communications</p>
                                    <p className="text-sm text-slate-500">Receive offers and updates from partners</p>
                                </div>
                                <Switch
                                    checked={permissions.marketingComms}
                                    onCheckedChange={() => handleToggle('marketingComms')}
                                />
                            </div>
                        </CardContent>
                    </Card>
                </motion.div>

                {/* Data Actions */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                >
                    <Card>
                        <CardHeader>
                            <CardTitle>Data Actions</CardTitle>
                            <CardDescription>
                                Download or delete your data
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="flex flex-col sm:flex-row gap-4">
                                <Button variant="outline" className="flex-1">
                                    <Download className="w-4 h-4 mr-2" />
                                    Download My Data
                                </Button>

                                <Button
                                    variant="outline"
                                    className="flex-1 text-red-600 border-red-200 hover:bg-red-50"
                                    onClick={() => setShowDeleteConfirm(true)}
                                >
                                    <Trash2 className="w-4 h-4 mr-2" />
                                    Delete Account
                                </Button>
                            </div>

                            {showDeleteConfirm && (
                                <motion.div
                                    initial={{ opacity: 0, height: 0 }}
                                    animate={{ opacity: 1, height: 'auto' }}
                                    className="p-4 bg-red-50 border border-red-200 rounded-lg"
                                >
                                    <div className="flex items-start gap-3">
                                        <AlertTriangle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
                                        <div>
                                            <p className="font-medium text-red-900">Are you sure?</p>
                                            <p className="text-sm text-red-700 mt-1">
                                                This will permanently delete all your data, including your credit score history,
                                                connected accounts, and any shared information with lenders.
                                            </p>
                                            <div className="flex gap-2 mt-4">
                                                <Button
                                                    size="sm"
                                                    variant="outline"
                                                    onClick={() => setShowDeleteConfirm(false)}
                                                >
                                                    Cancel
                                                </Button>
                                                <Button
                                                    size="sm"
                                                    className="bg-red-600 hover:bg-red-700"
                                                    onClick={() => {
                                                        // Demo: just close the dialog
                                                        setShowDeleteConfirm(false);
                                                        alert('Demo Mode: Account deletion simulated');
                                                    }}
                                                >
                                                    Yes, Delete Everything
                                                </Button>
                                            </div>
                                        </div>
                                    </div>
                                </motion.div>
                            )}
                        </CardContent>
                    </Card>
                </motion.div>

                {/* Demo Notice */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5 }}
                    className="mt-8 text-center"
                >
                    <p className="text-sm text-slate-500 bg-slate-100 inline-block px-4 py-2 rounded-full">
                        🔒 Demo Mode: Changes are not persisted
                    </p>
                </motion.div>
            </main>
        </div>
    );
};

export default PrivacyDashboard;
