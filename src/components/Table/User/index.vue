/*
 * @Author: LiuJunTing 
 * @Date: 2018-03-12 15:30:06 
 * @Last Modified by: LiuJunTing
 * @Last Modified time: 2018-03-12 16:36:40
 */

/**
|--------------------------------------------------
|
|  用户列表
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

    @prop height
    @type Number
    @default 700
        表格高度 
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
    @method refreshList(Object) 刷新列表数据
        (1) filter  搜索的value
 */
<template>
    <div>
        <el-table v-loading="loading" :data="data" row-key="id" :type="type" style="cursor:pointer;" highlight-current-row @row-click="rowClick" @selection-change="checkedChange" border stripe :height="height">
            <el-table-column :type="type" v-if="type" width="55" align="center">
            </el-table-column>
           <el-table-column prop="name" label="姓名" align="center"></el-table-column>
            <el-table-column prop="mobile" label="电话" align="center"></el-table-column>
            <el-table-column label="性别" align="center">
                <template slot-scope="scope">
                    <span>{{scope.row.gender | gender}}</span>
                </template>
            </el-table-column>
            <el-table-column prop="orgName" label="直属部门" align="center"></el-table-column>
            <el-table-column prop="dutyName" label="职务" align="center"></el-table-column>
            <el-table-column prop="enable" label="状态" align="center">
                <template slot-scope="scope">
                    <span>{{scope.row.enable | enable}}</span>
                </template>
            </el-table-column>
            <el-table-column prop="enterDt" label="添加时间" align="center"></el-table-column>
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
    fetchUserByOrgId,
    searchUserByFilter
} from '@/api/userAccess' // 请求方法

export default {
    name: 'roleUserTable',
    props: {
        type: {
            type: String,
            default: ''
        },
        height: {
            default: 700
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
            filter: '' // 搜索value
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
        this.getList()
    },
    methods: {
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
        refreshList({ filter }) {
            this.filter = filter
            if (this.filter) {
                this.search()
            } else {
                this.getList()
            }
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
                    orgId: -1,
                    expand: true
                }
                const res = await fetchUserByOrgId(params)
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
                    orgId: -1,
                    expand: true,
                    filter: this.filter
                }
                const res = await searchUserByFilter(params)
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