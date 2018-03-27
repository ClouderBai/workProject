import store from '@/store'
import FileTypes from '@/components/Dialog/Preview/FileTypes'

export function parseTime(time, cFormat) {
    if (arguments.length === 0) {
        return null
    }
    const format = cFormat || '{y}-{m}-{d} {h}:{i}:{s}'
    let date
    if (typeof time === 'object') {
        date = time
    } else {
        if (('' + time).length === 10) time = parseInt(time) * 1000
        date = new Date(time)
    }
    const formatObj = {
        y: date.getFullYear(),
        m: date.getMonth() + 1,
        d: date.getDate(),
        h: date.getHours(),
        i: date.getMinutes(),
        s: date.getSeconds(),
        a: date.getDay()
    }
    const time_str = format.replace(/{(y|m|d|h|i|s|a)+}/g, (result, key) => {
        let value = formatObj[key]
        if (key === 'a') return ['一', '二', '三', '四', '五', '六', '日'][value - 1]
        if (result.length > 0 && value < 10) {
            value = '0' + value
        }
        return value || 0
    })
    return time_str
}

export function formatTime(time, option) {
    time = +time * 1000
    const d = new Date(time)
    const now = Date.now()

    const diff = (now - d) / 1000

    if (diff < 30) {
        return '刚刚'
    } else if (diff < 3600) { // less 1 hour
        return Math.ceil(diff / 60) + '分钟前'
    } else if (diff < 3600 * 24) {
        return Math.ceil(diff / 3600) + '小时前'
    } else if (diff < 3600 * 24 * 2) {
        return '1天前'
    }
    if (option) {
        return parseTime(time, option)
    } else {
        return d.getMonth() + 1 + '月' + d.getDate() + '日' + d.getHours() + '时' + d.getMinutes() + '分'
    }
}

// 过滤数据字典  变成下拉框格式
export function filterSelect(object) {
    const selectArray = []
    for (const key in object) {
        selectArray.push({
            value: key,
            label: object[key]
        })
    }
    return selectArray
}

/**
 * 获取localStorage中的user
 * @param {string} key 所需数据的key 不传返回所有
 */
export async function getUserInfo(...key) {
    await store.dispatch('GetUserInfo')
    const userData = store.getters.userInfo // 获取当前用户数据
    console.log(userData)

    // 判断是否传入key
    if (key.length) {
        const data = {}
        key.forEach(val => {
            data[val] = userData[val]
        })
        return data
    } else {
        return userData
    }
}

// 重组表格拖拽的数据模型 (在2018-2-12 16:48 重构组件 该方法基本废弃 暂时留存备份)
export function resetDragDataModel(vm, newIndex, oldIndex, data) {
    // 为防止使用者没加判断  双重保险
    if (oldIndex === newIndex) return
    const orderList = vm[data].map(v => v.order)
    // 为了重置dom节点
    const patch = vm[data]
    vm[data] = []
    vm.$nextTick(() => {
        vm[data] = patch
        const len = vm[data].length
        const newList = []
        for (let i = 0; i < len; i++) {
            if (i === oldIndex) {
                continue
            }
            if (oldIndex < newIndex) {
                // 说明从上往下拖
                newList.push(vm[data][i])
                if (i === newIndex) {
                    newList.push(vm[data][oldIndex])
                }
            } else {
                // 说明从下往上拖
                if (i === newIndex) {
                    newList.push(vm[data][oldIndex])
                }
                newList.push(vm[data][i])
            }
        }
        vm[data] = newList.map((v, index) => {
            v.order = orderList[index]
            return v
        })
    })
}

/**
 * 表格想拖拽  用它就对了 (在2018-2-12 16:48 重构组件 该方法基本废弃 暂时留存备份)
 * @param {Object} vm vue实例(this)
 * @param {Number} newIndex 拖拽后下标
 * @param {Number} oldIndex 拖拽前下标
 * @param {Function} callBack 确认拖拽的回调
 * @param {String} data 默认值'data'
 */

export async function dragTable(vm, newIndex, oldIndex, callBack, data = 'data') {
    // 不加这行判断列表拖没了别找我
    if (oldIndex === newIndex) return
    const beBackData = vm[data]
    try {
        await vm.$confirm('确定改变列表排序么', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            confirmButtonClass: 'ljt-btn primary-btn',
            cancelButtonClass: 'ljt-btn tiffany-btn',
            type: 'warning'
        })
        // 为了重置dom节点
        await resetDragDataModel(vm, newIndex, oldIndex, data)
        callBack()
    } catch (error) {
        vm[data] = []
        vm.$nextTick(() => { vm[data] = beBackData })
    }
}

