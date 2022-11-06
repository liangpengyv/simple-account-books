export const getMonthStart = (date) => {
  const current = new Date(date)
  current.setDate(1)
  current.setHours(0)
  current.setMinutes(0)
  current.setSeconds(0)
  current.setMilliseconds(0)
  return current
}

export const getMonthEnd = (date) => {
  const current = new Date(date)
  const currentCopy = new Date(current)
  const nextMonthCurrent = new Date(currentCopy.setMonth(currentCopy.getMonth() + 1))
  const nextMonthStart = getMonthStart(nextMonthCurrent)
  return new Date(nextMonthStart.getTime() - 1)
}