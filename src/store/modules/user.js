import {
	getCache,
	myStorage
} from '@/utils/storage'
import {
	httpApi
} from '@/utils/http'
const user = {
	state: {
		userInfo: {},
		recordId: '',
		currentRecordInfo: null,
		auth: false
	},
	mutations: {
		setUserInfo(state, data) {
			state.userInfo = data
		},
		setCurrentRecord (state, data) {
			state.recordId = data
		},
		setCurrentRecordInfo(state, data){
			state.currentRecordInfo = data
		},
		setAuth(state, data){
			state.auth = data
		},
	},
	actions: {
		getCurrentRecord({commit}){
			httpApi.request({
				url: '/v1/userBaseInfo/getCurrentSelect',
				method: 'POST',
			}).then(data => {
				if(data.success){
					commit('setCurrentRecordInfo', data.result)
				}
			})
		}
	},
	getters: {
		userInfo: (state) => state.userInfo,
		recordId: (state) => state.recordId,
		currentRecordInfo: (state) => state.currentRecordInfo,
		auth: (state) => state.auth
	}
}

export default user