// 获取随机颜色
export function randomColor() {
    let r = '#'
    const ar = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'a', 'b', 'c', 'd', 'e', 'f']
    for (let j = 0; j <= 5; j++) {
        const v = Math.floor(Math.random() * 16)
        r += ar[v]
    }
    return r
}

/**
 * 用户角色去重
 * @param  {Array} rolesList 用户角色
 * @return {Array}     去重后的用户角色
 */
export function deDuplication(rolesList) {
    const hash = {}
    return rolesList.reduce((item, next) => {
        hash[next.name] ? '' : hash[next.name] = true && item.push(next)
        return item
    }, [])
}

/**
 * 限制上传文件大小
 * @param  {Object} file    文件对象
 * @param  {Number} maxSize 上传文件最大限制
 * @return {Boolean}
 */
export function fileLimit(file, maxSize) {
    const isLt = file.size / 1024 / 1024 < maxSize
    if (!isLt) {
        this.$message.error(`上传头像文件大小不能超过 ${maxSize}MB！`)
    }
    return isLt
}

/**
 * 判断上传文件类型
 * @param  {String} fileName 文件名
 * @return {String} 文件类型
 */
export function fileType(fileName) {
    const image = /\.(gif|jpg|jpeg|png)$/ // 图片
    const video = /\.(avi|wmv|mpeg|mp4|mov|mkv|flv|f4v|m4v|rmvb|rm|3gp|dat|ts|mts|vob)$/ // 视频

    if (image.test(fileName.toLowerCase())) {
        return FileTypes.IMAGE
    }

    if (video.test(fileName.toLowerCase())) {
        return FileTypes.VIDEO
    }
}

/**
 * 转换成 element upload 上传组件的 fileList
 * @param  {Array} fileList 要转换成的 fileList
 * @param  {Object} res      后台返回的文件对象
 * @return {Array}          fiLeList
 */
export function elementFilelist(fileList, res) {
    fileList = []
    fileList.push({
        id: res.id,
        name: res.fileName,
        url: `${process.env.API_ENDPOINT.slice(0, -5)}${res.filePath}`
    })
    // 保存序号
    fileList.forEach((v, i) => {
        v.index = i
    })
    return fileList
}

/**
 *  根据 key 取 after 中 before 没有的元素
 * @param {array} before
 * @param {array} after
 * @param {string} key
 */
export function contrast(before, after, key) {
    return after.reduce((total, next) => before.some(item => item[key] === next[key]) ? total : [...total, next], [])
}

/**
 *  对象数组转成str类型
 * @param {array} arr
 * @return {string} id=1&name=aa
 * @example '[{key: id, value: 1},{key:name, value: aa}] =>  id=1&name=aa'
 */
export function arrObjToStr(arr) {
    const str = arr.reduce((total, next) => {
        total += `${next.key}=${next.value}`
        return `${total}&`
    }, '')
    return str.slice(0, -1)
}

/**
 *  str类型转成对象数组
 * @param {string} str
 * @return {array} [{key: id, value: 1},{key:name, value: aa}]
 * @example ' id=1&name=aa' =>  [{key: id, value: 1},{key:name, value: aa}]
 */
export function strToArrObj(str) {
    if (!str) return
    return str.split('&').map(item => {
        const foo = item.split('=')
        return { key: foo[0], value: foo[1] }
    })
}

/**
 * 判断数据类型
 * @param {any} obj
 */
export function typeOf(obj) {
    const toString = Object.prototype.toString
    const map = {
        '[object Boolean]': 'boolean',
        '[object Number]': 'number',
        '[object String]': 'string',
        '[object Function]': 'function',
        '[object Array]': 'array',
        '[object Date]': 'date',
        '[object RegExp]': 'regExp',
        '[object Undefined]': 'undefined',
        '[object Null]': 'null',
        '[object Object]': 'object'
    }
    return map[toString.call(obj)]
}

/**
 *  深拷贝
 * @param {array || obj} data
 */
export function deepCopy(data) {
    const t = typeOf(data)
    let o
    if (t === 'array') {
        o = []
    } else if (t === 'object') {
        o = {}
    } else {
        return data
    }

    if (t === 'array') {
        for (let i = 0; i < data.length; i++) {
            o.push(deepCopy(data[i]))
        }
    } else if (t === 'object') {
        for (const i in data) {
            o[i] = deepCopy(data[i])
        }
    }
    return o
}
