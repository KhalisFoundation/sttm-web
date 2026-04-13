import { test, expect, Page } from '@playwright/test';

const getSearchTypeDropdown = (page: Page) => page.getByLabel('Search Type');
const TIMEOUT = 10000;

test.describe("Homepage", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('should display homepage title and an empty search input', async ({ page }) => {
    const searchInput = page.getByRole('searchbox', { name: 'Gurbani Search' });
    await expect(page).toHaveTitle(/SikhiToTheMax/);
    await expect(searchInput).toBeVisible();
    await expect(searchInput).toBeEmpty();
  });

  test('should type into search input using the on-screen Gurmukhi keyboard', async ({ page }) => {
    const searchInput = page.getByRole('searchbox', { name: 'Gurbani Search' });
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

  test('First letter each word from start (Gurmukhi) – suggests shabad and navigates', async ({
    page,
  }) => {
    await getSearchTypeDropdown(page).selectOption('0');
    await expect(getSearchTypeDropdown(page)).toHaveValue('0');

    const searchInput = page.getByRole('searchbox', { name: 'Gurbani Search' });
    await searchInput.click();
    await searchInput.fill('DDrgj');

    const suggestions = page.getByRole('list', { name: 'Search Suggestions' });
    await expect(suggestions).toBeVisible({ timeout: TIMEOUT });

    const result = suggestions.getByRole('link', {
      name: 'DMnu DMnu rwmdws guru ijin',
    });
    await expect(result).toBeVisible();
    await result.click();

    await expect(page).toHaveURL(
      (url) =>
        url.pathname === '/shabad' && url.searchParams.get('id') === '3590'
    );

    const shabadContainer = page.getByLabel('Shabad Container');
    await expect(shabadContainer).toContainText(
      'DMnu DMnu rwmdws guru ijin isirAw iqnY svwirAw ]'
    );
  });

  test('First letter anywhere – shows suggestions for query', async ({
    page,
  }) => {
    await getSearchTypeDropdown(page).selectOption('1');
    await expect(getSearchTypeDropdown(page)).toHaveValue('1');

    const searchInput = page.getByRole('searchbox', { name: 'Gurbani Search' });
    await searchInput.click();
    await searchInput.fill('mqjbe');

    const suggestions = page.getByRole('list', { name: 'Search Suggestions' });
    await expect(suggestions).toBeVisible({ timeout: TIMEOUT });
    await expect(suggestions.locator('li a').first()).not.toHaveText(
      'No matched results.'
    );
  });

  test('Full word (Gurmukhi word) – shows suggestions for full word', async ({
    page,
  }) => {
    await getSearchTypeDropdown(page).selectOption('2');
    await expect(getSearchTypeDropdown(page)).toHaveValue('2');

    const searchInput = page.getByRole('searchbox', { name: 'Gurbani Search' });
    await searchInput.click();
    await searchInput.fill('guru');

    const suggestions = page.getByRole('list', { name: 'Search Suggestions' });
    await expect(suggestions).toBeVisible({ timeout: TIMEOUT });
    await expect(suggestions.locator('li a').first()).not.toHaveText(
      'No matched results.'
    );
  });

  test('English word / translation – shows suggestions for English phrase', async ({
    page,
  }) => {
    await getSearchTypeDropdown(page).selectOption('3');
    await expect(getSearchTypeDropdown(page)).toHaveValue('3');

    const searchInput = page.getByRole('searchbox', { name: 'Gurbani Search' });
    await searchInput.click();
    await searchInput.fill('extended His power');

    const suggestions = page.getByRole('list', { name: 'Search Suggestions' });
    await expect(suggestions).toBeVisible({ timeout: TIMEOUT });
    await expect(suggestions.locator('li a').first()).not.toHaveText(
      'No matched results.'
    );
  });

  test('Romanized – shows suggestions for 4+ word query', async ({
    page,
  }) => {
    await getSearchTypeDropdown(page).selectOption('4');
    await expect(getSearchTypeDropdown(page)).toHaveValue('4');

    const searchInput = page.getByRole('searchbox', { name: 'Gurbani Search' });
    await searchInput.click();
    await searchInput.fill('jo mange thakur apne');

    const suggestions = page.getByRole('list', { name: 'Search Suggestions' });
    await expect(suggestions).toBeVisible({ timeout: TIMEOUT });
    await expect(suggestions.locator('li a').first()).not.toHaveText(
      'No matched results.'
    );
  });

  test('Ang – accepts page number, submits search, and shows ang data', async ({
    page,
  }) => {
    await getSearchTypeDropdown(page).selectOption('5');
    await expect(getSearchTypeDropdown(page)).toHaveValue('5');

    // Match by accessible name so it works for both type="search" and type="number" (Ang)
    const searchInput = page.getByLabel('Gurbani Search');
    await searchInput.click();
    await searchInput.fill('123');
    await expect(searchInput).toHaveValue('123');

    await searchInput.press('Enter');

    await expect(page).toHaveURL(/\/ang\?.*ang=123/);
    const shabadContainer = page.getByLabel('Shabad Container');
    await expect(shabadContainer).toBeVisible({ timeout: TIMEOUT });
    await expect(shabadContainer).not.toBeEmpty();
  });

  test('Main letters – shows suggestions for main-letter pattern', async ({
    page,
  }) => {
    await getSearchTypeDropdown(page).selectOption('6');
    await expect(getSearchTypeDropdown(page)).toHaveValue('6');

    const searchInput = page.getByRole('searchbox', { name: 'Gurbani Search' });
    await searchInput.click();
    await searchInput.fill('j mgh Tkr Apn q');

    const suggestions = page.getByRole('list', { name: 'Search Suggestions' });
    await expect(suggestions).toBeVisible({ timeout: TIMEOUT });
    await expect(suggestions.locator('li a').first()).not.toHaveText(
      'No matched results.'
    );
  });

  test('Romanized first letters anywhere – shows suggestions for romanized pattern', async ({
    page,
  }) => {
    await getSearchTypeDropdown(page).selectOption('7');
    await expect(getSearchTypeDropdown(page)).toHaveValue('7');

    const searchInput = page.getByRole('searchbox', { name: 'Gurbani Search' });
    await searchInput.click();
    await searchInput.fill('rgjsts');

    const suggestions = page.getByRole('list', { name: 'Search Suggestions' });
    await expect(suggestions).toBeVisible({ timeout: TIMEOUT });
    await expect(suggestions.locator('li a').first()).not.toHaveText(
      'No matched results.'
    );
  });

  test('Auto detect – shows suggestions for mixed-language query', async ({
    page,
  }) => {
    await getSearchTypeDropdown(page).selectOption('8');
    await expect(getSearchTypeDropdown(page)).toHaveValue('8');

    const searchInput = page.getByRole('searchbox', { name: 'Gurbani Search' });
    await searchInput.click();
    await searchInput.fill('He has extended His power');

    const suggestions = page.getByRole('list', { name: 'Search Suggestions' });
    await expect(suggestions).toBeVisible({ timeout: TIMEOUT });
    await expect(suggestions.locator('li a').first()).not.toHaveText(
      'No matched results.'
    );
  });

  test('Switching search type updates placeholder and allows search', async ({
    page,
  }) => {
    const searchInput = page.getByRole('searchbox', { name: 'Gurbani Search' });

    await getSearchTypeDropdown(page).selectOption('0');
    await searchInput.fill('DDrgj');
    await expect(
      page.getByRole('list', { name: 'Search Suggestions' })
    ).toBeVisible({ timeout: TIMEOUT });

    await searchInput.clear();
    await getSearchTypeDropdown(page).selectOption('2');
    await searchInput.fill('guru');
    await expect(
      page.getByRole('list', { name: 'Search Suggestions' })
    ).toBeVisible({ timeout: TIMEOUT });
  });
});