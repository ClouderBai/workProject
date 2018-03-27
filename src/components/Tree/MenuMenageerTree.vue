/*
 * @Author: BAICHONG 
 * @Date: 2018-03-16 09:05:06 
 * @Last Modified by: BAICHONG
 * @Last Modified time: 2018-03-22 18:00:36
 */
/**
|--------------------------------------------------
|  菜单管理 => 右侧   前端菜单树结构组件
|       1. checkBox
|       2. 依赖组织树id获取data信息
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
        <!-- <el-button @click="test">test</el-button>:filter-node-method="filterNode" -->
        <!-- <el-button @click="getTreeData">getTreeData</el-button> -->
    </div>
</template>
<script>
import _ from 'underscore'
import { fetchOrgMenuListTreeByOrgId, updateOrgMenu } from '@/api/standardMenu'
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
    watch: {},
    data() {
        return {
            orgId: -1,
            data: [],
            selectedNodeId: [],
            selected: {},
            defaultProps: {
                label: 'name',
                children: 'children',
                isLeaf: data => !data.hasChild
            },
            treeId: undefined,
            defaultExpanded: [], // 默认展开的数组集合
            checkedKeys: [], // 默认选中checked
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
            console.log('%c%s', 'color:red', 'this.data  : ', this.data)
            console.log('%c%s', 'color:red', 'this.checkKeys  : ', this.checkedKeys)
        },
        // 获取树数据
        loadData(id = this.orgId) {
            if (!id) { this.$message.warning(`请选择节点`); return }
            this.orgId = id
            this.loading = true
            fetchOrgMenuListTreeByOrgId(id)
                .then(res => {
                    this.selectedNodeId = []
                    this.checkedKeys = []
                    this.data = res
                    this.findCheckedId(res)
                })
                .catch(e => void console.warn(`获取树数据: ${e && e.message}`))
                .finally(() => (this.loading = false))
        },
        // 找到所有checked
        findCheckedId(data) {
            if (data) {
                data.forEach(item => {
                    if (item.hasCheck) {
                        this.selectedNodeId.push(item.id)
                        this.checkedKeys.push(item.id)
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
            return h(
                'span',
                [
                    h('i', { style: { color: iconColor }, class: treeIcon }, [' ']),
                    h('span', {}, node.label)
                ]
            )
        },

        // 当前节点改变时
        treeChange(val) {
            this.selected = val
            this.$emit('treeChange', val)
        },

        checkChange(data, checkedOptions) {
            this.checkedKeys = checkedOptions.checkedKeys // 将选中的check数组保存起来
            // console.log('%c%s', 'color:red;font-size:20px', 'dataAfter  : ', checkedOptions.checkedKeys)
        },

        saveTreeStatus() {
            this.loading = true
            // 取差集
            const differ1 = _.difference(this.checkedKeys, this.selectedNodeId)
            const differ2 = _.difference(this.selectedNodeId, this.checkedKeys)
            const data = [...differ1, ...differ2]
            data.forEach(id => {
                const node = this.$refs.tree.getNode(id).data
                node.hasCheck = !node.hasCheck
                node.hasChange = true
            })
            updateOrgMenu(this.orgId, this.data)
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
    }
}
</script>
<style scoped>
.treeContainer {
    overflow-y: auto;
}
</style>


