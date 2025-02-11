import esbuild from 'rollup-plugin-esbuild'
import {dts} from "rollup-plugin-dts";

const name = 'coh-content-db';

export default [{
    input: 'src/index.ts',
    plugins: [esbuild()],
    output: [{
        file: `dist/${name}.js`,
        format: 'cjs',
        sourcemap: true
    }, {
        file: `dist/${name}.mjs`,
        format: 'es',
        sourcemap: true
    }]
}, {
    input: 'src/index.ts',
    plugins: [dts()],
    output: [{
        file: `dist/${name}.d.ts`,
        format: 'es'
    }]
}
];
