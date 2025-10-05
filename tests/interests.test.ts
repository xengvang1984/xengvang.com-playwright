import { test } from '@playwright/test';
import { NavigationPage } from '../src/pages/NavigationPage';
import { FooterPage } from '../src/pages/FooterPage';
import { InterestsPage } from '../src/pages/InterestsPage';


test.describe('Interests Page Tests', { tag: ['@interests', '@regression'] }, () => {
  let interestsPage: InterestsPage;
  let navigationPage: NavigationPage;
  let footerPage: FooterPage;

  test.beforeEach(async ({ page }) => {
    interestsPage = new InterestsPage(page);
    navigationPage = new NavigationPage(page);
    footerPage = new FooterPage(page);
    await interestsPage.goTo();
  });

  test('Verify has correct page title and footer contents', { tag: '@interests-title-verification' }, async ({ page }) => {
    await interestsPage.verifyPageTitle();
    await footerPage.verifyLegalText();
    await footerPage.verifyAdditionalLegalText(false);
  });

  test('Verify has correct URL', { tag: '@interests-url-verification' }, async ({ page }) => {
    await interestsPage.verifyUrl();
  });

  test('Verify has correct header title', { tag: '@interests-header-title-verification' }, async ({ page }) => {
    await interestsPage.verifyPageHeaderTitle();
  });

  test('Verify page slogan', { tag: '@interests-slogan-verification' }, async ({ page }) => {
    await interestsPage.verifyPageSlogan();
  });

  test('Verify all the interest titles', { tag: '@interests-verification' }, async ({ page }) => {
    await interestsPage.verifyInterestTitles();
  });

  test('Verify all the interest images', { tag: '@interests-images-verification' }, async ({ page }) => {
    await interestsPage.verifyInterestImages();
  });

});
