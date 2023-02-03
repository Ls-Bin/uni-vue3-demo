<template>
  <view class="content">
    <view class="charts-box" style="height: 600px;">
      <qiun-data-charts :canvas2d="true" type="map" :opts="{extra:{map:{mercator:true}}}" :onzoom="true" :chartData="chartsDataMap1"/>
    </view>
  </view>
</template>

<script setup lang="ts">
import { ref,onMounted } from "vue";
import mapdata from '../mockdata/guangzhou.json'

const chartsDataMap1=ref({series:mapdata.features})

onMounted(() => {
})
</script>

