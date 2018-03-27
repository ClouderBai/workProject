import request from '@/utils/request'
import RoleGroup from '@/model/RoleGroup.js'
import RoleCustomizePermission from '@/model/RoleCustomizePermission.js'
import RoleCustimizeList from '@/model/RoleCustimizeList.js'
import Role from '@/model/Role'
import Page from '@/model/Page'
import OrgUser from '@/model/OrgUser'
import qs from 'qs'

// 获取用户角色列表
export function fetchUserInfo() {
    return request({
        url: 'login/queryLoginUserInfo.jo',
        method: 'GET'
    })
}

// -----------------------角色----------------------------------------------------------
// 校验角色code是否重复
export function checkRoleCode(roleCode, roleId) {
    return request({
        url: 'useraccess/validateRoleCode',
        method: 'GET',
        params: {
            roleCode,
            roleId
        }
    })
}

// 获取用户角色列表
export function fetchRolesList(params) {
    return request({
        url: 'useraccess/getRoleByGroupCode',
        method: 'GET',
        params
    })
}

// 更新角色列表排序
export function updateRoleOrders(data) {
    return request({
        url: 'useraccess/updateRoleOrders',
        method: 'POST',
        data
    })
}

// 清空角色列表
export function clearRolesList(params) {
    return request({
        url: 'useraccess/deleteRoleByGroupCode',
        method: 'GET',
        params
    })
}

// 获取可添加角色列表
export function fetchRolesListAdded(params) {
    return request({
        url: 'useraccess/getRoleNotInGroupMapping',
        method: 'GET',
        params
    })
}

// 添加可添加角色
export function addRoleToGroup(data) {
    return request({
        url: 'useraccess/insertSelectRole',
        method: 'POST',
        data
    })
}

// 新增用户角色
export function createRole(data) {
    return request({
        url: 'useraccess/addRole',
        method: 'POST',
        data
    })
}

// 修改用户角色
export function updateRole(data) {
    return request({
        url: 'useraccess/updateRole',
        method: 'POST',
        data
    })
}

// 删除用户角色
export function deleteRole(params) {
    return request({
        url: 'useraccess/deleteRole',
        method: 'GET',
        params
    })
}

// 获取用户角色列表
export async function fetchRoleList(params) {
    const res = new Page().init(await request({
        url: 'useraccess/getRolesList',
        method: 'GET',
        params
    }))
    res.entities = res.entities.map(v => new Role().init(v))
    return res
}

// 搜索角色
export async function searchRolesList(params) {
    const res = new Page().init(await request({
        url: 'useraccess/search',
        method: 'GET',
        params
    }))
    res.entities = res.entities.map(v => new Role().init(v))
    return res
}
// -----------------------角色----------------------------------------------------------

// -----------------------角色组--------------------------------------------------------
// 获取角色组列表
export async function fetchRolesGroupList(params) {
    return (await request({
        url: 'useraccess/getRoleGroup',
        method: 'GET',
        params
    })).map(v => new RoleGroup().init(v))
}

// 新建角色组
export function createRoleGroup(data) {
    return request({
        url: 'useraccess/addRoleGroup',
        method: 'POST',
        data
    })
}

// 修改角色组
export function updateRoleGroup(data) {
    return request({
        url: 'useraccess/updateRoleGroup',
        method: 'POST',
        data
    })
}

// 删除角色组
export function deleteRoleGroup(params) {
    return request({
        url: 'useraccess/deleteRoleGroup',
        method: 'GET',
        params
    })
}

// 复制角色组
export function copyRoleGroup(sourceGroupCode, targetGroupCode) {
    return request({
        url: 'useraccess/insertCopyGroup',
        method: 'POST',
        data: qs.stringify({
            sourceGroupCode,
            targetGroupCode
        })
    })
}

// 验证角色组编码
export function checkRoleGroup(code, id) {
    return request({
        url: 'useraccess/validateRoleGroupCode',
        method: 'GET',
        params: {
            roleGroupCode: code,
            roleGroupId: id
        }
    })
}
// -----------------------角色组--------------------------------------------------------

// -----------------------角色权限----------------------------------------------------------
// 获取角色对应权限
export async function fetchpermission(params) {
    const data = (await request({
        url: 'useraccess/permission/getAllByRoleCode',
        method: 'GET',
        params
    })).ownPermissionList
    for (let i = 0, len = data.length; i < len; i++) {
        data[i].key = `${i + 1}-0`
        for (let j = 0, lenj = data[i].permissionList.length; j < lenj; j++) {
            data[i].permissionList[j].key = `${i + 1}-${j + 1}`
        }
    }
    return data.map(v => new RoleCustomizePermission().init(v))
}

