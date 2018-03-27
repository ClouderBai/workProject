/*
 * @Author: BAICHONG
 * @Date: 2018-03-16 13:38:07
 * @Last Modified by: BAICHONG
 * @Last Modified time: 2018-03-22 16:27:39
 */
/**
|--------------------------------------------------
| 权限管理: perimssion配置
|          key: 唯一
|          icon: 当前节点图标
|          action: 权限
|          name: 权限名字
|
|
|--------------------------------------------------
*/
export default {
    'BZCD_00001': {
        default: ['authorityManage:getAuthorityManageTree', 'orgUser:resetPassword'],
        other: [
            { name: '增加工序报验', action: ['gxby:create'] },
            { name: '修改工序报验', action: ['gxby:update'] },
            { name: '删除工序报验', action: ['gxby:delete'] }
        ]
    },
    'BZCD_00002': {
        default: ['org:OrgTree', 'gxby:detail'],
        other: [
            { name: '增加工序报验', action: ['gxby:create'] },
            { name: '修改工序报验', action: ['gxby:update'] },
            { name: '删除工序报验', action: ['gxby:delete'] }
        ]
    },
    'BZCD_00003': {
        default: ['authorityManage:getAuthorityManageTree', 'gxby:detail'],
        other: [
            { name: '增加工序报验', action: ['gxby:create'] },
            { name: '修改工序报验', action: ['gxby:update'] },
            { name: '删除工序报验', action: ['gxby:delete'] }
        ]
    },
    'BZCD_00004': {
        default: ['authorityManage:getAuthorityManageTree', 'gxby:detail'],
        other: [
            { name: '增加工序报验', action: ['gxby:create'] },
            { name: '修改工序报验', action: ['gxby:update'] },
            { name: '删除工序报验', action: ['gxby:delete'] }
        ]
    },
    'BZCD_00005': {
        default: ['authorityManage:getAuthorityManageTree', 'gxby:detail'],
        other: [
            { name: '增加工序报验', action: ['gxby:create'] },
            { name: '修改工序报验', action: ['gxby:update'] },
            { name: '删除工序报验', action: ['gxby:delete'] }
        ]
    },
    'BZCD_00006': {
        default: ['authorityManage:getAuthorityManageTree', 'gxby:detail'],
        other: [
            { name: '增加工序报验', action: ['gxby:create'] },
            { name: '修改工序报验', action: ['gxby:update'] },
            { name: '删除工序报验', action: ['gxby:delete'] }
        ]
    },
    'BZCD_00007': {
        default: ['authorityManage:getAuthorityManageTree', 'gxby:detail'],
        other: [
            { name: '增加工序报验', action: ['gxby:create'] },
            { name: '修改工序报验', action: ['gxby:update'] },
            { name: '删除工序报验', action: ['gxby:delete'] }
        ]
    },
    'BZCD_00008': {
        default: ['authorityManage:getAuthorityManageTree', 'gxby:detail'],
        other: [
            { name: '增加工序报验', action: ['gxby:create'] },
            { name: '修改工序报验', action: ['gxby:update'] },
            { name: '删除工序报验', action: ['gxby:delete'] }
        ]
    },
    'BZCD_00009': {
        default: ['authorityManage:getAuthorityManageTree', 'gxby:detail'],
        other: [
            { name: '增加工序报验', action: ['gxby:create'] },
            { name: '修改工序报验', action: ['gxby:update'] },
            { name: '删除工序报验', action: ['gxby:delete'] }
        ]
    },
    'BZCD_00010': {
        default: ['authorityManage:getAuthorityManageTree', 'gxby:detail'],
        other: [
            { name: '增加工序报验', action: ['gxby:create'] },
            { name: '修改工序报验', action: ['gxby:update'] },
            { name: '删除工序报验', action: ['gxby:delete'] }
        ]
    },
    'BZCD_00011': {
        default: ['authorityManage:getAuthorityManageTree', 'gxby:detail'],
        other: [
            { name: '增加工序报验', action: ['gxby:create'] },
            { name: '修改工序报验', action: ['gxby:update'] },
            { name: '删除工序报验', action: ['gxby:delete'] }
        ]
    },
    'BZCD_00012': {
        default: ['authorityManage:updateAuthorityManage', 'gxby:detail'],
        other: [
            { key: 1, name: '增加工序报验', action: ['gxby:create'], icon: '' },
            { key: 2, name: '修改工序报验', action: ['gxby:update'], icon: '' },
            { key: 3, name: '删除工序报验', action: ['gxby:delete'], icon: '' }
        ]
    },
    'BZCD_00013': {
        default: ['authorityManage:updateAuthorityManage', 'gxby:detail'],
        other: [
            { name: '增加工序报验', action: ['gxby:create'] },
            { name: '修改工序报验', action: ['gxby:update'] },
            { name: '删除工序报验', action: ['gxby:delete'] }
        ]
    }

}

