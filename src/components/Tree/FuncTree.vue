/*
 * @Author: zhanglianhao 
 * @Date: 2018-03-09 18:00:37 
 * @Last Modified by: zhanglianhao
 * @Last Modified time: 2018-03-20 13:29:09
 */
 /**
|--------------------------------------------------
| 非懒加载树
| 功能模块树
|   chooseFunction {属性}  加上属性,树只能选择功能,点击功能模块不会触发点击事件
|--------------------------------------------------
*/

<template>
    <div 
        :style="{width:widthData}" 
        class="treeContainer" 
        v-loading="loading">
        <!-- search-start -->
        <el-form ref="form" :model="searchForm" @submit.native.prevent style="margin-bottom:20px;">
            <el-input clearable class="el-input-primary" placeholder="请输入搜索内容" v-model="searchForm.key"/>
        </el-form>
        <!-- search-end -->
        <el-tree 
            :data="data"
            :default-expanded-keys="defaultExpanded" 
            @current-change="treeChange" 
            node-key="id"
            :render-content="renderContent"
            :filter-node-method="filterNode"
            ref="tree" 
            highlight-current 
            :props="defaultProps">
        </el-tree>
    </div>
</template>
<script>
import { fetchAllFuncCategoryList } from '@/api/funcModule'
export default {
    props: {
        widthData: {
            type: String,
            default: '100%'
        },
        chooseFunction: {
            type: Boolean,
            default: false
        }
    },
    watch: {
        'searchForm.key': {
            handler(val) {
                this.$refs.tree.filter(val)
            },
            deep: true

        }
    },
    data() {
        return {
            data: [],
            selected: {},
            defaultProps: {
                label: 'name',
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
            searchedSelected: {},
            loading: false,
            oldVal: '',
            // ===============render============
            funType: { // 图标选择
                'FunctionCategory': 'bimicon-home_light', // 模块
                'Function': 'bimicon-file' // 功能
            },
            funcTypeDefault: 'bimicon-attentionforbid', // 无配置选项,默认值
            colorOpt: {
                'FunctionCategory': 'red' // 模块图标颜色
            },
            searchForm: {
                key: ''
            },
            textColor: {
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
            fetchAllFuncCategoryList()
                .then(res => {
                    this.data = res
                    return res
                })
                .then(res => {
                    if (!this.$refs.tree.getCurrentKey() && res.length > 0) {
                        const [data] = res
                        const { id } = data
                        this.$refs['tree'].setCurrentKey(id)
                        this.treeChange(data)
                    }
                })
                .catch(e => void console.warn(`获取树数据: ${e}`))
                .finally(() => (this.loading = false))
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
        // 当前节点改变时
        treeChange(val) {
            this.selected = val
            // chooseFunction为true时只选择功能模块
            if (this.chooseFunction) {
                if (val.moduleType === 'Function') {
                    this.$emit('treeChange', val)
                }
            } else {
                this.$emit('treeChange', val)
            }
        },
        // 自定义树节点
        renderContent(h, { node, data, store }) {
            const levelType = this.funType[data.moduleType] ? this.funType[data.moduleType] : this.funcTypeDefault
            const color = this.colorOpt[data.levelType]
            const textColor = this.chooseFunction && data.moduleType !== 'Function' ? this.textColor['disabled'] : ''
            return h(
                'span',
                [
                    h('i', { style: { color }, class: levelType + ' icon-color' }, [' ']),
                    h('span', { style: { color: textColor }}, node.label)
                ]
            )
        },
        // 搜索树过滤节点
        filterNode(value, data) {
            if (!value) return true
            return data['name'].indexOf(value) !== -1
        },
        // 在指定id后插入节点
        insertAfter(data, id) {
            this.$refs.tree.insertAfter(data, id)
        },
        // 在指定id下创建子节点
        append(data, parentId) {
            this.$refs.tree.append(data, parentId)
        },
        // 移除节点
        remove() {
            if (!this.selected.id) {
                this.$message.warning('请选择节点')
                return
            }
            this.$refs.tree.remove(this.selected.id)
        },
        // 刷新树
        refresh(data) {
            this.data = data
        }
    }
}
</script>
<style scoped>
.treeContainer {
    overflow-y: auto;
    height: 100%;
}
</style>


