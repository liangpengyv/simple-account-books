export const getYearByTimeStamp = (timeStamp) => {
  return new Date(parseInt(timeStamp)).getFullYear()
}

export const getMonthByTimeStamp = (timeStamp) => {
  return new Date(parseInt(timeStamp)).getMonth() + 1
}
