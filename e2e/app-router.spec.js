import { test, expect } from '@playwright/test'

test.beforeEach(async ({ page }) => {
  await page.goto('/')
})

test('应该默认跳转到 “收支” 页面', async ({ page }) => {
  await expect(page).toHaveURL(/.*\/bill-list/)
  await expect(page).toHaveTitle(/收支 - .+/)
  await expect(page.locator('header')).toHaveText('收支')
})

test('应该可以进入 “记一笔” 页面', async ({ page }) => {
  await page.getByRole('button', { name: '记一笔' }).click()
  await expect(page).toHaveURL(/.*\/add-bill/)
  await expect(page).toHaveTitle(/记一笔 - .+/)
  await expect(page.locator('header')).toHaveText('记一笔')
})

test('应该可以进入 “统计” 页面', async ({ page }) => {
  await page.getByRole('button', { name: '统计' }).click()
  await expect(page).toHaveURL(/.*\/bill-statistics\?timestamp=.*/)
  await expect(page).toHaveTitle(/收支统计 - .+/)
  await expect(page.locator('header')).toHaveText('收支统计')
})
