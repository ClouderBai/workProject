/*
 * @Author: zhanglianhao
 * @Date: 2018-01-30 11:08:44
 * @Last Modified by: zhanglianhao
 * @Last Modified time: 2018-03-20 17:25:50
 */

/*
|--------------------------------------------------
| 用户信息类 包括用户基本信息 扩展属性 用户角色 用户材料 用户分值等类
|--------------------------------------------------
*/

import ValidatableObject from './base/ValidatableObject'
import UserBaseInfo from './UserBaseInfo'
import UserExtInfo from './UserExtInfo'
import UserMaterials from './UserMaterials'
import UserRoles from './UserRoles'
import UserScore from './UserScore'
import { accessor, type } from './base/Decorators'

class UserInfo extends ValidatableObject {
    @type(UserBaseInfo)
    _baseInfo = {} // 用户基本信息

    @type(UserScore)
    _score = {} // 用户分值

    @type(UserExtInfo)
    _exts = [] // 用户扩展信息

    @type(UserMaterials)
    _materials = [] // 用户材料

    @type(UserRoles)
    _roles = [] // 用户角色

    @accessor()
    _eleFilelist = function() { // element fileFist
        return this._materials.map((v, i) => {
            return [{
                id: v._fileEntity.id,
                index: i, // 保存序号
                name: v._fileEntity.fileName,
                url: `${process.env.API_ENDPOINT.slice(0, -5)}${v._fileEntity.filePath}`
            }]
        })
    }
}

export default UserInfo
