import { test } from '@playwright/test';
import { LoginPage } from '../../src/pages/login.page';
import { DashboardPage } from '../../src/pages/dashboard.page';
import { AdminPage } from '../../src/pages/admin.page';
import { env } from '../../src/config/environments';

test.describe('Admin', () => {
  test('should allow searching by username in Admin module @smoke', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const dashboardPage = new DashboardPage(page);
    const adminPage = new AdminPage(page);

    await loginPage.goto();
    await loginPage.assertLoginPageLoaded();
    await loginPage.login(env.username, env.password);

    await dashboardPage.assertLoaded();
    await dashboardPage.sideMenu.clickMenuItem('Admin');

    await adminPage.assertLoaded();
    await adminPage.searchByUsername('Admin');
    await adminPage.assertResultsTableVisible();
  });
});