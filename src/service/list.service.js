import billNew from './mock/bill-new.json'

export default {
  getList: (params) => {
    const {
      startTime,
      endTime,
    } = params
    const response = billNew.filter(item => item.time >= startTime && item.time <= endTime).reverse()
    return new Promise(resolve => {
      setTimeout(() => {
        resolve(response)
      }, 500);
    })
  }
}