
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
					DEFAULT: '#FF6B35',
					foreground: '#FFFFFF',
					50: '#FFF4F1',
					100: '#FFE7E0',
					200: '#FFD4C7',
					300: '#FFB8A0',
					400: '#FF9472',
					500: '#FF6B35',
					600: '#F7531E',
					700: '#E8410F',
					800: '#C73710',
					900: '#A02F14',
				},
				secondary: {
					DEFAULT: '#F7931E',
					foreground: '#FFFFFF',
					50: '#FFF8F0',
					100: '#FFEED9',
					200: '#FFDAB3',
					300: '#FFC082',
					400: '#FF9F4F',
					500: '#F7931E',
					600: '#E8760B',
					700: '#C1580B',
					800: '#9A4711',
					900: '#7C3C11',
				},
				accent: {
					DEFAULT: '#FFD700',
					foreground: '#1F2937',
					50: '#FFFEF0',
					100: '#FFFBDB',
					200: '#FFF5B8',
					300: '#FFEC85',
					400: '#FFE052',
					500: '#FFD700',
					600: '#E6C200',
					700: '#B89500',
					800: '#946B00',
					900: '#7A5500',
				},
				destructive: {
					DEFAULT: 'hsl(var(--destructive))',
					foreground: 'hsl(var(--destructive-foreground))'
				},
				muted: {
					DEFAULT: 'hsl(var(--muted))',
					foreground: 'hsl(var(--muted-foreground))'
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
					ring: 'hsl(var(--sidebar-ring))'
				}
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)'
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
				'fade-in': {
					'0%': { opacity: '0', transform: 'translateY(30px)' },
					'100%': { opacity: '1', transform: 'translateY(0)' }
				},
				'scale-in': {
					'0%': { transform: 'scale(0.8)', opacity: '0' },
					'100%': { transform: 'scale(1)', opacity: '1' }
				},
				'slide-up': {
					'0%': { opacity: '0', transform: 'translateY(50px)' },
					'100%': { opacity: '1', transform: 'translateY(0)' }
				},
				'float': {
					'0%, 100%': { transform: 'translateY(0px)' },
					'50%': { transform: 'translateY(-10px)' }
				},
				'gradient-shift': {
					'0%': { backgroundPosition: '0% 50%' },
					'50%': { backgroundPosition: '100% 50%' },
					'100%': { backgroundPosition: '0% 50%' }
				}
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out',
				'fade-in': 'fade-in 0.8s ease-out',
				'scale-in': 'scale-in 0.6s ease-out',
				'slide-up': 'slide-up 0.7s ease-out',
				'float': 'float 3s ease-in-out infinite',
				'gradient-shift': 'gradient-shift 3s ease infinite'
			},
			backgroundImage: {
				'gradient-geo': 'linear-gradient(135deg, #FF6B35 0%, #F7931E 25%, #FFD700 50%, #F7931E 75%, #FF6B35 100%)',
				'gradient-geo-dark': 'linear-gradient(135deg, #e55a2b 0%, #d67819 25%, #e6c200 50%, #d67819 75%, #e55a2b 100%)',
			}
		}
	},
	plugins: [require("tailwindcss-animate")],
} satisfies Config;
