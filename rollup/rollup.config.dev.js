import serve from 'rollup-plugin-serve'
import baseConfig from './rollup.config.base'

let name = 'dolmx';
export default {
  input: baseConfig.input,
  output: [
    {
      file: `build/${name}.js`,
      format: 'umd',
      name,
      sourcemap: true
    },
    {
      file: `build/${name}.cjs.js`,
      format: 'cjs',
      name,
      sourcemap: true
    }
  ],
  plugins: [
    ...baseConfig.plugins,
    serve({
      port: 9090,
      contentBase: ['']
    })
  ]
}
