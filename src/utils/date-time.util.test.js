import { describe, expect, test } from 'vitest'
import { getMonthStart, getMonthEnd, getPrevMonthCurrent, getNextMonthCurrent, getDateStart } from './date-time.util'

const currentDate = new Date()
const currentTimestamp = Date.now()

describe('出入参类型验证', () => {
  test('应该返回一个 Date 类型', () => {
    expect(getMonthStart(currentDate)).toBeInstanceOf(Date)
    expect(getMonthEnd(currentDate)).toBeInstanceOf(Date)
    expect(getPrevMonthCurrent(currentDate)).toBeInstanceOf(Date)
    expect(getNextMonthCurrent(currentDate)).toBeInstanceOf(Date)
    expect(getDateStart(currentDate)).toBeInstanceOf(Date)
  })

  test('应该同时支持传入一个合法的时间戳', () => {
    expect(getMonthStart(currentTimestamp)).toBeInstanceOf(Date)
    expect(getMonthEnd(currentTimestamp)).toBeInstanceOf(Date)
    expect(getPrevMonthCurrent(currentTimestamp)).toBeInstanceOf(Date)
    expect(getNextMonthCurrent(currentTimestamp)).toBeInstanceOf(Date)
    expect(getDateStart(currentTimestamp)).toBeInstanceOf(Date)
  })
})

describe('getMonthStart', () => {
  test('应该得到相同的月份', () => {
    const originMonth = currentDate.getMonth()
    expect(getMonthStart(currentDate).getMonth()).toEqual(originMonth)
  })

  test('应该得到月份的第一天', () => {
    expect(getMonthStart(currentDate).getDate()).toEqual(1)
  })

  test('应该得到一天中的第一时刻', () => {
    const resultDate = getMonthStart(currentDate)
    expect(resultDate.getHours()).toEqual(0)
    expect(resultDate.getMinutes()).toEqual(0)
    expect(resultDate.getSeconds()).toEqual(0)
    expect(resultDate.getMilliseconds()).toEqual(0)
  })
})

describe('getMonthEnd', () => {
  test('应该得到相同的月份', () => {
    const originMonth = currentDate.getMonth()
    expect(getMonthEnd(currentDate).getMonth()).toEqual(originMonth)
  })

  test.each([
    ['2022-2-25', 28],
    ['2022-9-10', 30],
    ['2022-10-15', 31],
    ['2022-10-31', 31]
  ])('%s 的最后一天应该是 %i 号', (dateStr, expected) => {
    expect(getMonthEnd(new Date(dateStr)).getDate()).toEqual(expected)
  })

  test('应该得到一天中的最后一刻', () => {
    const resultDate = getMonthEnd(currentDate)
    expect(resultDate.getHours()).toEqual(23)
    expect(resultDate.getMinutes()).toEqual(59)
    expect(resultDate.getSeconds()).toEqual(59)
    expect(resultDate.getMilliseconds()).toEqual(999)
  })
})

describe('getPrevMonthCurrent', () => {
  test.each([
    ['2022-10-15', 2022, 9],
    ['2022-1-15', 2021, 12],
    ['2022-10-31', 2022, 9],
    ['2022-3-29', 2022, 2],
    ['2022-3-30', 2022, 2],
    ['2022-3-31', 2022, 2]
  ])('%s 的上一个月应该是 %i年 %i月 ', (dateStr, expectedYear, expectedMonth) => {
    const resultDate = getPrevMonthCurrent(new Date(dateStr))
    expect(resultDate.getFullYear()).toEqual(expectedYear)
    expect(resultDate.getMonth() + 1).toEqual(expectedMonth)
  })

  test.each([
    ['2022-9-10', 10],
    ['2022-10-31', 30],
    ['2022-3-29', 28],
    ['2022-3-30', 28],
    ['2022-3-31', 28]
  ])('%s 的上一个月当前时刻是 %i 号', (dateStr, expectedDate) => {
    const resultDate = getPrevMonthCurrent(new Date(dateStr))
    expect(resultDate.getDate()).toEqual(expectedDate)
  })

  test('应该得到一天中相同的时刻', () => {
    const resultDate = getPrevMonthCurrent(currentDate)
    expect(resultDate.getHours()).toEqual(currentDate.getHours())
    expect(resultDate.getMinutes()).toEqual(currentDate.getMinutes())
    expect(resultDate.getSeconds()).toEqual(currentDate.getSeconds())
    expect(resultDate.getMilliseconds()).toEqual(currentDate.getMilliseconds())
  })
})

describe('getNextMonthCurrent', () => {
  test.each([
    ['2022-10-15', 2022, 11],
    ['2022-12-15', 2023, 1],
    ['2022-10-31', 2022, 11],
    ['2022-1-29', 2022, 2],
    ['2022-1-30', 2022, 2],
    ['2022-1-31', 2022, 2]
  ])('%s 的上一个月应该是 %i年 %i月 ', (dateStr, expectedYear, expectedMonth) => {
    const resultDate = getNextMonthCurrent(new Date(dateStr))
    expect(resultDate.getFullYear()).toEqual(expectedYear)
    expect(resultDate.getMonth() + 1).toEqual(expectedMonth)
  })

  test.each([
    ['2022-9-10', 10],
    ['2022-10-31', 30],
    ['2022-1-29', 28],
    ['2022-1-30', 28],
    ['2022-1-31', 28]
  ])('%s 的下一个月当前时刻是 %i 号', (dateStr, expectedDate) => {
    const resultDate = getNextMonthCurrent(new Date(dateStr))
    expect(resultDate.getDate()).toEqual(expectedDate)
  })

  test('应该得到一天中相同的时刻', () => {
    const resultDate = getNextMonthCurrent(currentDate)
    expect(resultDate.getHours()).toEqual(currentDate.getHours())
    expect(resultDate.getMinutes()).toEqual(currentDate.getMinutes())
    expect(resultDate.getSeconds()).toEqual(currentDate.getSeconds())
    expect(resultDate.getMilliseconds()).toEqual(currentDate.getMilliseconds())
  })
})

describe('getDateStart', () => {
  test('应该得到相同的年月日', () => {
    const resultDate = getDateStart(currentDate)
    expect(resultDate.getFullYear()).toEqual(currentDate.getFullYear())
    expect(resultDate.getMonth()).toEqual(currentDate.getMonth())
    expect(resultDate.getDate()).toEqual(currentDate.getDate())
  })

  test('应该得到一天中的第一时刻', () => {
    const resultDate = getDateStart(currentDate)
    expect(resultDate.getHours()).toEqual(0)
    expect(resultDate.getMinutes()).toEqual(0)
    expect(resultDate.getSeconds()).toEqual(0)
    expect(resultDate.getMilliseconds()).toEqual(0)
  })
})
