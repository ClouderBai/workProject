/*
 * @Author: LiuJunTing 
 * @Date: 2018-03-05 15:16:38 
 * @Last Modified by: LiuJunTing
 * @Last Modified time: 2018-03-05 15:35:51
 */

import ObjectBase from './base/ObjectBase'
import SystemParamsOrg from './SystemParamsOrg'
import { accessor, type } from './base/Decorators'

class SystemParams extends ObjectBase {
    @type(SystemParamsOrg)
    _actionOrgList = []

    @type(SystemParamsOrg)
    _menuOrgList = []

    @type(SystemParamsOrg)
    _roleOrgList = []
}

export default SystemParams