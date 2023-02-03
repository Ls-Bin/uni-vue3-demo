<template>
  <view class="content">
    <image class="logo" src="/static/logo.png" />
    <view class="text-area">
      <text class="title">{{ title }}</text>

      <!-- 与包裹页面所有内容的元素u-page同级，且在它的下方 -->
      <!-- <u-tabbar v-model="current" :list="list" :mid-button="true"></u-tabbar> -->
    </view>
  </view>
</template>

<script setup lang="ts">
import { ref } from "vue";
const title = ref("Hello");

const current = ref(0);
const list = ref([
  {
    iconPath: "home",
    selectedIconPath: "home-fill",
    text: "首页",
    count: 2,
    isDot: true,
    customIcon: false,
  },
  {
    iconPath: "photo",
    selectedIconPath: "photo-fill",
    text: "地图",
    customIcon: false,
    pagePath: "/pages/charts/map/index",
  },
  {
    iconPath: "https://cdn.uviewui.com/uview/common/min_button.png",
    selectedIconPath: "https://cdn.uviewui.com/uview/common/min_button_select.png",
    text: "发布",
    midButton: true,
    customIcon: false,
  },
  {
    iconPath: "play-right",
    selectedIconPath: "play-right-fill",
    text: "直播",
    customIcon: false,
  },
  {
    iconPath: "account",
    selectedIconPath: "account-fill",
    text: "我的",
    count: 23,
    isDot: false,
    customIcon: false,
  },
]);
</script>

<style>
.content {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.logo {
  height: 200rpx;
  width: 200rpx;
  margin-top: 200rpx;
  margin-left: auto;
  margin-right: auto;
  margin-bottom: 50rpx;
}

.text-area {
  display: flex;
  justify-content: center;
}

.title {
  font-size: 36rpx;
  color: #8f8f94;
}
</style>
