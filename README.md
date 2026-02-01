 Project Overview
This repository contains a Cypress-based end-to-end testing suite designed to validate both the manual entry and the financial workflows within the Coreloops application. The primary focus of these tests is to ensure that manual document creation, downloading, approving, and marking documents as paid functions correctly across different user sessions.

Test Coverage
The suite is organized into two primary automated workflows:

Manual Document Creation: Verifies the process of inputting data, managing form fields, and successfully creating new document records.

Document Management: Validates the downstream workflow, including the approval process, file downloading, and the final "Mark as Paid" status update.

Technical Approach and Challenges
Authentication Strategy & Manual Resumption
During the development of this suite, I explored several methods to handle the application's passwordless Email OTP (One-Time Password) system.

Cookie Injection (Attempted): I initially attempted to bypass the login screen by injecting session cookies. However, the application's security tokens are highly dynamic and short-lived, making this method unstable.

The Manual Pause Method: To handle the OTP securely, I integrated a cy.pause() command into the login flow.

How it works: The test will automatically navigate to the login page and enter the email. It then pauses the execution.

User Action: You must manually enter the OTP code received in your email.

Resume: Once the code is entered and you are logged in, you must click the "Resume" button in the Cypress Runner to allow the rest of the automated test to finish.

GitHub Actions Integration
I have successfully integrated this project with GitHub Actions to establish a CI/CD pipeline (.github/workflows/cypress-ci.yml).

Note on CI Failures: The GitHub Actions checks will fail in the cloud environment. This is expected, as the automated runner cannot manually enter the OTP or "Resume" the test. This setup is provided to demonstrate the CI structure, while the logic is optimized for local execution.

Local Execution Instructions
To see the tests pass, run them locally:

Clone the repository:

git clone https://github.com/comfortowo/CoreloopsDocTest.git
Install dependencies:

Run & Resume: Start a test, input your OTP, and click Resume in the Cypress UI to continue the automation.