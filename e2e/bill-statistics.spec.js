import { test, expect } from '@playwright/test'

test.beforeEach(async ({ page }) => {
  await page.goto('/')
  await page.getByRole('button', { name: '统计' }).click()
})

test('链接时间戳参数应该匹配显示的月份', async ({ page }) => {
  await page.waitForURL(/bill-statistics/)
  const params = new URL(page.url()).searchParams
  const timestampValue = params.get('timestamp')

  const dateObj = new Date(parseInt(timestampValue))
  const year = dateObj.getFullYear()
  const month = dateObj.getMonth() + 1

  const monthFilterValue = await page.getByPlaceholder('选择月份').inputValue()
  expect(parseInt(monthFilterValue.split('-')[0])).toEqual(year)
  expect(parseInt(monthFilterValue.split('-')[1])).toEqual(month)
})

test('返回按钮应该返回首页（收支页）', async ({ page }) => {
  await page.getByRole('button', { name: '返回' }).click()
  await expect(page).toHaveURL(/.*\/bill-list/)
  await expect(page).toHaveTitle(/收支 - .+/)
  await expect(page.locator('header')).toHaveText('收支')
})
