import { test, expect } from '@playwright/test';
import { TEST_USER, AUTH_STATE_PATH } from './constants';

/**
 * Dashboard tests run with authenticated state.
 * The storageState is loaded from the auth setup so we skip the login flow.
 */
test.describe('Dashboard Page', () => {
  test.use({ storageState: AUTH_STATE_PATH });

  test.beforeEach(async ({ page }) => {
    await page.goto('/dashboard');
    await expect(page.getByText('User Information')).toBeVisible({
      timeout: 10_000,
    });
  });

  test('should display user information section', async ({ page }) => {
    await expect(page.getByText('User Information')).toBeVisible();

    await expect(page.getByText('ID')).toBeVisible();
    await expect(page.getByText('Name')).toBeVisible();
    await expect(page.getByText('Email')).toBeVisible();
    await expect(page.getByText('Status')).toBeVisible();
  });

  test('should display the user email', async ({ page }) => {
    await expect(page.getByText(TEST_USER.email)).toBeVisible();
  });

  test('should display user status badge', async ({ page }) => {
    const statusBadge = page.locator(
      'span.inline-flex.items-center.rounded-full'
    );
    await expect(statusBadge).toBeVisible();

    const statusText = await statusBadge.textContent();
    expect(['ACTIVE', 'INACTIVE']).toContain(statusText?.trim());
  });

  test('should show welcome message in header', async ({ page }) => {
    await expect(page.getByText('Welcome,')).toBeVisible();
  });

  test('should show logout button in header', async ({ page }) => {
    await expect(
      page.getByRole('button', { name: 'Logout' })
    ).toBeVisible();
  });

  test('User logout and redirect to login page', async ({ page }) => {
    await page.getByRole('button', { name: 'Logout' }).click();
    await page.waitForURL('**/login', { timeout: 10_000 });

    await expect(
      page.locator('[data-slot="card-title"]')
    ).toBeVisible();
    await expect(
      page.getByRole('button', { name: 'Logout' })
    ).not.toBeVisible();
  });
});
