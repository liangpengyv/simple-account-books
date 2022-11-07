import { defineStore } from 'pinia'
import { computed, ref } from 'vue'
import categoryService from '../service/category.service'

const useCategoryStore = defineStore('category', () => {
  const categories = ref(null)
  const categoriesDict = computed(() => {
    const obj = {}
    categories.value.forEach(item => {
      obj[item.id] = {
        type: item.type,
        name: item.name
      }
    })
    return obj
  })

  const init = async () => {
    const res = await categoryService.getAll()
    categories.value = res
  }

  return {
    categories,
    categoriesDict,
    init
  }
})

export default useCategoryStore