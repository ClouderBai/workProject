/**
|--------------------------------------------------
| 权限管理页面接口
|--------------------------------------------------
*/

import request from '@/utils/request'

// 查询权限管理树的数据(返回全部数结构)
export function fetchAuthorityManageTree(orgId, roleCode) {
    return request({
        url: 'authorityManage/getAuthorityManageTree',
        method: 'GET',
        params: { orgId, roleCode }
    })
}

// 保存某个组织下所有的权限管理数据
export function updateAuthorityManage(roleActionList) {
    return request({
        url: 'authorityManage/updateAuthorityManage',
        method: 'POST',
        data: roleActionList
    })
}

// 查询某个组织下某个角色下对应的权限Action
export function fetchRoleActionListByOrgIdAndRoleCode(orgId, roleCode) {
    return request({
        url: 'authorityManage/getRoleActionListByOrgIdAndRoleCode',
        method: 'GET',
        params: { orgId, roleCode }
    })
}
