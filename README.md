# Coreloops Automation Test

This project contains Cypress automated tests for the Coreloops Document Workflow.

##  Important: Authentication Instructions

The application uses a **Magic Link / OTP** login system, which prevents fully automated login (since robots cannot access email securely). 

To handle this, I have implemented a **Semi-Automated Login Flow**:

1. **Run the Test:**
   ```bash
   npx cypress open
   Select the Test:

2. Click on E2E Testing.

Select the test file (e.g., manual_workflow.cy.js).

3. Handle the Login Pause:

The test will launch the browser and check if you are logged in.

If not, it will PAUSE at the login screen.

ACTION: Manually enter your email and the OTP code.

RESUME: Once you see the Dashboard, click the Resume (Play ) button in the Cypress Test Runner.

Automation Execution:

The test will then automatically proceed to verify the "Manual Upload" and "Document Approval" workflows.