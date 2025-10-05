import { test } from '@playwright/test';
import { NavigationPage } from '../src/pages/NavigationPage';
import { NavigationHeaderLinkText } from '../src/types/navigationHeaderLinkText';
import { EducationPage } from '../src/pages/EducationPage';
import { FooterPage } from '../src/pages/FooterPage';
import { HeaderPage } from '../src/pages/HeaderPage';


test.describe('Education Experience Page Tests', { tag: ['@education-experience', '@regression'] }, () => {
  let educationExperiencePage: EducationPage;
  let navigationPage: NavigationPage;
  let footerPage: FooterPage;
  let headerPage: HeaderPage;

  test.beforeEach(async ({ page }) => {
    educationExperiencePage = new EducationPage(page);
    navigationPage = new NavigationPage(page);
    footerPage = new FooterPage(page);
    headerPage = new HeaderPage(page);
    await educationExperiencePage.goToHomePage();
    await navigationPage.clickNavigationLink(NavigationHeaderLinkText.EDUCATION);
  });

  test('Verify has correct page title, header, and footer contents', { tag: '@education-experience-title-verification' }, async ({ page }) => {
    await educationExperiencePage.verifyPageTitle();
    await headerPage.verifyContractsFloatingIcons();
    await footerPage.verifyLegalText();
    await footerPage.verifyAdditionalLegalText(true);
  });

  test('Verify has correct URL', { tag: '@education-experience-url-verification' }, async ({ page }) => {
    await educationExperiencePage.verifyUrl();
  });

  test('Verify has correct header title', { tag: '@education-experience-header-title-verification' }, async ({ page }) => {
    await educationExperiencePage.verifyPageHeaderTitle();
  });

  test('Verify page slogan', { tag: '@education-experience-slogan-verification' }, async ({ page }) => {
    await educationExperiencePage.verifyPageSlogan();
  });

  test('Verify all the education experiences', { tag: '@education-experiences-verification' }, async ({ page }) => {
    await educationExperiencePage.verifyEducationExperienceList();
  });

  test('Verify all the certification images', { tag: '@education-experience-certification-images-verification' }, async ({ page }) => {
    await educationExperiencePage.verifyCertificationImages();
  });

});
