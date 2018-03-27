import router from './router'
import store from './store'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import { Message } from 'element-ui'
import { getToken } from '@/utils/auth'
import { fetchMappingCfg } from './api/common'
// import { asyncRouterMap } from '@/router'

const mappingCfg = async() => { if (!store.getters.mappingCfg) await fetchMappingCfg().catch(e => Message.error(`获取数据失败${e}`)) }
const whiteList = ['/login']
router.beforeEach((to, from, next) => {
    NProgress.start()
    if (getToken()) {
        mappingCfg()
        // if (store.getters.roles.length === 0) {
        //     store.dispatch('GetUserInfo').then(res => {
        //         // const roles = res.systemPermissionList
        //         store.dispatch('GenerateRoutes', res).then(data => {
        //             router.addRoutes(store.getters.addRouters) // 动态添加可访问路由表
        //             // console.log("router.addRoutes(store.getters.addRouters)", store.getters.addRouters);
        //             next({ ...to, replace: true })
        //         })
        //     })
        // }
        if (to.path === '/login') {
            next({ path: '/' })
        } else {
            next()
        }
    } else {
        if (whiteList.indexOf(to.path) !== -1) {
            next()
        } else {
            next('/login')
            NProgress.done()
        }
    }
})

router.afterEach(() => {
    NProgress.done()
})
