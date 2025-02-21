import typescript from '@rollup/plugin-typescript';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';

export default {
	input: 'svelte/index.ts',
	output: {
		file: 'dist/index.js',
	},
  plugins: [
    typescript(),
    nodeResolve(),
    commonjs(),
  ],
};