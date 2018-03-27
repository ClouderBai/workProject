/*
 * @Author: LiuJunTing 
 * @Date: 2018-03-21 09:30:39 
 * @Last Modified by: LiuJunTing
 * @Last Modified time: 2018-03-23 15:47:23
 */

/**
|--------------------------------------------------
|
|  用于选择表单的表单列表
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
*/

/*
    方法
    @method search(Object) 刷新列表数据
        (1) name  搜索的name
            code  搜索的code
 */
<template>
    <div>
        <el-table v-loading="loading" :data="data" row-key="key" :type="type" style="cursor:pointer;" highlight-current-row @row-click="rowClick" border stripe :height="height">
            <el-table-column :type="type" v-if="type" width="55" align="center">
            </el-table-column>
            <el-table-column prop="code" label="编码" align="center"></el-table-column>
            <el-table-column prop="name" label="名称" align="center"></el-table-column>
            <el-table-column prop="version" label="版本" align="center"></el-table-column>
            <el-table-column prop="createUserName" label="发布人" align="center"></el-table-column>
            <el-table-column prop="createDt" label="发布时间" align="center">
                <template slot-scope="scope">
                    <span>{{scope.row.createDt | dateTimeFormat}}</span>
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
    fetchEnabledForm
} from '@/api/form'

export default {
    name: 'form-table',
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
            srcData: [],
            targetData: {},
            total: 0, // 表格数据总条数
            pageNo: 1, // 分页页码
            pageSize: 15, // 分页每页条数
            pageSizes: [15, 25, 35, 50, 100], // 分页每页条数变化
            filter: '' // 搜索value
        }
    },

    watch: {
        targetData() {
            if (!this.targetData) {
                this.$emit('row-click', {})
            }
        }
    },
    mounted() {
        this.init()
    },
    methods: {
        init() {
            this.getList()
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
                    pageSize: this.pageSize
                }
                const res = await fetchEnabledForm(params)
                this.targetData = {}
                this.selectedData = []
                this.data = res.entities
                this.srcData = res.entities
                this.total = res.entityCount
            } catch (error) {
                console.warn(`获取表单列表Error:${JSON.stringify(error)}`)
                this.$message.error('获取表单失败')
            } finally {
                this.loading = false
            }
        },

        // 搜索列表
        async search({ name, code }) {
            if (!name && !code) this.data = this.srcData
            if (name && !code) this.data = this.srcData.filter(v => v.name.includes(name))
            if (code && !name) this.data = this.srcData.filter(v => v.code.includes(code))
            if (code && name) this.data = this.srcData.filter(v => v.name.includes(name)).filter(v => v.code.includes(code))
        },

        // 监听分页页码
        handleCurrentChange(no) {
            this.pageNo = no
            const params = {
                filter: this.filter
            }
            this.refreshList(params)
        },

        // 监听分页条数
        handleSizeChange(size) {
            this.pageSize = size
            const params = {
                filter: this.filter
            }
            this.refreshList(params)
        }
    }
}
</script>