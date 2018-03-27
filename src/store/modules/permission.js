import { asyncRouterMap, constantRouterMap } from '@/router'

/**
 * 通过meta.role判断是否与当前用户权限匹配
 * @param roles
 * @param route
 */
function hasPermission(roles, route) {
    if (route.meta && route.meta.roles) {
        return roles.some(role => route.meta.roles.includes(role))
        // some(role => route.meta.roles.includes(role))
    } else {
        return false
        // return true
    }
}

/**
 * 递归过滤异步路由表，返回符合用户角色权限的路由表
 * @param asyncRouterMap
 * @param roles
 */
function filterAsyncRouter(asyncRouterMap, roles) {
    const accessedRouters = asyncRouterMap.filter(route => {
        if (hasPermission(roles, route)) {
            if (route.children && route.children.length) {
                route.children = filterAsyncRouter(route.children, roles)
            }
            return true
        }
        return false
    })
    return accessedRouters
}

const permission = {
    state: {
        routers: constantRouterMap,
        addRouters: []
    },
    //
    mutations: {
        SET_ROUTERS: (state, routers) => {
            state.addRouters = routers
            state.routers = constantRouterMap.concat(routers)
        }
    },
    //
    actions: {
        GenerateRoutes({ commit }, data) {
            return new Promise(resolve => {
                const { systemPermissionList } = data// eslint-disable-line
                // const roles = [systemPermissionList[0].code]
                const roles = ['useraccess', 'queryRolesList', 'getRole', 'addRole']

                let accessedRouters
                // if (roles.includes('admin')) {
                // accessedRouters = asyncRouterMap
                // } else {
                accessedRouters = filterAsyncRouter(asyncRouterMap, roles) // eslint-disable-line
                // }
                // console.log("accessedRouters", JSON.stringify(accessedRouters));

                commit('SET_ROUTERS', accessedRouters)
                resolve()
            })
        }
    }
}

export default permission
