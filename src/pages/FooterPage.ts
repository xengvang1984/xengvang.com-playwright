import { Locator, type Page, expect } from '@playwright/test';
import { NavigationPage } from './NavigationPage';
import { BasePage } from './BasePage';

// Expected legal text
const EXPECTED_LEGAL_TEXT = '© 2025 xengvang.com. All rights reserved.';

// Expected additional legal text
const EXPECTED_ADDITIONAL_LEGAL_TEXT = 'Images, trademarks, and logos used on this page are the property of their respective owners. All rights reserved.';

/**
 * Page object model for the Footer page.
 */
export class FooterPage extends BasePage {
  readonly page: Page;
  readonly navigationPage: NavigationPage;
  readonly legalText: Locator;
  readonly additionalLegalText: Locator;
  

  constructor(page: Page) {
    super(page);
    this.page = page;
    this.navigationPage = new NavigationPage(page);
    this.legalText = page.getByTestId('footer-legal-text');
    this.additionalLegalText = page.getByTestId('additional-footer-legal-text');
  }

  /**
   * Verifies that the footer has the correct legal text.
   */
  async verifyLegalText() {
    await this.waitUntilPageLoaded();
    const legalTextContent = await this.legalText.textContent();
    expect(legalTextContent).toBe(EXPECTED_LEGAL_TEXT);
  }

  /**
   * Verifies that the footer has the correct additional legal text.
   * @param isVisible - Whether the additional legal text is expected to be visible.
   */
  async verifyAdditionalLegalText(isVisible: boolean) {
    await this.waitUntilPageLoaded();
    if (isVisible) {
      const additionalLegalTextContent = await this.additionalLegalText.textContent();
      expect(additionalLegalTextContent).toBe(EXPECTED_ADDITIONAL_LEGAL_TEXT);
    } else {
      await expect(this.additionalLegalText).toBeHidden({ timeout: 5000 });
    }
  }

}