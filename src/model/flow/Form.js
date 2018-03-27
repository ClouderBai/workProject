/*
 * @Author: LiuJunTing
 * @Date: 2018-03-21 09:42:15
 * @Last Modified by: LiuJunTing
 * @Last Modified time: 2018-03-21 15:08:56
 */

/**
|--------------------------------------------------
|
|  表单
|
|--------------------------------------------------
*/

import ObjectBase from '../base/ObjectBase'
import { accessor } from '../base/Decorators'

class Form extends ObjectBase {
    @accessor()
    _code = '' // 编码

    @accessor()
    _name = '' // 名称

    @accessor()
    _versionRemark = '' // 版本备注

    @accessor()
    _remark = '' // 备注

    @accessor()
    _version = null // 版本号

    @accessor()
    _createUid= null // 创建人id

    @accessor()
    _createDt = null // 创建时间(13位时间戳)

    @accessor()
    _isCurrent = null // 是不是最近的？

    @accessor()
    _enabled = true // 是否可用

    @accessor()
    _element = null // 元素  字符串  需解析

    @accessor()
    _layout = null // 布局  字符串  需解析

    @accessor()
    _createUserName = '' // 创建人名字

    @accessor()
    _formInstanceId = 0 // 表单实例id

    @accessor()
    _formElementValues = '' // 表单元素值

    @accessor()
    _formElementAuths = '' // 表单元素权限
}

export default Form
