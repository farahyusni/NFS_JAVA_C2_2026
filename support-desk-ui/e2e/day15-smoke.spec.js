import { test, expect } from '@playwright/test';

test('admin can login and create a ticket through the protected UI', async ({ page }) => {
  const uniqueSuffix = Date.now();

  await page.goto('/login');
  await expect(page.getByRole('heading', { name: 'Login to Support Desk' })).toBeVisible();

  await page.getByLabel('Email').fill('admin@example.com');
  await page.getByLabel('Password').fill('Admin@123');
  await page.getByRole('button', { name: 'Login' }).click();

  await expect(page).toHaveURL(/\/app\/dashboard/);
  await expect(page.getByRole('heading', { name: 'Dashboard' })).toBeVisible();

  const mainNav = page.getByRole('navigation', { name: 'Main navigation' });

  await mainNav.getByRole('link', { name: 'Tickets', exact: true }).click();
  await expect(page.getByLabel('Search tickets')).toBeVisible();

  // No nav link reaches the create form yet, so navigate directly
  await page.goto('/app/tickets/new');
  await expect(page.getByRole('heading', { name: 'Create a new ticket' })).toBeVisible();

  await page.getByLabel('Title').fill(`E2E Ticket ${uniqueSuffix}`);
  await page.getByLabel('Description').fill('Created by the day15 smoke test');
  await page.getByLabel('Category').fill('E2E');

  await page.getByRole('button', { name: 'Continue' }).click();

  // Priority/status already default to valid values in create mode
  await page.getByRole('button', { name: 'Continue' }).click();

  await page
    .getByLabel('I have reviewed the ticket details and they are ready to submit.', { exact: true })
    .check();

  await page.getByRole('button', { name: 'Create Ticket' }).click();

  await expect(page.getByText('Ticket created successfully.')).toBeVisible();
});
