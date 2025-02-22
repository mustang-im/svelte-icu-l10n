import { defineConfig } from 'vitest/config';
import { svelte } from '@sveltejs/vite-plugin-svelte';
import { svelteTesting } from '@testing-library/svelte/vite';

export default defineConfig({
	plugins: [svelte({ hot: !process.env.VITEST }), svelteTesting()],
	test: {
		globals: true,
		environment: 'jsdom',
		include: ['tests/*.{test,spec}.{js,ts}'],
	},
});