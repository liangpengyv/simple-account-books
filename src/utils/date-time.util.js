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
  const currentCopy = new Date(date)
  const prevMonthCurrent = new Date(current.setMonth(current.getMonth() - 1))
  if (prevMonthCurrent.getMonth() === currentCopy.getMonth()) {
    return new Date(currentCopy.setDate(0))
  } else {
    return prevMonthCurrent
  }
}

export const getNextMonthCurrent = (date) => {
  const current = new Date(date)
  const currentCopy = new Date(date)
  const nextMonthCurrent = new Date(current.setMonth(current.getMonth() + 1))
  if ((nextMonthCurrent.getMonth() + 12 - currentCopy.getMonth()) % 12 === 2) {
    return new Date(nextMonthCurrent.setDate(0))
  } else {
    return nextMonthCurrent
  }
}

export const getDateStart = (date) => {
  const current = new Date(date)
  current.setHours(0, 0, 0, 0)
  return current
}
