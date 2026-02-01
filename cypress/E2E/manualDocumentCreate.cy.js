describe('Coreloops Document Test - Manual Workflow', () => {

  // Constants for better readability
  const WAIT_TIME = {
    SHORT: 300,
    MEDIUM: 500,
    LONG: 1000
  };

  const CLICK_POSITION = { x: 800, y: 400 };

  before(() => {
    cy.checkLoginAndPause();
  });

  beforeEach(() => {
  cy.viewport(1920, 1080);
  
  // Navigation
  cy.get('button[id^="radix-"]').eq(0).click({ force: true });
  cy.contains('Comfort Iyabo Owolabi').should('be.visible').click({ force: true });
  cy.wait(WAIT_TIME.LONG);

  cy.get('button[id^="radix-"]').eq(1).click({ force: true });
  cy.contains('Documents').should('be.visible').click({ force: true });
  cy.wait(WAIT_TIME.LONG);
  
  // Ensure page is fully loaded and Add button is visible
  cy.contains('button', 'Add', { timeout: 15000 }).should('be.visible');
  cy.wait(WAIT_TIME.MEDIUM);
});

  afterEach(() => {
    // Close any open modals
    cy.get('body').type('{esc}');
    cy.wait(WAIT_TIME.MEDIUM);
    cy.get('body').type('{esc}');
    cy.wait(WAIT_TIME.MEDIUM);
  });

  // ==================== POSITIVE TEST (Must Pass First) ====================
  
  it('TC-01: Create Manually Flow', () => {
    // Initiate document creation
    cy.contains('button', 'Add').should('be.visible').click();
    cy.contains('[role="menuitem"], button', 'Add New').click({ force: true });
    cy.contains('Create Manually').should('be.visible').click();
    cy.contains('button', 'Add Line Item').click();

    // A. DESCRIPTION - Your original working code
    cy.get('[data-index="0"]').contains('Enter title').click({ force: true });
    cy.get('[data-index="0"]').find('textarea, input').first()
      .type('Test Item Description', { force: true });

    // B. CHECKBOX - Your original working code
    cy.get('[data-index="0"]').find('[role="checkbox"]').first().click({ force: true });

    // C. COST CODE - Your original working code
    cy.log('Selecting Cost Code...');
    cy.get('[data-index="0"]')
      .find('button[role="combobox"], button:contains("Select")')
      .first().click({ force: true });
    
    cy.get('[role="option"]').first().click({ force: true });

    cy.get('body').type('{esc}');
    cy.get('[role="listbox"]').should('not.exist');
    cy.get('[data-index="0"]').first().click(5, 5, { force: true });

    // D. QUANTITY
    setQuantity(10);

    // E. UNIT
    selectUnit('Bag');

    // F. RATE
    setRate(20000);

    // G. VAT RATE
    setVATRate('20%');
    
    selectDocumentType('Invoice');

    setDocumentDates('5', '20');
    setAssignedToRandomly();
    setSupplierRandomly();
    setRandomReference();
    clickGenerateInvoice();
    goBackToDashboard();
  });

  // ==================== OTHER TESTS (Run After TC-01 Passes) ====================

 it('TC-02: Create Invoice with Minimal Fields', () => {
    cy.contains('button', 'Add').click();
    cy.contains('[role="menuitem"], button', 'Add New').click({ force: true });
    cy.contains('Create Manually').click();
    selectDocumentType('Invoice');
    cy.contains('button', 'Add Line Item').click();
    cy.get('[data-index="0"]').contains('Enter title').click({ force: true });
    cy.get('[data-index="0"]').find('textarea, input').first()
      .type('Minimal Item', { force: true });
    cy.log('Selecting Cost Code...');
    cy.get('[data-index="0"]')
      .find('button[role="combobox"], button:contains("Select")')
      .first().click({ force: true });
    cy.get('[role="option"]').first().click({ force: true });
    cy.get('body').then(($body) => {
        if ($body.find('button:contains("Confirm")').length > 0) {
            cy.contains('button', 'Confirm').click({ force: true });
            cy.wait(500);  
        }
    });
    setQuantity(10);
    setRate(20000);
    setVATRate('20%'); 
    clickGenerateInvoice();
    goBackToDashboard();
});


  it('TC-03: Create Invoice with Different Unit', () => {
    cy.contains('button', 'Add').should('be.visible').click();
    cy.contains('[role="menuitem"], button', 'Add New').click({ force: true });
    cy.contains('Create Manually').should('be.visible').click();
    
    selectDocumentType('Invoice');
    
    cy.contains('button', 'Add Line Item').click();
    
    cy.get('[data-index="0"]').contains('Enter title').click({ force: true });
    cy.get('[data-index="0"]').find('textarea, input').first()
      .type('Box Items', { force: true });
    cy.get('[data-index="0"]').find('[role="checkbox"]').first().click({ force: true });
    
    cy.log('Selecting Cost Code...');
    cy.get('[data-index="0"]')
      .find('button[role="combobox"], button:contains("Select")')
      .first().click({ force: true });
    cy.get('[role="option"]').first().click({ force: true });
    cy.get('body').type('{esc}');
    cy.get('[role="listbox"]').should('not.exist');
    cy.get('[data-index="0"]').first().click(5, 5, { force: true });
    
    setQuantity(5);
    selectUnit('Box');
    setRate(20000);
    setVATRate('10%');
    
    clickGenerateInvoice();
    goBackToDashboard();
  });

  it('TC-04: Test Large Quantity', () => {
    cy.contains('button', 'Add').should('be.visible').click();
    cy.contains('[role="menuitem"], button', 'Add New').click({ force: true });
    cy.contains('Create Manually').should('be.visible').click();
    
    selectDocumentType('Invoice');
    
    cy.contains('button', 'Add Line Item').click();
    
    cy.get('[data-index="0"]').contains('Enter title').click({ force: true });
    cy.get('[data-index="0"]').find('textarea, input').first()
      .type('Bulk Order', { force: true });
    cy.get('[data-index="0"]').find('[role="checkbox"]').first().click({ force: true });
    
    cy.log('Selecting Cost Code...');
    cy.get('[data-index="0"]')
      .find('button[role="combobox"], button:contains("Select")')
      .first().click({ force: true });
    cy.get('[role="option"]').first().click({ force: true });
    cy.get('body').type('{esc}');
    cy.get('[role="listbox"]').should('not.exist');
    cy.get('[data-index="0"]').first().click(5, 5, { force: true });
    
    setQuantity(999999);
    setRate(20000);
    
    clickGenerateInvoice();
    goBackToDashboard();
  });

  it('TC-05: Cancel Document Creation', () => {
    cy.contains('button', 'Add').should('be.visible').click();
    cy.contains('[role="menuitem"], button', 'Add New').click({ force: true });
    cy.contains('Create Manually').should('be.visible').click();
    
    selectDocumentType('Invoice');
    
    cy.contains('button', 'Add Line Item').click();
    
    cy.get('[data-index="0"]').contains('Enter title').click({ force: true });
    cy.get('[data-index="0"]').find('textarea, input').first()
      .type('Cancel Test', { force: true });
    cy.get('[data-index="0"]').find('[role="checkbox"]').first().click({ force: true });
    
    cy.log('Selecting Cost Code...');
    cy.get('[data-index="0"]')
      .find('button[role="combobox"], button:contains("Select")')
      .first().click({ force: true });
    cy.get('[role="option"]').first().click({ force: true });
    cy.get('body').type('{esc}');
    cy.get('[role="listbox"]').should('not.exist');
    cy.get('[data-index="0"]').first().click(5, 5, { force: true });
    
    setQuantity(10);
    setRate(20000);
    
    goBackToDashboard();
  });

  // ==================== HELPER FUNCTIONS ====================

 function setQuantity(value) {
 
  cy.get('body').type('{esc}');
  
  cy.log('Opening Quantity field via specific hash icon parent...');
 
  cy.get('svg.lucide-hash').first().closest('div[data-state]').click({ force: true });
  
  cy.wait(WAIT_TIME.MEDIUM); 
  
  cy.log('Typing in the quantity field...');
   
  cy.focused().should('exist').type('{selectall}{backspace}', { delay: 100 });
  cy.focused().type(String(value), { delay: 100 });
  
   cy.focused().blur();
  cy.wait(WAIT_TIME.MEDIUM);
  
  cy.log('Verifying saved value...');
   cy.get('p.font-inter')
    .contains(String(value), { timeout: 10000 })
    .scrollIntoView()
    .should('exist'); 
}

  function selectUnit(unitName) {
    cy.get('body').type('{esc}');
    
    cy.log('Opening unit selector via ruler icon...');
    cy.get('svg.lucide-ruler').first().parent('button').click({ force: true });
    cy.wait(WAIT_TIME.SHORT);
    
    cy.get('body').type('{esc}');
    
    cy.log('Selecting unit type...');
    cy.contains(unitName).click({ force: true });
    cy.wait(WAIT_TIME.MEDIUM);
  }

 function setRate(amount) {
 
  cy.get('body').type('{esc}');
  
  cy.log('Opening rate field targeting specific element...');
  
 
  cy.get('p.font-inter').contains('£0.00').click({ force: true });
  
  cy.wait(WAIT_TIME.MEDIUM); 
  
  cy.log('Entering rate value...');
   
  cy.focused().should('exist').type('{selectall}{backspace}', { delay: 100 });
  cy.focused().type(String(amount), { delay: 100 });
   
  cy.focused().type('{enter}');
  
  cy.log('Verifying rate value...');
   
  cy.get('p.font-inter').should('contain', amount.toLocaleString()); 
}

 function setVATRate(percentage) {
  cy.get('body').type('{esc}');
  
  cy.log('Opening VAT rate dropdown targeting parent container...');
  cy.get('p.font-inter').contains('0%')
    .closest('div.cursor-text')
    .click({ force: true });
  
  cy.log(`Waiting for ${percentage} in the portal...`);

  cy.contains(percentage, { timeout: 15000 })
    .should('be.visible')
    .click({ force: true });
  cy.wait(WAIT_TIME.MEDIUM);
  cy.get('p.font-inter').should('contain', percentage);
}
  function selectDocumentType(typeName) {
    cy.log(`--- Selecting Document Type: ${typeName} ---`);
    
    cy.contains('GENERAL INFO').should('be.visible');

    cy.contains('label', 'Document Type')
      .parent()
      .find('button')
      .click({ force: true });

    cy.get('[role="option"]')
      .contains(typeName)
      .should('be.visible')
      .click({ force: true });

    cy.contains('label', 'Document Type')
      .parent()
      .find('button')
      .should('contain', typeName);

    cy.contains('Invoice Number', { timeout: 10000 }).should('be.visible');
    cy.wait(WAIT_TIME.MEDIUM);
  }

  function setDocumentDates(issueDay, dueDay) {
    cy.log(`--- Selecting Issue Day: ${issueDay} ---`);
    cy.contains('label', 'Issue Date')
      .next('button')
      .click({ force: true });

    cy.get('button[role="gridcell"]')
      .contains(issueDay)
      .click({ force: true });
      
    cy.wait(WAIT_TIME.SHORT);

    cy.log(`--- Selecting Due Day: ${dueDay} ---`);
    cy.contains('label', 'Due Date')
      .next('button')
      .click({ force: true });

    cy.get('button[role="gridcell"]')
      .contains(dueDay)
      .click({ force: true });
    
    cy.wait(WAIT_TIME.SHORT);
  }

  function setAssignedToRandomly() {
    cy.log('--- Picking a random user ---');

    cy.contains('label', 'Assigned To')
      .siblings('div')
      .find('button[role="combobox"]')
      .click({ force: true });

    cy.get('[role="option"]')
      .should('have.length.at.least', 1)
      .then(($options) => {
        const randomIndex = Math.floor(Math.random() * $options.length);
        const selectedUser = $options[randomIndex].innerText;
        
        cy.log(`Selected User: ${selectedUser}`);
        
        cy.wrap($options[randomIndex]).click({ force: true });
      });
  }

  function setSupplierRandomly() {
    cy.log('--- Picking a random Supplier ---');

    cy.contains('label', 'Supplier')
      .next('div')
      .find('button[role="combobox"]')
      .click({ force: true });

    cy.get('[role="option"]')
      .should('have.length.at.least', 1)
      .then(($options) => {
        const randomIndex = Math.floor(Math.random() * $options.length);
        const selectedSupplier = $options[randomIndex].innerText;
        
        cy.log(`Selected Supplier: ${selectedSupplier}`);
        
        cy.wrap($options[randomIndex]).click({ force: true });
      });
      
    cy.wait(WAIT_TIME.SHORT);
  }

  function setRandomReference() {
    cy.log('--- Generating Random Reference ---');

    const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const firstLetter = letters.charAt(Math.floor(Math.random() * letters.length));
    const randomNumbers = Math.floor(1000000 + Math.random() * 9000000);
    const referenceValue = `${firstLetter}${randomNumbers}`;

    cy.log(`Reference Generated: ${referenceValue}`);

    cy.contains('label', 'Reference')
      .next('div')
      .find('input')
      .clear({ force: true })
      .type(referenceValue, { delay: 50, force: true });  
  }

  function clickGenerateInvoice() {
    cy.log('--- Clicking Generate Invoice ---');

    cy.contains('button', 'Generate Invoice')
      .should('be.visible')
      .click({ force: true });
      
    cy.wait(WAIT_TIME.MEDIUM);
  }

  function goBackToDashboard() {
    cy.log('--- Closing Document Builder ---');

    cy.get('button')
      .find('svg.lucide-x')
      .parent('button')
      .click({ force: true });

    cy.contains('Documents', { timeout: 10000 }).should('be.visible');
  }
  
});