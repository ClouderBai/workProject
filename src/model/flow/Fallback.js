/*
 * @Author: LiuJunTing
 * @Date: 2018-03-20 09:33:01
 * @Last Modified by: zhanglianhao
 * @Last Modified time: 2018-03-26 16:29:31
 */

/**
|--------------------------------------------------
|
|  回流设置
|
|--------------------------------------------------
*/

import ObjectBase from '../base/ObjectBase'
import { accessor } from '../base/Decorators'

class Fallback extends ObjectBase {
    @accessor()
    _returnToType = ''

    @accessor()
    _relaunchWay = '' // Restart：重新发起(跳过)；DCToRejectNode：直流到驳回节点(不跳过) //Mandatory
}

export default Fallback
