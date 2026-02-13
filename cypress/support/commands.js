 // ***********************************************
// This file separates your Login Logic from your Test Logic
// ***********************************************

Cypress.Commands.add('checkLoginAndPause', () => {
  cy.log('🔍 Checking Login Status...');
  
  // 1. Visit Dashboard
  cy.visit('https://coreloops-v2-350156031212.europe-west2.run.app/dashboard');

  // 2. Wait for Redirect
  cy.wait(3000);

  // 3. Check URL
  cy.url().then((url) => {
    if (url.includes('login') || url.includes('signin')) {
      cy.get('[name="email"]').type('qa@coreloops.ai');
      cy.get('.inline-flex').click();
      cy.wait(3000);
    
      cy.get('.gap-2').click();
      // --- THE PAUSE MESSAGE ---
 
      // cy.log(' MANUAL LOGIN REQUIRED ');
      // cy.log('Please enter Email & Code manually.');
      // cy.log('Click "Resume" (Play) above when finished.');
      
      // 4. Pause for User Input
      // cy.pause(); 
    } else {
      cy.log('User is already logged in!');
    }
  });
});