/*
 * @Author: BaiChong 
 * @Date: 2018-01-26 15:06:47 
 * @Last Modified by: BAICHONG
 * @Last Modified time: 2018-03-20 10:00:52
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
 *      updateParent  更新当前选中节点父节点  无选中刷新根节   传参数刷新id节点的节点
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
 *
 */


<template>
    <div 
        :style="{height: heightData,width:widthData}" 
        class="treeContainer" 
        v-loading="loading">
        <el-tree 
            v-show="treeVisible"
            :data="data" 
            :default-expanded-keys="defaultExpanded" 
            @current-change="changeTree" 
            lazy
            :load="lazyLoad" 
            node-key="id"
            :render-content="renderContent"
            ref="tree" 
            highlight-current 
            :props="defaultProps">
        </el-tree>
        <!-- render-after-expand="false"  @node-expand="nodeExpand"-->
        <el-tree
            v-show="!treeVisible"
            :data="searchedData"
            ref="searchTree"
            node-key="id"
            highlight-current 
            :props="defaultPropsSearch"
            @current-change="changeTree"
            >
        </el-tree>
        <!-- <el-button size="mini" type="primary" @click="abc">测试默认选中</el-button> -->
    </div>
</template>
<script>
import { fetchOrgTreeByParentId, fetchTOrgByName } from '@/api/org'

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
    created() {
        this.treeId = this.defaultId
    },
    computed: {
        heightData() {
            return `${this.height}px`
        }
    },
    mounted() {},
    data() {
        return {
            data: [],
            selected: {},
            defaultProps: {
                label: 'title',
                children: 'children',
                isLeaf: (data, node) => !data.hasChild
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
            levelTypeOpt: { // 图标选择
                'JITUAN': 'bimicon-home_light', // 集团
                'GONGSI': 'bimicon-file', // 公司
                'BUMEN': 'bimicon-friendfill', // 部门
                'GANGWEI': 'bimicon-peoplelist' // 岗位
            },
            levelTypeOptDefault: 'bimicon-attentionforbid', // 无配置选项,默认值
            colorOpt: {
                'GANGWEI': 'red' // 公司图标颜色
            }
        }
    },
    watch: {
    },
    methods: {
        abc() {
            this.$refs.tree.setCurrentKey(1)
        },
        // 树懒加载callback
        lazyLoad(node, resolve) {
            this.loading = true
            if (node.data && node.data.id) {
                this.treeId = node.data.id
            }
            this.loadData(this.treeId)
                .then(res => {
                    resolve(res)
                    return res
                })
                .then(res => {
                    // 默认选中状态
                    if (!this.$refs.tree.getCurrentKey() && res.length > 0) {
                        const [data] = res
                        const { id } = data
                        this.$refs.tree.setCurrentKey(id)
                        this.changeTree(data)
                        this.selected = data
                    }
                })
                .catch(err => console.warn('树懒加载' + err))
                .finally(() => (this.loading = false))
        },

        // 获取树数据
        async loadData(id = this.defaultId) {
            try {
                return await fetchOrgTreeByParentId(id)
            } catch (error) {
                console.warn('获取树数据' + error)
            }
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
        changeTree(val) {
            this.$emit('changeTree', val)
        },

        renderContent(h, { node, data, store }) {
            const levelType = this.levelTypeOpt[data.levelType] ? this.levelTypeOpt[data.levelType] : this.levelTypeOptDefault
            const color = this.colorOpt[data.levelType]
            return h(
                'span',
                [
                    h('i', { style: { color }, class: levelType + ' icon-color' }, [' ']),
                    h('span', {}, node.label)
                ]
            )
        },

        // ==========================================
        // 树搜索功能
        search(val) {
            if (!val) { this.treeVisible = true; !this.$refs.tree.getCurrentKey() && this.changeTree(this.selected); return }
            if (val) this.treeVisible = false
            if (this.loading) return
            // try {
            this.loading = true
            //     this.searchedData = await fetchTOrgByName(val)
            // } catch (error) {
            //     this.$message.error(`树搜索错误: ${error}`)
            // } finally {
            //     this.loading = false
            //     this.$nextTick(() => { // 搜索树默认选中
            //         if (this.searchedData.length > 0) {
            //             const [data] = this.searchedData
            //             const { id } = data
            //             this.$refs.searchTree.setCurrentKey(id)
            //             this.searchedSelected = data
            //             this.changeTree(data)
            //         }
            //     })
            // }
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
                        this.searchedSelected = data
                        this.changeTree(data)
                    }
                })
                .catch(e => this.$message.error(`树搜索错误: ${e}`))
                .finally(() => (this.loading = false))
        },

        //
        nodeExpand(data, node, tree) {
            console.log('%c%s', 'color:red', 'data  : ', data)
            console.log('%c%s', 'color:red', 'node  : ', node)
            console.log('%c%s', 'color:red', 'tree  : ', tree)
            return true
        }
    }
}
</script>
<style scoped>
.treeContainer {
    overflow-y: auto;
}
</style>


