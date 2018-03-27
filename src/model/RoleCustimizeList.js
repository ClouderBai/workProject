import ValidatableObject from "./base/ValidatableObject"
import { required, regex, accessor } from "./base/Decorators"
import {validatorImpl} from './base/DecoratorUtil'
import { Validator } from './base/Validators'
import rules from '@/utils/regex'
import {checkPermissionBehaviorCode} from '@/api/roleAccess.js'

class checkBehaviorCodeValidator extends Validator {
    constructor(errorMessage) {
      super(errorMessage)
    }
    async validate(value, obj) {
      if (!value) return false
      try {
        return !await checkPermissionBehaviorCode(value, obj.id, obj.catCode) 
      } 
      catch (err) {
        console.warn('角色组 checkRoleGroup 接口出错', err)
      }
      return false
      
    }
}
  
  function checkCode(errorMessage) {
    return validatorImpl(new checkBehaviorCodeValidator(errorMessage))
  }


class RoleCustimizeList extends ValidatableObject {

    @required(false, '自定义权限名称不能为空')
    _name = ''   // 自定义权限名称

    @checkCode('权限行为编码已存在')    
    @required(false, '自定义权限编码不能为空')
    _code = ''   // 自定义权限编码

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

}

export default RoleCustimizeList