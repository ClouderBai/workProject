/*
 * @Author: zhanglianhao
 * @Date: 2018-01-27 17:49:55
 * @Last Modified by: zhanglianhao
 * @Last Modified time: 2018-03-22 13:27:53
 */

/*
|--------------------------------------------------
| 用户角色类
|--------------------------------------------------
*/

import ValidatableObject from './base/ValidatableObject'
import { accessor } from './base/Decorators'

export class UserRoles extends ValidatableObject {
    @accessor()
    _code = '' // 角色码

    @accessor()
    _desc = '' // 角色描述

    @accessor()
    _name = '' // 角色名

    @accessor()
    _order = '' // 排序

    @accessor()
    _valid = true // boolean 是否有效

    @accessor()
    _userId = 0 // unmber 用户 id

    @accessor()
    _orgFullName = '' // 组织全名
}

export default UserRoles
