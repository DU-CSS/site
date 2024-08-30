import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';

export default defineConfig({
	preview: {
		host: true,
		port: 443,
		https: true
	},
	plugins: [sveltekit()]
});
