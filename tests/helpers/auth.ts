import { Page } from '@playwright/test';
import dotenv from 'dotenv';

export async function auth0Login(page: Page) {
  dotenv.config();

  const username = process.env.PLAYWRIGHT_USERNAME;
  const password = process.env.PLAYWRIGHT_PASSWORD;

  (await page.waitForSelector('button:has-text("Příhlásit se")')).click();

  await page.fill('input[name="username"]', username ?? 'NO ENV');
  await page.fill('input[name="password"]', password ?? 'NO ENV');
  await page.click('button:has-text("Continue")');

  await page.waitForURL('/');

  const cookies = await page.context().cookies();
  console.log(cookies);
  return cookies;
}
