// stores/counter.js
import { defineStore } from 'pinia'
import {Ref, ref} from "vue";

export const useOpenidStore = defineStore('openid', () => {
    const val = ref()
    // function increment() {
    //     count.value++
    // }

    // return { count, increment }
    return { val }
})
export const useSessionKeyStore = defineStore('sessionKey', () => {
    const val = ref('')
    // function increment() {
    //     count.value++
    // }

    // return { count, increment }
    return { val }
})

export const useTokenStore = defineStore('token', () => {
    const val:Ref<string > = ref('')
    // function increment() {
    //     count.value++
    // }

    // return { count, increment }
    return { val }
})



// export default defineComponent({
//     computed: {
//         // 其他计算属性
//         // ...
//         // 允许访问 this.counterStore 和 this.userStore
//         ...mapStores(useOpenidStore, useSessionKeyStore),
//         // 允许读取 this.count 和 this.double
//         ...mapState( useCounterStore, ['count', 'double']),
//     },
//     methods: {
//         // 允许读取 this.increment()
//         // ...mapActions(useCounterStore, ['increment']),
//     },
// })