/*
 * @Author: zhanglianhao 
 * @Date: 2018-03-09 18:00:37 
 * @Last Modified by: zhanglianhao
 * @Last Modified time: 2018-03-27 13:51:46
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
import StyleOption from './TreeStyleOptions'
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
            loading: false,
            searchForm: {
                key: ''
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
            const levelType = StyleOption.funType[data.moduleType] ? StyleOption.funType[data.moduleType] : StyleOption.iconDefault
            return h(
                'span',
                [
                    h('i', { class: levelType }, [' ']),
                    h('span', {}, node.label)
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
            this.data.push(data)
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


