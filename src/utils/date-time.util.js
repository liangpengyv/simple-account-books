export const getMonthStart = (date) => {
  const current = new Date(date)
  current.setDate(1)
  current.setHours(0, 0, 0, 0)
  return current
}

export const getMonthEnd = (date) => {
  const nextMonthCurrent = getNextMonthCurrent(date)
  const nextMonthStart = getMonthStart(nextMonthCurrent)
  return new Date(nextMonthStart.getTime() - 1)
}

export const getPrevMonthCurrent = (date) => {
  const current = new Date(date)
  return new Date(current.setMonth(current.getMonth() - 1))
}

export const getNextMonthCurrent = (date) => {
  const current = new Date(date)
  return new Date(current.setMonth(current.getMonth() + 1))
}

export const getDateStart = (date) => {
  const current = new Date(date)
  current.setHours(0, 0, 0, 0)
  return current
}