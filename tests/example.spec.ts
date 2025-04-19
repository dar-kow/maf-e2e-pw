import { test, expect } from '@playwright/test';

test('example test', async ({ page }) => {
    await page.goto('https://playwright.dev');
    await expect(page).toHaveTitle(/Playwright/);
});
