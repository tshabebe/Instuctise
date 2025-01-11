import type { Config } from 'tailwindcss';
import tailwindAnimate from 'tailwindcss-animate';
import reactAriaComponents from 'tailwindcss-react-aria-components';
type Scale = 'gray' | 'orange' | 'green' | 'red';

const generateColorScale = (scale: Scale) => ({
  DEFAULT: `hsl(var(--${scale}-9))`,
  base: `hsl(var(--${scale}-1))`,

  'elevation-1': `hsl(var(--${scale}-2))`,
  'elevation-1-hover': `hsl(var(--${scale}-3))`,
  'elevation-1-border': `hsl(var(--${scale}-5))`,
  'elevation-1-border-hover': `hsl(var(--${scale}-6))`,

  'elevation-2': `hsl(var(--${scale}-3))`,
  'elevation-2-hover': `hsl(var(--${scale}-4))`,
  'elevation-2-border': `hsl(var(--${scale}-6))`,
  'elevation-2-border-hover': `hsl(var(--${scale}-7))`,

  'elevation-3': `hsl(var(--${scale}-4))`,
  'elevation-3-hover': `hsl(var(--${scale}-5))`,
  'elevation-3-border': `hsl(var(--${scale}-7))`,
  'elevation-3-border-hover': `hsl(var(--${scale}-8))`,

  'elevation-4': `hsl(var(--${scale}-5))`,
  'elevation-4-hover': `hsl(var(--${scale}-6))`,
  'elevation-4-border': `hsl(var(--${scale}-8))`,
  'elevation-4-border-hover': `hsl(var(--${scale}-9))`,

  'text-primary': `hsl(var(--${scale}-11))`,
  'text-primary-hover': `hsl(var(--${scale}-12))`,

  'text-secondary': `hsl(var(--${scale}-10))`,
  'text-secondary-hover': `hsl(var(--${scale}-11))`,

  'text-tertiary': `hsl(var(--${scale}-9))`,
  'text-tertiary-hover': `hsl(var(--${scale}-10))`,

  'text-quaternary': `hsl(var(--${scale}-8))`,
  'text-quaternary-hover': `hsl(var(--${scale}-9))`,

  ring: `hsl(var(--${scale}-7))`,
});

const config: Config = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    container: {
      center: true,
      padding: '1.5rem',
      screens: {
        '2xl': '1400px',
      },
    },
    extend: {
      colors: {
        background: 'hsl(var(--gray-1))',
        foreground: 'hsl(var(--gray-11))',
        border: 'hsl(var(--gray-6))',
        'border-hover': 'hsl(var(--gray-7))',
        gray: generateColorScale('gray'),
        orange: generateColorScale('orange'),
        green: generateColorScale('green'),
        red: generateColorScale('red'),
      },
    },
  },
  plugins: [tailwindAnimate, reactAriaComponents],
};
export default config;
