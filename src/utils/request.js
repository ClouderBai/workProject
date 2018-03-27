import axios from 'axios'
import { setToken, getToken } from '@/utils/auth'

const service = axios.create({
    // baseURL: process.env.API_ENDPOINT,
    // baseURL: 'http://10.1.1.247:8080/rest',
    baseURL: 'http://bimsapi.bimz.cn:9999/bimsapi/rest',
    timeout: 10 * 1000
})

service.interceptors.request.use(config => {
    const token = getToken()
    if (token) config.headers['authorization'] = token
    return config
}, error => {
    Promise.reject(error)
})

service.interceptors.response.use(
    response => {
        // console.log('%c%s', 'color:red', 'response  : ', JSON.stringify(response.headers['content-type']))
        if (!/application\/json/.test(response.headers['content-type'])) {
            // console.count('json')
            return response
        }
        const res = response.data
        if (res.status > 0) {
            const token = response.headers.token
            if (token) setToken('Bearer ' + token)
            return res.data
        }
        return Promise.reject(res)
    },
    error => {
        return Promise.reject(error)
    }
)

export default service
