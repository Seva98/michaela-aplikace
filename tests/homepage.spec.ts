import test from '@playwright/test';
import { auth0Login } from './helpers/auth';

test.beforeEach(async ({ page }) => {
  await page.goto('/');
});

test('should open homepage with login', async ({ page }) => {
  // Check for h2 header "Michaela Ševčík"
  await page.waitForSelector('h2:has-text("Michaela Ševčík")');

  // Check for menu items "OSOBNÍ TRÉNINKY PLZEŇ" and "O MNĚ"
  await page.waitForSelector('h5:has-text("OSOBNÍ TRÉNINKY PLZEŇ")');
  await page.waitForSelector('h5:has-text("O MNĚ")');

  // Check for button with text "PŘIHLÁSIT SE"
  await page.waitForSelector('button:has-text("Příhlásit se")');
});

test('should login', async ({ page, context }) => {
  const cookies = await auth0Login(page);
  await context.addCookies(cookies);

  await page.goto('/');
});
