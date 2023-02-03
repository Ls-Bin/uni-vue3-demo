import Vue from 'vue'
import Vuex from 'vuex'

import user from '@/store/modules/user.js'
import createPersistedState from 'vuex-persistedstate'

Vue.use(Vuex)

const vuexPersisted = new createPersistedState({
    storage: {
    	getItem: key => uni.getStorageSync(key),
        setItem: (key, value) => uni.setStorageSync(key, value),
        removeItem: key => uni.removeStorageSync(key)
    },
	reducer(state){
		return{
      setUser:state.user
		}
	}
})

const store = new Vuex.Store({
    modules: {
    	user
    },
    plugins:[vuexPersisted]
})

export default store
