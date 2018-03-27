import Request from '@/utils/request'
import SystemParams from '@/model/SystemParams'

// 获取所有系统配置
export async function fetchSystemParams() {
    const systemParams = await Request({
        url: 'system/showParams',
        method: 'GET'
    })

    // 把数组中settingVal的字符串true\false转为布尔值
    const data = JSON.stringify(systemParams).replace(/("true")/g, true).replace(/("false")/g, false)
    return new SystemParams().init(JSON.parse(data))
}

// 保存系统配置
export function updateSystemParams(srcData) {
    // 复制数据 不然对参数进行操作会改变页面上的原数据
    const data = JSON.parse(JSON.stringify(srcData))

    // 过滤出所有settingVal值为ture的数据  并把值变为'Y'
    function filterParams(list) {
        const data = list.filter(v => v.settingVal === true)
        data.forEach(v => {
            v.settingVal = 'Y'
        })
        return data
    }

    for (const key in data) {
        // 过滤除了id以外的所有数据(list)
        if (data.hasOwnProperty(key) && key !== 'id') {
            data[key] = filterParams(data[key])
        }
    }

    Request({
        url: 'system/saveParams',
        method: 'POST',
        data
    })
}
