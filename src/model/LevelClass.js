import ValidatableObject from './base/ValidatableObject'
import { required, regex } from './base/Decorators'
import { validatorImpl } from './base/DecoratorUtil'
import { Validator } from './base/Validators'
import rules from '@/utils/regex'
import { checkLevelCode } from '@/api/org'

class LevelClassCodeValidator extends Validator {
    /* eslint-disable */
    constructor(errorMessage) {
        super(errorMessage)
    }
    async validate(value, args) {
        if (!value) return false
        try {
            return !await checkLevelCode(value, args)
        }
        catch (err) {
            console.warn('角色组 checkRoleGroup 接口出错', err)
        }
        return false
    }
}

function LevelClassCode(errorMessage) {
    return validatorImpl(new LevelClassCodeValidator(errorMessage))
}

class LevelClass extends ValidatableObject {
  @required(false, '类别名称不能为空')
  _name = '' // 类别名称

  @regex(rules.code, '类别编码只能为大写英文')
  @LevelClassCode('类别编码已存在')
  @required(false, '类别编码不能为空')
  _code = '' // 类别编码
}

export default LevelClass
