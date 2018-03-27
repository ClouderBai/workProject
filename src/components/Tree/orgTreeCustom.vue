/*
 * @Author: BaiChong 
 * @Date: 2018-01-26 15:06:47 
 * @Last Modified by: BAICHONG
 * @Last Modified time: 2018-03-20 18:04:26
 */
/**
|--------------------------------------------------
| 自定义树: 
|       @param{ Options.USER_ROLE_ORG }: 角色人员管理树 => 只能点击角色,其他无法点击
| 
| 
| 
| 
|--------------------------------------------------
*/
/*
 * @desc: BaiChong 
 *      :defaultId="自定义的"    // 表示数初始化节点id
 *          类型: number
 *          不传默认: 0
 *
 *      changeTree:  当选择改变时调用的方法
 *          用法: <tree changeTree="自定义事件"></tree>
 *          参数: 接收一个参数, 返回当前选中节点数据 
 *          
 *      updateChild:  更新当前选择节点子节点
 *          用法: this.$refs.自定义.updateChild()
 *
 *      updateParent  更新当前选中节点父节点  无选中刷新根节点  传递参数节点id刷新指定节点子节点
 *          用法: this.$refs.自定义.updateParent()
 *
 *      getCurrentKey:  获取当前点的树的id
 *          用法: this.$refs.自定义.getCurrentKey()
 *
 *      search: 搜索树
 *           组件上绑定搜索的内容
 *           searchText
 *              调search方法进行搜索
 *
 *       filter: 渲染树的类型,在./Options.js中选择类型,默认为MENU_ORG   类型: 参数props传入
 *       ########
            搜索树无数据,返回值为{}
 *
 */
 


<template>
    <div 
        :style="{height: heightData,width:widthData}" 
        class="treeContainer" 
        v-loading="loading">
        <el-tree 
            :data="data"
            :default-expanded-keys="defaultExpanded" 
            @current-change="changeTree"
            :renderContent='renderContent'
            node-key="id"
            ref="tree" 
            highlight-current 
            :props="defaultProps">
        </el-tree>
        <!-- <el-button @click="insertAfter" @node-expand="nodeExpand" size="mini">insertAfter</el-button> -->
    </div>
</template>
<script>
import { fetchTOrgByName, fetchOrgTree } from '@/api/org'
import Options from './Options'

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
        }
    },
    created() {
        this.treeId = this.defaultId
        this.treeType = this.filter
    },
    mounted() {
        this.init()
    },
    computed: {
        heightData() {
            return `${this.height}px`
        },
        hasRole() { // 是不是角色树
            return this.filter === Options.USER_ROLE_ORG
        }
    },
    data() {
        return {
            // filter: Options.USER_ROLE_ORG,
            // filterText: '',
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
            // ================
            defaultPropsSearch: {
                label: 'fullName',
                children: 'hasChild'
            },
            searchedData: [],
            searchedSelected: {}, // 搜索树选中数据
            treeVisible: true, // tree?显示
            loading: false,
            // oldVal: '',
            // ===========树前置图标配置============
            levelType: { // 为没有levelType的设置类型
                'ROLE': 'ROLE'
            },
            levelTypeOpt: { // 图标选择
                'JITUAN': 'bimicon-home_light', // 集团
                'GONGSI': 'bimicon-file', // 公司
                'GANGWEI': 'bimicon-peoplelist', // 岗位
                'BUMEN': 'bimicon-friendfill', // 部门
                'ROLE': 'bimicon-my_fill_light'
            },
            levelTypeOptDefault: 'bimicon-attentionforbid', // 无配置选项,默认值
            colorOpt: {
                'GANGWEI': 'red', // 公司图标颜色
                'ROLE': 'skyblue' // 角色图标颜色
            },
            colorText: {
                'disabled': '#aaa' // 颜色disabled灰度
            }

        }
    },
    // watch: {},
    methods: {
        insertAfter() {
            const data = { 'id': 500, 'title': '测试插入节点', 'hasChild': false, 'children': [] }
            this.$refs.tree.insertAfter(data, 423)
        },
        // 获取树数据
        async loadData(filter) {
            return await fetchOrgTree(this.filter).catch(e => console.warn(`获取树数据   ${e && e.message}`))
        },

        //
        init() {
            this.loading = true
            this.loadData(this.filter)
                .then(res => {
                    // console.log('%c%s', 'color:red', 'res  : ', JSON.stringify(res))
                    this.data = res
                    this.handleResponse(this.data)
                })
                // .then(() => {
                // }).then(() => {
            // if (!this.$refs.tree.getCurrentKey() && res.length > 0) {
            //     const [data] = res
            //     const { id } = data
            //     this.$refs.tree.setCurrentKey(id)
            //     this.changeTree(data)
            // }
                // })
                .catch(e => console.warn(`角色树加载失败  ${e && e.message}`))
                .finally(() => (this.loading = false))
        },

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

        handleRoleList(item) {
            const roleList = item.roleList
            if (roleList && roleList.length > 0) {
                roleList.forEach(v => {
                    v.id = `${this.levelType.ROLE}-${v.id}`
                    v.title = v.name
                    v.levelType = this.levelType.ROLE
                    v.hasChild = false
                })
                item.children = [...(item.children || []), ...roleList]
            }
        },

        // 渲染树
        renderContent(h, { node, data, store }) {
            // 图标选择
            const levelType = this.levelTypeOpt[data.levelType] ? this.levelTypeOpt[data.levelType] : this.levelTypeOptDefault
            // 图标颜色
            const colorOpt = this.colorOpt[data.levelType]
            // 字体颜色
            const colorText = this.hasRole && data.levelType !== this.levelType.ROLE && this.colorText.disabled
            return h(
                'span',
                [
                    h('i', { style: { color: colorOpt }, class: levelType + ' icon-color' }, [' ']),
                    h('span', { style: { color: colorText }}, node.label)
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
                    await this.loadData().catch(e => console.warn(`刷新根节点  ${e}`))
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
        changeTree(val) {
            const data = JSON.parse(JSON.stringify(val))
            this.selected = val
            if (this.hasRole) { // 为角色树时
                if (data.levelType !== this.levelType.ROLE) return
                data.id = Number(data.id.replace(/ROLE-/, '')) // "id":"ROLE-144" => "id":144
            } // 角色树只有点击角色才emit
            this.$emit('changeTree', data)
        },

        // ==============搜索树相关=================

        // 搜索树$emit事件
        changeSearchTree(val) {
            this.searchedSelected = val
            this.$emit('changeTree', val)
        },
        // 搜索树判断
        async search(val) {
            if (!val) { this.treeVisible = true; this.changeTree(this.selected); return }
            if (val) this.treeVisible = false
            if (this.loading) return
            this.getSearchData(val)
        },
        // 搜索树拉取数据
        getSearchData(val) {
            this.loading = true
            fetchTOrgByName(val)
                .then(res => {
                    this.searchedData = res
                    return res
                })
                .then(res => {
                    if (this.searchedData.length > 0) {
                        const [data] = this.searchedData
                        const { id } = data
                        this.$refs.searchTree.setCurrentKey(id)
                        this.changeSearchTree(data)
                    } else {
                        this.changeSearchTree({})
                    }
                })
                .catch(e => this.$message.error(`树搜索拉取数据失败`))
                .finally(() => (this.loading = false))
        }
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


