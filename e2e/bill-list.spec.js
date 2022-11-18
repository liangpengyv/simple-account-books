import { test, expect } from '@playwright/test'

test.beforeEach(async ({ page }) => {
  await page.goto('/')
})

test('账单头的月份应该和月份筛选一致', async ({ page }) => {
  const prevMonthButton = page.getByRole('button', { name: '上个月' })
  const monthFilterInput = page.getByPlaceholder('选择月份')
  const listHeaderNumber = page.locator('.list-header .month-number')

  expect(await listHeaderNumber.innerText()).toEqual(parseInt((await monthFilterInput.inputValue()).split('-')[1]).toString())

  await prevMonthButton.click()
  expect(await listHeaderNumber.innerText()).toEqual(parseInt((await monthFilterInput.inputValue()).split('-')[1]).toString())
})

test('应该禁用尚未到来的月份', async ({ page }) => {
  const prevMonthButton = page.getByRole('button', { name: '上个月' })
  const nextMonthButton = page.getByRole('button', { name: '下个月' })

  await expect(nextMonthButton).toBeDisabled()

  await prevMonthButton.click()
  await expect(nextMonthButton).not.toBeDisabled()

  await nextMonthButton.click()
  await expect(nextMonthButton).toBeDisabled()
})

test('应该日期倒序排列账单', async ({ page }) => {
  const listLocator = page.locator('.list-wrapper .n-list-item')
  await listLocator.nth(0).waitFor()
  const listLocatorLength = await listLocator.count()

  const listItemDateArray = []
  for (let i = 0; i < listLocatorLength; i++) {
    const itemDateText = await listLocator.nth(i).locator('.n-thing-main__description').innerText()
    listItemDateArray.push(parseInt(itemDateText))
  }

  const isSortDesc = (array) => {
    for (let i; i < array.length - 1; i++) {
      if (array[i] < array[i + 1]) {
        return false
      }
    }
    return true
  }
  expect(isSortDesc(listItemDateArray)).toBeTruthy()
})
