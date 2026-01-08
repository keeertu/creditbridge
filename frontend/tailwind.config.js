/** @type {import('tailwindcss').Config} */
export default {
	darkMode: ['class'],
	content: [
		"./index.html",
		"./src/**/*.{js,ts,jsx,tsx}",
	],
	theme: {
		extend: {
			// Custom Color Palette - Trust + Opportunity Theme
			colors: {
				// Primary Brand Colors
				brand: {
					50: '#eef2ff',
					100: '#e0e7ff',
					200: '#c7d2fe',
					300: '#a5b4fc',
					400: '#818cf8',
					500: '#6366f1', // Main indigo
					600: '#4f46e5',
					700: '#4338ca',
					800: '#3730a3',
					900: '#312e81',
					950: '#1e1b4b',
				},
				// Accent Colors
				accent: {
					pink: '#ec4899',
					rose: '#f43f5e',
					purple: '#a855f7',
					violet: '#8b5cf6',
				},
				// Success (Approved) Colors
				success: {
					50: '#ecfdf5',
					100: '#d1fae5',
					200: '#a7f3d0',
					300: '#6ee7b7',
					400: '#34d399',
					500: '#10b981', // Main green
					600: '#059669',
					700: '#047857',
					800: '#065f46',
					900: '#064e3b',
				},
				// Warning (Caution) Colors
				warning: {
					50: '#fffbeb',
					100: '#fef3c7',
					200: '#fde68a',
					300: '#fcd34d',
					400: '#fbbf24',
					500: '#f59e0b', // Main amber
					600: '#d97706',
					700: '#b45309',
					800: '#92400e',
					900: '#78350f',
				},
				// Danger (Denied) Colors
				danger: {
					50: '#fef2f2',
					100: '#fee2e2',
					200: '#fecaca',
					300: '#fca5a5',
					400: '#f87171',
					500: '#ef4444', // Main red
					600: '#dc2626',
					700: '#b91c1c',
					800: '#991b1b',
					900: '#7f1d1d',
				},
				// Neutral (keep Tailwind slate as base)
				surface: {
					50: '#f8fafc',
					100: '#f1f5f9',
					200: '#e2e8f0',
					300: '#cbd5e1',
					400: '#94a3b8',
					500: '#64748b',
					600: '#475569',
					700: '#334155',
					800: '#1e293b',
					900: '#0f172a',
					950: '#020617',
				},
				// Glass effects
				glass: {
					white: 'rgba(255, 255, 255, 0.1)',
					dark: 'rgba(0, 0, 0, 0.1)',
				},
				// Keep original colors for compatibility
				border: 'hsl(var(--border))',
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))',
				background: 'hsl(var(--background))',
				foreground: 'hsl(var(--foreground))',
				primary: {
					DEFAULT: 'hsl(var(--primary))',
					foreground: 'hsl(var(--primary-foreground))',
				},
				secondary: {
					DEFAULT: 'hsl(var(--secondary))',
					foreground: 'hsl(var(--secondary-foreground))',
				},
				destructive: {
					DEFAULT: 'hsl(var(--destructive))',
					foreground: 'hsl(var(--destructive-foreground))',
				},
				muted: {
					DEFAULT: 'hsl(var(--muted))',
					foreground: 'hsl(var(--muted-foreground))',
				},
				popover: {
					DEFAULT: 'hsl(var(--popover))',
					foreground: 'hsl(var(--popover-foreground))',
				},
				card: {
					DEFAULT: 'hsl(var(--card))',
					foreground: 'hsl(var(--card-foreground))',
				},
			},

			// Custom Font Family
			fontFamily: {
				sans: ['Outfit', 'Inter', 'system-ui', 'sans-serif'],
				display: ['Outfit', 'sans-serif'],
				mono: ['JetBrains Mono', 'monospace'],
			},

			// Custom Font Sizes
			fontSize: {
				'display-2xl': ['4.5rem', { lineHeight: '1', letterSpacing: '-0.02em' }],
				'display-xl': ['3.75rem', { lineHeight: '1', letterSpacing: '-0.02em' }],
				'display-lg': ['3rem', { lineHeight: '1.1', letterSpacing: '-0.02em' }],
				'display-md': ['2.25rem', { lineHeight: '1.2', letterSpacing: '-0.01em' }],
				'display-sm': ['1.875rem', { lineHeight: '1.2' }],
			},

			// Border Radius
			borderRadius: {
				'lg': 'var(--radius)',
				'md': 'calc(var(--radius) - 2px)',
				'sm': 'calc(var(--radius) - 4px)',
				'2xl': '1rem',
				'3xl': '1.5rem',
				'4xl': '2rem',
			},

			// Box Shadow with custom glow effects
			boxShadow: {
				'glow-sm': '0 0 15px -3px rgba(99, 102, 241, 0.3)',
				'glow': '0 0 25px -5px rgba(99, 102, 241, 0.4)',
				'glow-lg': '0 0 50px -12px rgba(99, 102, 241, 0.5)',
				'glow-success': '0 0 25px -5px rgba(16, 185, 129, 0.4)',
				'glow-danger': '0 0 25px -5px rgba(239, 68, 68, 0.4)',
				'glow-warning': '0 0 25px -5px rgba(245, 158, 11, 0.4)',
				'glass': '0 8px 32px 0 rgba(31, 38, 135, 0.15)',
				'glass-lg': '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
				'elevation-1': '0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24)',
				'elevation-2': '0 3px 6px rgba(0,0,0,0.15), 0 2px 4px rgba(0,0,0,0.12)',
				'elevation-3': '0 10px 20px rgba(0,0,0,0.15), 0 3px 6px rgba(0,0,0,0.10)',
				'elevation-4': '0 15px 25px rgba(0,0,0,0.15), 0 5px 10px rgba(0,0,0,0.05)',
				'elevation-5': '0 20px 40px rgba(0,0,0,0.2)',
			},

			// Background Images (Gradients)
			backgroundImage: {
				// Primary gradients
				'gradient-brand': 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
				'gradient-brand-reverse': 'linear-gradient(315deg, #667eea 0%, #764ba2 100%)',
				'gradient-hero': 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 50%, #ec4899 100%)',
				'gradient-dark': 'linear-gradient(135deg, #1e1b4b 0%, #0f172a 100%)',
				'gradient-light': 'linear-gradient(135deg, #f8fafc 0%, #eef2ff 100%)',

				// Success/Approved gradients
				'gradient-success': 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
				'gradient-success-soft': 'linear-gradient(135deg, #ecfdf5 0%, #d1fae5 100%)',

				// Danger/Denied gradients
				'gradient-danger': 'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)',
				'gradient-danger-soft': 'linear-gradient(135deg, #fef2f2 0%, #fee2e2 100%)',

				// Mesh gradients for landing page
				'gradient-mesh': `
          radial-gradient(at 40% 20%, rgba(99, 102, 241, 0.3) 0px, transparent 50%),
          radial-gradient(at 80% 0%, rgba(236, 72, 153, 0.2) 0px, transparent 50%),
          radial-gradient(at 0% 50%, rgba(139, 92, 246, 0.2) 0px, transparent 50%),
          radial-gradient(at 80% 50%, rgba(16, 185, 129, 0.15) 0px, transparent 50%),
          radial-gradient(at 0% 100%, rgba(99, 102, 241, 0.2) 0px, transparent 50%)
        `,

				// Glass gradient
				'gradient-glass': 'linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.05) 100%)',

				// Card gradients
				'gradient-card': 'linear-gradient(180deg, rgba(255,255,255,0.9) 0%, rgba(255,255,255,0.7) 100%)',

				// Shimmer for loading
				'shimmer': 'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.4) 50%, transparent 100%)',
			},

			// Custom Keyframe Animations
			keyframes: {
				// Fade animations
				'fade-in': {
					'0%': { opacity: '0' },
					'100%': { opacity: '1' },
				},
				'fade-in-up': {
					'0%': { opacity: '0', transform: 'translateY(20px)' },
					'100%': { opacity: '1', transform: 'translateY(0)' },
				},
				'fade-in-down': {
					'0%': { opacity: '0', transform: 'translateY(-20px)' },
					'100%': { opacity: '1', transform: 'translateY(0)' },
				},
				'fade-in-left': {
					'0%': { opacity: '0', transform: 'translateX(-20px)' },
					'100%': { opacity: '1', transform: 'translateX(0)' },
				},
				'fade-in-right': {
					'0%': { opacity: '0', transform: 'translateX(20px)' },
					'100%': { opacity: '1', transform: 'translateX(0)' },
				},

				// Scale animations
				'scale-in': {
					'0%': { opacity: '0', transform: 'scale(0.95)' },
					'100%': { opacity: '1', transform: 'scale(1)' },
				},
				'scale-up': {
					'0%': { transform: 'scale(1)' },
					'50%': { transform: 'scale(1.05)' },
					'100%': { transform: 'scale(1)' },
				},

				// Floating animation
				'float': {
					'0%, 100%': { transform: 'translateY(0px)' },
					'50%': { transform: 'translateY(-10px)' },
				},
				'float-slow': {
					'0%, 100%': { transform: 'translateY(0px)' },
					'50%': { transform: 'translateY(-20px)' },
				},

				// Pulse glow
				'pulse-glow': {
					'0%, 100%': { boxShadow: '0 0 15px -3px rgba(99, 102, 241, 0.3)' },
					'50%': { boxShadow: '0 0 30px -3px rgba(99, 102, 241, 0.6)' },
				},
				'pulse-glow-success': {
					'0%, 100%': { boxShadow: '0 0 15px -3px rgba(16, 185, 129, 0.3)' },
					'50%': { boxShadow: '0 0 30px -3px rgba(16, 185, 129, 0.6)' },
				},

				// Shimmer loader
				'shimmer': {
					'0%': { transform: 'translateX(-100%)' },
					'100%': { transform: 'translateX(100%)' },
				},

				// Gradient move
				'gradient-shift': {
					'0%': { backgroundPosition: '0% 50%' },
					'50%': { backgroundPosition: '100% 50%' },
					'100%': { backgroundPosition: '0% 50%' },
				},

				// Counter animation
				'count-up': {
					'0%': { opacity: '0', transform: 'translateY(10px)' },
					'100%': { opacity: '1', transform: 'translateY(0)' },
				},

				// Spin slow for accents
				'spin-slow': {
					'0%': { transform: 'rotate(0deg)' },
					'100%': { transform: 'rotate(360deg)' },
				},

				// Bounce subtle
				'bounce-subtle': {
					'0%, 100%': { transform: 'translateY(0)' },
					'50%': { transform: 'translateY(-5px)' },
				},

				// Slide in for modals
				'slide-in-bottom': {
					'0%': { transform: 'translateY(100%)', opacity: '0' },
					'100%': { transform: 'translateY(0)', opacity: '1' },
				},
				'slide-in-right': {
					'0%': { transform: 'translateX(100%)', opacity: '0' },
					'100%': { transform: 'translateX(0)', opacity: '1' },
				},

				// Confetti burst
				'confetti-burst': {
					'0%': { transform: 'scale(0) rotate(0deg)', opacity: '1' },
					'100%': { transform: 'scale(1) rotate(360deg)', opacity: '0' },
				},

				// Underline expand
				'underline-expand': {
					'0%': { transform: 'scaleX(0)', transformOrigin: 'left' },
					'100%': { transform: 'scaleX(1)', transformOrigin: 'left' },
				},

				// Accordion compatibility
				'accordion-down': {
					from: { height: '0' },
					to: { height: 'var(--radix-accordion-content-height)' },
				},
				'accordion-up': {
					from: { height: 'var(--radix-accordion-content-height)' },
					to: { height: '0' },
				},
			},

			// Animation utilities
			animation: {
				'fade-in': 'fade-in 0.5s ease-out',
				'fade-in-up': 'fade-in-up 0.5s ease-out',
				'fade-in-down': 'fade-in-down 0.5s ease-out',
				'fade-in-left': 'fade-in-left 0.5s ease-out',
				'fade-in-right': 'fade-in-right 0.5s ease-out',
				'scale-in': 'scale-in 0.3s ease-out',
				'scale-up': 'scale-up 0.3s ease-in-out',
				'float': 'float 3s ease-in-out infinite',
				'float-slow': 'float-slow 6s ease-in-out infinite',
				'pulse-glow': 'pulse-glow 2s ease-in-out infinite',
				'pulse-glow-success': 'pulse-glow-success 2s ease-in-out infinite',
				'shimmer': 'shimmer 2s infinite',
				'gradient-shift': 'gradient-shift 8s ease infinite',
				'count-up': 'count-up 0.8s ease-out',
				'spin-slow': 'spin-slow 20s linear infinite',
				'bounce-subtle': 'bounce-subtle 2s ease-in-out infinite',
				'slide-in-bottom': 'slide-in-bottom 0.4s ease-out',
				'slide-in-right': 'slide-in-right 0.4s ease-out',
				'confetti-burst': 'confetti-burst 1s ease-out forwards',
				'underline-expand': 'underline-expand 0.3s ease-out forwards',
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out',
			},

			// Backdrop blur
			backdropBlur: {
				xs: '2px',
			},

			// Transition timing functions
			transitionTimingFunction: {
				'spring': 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
				'bounce': 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
				'smooth': 'cubic-bezier(0.4, 0, 0.2, 1)',
			},

			// Transition duration
			transitionDuration: {
				'400': '400ms',
				'600': '600ms',
				'800': '800ms',
				'1000': '1000ms',
			},
		},
	},
	plugins: [require("tailwindcss-animate")],
}
