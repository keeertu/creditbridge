/**
 * Demo Personas for CreditBridge
 * Diverse gig worker profiles for demonstration and testing
 */

export const demoPersonas = [
    {
        id: 'persona-1',
        name: 'Maria Santos',
        role: 'Uber & Lyft Driver',
        age: 34,
        location: 'Austin, TX',
        photo: 'https://i.pravatar.cc/150?img=47',
        backstory: 'Maria immigrated from Brazil 5 years ago and started driving for rideshare platforms while taking night classes. Despite consistent earnings of $3,500/month, she was denied a car loan due to no credit history in the US.',
        traditionalStatus: 'No Credit History',
        expectedScore: 72,

        // API-compatible metrics
        metrics: {
            avg_daily_income: 145.0,
            income_std_dev: 35.0,
            active_days_ratio: 0.78,
            max_income_gap: 3,
            tenure_months: 18,
            income_trend: 0.08
        },

        // Additional display data
        platforms: ['Uber', 'Lyft'],
        monthlyIncome: 3500,
        totalTrips: 4250,
        rating: 4.92
    },

    {
        id: 'persona-2',
        name: 'James Chen',
        role: 'Freelance Developer',
        age: 28,
        location: 'Seattle, WA',
        photo: 'https://i.pravatar.cc/150?img=11',
        backstory: 'James left his corporate job to freelance on Upwork and Fiverr. His income varies between $4,000-$8,000/month based on projects. Traditional lenders see him as "unstable income" despite earning more than his employed peers.',
        traditionalStatus: 'Insufficient Stable Income',
        expectedScore: 85,

        metrics: {
            avg_daily_income: 195.0,
            income_std_dev: 65.0,
            active_days_ratio: 0.82,
            max_income_gap: 7,
            tenure_months: 24,
            income_trend: 0.15
        },

        platforms: ['Upwork', 'Fiverr'],
        monthlyIncome: 5800,
        totalProjects: 156,
        rating: 4.98
    },

    {
        id: 'persona-3',
        name: 'Aisha Johnson',
        role: 'DoorDash & Instacart',
        age: 42,
        location: 'Atlanta, GA',
        photo: 'https://i.pravatar.cc/150?img=45',
        backstory: 'Aisha is a single mother who delivers for DoorDash and Instacart between her kids\' school hours. She earns $2,200/month with remarkable consistency but was denied a credit card to build her score.',
        traditionalStatus: 'Thin Credit File',
        expectedScore: 68,

        metrics: {
            avg_daily_income: 92.0,
            income_std_dev: 22.0,
            active_days_ratio: 0.72,
            max_income_gap: 2,
            tenure_months: 14,
            income_trend: 0.03
        },

        platforms: ['DoorDash', 'Instacart'],
        monthlyIncome: 2200,
        totalDeliveries: 2890,
        rating: 4.95
    },

    {
        id: 'persona-4',
        name: 'Raj Patel',
        role: 'TaskRabbit Handyman',
        age: 52,
        location: 'Chicago, IL',
        photo: 'https://i.pravatar.cc/150?img=12',
        backstory: 'Raj was a contractor who lost his business during the recession. He rebuilt through TaskRabbit, now earning $6,000/month. His past bankruptcy means traditional credit is impossible, despite his current success.',
        traditionalStatus: 'Previous Bankruptcy',
        expectedScore: 91,

        metrics: {
            avg_daily_income: 225.0,
            income_std_dev: 40.0,
            active_days_ratio: 0.88,
            max_income_gap: 2,
            tenure_months: 36,
            income_trend: 0.12
        },

        platforms: ['TaskRabbit', 'Thumbtack'],
        monthlyIncome: 6000,
        totalTasks: 890,
        rating: 4.99
    },

    {
        id: 'persona-5',
        name: 'Sofia Rodriguez',
        role: 'New Gig Worker',
        age: 22,
        location: 'Miami, FL',
        photo: 'https://i.pravatar.cc/150?img=23',
        backstory: 'Sofia just graduated college and started doing Fiverr graphic design gigs. She\'s only been working for 3 months with irregular income. Traditional scoring gives her zero options, but her early patterns show promise.',
        traditionalStatus: 'No Credit History',
        expectedScore: 45,

        metrics: {
            avg_daily_income: 65.0,
            income_std_dev: 55.0,
            active_days_ratio: 0.45,
            max_income_gap: 12,
            tenure_months: 3,
            income_trend: 0.25
        },

        platforms: ['Fiverr'],
        monthlyIncome: 1400,
        totalProjects: 28,
        rating: 4.7
    }
];

/**
 * Get persona by ID
 */
export const getPersonaById = (id) => {
    return demoPersonas.find(p => p.id === id);
};

/**
 * Get all persona options for dropdown
 */
export const getPersonaOptions = () => {
    return demoPersonas.map(p => ({
        value: p.id,
        label: `${p.name} - ${p.role}`,
        score: p.expectedScore
    }));
};

/**
 * Platform data for AccountConnection page
 */
export const gigPlatforms = [
    {
        id: 'uber',
        name: 'Uber',
        icon: '🚗',
        color: 'bg-black',
        description: 'Rideshare driving'
    },
    {
        id: 'lyft',
        name: 'Lyft',
        icon: '🚙',
        color: 'bg-pink-500',
        description: 'Rideshare driving'
    },
    {
        id: 'doordash',
        name: 'DoorDash',
        icon: '🍔',
        color: 'bg-red-500',
        description: 'Food delivery'
    },
    {
        id: 'upwork',
        name: 'Upwork',
        icon: '💼',
        color: 'bg-green-600',
        description: 'Freelance work'
    },
    {
        id: 'fiverr',
        name: 'Fiverr',
        icon: '🎨',
        color: 'bg-emerald-500',
        description: 'Freelance services'
    },
    {
        id: 'instacart',
        name: 'Instacart',
        icon: '🛒',
        color: 'bg-orange-500',
        description: 'Grocery delivery'
    },
    {
        id: 'taskrabbit',
        name: 'TaskRabbit',
        icon: '🔧',
        color: 'bg-teal-500',
        description: 'Task services'
    }
];

export default demoPersonas;
