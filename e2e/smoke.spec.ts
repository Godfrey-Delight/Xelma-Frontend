import { expect, test } from '@playwright/test';

test('command palette navigates to Connect', async ({ page }) => {
  await page.goto('/', { waitUntil: 'domcontentloaded' });
  await page.keyboard.press('Control+k');

  const palette = page.getByRole('dialog', { name: 'Command palette' });
  await expect(palette).toBeVisible();
  await page.getByRole('searchbox', { name: 'Search commands' }).fill('connect');
  await page.getByRole('button', { name: /Connect Connect a Stellar address/ }).click();

  await expect(page).toHaveURL(/\/connect$/);
  await expect(page.getByRole('heading', { name: 'Connect Stellar Address' })).toBeVisible();
});
