/*
 * @Author: zhanglianhao
 * @Date: 2018-03-20 17:21:44
 * @Last Modified by: zhanglianhao
 * @Last Modified time: 2018-03-20 17:22:11
 */

/*
|--------------------------------------------------
| 模块类
|--------------------------------------------------
*/
import ValidatableObject from './base/ValidatableObject'
import { validatorImpl } from './base/DecoratorUtil'
import { required, accessor, type } from './base/Decorators'
import { Validator } from './base/Validators'
import Func from './Function'
import { checkFuncByCode } from '@/api/funcModule'

class CodeValidator extends Validator {
    /* eslint-disable */
    constructor(errorMessage) {
        super(errorMessage)
    }
    /* eslint-disable */

    async validate(value, args) {
        if (!value) return false
        try {
            return !await checkFuncByCode(value, args)
        } catch (error) {
            console.error('校验code异常')
        }
        return false
    }
}

function code(errorMessage) {
    return validatorImpl(new CodeValidator(errorMessage))
}

class Module extends ValidatableObject {
    @code('编码已存在')
    _code = ''

    @required(false, '模块名称不能为空，请填写模块名称')
    _name = ''

    @accessor()
    _order = 0 // 排序

    @accessor()
    _hasChild = false // 是否有子节点

    @type(Func)
    _children = [] // 功能

    @accessor()
    _moduleType = 'FunctionCategory' // 功能类型
}

export default Module
