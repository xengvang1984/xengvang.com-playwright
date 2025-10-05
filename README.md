# Summary
This is the test suite for [xengvang.com](https://xengvang.com/).

# How to setup and run the whole test suite
1. Clone the repository: `git clone https://github.com/xengvang1984/xengvang.com-playwright.git`
2. Set the `TEST_ENVIRONMENT` environment variable in the .env file (Available options: `local`, `development`, `qa`, `staging`, `production`)
3. Run `npm install` from the root directory
4. Run `npm test` from the root directory

# How to run the tests individually using Playwright VS Code Plugin
1. Click the Extensions menu
2. Type in `Playwright Test for VSCode`
3. Install the **Playwright Test for VSCode** extension
4. After installation of the extension, click the Testing menu (It looks like a experiment mixing container) to view all available tests.
5. If installed properly, you should green play buttons next to each test. Click the play button to run the test.

# How to run the tests with the specified tag
1. Run this command from the root directory `npx playwright test --grep @tag_name`. Replace @tag_name with your tag name on your tests.

