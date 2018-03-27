/*
 * @Author: LiuJunTing
 * @Date: 2018-03-19 15:52:01
 * @Last Modified by: LiuJunTing
 * @Last Modified time: 2018-03-26 13:49:16
 */

/**
|--------------------------------------------------
|
|  人工任务类
|
|--------------------------------------------------
*/

import ValidatableObject from '../base/ValidatableObject'
import { validatorImpl } from '../base/DecoratorUtil'
import { Validator } from '../base/Validators'
import { required, accessor, type } from '../base/Decorators'

import CustomerForm from './CustomerForm'
import HandleConfig from './HandleConfig'
import TaskManager from './TaskManager'
import CustomData from './CustomData'
import Due from './Due'
import Fallback from './Fallback'
import store from '@/store'

// import Diagram from './Diagram'
// import Sequence from './Sequence'

class UniquenessValidator extends Validator {
    /* eslint-disable */
    constructor(errorMessage, prop) {
        super(errorMessage)
        this.prop = prop
    }
    /* eslint-enable */

    validate(value) {
        const nodes = store.getters.getAllNodes
        return !(nodes.some(v => v[this.prop] === value))
    }
}
// 俩参数 1.错误提示信息  2.要校验的key
function uniqueness(errorMessage, prop) {
    return validatorImpl(new UniquenessValidator(errorMessage, prop))
}

class HumanTask extends ValidatableObject {
    @accessor()
    _uuid = '' // node节点唯一标识

    @uniqueness(`节点名称已存在`, `name`)
    @required(false, '节点名称不能为空')
    _name = '' // 节点名称

    @uniqueness(`显示名称已存在`, `label`)
    @required(false, '显示名称不能为空')
    _label = '' // 显示名称

    @accessor()
    _description = '' // 节点描述

    @type(CustomData)
    _userData = [] // 自定义数据

    @accessor()
    _dueDefinition = new Due() // 过期设置

    @accessor()
    _fallbackConfig = new Fallback() // 回流设置

    @type(CustomerForm)
    _customerFormDefines = [] // 自定义表单

    @type(HandleConfig)
    _handleConfigs = [] // 处理设置

    @type(TaskManager)
    _taskManagerConfigs = [] // 任务处理人设置

    @accessor()
    _type = '' // 节点类型

    // @accessor()
    // _processId = '' // 处理id

    // @accessor()
    // _diagram = new Diagram() // 图表

    // @type(Sequence)
    // _sequenceFlows = [] // 顺序？

    // @accessor()
    // _eventHandlerBean = false // 这特么是个什么玩意？？？！！！

    // @accessor()
    // _x = null // x坐标

    // @accessor()
    // _y = null // y坐标

    // @accessor()
    // _width = null // 宽度

    // @accessor()
    // _height = null // 高度

    // @accessor()
    // _taskName = null // 任务名称?

    // @accessor()
    // _taskType = '' // 任务类别

    // @accessor()
    // _allowSpecifyAssignee = false // 允许指定处理人?

    // @accessor()
    // _countersignMultiplicity = 0 // 完成设置 会签人数

    // @accessor()
    // _countersignPercentMultiplicity = 0 // 完成设置 会签百分比

    // @accessor()
    // _countersignExpression = '' // 会签意见？

    // @accessor()
    // _countersignHandler = '' // 会签处理人

    // @accessor()
    // _assignmentType ='' // 代理类型？

    // @accessor()
    // _assignees ='' // 代理人？

    // @accessor()
    // _assignmentHandlerBean = false // 是否委托代理人?

    // @accessor()
    // _swimlane = null // 泳道

    // @accessor()
    // _expression = null // 态度？
}

export default HumanTask
