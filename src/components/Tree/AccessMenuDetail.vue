/*
 * @Author: BAICHONG 
 * @Date: 2018-03-22 15:58:42 
 * @Last Modified by: BAICHONG
 * @Last Modified time: 2018-03-22 17:47:42
 */
 /**
|--------------------------------------------------
| 权限管理 -> 点击菜单树,显示,详细权限界面:
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

        <el-button @click="getTreeData" size="mini" type="primary">this.data</el-button>
    </div>
</template>

<script>

import Permission from '@/views/org-management/Permission'
export default {
    props: {
        permissionNode: {
            type: Object
        }
    // defaultId: {
    //     type: Number,
    //     default: 0
    // },
    // height: {
    //     type: String,
    //     default: '200'
    // },
    // widthData: {
    //     type: String,
    //     default: '100%'
    // }
    },
    // computed: {
    //     heightData() {
    //         return `${this.height}px`
    //     }
    // },
    // watch: {
    //     filterText(val) {
    //         this.$refs.tree.filter(val)
    //     }
    // },
    data() {
        return {
            id: -1,
            data: [],
            selected: {},
            defaultProps: {
                label: 'name',
                // children: 'children',
                disabled: data => data.hasCheck
                // isLeaf: data => !data.hasChild
            },
            treeId: undefined,
            selectedNodeId: [], // 默认选中,初始化值,不会改变
            checkedKeys: [], // 选中checked,随点击改变
            // keys: [],
            loading: false,
            searchFormData: { orgSearchValue: '' },
            // ===============render================================
            iconDefaulte: 'bimicon-attentionforbid'// 无配置选项,默认值

        }
    },
    methods: {
        // test
        getTreeData() {
            console.log('%c%s', 'color:red', 'this.data  : ', JSON.stringify(this.data))
            console.log('%c%s', 'color:red', 'this.selectedNodeId  : ', this.selectedNodeId)
            // console.log('%c%s', 'color:red;font-size:20px', 'data()  : ', data)
        },
        // 获取树数据
        loadData(node) {
            // const code = node.code// 找到节点的code
            const data = Permission[node.code] ||
                        (this.$message.error(`${node.name}菜单Permission权限未配置code: ${node.code}`) || { other: [] })
            this.data = data.other
            // if (!id) { this.$message.warning(`请选择节点`); return }
            // this.orgId = id
            // this.loading = true
            // fetchAuthorityManageTree(id, code)
            //     // .then(res => {
            //     //     return
            //     // })
            //     .then(res => {
            //         // const data = res.
            this.selectedNodeId = []
            this.checkedKeys = []
            //         this.data = res
            this.findCheckedId(node) // 根据返回的权限筛选勾选数组
            //     })
            //     // .then(() => {
            //     //     this.$refs.tree.filter('1')
            //     // })
            //     .catch(e => void console.warn(`获取树数据: ${e && e.message}`))
            //     .finally(() => (this.loading = false))
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

        checkChange(data, checkedOptions) {
            this.checkedKeys = checkedOptions.checkedKeys // 将选中的check数组保存起来
            console.log('%c%s', 'color:red;font-size:20px', 'dataAfter  : ', checkedOptions.checkedKeys)
        },

        saveTreeStatus() {
            this.loading = true
            // 取差集
            const differ = _.difference(this.checkedKeys, this.selectedNodeId)
            differ.forEach(id => {
                const node = this.$refs.tree.getNode(id).data
                node.hasCheck = !node.hasCheck
                node.hasChange = true
            })
            // 保存权限需要过滤disabled层级
            updateAuthorityManage(this.orgId, this.data)
                .then(res => {
                    this.$message.success(`保存成功`)
                })
                .catch(e => {
                    this.$message.error(`保存失败: ${e && e.message}`)
                })
                .finally(() => {
                    this.loading = false
                })
        }
        // filterNode(value, data, node) {
        //     console.log('%c%s', 'color:red;font-size:20px', 'value  : ', value)
        //     console.log('%c%s', 'color:red;font-size:20px', 'data  : ', data)
        //     console.log('%c%s', 'color:red;font-size:20px', 'node  : ', node)

        //     return data.hasCanCheck
        // }

    }
}
</script>

<style>

</style>
