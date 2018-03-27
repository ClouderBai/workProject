/*
 * @Author: wanghaoyu 
 * @Date: 2018-01-27 17:44:56 
 * @Last Modified by: wanghaoyu
 * @Last Modified time: 2018-01-29 14:56:23
 */
import ValidatableObject from "./base/ValidatableObject"
import { required, regex, accessor, type } from "./base/Decorators"

class DepExtAddCol extends ValidatableObject {

    @required(false, '公司地址不能为空')
    _name = ''   // 公司地址

    @required(false, '字符类型不能为空')
    _type = ''   // 字符类型

    @accessor()
    _valid = ''

    @accessor()
    _order = ''

    @accessor()
    _data = ''

}

export default DepExtAddCol
