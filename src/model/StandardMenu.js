/*
 * @Author
 * @Date -03-12 15:14:00
 * @Last Modified by: BAICHONG
 * @Last Modified time: 2018-03-16 10:06:32
 */
/**
|--------------------------------------------------
| 标准菜单管理树节点class
|
|--------------------------------------------------
*/
import ObjectBase from './base/ObjectBase'
import { accessor } from './base/Decorators'

class StandardMenu extends ObjectBase {
    // @accessor()
    // _id = ''
    @accessor()
    _parentCode // 父节点code

    @accessor()
    _code // 本身code

    @accessor()
    _name // 名字

    @accessor()
    _order // 排序
    // COMMONCONNECTION, //普通连接
    // FUNCTIONALTYPE //功能类型
    @accessor()
    _type = 'COMMONCONNECTION' // 链接类型

    @accessor()
    _functionCode // 功能code

    @accessor()
    _functionParams // 功能参数

    @accessor()
    _linkUrl // 链接地址

    @accessor()
    _icon = '' // 图标

    @accessor()
    _iconColor = '' // 图标颜色

    @accessor()
    _navigateType = 'DEFAULTOPEN'// 默认打开
    // 导航类型DEFAULTOPEN, //默认打开
    // DEFAULTCLOSES, //默认关闭
    // NONNAVIGABLE //不可导航.

    @accessor()
    _remark = '' // 备注

    @accessor()
    _hasChild // 是否有子节点

    @accessor()
    _children // 子节点集合

    @accessor()
    _hasCheck // 是否checked

    @accessor()
    _hasChange // 是否更改
}

export default StandardMenu
