import React from 'react';
import { motion } from 'framer-motion';

/**
 * LoadingSkeleton - Animated placeholder for loading content
 * Provides visual feedback while data is being fetched
 */

// Base skeleton shimmer animation
const shimmer = {
    initial: { x: '-100%' },
    animate: { x: '100%' },
    transition: { repeat: Infinity, duration: 1.5, ease: 'linear' }
};

// Generic skeleton block
export const Skeleton = ({ className = '', ...props }) => (
    <div
        className={`relative overflow-hidden bg-slate-200 rounded ${className}`}
        {...props}
    >
        <motion.div
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent"
            {...shimmer}
        />
    </div>
);

// Score gauge skeleton
export const ScoreGaugeSkeleton = () => (
    <div className="flex flex-col items-center">
        <Skeleton className="w-56 h-56 rounded-full" />
        <Skeleton className="w-40 h-6 mt-4" />
        <Skeleton className="w-24 h-8 mt-2 rounded-full" />
    </div>
);

// Card skeleton
export const CardSkeleton = ({ lines = 3 }) => (
    <div className="bg-white rounded-xl border border-slate-200 p-6 space-y-4">
        <Skeleton className="w-2/3 h-6" />
        {[...Array(lines)].map((_, i) => (
            <Skeleton key={i} className="w-full h-4" style={{ width: `${100 - i * 15}%` }} />
        ))}
    </div>
);

// Table row skeleton
export const TableRowSkeleton = ({ columns = 5 }) => (
    <div className="flex items-center gap-4 p-4 border-b border-slate-100">
        <Skeleton className="w-10 h-10 rounded-full flex-shrink-0" />
        {[...Array(columns - 1)].map((_, i) => (
            <Skeleton key={i} className="h-4 flex-1" />
        ))}
    </div>
);

// Dashboard skeleton
export const DashboardSkeleton = () => (
    <div className="space-y-8 p-6">
        {/* Header skeleton */}
        <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
                <Skeleton className="w-10 h-10 rounded-lg" />
                <div>
                    <Skeleton className="w-32 h-6" />
                    <Skeleton className="w-24 h-4 mt-1" />
                </div>
            </div>
            <Skeleton className="w-24 h-10 rounded-lg" />
        </div>

        {/* Score section */}
        <div className="flex justify-center py-8">
            <ScoreGaugeSkeleton />
        </div>

        {/* Factor gauges */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[...Array(4)].map((_, i) => (
                <CardSkeleton key={i} lines={2} />
            ))}
        </div>

        {/* Insights */}
        <CardSkeleton lines={4} />
    </div>
);

// Form skeleton
export const FormSkeleton = () => (
    <div className="max-w-lg mx-auto space-y-6 p-6">
        <div className="space-y-2">
            <Skeleton className="w-24 h-4" />
            <Skeleton className="w-full h-10 rounded-lg" />
        </div>
        <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
                <Skeleton className="w-24 h-4" />
                <Skeleton className="w-full h-10 rounded-lg" />
            </div>
            <div className="space-y-2">
                <Skeleton className="w-24 h-4" />
                <Skeleton className="w-full h-10 rounded-lg" />
            </div>
        </div>
        <Skeleton className="w-full h-12 rounded-lg" />
    </div>
);

// Stats skeleton for impact page
export const StatsSkeleton = () => (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {[...Array(4)].map((_, i) => (
            <div key={i} className="bg-slate-800/50 rounded-xl p-6 text-center">
                <Skeleton className="w-12 h-12 rounded-xl mx-auto mb-4" />
                <Skeleton className="w-20 h-8 mx-auto mb-2" />
                <Skeleton className="w-24 h-4 mx-auto" />
            </div>
        ))}
    </div>
);

// Full page loading skeleton
const LoadingSkeleton = ({ type = 'dashboard' }) => {
    switch (type) {
        case 'dashboard':
            return <DashboardSkeleton />;
        case 'form':
            return <FormSkeleton />;
        case 'stats':
            return <StatsSkeleton />;
        default:
            return <DashboardSkeleton />;
    }
};

export default LoadingSkeleton;
