import { configDefaults, defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    exclude: [...configDefaults.exclude, '**/e2e/**'],
    reporters: process.env.CI ? ['default', 'junit'] : 'default',
    outputFile: process.env.CI ? 'vitest-report/index.xml' : undefined
  }
})
