/*
 * @Author: zhanglianhao
 * @Date: 2018-01-27 17:45:05
 * @Last Modified by: zhanglianhao
 * @Last Modified time: 2018-03-20 17:23:21
 */

/*
|--------------------------------------------------
| 用户基本信息类
|--------------------------------------------------
*/
import ValidatableObject from './base/ValidatableObject'
import { required, regex, accessor } from './base/Decorators'
import rules from '@/utils/regex'

class UserBaseInfo extends ValidatableObject {
    @required(false, '用户名不能为空，请填写用户名')
    _name // 新建用户用户名

    @regex(rules.mobile, '无效的手机号码，请填写正确的手机号码')
    @required(false, '手机号不能为空，请填写手机号码')
    _mobile = ''

    @accessor()
    _address = '' // 地址

    @accessor()
    _avatarUri = '' // 头像地址

    @accessor()
    _birthDt = new Date() // 生日

    @accessor()
    _dutyCode = '' // 职务

    @accessor()
    _eduDegree = '' // 文化程度

    @accessor()
    _emergencyContactName = '' // 紧急联系人

    @regex(rules.mobile, '无效的手机号码，请填写正确的手机号码')
    _emergencyContactPhone = '' // 紧急联系人电话

    @accessor()
    _gender = '' // 性别

    @regex(rules.idNo, '无效的身份证号，请填写正确的身份证号')
    _idNo = '' // 身份证号

    @accessor()
    _jianpin = '' // 简拼

    @accessor()
    _levelType = '' // 级别类型

    @accessor()
    _mainJob = true // boolean 是否主职

    @accessor()
    _order = '' // number 排序

    @accessor()
    _orgName = '' // 所属部门

    @accessor()
    _orgId = 0 // 组织id

    @accessor()
    _pinyin = '' // 全拼

    @accessor()
    _postName = '' // 所属岗位

    @accessor()
    _profession = '' // 工种

    @accessor()
    _specialOpCert = '' // 特种作业证

    @accessor()
    _userTitle = '' // 职称

    @accessor()
    _userType = '' // 用户类型

    @accessor()
    _enable = true // 是否可用
}

export default UserBaseInfo
