import { test, expect } from '@playwright/test';
import { AUTH_STATE_PATH } from './constants';

test.describe('Route Protection - Unauthenticated', () => {
  test('should redirect /dashboard to /login when not authenticated', async ({
    page,
  }) => {
    await page.context().clearCookies();

    await page.goto('/dashboard');

    await expect(page).toHaveURL(/\/login/, { timeout: 10_000 });

    await expect(
      page.locator('[data-slot="card-title"]')
    ).toBeVisible();
  });

  test('should redirect / to /login when not authenticated', async ({
    page,
  }) => {
    await page.context().clearCookies();

    await page.goto('/');

    await expect(page).toHaveURL(/\/login/, { timeout: 10_000 });
  });

  test('should redirect unknown routes to /login when not authenticated', async ({
    page,
  }) => {
    await page.context().clearCookies();

    await page.goto('/some-nonexistent-route');

    await expect(page).toHaveURL(/\/login/, { timeout: 10_000 });
  });
});

test.describe('Route Protection - Authenticated', () => {
  test.use({ storageState: AUTH_STATE_PATH });

  test('should redirect /login to /dashboard when already authenticated', async ({
    page,
  }) => {
    await page.goto('/login');

    await expect(page).toHaveURL(/\/dashboard/, { timeout: 10_000 });

    await expect(page.getByText('User Information')).toBeVisible();
  });

  test('should redirect / to /dashboard when authenticated', async ({
    page,
  }) => {
    await page.goto('/');

    await expect(page).toHaveURL(/\/dashboard/, { timeout: 10_000 });
  });

  test('should redirect unknown routes to /dashboard when authenticated', async ({
    page,
  }) => {
    await page.goto('/nonexistent-page');

    await expect(page).toHaveURL(/\/dashboard/, { timeout: 10_000 });
  });
});
