import { Locator, type Page, expect } from '@playwright/test';
import { NavigationPage } from './NavigationPage';
import { BasePage } from './BasePage';
import { ImageValidation } from '../types/imageValidation';

// Expected page title
const EXPECTED_PAGE_TITLE = 'Xeng Vang - Certifications & Education';

// Expected page header title
const EXPECTED_PAGE_HEADER_TITLE = 'Education';

// Expected page slogan
const EXPECTED_PAGE_SLOGAN = 'Empowering Minds Through Knowledge';

// Expected sub URL
const EXPECTED_SUB_URL = 'education';

const EXPECTED_CERTIFICATION_IMAGES: Array<ImageValidation> = [
  {
    alt: 'ASTQB Certification Image',  
    src: '/images/astqb-certification.svg',
    class: 'white-png-background',
  },
  {
    alt: 'Java Professional Programming Certification Image',  
    src: '/images/madison-college-java-certification.png',
    class: 'white-png-background',
  },
  {
    alt: 'CompTIA A+ Certification Image',  
    src: '/images/comptia-a-plus-certification.png',
    class: 'white-png-background',
  },
  {
    alt: 'Microsoft Certified Professional Certification Image',  
    src: '/images/mcp-certification.gif',
    class: 'white-png-background',
  },
  {
    alt: 'Novell Certification Image',  
    src: '/images/novell-certification.jpg',
    class: 'white-png-background',
  },
];

const EXPECTED_EDUCATION_EXPERIENCES = [
  {
    degree: 'IT Java Professional Developer Certificate Program',
    institution: 'Madison College',
    graduationDate: 'Certificate Obtained',
  },
  {
    degree: 'AS Computer Science',
    institution: 'Herzing University',
    graduationDate: 'Completed One Year',
  },
  {
    degree: 'AS Computer Science',
    institution: 'Kaplan University',
    graduationDate: 'Completed One Semester',
  },
];

/**
 * Page object model for the Education page.
 */
export class EducationPage extends BasePage {
  readonly page: Page;
  readonly navigationPage: NavigationPage;
  readonly pageHeaderTitle: Locator;
  readonly pageSlogan: Locator;
  readonly certificationImages: Locator;

  constructor(page: Page) {
    super(page);
    this.page = page;
    this.navigationPage = new NavigationPage(page);
    this.pageHeaderTitle = page.getByTestId('education-title').locator('h1');
    this.pageSlogan = page.getByTestId('education-slogan').locator('h2');
    this.certificationImages = page.getByTestId('education-certifications-logos').locator('img');
  }

  /**
   * Navigates directly to the Education page.
   */
  async goTo() {
    await this.goToSubPage(EXPECTED_SUB_URL);
    await this.verifyUrl();
  }

  /**
   * Verifies that the current URL is correct.
   */
  async verifyUrl() {
    await this.waitUntilPageLoaded();
    await this.verifyCurrentUrl(EXPECTED_SUB_URL);
  }

  /**
   * Verify that the page title is correct.
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
    await expect(this.pageSlogan).toHaveText(EXPECTED_PAGE_SLOGAN);
  }

  /**
   * Verifies that all the certification images are displayed correctly.
   */
  async verifyCertificationImages() {
    await this.waitUntilPageLoaded();
    const imageLogos = await this.certificationImages.all();
    for (const imageLogoIndex in imageLogos) {
      const imageLogo = imageLogos[imageLogoIndex];
      const expectedImage = EXPECTED_CERTIFICATION_IMAGES[imageLogoIndex];
      await expect(imageLogo).toHaveAttribute('alt', expectedImage.alt);
      await expect(imageLogo).toHaveAttribute('src', expectedImage.src);
      await expect(imageLogo).toHaveClass(expectedImage.class);
    }
  }

  /**
   * Verifies that the education experience list contains the expected experiences.
   */
  async verifyEducationExperienceList() {
    await this.waitUntilPageLoaded();
    const educationExperienceList = await this.page.getByTestId('education-experience-list').locator('li');
    for (const experienceIndex in EXPECTED_EDUCATION_EXPERIENCES) {
      const testIdIndex = Number(experienceIndex) + 1;
      const schoolName = await this.page.getByTestId(`education-school-name-${testIdIndex}`).textContent();
      const certificationDegree = await this.page.getByTestId(`education-school-degree-${testIdIndex}`).textContent();
      const status = await this.page.getByTestId(`education-school-status-${testIdIndex}`).textContent();

      expect(schoolName).toBe(EXPECTED_EDUCATION_EXPERIENCES[experienceIndex].institution);
      expect(certificationDegree).toBe(`Degree/Certificate: ${EXPECTED_EDUCATION_EXPERIENCES[experienceIndex].degree}`);
      expect(status).toBe(`Status: ${EXPECTED_EDUCATION_EXPERIENCES[experienceIndex].graduationDate}`);
    }
  }
}