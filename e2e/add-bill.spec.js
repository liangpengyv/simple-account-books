import { test, expect } from '@playwright/test'

test.beforeEach(async ({ page }) => {
  await page.goto('/')
  await page.locator('header').getByRole('button').nth(0).click()
})

test('应该可以新增一笔账单', async ({ page }) => {
  await page.getByPlaceholder('0.00').fill('5')
  await page.getByRole('button', { name: '确定添加' }).click()
  await expect(page.locator('.list-wrapper .n-list')).toHaveText(/￥5\.00/)
})

test('返回按钮应该返回首页（收支页）', async ({ page }) => {
  await page.getByRole('button', { name: '返回' }).click()
  await expect(page).toHaveURL(/.*\/bill-list/)
  await expect(page).toHaveTitle(/收支 - .+/)
  await expect(page.locator('header')).toHaveText('收支')
})
