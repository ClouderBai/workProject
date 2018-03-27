/*
 * @Author: BAICHONG 
 * @Date: 2018-03-21 10:28:47 
 * @Last Modified by: BAICHONG
 * @Last Modified time: 2018-03-22 17:58:15
 */
/**
|--------------------------------------------------
|  权限维护: 菜单树组件
|
|
|--------------------------------------------------
*/
<template>
    <div 
        :style="{ height: heightData, width:widthData }" 
        class="treeContainer" 
        v-loading="loading"
    >
        <!-- 搜索 -->
        <!-- <el-form ref="form" :model="searchFormData" @submit.native.prevent v-if="showSearch">
            <el-input clearable class="el-input-primary" placeholder="请输入搜索内容" v-model="searchFormData.orgSearchValue"/>
        </el-form> -->
        <!-- 树 -->
        <el-tree 
            :data="data"
            show-checkbox
            @current-change="treeChange" 
            node-key="id"
            default-expand-all
            :render-content="renderContent"
            ref="tree"
            :default-checked-keys="checkedKeys"
            @check="checkChange"
            highlight-current 
            :props="defaultProps"
            
        />
        <!-- :filter-node-method="filterNode" -->
        <!-- <el-button @click="test">test</el-button>:filter-node-method="filterNode" -->
        <el-button @click="getTreeData" type="primary" size="mini">imp</el-button>
    </div>
</template>
<script>
import _ from 'underscore'
import { fetchAuthorityManageTree, updateAuthorityManage } from '@/api/authorityManage'
import Permission from '@/views/org-management/Permission'
export default {
    props: {
        defaultId: {
            type: Number,
            default: 0
        },
        height: {
            type: String,
            default: '200'
        },
        widthData: {
            type: String,
            default: '100%'
        }
    },
    computed: {
        heightData() {
            return `${this.height}px`
        }
    },
    // watch: {
    //     filterText(val) {
    //         this.$refs.tree.filter(val)
    //     }
    // },
    data() {
        return {
            orgId: -1,
            data: [],
            selected: {},
            defaultProps: {
                label: 'name',
                children: 'children',
                disabled: data => !data.hasCanCheck,
                isLeaf: data => !data.hasChild
            },
            treeId: undefined,
            selectedNodeId: [], // 默认选中,初始化值,不会改变
            checkedKeys: [], // 选中checked,随点改变
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
            const arr1 = [1, 2, 3, 4, 5]
            const arr2 = [2, 3, 4, 5, 10]

            console.log('%c%s', 'color:red;font-size:20px', '[1, 2, 3, 4, 5], [5, 2, 10]  : ', _.difference(arr1, arr2))
            console.log('%c%s', 'color:red;font-size:20px', '[1, 2, 3, 4, 5], [5, 2, 10]  : ', _.difference(arr2, arr1))
            // console.log('%c%s', 'color:red', 'this.data  : ', this.data)
            // console.log('%c%s', 'color:red', 'this.checkKeys  : ', this.checkedKeys)
            // console.log('%c%s', 'color:red;font-size:20px', 'data()  : ', data)
        },
        // 获取树数据
        loadData(id = this.orgId, code) {
            if (!id) { this.$message.warning(`请选择节点`); return }
            this.orgId = id
            this.loading = true
            fetchAuthorityManageTree(id, code)
                .then(res => {
                    // const data = res.
                    this.selectedNodeId = []
                    this.checkedKeys = []
                    this.data = res
                    this.findCheckedId(res) // 根据返回的权限筛选勾选数组
                })
                .catch(e => void console.warn(`获取树数据: ${e && e.message}`))
                .finally(() => (this.loading = false))
        },

        // 找到所有checked
        findCheckedId(data) {
            if (data) {
                data.forEach(item => {
                    if (item.hasCanCheck && item.roleActionList) { // 能被勾选,并且有权限数组
                        let defaultPermission = Permission[item.code] || (this.$message.error(`${item.name}: 未配置${item.code}权限`) || { default: [] })// 找到权限层级default
                        defaultPermission = defaultPermission.default
                        // 找到节点所有actions
                        const actionsArr = item.roleActionList.map(actionsArray => actionsArray.action)
                        const result = defaultPermission.every(v => actionsArr.includes(v))
                        if (result) {
                            item.hasCheck = true
                            this.selectedNodeId.push(item.id)
                            this.checkedKeys.push(item.id)
                        }
                    }
                    if (item.hasChild) {
                        this.findCheckedId(item.children)
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

        // 将选中的check数组保存起来
        checkChange(data, checkedOptions) {
            this.checkedKeys = checkedOptions.checkedKeys
            data.hasCheck = this.checkedKeys.includes(data.id) // 判断节点check值 true:checked false: 未checked
            console.log('%c%s', 'color:red;font-size:20px', 'dataAfter  : ', checkedOptions.checkedKeys)
            console.log('%c%s', 'color:red;font-size:20px', 'data  : ', data)
            this.$emit('accessDetailUpdate', data)
        },

        // 保存树状态
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
            updateAuthorityManage()
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
<style scoped>
.treeContainer {
    overflow-y: auto;
}
</style>


