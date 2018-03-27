import request from '@/utils/request'
import Page from '@/model/Page'
import Form from '@/model/flow/Form'

// 获取启用的表单列表  (任务流中选择新建表单时用)
export async function fetchEnabledForm(params) {
    const res = new Page().init(await request({
        url: '/form/getEnabledFormList',
        methodl: 'GET',
        params
    }))
    res.entities = res.entities.map(v => new Form().init(v))
    return res
}

// 根据表单的id 获取表单信息
export function fetchFormInfo(params) {
    return request({
        url: '/form/openForm',
        methodl: 'GET',
        params
    })
}
