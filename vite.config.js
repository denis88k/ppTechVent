import react from '@vitejs/plugin-react';
import path from 'path';
import { defineConfig } from 'vite';

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [react()],
	// root: './',
	base: '/ppTechVent/',
	resolve: {
		alias: {
			src: path.resolve(__dirname, './src'),
			app: path.resolve(__dirname, './src/app'),
			pages: path.resolve(__dirname, './src/pages'),
			shared: path.resolve(__dirname, './src/shared'),
			entities: path.resolve(__dirname, './src/entities'),
			widgets: path.resolve(__dirname, './src/widgets'),
		},
	},
});
