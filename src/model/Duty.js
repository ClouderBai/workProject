/*
 * @Author: LiuJunTing
 * @Date: 2018-01-24 11:04:58
 * @Last Modified by: LiuJunTing
 * @Last Modified time: 2018-03-20 11:33:23
 */

/**
|--------------------------------------------------
|
|  职位
|
|--------------------------------------------------
*/

import ValidatableObject from './base/ValidatableObject'
import { validatorImpl } from './base/DecoratorUtil'
import { Validator } from './base/Validators'
import { required, regex, accessor } from './base/Decorators'
import rules from '@/utils/regex'
import { checkDutyCode } from '@/api/user'

class DutyCodeValidator extends Validator {
    /* eslint-disable */
    constructor(errorMessage) {
        super(errorMessage)
    }
    /* eslint-enable */

    async validate(value, args) {
        // if (value === args) return true
        if (!value) return false
        try {
            return !await checkDutyCode(value, args)
        } catch (error) {
            console.error('校验dutyCode异常')
        }
        return false
    }
}

function dutyCode(errorMessage) {
    return validatorImpl(new DutyCodeValidator(errorMessage))
}

class Duty extends ValidatableObject {
    @required(false, '职位名称不能为空')
    _name = '' // 职位名称

    @dutyCode('职位编码已存在')
    @regex(rules.code, '职位编码只能为大写英文')
    @required(false, '职位编码不能为空')
    _code = '' // 职位编码

    @accessor()
    _enable = true // 是否显示
}

export default Duty
