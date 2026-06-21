import { cp, readFile, rename, writeFile } from 'node:fs/promises'
import { defineConfig } from 'tsdown'

const pkg = JSON.parse(await readFile('package.json', 'utf8'))
const name = pkg.name as string

export default defineConfig({
  entry: ['./src/index.ts'],
  platform: 'node',
  dts: true,
  clean: true,
  format: ['esm'],
  outDir: 'dist',
  fixedExtension: false,
  onSuccess: async () => {
    await rename('dist/index.js', `dist/${name}.mjs`)
    await rename('dist/index.d.ts', `dist/${name}.d.ts`)
    await cp('README.md', 'dist/README.md')

    const distPkg = { ...pkg }
    delete distPkg.scripts
    delete distPkg.devDependencies
    distPkg.module = `./${name}.mjs`
    distPkg.types = `./${name}.d.ts`
    distPkg.exports = {
      '.': {
        types: `./${name}.d.ts`,
        default: `./${name}.mjs`,
      },
    }
    await writeFile('dist/package.json', JSON.stringify(distPkg, null, 2) + '\n')
  },
})
