import request from '@/utils/request'
import Role from '@/model/Role'
import Page from '@/model/Page'
import RoleUser from '@/model/RoleUser'
import qs from 'qs'

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

// 删除角色
export function deleteRole(data) {
    return request({
        url: 'useraccess/deleteRole',
        method: 'POST',
        data: qs.stringify(data)
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

// 复制角色
export function copyRoleFromOrg(data) {
    return request({
        url: 'useraccess/copyRoleFromOrg',
        method: 'POST',
        data: qs.stringify(data)
    })
}

// 显示角色对应的用户列表
export async function fetchRoleUserList(params) {
    const res = new Page().init(await request({
        url: 'useraccess/role/selectUsers',
        method: 'GET',
        params
    }))
    res.entities = res.entities.map(v => new RoleUser().init(v))
    return res
}

// 添加角色下用户
export function addRoleUser(data) {
    return request({
        url: 'useraccess/add/roleUser ',
        method: 'POST',
        data: qs.stringify(data)
    })
}

// 搜索角色用户
export async function searchRoleUserList(params) {
    const res = new Page().init(await request({
        url: 'useraccess/search/getRoleUserByFilter',
        method: 'GET',
        params
    }))
    res.entities = res.entities.map(v => new RoleUser().init(v))
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

// 根据orgId获取用户
export async function fetchUserByOrgId(params) {
    const res = new Page().init(await request({
        url: 'useraccess/getUsersByOrgId',
        method: 'GET',
        params
    }))
    res.entities = res.entities.map(v => new RoleUser().init(v))
    return res
}

// 搜索用户
export async function searchUserByFilter(params) {
    const res = new Page().init(await request({
        url: 'useraccess/search/getUserByFilter',
        method: 'GET',
        params
    }))
    res.entities = res.entities.map(v => new RoleUser().init(v))
    return res
}

// 获取导出角色数据
export async function fetchExportRoles(data) {
    return await request({
        url: 'useraccess/exportRoles',
        method: 'POST',
        data: qs.stringify(data)
    })
}

// 导入角色数据到组织
export async function importRoles(data) {
    return await request({
        url: 'useraccess/importRoles',
        method: 'POST',
        headers: {
            'Content-Type': 'multipart/form-data'
        },
        data
    })
}
