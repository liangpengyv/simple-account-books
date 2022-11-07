import billNew from './mock/bill-new.json'

export default {
  getList: (params) => {
    const {
      startTime,
      endTime,
    } = params
    const response = billNew
      .filter(item => item.time >= startTime && item.time <= endTime)
      .sort((a, b) => parseInt(a.time) - parseInt(b.time))
      .reverse()
    return new Promise(resolve => {
      setTimeout(() => {
        resolve(response)
      }, 500);
    })
  },

  addItem: (params) => {
    billNew.push(params)
    const response = true
    return new Promise(resolve => {
      setTimeout(() => {
        resolve(response)
      }, 500);
    })
  }
}