/*
 * @Author: zhanglianhao
 * @Date: 2018-01-27 17:49:48
 * @Last Modified by: zhanglianhao
 * @Last Modified time: 2018-03-22 13:16:34
 */

/*
|--------------------------------------------------
| 用户材料类
|--------------------------------------------------
*/

import ValidatableObject from './base/ValidatableObject'
import FileEntity from './FileEntity'
import { accessor } from './base/Decorators'

class UserMaterials extends ValidatableObject {
    @accessor()
    _userId= '' // number 用户id

    @accessor()
    _fileType = '' // 文件类型

    @accessor()
    _issueOrg = '' // 颁发组织

    @accessor()
    _issueDt = '' // 颁发日期

    @accessor()
    _chechDt ='' // 检查日期

    @accessor()
    _expireDt = '' // 过期日期

    @accessor()
    _updateDt = '' // 更新日期

    @accessor()
    _remark = '' // 备注

    @accessor()
    _fileId = 0 // 文件id

    @accessor()
    _fileUrl = '' // 文件url

    @accessor()
    _fileEntity = FileEntity // 文件实体
}

export default UserMaterials
