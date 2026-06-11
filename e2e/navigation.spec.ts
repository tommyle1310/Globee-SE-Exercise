import { test, expect } from '@playwright/test';
import { AUTH_STATE_PATH } from './constants';

test.describe('Route Protection - Unauthenticated', () => {
  test('System block when unauthorized user trying to access dashboard page via url', async ({
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

  test('The system redirects the user to the Not Found page when the user attempts to access a non-existent route.', async ({
    page,
  }) => {
    await page.context().clearCookies();

    await page.goto('/some-nonexistent-route');

    // Verify 404 text is visible
    await expect(page.getByRole('heading', { name: '404', level: 1 })).toBeVisible();
    await expect(page.getByText('Page Not Found')).toBeVisible();

    // Click Go Back Home
    await page.getByRole('button', { name: 'Go Back Home' }).click();

    // Verify redirect to login page
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

  test('Redirect user to dashboard when authenticated', async ({
    page,
  }) => {
    await page.goto('/');

    await expect(page).toHaveURL(/\/dashboard/, { timeout: 10_000 });
  });

  test('should show 404 page for unknown routes when authenticated, and go to dashboard on click', async ({
    page,
  }) => {
    await page.goto('/nonexistent-page');

    // Verify 404 text is visible
    await expect(page.getByRole('heading', { name: '404', level: 1 })).toBeVisible();
    await expect(page.getByText('Page Not Found')).toBeVisible();

    // Click Go Back Home
    await page.getByRole('button', { name: 'Go Back Home' }).click();

    // Verify redirect to dashboard page
    await expect(page).toHaveURL(/\/dashboard/, { timeout: 10_000 });
  });
});
