import bill from './mock/bill.json'

export default {
  getList: (params) => {
    const {
      startTime,
      endTime,
    } = params
    const response = bill.filter(item => item.time >= startTime && item.time <= endTime)
    return new Promise(resolve => {
      setTimeout(() => {
        resolve(response)
      }, 500);
    })
  }
}