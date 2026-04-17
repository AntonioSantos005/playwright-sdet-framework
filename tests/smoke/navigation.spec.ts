import { test, expect } from '@playwright/test';
import { LoginPage } from '../../src/pages/login.page';
import { DashboardPage } from '../../src/pages/dashboard.page';
import { env } from '../../src/config/environments';

test.describe('Navigation', () => {
  test('should navigate to Admin module from the side menu @smoke', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const dashboardPage = new DashboardPage(page);

    await loginPage.goto();
    await loginPage.assertLoginPageLoaded();
    await loginPage.login(env.username, env.password);

    await dashboardPage.assertLoaded();
    await dashboardPage.sideMenu.assertMenuItemVisible('Admin');
    await dashboardPage.sideMenu.clickMenuItem('Admin');

    await expect(page).toHaveURL(/admin/i);
    await expect(page.getByRole('heading', { name: 'Admin' })).toBeVisible();
  });
});