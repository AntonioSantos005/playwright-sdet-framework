import { Page, Locator, expect } from '@playwright/test';
import { SideMenuComponent } from '../components/side-menu.component';

export class DashboardPage {
  readonly heading: Locator;
  readonly userDropdown: Locator;
  readonly logoutLink: Locator;
  readonly sideMenu: SideMenuComponent;

  constructor(private readonly page: Page) {
    this.heading = page.getByRole('heading', { name: 'Dashboard' });
    this.userDropdown = page.locator('.oxd-userdropdown-tab');
    this.logoutLink = page.getByRole('menuitem', { name: 'Logout' });
    this.sideMenu = new SideMenuComponent(page);
  }

  async assertLoaded(): Promise<void> {
    await expect(this.heading).toBeVisible();
  }

  async logout(): Promise<void> {
    await this.userDropdown.click();
    await this.logoutLink.click();
  }
}