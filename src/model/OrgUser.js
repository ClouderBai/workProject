/*
 * @Author: zhanglianhao
 * @Date: 2018-01-27 17:53:04
 * @Last Modified by: zhanglianhao
 * @Last Modified time: 2018-03-20 17:01:29
 */

/**
 |--------------------------------------------------
 | 组织用户类 目前用于用户维护用户列表
 |--------------------------------------------------
 */

import ObjectBase from './base/ObjectBase'
import { accessor } from './base/Decorators'

class OrgUser extends ObjectBase {
    @accessor()
    _approvalStatus = '' // ？

    @accessor()
    _dutyCode = 0 // number 职业类别编码

    @accessor()
    _enterDt = '' // string 进入日期

    @accessor()
    _gender = 0 // number 性别

    @accessor()
    _mainJob = '' // boolean 是否主职

    @accessor()
    _mobile = '' // string 手机号

    @accessor()
    _name = '' // string 用户名

    @accessor()
    _order = '' // number 排序

    @accessor()
    _orgId = '' // number 组织 id

    @accessor()
    _orgName = '' // string 组织名称

    @accessor()
    _registerDt = '' // string 注册日期

    @accessor()
    _enable = true // boolean 是否可用

    @accessor()
    _key = 0 // number 唯一标识
}

export default OrgUser
