import request from '@/utils/request'
import { parseTime } from '@/utils'

export async function fetchAllDictionaryList(code) {
    const res = await request({
        url: '/dictionary/getAllDictionaryList',
        method: 'GET',
        params: {
            parentCatCode: code
        }
    })
    return res
}

// 新增 map
export async function addDictionaryCat(data) {
    return await request({
        url: '/dictionary/saveDictionaryCat',
        method: 'POST',
        data
    })
}

// 新增字典项
export async function addDictionary(data) {
    return await request({
        url: '/dictionary/saveDictionary',
        method: 'POST',
        data
    })
}

// 修改 map
export async function uploadDictionaryCat(data) {
    return await request({
        url: '/dictionary/updateDictionaryCat',
        method: 'POST',
        data
    })
}

// 修改字典项
export async function uploadDictionary(data) {
    return await request({
        url: '/dictionary/updateDictionary',
        method: 'POST',
        data
    })
}

// 删除数据字典
export async function deleteDictionaryCat(data) {
    return await request({
        url: '/dictionary/deleteDictionaryCat',
        method: 'POST',
        data
    })
}

// 删除字典项
export async function deleteDictionary(data) {
    return await request({
        url: '/dictionary/deleteDictionary',
        method: 'POST',
        data
    })
}

// 检查数据字典是否存在
export async function checkDictionaryCode(params) {
    return await request({
        url: '/dictionary/checkLeftDataDictionaryCode',
        method: 'GET',
        params
    })
}

// 检查数据字典项是否存在
export async function checkDictionaryChildCode(params) {
    return await request({
        url: '/dictionary/checkRightDataDictionaryChildCode',
        method: 'GET',
        params
    })
}

// 导出字典
export async function exportDictionary() {
    return await request({
        url: '/dictionary/jsonExportDictionaryTree',
        method: 'GET',
        responseType: 'arraybuffer'
    })
}

// 导入数据字典
export async function importDictionary(data) {
    return await request({
        url: '/dictionary/jsonImportDictionaryTree',
        method: 'POST',
        headers: {
            'Content-Type': 'multipart/form-data'
        },
        data
    })
}

// 查询数据字典备份文件
export async function getBackupList() {
    const res = await request({
        url: '/dictionary/getBackupsDictionaryList',
        method: 'POST'
    })
    res.forEach(v => {
        v.createDate = parseTime(v.createDate)
    })
    return res
}

// 还原数据字典
export async function reductionDictionary(id) {
    return await request({
        url: '/dictionary/reductionDictionaryTree',
        method: 'POST',
        params: {
            fileId: id
        }
    })
}
