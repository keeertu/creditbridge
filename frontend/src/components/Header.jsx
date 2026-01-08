import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from './ui/button';
import {
    Shield, Menu, X, User, Building2, Lock, TrendingUp,
    LayoutDashboard, ChevronDown, FileText
} from 'lucide-react';
import { useRole } from '../context/RoleContext';

/**
 * Header - Main navigation component with role toggle and mobile menu
 */
const Header = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { isLender, setIsLender } = useRole();
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    const navLinks = [
        { path: '/', label: 'Home', icon: LayoutDashboard },
        { path: '/impact', label: 'Impact', icon: TrendingUp },
        { path: '/privacy', label: 'Privacy', icon: Lock },
    ];

    const lenderLinks = [
        { path: '/lender-portfolio', label: 'Portfolio', icon: FileText },
    ];

    const isActive = (path) => location.pathname === path;

    return (
        <header className="bg-white/80 backdrop-blur-md border-b border-slate-200 sticky top-0 z-40">
            <div className="max-w-7xl mx-auto px-4 sm:px-6">
                <div className="flex items-center justify-between h-16">
                    {/* Logo */}
                    <Link to="/" className="flex items-center gap-3">
                        <div className="w-9 h-9 bg-slate-900 rounded-lg flex items-center justify-center">
                            <Shield className="w-5 h-5 text-white" />
                        </div>
                        <span className="font-bold text-lg text-slate-900 hidden sm:block">CreditBridge</span>
                    </Link>

                    {/* Desktop Navigation */}
                    <nav className="hidden md:flex items-center gap-1">
                        {navLinks.map((link) => (
                            <Link
                                key={link.path}
                                to={link.path}
                                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${isActive(link.path)
                                        ? 'bg-slate-100 text-slate-900'
                                        : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                                    }`}
                            >
                                {link.label}
                            </Link>
                        ))}

                        {/* Lender-specific links */}
                        {isLender && lenderLinks.map((link) => (
                            <Link
                                key={link.path}
                                to={link.path}
                                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${isActive(link.path)
                                        ? 'bg-slate-100 text-slate-900'
                                        : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                                    }`}
                            >
                                {link.label}
                            </Link>
                        ))}
                    </nav>

                    {/* Right side actions */}
                    <div className="flex items-center gap-3">
                        {/* Role Toggle */}
                        <div className="hidden sm:flex items-center bg-slate-100 rounded-lg p-1">
                            <button
                                onClick={() => setIsLender(false)}
                                className={`px-3 py-1.5 rounded-md text-sm font-medium transition-all ${!isLender
                                        ? 'bg-white text-slate-900 shadow-sm'
                                        : 'text-slate-500 hover:text-slate-700'
                                    }`}
                            >
                                <span className="flex items-center gap-1.5">
                                    <User className="w-3.5 h-3.5" />
                                    Applicant
                                </span>
                            </button>
                            <button
                                onClick={() => setIsLender(true)}
                                className={`px-3 py-1.5 rounded-md text-sm font-medium transition-all ${isLender
                                        ? 'bg-white text-slate-900 shadow-sm'
                                        : 'text-slate-500 hover:text-slate-700'
                                    }`}
                            >
                                <span className="flex items-center gap-1.5">
                                    <Building2 className="w-3.5 h-3.5" />
                                    Lender
                                </span>
                            </button>
                        </div>

                        {/* Get Score CTA */}
                        <Button
                            size="sm"
                            className="hidden sm:flex"
                            onClick={() => navigate('/single-input')}
                        >
                            Get Your Score
                        </Button>

                        {/* Mobile Menu Button */}
                        <button
                            className="md:hidden p-2 rounded-lg hover:bg-slate-100"
                            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                        >
                            {mobileMenuOpen ? (
                                <X className="w-5 h-5 text-slate-600" />
                            ) : (
                                <Menu className="w-5 h-5 text-slate-600" />
                            )}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu */}
            <AnimatePresence>
                {mobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="md:hidden border-t border-slate-200 bg-white"
                    >
                        <nav className="p-4 space-y-2">
                            {navLinks.map((link) => (
                                <Link
                                    key={link.path}
                                    to={link.path}
                                    onClick={() => setMobileMenuOpen(false)}
                                    className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors ${isActive(link.path)
                                            ? 'bg-slate-100 text-slate-900'
                                            : 'text-slate-600 hover:bg-slate-50'
                                        }`}
                                >
                                    <link.icon className="w-5 h-5" />
                                    {link.label}
                                </Link>
                            ))}

                            {isLender && lenderLinks.map((link) => (
                                <Link
                                    key={link.path}
                                    to={link.path}
                                    onClick={() => setMobileMenuOpen(false)}
                                    className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors ${isActive(link.path)
                                            ? 'bg-slate-100 text-slate-900'
                                            : 'text-slate-600 hover:bg-slate-50'
                                        }`}
                                >
                                    <link.icon className="w-5 h-5" />
                                    {link.label}
                                </Link>
                            ))}

                            <div className="pt-4 border-t border-slate-200">
                                <p className="text-xs text-slate-500 uppercase tracking-wide mb-2 px-4">View As</p>
                                <div className="grid grid-cols-2 gap-2 px-4">
                                    <button
                                        onClick={() => { setIsLender(false); setMobileMenuOpen(false); }}
                                        className={`flex items-center justify-center gap-2 p-3 rounded-lg text-sm font-medium transition-colors ${!isLender ? 'bg-blue-50 text-blue-600 ring-1 ring-blue-200' : 'bg-slate-100 text-slate-600'
                                            }`}
                                    >
                                        <User className="w-4 h-4" />
                                        Applicant
                                    </button>
                                    <button
                                        onClick={() => { setIsLender(true); setMobileMenuOpen(false); }}
                                        className={`flex items-center justify-center gap-2 p-3 rounded-lg text-sm font-medium transition-colors ${isLender ? 'bg-blue-50 text-blue-600 ring-1 ring-blue-200' : 'bg-slate-100 text-slate-600'
                                            }`}
                                    >
                                        <Building2 className="w-4 h-4" />
                                        Lender
                                    </button>
                                </div>
                            </div>

                            <div className="pt-4 px-4">
                                <Button
                                    className="w-full"
                                    onClick={() => { navigate('/single-input'); setMobileMenuOpen(false); }}
                                >
                                    Get Your Score
                                </Button>
                            </div>
                        </nav>
                    </motion.div>
                )}
            </AnimatePresence>
        </header>
    );
};

export default Header;
