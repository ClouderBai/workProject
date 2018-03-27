/*
 * @Author: zhanglianhao
 * @Date: 2018-03-09 17:58:02
 * @Last Modified by: zhanglianhao
 * @Last Modified time: 2018-03-16 17:25:52
 */
/**
|--------------------------------------------------
| 模块api
|--------------------------------------------------
*/

import request from '@/utils/request'
import Module from '@/model/Module'

// 获取树节点
export async function fetchAllFuncCategoryList() {
    const res = await request({
        method: 'GET',
        url: '/function/getAllFunctionCategoryList'
    })
    return res.map(v => new Module().init(v))
}

// 校验新增功能code
export async function checkFuncByCode(code) {
    return await request({
        method: 'GET',
        url: '/function/checkFunctionByCode',
        params: {
            code
        }
    })
}

// 校验新增模块code
export async function checkFuncCategoryByCode(code) {
    return await request({
        method: 'GET',
        url: '/function/checkFunctionCategoryByCode',
        params: {
            code
        }
    })
}

// 新建功能
export async function createFunc(data) {
    return await request({
        method: 'POST',
        url: '/function/saveFunction',
        data
    })
}

// 新建模块
export async function createFuncCategory(data) {
    return await request({
        method: 'POST',
        url: '/function/saveFunctionCategory',
        data
    })
}

// 修改功能
export async function updateFunc(data) {
    return await request({
        method: 'POST',
        url: '/function/updateFunction',
        data
    })
}

// 修改模块
export async function updateFuncCategory(data) {
    return await request({
        method: 'POST',
        url: '/function/updateFunctionCategory',
        data
    })
}

// 删除功能
export async function deleteFunc(data) {
    return await request({
        method: 'POST',
        url: '/function/deleteFunction',
        data
    })
}

// 删除模块
export async function deleteFuncCategory(data) {
    return await request({
        method: 'POST',
        url: '/function/deleteFunctionCategory',
        data
    })
}

// 导出
export async function exportFunc() {
    return await request({
        url: '/function/jsonExportFunctionCategoryTree',
        method: 'GET',
        responseType: 'arraybuffer'
    })
}

// 校验是否关联
export async function checkImportRelation() {
    return await request({
        url: '/function/jsonImportEstimateRelation',
        method: 'GET'
    })
}

// 导入文件
export async function importFunc(data) {
    return await request({
        url: '/function/jsonImportStandardMenuTree',
        method: 'POST',
        hesders: {
            'Content-Type': 'multipart/form-data'
        },
        data
    })
}
