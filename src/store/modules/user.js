import { login } from '@/api/login'
import { removeToken } from '@/utils/auth'
import { Message } from 'element-ui'
import { fetchUserInfo } from '@/api/roleAccess'

const user = {
    state: {
        name: '',
        avatar: 'http://img.zcool.cn/community/011b20583809b9a8012060c8f8cee2.jpg',
        roles: [],
        userInfo: {}
    },
    mutations: {
        SET_NAME: (state, name) => {
            state.name = name
        },
        SET_AVATAR: (state, avatar) => {
            state.avatar = avatar
        },
        SET_ROLES: (state, roles) => {
            state.roles = roles
        },
        SET_USERINFO: (state, userInfo) => {
            state.userInfo = userInfo
        }
    },
    actions: {
        // 登录
        async Login({ commit }, userInfo) {
            const mobile = userInfo.username.trim()
            try {
                await login(mobile, userInfo.password)
            } catch (error) {
                Message.error(error.message)
                console.warn(`登陆接口失败${error}`)
            }
            localStorage.setItem('userData', JSON.stringify(user))
            // do additional commits
            return user
        },

        // 登出
        async LogOut({ commit }) {
            removeToken()
            commit('SET_ROLES', [])
        },

        // 获取用户信息
        GetUserInfo({ commit, state }) {
            return new Promise((resolve, reject) => {
                fetchUserInfo().then(res => {
                    commit('SET_USERINFO', res)
                    commit('SET_ROLES', res.rolesList)
                    // commit('SET_NAME', res.name)
                    // commit('SET_AVATAR', res.avatar)
                    // commit('SET_INTRODUCTION', res.introduction)
                    resolve(res)
                }).catch(error => {
                    reject(error)
                })
            })
        }
    }
}

export default user
