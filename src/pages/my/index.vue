<template>
	<view class="container" >
		<view class="content">
			<view class="main">
				<view class="header">
					<view class="user">
						<view class="top">
							<view class="avatar-box">
								<image
									class="avatar"
									@click="getUserInfo"
									:src="userInfo.avatarUrl || '/static/images/my/icon_uesr_boy.png'"
									alt=""
									:style="{border: userInfo.avatarUrl?'4rpx solid #fff':'4rpx solid #ff9b0b'}"
								/>
								<view class="name" @click="getUserInfo">{{userInfo.nickName ? 'Hello，' +  userInfo.nickName : '获取头像'}}</view>
							</view>
						</view>
						<view class="bottom-text">
							<img src="/static/images/my/icon_logo_only.png" alt="" >
							<text class="devider">|</text>
							<text class="text">demo文本</text>
						</view>
					</view>
				</view>
				<view class="logout" @click="logoutShow = true">
					退出登录
				</view>
			</view>
		</view>
		
		<!-- 退出登录弹窗 -->
		<!-- <zj-modal
		:showTitle="false"
		:content="'是否退出当前账号登录'"
		:value="logoutShow"
		@confirm="logout"
		@cancel="logoutShow = false"
		:confirmText="'退出'"
		:cancelText="'取消'"
		:cancelColor="'#FF8200'"
		showCancelButton="true">
		</zj-modal> -->

			<u-modal v-model="logoutShow" content="是否退出当前账号登录" show-cancel-button confirm-text="退出" @confirm="logout"></u-modal>
		
	</view>
</template>

<script>
	import {
		mapState
	} from 'vuex';
	import {
		httpApi
	} from '@/utils/http'
	export default {
		data() {
			return {
				logoutShow: false,
				bgImg: '',
				userInfo: {}
			};
		},
		computed: {
			bgImage() {
				return `background:url('${this.bgImg}') no-repeat;background-size: 100%;`
			}
		},
		onShow() {

		},
		methods: {
		
			// 获取个人公开信息
			getUserInfo(){
				let that = this
				if(!this.userInfo.nickName){
					uni.getUserProfile({
						desc: '获取你的昵称、头像、地区及性别',
						success(data) {
							uni.setStorageSync('userInfo',data.userInfo)
							that.userInfo = data.userInfo
						},
						fail(data) {
							uni.showToast({
								icon: 'none',
								title: '授权失败'
							})
						}
					})
				}
			},
			
			// 退出登录
			logout(e) {
console.log('退出点击',e)

				uni.clearStorage()
				this.logoutShow = false
				uni.navigateTo({
					url: '/pages/auth/index'
				})
				uni.login({
					provider: 'weixin',
					success: (res) => {
						uni.setStorageSync('jsCode', res.code)
					},
				})
			}
			
		}
	}
</script>

<style scoped lang="scss">
	.container {
		height: 100vh;
		padding: 0;
		background-size: 100%;
		background-repeat: no-repeat;

		.main {
			height: 100vh;
			margin-bottom: 100rpx;
			margin-top: 200rpx;
			background: #F4F5F6;
			border-radius: 16rpx 16rpx 0rpx 0rpx;
		}

		.content {
			// height: calc(100vh - 200rpx);
			overflow-y: auto;
			border-radius: 16rpx 16rpx 0px 0px;

		}
	}

	.header {
		    height: 82rpx;
		    width: 100%;
		    margin: 0 auto;
		    display: flex;
		    justify-content: center;

		.title {
			font-weight: 500;
			color: #000000;
			font-size: 37rpx;
			text-align: center;
			padding-top: 58rpx;
			margin-bottom: 66rpx;
		}

		.user {
			position: relative;
			top: -160rpx;
			display: flex;
			flex-direction: column;
			width: 686rpx;
			height: 230rpx;
			background: #FFFFFF;
			box-shadow: 0px 4px 53px 0px rgba(199, 173, 148, 0.16);
			border-radius: 8rpx;

			.top {
				    height: 174rpx;
			}

			.name {
				margin-top: -106rpx;
				    margin-left: 178rpx;
				flex-grow: 1;
				font-size: 46rpx;
				    color: #333333;
			}

			.bottom-text {
				display: flex;
				    width: 610rpx;
				    margin: 0 auto;
				image {
					height: 32rpx;
					width: 32rpx;
				}
				.devider {
					    color: #D8D8D8;
					    font-size: 26rpx;
					    margin: 0 10rpx;
				}
				.text {
					font-size: 26rpx;
					color: #999999;
				}
			}
		}

		.exit {
			display: inline-block;
			width: 33rpx;
			height: 36rpx;
		}

		.avatar-box {
			// display: flex;
			// justify-content: center;
			// align-items: center;
			// width: 148rpx;
			// height: 148rpx;
			border-radius: 50%;
			// border: 2px solid #A0C7FF;
			margin-right: 32rpx;
			    margin-left: 40rpx;
			    margin-top: -33rpx;

			.avatar {
				display: inline-block;
				width: 160rpx;
				height: 160rpx;
				border-radius: 50%;
				background: #eeeeee;
			}
		}
	}

	.tool {
	   border-radius: 8rpx;
	   background: #ffF;
	   margin: 30rpx 36rpx 0 36rpx;
		.list {
			// display: flex;
			// align-items: center;
			// height: 116rpx;
			background: #FFFFFF;
			border-radius: 8rpx;
			padding: 16rpx 32rpx;

			text {
				flex-grow: 1;
			}
		}

		.record {
			.record-img-box {
				width: 100%;
				display: flex;
				align-items: center;
				justify-content: space-between;
				.total {
					display: flex;
					align-items: center;
				}
				.record-img {
					width: 88rpx;
					height: 88rpx!important;
					    margin-left: -20rpx;
				}
				.num {
					font-size: 28rpx;
					color: #999999;
					height: 40rpx;
					margin-right: 10rpx;
				}
				.allow {
					width: 12rpx;
					height: 20rpx!important;
				}
				.title {
					    line-height: 96rpx;
				}
			}

			.record-item-box {
				margin: 30rpx 0;
				.record-item {
					height: 154rpx;
					background: #FFFAF4;
					border-radius: 8rpx;
					border: 1rpx solid #FFDCB3;
					padding: 32rpx;
					display: flex;
					align-content: center;
					margin-top: 32rpx;

					.avatar {
						display: inline-flex;
						align-items: center;
						justify-content: center;
						width: 100rpx;
						height: 100rpx;

						img {
							display: inline-block;
							width: 100rpx;
							height: 100rpx;
						}
					}
					.info {
						margin-left: 36rpx;
						width: 100%;

						.basic {
							display: flex;
							align-items: center;
							color: #B2B5C2;
							font-size: 30rpx;

							.name {
								color: #333333;
								font-size: 36rpx;
								margin-right: 52rpx;
							}

							.id-num {
								color: #4E4E4E;
								font-size: 26rpx!important;
							}
						}
					}

					.add-img {
						width: 90rpx;
						height: 90rpx;
					}
					.title {
						display: flex;
						align-items: center;
						margin-left: 20rpx;
						font-size: 36rpx;
						color: #333333;
					}
				}


			}

		}

	}

	.logout {
		width: 686rpx;
		height: 96rpx;
		background: #FFFFFF;
		border-radius: 48rpx;
		border: 1rpx solid #BEBEBE;
		font-size: 34rpx;
		color: #999999;
		margin: 100rpx 36rpx 44rpx 36rpx;
		display: flex;
		align-items: center;
		justify-content: center;
		&:active {
			opacity: .7;
		}
	}
</style>
