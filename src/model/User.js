/*
 * @Author: zhanglianhao
 * @Date: 2018-01-27 17:51:29
 * @Last Modified by: zhanglianhao
 * @Last Modified time: 2018-03-20 17:22:49
 */

/*
|--------------------------------------------------
| 当前登录用户类
|--------------------------------------------------
*/

import ValidatableObject from './base/ValidatableObject'
import { required, regex, accessor } from './base/Decorators'
import rules from '@/utils/regex'

class User extends ValidatableObject {
    @regex(rules.mobile, '无效的手机号码，请填写正确的手机号码')
    @required(false, '用户名不能为空，请填写用户名')
    _mobile = '' // 用户登录手机号

    @accessor()
    _avatarUri = '' // 头像地址

    @accessor()
    _idNo = '' // 身份证号

    @accessor()
    _gender = '' // 性别

    @accessor()
    _staffNo = '' // number 员工编号

    @accessor()
    _contactVisible = '' // boolean 联系方式是否可见

    @accessor()
    _registerDt = new Date() // 注册日期

    @accessor()
    _enterDt = new Date() // 进入日期

    @accessor()
    _departureDt = new Date() // 离开日期

    @accessor()
    _resigned = '' // boolean 是否离职

    @accessor()
    _pinyin = '' // 全拼

    @accessor()
    _jianpin = '' // 简拼

    @accessor()
    _address = '' // 地址

    @accessor()
    _birthDt = new Date() // 生日

    @accessor()
    _eduDegree = '' // 文化程度

    @accessor()
    _emergencyContactName = '' // 紧急联系人

    @accessor()
    _emergencyContactPhone = '' // 紧急联系人电话

    @accessor()
    _userTitle = '' // 职称

    @accessor()
    _profession = '' // 工种

    @accessor()
    _specialOpCert = '' // 特种作业证

    @accessor()
    _wifiAutoUpload = false // wifi自动上传

    @accessor()
    _userType = '' // 用户类型

    @accessor()
    _rolesList = [] // 角色列表

    @accessor()
    _permList = [] // 权限列表
}

export default User
