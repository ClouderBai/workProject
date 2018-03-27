/*
 * @Author: BAICHONG
 * @Date: 2018-03-16 13:38:07
 * @Last Modified by: BAICHONG
 * @Last Modified time: 2018-03-23 16:50:24
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
            { key: 1, name: '增加工序报验', action: ['gxby:create'], icon: '' },
            { key: 2, name: '修改工序报验', action: ['gxby:update'], icon: '' },
            { key: 3, name: '删除工序报验', action: ['gxby:delete'], icon: '' }
        ]
    },
    'BZCD_00002': {
        default: ['org:OrgTree', 'gxby:detail'],
        other: [
            { key: 4, name: '增加工序报验', action: ['gxby:create'], icon: '' },
            { key: 5, name: '修改工序报验', action: ['gxby:update'], icon: '' },
            { key: 6, name: '删除工序报验', action: ['gxby:delete'], icon: '' }
        ]
    },
    'BZCD_00003': {
        default: ['authorityManage:getAuthorityManageTree', 'gxby:detail'],
        other: [
            { key: 7, name: '菜单目录', action: [], disabled: true }
        ]
    },
    'BZCD_00004': {
        default: ['authorityManage:getAuthorityManageTree', 'gxby:detail'],
        other: [
            { key: 8, name: '增加工序报验', action: ['gxby:create'], icon: '' },
            { key: 9, name: '修改工序报验', action: ['gxby:update'], icon: '' },
            { key: 10, name: '删除工序报验', action: ['gxby:delete'], icon: '' }
        ]
    },
    'BZCD_00005': {
        default: ['authorityManage:getAuthorityManageTree', 'gxby:detail'],
        other: [
            { key: 1, name: '增加工序报验', action: ['gxby:create'], icon: '' },
            { key: 2, name: '修改工序报验', action: ['gxby:update'], icon: '' },
            { key: 3, name: '删除工序报验', action: ['gxby:delete'], icon: '' }
        ]
    },
    'BZCD_00006': {
        default: ['authorityManage:getAuthorityManageTree', 'gxby:detail'],
        other: [
            { key: 1, name: '增加工序报验', action: ['gxby:create'], icon: '' },
            { key: 2, name: '修改工序报验', action: ['gxby:update'], icon: '' },
            { key: 3, name: '删除工序报验', action: ['gxby:delete'], icon: '' }
        ]
    },
    'BZCD_00007': {
        default: ['authorityManage:getAuthorityManageTree', 'gxby:detail'],
        other: [
            { key: 1, name: '增加工序报验', action: ['gxby:create'], icon: '' },
            { key: 2, name: '修改工序报验', action: ['gxby:update'], icon: '' },
            { key: 3, name: '删除工序报验', action: ['gxby:delete'], icon: '' }
        ]
    },
    'BZCD_00008': {
        default: ['authorityManage:getAuthorityManageTree', 'gxby:detail'],
        other: [
            { key: 1, name: '增加工序报验', action: ['gxby:create'], icon: '' },
            { key: 2, name: '修改工序报验', action: ['gxby:update'], icon: '' },
            { key: 3, name: '删除工序报验', action: ['gxby:delete'], icon: '' }
        ]
    },
    'BZCD_00009': {
        default: ['authorityManage:getAuthorityManageTree', 'gxby:detail'],
        other: [
            { key: 1, name: '增加工序报验', action: ['gxby:create'], icon: '' },
            { key: 2, name: '修改工序报验', action: ['gxby:update'], icon: '' },
            { key: 3, name: '删除工序报验', action: ['gxby:delete'], icon: '' }
        ]
    },
    'BZCD_00010': {
        default: ['authorityManage:getAuthorityManageTree', 'gxby:detail'],
        other: [
            { key: 1, name: '增加工序报验', action: ['gxby:create'], icon: '' },
            { key: 2, name: '修改工序报验', action: ['gxby:update'], icon: '' },
            { key: 3, name: '删除工序报验', action: ['gxby:delete'], icon: '' }
        ]
    },
    'BZCD_00011': {
        default: ['clrk:clrk', 'gxby:detail'],
        other: [
            { key: 1, name: '增加材料入库', action: ['clrk:create'] },
            { key: 2, name: '修改材料入库', action: ['clrk:update'] },
            { key: 3, name: '删除材料入库', action: ['clrk:delete'] }
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
            { key: 1, name: '增加工序报验', action: ['gxby:create'], icon: '' },
            { key: 2, name: '修改工序报验', action: ['gxby:update'], icon: '' },
            { key: 3, name: '删除工序报验', action: ['gxby:delete'], icon: '' }
        ]
    }

}

