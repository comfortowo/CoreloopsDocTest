// ***********************************************************
// This file is processed and loaded automatically before your test files.
//
// This is a great place to put global configuration and
// behavior that modifies Cypress.
// ***********************************************************

// 1. Import commands.js using ES2015 syntax:
import './commands'

// 2. (Optional but Recommended) Ignore random app errors
// Sometimes the app might throw a console error that doesn't actually break anything.
// This code prevents Cypress from failing the test just because of a console error.
Cypress.on('uncaught:exception', (err, runnable) => {
  // returning false here prevents Cypress from failing the test
  return false
})
