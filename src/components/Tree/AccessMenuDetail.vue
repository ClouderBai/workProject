/*
 * @Author: BAICHONG 
 * @Date: 2018-03-22 15:58:42 
 * @Last Modified by: BAICHONG
 * @Last Modified time: 2018-03-27 13:19:51
 */
 /**
|--------------------------------------------------
| 权限管理 -> 菜单树,详细权限界面:
|           例如:    增加工序报验
|                   删除工序报验
|                   修改工序报验
| 
|--------------------------------------------------
*/
<template>
    <div>
        <el-tree
            :data="data"
            show-checkbox
            @current-change="treeChange" 
            node-key="key"
            default-expand-all
            :render-content="renderContent"
            ref="tree"
            :default-checked-keys="checkedKeys"
            @check="checkChange"
            highlight-current 
            :props="defaultProps"
        />
        <el-button @click="test" size="mini" type="primary">ttesta</el-button>
    </div>
</template>

<script>

import Permission from '@/views/org-management/Permission'
export default {
    props: {
        permissionNode: {
            type: Object
        }
    },
    data() {
        return {
            id: -1,
            data: [],
            selected: {},
            defaultProps: {
                label: 'name',
                disabled: data => data.hasCheck
                // isLeaf: data => !data.hasChild
            },
            treeId: undefined,
            selectedNodeId: [], // 默认选中,初始化值,不会改变
            checkedKeys: [], // 选中checked,随点击改变
            loading: false,
            searchFormData: { orgSearchValue: '' },
            // ===============render================================
            iconDefaulte: 'bimicon-attentionforbid'// 无配置选项,默认值

        }
    },
    methods: {
        test() {
            console.log('%c%s', 'color:red;font-size:20px', 'this.checkedKeys  : ', this.checkedKeys)
        },
        // a
        getTreeData() {
            return this.checkedKeys.map(id => Object.assign({}, this.$refs.tree.getNode(id).data))
        },
        // 清楚详情页数据
        clearDetailData() {
            Object.assign(this.$data, this.$options.data())
        },
        // 获取树数据
        loadData(node) {
            // console.log('%c%s', 'color:red;font-size:20px', 'node获取树数据loadData  : ', JSON.stringify(node))
            this.selectedNodeId = []
            this.checkedKeys = []
            const data = Permission[node.code] ||
                         (this.$message.error(`${node.name}菜单Permission权限未配置code: ${node.code}`) || { other: [] })
            this.data = data.other
            if (node.CHECKED === false) {
                this.$emit('treeCheckedChange', []) // 所在权限节点没有被点击
                this.$refs.tree.setCheckedKeys([]) // 将所有checkBox设置为未点选状态
            } else {
                this.findCheckedId(node) // 根据返回的权限筛选勾选数组
            }
        },

        // 找到所有checked
        findCheckedId(data) {
            if (data.roleActionList) {
                const actionsArr = data.roleActionList.map(v => v.action)
                this.data.forEach(item => {
                    if (item.action.every(v => actionsArr.includes(v))) {
                        this.selectedNodeId.push(item.key)
                        this.checkedKeys.push(item.key)
                    }
                })
            }
        },

        // 自定义树节点
        renderContent(h, { node, data, store }) {
            const treeIcon = data.icon ? data.icon : this.iconDefaulte
            const iconColor = data.iconColor ? data.iconColor : '#606266'
            return h('span', {}, [h('i', { style: { color: iconColor }, class: treeIcon }, [' ']), h('span', {}, node.label)])
        },

        // 当前节点改变时
        treeChange(val) {
            this.selected = val
            this.$emit('treeChange', val)
        },
        // 当前节点checked改变时
        treeCheckedChange(val) {
            this.$emit('treeChange', val)
        },
        // checkBox 改变时触发
        checkChange(data, checkedOptions) {
            this.checkedKeys = checkedOptions.checkedKeys // 将选中的check数组保存起来
            console.log('%c%s', 'color:red;font-size:20px', 'dataAfter  : ', checkedOptions.checkedKeys)
            const permission = this.checkedKeys.reduce((total, id) => ([...total, ...this.$refs.tree.getNode(id).data.action]), [])
            this.$emit('treeCheckedChange', permission)
        }
    }
}
</script>

<style>

</style>
