import { Page, Locator, expect } from '@playwright/test';

export class PimPage {
  readonly heading: Locator;
  readonly employeeNameInput: Locator;
  readonly searchButton: Locator;
  readonly resetButton: Locator;
  readonly resultsContainer: Locator;

  constructor(private readonly page: Page) {
    this.heading = page.getByRole('heading', { name: 'PIM' });
    this.employeeNameInput = page.getByRole('textbox', { name: 'Type for hints...' }).first();
    this.searchButton = page.getByRole('button', { name: 'Search' });
    this.resetButton = page.getByRole('button', { name: 'Reset' });
    this.resultsContainer = page.locator('.oxd-table');
  }

  async assertLoaded(): Promise<void> {
    await expect(this.heading).toBeVisible();
    await expect(this.searchButton).toBeVisible();
    await expect(this.resetButton).toBeVisible();
  }

  async searchByEmployeeName(employeeName: string): Promise<void> {
    await this.employeeNameInput.fill(employeeName);
    await this.searchButton.click();
  }

  async assertResultsVisible(): Promise<void> {
    await expect(this.resultsContainer).toBeVisible();
  }
}