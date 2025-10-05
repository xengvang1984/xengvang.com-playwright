import { expect, type Locator, type Page } from '@playwright/test';
import { NavigationPage } from './NavigationPage';
import { BasePage } from './BasePage';
import { ImageValidation } from '../types/imageValidation';


// Expected page title
const EXPECTED_PAGE_TITLE = 'Xeng Vang - Personal Interests & Interests Outside of Work';

// Expected page header title
const EXPECTED_PAGE_HEADER_TITLE = 'Interests';

// Expected page slogan
const EXPECTED_PAGE_SLOGAN = 'Exploring Beyond the Workplace';

// Expected sub URL
const EXPECTED_SUB_URL = 'interests';

// Expected interest titles
const INTEREST_TITLES = [
  'Volleyball',
  'Travel',
  "There's more to me:",
];

// Expected interest images
const INTEREST_IMAGES: Array<ImageValidation> = [
  {
    alt: 'Volleyball Image',
    src: '/images/volleyball.png',
    class: 'white-png-background image-float-right',
  },
  {
    alt: 'Travel Image',
    src: '/images/travel.png',
    class: 'white-png-background image-float-right',
  },
  {
    alt: 'Other Activities Image',
    src: '/images/interests.png',
    class: 'white-png-background image-float-right',
  },
];

/**
 * Page object model for the Interests page.
 */
export class InterestsPage extends BasePage {
  readonly page: Page;
  readonly navigationPage: NavigationPage;
  readonly pageHeaderTitle: Locator;
  readonly pageSlogan: Locator;

  constructor(page: Page) {
    super(page);
    this.page = page;
    this.navigationPage = new NavigationPage(page);
    this.pageHeaderTitle = this.page.getByTestId('interest-title').locator('h1');
    this.pageSlogan = this.page.getByTestId('interest-slogan').locator('h2');
  }

  /**
   * Navigates directly to the Interests page.
   */
  async goTo() {
    await this.goToSubPage(EXPECTED_SUB_URL);
  }

  /**
   * Verifies that the current URL is correct.
   */
  async verifyUrl() {
    await this.waitUntilPageLoaded();
    await this.verifyCurrentUrl(EXPECTED_SUB_URL);
  }

  /**
   * Verifies that the page has the correct title.
   */
  async verifyPageTitle() {
    await this.waitUntilPageLoaded();
    await this.verifyPageTitleHasTitle(EXPECTED_PAGE_TITLE);
  }

  /**
   * Verifies that the page has the correct header title.
   */
  async verifyPageHeaderTitle() {
    await this.waitUntilPageLoaded();
    const pageHeaderTitleText = await this.pageHeaderTitle.textContent();
    expect(pageHeaderTitleText).toBe(EXPECTED_PAGE_HEADER_TITLE);
  }

  /**
   * Verifies that the page has the correct slogan.
   */
  async verifyPageSlogan() {
    await this.waitUntilPageLoaded();
    const pageSloganText = await this.pageSlogan.textContent();
    expect(pageSloganText).toBe(EXPECTED_PAGE_SLOGAN);
  }

  /**
   * Verifies that the page has the correct interest titles.
   */
  async verifyInterestTitles() {
    await this.waitUntilPageLoaded(); 
    for (const titleIndex in INTEREST_TITLES) {
      const testIdIndex = Number(titleIndex) + 1;
      const interestTitle = await this.page.getByTestId(`interest-title-${testIdIndex}`).textContent();
      expect(interestTitle).toBe(`${INTEREST_TITLES[titleIndex]}`);
    }
  }

  /**
   * Verifies that the page has the correct interest images.
   */
  async verifyInterestImages() {
    await this.waitUntilPageLoaded();
    for (const imageIndex in INTEREST_IMAGES) {
      const testIdIndex = Number(imageIndex) + 1;
      const image = INTEREST_IMAGES[imageIndex];
      const imageLocator = this.page.getByTestId(`interest-image-${testIdIndex}`);
      await expect(imageLocator).toHaveAttribute('alt', image.alt);
      await expect(imageLocator).toHaveAttribute('src', image.src);
      await expect(imageLocator).toHaveClass(image.class);
    }
  }
}