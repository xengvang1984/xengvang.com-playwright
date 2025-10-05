import { Locator, type Page, expect } from '@playwright/test';
import { NavigationPage } from './NavigationPage';
import { BasePage } from './BasePage';
import { ImageValidation } from '../types/imageValidation';


// Expected Floating contact icon images
const EXPECTED_FLOATING_CONTACT_ICON_IMAGES: Array<ImageValidation> = [
  {
    alt: 'Xeng Vang GitHub Profile',
    src: '/images/github.png',
    class: 'white-png-background',
  },
  {
    alt: 'Xeng Vang LinkedIn Profile',
    src: '/images/linkedin.png',
    class: 'white-png-background',
  },
  {
    alt: 'Email Xeng Vang',
    src: '/images/email.png',
    class: 'white-png-background',
  },
];

const EXPECTED_FLOATING_CONTACT_ICON_LINKS: Array<string> = [
  'https://github.com/xengvang1984',
  'https://www.linkedin.com/in/xeng-vang-55977613',
  'mailto:professional_xeng_vang@outlook.com'
];


/**
 * Page object model for the Header page.
 */
export class HeaderPage extends BasePage {
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
   * Verifies that the header has the correct floating contact icons with images and links.
   */
  async verifyContractsFloatingIcons() {
    await this.waitUntilPageLoaded();
    const floatingContactIconSection = this.page.getByTestId('top-nav-contact-container');
    const floatingContactIconImages = floatingContactIconSection.locator('img'); 
    const floatingContactIconLinks = floatingContactIconSection.locator('a');

    const iconCount = await floatingContactIconImages.count();
    expect(iconCount).toBe(EXPECTED_FLOATING_CONTACT_ICON_IMAGES.length);

    for (let i = 0; i < iconCount; i++) {
      const image = floatingContactIconImages.nth(i);
      const link = floatingContactIconLinks.nth(i);

      const expectedImage = EXPECTED_FLOATING_CONTACT_ICON_IMAGES[i];
      const expectedLink = EXPECTED_FLOATING_CONTACT_ICON_LINKS[i];

      await expect(image).toHaveAttribute('src', expectedImage.src);
      await expect(image).toHaveAttribute('alt', expectedImage.alt);
      await expect(image).toHaveClass(expectedImage.class);
      await expect(link).toHaveAttribute('href', expectedLink);
    }
  }
}