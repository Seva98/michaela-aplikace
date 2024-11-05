import test from '@playwright/test';
import { auth0Login } from './helpers/auth';
import { createUser } from './helpers/createUser';

test('should login', async ({ page, context }) => {
  const cookies = await auth0Login(page);
  await context.addCookies(cookies);
});

test('should open homepage ', async ({ page }) => {
  await page.goto('/');

  await page.waitForSelector('h2:has-text("Michaela Ševčík")');
  await page.waitForSelector('h5:has-text("OSOBNÍ TRÉNINKY PLZEŇ")');
  await page.waitForSelector('h5:has-text("O MNĚ")');
});

test('should create clients', async ({ page, context }) => {
  const cookies = await auth0Login(page);
  await context.addCookies(cookies);

  // Click on "Přidat klienta" on homepage
  await page.click('[data-testid="create-client-homepage"]');

  await createUser(page, {
    firstname: 'Test',
    lastname: 'Subject',
    email: 'test@subject.com',
    address: 'Test 1, Testville',
    birthday: '1981-01-01',
    phone: '+420111111111',
    bio: 'Test bio',
  });

  // Click on "Klienti" menu
  await page.click('a:has-text("Klienti")');
  // Click on "Přidat klienta" on subpage
  await page.click('[data-testid="create-client-subpage"]');

  await createUser(page, {
    firstname: 'Test2',
    lastname: 'Subject2',
    email: 'test2@subject.com',
    address: 'Test 2, Testville',
    birthday: '1982-01-01',
    phone: '+420222222222',
    bio: 'Test bio',
  });

  // Click on PopUp menu
  await page.click('[data-testid="popup-menu"]');
  // Click on "Členství" menu
  await page.click('[data-testid="create-client-popup-menu"]');
});
