/*
 * @Author: LiuJunTing 
 * @Date: 2018-01-30 09:35:36 
 * @Last Modified by: LiuJunTing
 * @Last Modified time: 2018-03-20 17:42:11
 */

/* 
    属性
    @prop type
    @type String
    @default ''
        selection  多选框
        index      序号
        expand     展开

    @prop mini 
    @type Boolean
    @default false
        该值如果为true 表格只展示编码和角色名 分页无page设置 电梯

    @prop height
    @type Number
    @default 700
        表格高度 

    @prop draggable
    @type Boolean
    @default false
        该值为true开启表格拖拽排序
*/

/*
    事件
    @event row-click 点击行时触发
    @return 选中数据对象

    @event selection-change 多选改变时触发
    @return 选中数据集合

    @event get-list 获取列表数据时触发
    @return 获取的列表数据
*/

/*
    方法
    @method refreshList(*Object) 刷新列表数据
        (1) *orgId  组织id
            filter  搜索的value
    
    @method insert(*Object) 在列表最后插入元素
        (1) 要插入的元素  可以是普通对象  也可以是Role对象

    @method clear() 清空列表数据

    @method remove() 删除点击选中的元素
 */
<template>
    <div>
        <el-table id="role-table" :data="data" ref="table" style="width: 100%;cursor:pointer;" stripe border highlight-current-row @selection-change="checkedChange" @row-click="rowClick" v-loading="loading" :height="height" row-key="id">
            <el-table-column :type="type" v-if="type && !mini" width="55">
            </el-table-column>
            <el-table-column label="id" prop="id" width="55" align="center" v-if="!mini">
            </el-table-column>
            <el-table-column label="编码" prop="code" align="center">
            </el-table-column>
            <el-table-column label="角色名" prop="name" align="center">
            </el-table-column>
            <el-table-column label="描述" prop="desc" align="center" v-if="!mini">
            </el-table-column>
            <el-table-column label="排序号" prop="order" align="center" v-if="!mini">
            </el-table-column>
            <el-table-column label="是否可用" prop="valid" align="center" v-if="!mini">
                <template slot-scope="scope">
                    <span>{{scope.row.valid?'是':'否'}}</span>
                </template>
            </el-table-column>
            <el-table-column align="center" label="拖拽" width="80" v-if="draggable">
                <template slot-scope="scope">
                    <svg-icon class='drag-handler' icon-class="drag"></svg-icon>
                </template>
            </el-table-column>
        </el-table>
        <!-- 分页开始 -->
        <el-col :span="24" class="mt20 mb20">
            <el-pagination background @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="pageNo" :page-size="pageSize" :page-sizes="pageSizes" :layout="layoutOption" :total="total">
            </el-pagination>
        </el-col>
        <!-- 分页结束 -->
    </div>
</template>

<script>
import {
    fetchRoleList,
    searchRolesList,
    deleteRole,
    updateRoleOrders
} from '@/api/userAccess' // 请求方法
import Role from '@/model/Role'
import Sortable from 'sortablejs'

