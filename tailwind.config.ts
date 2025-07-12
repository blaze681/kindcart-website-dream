
import type { Config } from "tailwindcss";

export default {
	darkMode: ["class"],
	content: [
		"./pages/**/*.{ts,tsx}",
		"./components/**/*.{ts,tsx}",
		"./app/**/*.{ts,tsx}",
		"./src/**/*.{ts,tsx}",
	],
	prefix: "",
	theme: {
		container: {
			center: true,
			padding: '2rem',
			screens: {
				'2xl': '1400px'
			}
		},
		extend: {
			colors: {
				border: 'hsl(var(--border))',
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))',
				background: 'hsl(var(--background))',
				foreground: 'hsl(var(--foreground))',
				primary: {
					DEFAULT: 'hsl(var(--primary))',
					foreground: 'hsl(var(--primary-foreground))'
				},
				secondary: {
					DEFAULT: 'hsl(var(--secondary))',
					foreground: 'hsl(var(--secondary-foreground))'
				},
				destructive: {
					DEFAULT: 'hsl(var(--destructive))',
					foreground: 'hsl(var(--destructive-foreground))'
				},
				muted: {
					DEFAULT: 'hsl(var(--muted))',
					foreground: 'hsl(var(--muted-foreground))'
				},
				accent: {
					DEFAULT: 'hsl(var(--accent))',
					foreground: 'hsl(var(--accent-foreground))'
				},
				popover: {
					DEFAULT: 'hsl(var(--popover))',
					foreground: 'hsl(var(--popover-foreground))'
				},
				card: {
					DEFAULT: 'hsl(var(--card))',
					foreground: 'hsl(var(--card-foreground))'
				},
				sidebar: {
					DEFAULT: 'hsl(var(--sidebar-background))',
					foreground: 'hsl(var(--sidebar-foreground))',
					primary: 'hsl(var(--sidebar-primary))',
					'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
					accent: 'hsl(var(--sidebar-accent))',
					'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
					border: 'hsl(var(--sidebar-border))',
					ring: 'hsl(var(--sidebar-ring))',
				},
				// Premium KindCart Colors
				peach: {
					DEFAULT: 'hsl(var(--peach))',
					dark: 'hsl(var(--peach-dark))'
				},
				'baby-blue': {
					DEFAULT: 'hsl(var(--baby-blue))',
					dark: 'hsl(var(--baby-blue-dark))'
				},
				lilac: {
					DEFAULT: 'hsl(var(--lilac))',
					dark: 'hsl(var(--lilac-dark))'
				},
				mint: {
					DEFAULT: 'hsl(var(--mint))',
					dark: 'hsl(var(--mint-dark))'
				},
				'warm-white': 'hsl(var(--warm-white))',
				'soft-gray': 'hsl(var(--soft-gray))',
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)',
				'2xl': '2rem',
				'3xl': '3rem',
			},
			fontFamily: {
				'poppins': ['Poppins', 'sans-serif'],
				'nunito': ['Nunito', 'sans-serif'],
				'quicksand': ['Quicksand', 'sans-serif'],
				'baloo': ['Baloo 2', 'cursive'],
			},
			fontSize: {
				'premium-xl': ['3.5rem', { lineHeight: '1.1', letterSpacing: '-0.02em' }],
				'premium-lg': ['2.5rem', { lineHeight: '1.2' }],
				'premium-md': ['1.5rem', { lineHeight: '1.4' }],
			},
			spacing: {
				'18': '4.5rem',
				'88': '22rem',
				'128': '32rem',
			},
			keyframes: {
				'accordion-down': {
					from: {
						height: '0'
					},
					to: {
						height: 'var(--radix-accordion-content-height)'
					}
				},
				'accordion-up': {
					from: {
						height: 'var(--radix-accordion-content-height)'
					},
					to: {
						height: '0'
					}
				},
				'gentle-float': {
					'0%, 100%': { transform: 'translateY(0px) rotate(0deg)' },
					'25%': { transform: 'translateY(-10px) rotate(1deg)' },
					'50%': { transform: 'translateY(-5px) rotate(0deg)' },
					'75%': { transform: 'translateY(-15px) rotate(-1deg)' },
				},
				'soft-bounce': {
					'0%, 100%': { transform: 'translateY(0)' },
					'50%': { transform: 'translateY(-20px)' },
				},
				'heart-pulse': {
					'0%, 100%': { transform: 'scale(1)' },
					'50%': { transform: 'scale(1.15)' },
				},
				'sparkle': {
					'0%, 100%': { opacity: '1', transform: 'scale(1) rotate(0deg)' },
					'25%': { opacity: '0.7', transform: 'scale(1.1) rotate(90deg)' },
					'50%': { opacity: '1', transform: 'scale(0.9) rotate(180deg)' },
					'75%': { opacity: '0.8', transform: 'scale(1.05) rotate(270deg)' },
				},
				'glow-pulse': {
					'0%, 100%': { boxShadow: '0 0 20px rgba(255, 182, 193, 0.3)' },
					'50%': { boxShadow: '0 0 40px rgba(255, 182, 193, 0.6)' },
				},
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out',
				'gentle-float': 'gentle-float 6s ease-in-out infinite',
				'soft-bounce': 'soft-bounce 2s ease-in-out infinite',
				'heart-pulse': 'heart-pulse 1.5s ease-in-out infinite',
				'sparkle': 'sparkle 3s ease-in-out infinite',
				'glow-pulse': 'glow-pulse 2s ease-in-out infinite',
			},
			backdropBlur: {
				xs: '2px',
			},
		}
	},
	plugins: [require("tailwindcss-animate")],
} satisfies Config;
