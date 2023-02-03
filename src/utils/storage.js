const myStorage = {
    //存储
    set(key, value) {
        uni.setStorageSync(key, JSON.stringify(value));
    },
    //取出数据
    get(key) {
        try {
            const value = uni.getStorageSync(key);
            if (value === null || value === undefined || value === "") {
                return null;
            }
            return JSON.parse(uni.getStorageSync(key));
        } catch (err) {
            return null
        }
    },
    //删除数据
    remove(key) {
		uni.clearStorageSync(key)
    }
}
// key vuex-persistedstate 中设置的key值模块 retrun=>对应的缓存数据
const getCache = (key)=>{
    let cache = myStorage.get('vuex') ? myStorage.get('vuex') : null
    return cache ? cache[key] : null
}
export {
    myStorage,
    getCache
}