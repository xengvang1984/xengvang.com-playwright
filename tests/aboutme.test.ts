import { test } from '@playwright/test';
import { AboutMePage } from '../src/pages/aboutMePage';
import { FooterPage } from '../src/pages/FooterPage';


test.describe('About Me Page Tests', { tag: ['@aboutme', '@regression'] }, () => {
  let aboutMePage: AboutMePage;
  let footerPage: FooterPage;

  test.beforeEach(async ({ page }) => {
    aboutMePage = new AboutMePage(page);
    footerPage = new FooterPage(page);
    await aboutMePage.goTo();
  });

  test('Verify has correct page title and footer contents', { tag: '@aboutme-title-verification' }, async ({ page }) => {
    await aboutMePage.verifyPageTitle();
    await footerPage.verifyLegalText();
    await footerPage.verifyAdditionalLegalText(false);
  });

  test('Verify has correct URL', { tag: '@aboutme-url-verification' }, async ({ page }) => {
    await aboutMePage.verifyUrl();
  });

  test('Verify all the paragraphs have correct text', { tag: '@aboutme-paragraph-verification' }, async ({ page }) => {
    await aboutMePage.verifyParagraphs();
  });

  test('Verify has correct name and location', { tag: '@aboutme-name-location-verification' }, async ({ page }) => {
    await aboutMePage.verifyNameAndLocation();
  });

  test('Verify has correct position titles', { tag: '@aboutme-position-title-verification' }, async ({ page }) => {
    await aboutMePage.verifyPositions();
  });

  test('Verify profile image', { tag: '@aboutme-profile-image-verification' }, async ({ page }) => {
    await aboutMePage.verifyProfileImage();
  });

});
