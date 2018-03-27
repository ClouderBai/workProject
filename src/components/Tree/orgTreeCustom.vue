/*
 * @Author: BaiChong 
 * @Date: 2018-01-26 15:06:47 
 * @Last Modified by: zhanglianhao
 * @Last Modified time: 2018-03-27 16:34:23
 */
/**
|--------------------------------------------------
| 自定义树: 
|       角色人员管理树:   @param { Options.USER_ROLE_ORG }:  只能点击角色,其他无法点击,无法点击为灰色
|       权限维护:        @param { Options.USER_ROLE_ORG }:  ...
|       组织维护:        @param  ''   空字符串,返回数据带岗位
| 
| 
|--------------------------------------------------
*/
<template>
    <div 
        :style="{height: heightData,width:widthData}" 
        class="treeContainer" 
        v-loading="loading"
    >
        <!-- 搜索 -->
        <el-form ref="form" :model="searchFormData" @submit.native.prevent v-if="showSearch">
            <el-input clearable class="el-input-primary" placeholder="请输入搜索内容" v-model="searchFormData.orgSearchValue"/>
        </el-form>
        <!-- 树 -->
        <el-tree 
            :data="data"
            :default-expanded-keys="defaultExpanded" 
            @current-change="changeTree"
            :renderContent='renderContent'
            node-key="id"
            :filter-node-method="filterNode"
            ref="tree" 
            highlight-current 
            :props="defaultProps"
            :expand-on-click-node='false'
            >
        </el-tree>
        <!-- <el-button @click="insertAfter" @node-expand="nodeExpand" size="mini">insertAfter</el-button> -->
    </div>
</template>
<script>
import { fetchOrgTree } from '@/api/org'
import Options from './Options'
import StyleOptions from './TreeStyleOptions'

export default {
    props: {
        height: {
            type: String,
            default: '200'
        },
        widthData: {
            type: String,
            default: '100%'
        },
        filter: {
            type: String,
            default: Options.MENU_ORG
        },
        showSearch: {
            type: Boolean,
            default: true
        }
    },
    created() {
        this.treeId = this.defaultId
        this.treeType = this.filter
    },
    watch: {
        'searchFormData.orgSearchValue': {
            handler(val) {
                this.$refs.tree.filter(val)
            },
            deep: true
        }
    },
    mounted() {
        this.init()
    },
    computed: {
        heightData() {
            return `${this.height}px`
        },
        hasRole() { // 是不是角色树
            return this.filter === Options.USER_ROLE_ORG || this.filter === Options.ACTION_ORG
        }
    },
    data() {
        return {
            data: [],
            selected: {}, // 树选中数据
            defaultProps: {
                label: 'title',
                children: 'children',
                isLeaf: data => !data.hasChild
            },
            treeId: undefined,
            treeType: undefined, // tree类型在options里进行选择
            defaultExpanded: [], // 默认展开节点数组
            searchedData: [],
            searchedSelected: {}, // 搜索树选中数据
            treeVisible: true, // tree?显示
            loading: false,
            searchFormData: { orgSearchValue: '' }
        }
    },
    methods: {
        insertAfter() {
            const data = { 'id': 500, 'title': '测试插入节点', 'hasChild': false, 'children': [] }
            this.$refs.tree.insertAfter(data, 423)
        },
        // 获取树数据
        async loadData(filter) {
            return await fetchOrgTree(this.filter).catch(e => console.warn(`获取树数据   ${e && e.message}`))
        },

        // 初始化
        init() {
            this.loading = true
            this.loadData(this.filter)
                .then(res => {
                    this.data = res
                    this.handleResponse(this.data)
                    return res
                })
                .then(res => { // hasRole
                    if (!this.$refs.tree.getCurrentKey() && res.length > 0 && !this.hasRole) {
                        const [data] = res
                        const { id } = data
                        this.$refs.tree.setCurrentKey(id)
                        this.changeTree(data)
                    }
                })
                .catch(e => console.warn(`角色树加载失败  ${e && e.message}`))
                .finally(() => (this.loading = false))
        },
        // 处理返回数据
        handleResponse(data) {
            if (data && data.length > 0) {
                data.forEach(item => {
                    this.handleRoleList(item)
                    if (item.hasChild) {
                        this.handleResponse(item.children)
                    }
                })
            }
        },
        // 将角色放到children字段下
        handleRoleList(item) {
            const roleList = item.roleList
            if (roleList && roleList.length > 0) {
                roleList.forEach(v => {
                    v.id = `${StyleOptions.levelType.ROLE}-${v.id}`
                    v.title = v.name
                    v.levelType = StyleOptions.levelType.ROLE
                    v.hasChild = false
                })
                item.children = [...(item.children || []), ...roleList]
            }
        },
        // 渲染树
        renderContent(h, { node, data, store }) {
            // 图标选择
            const levelType = StyleOptions.levelTypeIcon[data.levelType] ? StyleOptions.levelTypeIcon[data.levelType] : StyleOptions.iconDefault
            // 图标颜色
            const colorOption = StyleOptions.iconColorOption[data.levelType]
            // 字体颜色      为角色树,除角色不能点击显示灰色
            const colorText = this.hasRole && data.levelType !== StyleOptions.levelType.ROLE && StyleOptions.iconColorOption.disabled || ''
            return h(
                'span',
                [
                    h('i', { style: { color: colorOption }, class: levelType + ' icon-color' }, [' ']),
                    h('span', { style: { color: colorText }}, node.label)
                ]
            )
        },
        // 当前节点改变时
        changeTree(val) {
            const data = Object.assign({}, val)
            this.selected = val
            if (this.hasRole) { // 为角色树时
                if (data.levelType !== StyleOptions.levelType.ROLE) return // 角色树只有点击角色才emit
                data.id = Number(data.id.replace(/ROLE-/, '')) // "id":"ROLE-144" => "id":144
            }
            this.$emit('changeTree', data)
        },
        // 根据name属性过滤搜索
        filterNode(value, data) {
            if (!value) return true
            return data['title'].indexOf(value) !== -1
        }
        // // 获取当前点击节点
        // getCurrentKey() {
        //     return this.$refs.tree.getCurrentKey()
        // },
        //  // 更新子节点
        // async updateChild(id = this.getCurrentKey(), data) {
        //     if (!data) {
        //         try {
        //             data = await this.loadData(id)
        //         } catch (error) {
        //             console.warn('更新节点' + error)
        //         }
        //     }
        //     this.$refs.tree.updateKeyChildren(id, data)
        // },

        // // 更新父节点
        // async updateParent(updateId) {
        //     try {
        //         const currentKey = this.getCurrentKey()
        //         const parentId = this.$refs.tree.getCurrentNode()
        //         const id = updateId || parentId && parentId.parentId || this.defaultId
        //         if (id === this.defaultId) {
        //             await this.loadData().catch(e => console.warn(`刷新根节点  ${e}`))
        //             return
        //         }
        //         const data = await this.loadData(id)
        //         this.updateChild(id, data)
        //         this.defaultExpanded = [currentKey]
        //     } catch (error) {
        //         console.warn(`更新父节点出错${error}`)
        //     }
        // },
    }
}
</script>
<style scoped>
.treeContainer {
    overflow-y: auto;
}
.custom-tree-node {
    /* flex: 1; */
    /* display: flex; */
    /* align-items: center; */
    /* justify-content: space-between; */
    /* font-size: 14px; */
    /* padding-right: 8px;*/
  }
/* .tree-icon{
    margin-right: 15px;
} */
.icon-color{}
</style>


