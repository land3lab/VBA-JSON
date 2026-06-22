import type { Config } from 'tailwindcss';
const config: Config = { darkMode: ['class'], content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}', './lib/**/*.{ts,tsx}'], theme: { extend: { colors: { navy: {50:'#f4f7fb',100:'#e7eef8',700:'#173b68',800:'#102f55',900:'#0b2340'}, bluepoint:'#2563eb' }, boxShadow: { soft:'0 16px 40px rgba(15, 23, 42, .08)' } } }, plugins: [require('tailwindcss-animate')] };
export default config;
