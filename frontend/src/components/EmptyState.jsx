import React from 'react';
import { motion } from 'framer-motion';
import { Button } from './ui/button';
import { FileQuestion, Search, Inbox, Plus, RefreshCw } from 'lucide-react';

/**
 * EmptyState - Reusable empty state component with illustrations
 * Used throughout the app when no data is available
 */

const icons = {
    search: Search,
    inbox: Inbox,
    file: FileQuestion,
    default: Inbox
};

const EmptyState = ({
    icon = 'default',
    title = 'No data available',
    description = 'There is nothing to display here yet.',
    actionLabel,
    onAction,
    secondaryLabel,
    onSecondary
}) => {
    const IconComponent = icons[icon] || icons.default;

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col items-center justify-center py-16 px-6 text-center"
        >
            <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: 'spring', delay: 0.1 }}
                className="w-24 h-24 bg-slate-100 rounded-full flex items-center justify-center mb-6"
            >
                <IconComponent className="w-12 h-12 text-slate-400" />
            </motion.div>

            <h3 className="text-xl font-semibold text-slate-900 mb-2">
                {title}
            </h3>

            <p className="text-slate-500 max-w-md mb-6">
                {description}
            </p>

            {(actionLabel || secondaryLabel) && (
                <div className="flex gap-3">
                    {actionLabel && onAction && (
                        <Button onClick={onAction}>
                            <Plus className="w-4 h-4 mr-2" />
                            {actionLabel}
                        </Button>
                    )}
                    {secondaryLabel && onSecondary && (
                        <Button variant="outline" onClick={onSecondary}>
                            <RefreshCw className="w-4 h-4 mr-2" />
                            {secondaryLabel}
                        </Button>
                    )}
                </div>
            )}
        </motion.div>
    );
};

// Preset empty states for common scenarios
export const NoResultsState = ({ onReset }) => (
    <EmptyState
        icon="search"
        title="No results found"
        description="We couldn't find anything matching your search. Try adjusting your filters or search terms."
        secondaryLabel="Clear filters"
        onSecondary={onReset}
    />
);

export const NoDataState = ({ onAction }) => (
    <EmptyState
        icon="inbox"
        title="No data yet"
        description="Get started by connecting your gig platform accounts or entering your income data."
        actionLabel="Get Started"
        onAction={onAction}
    />
);

export const ErrorState = ({ onRetry }) => (
    <EmptyState
        icon="file"
        title="Something went wrong"
        description="We encountered an error loading this content. Please try again."
        secondaryLabel="Try Again"
        onSecondary={onRetry}
    />
);

export default EmptyState;
