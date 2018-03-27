/*
 * @Author: LiuJunTing 
 * @Date: 2018-01-31 14:53:36 
 * @Last Modified by: LiuJunTing
 * @Last Modified time: 2018-03-20 17:39:00
 */

/**
|--------------------------------------------------
|
|  角色用户列表
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
    @method refreshList(*String,String) 刷新列表数据
        (1) 角色code
        (2) 搜索值
    
    @method insert(*Object) 在列表最后插入元素
        (1) 要插入的元素  可以是普通对象  也可以是Role对象

    @method clear() 清空列表数据
    
    @method remove(Array) 删除点击选中的元素
        (1) selectedData  要删除的用户多选集合  不传默认删除check-box选中的用户
 */
<template>
    <div class="tablelist">
        <el-table v-loading="loading" :data="data" :type="type" ref="singleTable" highlight-current-row @selection-change="selectionChange" @row-click="rowClick" border stripe style="width: 100%;cursor:pointer;" :height="height">
            <el-table-column :type="type" v-if="type" width="55">
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
        <el-col :span="24" class="mt20 mb20">
            <el-pagination background @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="pageNo" :page-size="pageSize" :page-sizes="pageSizes" layout="total, sizes, prev, pager, next, jumper" :total="total">
            </el-pagination>
        </el-col>
        <!-- 分页结束 -->
    </div>
</template>

<script>
import {
    fetchRoleUserList,
    searchRoleUserList,
    deleteRoleUser
} from '@/api/userAccess' // 请求方法

import OrgUser from '@/model/OrgUser'

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
            searchValue: '',
            roleCode: ''
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

    methods: {
        // 表格checked事件
        selectionChange(selected) {
            this.selectedData = selected
            this.$emit('selection-change', selected)
        },

        // 表格选中行事件
        rowClick(target) {
            this.targetData = target
            this.$emit('row-click', target)
        },

        // 提供给外部的刷新列表方法
        refreshList(code, value) {
            if (!code) {
                this.$message.warning('请先选择角色')
                return
            }
            this.roleCode = code
            this.searchValue = value
            if (value) {
                this.search(code, value)
            } else {
                this.getList(code)
            }
        },

        // 提供给外部的set元素方法
        insert(item) {
            if (!(item instanceof OrgUser)) {
                item = new OrgUser().init(item)
            }
            this.data.push(item)
        },

        // 清空列表数据
        clear() {
            this.data = []
            this.$emit('row-click', {})
            this.$emit('selection-change', [])
        },

        // 提供给外部的删除元素方法
        async remove(selectedData = this.selectedData) {
            if (selectedData.length === 0) {
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
                try {
                    const userIds = selectedData
                        .map(v => v.id)
                        .join()
                    const params = {
                        roleCode: this.roleCode,
                        userIds
                    }
                    await deleteRoleUser(params)
                    this.$message({ type: 'success', message: '删除成功' })
                    this.refreshList(this.roleCode, this.searchValue)
                } catch (error) {
                    console.warn(`删除角色用户异常${JSON.stringify(error)}`)
                    this.$message.error(`删除失败`)
                }
            } catch (error) {} // eslint-disable-line
        },

        // 获取列表数据
        async getList(roleCode) {
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
                    roleCode
                }
                const res = await fetchRoleUserList(params)
                this.targetData = {}
                this.selectedData = []
                this.data = res.entities
                this.total = res.entityCount
            } catch (error) {
                console.warn(`获取角色用户列表Error:${JSON.stringify(error)}`)
                this.$message.error('获取列表失败')
            } finally {
                this.loading = false
            }
        },

        // 搜索角色列表
        async search(roleCode, value) {
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
                    roleCode,
                    filter: value
                }
                const res = await searchRoleUserList(params)
                this.targetData = {}
                this.selectedData = []
                this.data = res.entities
                this.total = res.entityCount
            } catch (error) {
                console.warn(`搜索角色用户列表Error:${JSON.stringify(error)}`)
                this.$message.error('获取列表失败')
            } finally {
                this.loading = false
            }
        },

        // 监听分页页码
        handleCurrentChange(no) {
            this.pageNo = no
            this.refreshList(this.roleCode, this.searchValue)
        },

        // 监听分页条数
        handleSizeChange(size) {
            this.pageSize = size
            this.refreshList(this.roleCode, this.searchValue)
        }
    }
}
</script>