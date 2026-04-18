import { test } from '@playwright/test';
import { LoginPage } from '../../src/pages/login.page';
import { DashboardPage } from '../../src/pages/dashboard.page';
import { PimPage } from '../../src/pages/pim.page';
import { env } from '../../src/config/environments';

test.describe('PIM', () => {
  test('should allow searching for an employee in PIM module @smoke', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const dashboardPage = new DashboardPage(page);
    const pimPage = new PimPage(page);

    await loginPage.goto();
    await loginPage.assertLoginPageLoaded();
    await loginPage.login(env.username, env.password);

    await dashboardPage.assertLoaded();
    await dashboardPage.sideMenu.clickMenuItem('PIM');

    await pimPage.assertLoaded();
    await pimPage.searchByEmployeeName('Linda');
    await pimPage.assertResultsVisible();

  });
});