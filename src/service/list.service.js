import bill from './mock/bill.json'

export default {
  getList: (params) => {
    const {
      startTime,
      endTime,
      categoryFilterList
    } = params
    const resultFilterTime = bill.filter(item => item.time >= startTime && item.time <= endTime)
    const resultFilterCategory = categoryFilterList && categoryFilterList.length > 0 ? resultFilterTime.filter(item => categoryFilterList.includes(item.category)) : resultFilterTime
    const resultSortByAse = resultFilterCategory.sort((a, b) => parseInt(a.time) - parseInt(b.time)) // 为保证排序稳定性，所以先通过 sort 函数获取“正序”结果，然后再翻转
    const resultReverse = resultSortByAse.reverse()
    const response = resultReverse
    return new Promise(resolve => {
      setTimeout(() => {
        resolve(response)
      }, 300)
    })
  },

  addItem: (params) => {
    bill.push(params)
    const response = true
    return new Promise(resolve => {
      setTimeout(() => {
        resolve(response)
      }, 300)
    })
  },

  getCategoryStatisticsData: (params) => {
    const {
      startTime,
      endTime
    } = params
    const resultFilterTime = bill.filter(item => item.time >= startTime && item.time <= endTime)

    const getCategoryStatisticsDataByType = (type) => {
      const list = resultFilterTime.filter(item => item.type === type)

      let total = 0
      const groupSource = {}
      list.forEach(item => {
        total += item.amount
        if (groupSource[item.category]) {
          groupSource[item.category].push(item)
        } else {
          groupSource[item.category] = [item]
        }
      })

      const result = {
        total,
        group: []
      }
      Object.entries(groupSource).forEach(item => {
        result.group.push({
          categoryId: item[0],
          size: item[1].length,
          total: getItemTotal(item[1]),
          percent: getItemTotal(item[1]) * 100 / total,
          sourceList: item[1]
        })
      })
      result.group.sort((a, b) => b.total - a.total)
      return result
    }

    const getItemTotal = (itemList) => {
      return itemList.reduce((pre, cur) => ({ amount: pre.amount + cur.amount }), { amount: 0 }).amount
    }

    const response = [
      getCategoryStatisticsDataByType(0),
      getCategoryStatisticsDataByType(1)
    ]
    return new Promise(resolve => {
      setTimeout(() => {
        resolve(response)
      }, 300)
    })
  }
}
