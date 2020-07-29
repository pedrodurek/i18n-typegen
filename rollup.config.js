import typescript from 'rollup-plugin-typescript2';
import pkg from './package.json';

const commonOutputOptions = {
  banner: '#!/usr/bin/env node',
  preferConst: true,
  sourcemap: true,
};

export default {
  input: 'src/bin.ts',
  output: [
    {
      ...commonOutputOptions,
      file: pkg.main,
      format: 'cjs',
    },
    {
      ...commonOutputOptions,
      file: pkg.module,
      format: 'esm',
    },
  ],
  external: [...Object.keys(pkg.dependencies || {})],
  plugins: [typescript()],
  inlineDynamicImports: true,
};
