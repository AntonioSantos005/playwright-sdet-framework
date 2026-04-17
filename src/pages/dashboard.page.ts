import { Page, Locator, expect } from '@playwright/test';

export class DashboardPage {
  readonly heading: Locator;

  constructor(private readonly page: Page) {
    this.heading = page.getByRole('heading', { name: 'Dashboard' });
  }

  async assertLoaded(): Promise<void> {
    await expect(this.heading).toBeVisible();
  }
}