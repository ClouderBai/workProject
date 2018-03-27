import ValidatableObject from "./base/ValidatableObject"
import { required, regex, accessor} from "./base/Decorators"
import {validatorImpl} from './base/DecoratorUtil'
import { Validator } from './base/Validators'
import rules from '@/utils/regex'
import {checkRoleGroup} from '@/api/roleAccess.js'

class RoleGroupCodeValidator extends Validator {
  constructor(errorMessage) {
    super(errorMessage)
  }
  async validate(value, args) {
    if (!value) return false
    try {
      return !await checkRoleGroup(value, args) 
    } 
    catch (err) {
      console.warn('角色组 checkRoleGroup 接口出错', err)
    }
    return false
    
  }
}

function RoleGroupCode(errorMessage) {
  return validatorImpl(new RoleGroupCodeValidator(errorMessage))
}


class RoleGroup extends ValidatableObject {

    @required(false, '角色组名称不能为空')
    _name = ''   // 角色组名称

    @RoleGroupCode('角色编码已存在')
    @required(false, '角色组编码不能为空')
    _code = ''   // 角色组编码

}

export default RoleGroup