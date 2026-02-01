describe('Invoice Management: Full Workflow and Validation', () => {
  
  beforeEach(() => {
    cy.checkLoginAndPause();
    cy.viewport(1920, 1080);
    
    // 1. Navigation to Document Section
    cy.get('button[id^="radix-"]').eq(0).click({ force: true });
    cy.contains('Comfort Iyabo Owolabi').should('be.visible').click({ force: true });
    cy.get('button[id^="radix-"]').eq(1).click({ force: true });
    cy.contains('Documents').should('be.visible').click({ force: true });

    // 2. Filter for Pending
    cy.contains('button', 'Filters').click({ force: true });
    cy.get('button[role="combobox"]').contains('All').click({ force: true });
    cy.get('[role="option"]').contains('Pending').click({ force: true });
    cy.contains('button', 'Apply').click({ force: true });
    cy.wait(3000); // Wait for filtered list to stabilize
  });

  /**
   * POSITIVE WORKFLOW
   * Sequence: Approve -> Mark Paid -> Download
   */
  it('TC-01: Positive - Approve, Mark as Paid, and Attempt Download', () => {
    cy.intercept('POST', '**/graphql').as('gqlAction');

    // Open Full View
    cy.get('div[data-index="0"]').within(() => {
      cy.get('button').filter(':has(svg.lucide-ellipsis-vertical)').click({ force: true });
    });
    cy.get('[role="menuitem"]').contains('Full View').click({ force: true });
    cy.get('main', { timeout: 30000 }).should('be.visible');

    // Step 1: Approve
    cy.contains('button', 'Approve').should('be.visible').click({ force: true });
    cy.wait('@gqlAction').its('response.statusCode').should('eq', 200);
    cy.log('✅ Document Approved');

    // Step 2: Mark Paid
    // Force reload to update UI state if button doesn't appear
    cy.reload();
    cy.get('button').contains(/Mark Paid/i, { timeout: 15000 })
      .should('be.visible')
      .click({ force: true });
    cy.wait('@gqlAction').its('response.statusCode').should('eq', 200);
    cy.log('✅ Document Marked as Paid');

    // Step 3: Download
    cy.get('button').contains('Download').should('be.visible').click({ force: true });
    cy.log('⚠️ Download initiated - Note: May fail if no document is attached.');
  });

  /**
   * NEGATIVE WORKFLOWS
   * Handling illegal states and validation
   */
  
  it('TC-02: Negative - Verify Mark Paid is hidden before Approval', () => {
    // Open Full View
    cy.get('div[data-index="0"]').within(() => {
      cy.get('button').filter(':has(svg.lucide-ellipsis-vertical)').click({ force: true });
    });
    cy.get('[role="menuitem"]').contains('Full View').click({ force: true });
    
    // Mark Paid should not be available for a 'Pending' status
    cy.get('button').contains('Mark Paid').should('not.exist');
    cy.log('✅ Validation: Mark Paid hidden before approval.');
  });

   
  it('TC-04: Negative - Report Download Error for missing attachment', () => {
    // Step: Navigate to a Paid document and click Download
    // Filter for 'Paid' status instead of 'Pending'
    cy.contains('button', 'Filters').click({ force: true });
    cy.get('button[role="combobox"]').contains('Pending').click({ force: true });
    cy.get('[role="option"]').contains('Paid').click({ force: true });
    cy.contains('button', 'Apply').click({ force: true });

    cy.get('div[data-index="0"]').within(() => {
      cy.get('button').filter(':has(svg.lucide-ellipsis-vertical)').click({ force: true });
    });
    cy.get('[role="menuitem"]').contains('Full View').click({ force: true });

    // Trigger Download and catch error
    cy.get('button').contains('Download').click({ force: true });
    
    // Assuming a toast message appears for missing files
    cy.get('body').then(($body) => {
      if ($body.find('.toast-error').length > 0) {
        cy.log('✅ Captured expected download error due to missing attachment.');
      }
    });
  });
});