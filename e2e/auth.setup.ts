import { test as setup, expect } from '@playwright/test';
import { TEST_USER, AUTH_STATE_PATH } from './constants';

/**
 * Setup: Log in via the UI and save the authenticated storage state
 * so other tests can reuse it without logging in again.
 */
setup('authenticate', async ({ page }) => {
  await page.goto('/login');

  await page.getByLabel('Email').fill(TEST_USER.email);
  await page.getByLabel('Password').fill(TEST_USER.password);

  await page.getByRole('button', { name: 'Sign In' }).click();

  await page.waitForURL('**/dashboard', { timeout: 10_000 });

  await expect(page.getByText('User Information')).toBeVisible();

  await page.context().storageState({ path: AUTH_STATE_PATH });
});
