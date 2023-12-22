<script setup lang="ts">
import './index.scss'
import {Add, ShareN} from "@nutui/icons-vue";

console.log('config-type')
const onClick =function (e){
  console.log(e)
}
</script>
<template>
  <nut-navbar title="分类"  @click-right="onClick">
    <template #right>
     新增大类
    </template>
  </nut-navbar>
aaa
</template>

<style scoped lang="scss">

</style>