const getters = {
    sidebar: state => state.app.sidebar,
    token: state => state.user.token,
    avatar: state => state.user.avatar,
    name: state => state.user.name,
    roles: state => state.user.roles,
    userInfo: state => state.user.userInfo,
    mappingCfg: state => state.dictionary.mappingCfg,
    permission_routers: state => state.permission.routers,
    // permission_routers: state => state.user.userInfo.systemPermissionList,
    addRouters: state => state.permission.addRouters,
}
export default getters
