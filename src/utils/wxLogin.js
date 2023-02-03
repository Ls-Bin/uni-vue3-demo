import {
	login
} from '@/sercive/userApi.js'
export const wxLogin = () => {
	return new Promise((resolve, reject) => {
		let params = uni.getStorageSync('loginInfo')
		let jsCode = uni.getStorageSync('jsCode')
		uni.showLoading()
		login({
			avatarUrl: '',
			city: '',
			country: '',
			gender: '',
			jsCode: jsCode,
			nickName: '',
			province: '',
			...params
		}).then((data) => {
			uni.hideLoading()
			if (data.success) {
				let result = data.result;
				uni.setStorageSync('loginToken', result.loginToken);
				uni.setStorageSync('loginTokenType', result.loginTokenType);
				uni.reLaunch({
					url: '/pages/index/index'
				})
			}
			resolve(data)
		}).catch((data) => {
			reject(data)
		});
	})
}
