/*
 * @Author: LiuJunTing
 * @Date: 2018-03-09 13:35:48
 * @Last Modified by: LiuJunTing
 * @Last Modified time: 2018-03-20 16:58:59
 */

/**
|--------------------------------------------------
|
|  角色用户
|
|--------------------------------------------------
*/

import ObjectBase from './base/ObjectBase'
import { accessor } from './base/Decorators'

class RoleUser extends ObjectBase {
    @accessor()
    _name = '' // 姓名

    @accessor()
    _mobile = '' // 电话

    @accessor()
    _gender = '' // 性别

    @accessor()
    _approvalStatus = '' // 审批状态

    @accessor()
    _registerDt = '' // 注册时间

    @accessor()
    _enterDt = '' // 入场时间

    @accessor()
    _orgName = '' // 直属部门

    @accessor()
    _mainJob = '' // 是否主职

    @accessor()
    _dutyCode = '' // 职务编码

    @accessor()
    _dutyName = '' // 职务名称

    @accessor()
    _order = '' // 序号

    @accessor()
    _enable = '' // 是否可用

    @accessor()
    _roleCode = '' // 角色编码

    @accessor()
    _key = 0 // 唯一标识
}

export default RoleUser
