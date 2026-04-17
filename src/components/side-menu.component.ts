import { Page, Locator, expect } from '@playwright/test';

export class SideMenuComponent {
  readonly menuContainer: Locator;

  constructor(private readonly page: Page) {
    this.menuContainer = page.getByRole('navigation', { name: 'Sidepanel' });
  }

  menuItem(name: string): Locator {
    return this.menuContainer.getByRole('link', { name });
  }

  async clickMenuItem(name: string): Promise<void> {
    await this.menuItem(name).click();
  }

  async assertMenuItemVisible(name: string): Promise<void> {
    await expect(this.menuItem(name)).toBeVisible();
  }
}