// 获取角色对应权限
export async function fetchpermissionSystem(params) {
    const data = (await request({
        url: 'useraccess/permission/getAllByRoleCode',
        method: 'GET',
        params
    })).systemPermissionList
    for (let i = 0, len = data.length; i < len; i++) {
        data[i].key = `${i + 1}-0`
        for (let j = 0, lenj = data[i].actionDmnObjList.length; j < lenj; j++) {
            data[i].actionDmnObjList[j].key = `${i + 1}-${j + 1}`
        }
    }
    return data.map(v => new RoleCustomizePermission().init(v))
}

// 新增权限类别
export function createPermissionClass(data) {
    return request({
        url: 'useraccess/createPermissionCat',
        method: 'POST',
        data
    })
}

// 新增权行为
export function createPermissionBehavior(data) {
    return request({
        url: 'useraccess/createPermission',
        method: 'POST',
        data
    })
}

// 修改权限类别
export function updatePermissionClass(data) {
    return request({
        url: 'useraccess/update/permissionCat',
        method: 'POST',
        data
    })
}

// 修改权限行为
export function updatePermissionBehavior(data) {
    return request({
        url: 'useraccess/update/permission',
        method: 'POST',
        data
    })
}

// 搜索角色权限
export async function searchPermission(params) {
    return (await request({
        url: 'useraccess/search/permission',
        method: 'GET',
        params
    })).ownPermissionList.map(v => new RoleCustomizePermission().init(v))
}

// 搜索系统权限
export async function searchSystemPermission(params) {
    return (await request({
        url: 'useraccess/search/permission',
        method: 'GET',
        params
    })).systemPermissionList.map(v => new RoleCustomizePermission().init(v))
}

// 复制角色权限
export function copyPermission(params) {
    return request({
        url: 'useraccess/copy/role',
        method: 'GET',
        params
    })
}

// 保存角色自定义权限
export function updateOwnPermission(roleCode, ownPermissionList) {
    return request({
        url: 'useraccess/save/ownPermission',
        method: 'POST',
        data: { roleCode, ownPermissionList }
    })
}

// 保存角色系统权限
export function updateSysPermission(roleCode, systemPermissionList) {
    return request({
        url: 'useraccess/save/sysPermission',
        method: 'POST',
        data: { roleCode, systemPermissionList }
    })
}

// 验证自定义权限类别编码
export function checkPermissionClassCode(code, id) {
    return request({
        url: 'useraccess/validatePermissionCat',
        method: 'GET',
        params: {
            catCode: code,
            catId: id
        }
    })
}

// 验证自定义权限行为编码
export function checkPermissionBehaviorCode(permissionCode, permissionId, permissionCatCode) {
    return request({
        url: 'useraccess/validatePermission',
        method: 'GET',
        params: {
            permissionCatCode,
            permissionCode,
            permissionId
        }
    })
}

// 删除权限类别
export function deletePermission(catCode, code) {
    return request({
        url: 'useraccess/delete/permission',
        method: 'GET',
        params: { catCode, code }
    })
}

// 删除权限类别下的权限
export function deletePermissionCat(catCode) {
    return request({
        url: 'useraccess/delete/permissionCat',
        method: 'GET',
        params: { catCode }
    })
}

// -----------------------权限----------------------------------------------------------

// -----------------------角色用户----------------------------------------------------------
// 搜索用户权限
export async function fetchRoleUserList(params) {
    const res = new Page().init(await request({
        url: 'useraccess/role/selectUsers',
        method: 'GET',
        params
    }))
    res.entities = res.entities.map(v => new OrgUser().init(v))
    return res
}

// 搜索角色用户
export async function searchRoleUserList(params) {
    const res = new Page().init(await request({
        url: 'useraccess/search/roleUser',
        method: 'GET',
        params
    }))
    res.entities = res.entities.map(v => new OrgUser().init(v))
    return res
}

// 删除角色下用户
export function deleteRoleUser(data) {
    return request({
        url: 'useraccess/delete/roleUser',
        method: 'POST',
        data: qs.stringify(data)
    })
}

// 添加角色下用户
export function createRoleUser(data) {
    return request({
        url: 'useraccess/add/roleUser ',
        method: 'POST',
        data: qs.stringify(data)
    })
}

// -----------------------角色用户----------------------------------------------------------
