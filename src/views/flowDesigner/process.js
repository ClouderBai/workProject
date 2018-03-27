const process = {
    'status': 1,
    'data': {
        'id': 6802,
        'name': 'File Dispatch With Routing',
        'key': 'file_dispatch_with_routing v1',
        'startProcessUrl': null,
        'version': 1,
        'createDate': null,
        'effectDate': null,
        'categoryId': null,
        'description': null,
        'code': null,
        'remark': null,
        'enabled': null,
        'updateUid': 2,
        'updateDt': null,
        'versionRemark': null,
        'updateUserName': '测试员2',
        'eventHandlerBean': null,
        'startNode': {
            'name': 'StartNode',
            'label': '开始',
            'description': null,
            'processId': 6802,
            'diagram': {
                'name': 'StartNode',
                'label': '开始',
                'fontColor': '18,42,136',
                'fontSize': 0,
                'borderWidth': 1,
                'borderColor': '18,42,136',
                'width': 40,
                'height': 70,
                'x': 189,
                'y': 35,
                'backgroundColor': '220,220,220',
                'icon': '/icons/start.svg',
                'fontBold': false,
                'info': null,
                'time': 0,
                'owner': null,
                'sequenceFlowDiagrams': [
                    {
                        'name': null,
                        'label': null,
                        'fontColor': '0,69,123',
                        'fontSize': 0,
                        'borderWidth': 2,
                        'borderColor': '0,69,123',
                        'points': null,
                        'to': 'FileDispatchNode',
                        'labelPosition': null
                    }
                ],
                'shapeType': 'Circle'
            },
            'sequenceFlows': [
                {
                    'name': null,
                    'toNode': 'FileDispatchNode',
                    'conditionType': null,
                    'expression': null,
                    'handlerBean': null,
                    'processId': 6802,
                    'g': '',
                    'diagram': {
                        'name': null,
                        'label': null,
                        'fontColor': '0,69,123',
                        'fontSize': 0,
                        'borderWidth': 2,
                        'borderColor': '0,69,123',
                        'points': null,
                        'to': 'FileDispatchNode',
                        'labelPosition': null
                    }
                }
            ],
            'eventHandlerBean': null,
            'x': 189,
            'y': 35,
            'width': 40,
            'height': 70,
            'taskName': null,
            'url': null,
            'formTemplate': null,
            'formElements': [],
            'componentAuthorities': [],
            'type': 'Start'
        },
        'nodes': [
            {
                'name': 'StartNode',
                'label': '开始',
                'description': null,
                'processId': 6802,
                'diagram': {
                    'name': 'StartNode',
                    'label': '开始',
                    'fontColor': '18,42,136',
                    'fontSize': 0,
                    'borderWidth': 1,
                    'borderColor': '18,42,136',
                    'width': 40,
                    'height': 70,
                    'x': 189,
                    'y': 35,
                    'backgroundColor': '220,220,220',
                    'icon': '/icons/start.svg',
                    'fontBold': false,
                    'info': null,
                    'time': 0,
                    'owner': null,
                    'sequenceFlowDiagrams': [
                        {
                            'name': null,
                            'label': null,
                            'fontColor': '0,69,123',
                            'fontSize': 0,
                            'borderWidth': 2,
                            'borderColor': '0,69,123',
                            'points': null,
                            'to': 'FileDispatchNode',
                            'labelPosition': null
                        }
                    ],
                    'shapeType': 'Circle'
                },
                'sequenceFlows': [
                    {
                        'name': null,
                        'toNode': 'FileDispatchNode',
                        'conditionType': null,
                        'expression': null,
                        'handlerBean': null,
                        'processId': 6802,
                        'g': '',
                        'diagram': {
                            'name': null,
                            'label': null,
                            'fontColor': '0,69,123',
                            'fontSize': 0,
                            'borderWidth': 2,
                            'borderColor': '0,69,123',
                            'points': null,
                            'to': 'FileDispatchNode',
                            'labelPosition': null
                        }
                    }
                ],
                'eventHandlerBean': null,
                'x': 189,
                'y': 35,
                'width': 40,
                'height': 70,
                'taskName': null,
                'url': null,
                'formTemplate': null,
                'formElements': [],
                'componentAuthorities': [],
                'type': 'Start'
            },
            {
                'name': 'FileDispatchNode',
                'label': '发文',
                'description': null,
                'processId': 6802,
                'diagram': {
                    'name': 'FileDispatchNode',
                    'label': '发文',
                    'fontColor': '18,42,136',
                    'fontSize': 0,
                    'borderWidth': 1,
                    'borderColor': '3, 104, 154',
                    'width': 39,
                    'height': 69,
                    'x': 189,
                    'y': 164,
                    'backgroundColor': '250, 250, 250',
                    'icon': '/icons/task.svg',
                    'fontBold': false,
                    'info': null,
                    'time': 0,
                    'owner': null,
                    'sequenceFlowDiagrams': [
                        {
                            'name': null,
                            'label': null,
                            'fontColor': '0,69,123',
                            'fontSize': 0,
                            'borderWidth': 2,
                            'borderColor': '0,69,123',
                            'points': null,
                            'to': 'ApproveNode',
                            'labelPosition': null
                        }
                    ],
                    'shapeType': 'Rectangle'
                },
                'sequenceFlows': [
                    {
                        'name': null,
                        'toNode': 'ApproveNode',
                        'conditionType': null,
                        'expression': null,
                        'handlerBean': null,
                        'processId': 6802,
                        'g': '',
                        'diagram': {
                            'name': null,
                            'label': null,
                            'fontColor': '0,69,123',
                            'fontSize': 0,
                            'borderWidth': 2,
                            'borderColor': '0,69,123',
                            'points': null,
                            'to': 'ApproveNode',
                            'labelPosition': null
                        }
                    }
                ],
                'eventHandlerBean': null,
                'x': 189,
                'y': 164,
                'width': 39,
                'height': 69,
                'taskName': null,
                'taskType': 'Normal',
                'allowSpecifyAssignee': false,
                'countersignMultiplicity': 0,
                'countersignPercentMultiplicity': 0,
                'countersignExpression': null,
                'countersignHandler': null,
                'assignmentType': 'ProcessPromoter',
                'assignees': null,
                'assignmentHandlerBean': null,
                'swimlane': null,
                'expression': null,
                'url': null,
                'formTemplate': null,
                'taskListenerBean': null,
                'dueDefinition': null,
                'componentAuthorities': [],
                'formElements': [],
                'userData': [],
                'fallbackConfig': { // 重新发起回流设置 - Nonmandatory
                    'returnToType': null, // Nonmandatory
                    'relaunchWay': 'Restart' // Restart：重新发起；DCToRejectNode：直流到驳回节点 //Mandatory
                },
                'customerFormDefines': [ // 自定义表单  Mandatory
                    {
                        'formId': 123, // Mandatory
                        'formCode': 'formCode', // Mandatory
                        'formName': '测试表单', // NonMandatory
                        'formType': 'Associated', // New：新建表单 Associated：关联表单  Mandatory
                        'formElements': [ // 表单元素列表
                            {
                                'elementId': '123',
                                'elementName': '文件号',
                                'elementType': 'input',
                                'formElementAuthority': 'Read' // 元素权限 Read-只读 Operable-操作 Hide-隐藏  //Mandatory
                            }
                        ],
                        'belongedToNodeName': 'ApproveNode' // 关联表单所属任务节点的名称 //NonMandatory
                    }
                ],
                'handleConfigs': [ // 处理设置  Mandatory
                    {
                        'buttonName': '提交', // Mandatory
                        'taskHandleType': 'JumpTo', // Auto-自动，一般是顺流到下一节点; PrecursorLink-上一环节 ; JumpTo-跳转至 //Mandatory
                        'jumpToNodeName': 'ApproveNode' // 要跳转到节点的名字 //NonMandatory
                    }
                ],
                'taskManagerConfigs': [ // 任务处理人设置 //Mandatory
                    {
                        'selectorCate': 'Org', // 选择器类别 Org -组织结构 //Mandatory
                        'userSelectorValue': '选择的值', // Mandatory
                        'userSelectorScope': '选择范围', // NonMandatory
                        'userSelectorParameter': '选择参数' // NonMandatory
                    }
                ],
                'type': 'Task'
            },
            {
                'name': 'ApproveNode',
                'label': '会签审批',
                'description': null,
                'processId': 6802,
                'diagram': {
                    'name': 'ApproveNode',
                    'label': '会签审批',
                    'fontColor': '18,42,136',
                    'fontSize': 0,
                    'borderWidth': 1,
                    'borderColor': '3, 104, 154',
                    'width': 40,
                    'height': 70,
                    'x': 189,
                    'y': 295,
                    'backgroundColor': '250, 250, 250',
                    'icon': '/icons/task-countersign.svg',
                    'fontBold': false,
                    'info': null,
                    'time': 0,
                    'owner': null,
                    'sequenceFlowDiagrams': [
                        {
                            'name': null,
                            'label': null,
                            'fontColor': '0,69,123',
                            'fontSize': 0,
                            'borderWidth': 2,
                            'borderColor': '0,69,123',
                            'points': null,
                            'to': 'RoutingDecisionNode',
                            'labelPosition': null
                        }
                    ],
                    'shapeType': 'Rectangle'
                },
                'sequenceFlows': [
                    {
                        'name': null,
                        'toNode': 'RoutingDecisionNode',
                        'conditionType': null,
                        'expression': null,
                        'handlerBean': null,
                        'processId': 6802,
                        'g': '',
                        'diagram': {
                            'name': null,
                            'label': null,
                            'fontColor': '0,69,123',
                            'fontSize': 0,
                            'borderWidth': 2,
                            'borderColor': '0,69,123',
                            'points': null,
                            'to': 'RoutingDecisionNode',
                            'labelPosition': null
                        }
                    }
                ],
                'eventHandlerBean': null,
                'x': 189,
                'y': 295,
                'width': 40,
                'height': 70,
                'taskName': null,
                'taskType': 'Countersign',
                'allowSpecifyAssignee': false,
                'countersignMultiplicity': 0,
                'countersignPercentMultiplicity': 0,
                'countersignExpression': null,
                'countersignHandler': null,
                'assignmentType': 'ProcessPromoter',
                'assignees': null,
                'assignmentHandlerBean': null,
                'swimlane': null,
                'expression': null,
                'url': null,
                'formTemplate': null,
                'taskListenerBean': null,
                'dueDefinition': null,
                'componentAuthorities': [],
                'formElements': [],
                'userData': [],
                'fallbackConfig': null,
                'customerFormDefines': null,
                'handleConfigs': null,
                'taskManagerConfigs': null,
                'type': 'CountersignTask'
            },
            {
                'name': 'RoutingDecisionNode',
                'label': '路由决策',
                'description': null,
                'processId': 6802,
                'diagram': {
                    'name': 'RoutingDecisionNode',
                    'label': '路由决策',
                    'fontColor': '18,42,136',
                    'fontSize': 0,
                    'borderWidth': 1,
                    'borderColor': '18,42,136',
                    'width': 40,
                    'height': 70,
                    'x': 189,
                    'y': 412,
                    'backgroundColor': '220,220,220',
                    'icon': '/icons/decision.svg',
                    'fontBold': false,
                    'info': null,
                    'time': 0,
                    'owner': null,
                    'sequenceFlowDiagrams': [
                        {
                            'name': null,
                            'label': null,
                            'fontColor': '0,69,123',
                            'fontSize': 0,
                            'borderWidth': 2,
                            'borderColor': '0,69,123',
                            'points': null,
                            'to': 'EndNode',
                            'labelPosition': null
                        }
                    ],
                    'shapeType': 'Circle'
                },
                'sequenceFlows': [
                    {
                        'name': null,
                        'toNode': 'EndNode',
                        'conditionType': null,
                        'expression': null,
                        'handlerBean': null,
                        'processId': 6802,
                        'g': '',
                        'diagram': {
                            'name': null,
                            'label': null,
                            'fontColor': '0,69,123',
                            'fontSize': 0,
                            'borderWidth': 2,
                            'borderColor': '0,69,123',
                            'points': null,
                            'to': 'EndNode',
                            'labelPosition': null
                        }
                    }
                ],
                'eventHandlerBean': null,
                'x': 189,
                'y': 412,
                'width': 40,
                'height': 70,
                'expression': '32132',
                'handlerBean': null,
                'decisionType': 'Expression',
                'decisionRule': null,
                'type': 'Decision'
            },
            {
                'name': 'EndNode',
                'label': '结束',
                'description': null,
                'processId': 6802,
                'diagram': {
                    'name': 'EndNode',
                    'label': '结束',
                    'fontColor': '18,42,136',
                    'fontSize': 0,
                    'borderWidth': 1,
                    'borderColor': '18,42,136',
                    'width': 40,
                    'height': 70,
                    'x': 189,
                    'y': 524,
                    'backgroundColor': '220,220,220',
                    'icon': '/icons/end-terminate.svg',
                    'fontBold': false,
                    'info': null,
                    'time': 0,
                    'owner': null,
                    'sequenceFlowDiagrams': null,
                    'shapeType': 'Circle'
                },
                'sequenceFlows': null,
                'eventHandlerBean': null,
                'x': 189,
                'y': 524,
                'width': 40,
                'height': 70,
                'terminate': true,
                'type': 'EndTerminal'
            }
        ],
        'swimlanes': [],
        'componentSecuritys': null,
        'diagram': {
            'name': 'File Dispatch With Routing',
            'label': null,
            'fontColor': '50, 50, 50',
            'fontSize': 0,
            'borderWidth': 0,
            'borderColor': null,
            'width': 259,
            'height': 604,
            'showTime': false,
            'nodeDiagrams': [
                {
                    'name': 'StartNode',
                    'label': '开始',
                    'fontColor': '18,42,136',
                    'fontSize': 0,
                    'borderWidth': 1,
                    'borderColor': '18,42,136',
                    'width': 40,
                    'height': 70,
                    'x': 189,
                    'y': 35,
                    'backgroundColor': '220,220,220',
                    'icon': '/icons/start.svg',
                    'fontBold': false,
                    'info': null,
                    'time': 0,
                    'owner': null,
                    'sequenceFlowDiagrams': [
                        {
                            'name': null,
                            'label': null,
                            'fontColor': '0,69,123',
                            'fontSize': 0,
                            'borderWidth': 2,
                            'borderColor': '0,69,123',
                            'points': null,
                            'to': 'FileDispatchNode',
                            'labelPosition': null
                        }
                    ],
                    'shapeType': 'Circle'
                },
                {
                    'name': 'FileDispatchNode',
                    'label': '发文',
                    'fontColor': '18,42,136',
                    'fontSize': 0,
                    'borderWidth': 1,
                    'borderColor': '3, 104, 154',
                    'width': 39,
                    'height': 69,
                    'x': 189,
                    'y': 164,
                    'backgroundColor': '250, 250, 250',
                    'icon': '/icons/task.svg',
                    'fontBold': false,
                    'info': null,
                    'time': 0,
                    'owner': null,
                    'sequenceFlowDiagrams': [
                        {
                            'name': null,
                            'label': null,
                            'fontColor': '0,69,123',
                            'fontSize': 0,
                            'borderWidth': 2,
                            'borderColor': '0,69,123',
                            'points': null,
                            'to': 'ApproveNode',
                            'labelPosition': null
                        }
                    ],
                    'shapeType': 'Rectangle'
                },
                {
                    'name': 'ApproveNode',
                    'label': '会签审批',
                    'fontColor': '18,42,136',
                    'fontSize': 0,
                    'borderWidth': 1,
                    'borderColor': '3, 104, 154',
                    'width': 40,
                    'height': 70,
                    'x': 189,
                    'y': 295,
                    'backgroundColor': '250, 250, 250',
                    'icon': '/icons/task-countersign.svg',
                    'fontBold': false,
                    'info': null,
                    'time': 0,
                    'owner': null,
                    'sequenceFlowDiagrams': [
                        {
                            'name': null,
                            'label': null,
                            'fontColor': '0,69,123',
                            'fontSize': 0,
                            'borderWidth': 2,
                            'borderColor': '0,69,123',
                            'points': null,
                            'to': 'RoutingDecisionNode',
                            'labelPosition': null
                        }
                    ],
                    'shapeType': 'Rectangle'
                },
                {
                    'name': 'RoutingDecisionNode',
                    'label': '路由决策',
                    'fontColor': '18,42,136',
                    'fontSize': 0,
                    'borderWidth': 1,
                    'borderColor': '18,42,136',
                    'width': 40,
                    'height': 70,
                    'x': 189,
                    'y': 412,
                    'backgroundColor': '220,220,220',
                    'icon': '/icons/decision.svg',
                    'fontBold': false,
                    'info': null,
                    'time': 0,
                    'owner': null,
                    'sequenceFlowDiagrams': [
                        {
                            'name': null,
                            'label': null,
                            'fontColor': '0,69,123',
                            'fontSize': 0,
                            'borderWidth': 2,
                            'borderColor': '0,69,123',
                            'points': null,
                            'to': 'EndNode',
                            'labelPosition': null
                        }
                    ],
                    'shapeType': 'Circle'
                },
                {
                    'name': 'EndNode',
                    'label': '结束',
                    'fontColor': '18,42,136',
                    'fontSize': 0,
                    'borderWidth': 1,
                    'borderColor': '18,42,136',
                    'width': 40,
                    'height': 70,
                    'x': 189,
                    'y': 524,
                    'backgroundColor': '220,220,220',
                    'icon': '/icons/end-terminate.svg',
                    'fontBold': false,
                    'info': null,
                    'time': 0,
                    'owner': null,
                    'sequenceFlowDiagrams': null,
                    'shapeType': 'Circle'
                }
            ]
        },
        'processFormDefinition': null,
        'content': null,
        'formIds': null,
        'current': null
    },
    'message': null,
    'errorCode': null
}
export default process
