import { test } from '@playwright/test';
import { ProfessionalExperiencePage } from '../src/pages/professionalExperiencePage';
import { NavigationPage } from '../src/pages/NavigationPage';
import { NavigationHeaderLinkText } from '../src/types/navigationHeaderLinkText';
import { FooterPage } from '../src/pages/FooterPage';


test.describe('Professional Experience Page Tests', { tag: ['@professional-experience', '@regression'] }, () => {
  let professionalExperiencePage: ProfessionalExperiencePage;
  let navigationPage: NavigationPage;
  let footerPage: FooterPage;

  test.beforeEach(async ({ page }) => {
    professionalExperiencePage = new ProfessionalExperiencePage(page);
    navigationPage = new NavigationPage(page);
    footerPage = new FooterPage(page);

    await professionalExperiencePage.goToHomePage();
    await navigationPage.clickNavigationLink(NavigationHeaderLinkText.PROFESSIONAL_EXPERIENCE);
  });

  test('Verify has correct page title and footer contents', { tag: '@professional-experience-title-verification' }, async ({ page }) => {
    await professionalExperiencePage.verifyPageTitle();
    await footerPage.verifyLegalText();
    await footerPage.verifyAdditionalLegalText(true);
  });

  test('Verify has correct URL', { tag: '@professional-experience-url-verification' }, async ({ page }) => {
    await professionalExperiencePage.verifyUrl();
  });

  test('Verify has correct header title', { tag: '@professional-experience-header-title-verification' }, async ({ page }) => {
    await professionalExperiencePage.verifyPageHeaderTitle();
  });

  test('Verify page slogan', { tag: '@professional-experience-slogan-verification' }, async ({ page }) => {
    await professionalExperiencePage.verifyPageSlogan();
  });

  test('Verify all the professional experiences', { tag: '@professional-experiences-verification' }, async ({ page }) => {
    await professionalExperiencePage.verifyProfessionalExperienceList();
  });

  test('Verify all the skills', { tag: '@professional-experience-skills-verification' }, async ({ page }) => {
    await professionalExperiencePage.verifySkillsList();
  });

});
