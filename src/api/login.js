import request from '@/utils/request'
import User from '@/model/User'

// 登录
export async function login(mobile, password) {
    const data = await request({
        url: '/login/login.jo',
        method: 'post',
        data: {
            mobile,
            password
        }
    })
    return new User().init(data)
}

// 用户信息
export async function fetchLoginUserInfo() {
    const data = await request({
        url: '/login/queryLoginUserInfo.jo',
        method: 'GET'
    })
    return new User().init(data)
}
