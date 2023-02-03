import { httpApi } from '../utils/http.js'

// 登录接口
export const login = (params)=> {
	return httpApi.request({
		url: 'auth/wechat/login/app',
		method: 'POST',
		data: params
	})
}