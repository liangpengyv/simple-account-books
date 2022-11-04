import bill from './mock/bill.json'

export default {
  getList: (params) => {
    const response = bill
    return new Promise((resolve, reject) => {
      resolve(response)
    })
  }
}