import categories from './mock/categories.json'

export default {
  getAll: () => {
    const response = categories
    return new Promise(resolve => {
      setTimeout(() => {
        resolve(response)
      }, 300)
    })
  }
}
