/*
 * @Author: LiuJunTing
 * @Date: 2018-01-31 14:53:36 
 * @Last Modified by: LiuJunTing
 * @Last Modified time: 2018-03-20 17:00:11
 */

/**
|--------------------------------------------------
|
|  组织用户列表
|
|--------------------------------------------------
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
        该值如果为true 表格不显示所属公司和用户排序

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
*/

/*
    方法
    @method refreshList(*Object) 刷新列表数据
        (1) *orgId  组织id
            expand  是否查询组织子级下人员  默认为true
            filter  搜索的value
    
    @method clear() 清空列表数据

    @method remove(Number) 删除点击选中的元素
        (1) uid 要删除的用户id  不传默认为选中用户的id
 */
<template>
    <div>
        <el-table v-loading="loading" id="org-user-table" :data="data" row-key="key" :type="type" style="cursor:pointer;" highlight-current-row @row-click="rowClick" @selection-change="checkedChange" border stripe :height="height">
            <el-table-column :type="type" v-if="type" width="55" align="center">
            </el-table-column>
            <el-table-column prop="name" label="姓名" align="center"></el-table-column>
            <el-table-column prop="mobile" label="手机号" align="center" width="120"></el-table-column>
            <el-table-column label="性别" align="center">
                <template slot-scope="scope">
                    <span>{{scope.row&&scope.row.gender | gender}}</span>
                </template>
            </el-table-column>
            <el-table-column label="是否批准" align="center">
                <template slot-scope="scope">
                    <span>{{scope.row&&scope.row.approvalStatus?'是':'否'}}</span>
                </template>
            </el-table-column>
            <el-table-column label="是否可用" align="center">
                <template slot-scope="scope">
                    <span>{{scope.row&&scope.row.enable?'是':'否'}}</span>
                </template>
            </el-table-column>
            <el-table-column prop="registerDt" label="注册日期" align="center"></el-table-column>
            <el-table-column prop="enterDt" label="进入日期" align="center"></el-table-column>
            <el-table-column prop="orgName" label="所属公司" align="center" width="300" v-if="!mini"></el-table-column>
            <el-table-column prop="order" label="用户排序" align="center" v-if="!mini"></el-table-column>
            <el-table-column align="center" label="拖拽" width="80" v-if="draggable">
                <template slot-scope="scope">
                    <svg-icon class='drag-handler' icon-class="drag"></svg-icon>
                </template>
            </el-table-column>
        </el-table>
        <!-- 分页开始 -->
        <el-col :span="24" class="mt20">
            <div class="mb20">
                <el-pagination background class="pagebtn" background @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="pageNo" :page-size="pageSize" :page-sizes="pageSizes" :total="total" layout="total, sizes, prev, pager, next, jumper">
                </el-pagination>
            </div>
        </el-col>
        <!-- 分页结束 -->
    </div>
</template>

<script>
import {
    fetchUserListByOrgId,
    searchUserList,
    deleteOrgUser,
    updateUserOrders
} from '@/api/user' // 请求方法
import Sortable from 'sortablejs'

export default {
    name: 'roleUserTable',
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
            filter: '', // 搜索value
            orgId: '', // 组织id
            expand: true // 是否查询组织子级人员
        }
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
    mounted() {
        if (this.draggable) {
            this.createSortable()
        }
    },
    methods: {
        // 创建拖拽
        createSortable() {
            const el = document.querySelectorAll('#org-user-table tbody')[0]
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

        async updateOrders() {
            const params = []
            this.data.forEach(v => {
                params.push({
                    order: v.order,
                    userId: v.id,
                    orgId: v.orgId
                })
            })
            try {
                this.$store.commit('SHOW_WAITING')
                await updateUserOrders(params)
                this.$message.success('更新排序成功')
            } catch (error) {
                console.error(`更新用户排序异常${JSON.stringify(error)}`)
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
        refreshList({ orgId, expand = true, filter }) {
            if (!orgId) {
                this.$message.warning('请先选择组织')
                return
            }
            this.orgId = orgId
            this.filter = filter
            this.expand = expand
            if (this.filter) {
                this.search()
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

        // 提供给外部的删除元素方法
        async remove({ uId, orgId } = { uId: null, orgId: null }) {
            const id = uId || this.targetData.id || null
            const oId = orgId || this.orgId || null
            if (!oId) {
                this.$message.warning('请选择组织')
                return
            }
            if (!id) {
                this.$message.warning('请选择要删除的用户')
                return
            }
            try {
                await this.$confirm('此操作将删除所选用户, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    confirmButtonClass: 'ljt-btn primary-btn',
                    cancelButtonClass: 'ljt-btn tiffany-btn',
                    type: 'warning'
                })
                const parameters = {
                    uId: id,
                    orgId: oId
                }
                try {
                    await deleteOrgUser(parameters)
                    this.$message({ type: 'success', message: '删除成功' })
                    const params = {
                        orgId: this.orgId,
                        expand: this.expand,
                        filter: this.filter
                    }
                    this.refreshList(params)
                } catch (error) {
                    console.warn(`删除用户列表Error:${JSON.stringify(error)}`)
                    this.$message.error(error.message)
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
                    pageNo: this.pageNo,
                    pageSize: this.pageSize,
                    orgId: this.orgId,
                    expand: this.expand
                }
                const res = await fetchUserListByOrgId(params)
                this.targetData = {}
                this.selectedData = []
                this.data = res.entities
                this.total = res.entityCount
            } catch (error) {
                console.warn(`获取组织用户列表Error:${JSON.stringify(error)}`)
                this.$message.error('获取列表失败')
            } finally {
                this.loading = false
            }
        },

        // 搜索角色列表
        async search() {
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
                    pageNo: this.pageNo,
                    pageSize: this.pageSize,
                    orgId: this.orgId,
                    expand: this.expand,
                    filter: this.filter
                }
                const res = await searchUserList(params)
                this.targetData = {}
                this.selectedData = []
                this.data = res.entities
                this.total = res.entityCount
            } catch (error) {
                console.warn(`搜索组织用户列表Error:${JSON.stringify(error)}`)
                this.$message.error('获取列表失败')
            } finally {
                this.loading = false
            }
        },

        // 监听分页页码
        handleCurrentChange(no) {
            this.pageNo = no
            const params = {
                orgId: this.orgId,
                expand: this.expand,
                filter: this.filter
            }
            this.refreshList(params)
        },

        // 监听分页条数
        handleSizeChange(size) {
            this.pageSize = size
            const params = {
                orgId: this.orgId,
                expand: this.expand,
                filter: this.filter
            }
            this.refreshList(params)
        }
    }
}
</script>