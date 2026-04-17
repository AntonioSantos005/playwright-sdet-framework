import { test, expect } from '@playwright/test';
import { LoginPage } from '../../src/pages/login.page';
import { DashboardPage } from '../../src/pages/dashboard.page';
import { env } from '../../src/config/environments';

test.describe('Login', () => {
  let loginPage: LoginPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);

    await loginPage.goto();
    await loginPage.assertLoginPageLoaded();
  });

  test('should allow an admin user to log in successfully @smoke', async ({ page }) => {
    const dashboardPage = new DashboardPage(page);

    await loginPage.login(env.username, env.password);

    await expect(page).toHaveURL(/dashboard/i);
    await dashboardPage.assertLoaded();
  });

  test('should display an error message for invalid credentials @smoke', async () => {
    await loginPage.login('invalid-user', 'invalid-password');

    await loginPage.assertInvalidCredentialsMessage();
  });

  test('should allow the user to log out successfully @smoke', async ({ page }) => {
    const dashboardPage = new DashboardPage(page);

    await loginPage.login(env.username, env.password);

    await expect(page).toHaveURL(/dashboard/i);
    await dashboardPage.assertLoaded();

    await dashboardPage.logout();

    await expect(page).toHaveURL(/auth\/login/i);
    await loginPage.assertLoginPageLoaded();
  });
});