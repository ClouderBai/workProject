import Vue from 'vue'
import Router from 'vue-router'

// in development-env not use lazy-loading, because lazy-loading too many pages will cause webpack hot update too slow. so only in production use lazy-loading;
// detail: https://panjiachen.github.io/vue-element-admin-site/#/lazy-loading

Vue.use(Router)

/* Layout */
import Layout from '../views/layout/Layout'

/**
* hidden: true                   if `hidden:true` will not show in the sidebar(default is false)
* redirect: noredirect           if `redirect:noredirect` will no redirct in the breadcrumb
* name:'router-name'             the name is used by <keep-alive> (must set!!!)
* meta : {
    title: 'title'               the name show in submenu and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar,
  }
**/
export const constantRouterMap = [
    { path: '/login', component: () => import('@/views/login/index'), hidden: true },
    { path: '/404', component: () => import('@/views/404'), hidden: true },

    {
        path: '/',
        component: Layout,
        redirect: 'dashboard',
        hidden: true,
        children: [{
            path: 'dashboard',
            name: 'dashboard',
            component: () => import('@/views/dashboard/index'),
            meta: { title: '首页', noCache: true }
        }]
    },
    {
        path: '/system-management',
        component: Layout,
        name: 'system-management',
        meta: { title: '系统管理', icon: 'projectManager', roles: [] },
        redirect: 'noredirect',
        children: [{
            path: 'systemSetting',
            name: 'SystemSetting',
            component: () => import('@/views/system-management/systemSetting'),
            meta: { title: '系统参数设置', icon: 'systemParameter', roles: [] }
        },
        {
            path: 'dictionaryController',
            name: 'dictionaryController',
            component: () => import('@/views/system-management/dictionaryController'),
            meta: { title: '数据字典', icon: 'dataDictionary', roles: [] }
        },
        {
            path: 'codeManager',
            name: 'codeManager',
            component: () => import('@/views/system-management/codeManager'),
            meta: { title: '编码服务', icon: 'codeService', roles: [] }
        },
        {
            path: 'funcModule',
            name: 'funcModule',
            component: () => import('@/views/system-management/funcModule'),
            meta: { title: '功能模块配置', icon: 'functionModule', roles: [] }
        },
        {
            path: 'standardMenuManager',
            name: 'standardMenuManager',
            component: () => import('@/views/system-management/standardMenuManager'),
            meta: { title: '标准菜单管理', icon: 'standardMenu', roles: [] }
        },
        {
            path: 'menuManager',
            name: 'menuManager',
            component: () => import('@/views/system-management/menuManager'),
            meta: { title: '菜单管理', icon: 'menuManagement', roles: [] }
        }]
    },
    {
        path: '/org-management',
        component: Layout,
        name: 'org-management',
        meta: { title: '组织管理', icon: 'table', roles: [] },
        redirect: 'noredirect',
        children: [{
            path: 'orgMaintain',
            name: 'OrgMaintain',
            component: () => import('@/views/org-management/orgMaintain'),
            meta: { title: '组织维护', icon: 'organization', roles: [] }
        },
        {
            path: 'userMaintain',
            name: 'UserMaintain',
            component: () => import('@/views/org-management/userMaintain'),
            meta: { title: '用户维护', icon: 'maintain', roles: [] }
        },
        {
            path: 'roleManagement',
            name: 'RoleManagement',
            component: () => import('@/views/org-management/roleManagement'),
            meta: { title: '角色管理', icon: 'rolemanage', roles: [] }
        },
        {
            path: 'accessManagement',
            name: 'accessManagement',
            component: () => import('@/views/org-management/accessManagement'),
            meta: { title: '权限维护', icon: 'datamain', roles: [] }
        },
        {
            path: 'roleUserManagement',
            name: 'RoleUserManagement',
            component: () => import('@/views/org-management/roleUserManagement'),
            meta: { title: '角色人员管理', icon: 'uesrmain', roles: [] }
        }]
    },
    // {
    //     path: '/role-access',
    //     component: Layout,
    //     name: 'role-access',
    //     meta: { title: '角色和权限', icon: 'roleauthority', roles: [] },
    //     redirect: 'noredirect',
    //     children: [{
    //         path: 'roleMaintain',
    //         name: 'RoleMaintain',
    //         component: () => import('@/views/role-access/roleMaintain'),
    //         meta: { title: '角色维护', icon: 'uesrmain', roles: [] }
    //     },
    //     {
    //         path: 'roleGroup',
    //         name: 'RoleGroup',
    //         component: () => import('@/views/role-access/roleGroup'),
    //         meta: { title: '角色组', icon: 'group_fill', roles: [] }
    //     },
    //     {
    //         path: 'accessMaintain',
    //         name: 'AccessMaintain',
    //         component: () => import('@/views/role-access/accessMaintain'),
    //         meta: { title: '权限维护', icon: 'datamain', roles: [] }
    //     },
    //     {
    //         path: 'roleUser',
    //         name: 'RoleUser',
    //         component: () => import('@/views/role-access/roleUser'),
    //         meta: { title: '角色用户', icon: 'rolemanage', roles: [] }
    //     }]
    // },
    {
        path: '/gantt',
        component: Layout,
        name: 'gantt',
        meta: { title: '传说中的甘特图', icon: 'table', roles: [] },
        redirect: '/gantt/index',
        children: [{
            path: 'gantt',
            name: 'GanttIndex',
            component: () => import('@/views/gantt/gantt'),
            meta: { title: '传说中的甘特图', icon: 'laboratory', roles: [] }
        }]
    },
    {
        path: '/form-management',
        component: Layout,
        name: 'form-management',
        meta: { title: '表单管理', icon: 'formManager', roles: [] },
        redirect: 'noredirect',
        children: [{
            path: 'index',
            name: 'index',
            component: () => import('@/views/form-management'),
            meta: { title: '表单管理', icon: 'formManage', roles: [] }
        },
        {
            path: 'formEditer',
            name: 'formEditer',
            component: () => import('@/views/form-management/formEditer'),
            meta: { title: '表单编辑器', icon: 'formEditor', roles: [] }
        }]
    },
    {
        path: '/flow-management',
        component: Layout,
        name: 'flow-management',
        meta: { title: '工作流管理', icon: 'workflowManager', roles: [] },
        redirect: 'noredirect',
        children: [{
            path: 'flowManagement',
            name: 'flowManagement',
            component: () => import('@/views/flow-management'),
            meta: { title: '工作流管理', icon: 'workflow', roles: [] }
        },
        {
            path: 'flowDesigner',
            name: 'flowDesigner',
            component: () => import('@/views/flow-management/flowDesigner'),
            meta: { title: '工作流编辑器', icon: 'workflowEditing', roles: [] }
        }]
    },
    {
        path: '/example',
        component: Layout,
        redirect: '/example/table',
        name: 'Example',
        meta: { title: 'Example', icon: 'example' },
        children: [
            {
                path: 'table',
                name: 'Table',
                component: () => import('@/views/table/index'),
                meta: { title: 'Table', icon: 'tabulation' }
            },
            {
                path: 'tree',
                name: 'Tree',
                component: () => import('@/views/tree/index'),
                meta: { title: 'Tree', icon: 'bigTree' }
            },
            {
                path: 'dragableTree',
                name: 'dragableTree',
                component: () => import('@/views/tree/twocolum/index'),
                meta: { title: 'dragableTree', icon: 'bigTree' }
            },
            {
                path: 'treeExample',
                name: 'treeExample',
                component: () => import('@/views/tree/dragableTree'),
                meta: { title: 'treeExample', icon: 'bigTree' }
            },
            {
                path: 'fetchAllStandardMenuList',
                name: 'fetchAllStandardMenuList',
                component: () => import('@/views/tree/vue-dragable-tree'),
                meta: { title: 'fetchAllStandardMenuList', icon: 'bigTree' }
            }
        ]
    },

    {
        path: '/form',
        component: Layout,
        children: [
            {
                path: 'index',
                name: 'Form',
                component: () => import('@/views/form/index'),
                meta: { title: 'Form', icon: 'form_fill' }
            }
        ]
    },
    {
        path: '/bim',
        component: Layout,
        name: 'Bim',
        meta: { title: '测试', icon: 'test', roles: [] },
        redirect: 'noredirect',
        children: [{
            path: 'e1',
            name: 'E11',
            component: () => import('@/views/bim/e1'),
            meta: { title: 'BAI的实验室', icon: 'laboratory', roles: [] }
        },
        {
            path: 'e2',
            name: 'E22',
            component: () => import('@/views/bim/e2'),
            meta: { title: '例子2', icon: 'form' }
        },
        {
            path: 'e3',
            name: 'E33',
            component: () => import('@/views/bim/e3'),
            meta: { title: 'zlh-test', icon: 'form' }
        }]
    },
    {
        path: '/styleExample',
        component: Layout,
        meta: { title: '样式用例', icon: 'styleUseCase', roles: [] },
        children: [{
            path: 'e1',
            name: 'E1',
            component: () => import('@/views/styleExample/e1'),
            meta: { title: '例子1', noCache: true, icon: 'form' }
        },
        {
            path: 'e2',
            name: 'E2',
            component: () => import('@/views/styleExample/e2'),
            meta: { title: '例子2', noCache: true, icon: 'form' }
        },
        {
            path: 'e3',
            name: 'E3',
            component: () => import('@/views/styleExample/e3'),
            meta: { title: '例子3', noCache: true, icon: 'form' }
        },
        {
            path: 'e4',
            name: 'E4',
            component: () => import('@/views/styleExample/e4'),
            meta: { title: '例子4', noCache: true, icon: 'form' }
        }]
    },
    { path: '*', redirect: '/404', hidden: true }
]

export default new Router({
    // mode: 'history', //后端支持可开
    scrollBehavior: () => ({ y: 0 }),
    routes: constantRouterMap
})

export const asyncRouterMap = []