export default {
    name: 'roleTable',
    props: {
        type: {
            type: String,
            default: ''
        },
        mini: {
            default: false
        },
        height: {
            default: 700
        },
        draggable: {
            default: false
        }
    },
    computed: {
        layoutOption() {
            if (this.mini) {
                return 'total, prev, pager, next'
            } else {
                return 'total, sizes, prev, pager, next, jumper'
            }
        }
    },
    data() {
        return {
            loading: false,
            data: [],
            selectedData: [],
            targetData: {},
            total: 0, // 表格数据总条数
            pageNo: 1, // 分页页码
            pageSize: 15, // 分页每页条数
            pageSizes: [15, 25, 35, 50, 100], // 分页每页条数变化
            searchValue: '',
            orgId: null
        }
    },

    mounted() {
        this.init()
    },

    watch: {
        selectedData() {
            if (this.selectedData.length === 0) {
                this.$emit('selection-change', this.selectedData)
            }
        },
        targetData() {
            if (!this.targetData) {
                this.$emit('row-click', {})
            }
        }
    },

    methods: {
        init() {
            if (this.draggable) {
                this.createSortable()
            }
        },

        // 创建拖拽
        createSortable() {
            const el = document.querySelectorAll('#role-table tbody')[0]
            Sortable.create(el, {
                onEnd: this.endFunc
            })
        },

        // 拖拽结束回调
        async endFunc(e) {
            if (e.oldIndex === e.newIndex) return
            // 保存初始数据  用来点击取消时还原
            const beBackData = this.data
            try {
                await this.$confirm('确定改变列表排序么', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    confirmButtonClass: 'ljt-btn primary-btn',
                    cancelButtonClass: 'ljt-btn tiffany-btn',
                    type: 'warning'
                })
                // 保存初始order排序  用来拖拽后重新给order赋值
                const orderList = this.data.map(v => v.order)
                const targetRow = this.data.splice(e.oldIndex, 1)[0]
                this.data.splice(e.newIndex, 0, targetRow)
                // 重新给order赋值
                this.data.map((v, index) => {
                    v.order = orderList[index]
                    return v
                })
                this.updateOrders()
            } catch (error) {
                this.data = []
                this.$nextTick(() => (this.data = beBackData))
            }
        },

        // 更新排序
        async updateOrders() {
            const params = []
            this.data.forEach(v => {
                params.push({
                    order: v.order,
                    id: v.id
                })
            })
            try {
                this.$store.commit('SHOW_WAITING')
                await updateRoleOrders(params)
                this.$message.success('更新排序成功')
            } catch (error) {
                console.error(`更新角色排序异常${JSON.stringify(error)}`)
                this.$message.error('更新排序失败')
            } finally {
                this.$store.commit('CLOSE_WAITING')
            }
        },

        // 表格checked事件
        checkedChange(selected) {
            this.selectedData = selected
            this.$emit('selection-change', selected)
        },

        // 表格选中行事件
        rowClick(target) {
            this.targetData = target
            this.$emit('row-click', target)
        },

        // 提供给外部的刷新列表方法
        refreshList({ orgId, filter }) {
            if (!orgId) return this.$message.warning('请先选择组织')
            this.orgId = orgId
            this.searchValue = filter
            if (filter) {
                this.search(filter)
            } else {
                this.getList()
            }
        },

        // 清空列表数据
        clear() {
            this.data = []
            this.$emit('row-click', {})
            this.$emit('selection-change', [])
        },

        // 提供给外部的set元素方法
        insert(item) {
            if (!(item instanceof Role)) {
                item = new Role().init(item)
            }
            this.data.push(item)
        },

        // 提供给外部的删除元素方法
        async remove(selectedData = this.selectedData) {
            if (selectedData.length === 0) {
                this.$message.warning('请选择要删除的角色')
                return
            }
            try {
                await this.$confirm('此操作将删除所选角色, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    confirmButtonClass: 'ljt-btn primary-btn',
                    cancelButtonClass: 'ljt-btn tiffany-btn',
                    type: 'warning'
                })
                try {
                    const roleCodes = selectedData
                        .map(v => v.code)
                        .join()
                    const params = {
                        orgId: this.orgId,
                        roleCodes
                    }
                    await deleteRole(params)
                    this.$message({ type: 'success', message: '删除成功' })
                    this.refreshList({ orgId: this.orgId, filter: this.searchValue })
                } catch (error) {
                    console.warn(`删除角色用户异常${JSON.stringify(error)}`)
                    this.$message.error(`${error.message || '删除失败'}`)
                }
            } catch (error) {} // eslint-disable-line
        },

        // 获取列表数据
        async getList() {
            if (this.loading) {
                this.$message({
                    type: 'warning',
                    message: '请耐心等待列表获取'
                })
                return
            }
            this.loading = true
            try {
                const params = {
                    orgId: this.orgId,
                    pageNo: this.pageNo,
                    pageSize: this.pageSize
                }
                const res = await fetchRoleList(params)
                this.$emit('get-list', res.entities)
                this.targetData = null
                this.selectedData = []
                this.data = res.entities
                this.total = res.entityCount
            } catch (error) {
                console.warn(`获取角色列表Error:${JSON.stringify(error)}`)
                this.$message.error('获取列表失败')
            } finally {
                this.loading = false
            }
        },

        // 搜索角色列表
        async search(value) {
            if (this.loading) {
                this.$message({
                    type: 'warning',
                    message: '请耐心等待搜索结果'
                })
                return
            }
            this.loading = true
            try {
                const params = {
                    orgId: this.orgId,
                    pageNo: this.pageNo,
                    pageSize: this.pageSize,
                    filter: value
                }
                const res = await searchRolesList(params)
                this.$emit('get-list', res.entities)
                this.targetData = null
                this.selectedData = []
                this.data = res.entities
                this.total = res.entityCount
            } catch (error) {
                console.warn(`搜索角色列表Error:${JSON.stringify(error)}`)
                this.$message.error('获取列表失败')
            } finally {
                this.loading = false
            }
        },

        // 监听分页页码
        handleCurrentChange(no) {
            this.pageNo = no
            this.refreshList({ orgId: this.orgId, filter: this.searchValue })
        },

        // 监听分页条数
        handleSizeChange(size) {
            this.pageSize = size
            this.refreshList({ orgId: this.orgId, filter: this.searchValue })
        }
    }
}
</script>