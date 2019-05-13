export default {
    'status': 1,
    'data': {
        'name': 'File Dispatch With Routing',
        'key': 'file_dispatch_with_routing v1',
        'startProcessUrl': null,
        'version': 1,
        'createDate': null,
        'effectDate': null,
        'categoryId': null,
        'description': 'description',
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
            'processId': null,
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
                'sequenceFlowDiagrams': [{
                    'name': null,
                    'label': null,
                    'fontColor': '0,69,123',
                    'fontSize': 0,
                    'borderWidth': 2,
                    'borderColor': '0,69,123',
                    'points': null,
                    'to': 'FileDispatchNode',
                    'labelPosition': null
                }],
                'shapeType': 'Circle'
            },
            'sequenceFlows': [{
                'name': null,
                'toNode': 'FileDispatchNode',
                'conditionType': null,
                'expression': null,
                'handlerBean': null,
                'processId': null,
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
            }],
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
        'nodes': [{ 'uuid': '2367b9d0 - 3099 - 11e8 - ab90 - c765c6980d67', 'name': '杰尼龟', 'label': '皮卡丘', 'description': '', 'userData': [], 'dueDefinition': { 'id': -1 }, 'fallbackConfig': { 'id': -1 }, 'customerFormDefines': [{ 'formId': 34, 'formCode': 'FORM_00012', 'formName': '1027', 'formType': 'New', 'formElements': [{ 'elementId': 10693, 'elementName': '1027', 'elementType': 'radioGroup', 'formElementAuthority': 'Operable', 'id': -1 }], 'order': 1, 'belongedToNodeName': '', 'belongedToNodeDisplayName': '本节点', 'id': -1 }, { 'formId': 37, 'formCode': 'FORM_00015', 'formName': '1115', 'formType': 'New', 'formElements': [{ 'elementId': 19696, 'elementName': '1115', 'elementType': 'input', 'formElementAuthority': 'Operable', 'id': -1 }, { 'elementId': 15367, 'elementName': 'label', 'elementType': 'select', 'formElementAuthority': 'Operable', 'id': -1 }], 'order': 2, 'belongedToNodeName': '', 'belongedToNodeDisplayName': '本节点', 'id': -1 }, { 'formId': 38, 'formCode': 'FORM_00016', 'formName': '计划', 'formType': 'New', 'formElements': [{ 'elementId': 17787, 'elementName': 'OK', 'elementType': 'input', 'formElementAuthority': 'Operable', 'id': -1 }], 'order': 3, 'belongedToNodeName': '', 'belongedToNodeDisplayName': '本节点', 'id': -1 }], 'handleConfigs': [], 'taskManagerConfigs': [], 'type': '', 'id': -1 }],
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
            'nodeDiagrams': [{
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
                'sequenceFlowDiagrams': [{
                    'name': null,
                    'label': null,
                    'fontColor': '0,69,123',
                    'fontSize': 0,
                    'borderWidth': 2,
                    'borderColor': '0,69,123',
                    'points': null,
                    'to': 'FileDispatchNode',
                    'labelPosition': null
                }],
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
                'sequenceFlowDiagrams': [{
                    'name': null,
                    'label': null,
                    'fontColor': '0,69,123',
                    'fontSize': 0,
                    'borderWidth': 2,
                    'borderColor': '0,69,123',
                    'points': null,
                    'to': 'ApproveNode',
                    'labelPosition': null
                }],
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
                'sequenceFlowDiagrams': [{
                    'name': null,
                    'label': null,
                    'fontColor': '0,69,123',
                    'fontSize': 0,
                    'borderWidth': 2,
                    'borderColor': '0,69,123',
                    'points': null,
                    'to': 'RoutingDecisionNode',
                    'labelPosition': null
                }],
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
                'sequenceFlowDiagrams': [{
                    'name': null,
                    'label': null,
                    'fontColor': '0,69,123',
                    'fontSize': 0,
                    'borderWidth': 2,
                    'borderColor': '0,69,123',
                    'points': null,
                    'to': 'EndNode',
                    'labelPosition': null
                }],
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