/*
 * @Author: zhanglianhao
 * @Date: 2018-01-27 17:53:16
 * @Last Modified by: zhanglianhao
 * @Last Modified time: 2018-03-20 17:22:33
 */

/*
|--------------------------------------------------
| 分页类
|--------------------------------------------------
*/

import ObjectBase from './base/ObjectBase'
import { accessor } from './base/Decorators'

class Page extends ObjectBase {
    @accessor()
    _entityCount = 0 // number 数据总条数

    @accessor()
    _pageCount = 0 // number 总页数

    @accessor()
    _pageNo = 1 // number 页码

    @accessor()
    _pageSize = 10 // number 每页数据条数

    @accessor()
    _entities = [] // array table列表信息
}

export default Page
