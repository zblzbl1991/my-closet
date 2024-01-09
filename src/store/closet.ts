// stores/counter.js
import { defineStore } from 'pinia'

export const useLocationsStore = defineStore('locations', () => {
    const val = ref()
    // function increment() {
    //     count.value++
    // }

    // return { count, increment }
    return { val }
})