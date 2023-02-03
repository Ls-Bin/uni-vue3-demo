let BASE_URL = ''
if (process.env.NODE_ENV == 'development') {
		BASE_URL = 'http://192.168.0.53:8203/apis/'
} else {
		BASE_URL = ''
}
const config = {
	base_url: BASE_URL,
	appId: '',
	appKey: ''
}

export { config }
