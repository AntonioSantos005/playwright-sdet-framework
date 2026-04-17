import { test, expect } from '@playwright/test';
import { LoginPage } from '../../src/pages/login.page';
import { DashboardPage } from '../../src/pages/dashboard.page';
import { env } from '../../src/config/environments';

test.describe('Login', () => {
  test('should allow an admin user to log in successfully @smoke', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const dashboardPage = new DashboardPage(page);

    await loginPage.goto();
    await loginPage.assertLoginPageLoaded();
    await loginPage.login(env.username, env.password);

    await expect(page).toHaveURL(/dashboard/i);
    await dashboardPage.assertLoaded();
  });
});

test('should display an error message for invalid credentials @smoke', async ({ page }) => {
  const loginPage = new LoginPage(page);

  await loginPage.goto();
  await loginPage.assertLoginPageLoaded();
  await loginPage.login('invalid-user', 'invalid-password');

  await loginPage.assertInvalidCredentialsMessage();
});