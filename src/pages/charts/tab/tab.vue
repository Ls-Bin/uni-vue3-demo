<template>
  <view class="content">


    <view>
      canvase2d：
      <u-radio-group v-model="canvas2d" @change="()=>openLazyload?onReload(false):onReload(true)">
        <u-radio :name="true">开启</u-radio>
        <u-radio :name="false">关闭</u-radio>
      </u-radio-group>
    </view>
    <view>
      开启懒加载
      <u-radio-group v-model="openLazyload" @change="onTabChange">
        <u-radio :name="true">开启</u-radio>
        <u-radio :name="false">关闭</u-radio>
      </u-radio-group>
    </view>


    <u-card v-for="(item, i) in groups" :key="i" title="商机数据" class="grpup">
      <view class="" slot="body">
        <u-tabs :list="menus" name="text" :is-scroll="false" v-model="currentTab" @change="onTabChange"></u-tabs>
        <view v-if="menus[currentTab].value === 'ucharts1'">
          <LazyLoad @show="onShow(i)">
            <qiun-title-bar title="漏斗图+渐变色" />
            <view class="charts-box">
              <qiun-data-charts :canvas2d="canvas2d" v-if="item.show" type="funnel"
                :opts="{ extra: { funnel: { linearType: 'custom' } } }" :chartData="chartsDataFunnel1" />
            </view>

            <!-- 如果tab切换的父容器使用了v-show来控制显示，组件上需绑定reshow属性用于强制重新渲染图表。如组件父元素没有v-show，则不必传此参数。-->
            <qiun-title-bar title="基本柱状图" />
            <view class="charts-box">
              <!-- 这里因为是页面初始化默认显示的，如果不给reshow也会显示，切换回来也不会变成白板，但切换到其他tab后，改变了窗口尺寸再切换回来后，没有reshow则不会根据改变后的窗口自动适应（除非在当前tab显示的情况下再变更窗口大小才会自适应），所以建议加上reshow属性 -->
              <qiun-data-charts :canvas2d="canvas2d" v-if="item.show" type="column" :chartData="chartsDataColumn1" />
            </view>
            <qiun-title-bar title="堆叠柱状图" />
            <view class="charts-box">
              <!-- 这个图加了reshow属性，上图没加，可以对比一下差异 -->
              <qiun-data-charts :canvas2d="canvas2d" v-if="item.show" type="column"
                :opts="{ extra: { column: { type: 'stack' } } }" :chartData="chartsDataColumn2"
                :reshow="currentTab === 'ucharts1'" />
            </view>
          </LazyLoad>
        </view>
        <view v-if="menus[currentTab].value === 'ucharts2'">
          <LazyLoad @show="onShow(i)">
            <!-- 第二个选项卡页面，用v-if控制则不需要加reshow，父元素使用v-if后，会导致组件重新加载，造成资源浪费 -->
            <qiun-title-bar title="基本饼状图" />
            <view class="charts-box">
              <qiun-data-charts :canvas2d="canvas2d" v-if="item.show" type="pie" :chartData="chartsDataPie1" />
            </view>
            <qiun-title-bar title="环形图" />
            <view class="charts-box">
              <qiun-data-charts :canvas2d="canvas2d" v-if="item.show" type="ring"
                :opts="{ extra: { ring: { ringWidth: 60, linearType: 'custom' } } }" :chartData="chartsDataRing1" />
            </view>
          </LazyLoad>
        </view>

        <!-- ECharts如果父元素用了v-if，因renderjs与逻辑层通信不同步，可能会导致初始化时监听不到prop变化，不能成功初始化，虽然组件内使用延时200ms的方法返回逻辑层强制重新读取数据，但这不是正确的解决问题的办法，并且父元素使用了 v-if 会导致组件重新加载，造成资源浪费，强烈建议将v-if改成v-show！！！ -->
        <view v-if="menus[currentTab].value === 'ucharts3'">
          <LazyLoad @show="onShow(i)">
            <qiun-title-bar title="基本柱状图" />
            <view class="charts-box">
              <qiun-data-charts :canvas2d="canvas2d" v-if="item.show" type="column" :chartData="chartsDataColumn1" />
            </view>
            <qiun-title-bar title="基本折线图" />
            <view class="charts-box">
              <qiun-data-charts :canvas2d="canvas2d" v-if="item.show" type="line" :chartData="chartsDataLine1" />
            </view>
          </LazyLoad>
        </view>
      </view>
    </u-card>
  </view>
</template>

<script >
//下面是演示数据，您的项目不需要引用，数据需要您从服务器自行获取
import demodata from '../mockdata/demodata.json';
import LazyLoad from '@/components/lazyLoad/lazy-load.vue';



export default {
  data() {
    return {
      canvas2d: true,
      openLazyload: true,
      chartsDataColumn1: {},
      chartsDataColumn2: {},
      chartsDataPie1: {},
      chartsDataRing1: {},
      chartsDataLine1: {},
      chartsDataLine2: {},
      chartsDataFunnel1: {},
      menus: [{ text: "uCharts图1", value: "ucharts1" },
      { text: "uCharts图2", value: "ucharts2" },
      { text: "uCharts图3", value: "ucharts3" }],
      currentTab: 0,
      groups: new Array(20).fill('').map(function () {
        return { show: false }
      })

    };
  },
  onLoad() {
    //模拟从服务器获取数据
    this.getServerData();
  },
  methods: {
    getServerData() {
      setTimeout(() => {
        //因部分数据格式一样，这里不同图表引用同一数据源的话，需要深拷贝一下构造不同的对象
        //开发者需要自行处理服务器返回的数据，应与标准数据格式一致，注意series的data数值应为数字格式
        this.chartsDataColumn1 = JSON.parse(JSON.stringify(demodata.Column));
        this.chartsDataColumn2 = JSON.parse(JSON.stringify(demodata.Column));
        this.chartsDataPie1 = JSON.parse(JSON.stringify(demodata.PieA));
        this.chartsDataRing1 = JSON.parse(JSON.stringify(demodata.PieA));
        this.chartsDataLine1 = JSON.parse(JSON.stringify(demodata.Line));
        this.chartsDataLine2 = JSON.parse(JSON.stringify(demodata.Line));
        this.chartsDataFunnel1 = JSON.parse(JSON.stringify(demodata.PieA))
      }, 1500);
    },
    switchTab(tab) {
      this.currentTab = tab;
    },
    onShow(index) {
      this.groups[index].show = true
    },
    onTabChange() {
      if (this.openLazyload) {
        this.onReload(false)
      } else {
        this.onReload(true)
      }
    },


    onReload(isShow = false) {
      this.groups = []

      this.$nextTick(() => {
        this.groups = new Array(20).fill('').map(function () {
          return { show: isShow }
        })
      })
    }
  },
  components: { LazyLoad }
};
</script>

<style>
.content {
  display: flex;
  flex-direction: column;
  flex: 1;
}

.charts-box {
  width: 100%;
  height: 300px;
}
</style>
