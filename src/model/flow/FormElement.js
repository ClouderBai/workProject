/*
 * @Author: LiuJunTing
 * @Date: 2018-03-21 14:15:13
 * @Last Modified by: LiuJunTing
 * @Last Modified time: 2018-03-23 10:31:53
 */

/**
|--------------------------------------------------
|
|  表单元素类  用于自定义表单  @/model/flow/CustomData
|
|--------------------------------------------------
*/

import ObjectBase from '../base/ObjectBase'
import { accessor } from '../base/Decorators'

class FormElement extends ObjectBase {
    @accessor()
    _elementId = 0 // 元素id

    @accessor()
    _elementName = '' // 元素名称

    @accessor()
    _elementType = '' // 元素类型  input...

    @accessor()
    _formElementAuthority = '' // 元素权限 Read-只读 Operable-操作 Hide-隐藏     Mandatory
}

export default FormElement
