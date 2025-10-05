import { Locator, type Page, expect } from '@playwright/test';
import { NavigationPage } from './NavigationPage';
import { BasePage } from './BasePage';


// Expected paragraph texts
const EXPECTED_PARAGRAPH_1_TEXT = 'My name is Xeng Vang, and I am a seasoned Senior SDET and Software Quality Assurance Leader with over 15 years of proven experience driving quality, efficiency, and innovation within complex technology ecosystems. Throughout my career, I have specialized in architecting test automation strategies, leading cross-functional teams, and transforming quality engineering practices to help organizations scale with confidence and operational excellence. I currently reside in Sun Prairie, Wisconsin, with my wife and our two young sons.';
const EXPECTED_PARAGRAPH_2_TEXT = 'Having spent more than three decades in Madison, Wisconsin, I remain closely connected to the community where my family roots run deep. These strong family ties have grounded my values of integrity, perseverance, and collaboration—principles that continue to guide my leadership approach. Family gatherings, often centered around barbecues and competitive volleyball and basketball games, reflect the same spirit of teamwork and resilience that I bring into my professional life.';
const EXPECTED_PARAGRAPH_3_TEXT = "I began my technology career in 2007, joining a startup of approximately ten employees. During this period, I played an integral role in the company's growth and eventual acquisition by Amazon, a Fortune 50 organization. I remained with Amazon for several years following the acquisition, gaining invaluable exposure to operating at enterprise scale while strengthening my passion for quality engineering, process optimization, and continuous improvement.";
const EXPECTED_PARAGRAPH_4_TEXT = 'This trajectory has led me to my current role as Senior SDET at Hrvyst, where I lead their test automation strategy and quality engineering initiative since October 2024. My career spans diverse industries—including financial services, AI-driven cancer diagnostics, and the wholesale food sector—where I have led test automation initiatives, modernized QA practices, and enabled engineering teams to deliver higher-quality software at scale.';
const EXPECTED_PARAGRAPH_5_TEXT = 'Beyond my technical leadership, I bring an entrepreneurial perspective shaped by my experience founding and operating Dane Fleet Services Inc. in 2023. While the business closed after a year, the experience sharpened my operational acumen and strategic leadership skills. It reinforced one of my core philosophies: fail fast, learn quickly, and reallocate resources decisively. This mindset has been instrumental in my ability to guide teams and organizations through periods of rapid change and transformation.';
const EXPECTED_PARAGRAPH_6_TEXT = 'As I look to the future, I remain deeply committed to advancing quality engineering as a strategic driver of innovation and efficiency. My goal is to help organizations undergoing digital transformation build scalable, reliable, and future-ready technology foundations.';
const EXPECTED_PARAGRAPH_7_TEXT = 'Thank you for visiting my website. I look forward to connecting with executives, technologists, and change-makers who share a vision for operational excellence and transformative impact.';

// Expected name and location text
const EXPECTED_NAME_TEXT = 'Xeng Vang';
const EXPECTED_LOCATION_TEXT = 'Sun Prairie, WI';

// Expected position titles text
const EXPECTED_POSITIONS_TEXT = 'Senior SDET | QA Automation Engineer | Leader | Mentor | Entrepreneur';

// Expected page title
const EXPECTED_PAGE_TITLE = `${EXPECTED_NAME_TEXT} - ${EXPECTED_POSITIONS_TEXT}`;

// Expected profile image attributes
const EXPECTED_PROFILE_IMAGE_ALT = 'Xeng Vang Image';
const EXPECTED_PROFILE_IMAGE_CLASS = 'about-image';
const EXPECTED_PROFILE_IMAGE_SRC = '/images/xeng-vang.png';

// Expected sub URL
const EXPECTED_SUB_URL = 'about-me';

/**
 * Page object model for the About Me page.
 */
export class AboutMePage extends BasePage {
  readonly page: Page;
  readonly navigationPage: NavigationPage;
  readonly nameLocation: Locator;
  readonly positions: Locator;
  readonly aboutParagraph1: Locator;
  readonly aboutParagraph2: Locator;
  readonly aboutParagraph3: Locator;
  readonly aboutParagraph4: Locator;
  readonly aboutParagraph5: Locator;
  readonly aboutParagraph6: Locator;
  readonly aboutParagraph7: Locator;
  readonly profileImage: Locator;

  constructor(page: Page) {
    super(page);
    this.page = page;
    this.navigationPage = new NavigationPage(page);
    this.nameLocation = page.getByTestId('about-name-location');
    this.positions = page.getByTestId('about-positions');
    this.aboutParagraph1 = page.getByTestId('about-paragraph-1');
    this.aboutParagraph2 = page.getByTestId('about-paragraph-2');
    this.aboutParagraph3 = page.getByTestId('about-paragraph-3');
    this.aboutParagraph4 = page.getByTestId('about-paragraph-4');
    this.aboutParagraph5 = page.getByTestId('about-paragraph-5');
    this.aboutParagraph6 = page.getByTestId('about-paragraph-6');
    this.aboutParagraph7 = page.getByTestId('about-paragraph-7');
    this.profileImage = page.getByTestId('xeng-vang-image');
  }

  /**
   * Navigates directly to the About Me page.
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
   * Verify that the name and location are correct.
   * @param name 
   * @param location 
   */
  async verifyNameAndLocation() {
    await this.waitUntilPageLoaded();
    await expect(this.nameLocation).toHaveText(`${EXPECTED_NAME_TEXT} - ${EXPECTED_LOCATION_TEXT}`);
  }

  async verifyPositions() {
    await this.waitUntilPageLoaded();
    await expect(this.positions).toHaveText(EXPECTED_POSITIONS_TEXT);
  }

  /**
   * Verify that the paragraphs have the correct text.
   */
  async verifyParagraphs() {
    await this.waitUntilPageLoaded();
    await expect(this.aboutParagraph1).toHaveText(EXPECTED_PARAGRAPH_1_TEXT);
    await expect(this.aboutParagraph2).toHaveText(EXPECTED_PARAGRAPH_2_TEXT);
    await expect(this.aboutParagraph3).toHaveText(EXPECTED_PARAGRAPH_3_TEXT);
    await expect(this.aboutParagraph4).toHaveText(EXPECTED_PARAGRAPH_4_TEXT);
    await expect(this.aboutParagraph5).toHaveText(EXPECTED_PARAGRAPH_5_TEXT);
    await expect(this.aboutParagraph6).toHaveText(EXPECTED_PARAGRAPH_6_TEXT);
    await expect(this.aboutParagraph7).toHaveText(EXPECTED_PARAGRAPH_7_TEXT);
  }

  /**
   * Verify that the profile image is visible and has the correct attributes.
   */
  async verifyProfileImage() {
    await this.waitUntilPageLoaded();
    await expect(this.profileImage).toBeVisible();
    await expect(this.profileImage).toHaveAttribute('alt', EXPECTED_PROFILE_IMAGE_ALT);
    await expect(this.profileImage).toHaveAttribute('class', EXPECTED_PROFILE_IMAGE_CLASS);
    await expect(this.profileImage).toHaveAttribute('src', EXPECTED_PROFILE_IMAGE_SRC);
  }

}