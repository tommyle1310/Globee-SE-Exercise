import { test, expect } from '@playwright/test';
import { TEST_USER } from './constants';

test.describe('Login Page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/login');
  });

  test('should render the login page correctly', async ({ page }) => {
    await expect(page.locator('[data-slot="card-title"]')).toBeVisible();

    await expect(
      page.getByText('Enter your email and password to continue')
    ).toBeVisible();

    await expect(page.getByLabel('Email')).toBeVisible();
    await expect(page.getByLabel('Password')).toBeVisible();

    await expect(
      page.getByRole('button', { name: 'Sign In' })
    ).toBeVisible();
  });

  test('User login using valid email and password', async ({ page }) => {
    await page.getByLabel('Email').fill(TEST_USER.email);
    await page.getByLabel('Password').fill(TEST_USER.password);

    await page.getByRole('button', { name: 'Sign In' }).click();

    await expect(page.getByText('Signing in...')).toBeVisible();

    await page.waitForURL('**/dashboard', { timeout: 10_000 });

    await expect(page.getByText('User Information')).toBeVisible();

    await expect(page.getByText('Welcome,')).toBeVisible();

    await expect(
      page.getByRole('button', { name: 'Logout' })
    ).toBeVisible();
  });

  test('Verify the system validates invalid credentials.', async ({ page }) => {
    await page.getByLabel('Email').fill('wrong@email.com');
    await page.getByLabel('Password').fill('wrongpassword');

    await page.getByRole('button', { name: 'Sign In' }).click();
    await expect(
      page.getByText('Invalid email or password')
    ).toBeVisible({ timeout: 10_000 });

    await expect(page).toHaveURL(/\/login/);

    await expect(
      page.getByRole('button', { name: 'Sign In' })
    ).toBeVisible();
  });

  test('Verify the system validates invalid credentials (incorrect password).', async ({ page }) => {
    await page.getByLabel('Email').fill(TEST_USER.email);
    await page.getByLabel('Password').fill('definitelywrongpassword');

    await page.getByRole('button', { name: 'Sign In' }).click();

    await expect(
      page.getByText('Invalid email or password')
    ).toBeVisible({ timeout: 10_000 });
    await expect(page).toHaveURL(/\/login/);
  });

  test('Prevent submission with empty email', async ({ page }) => {
    await page.getByLabel('Password').fill('somepassword');

    await page.getByRole('button', { name: 'Sign In' }).click();

    await expect(page).toHaveURL(/\/login/);

    await expect(
      page.getByText('Invalid email or password')
    ).not.toBeVisible();
  });

  test('Prevent submission with empty password', async ({ page }) => {
    await page.getByLabel('Email').fill(TEST_USER.email);

    await page.getByRole('button', { name: 'Sign In' }).click();

    await expect(page).toHaveURL(/\/login/);
  });

  test('should show loading state and then allow login if session check returns 401', async ({ page }) => {
    // Intercept /auth/me call and make it return 401 after a short delay
    await page.route('**/api/auth/me', async (route) => {
      await new Promise(resolve => setTimeout(resolve, 500));
      await route.fulfill({
        status: 401,
        contentType: 'application/json',
        body: JSON.stringify({ message: 'Unauthorized' }),
      });
    });

    await page.goto('/login');

    // Verify loading screen is visible initially
    await expect(page.getByText('Verifying session...')).toBeVisible();

    // Wait for the loading state to disappear
    await expect(page.getByText('Verifying session...')).not.toBeVisible();

    // Verify login page renders and is interactive
    await expect(page.locator('[data-slot="card-title"]')).toBeVisible();
    await expect(page.getByLabel('Email')).toBeVisible();
  });

  test('should show loading state and redirect to dashboard if session check succeeds', async ({ page }) => {
    // Intercept /auth/me and make it succeed after a delay
    await page.route('**/api/auth/me', async (route) => {
      await new Promise(resolve => setTimeout(resolve, 500));
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({
          id: '1',
          email: 'test@beer2bee.com',
          name: 'Test User',
          status: 'ACTIVE',
        }),
      });
    });

    await page.goto('/login');

    // Verify loading screen is visible initially
    await expect(page.getByText('Verifying session...')).toBeVisible();

    // Redirected to /dashboard automatically
    await page.waitForURL('**/dashboard', { timeout: 10_000 });
    await expect(page.getByText('User Information')).toBeVisible();
  });
});
