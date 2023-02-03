import { config } from '../config.js'
import { wxLogin } from '@/utils/wxLogin.js'

class HTTP {
	constructor() {
		this.baseUrl = config.base_url
	}

	request({
		url,
		data = {},
		method = 'GET'
	}) {
		return new Promise((resolve, reject) => {
			this._request(url, resolve, reject, data, method)
		})
	}

	_request(url, resolve, reject, data = {}, method = 'GET') {
		let cookies = uni.getStorageSync('cookie');
		uni.request({
			url: `${this.baseUrl}${url}`,
			method: method,
			data: data,
			header: {
				'content-type': 'application/json',
				'appId': config.appId,
				'token': uni.getStorageSync('loginToken'),
				'cookie': cookies ? cookies.join(';') : ''
			},
			success: (res) => {
				let cookie = uni.getStorageSync('cookie');
				if (!cookie) {
					if (res.cookies.length > 0) {
						uni.setStorageSync('cookie', res.cookies)
					}

				}
				if (res.data) {
					const {
						success,
						error
					} = res.data
					if (success) {
						resolve(res.data)
					} else {
						// 登录失效
						if (error.code == -1) {
							uni.removeStorageSync('cookie')
							// 判断是否已经授权，是的话就重新登录
							let loginInfo = uni.getStorageSync('loginInfo')
							if(!loginInfo){
								uni.navigateTo({
									url: '/pages/auth/index'
								})
							}else{
								wxLogin()
							}
						} else {
							const error_code = error.code;
							const _message = error.message || '服务器错误';
							this._show_error(error_code, _message)
						}
						reject(error)
					}
				} else {
					resolve(res.data)
				}
			},
			fail: (err) => {
				reject()
				this._show_error(1)
			}
		})
	}

	_show_error(error_code, _message) {
		uni.showToast({
			title: `${_message}`,
			icon: 'none',
			duration: 2000
		})
	}
}
let httpApi = new HTTP()

export {
	httpApi
}
