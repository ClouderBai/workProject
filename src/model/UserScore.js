/*
 * @Author: zhanglianhao
 * @Date: 2018-01-27 17:50:01
 * @Last Modified by: zhanglianhao
 * @Last Modified time: 2018-03-20 17:26:44
 */
/*
|--------------------------------------------------
| 用户分值类
|--------------------------------------------------
*/

import ValidatableObject from './base/ValidatableObject'
import { accessor } from './base/Decorators'

export class UserScore extends ValidatableObject {
    @accessor()
    _score = '' // 用户分值

    @accessor()
    _scoreResetDt = '2018-01-30T01:05:23.426Z' // 分值重置日期

    @accessor()
    _userId = '' // number 当前用户id
}

export default UserScore
