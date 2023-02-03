<template>
	<view class="lazyload-content" :style="{
		width,
		height,
	}">
		<slot></slot>
	</view>
</template>

<script>
let loadTimer = null
/**
 * 懒加载插件
 * @description 懒加载插件
 * @property {String}			width				图片宽度,必须带尺寸单位(默认100%)
 * @property {String}			height				图片高度,必须带尺寸单位(默认100%)
 * @property {Object}			showDistance		 当图片到屏幕哪个位置的时候开始加载,单位px,可以是负数 (默认{bottom:0})
 * @event {Function} show 当元素进入页面触发
 * @example <lazy-load :src="src" width="100rpx" height="100rpx"></lazy-load>
 */

export default {
	name: "lazy-load",
	props: {
		//图片宽度
		width: {
			type: String,
			default: '100%'
		},
		height: {
			type: String,
			default: '100%'
		},
		//当图片到屏幕哪个位置的时候开始加载 单位px 可以是负数
		showDistance: {
			type: Object,
			default: () => {
				bottom: 20
			}
		},
	

	},
	data() {
		return {
			status: 0, //0加载中 1加载成功 2加载失败
			isShow: false
		}
	},
	created() {
		this.init()
	},
	destroyed() {
		//页面销毁取消监听
		this.$emit('destroyed')
	},
	methods: {
		init() {
			let intersectionObserver = uni.createIntersectionObserver(this)
			let load = false
			intersectionObserver.relativeToViewport(this.showDistance).observe('.lazyload-content', (res) => {
				if (!load && res.intersectionRatio == 0) {
					load = true
					return
				}
				this.$emit('show');
				load = true
				loadTimer = new Date().getTime()
				intersectionObserver.disconnect()
			})
		}
	}

}
</script>

<style lang="scss" scoped>
.lazyload-content {
	overflow: hidden;
	position: relative;

	.lazyload-image {
		display: block;
		will-change: transform;
	}

	.lazyload-load {
		position: absolute;
		left: 0;
		top: 0;
	}
}
</style>
