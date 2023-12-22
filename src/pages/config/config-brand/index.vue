<script setup lang="ts">
import './index.scss'

const onClick =function (e){
  console.log(e)
}
</script>
<template>
  <nut-navbar title="Title" desc="Share" @click-right="onClick"></nut-navbar>

</template>


<style scoped lang="scss">

</style>