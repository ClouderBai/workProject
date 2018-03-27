/*
 * @Author: zhanglianhao
 * @Date: 2018-03-20 17:20:54
 * @Last Modified by: zhanglianhao
 * @Last Modified time: 2018-03-20 17:21:17
 */
/*
|--------------------------------------------------
| 功能类
|--------------------------------------------------
*/
import ValidatableObject from './base/ValidatableObject'
import { validatorImpl } from './base/DecoratorUtil'
import { Validator } from './base/Validators'
import { required, accessor } from './base/Decorators'
import { checkFuncCategoryByCode } from '@/api/funcModule'

class CodeValidator extends Validator {
    /* eslint-disable */
    constructor(errorMessage) {
        super(errorMessage)
    }
    /* eslint-disable */

    async validate(value, args) {
        if (!value) return false
        try {
            return !await checkFuncCategoryByCode(value, args)
        } catch (error) {
            console.error('校验code异常')
        }
        return false
    }
}

function code(errorMessage) {
    return validatorImpl(new CodeValidator(errorMessage))
}

class Func extends ValidatableObject {
    @required(false, '功能名称不能为空，请填写功能名称')
    _name = '' // 功能名称

    @code('编码已存在')
    _catCode = '' // 功能编码

    @accessor()
    _code = '' //

    @accessor()
    _hasDelete = '' //

    @accessor()
    _hasSeleteChoice = '' //

    @accessor()
    _order = '' //

    @accessor()
    _remark = '' //

    @accessor()
    _templateCode = '' //

    @accessor()
    _templateName = '' //

    @accessor()
    _templateType = '' //

    @accessor()
    _type = '' //

    @accessor()
    _url = '' //

    @accessor()
    _moduleType = 'Function' // 功能类型
}

export default Func
