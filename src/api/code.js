import request from '@/utils/request'
import Page from '@/model/Page'
import Code from '@/model/Code'

// 获取所有编码
export async function fetchAllCode(params) {
    const res = new Page().init(await request({
        url: '/code/getAllCode',
        methodl: 'GET',
        params
    }))
    res.entities = res.entities.map(v => new Code().init(v))
    return res
}

// 批量删除编码
export async function deleteCodes(data) {
    return request({
        url: '/code/deleteCodeProvider',
        method: 'POST',
        data
    })
}

// 新增编码
export async function addCode(data) {
    return request({
        url: '/code/addCodeProvider',
        method: 'POST',
        data
    })
}

// 修改编码
export async function updateCode(data) {
    return request({
        url: '/code/updateCodeProvider',
        method: 'POST',
        data
    })
}

// 校验编码code 只有修改传id
export async function checkCode(code, id) {
    return request({
        url: '/code/checkCode',
        method: 'GET',
        params: {
            id,
            code
        }
    })
}

// 校验编码format 只有修改传id
export async function checkFormat(format, id) {
    return request({
        url: '/code/checkFormat',
        method: 'GET',
        params: {
            id,
            format
        }
    })
}

// 导出
export async function exportCode() {
    return await request({
        method: 'GET',
        url: '/code/exportCode',
        responseType: 'arraybuffer'
    })
}

// 上传导入的excel
export async function importCode(data) {
    const res = await request({
        url: '/code/importCode',
        method: 'POST',
        headers: {
            'Content-Type': 'multipart/form-data'
        },
        data
    })
    return res
}
