import { defineStore } from 'pinia'
import { computed, reactive, ref } from 'vue'
import categoryService from '../service/category.service'

const useCategoryStore = defineStore('category', () => {
  const categories = ref(null)
  const categoriesDict = reactive({})

  function init() {
    return new Promise(resolve => {
      categoryService.getAll().then(res => {
        categories.value = res
        res.forEach(item => {
          categoriesDict[item.id] = {
            type: item.type,
            name: item.name
          }

        })
        resolve()
      })
    })
  }

  return {
    categories,
    categoriesDict,
    init
  }
})

export default useCategoryStore