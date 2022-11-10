import billNew from './mock/bill-new.json'

export default {
  getList: (params) => {
    const {
      startTime,
      endTime,
      categoryFilterList,
    } = params
    const result01 = billNew.filter(item => item.time >= startTime && item.time <= endTime)
    const result02 = categoryFilterList && categoryFilterList.length > 0 ? result01.filter(item => categoryFilterList.includes(item.category)) : result01
    const result03 = result02.sort((a, b) => parseInt(a.time) - parseInt(b.time))
    const result04 = result03.reverse()
    const response = result04
    return new Promise(resolve => {
      setTimeout(() => {
        resolve(response)
      }, 300);
    })
  },

  addItem: (params) => {
    billNew.push(params)
    const response = true
    return new Promise(resolve => {
      setTimeout(() => {
        resolve(response)
      }, 300);
    })
  }
}