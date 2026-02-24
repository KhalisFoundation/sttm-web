import { test, expect } from '@playwright/test';

test.describe("Homepage", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('should display homepage title and an empty search input', async ({ page }) => {
    const searchInput = page.locator("#search");
    await expect(page).toHaveTitle(/SikhiToTheMax/);
    await expect(searchInput).toBeVisible();
    await expect(searchInput).toBeEmpty();
  });

  test('should type into search input using the on-screen Gurmukhi keyboard', async ({ page }) => {
    const searchInput = page.locator("#search");
    const keyboardToggle = page.locator('#gurmukhi-keyboard-toggle');
    const keyboard = page.locator("#gurmukhi-keyboard");

    // On-screen keyboard should not be visible on load
    await expect(keyboard).toBeHidden();
    await expect(keyboardToggle).toBeVisible();

    // Open the on-screen keyboard
    await keyboardToggle.click();
    await expect(keyboard).toBeVisible();

    // Type on the on-screen keyboard
    await keyboard.getByRole('button', { name: 'A', exact: true }).click();
    await keyboard.getByRole('button', { name: 's', exact: true }).click();
    await keyboard.getByRole('button', { name: 'j', exact: true }).click();
    await keyboard.getByRole('button', { name: 's', exact: true }).click();

    // Check if the characters got typed in the search bar
    await expect(searchInput).not.toBeEmpty();

    // Close the on-screen keyboard
    await keyboardToggle.click();
    await expect(keyboard).toBeHidden();
  });
});