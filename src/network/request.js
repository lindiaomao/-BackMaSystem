import axios from "axios";

export const request = config => {
	return new Promise((resolve) => {
		const instance = axios.create({
			baseURL: 'http://127.0.0.1:8888/api/private/v1/',
			timeout: 5000
		})
		// 请求拦截
		instance.interceptors.request.use(config => {
			config.headers.Authorization = window.sessionStorage.getItem('token')
			return config
		},
		error=>{
			return Promise.reject(error)
		})
		// 响应拦截
		instance.interceptors.response.use(data => {
			return data.data
		})

		instance(config).then(data => {
			resolve(data)
		})
	})
}