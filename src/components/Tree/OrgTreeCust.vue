/*
 * @Author: BAICHONG 
 * @Date: 2018-03-09 18:02:02 
 * @Last Modified by: BAICHONG
 * @Last Modified time: 2018-03-20 16:28:20
 */
/**
|--------------------------------------------------
| 自定义树:  树模块
|         1. 系统管理 -> 菜单管理: 组织树结构   参数:Options.MENU.ORG
| 
| 
|--------------------------------------------------
*/
<template>
    <div 
        :style="{height: heightData,width:widthData}" 
        class="treeContainer" 
        v-loading="loading">
        <el-tree 
            :data="data" 
            :default-expanded-keys="defaultExpanded" 
            @current-change="treeChange" 
            node-key="id"
            :render-content="renderContent"
            ref="tree" 
            highlight-current 
            :props="defaultProps">
        </el-tree>
    </div>
</template>
<script>
// import { fetchStandardMenuList } from '@/api/standardMenu'
import { fetchOrgTree } from '@/api/org'
import Options from './Options'
// // 自定义菜单
// MENU_ORG: 'MENU_ORG',

// // 自定义角色
// ROLE_ORG: 'ROLE_ORG',

// // 自定义权限
// ACTION_ORG: 'ACTION_ORG',

// // 角色用户管理
// USER_ROLE_ORG: 'USER_ROLE_ORG'

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
        },
        filter: {
            type: String,
            default: Options.MENU_ORG
        }
    },
    created() {
        this.treeId = this.defaultId
    },
    computed: {
        heightData() {
            return `${this.height}px`
        }
    },
    data() {
        return {
            data: [],
            selected: {},
            defaultProps: {
                label: 'title',
                children: 'children',
                isLeaf: data => !data.hasChild
            },
            treeId: undefined,
            defaultExpanded: [], // 默认展开的数组集合
            // ========== 搜索树相关 ==============
            defaultPropsSearch: {
                label: 'fullName',
                children: 'hasChild'
            },
            searchedData: [],
            searchedSelected: {},
            treeVisible: true,
            loading: false,
            oldVal: '',
            // ===============render============
            funType: { // 图标选择
                'FunctionCategory': 'bimicon-home_light', // 模块
                'Function': 'bimicon-file' // 功能
            },
            levelTypeOptDefault: 'bimicon-attentionforbid', // 无配置选项,默认值
            levelTypeOpt: { // 图标选择
                'JITUAN': 'bimicon-home_light', // 集团
                'GONGSI': 'bimicon-file', // 公司
                'GANGWEI': 'bimicon-peoplelist', // 岗位
                'BUMEN': 'bimicon-friendfill', // 部门
                'ROLE': 'bimicon-my_fill_light'
            },
            colorOpt: {
                'GANGWEI': 'red', // 公司图标颜色
                'ROLE': 'skyblue' // 角色图标颜色
            },
            colorText: {
                'disabled': '#aaa' // 颜色disabled灰度
            }
        }
    },
    mounted() {
        this.loadData()
    },
    methods: {
        // 获取树数据
        loadData() {
            this.loading = true
            fetchOrgTree(this.filter)
                .then(res => {
                    this.data = res
                    return res
                })
                .then(res => {
                    if (!this.$refs.tree.getCurrentKey() && res.length > 0) {
                        const [data] = res
                        const { id } = data
                        this.$refs.tree.setCurrentKey(id)
                        this.treeChange(data)
                        this.loading = false
                    }
                })
                .catch(e => void console.warn(`获取树数据: ${e}`))
        },
        // 自定义树节点
        renderContent(h, { node, data, store }) {
            const levelType = this.levelTypeOpt[data.levelType] ? this.levelTypeOpt[data.levelType] : this.levelTypeOptDefault
            const color = this.colorOpt[data.levelType]
            return h(
                'span',
                [
                    h('i', { style: { color }, class: levelType }, [' ']),
                    h('span', {}, node.label)
                ]
            )
        },
        // 更新子节点
        async updateChild(id = this.getCurrentKey(), data) {
            if (!data) {
                try {
                    data = await this.loadData(id)
                } catch (error) {
                    console.warn('更新节点' + error)
                }
            }
            this.$refs.tree.updateKeyChildren(id, data)
        },
        // 获取当前点击节点
        getCurrentKey() {
            return this.$refs.tree.getCurrentKey()
        },
        // 更新父节点
        async updateParent(updateId) {
            try {
                const currentKey = this.getCurrentKey()
                const parentId = this.$refs.tree.getCurrentNode()
                const id = updateId || parentId && parentId.parentId || this.defaultId
                if (id === this.defaultId) {
                    await this.loadData().catch(e => console.warn('刷新根节点' + e))
                    return
                }
                const data = await this.loadData(id)
                this.updateChild(id, data)
                this.defaultExpanded = [currentKey]
            } catch (error) {
                console.warn(`更新父节点出错${error}`)
            }
        },
        // 当前节点改变时
        treeChange(val) {
            this.$emit('treeChange', val)
        },

        // 树搜索功能
        search(val) {
            if (!val) { this.treeVisible = true; !this.$refs.tree.getCurrentKey() && this.treeChange(this.selected); return }
            if (val) this.treeVisible = false
            if (this.loading) return
            this.loading = true
        }
    }
}
</script>
<style scoped>
.treeContainer {
    overflow-y: auto;
}
</style>


