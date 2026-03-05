import { defineConfig } from 'cypress';

export default defineConfig({
  e2e: {
    baseUrl: 'http://localhost:4200',
    supportFile: 'projects/naologic-techtest/cypress/support/e2e.ts',
    specPattern: 'projects/naologic-techtest/cypress/e2e/**/*.cy.ts',
  },
});
