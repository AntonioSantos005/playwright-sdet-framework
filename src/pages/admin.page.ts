import { Page, Locator, expect } from '@playwright/test';

export class AdminPage {
  readonly heading: Locator;
  readonly usernameInput: Locator;
  readonly searchButton: Locator;
  readonly resetButton: Locator;
  readonly resultsTable: Locator;

  constructor(private readonly page: Page) {
    this.heading = page.getByRole('heading', { name: 'Admin' });
    this.usernameInput = page.getByRole('textbox').nth(1);
    this.searchButton = page.getByRole('button', { name: 'Search' });
    this.resetButton = page.getByRole('button', { name: 'Reset' });
    this.resultsTable = page.locator('.oxd-table');
  }

  async assertLoaded(): Promise<void> {
    await expect(this.heading).toBeVisible();
    await expect(this.searchButton).toBeVisible();
    await expect(this.resetButton).toBeVisible();
  }

  async searchByUsername(username: string): Promise<void> {
    await this.usernameInput.fill(username);
    await this.searchButton.click();
  }

  async assertResultsTableVisible(): Promise<void> {
    await expect(this.resultsTable).toBeVisible();
  }
}