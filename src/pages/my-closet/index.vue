<template>
  <nut-grid :border="false">
    <nut-grid-item >
      <nut-avatar size="large">
        <img
            src="https://img12.360buyimg.com/imagetools/jfs/t1/143702/31/16654/116794/5fc6f541Edebf8a57/4138097748889987.png"
        />
      </nut-avatar>
    </nut-grid-item>
  </nut-grid>
  <Tabbar></Tabbar>
</template>
<script setup>
import { reactive, ref } from 'vue';
import Tabbar from "../../component/index.vue";
const activeName = ref(1);
const subTitle = '副标题';
const title = reactive({
  title1: '标题1',
  title2: '标题2',
  title3: '标题3'
});
</script>
