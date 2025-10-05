import { type Page, expect } from '@playwright/test';
import { getBaseUrl } from '../helpers/baseUrlHelper';

/**
 * Page object model for the base page.
 * This will contain common methods and properties shared across all pages.
 */
export class BasePage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
    
  }

  /**
   * Navigates to the base URL of the application.
   */
  async goToHomePage() {
    await this.page.goto(getBaseUrl());
    await this.waitUntilPageLoaded();
  }

  /**
   * Waits until the page is fully loaded.
   */
  async waitUntilPageLoaded() {
    await this.page.waitForLoadState('load');
  }

  /**
   * This is highly discouraged in favor of more deterministic waits. 
   * Only used when there is no other option.
   * Forces the page to wait for a specified number of seconds.
   * @param ms - Number of milliseconds to wait.
   */
  async forceWaitMs(ms: number) {
    await this.page.waitForTimeout(ms);
  }

  /**
   * Navigates to a subpage off the base url.
   * @param subPage - The subpage to navigate to off the base url (e.g., /'about-me', /'education').
   */
  async goToSubPage(subPage: string) {
    await this.page.goto(`${getBaseUrl()}/${subPage}`);
    await this.waitUntilPageLoaded();
  }

  /**
   * Verifies the page title against the expected title.
   * @param expectedTitle - The expected title of the page to verify against.
   */
  async verifyPageTitleHasTitle(expectedTitle: string) {
    await this.waitUntilPageLoaded(); // Ensure the page is fully loaded
    let title = await this.page.title();
    let retries = 3;
    while (title !== expectedTitle && retries > 0) {
      await this.forceWaitMs(500); // Wait for 500 milliseconds before retrying
      title = await this.page.title();
      retries--;
    }
    expect(title).toBe(expectedTitle);
  }

  /**
   * Verifies the current URL against the expected URL.
   * @param url - The expected URL or base URL + URL to verify against current URL.
   * @param isAddPrefixBaseUrl - Whether to prefix the URL with the base URL. Default is true.
   */
  async verifyCurrentUrl(url: string, isAddPrefixBaseUrl: boolean = true) {
    await this.waitUntilPageLoaded();
    const currentUrl = this.page.url();
    if (isAddPrefixBaseUrl) {
      const baseUrl = getBaseUrl();
      expect(currentUrl).toBe(`${baseUrl}/${url}`);
    } else {
      expect(currentUrl).toBe(url);
    }
  }

}