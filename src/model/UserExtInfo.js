/*
 * @Author: zhanglianhao
 * @Date: 2018-01-27 17:49:09
 * @Last Modified by: zhanglianhao
 * @Last Modified time: 2018-03-20 17:24:50
 */

/*
|--------------------------------------------------
| 用户扩展信息类
|--------------------------------------------------
*/

import ValidatableObject from './base/ValidatableObject'
import { accessor } from './base/Decorators'

class UserExtInfo extends ValidatableObject {
    @accessor()
    _data = '' // 扩展属性值

    @accessor()
    _extId = '' // 扩展id

    @accessor()
    _extName = '' // 扩展属性名

    @accessor()
    _extType = '' // 扩展类别

    @accessor()
    _order = '' // 扩展排序

    @accessor()
    _userId = '' // number 当前用户的id
}

export default UserExtInfo
