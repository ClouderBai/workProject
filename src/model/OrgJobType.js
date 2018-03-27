import ValidatableObject from './base/ValidatableObject'

import { required, regex, accessor } from './base/Decorators'
import rules from '@/utils/regex'
import { Validator } from './base/Validators'
import { validatorImpl } from './base/DecoratorUtil'
import { searchPositionCode } from '@/api/org'
// 校验code是否重复
class typeCodeValidator extends Validator {
    /* eslint-disable */
    constructor(errorMessage) {
        super(errorMessage)
    }
    /* eslint-disable */

    async validate(value, args) {
        if (value === args) return true
        if (!value) return false
        try {
            return !await searchPositionCode(value, args)
        } catch (error) {
            console.error('校验dutyCode异常')
        }
        return false
    }
}

function typeCode(errorMessage) {
    return validatorImpl(new typeCodeValidator(errorMessage))
}

class OrgJobType extends ValidatableObject {
    @regex(rules.chiness, '名称只能为汉字')
    @required(false, '名称不能为空')
    _name = '' // 职位名称

    @typeCode('编码已存在')
    @regex(rules.code, '编码只能为大写英文')
    @required(false, '编码不能为空')
    _code = '' // 编码

    @required(false, '分类不能为空')
    _category = '' // 分类
}

export default OrgJobType
