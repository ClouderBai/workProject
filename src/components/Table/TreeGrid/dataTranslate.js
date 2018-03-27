/*
 * @Author: zhanglianhao
 * @Date: 2018-03-13 17:56:53
 * @Last Modified by: zhanglianhao
 * @Last Modified time: 2018-03-14 10:23:28
 */
/**
|--------------------------------------------------
| 转译 tabledata 数据
|--------------------------------------------------
*/

import Vue from 'vue'
class DataTransfer {
    constructor(data) {
        if (!(this instanceof DataTransfer)) {
            return new DataTransfer(data, null, null)
        }
    }
}
/* function DataTransfer(data) {
    if (!(this instanceof DataTransfer)) {
        return new DataTransfer(data, null, null)
    }
} */

DataTransfer.treeToArray = function(data, parent, level, expandedAll) {
    let tmp = []
    Array.from(data).forEach(record => {
        if (record._expanded === undefined) {
            Vue.set(record, '_expanded', expandedAll)
        }
        if (parent) {
            Vue.set(record, '_parent', parent)
        }
        let _level = 0
        if (level !== undefined && level !== null) {
            _level = level + 1
        }
        Vue.set(record, '_level', _level)
        tmp.push(record)
        if (record.children && record.children.length > 0) {
            const children = DataTransfer.treeToArray(record.children, record, _level, expandedAll)
            tmp = tmp.concat(children)
        }
    })
    return tmp
}

export default DataTransfer
