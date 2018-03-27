/*
 * @Author: LiuJunTing
 * @Date: 2018-03-05 15:05:04
 * @Last Modified by: zhanglianhao
 * @Last Modified time: 2018-03-08 14:02:57
 */

import ObjectBase from './base/ObjectBase'
import {
    accessor
} from './base/Decorators'

class SystemParamsOrg extends ObjectBase {
    @accessor()
    _name = '' // 名字

    @accessor()
    _settingKey = '' // key

    @accessor()
    _settingType = '' // 类型

    @accessor()
    _settingVal = false // 是否选中
}

export default SystemParamsOrg
