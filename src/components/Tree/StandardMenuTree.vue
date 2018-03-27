/*
 * @Author: BAICHONG 
 * @Date: 2018-03-12 11:22:37 
 * @Last Modified by: BAICHONG
 * @Last Modified time: 2018-03-27 09:56:33
 */
 /**
|--------------------------------------------------
| 非懒加载树: 
|       标准菜单管理树
|           1.checkBox: false
|--------------------------------------------------
*/
<template>
    <div 
        :style="{height: heightData,width:widthData}" 
        class="treeContainer" 
        v-loading="loading">
        <!-- 搜索 -->
        <el-form ref="form" :model="searchFormData" @submit.native.prevent v-if="showSearch">
            <el-input clearable class="el-input-primary" placeholder="请输入搜索内容" v-model="searchFormData.orgSearchValue"/>
        </el-form>
        <!-- 树 -->
        <el-tree 
            :data="data"
            :default-expanded-keys="defaultExpanded" 
            @current-change="treeChange" 
            node-key="id"
            default-expand-all
            :render-content="renderContent"
            ref="tree" 
            :filter-node-method="filterNode"
            highlight-current 
            :expand-on-click-node="false"
            :props="defaultProps">
        </el-tree>
        <!-- <el-button @click="test">test</el-button> -->
        <!-- <el-button @click="test1">test1</el-button> -->
    </div>
</template>
<script>
import { fetchAllStandardMenuList } from '@/api/standardMenu'
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
        showSearch: {
            type: Boolean,
            default: true
        }
    },
    created() {
        this.treeId = this.defaultId
    },
    watch: {
        'searchFormData.orgSearchValue': {
            handler(val) {
                this.$refs.tree.filter(val)
            },
            deep: true
        }
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
                label: 'name',
                children: 'children',
                isLeaf: data => !data.hasChild
            },
            treeId: undefined,
            defaultExpanded: [], // 默认展开的数组集合
            loading: false,
            searchFormData: { orgSearchValue: '' },
            // ===============render================================
            iconDefaulte: 'bimicon-attentionforbid'// 无配置选项,默认值

        }
    },
    mounted() {
        this.loadData()
    },
    methods: {
        reSetTree(data) {
            const treeD = this.$refs.tree.getCurrentNode()
            for (const key in treeD) {
                if (key === 'children') continue
                treeD[key] = data[key]
            }
            console.log('%c%s', 'color:red;font-size:20px', 'da  : ', (this.$refs.tree.getCurrentNode()))
        },
        // 获取树数据
        loadData() {
            this.loading = true
            fetchAllStandardMenuList()
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
                    }
                })
                .catch(e => void console.warn(`获取树数据: ${e}`))
                .finally(() => (this.loading = false))
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

        // 根据name属性过滤搜索
        filterNode(value, data) {
            if (!value) return true
            return data['name'].indexOf(value) !== -1
        },

        // 添加根节点
        insertAfter(data, id) {
            // this.$refs.tree.insertAfter(data, id)
            this.data.push(data)
        },

        // 在指定id下创建子节点
        append(data, parentId) {
            this.$refs.tree.append(data, parentId)
        },

        // 移除节点
        remove(id = this.selected.id) {
            if (!id) {
                this.$message.warning('请选择节点')
                return
            }
            if (!this.$resf.tree.getNode(id).isLeaf) { // 不是叶子节点
                this.$message.warning(`存在子节点,无法删除`)
                return
            }
            this.$refs.tree.remove(id)
        }
    }
}
</script>
<style scoped>
.treeContainer {
    overflow-y: auto;
}
</style>


