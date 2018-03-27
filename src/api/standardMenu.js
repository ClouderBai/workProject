
/**
|--------------------------------------------------
| 标准菜单管理接口
|--------------------------------------------------
*/
import request from '@/utils/request'

// 获取标准菜单数据
// export function fetchStandardMenuList(parentCode) {
//     return request({
//         url: 'standardMenu/getStandardMenuList',
//         method: 'GET',
//         params: { parentCode }
//     })
// }

// 获取标准菜单数据(全部取出)
export function fetchAllStandardMenuList() {
    return request({
        url: 'standardMenu/getAllStandardMenuList',
        method: 'GET'
    })
}

// 创建标准菜单节点
export function createStandardMenu(standardMenu) {
    return request({
        url: 'standardMenu/saveStandardMenu',
        method: 'POST',
        data: standardMenu
    })
}

// 删除标准菜单数据接口
export function deleteStandardMenu(ids) {
    return request({
        url: 'standardMenu/deleteStandardMenu',
        method: 'POST',
        data: [ids]
    })
}

// 修改标准菜单数据接口
export function updateStandardMenu(standardMenu) {
    return request({
        url: 'standardMenu/updateStandardMenu',
        method: 'POST',
        data: standardMenu
    })
}

// 导出标准菜单
export function fetchStandardMenuTree() {
    return request({
        url: 'standardMenu/jsonExportStandardMenuTree',
        method: 'GET',
        responseType: 'arraybuffer'
    })
}

// 导入标准菜单
export function importStandardMenuTree(data) {
    return request({
        url: 'standardMenu/jsonImportStandardMenuTree',
        method: 'POST',
        headers: {
            contentType: 'multipart/form-data'
        },
        data
    })
}

// 根据组织Id查询对应的菜单管理数据(封装菜单管理是否勾选数据)
export function fetchOrgMenuListTreeByOrgId(orgId) {
    return request({
        url: 'standardMenu/getOrgMenuListTreeByOrgId',
        method: 'GET',
        params: { orgId }
    })
}

// 保存菜单管理数据
export function updateOrgMenu(orgId, standardMenuList) {
    return request({
        url: 'standardMenu/updateOrgMenu',
        method: 'POST',
        data: { orgId, standardMenuList }
    })
}

// 导入标准菜单树的时候判断旧数据是否有关联(true有关联/false没有关联)
export function checkJsonImportEstimateRelation() {
    return request({
        url: 'standardMenu/jsonImportEstimateRelation',
        method: 'GET'
    })
}

