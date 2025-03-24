/*
 * @Author: Walker zw37520@gmail.com
 * @Date: 2025-03-17 22:40:01
 * @LastEditors: Walker zw37520@gmail.com
 * @LastEditTime: 2025-03-24 16:39:32
 * @FilePath: /ts-classes/rollup.config.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import typescript from '@rollup/plugin-typescript'
import serve from 'rollup-plugin-serve'
import { nodeResolve } from '@rollup/plugin-node-resolve'
import cleanup from 'rollup-plugin-cleanup'
import { babel } from '@rollup/plugin-babel'
import copy from 'rollup-plugin-copy'

/** @type {import('rollup').RollupOptions} */
const config = {
  input: './src/index.ts',
  output: {
    dir: 'dist',
    format: 'es',
    sourcemap: true,
    entryFileNames: '[name].js',
    chunkFileNames: '[name]-[hash].js',
    manualChunks: {
      'reflect-metadata': ['reflect-metadata']
    }
  },
  plugins: [
    cleanup({
      targets: ['dist/*'],
      beforeWrite: true
    }),
    copy({
      targets: [
        { src: 'public/index.html', dest: 'dist' }
      ],
      hook: 'buildStart'
    }),
    nodeResolve({
      extensions: ['.ts', '.js']
    }),
    babel({
      extensions: ['.ts'],
      babelHelpers: 'bundled',
      include: ['src/**/*'],
      exclude: 'node_modules/**'
    }),
    serve({
      open: true,
      contentBase: 'dist',
      port: 3002,
      host: 'localhost',
      headers: {
        'Cache-Control': 'no-store'
      }
    })
  ],
  watch: {
    include: 'src/**',
    exclude: 'node_modules/**',
    clearScreen: false
  }
};

export default config;