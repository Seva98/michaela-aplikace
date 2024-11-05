import { Page } from '@playwright/test';

export const createUser = async (
  page: Page,
  user: {
    firstname: string;
    lastname: string;
    email: string;
    address: string;
    birthday: string;
    phone: string;
    bio: string;
  },
) => {
  const { firstname, lastname, email, address, birthday, phone, bio } = user;

  await page.fill('[data-testid="create-user-modal-firstname"]', firstname);
  await page.fill('[data-testid="create-user-modal-lastname"]', lastname);
  await page.fill('[data-testid="create-user-modal-email"]', email);
  await page.fill('[data-testid="create-user-modal-address"]', address);
  await page.fill('[data-testid="create-user-modal-birthday"]', birthday);
  await page.fill('[data-testid="create-user-modal-phone"]', phone);
  await page.fill('[data-testid="create-user-modal-bio"]', bio);
  await page.click('[data-testid="create-user-modal-submit"]');
};
