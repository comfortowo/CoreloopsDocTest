 
 const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    // CRITICAL: This keeps you logged in between tests!
    testIsolation: false, 
    
    setupNodeEvents(on, config) {
      return config;
    },
  },
});

 
