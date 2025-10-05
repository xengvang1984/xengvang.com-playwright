import { expect, type Locator, type Page } from '@playwright/test';
import { NavigationHeaderLinkText } from '../types/navigationHeaderLinkText';
import { BasePage } from './BasePage';

/**
 * Page object model for the navigation page.
 */
export class NavigationPage extends BasePage {
  readonly page: Page;
  readonly aboutMeLink: Locator;
  readonly professionalExperienceLink: Locator;
  readonly educationLink: Locator;
  readonly interestsLink: Locator;
  readonly linkedInFloatingIcon: Locator;
  readonly emailFloatingIcon: Locator;

  constructor(page: Page) {
    super(page);
    this.page = page;
    this.aboutMeLink = page.getByTestId('about-link');
    this.professionalExperienceLink = page.getByTestId('experience-link');
    this.educationLink = page.getByTestId('education-link');
    this.interestsLink = page.getByTestId('interests-link');
    this.linkedInFloatingIcon = page.getByTestId('linkedin-icon');
    this.emailFloatingIcon = page.getByTestId('email-icon');
  }

  /**
   * Clicks on a navigation header link.
   * @param navigationHeaderLinkText - The navigation header link text to click.
   * @throws Will throw an error if the navigation header link text is invalid.
   */
  async clickNavigationLink(navigationHeaderLinkText: NavigationHeaderLinkText) {
    switch (navigationHeaderLinkText) {
      case NavigationHeaderLinkText.ABOUT_ME:
        await this.aboutMeLink.click();
        break;
      case NavigationHeaderLinkText.PROFESSIONAL_EXPERIENCE:
        await this.professionalExperienceLink.click();
        break;
      case NavigationHeaderLinkText.EDUCATION:
        await this.educationLink.click();
        break;
      case NavigationHeaderLinkText.INTERESTS:
        await this.interestsLink.click();
        break;
      default:
        throw new Error(`Invalid navigation header link text: ${navigationHeaderLinkText}. Allowable values are: ${Object.values(NavigationHeaderLinkText).join(", ")}`);
    }
  }

  /**
   * Clicks on the LinkedIn floating icon.
   */
  async clickLinkedInIcon() {
    await this.waitUntilPageLoaded();
    await this.linkedInFloatingIcon.click();
  }

  /**
   * Clicks on the email floating icon.
   */
  async clickEmailIcon() {
    await this.waitUntilPageLoaded();
    await this.emailFloatingIcon.click();
  }

  /**
   * Verifies that the navigation header links have the correct text.
   */
  async verifyNavigationLinkText() {
    await this.waitUntilPageLoaded();
    await expect(this.aboutMeLink).toHaveText(NavigationHeaderLinkText.ABOUT_ME);
    await expect(this.professionalExperienceLink).toHaveText(NavigationHeaderLinkText.PROFESSIONAL_EXPERIENCE);
    await expect(this.educationLink).toHaveText(NavigationHeaderLinkText.EDUCATION);
    await expect(this.interestsLink).toHaveText(NavigationHeaderLinkText.INTERESTS);
  }
}