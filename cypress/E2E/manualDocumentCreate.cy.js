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
    cy.wait(WAIT_TIME.MEDIUM);

    cy.get('button[id^="radix-"]').eq(1).click({ force: true });
    cy.contains('Documents').should('be.visible').click({ force: true });
  });

  afterEach(() => {
    // Close any open modals
    cy.get('body').type('{esc}');
    cy.wait(WAIT_TIME.MEDIUM);
    cy.get('body').type('{esc}');
    cy.wait(WAIT_TIME.MEDIUM);
  });

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

  it('TC-02: Create Invoice with Minimal Fields', () => {
    cy.contains('button', 'Add').should('be.visible').click();
    cy.contains('[role="menuitem"], button', 'Add New').click({ force: true });
    cy.contains('Create Manually').should('be.visible').click();
    
    selectDocumentType('Invoice');
    
    cy.contains('button', 'Add Line Item').click();
    
    cy.get('[data-index="0"]').contains('Enter title').click({ force: true });
    cy.get('[data-index="0"]').find('textarea, input').first()
      .type('Minimal Item', { force: true });
    cy.get('[data-index="0"]').find('[role="checkbox"]').first().click({ force: true });
    
    cy.log('Selecting Cost Code...');
    cy.get('[data-index="0"]')
      .find('button[role="combobox"], button:contains("Select")')
      .first().click({ force: true });
    cy.get('[role="option"]').first().click({ force: true });
    cy.get('body').type('{esc}');
    cy.get('[role="listbox"]').should('not.exist');
    cy.get('[data-index="0"]').first().click(5, 5, { force: true });
    
    setQuantity(1);
    setRate(20000);
    
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
    
    // Cancel instead of generating
    goBackToDashboard();
  });

  // ==================== HELPER FUNCTIONS ====================

  function setQuantity(value) {
    cy.get('body').type('{esc}');
    
    cy.log('Opening Quantity field via hash icon...');
    cy.get('svg.lucide-hash').first().parent().click({ force: true });
    cy.wait(WAIT_TIME.SHORT);
    
    cy.log('Typing in the quantity field...');
    cy.focused().type('{selectall}' + String(value)); // FIXED: Use {selectall} instead of .clear()
    
    cy.get('body').type('{esc}');
    cy.log('Clicking outside to save...');
    cy.get('body').click(CLICK_POSITION.x, CLICK_POSITION.y, { force: true });
    cy.wait(WAIT_TIME.MEDIUM);
    
    cy.log('Verifying saved value...');
    cy.contains(String(value)).should('be.visible');
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
    
    cy.log('Opening rate field via icon...');
    cy.contains('£0.00').click({ force: true });
    cy.wait(WAIT_TIME.SHORT);
    
    cy.log('Entering rate value...');
    cy.focused().type('{selectall}' + String(amount)); // FIXED: Use {selectall} instead of .clear()
    
    cy.get('body').type('{esc}');
    cy.log('Clicking outside to save...');
    cy.get('body').click(CLICK_POSITION.x, CLICK_POSITION.y, { force: true });
    cy.wait(WAIT_TIME.MEDIUM);
    
    cy.log('Verifying rate value...');
    cy.contains('20,000').should('be.visible');
  }

  function setVATRate(percentage) {
    cy.get('body').type('{esc}');
    
    cy.log('Opening VAT rate dropdown...');
    cy.contains('p', '0%').click({ force: true });
    cy.wait(WAIT_TIME.SHORT);
    
    cy.get('body').type('{esc}');
    
    cy.log(`Selecting VAT rate: ${percentage}`);
    cy.contains(percentage).click({ force: true });
    cy.wait(WAIT_TIME.MEDIUM);
    
    cy.log(`Verifying VAT rate: ${percentage}`);
    cy.contains('p', percentage).should('be.visible');
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
      .type(referenceValue, { force: true });
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