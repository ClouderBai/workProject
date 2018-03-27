/*
 * @Author: BaiChong 
 * @Date: 2018-01-27 17:44:56 
 * @Last Modified by: BaiChong
 * @Last Modified time: 2018-01-30 16:09:49
 */

import ObjectBase from "./base/ObjectBase"
import { required, regex, accessor, type } from "./base/Decorators"

class DepExtColDmnObj extends ObjectBase {

    @accessor()
    _colName = ''   // 公司地址

    @accessor()
    _type = ''   // 字符类型

    // @accessor()
    // _valid = ''

    @accessor()
    _order = ''

    @accessor()
    _data = ''
}

export default DepExtColDmnObj
