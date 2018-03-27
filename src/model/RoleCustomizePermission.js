import ValidatableObject from "./base/ValidatableObject"
import { required, regex, accessor, type } from "./base/Decorators"
import RoleCustimizeList from '@/model/RoleCustimizeList.js'
import { validatorImpl } from './base/DecoratorUtil'
import { Validator } from './base/Validators'
import rules from '@/utils/regex'
import { checkPermissionClassCode } from '@/api/roleAccess.js'

class checkCodeValidator extends Validator {
    constructor(errorMessage) {
        super(errorMessage)
    }
    async validate(value, args) {
        if (!value) return false
        try {
            return !await checkPermissionClassCode(value, args)
        }
        catch (err) {
            console.warn('角色组 checkRoleGroup 接口出错', err)
        }
        return false

    }
}

function rcpCode(errorMessage) {
    return validatorImpl(new checkCodeValidator(errorMessage))
}

class RoleCustomizePermission extends ValidatableObject {

    @required(false, '自定义权限类别名称不能为空')
    _name = ''   // 自定义权限类别名称

    @rcpCode('权限类别编码已存在')
    @required(false, '自定义权限编码不能为空')
    _code = ''   // 自定义权限类别编码

    @type(RoleCustimizeList)
    _permissionList = [] // 自定义权限数组

    @accessor()
    _checked = '' // 是否勾选

    @accessor()
    _preCode = ''

    @accessor()
    _roleCode = '' //角色 code

    @accessor()
    _catCode = ''

    @accessor()
    _key = ''

    @type(RoleCustimizeList)
    _actionDmnObjList = []

}

export default RoleCustomizePermission