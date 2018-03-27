/*
 * @Author: LiuJunTing
 * @Date: 2018-03-21 14:13:03
 * @Last Modified by: LiuJunTing
 * @Last Modified time: 2018-03-23 16:28:49
 */

/**
|--------------------------------------------------
|
|  自定义表单
|
|--------------------------------------------------
*/

import ObjectBase from '../base/ObjectBase'
import { accessor, type } from '../base/Decorators'

import FormElement from './FormElement'

class CustomerForm extends ObjectBase {
    @accessor()
    _formId = 0 // 表单id

    @accessor()
    _formCode = '' // 表单编码

    @accessor()
    _formName = '' // 表单名字

    @accessor()
    _formType = '' // 表单类型  New：新建表单 Associated：关联表单  Mandatory

    @type(FormElement)
    _formElements = [] // 表单元素列表

    @accessor()
    _order = 0 // 排序

    @accessor()
    _belongedToNodeName = '' // 关联表单所属任务节点的名称 NonMandatory

    @accessor()
    _belongedToNodeDisplayName = '' // 关联表单节点显示名称
}

export default CustomerForm
