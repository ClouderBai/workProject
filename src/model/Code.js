/*
 * @Author: zhanglianhao
 * @Date: 2018-03-20 17:19:29
 * @Last Modified by: zhanglianhao
 * @Last Modified time: 2018-03-20 17:20:30
 */
/**
|--------------------------------------------------
| 编码服务类
|--------------------------------------------------
*/
import ValidatableObject from './base/ValidatableObject'
import { validatorImpl } from './base/DecoratorUtil'
import { Validator } from './base/Validators'
import { required, accessor } from './base/Decorators'
import { checkCode, checkFormat } from '@/api/code'

class CodeValidator extends Validator {
    /* eslint-disable */
    constructor(errorMessage) {
        super(errorMessage)
    }
    /* eslint-disable */

    async validate(value, args) {
        if (!value) return false
        try {
            return !await checkCode(value, args)
        } catch (error) {
            console.error('校验code异常')
        }
        return false
    }
}

class FormatValidator extends Validator {
    constructor(errorMessage) {
        super(errorMessage)
    }

    async validate(value, args) {
        if (!value) return false
        try {
            return !await checkFormat(value, args)
        } catch (error) {
            console.error('校验format异常')
        }
        return false
    }
}

function code(errorMessage) {
    return validatorImpl(new CodeValidator(errorMessage))
}

function format(errorMessage) {
    return validatorImpl(new FormatValidator(errorMessage))
}

class Code extends ValidatableObject {
    @code('编码已存在')
    @required(false, '编码不能为空，请填写编码')
    _code = '' // 编码

    @format('编码格式已存在')
    @required(false, '编码格式不能为空，请填写编码格式')
    _format = '' // 格式

    @accessor()
    _desc = '' // 描述

    @accessor()
    _matchedKeys = []
}

export default Code
