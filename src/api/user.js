import request from '@/utils/request'
import qs from 'qs'
import Duty from '@/model/Duty'
import UserExt from '@/model/UserExt'
import Page from '@/model/Page'
import UserInfo from '@/model/UserInfo'
import OrgUser from '../model/OrgUser'
import RoleUser from '@/model/RoleUser'

// 取得用户职业类别
export async function fetchUserDuty() {
    return (await request({
        url: 'user/get/duty',
        method: 'get'
    })).map(v => new Duty().init(v))
}

// 新增用户职位类别
export function createUserDuty(name, code) {
    return request({
        url: 'user/add/duty',
        method: 'post',
        data: qs.stringify({
            name,
            code
        })
    })
}

// 更新用户职位类别
export function updateUserDuty(id, name, code, enable = true) {
    return request({
        url: 'user/update/duty',
        method: 'post',
        data: {
            id,
            name,
            code,
            enable
        }
    })
}

// 校验用户职位类别code是否重复
export function checkDutyCode(code, dutyId) {
    return request({
        url: 'user/check/duty/code',
        method: 'get',
        params: {
            code,
            dutyId
        }
    })
}

// 批量删除用户职位类别
export function deleteUserDuty(data) {
    return request({
        url: 'user/delete/duty',
        method: 'post',
        data
    })
}

// 搜索用户职位类别
export function searchUserDuty(filter) {
    return request({
        url: 'user/search/duty',
        method: 'get',
        params: {
            filter
        }
    })
}

// 新增用户扩展属性
export async function createUserExt(data) {
    return await request({
        url: 'user/add/ext',
        method: 'POST',
        data
    })
}

// 取得用户拓展属性
export async function fetchListExt() {
    return (await request({
        url: '/user/list/ext',
        method: 'GET'
    })).map(v => new UserExt().init(v))
}

// 批量删除用户扩展属性
export function deleteUserExt(data) {
    return request({
        url: 'user/delete/ext',
        method: 'post',
        data
    })
}

// 批量删除用户扩展属性
export function updateExtStatus(data) {
    return request({
        url: 'user/update/ext/status',
        method: 'post',
        data
    })
}

// 上传头像
export async function uploadAvatar(onUploadProgress, data) {
    const res = await request({
        url: 'user/upload/avatar',
        method: 'POST',
        headers: {
            'Content-Type': 'multipart/form-data'
        },
        onUploadProgress,
        data
    })
    return res
}

// 上传材料
export async function uploadMaterial(data) {
    const res = await request({
        url: 'user/upload/material',
        method: 'POST',
        headers: {
            'Content-Type': 'multipart/form-data'
        },
        data
    })
    return res
}

// 新建用户
export async function createUser(data) {
    const res = await request({
        url: 'user/create',
        method: 'POST',
        data
    })
    return res
}
// 通过orgId获取人员列表数据
export async function fetchUserListByOrgId(params) {
    const data = await request({
        url: 'user/list',
        method: 'GET',
        params
    })
    return new Page().init(data)
}

// 搜索用户
export async function searchUserList(params) {
    const res = new Page().init(await request({
        url: 'user/search',
        method: 'GET',
        params
    }))
    res.entities = res.entities.map(v => new OrgUser().init(v))
    return res
}

// 删除用户
export async function deleteUser(id) {
    const res = await request({
        url: 'user/delete',
        method: 'POST',
        params: {
            id,
            mode: true
        }
    })
    return res
}

// 更新用户排序
export async function updateUserOrders(data) {
    const res = await request({
        url: 'user/update/orders',
        method: 'POST',
        data
    })
    return res
}

// 取得用户详细信息
export async function fetchUserInfo(id) {
    const data = await request({
        url: 'user/get/info',
        method: 'GET',
        params: {
            id
        }
    })
    return new UserInfo().init(data)
}

// 更新用户信息
export async function updateUserInfo(data) {
    const res = await request({
        url: '/user/update/info',
        method: 'POST',
        data
    })
    return res
}

// 添加用户到组织中
export async function addUserInOrg(data) {
    const res = await request({
        url: '/user/saveOrgUserList',
        method: 'POST',
        data
    })
    return res
}

// 从组织中删除用户
export async function deleteOrgUser(data) {
    const res = await request({
        url: '/user/deleteOrgUser',
        method: 'POST',
        data: qs.stringify(data)
    })
    return res
}

// 根据orgId获取用户
export async function fetchUserByOrgId(params) {
    const res = new Page().init(await request({
        url: 'user/getUsersByOrgId',
        method: 'GET',
        params
    }))
    res.entities = res.entities.map(v => new RoleUser().init(v))
    return res
}
