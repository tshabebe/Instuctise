import type { Config } from 'tailwindcss';
import tailwindAnimate from 'tailwindcss-animate';
type Scale = 'gray' | 'orange' | 'salmon' | 'red';

const generateColorScale = (scale: Scale) => ({
  DEFAULT: `hsl(var(--${scale}-9))`,

  'foreground-muted': `hsl(var(--${scale}-11))`,
  foreground: `hsl(var(--${scale}-12))`,
  'foreground-hover': `hsl(var(--${scale}-12))`,

  app: `hsl(var(--${scale}-1))`,

  subtle: `hsl(var(--${scale}-2))`,
  'subtle-border': `hsl(var(--${scale}-6))`,

  element: `hsl(var(--${scale}-3))`,
  'element-hover': `hsl(var(--${scale}-4))`,
  'element-active': `hsl(var(--${scale}-5))`,
  'element-border': `hsl(var(--${scale}-7))`,
  'element-border-hover': `hsl(var(--${scale}-8))`,

  solid: `hsl(var(--${scale}-9))`,
  'solid-hover': `hsl(var(--${scale}-10))`,
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
        foreground: 'hsl(var(--gray-12))',
        'foreground-muted': 'hsl(var(--gray-11))',

        gray: generateColorScale('gray'),
        orange: generateColorScale('orange'),
        salmon: generateColorScale('salmon'),
        red: generateColorScale('red'),
      },
    },
  },
  plugins: [tailwindAnimate],
};
export default config;
