/*
 * @Author: ShaXin 
 * @Date: 2018-01-25 16:40:07 
 * @Last Modified by: ShaXin
 * @Last Modified time: 2018-01-29 13:34:35
 */

import ValidatableObject from "./base/ValidatableObject"

import { required, regex, accessor, type } from "./base/Decorators"
import { validatorImpl } from './base/DecoratorUtil'
import { Validator } from './base/Validators'
import rules from '@/utils/regex'
import { searchBizTypeCode } from '@/api/org'
// 校验code是否重复
class typeCodeValidator extends Validator {
    constructor(errorMessage) {
        super(errorMessage)
    }

    async validate(value, args) {
        console.log(value === args)
        console.log(value)
        console.log(args)
        if (value === args) return true
        if (!value) return false
        try {
            return !await searchBizTypeCode(value);
        } catch (error) {
            console.error("校验dutyCode异常");
        }
        return false
    }
}

function typeCode(errorMessage) {
    return validatorImpl(new typeCodeValidator(errorMessage))
}


class OrgBusType extends ValidatableObject {

    @regex(rules.chiness, "名称只能为汉字")
    @required(false, '名称不能为空')
    _name = '' // 职位名称

    @typeCode('编码已存在')
    @regex(rules.code, "编码只能为大写英文")
    @required(false, '编码不能为空')
    _code = '' // 编码

    @accessor()
    _id = '' // id

}

export default OrgBusType