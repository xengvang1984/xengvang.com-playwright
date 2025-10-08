import { Locator, type Page, expect } from '@playwright/test';
import { NavigationPage } from './NavigationPage';
import { BasePage } from './BasePage';
import { ProfessionalExperience } from '../types/professionalExperience';

// Expected page title
const EXPECTED_PAGE_TITLE = 'Xeng Vang - Professional Career & Experiences';

// Expected page header title
const EXPECTED_PAGE_HEADER_TITLE = 'Professional Experiences';

// Expected page slogan
const EXPECTED_PAGE_SLOGAN = 'Building Quality Through Experience';

// Expected skills list
const EXPECTED_SKILLS_LIST = [
  'Java',
  'JavaScript',
  'TypeScript',
  'Python',
  'Swift',
  'Ruby',
  '.NET',
  'PHP',
  'HTML',
  'CSS',
  'Selenium',
  'Appium',
  'Playwright',
  'Cypress',
  'Grafana K6',
  'JMeter',
  'Locust',
  'API Testing',
  'UI Testing',
  'Regression Testing',
  'Exploratory Testing',
  'Performance Testing',
  'Load Testing',
  'Black Box Testing',
  'White Box Testing',
  'Grey Box Testing',
  'React',
  'Svelte',
  'Android',
  'iOS',
  'TestNG',
  'JUnit',
  'Postgres',
  'Oracle',
  'MSSQL',
  'MySQL',
  'DynamoDB',
  'MongoDB',
  'Solr',
  'Apache Cassandra',
  'Windows',
  'Linux',
  'MacOS',
  'GitLab',
  'GitHub',
  'Kubernetes',
  'Docker',
  'Jenkins',
  'AWS',
  'Azure',
  'CI/CD',
  'Agile Scrum',
  'Kanban',
  'JIRA',
  'Confluence',
  'TestRail',
  'Postman',
  'Copilot',
  'ChatGPT'
];

// Expected professional experience list
const EXPECTED_PROFESSIONAL_EXPERIENCE_LIST: Array<ProfessionalExperience> = [
  {
    title: 'Senior SDET',
    company: "Hrvyst - RJ O'Brien | a StoneX Company",
    tenureDate: 'October 2024 - Present'
  },
  {
    title: 'Owner (100%)',
    company: 'Dane Fleet Services Inc.',
    tenureDate: 'August 2023 - September 2024 (Business Dissolved)'
  },
  {
    title: 'Senior QA Automation Engineer',
    company: 'GrubMarket',
    tenureDate: 'December 2022 - July 2023'
  },
  {
    title: 'Senior SDET',
    company: 'Paige',
    tenureDate: 'August 2021 - December 2022'
  },
  {
    title: 'Software QA Engineer I & II',
    company: 'Shopbop - An Amazon Subsidiary',
    tenureDate: 'April 2010 - May 2021'
  },
  {
    title: 'Technical Support I & II',
    company: 'Shopbop',
    tenureDate: 'February 2007 - March 2010'
  }
];

// Expected sub URL
const EXPECTED_SUB_URL = 'professional-experiences';

/**
 * Page object model for the Professional Experience page.
 */
export class ProfessionalExperiencePage extends BasePage {
  readonly page: Page;
  readonly navigationPage: NavigationPage;
  readonly pageHeaderTitle: Locator;
  readonly pageSlogan: Locator;
  readonly skillsList: Locator;

  constructor(page: Page) {
    super(page);
    this.page = page;
    this.navigationPage = new NavigationPage(page);
    this.pageHeaderTitle = page.getByTestId('experience-title').locator('h1');
    this.pageSlogan = page.getByTestId('experience-slogan').locator('h2');
    this.skillsList = page.getByTestId('skill-labels-section').locator('span.skill-label');
  }

  /**
   * Navigates directly to the Professional Experience page.
   */
  async goTo() {
    await this.goToSubPage(EXPECTED_SUB_URL);
    await this.verifyUrl()
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
    await expect(this.pageSlogan).toHaveText(EXPECTED_PAGE_SLOGAN);
  }

  /**
   * Verifies that the skills list contains the expected skills.
   */
  async verifySkillsList() {
    await this.waitUntilPageLoaded();
    await expect(this.skillsList).toHaveText(EXPECTED_SKILLS_LIST);
  }

  /**
   * Verifies that the professional experience list contains the expected experiences.
   */
  async verifyProfessionalExperienceList() {
    await this.waitUntilPageLoaded();
    for (const experienceIndex in EXPECTED_PROFESSIONAL_EXPERIENCE_LIST) {
      const testIdIndex = Number(experienceIndex) + 1;
      const experience = EXPECTED_PROFESSIONAL_EXPERIENCE_LIST[experienceIndex];
      const title = await this.page.getByTestId(`experience-position-${testIdIndex}`).textContent();
      const company = await this.page.getByTestId(`experience-company-${testIdIndex}`).textContent();
      const tenureDate = await this.page.getByTestId(`experience-dates-${testIdIndex}`).textContent();

      expect(title).toBe(experience.title);
      expect(company).toBe(experience.company);
      expect(tenureDate).toBe(experience.tenureDate);
    }
  }
}