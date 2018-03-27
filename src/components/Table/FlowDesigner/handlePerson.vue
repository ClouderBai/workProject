/*
 * @Author: LiuJunTing 
 * @Date: 2018-03-15 14:41:03 
 * @Last Modified by: LiuJunTing
 * @Last Modified time: 2018-03-16 11:29:15
 */

/**
|--------------------------------------------------
|
|  处理设置处理人列表
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
    @default 400
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
*/

/*
    方法
    @method refreshList(*Object) 刷新列表数据
        (1) *orgId  组织id
    
    @method clear() 清空列表数据

    @method remove(Number) 删除点击选中的元素
        (1) uid 要删除的用户id  不传默认为选中用户的id
 */
<template>
    <div>
        <el-table v-loading="loading" id="human-task-form-table" :data="data" row-key="id" :type="type" style="cursor:pointer;" highlight-current-row @row-click="rowClick" border stripe>
            <el-table-column :type="type" v-if="type" width="55" align="center">
            </el-table-column>
            <el-table-column prop="personName" label="处理人"></el-table-column>
        </el-table>
    </div>
</template>

<script>
// import {
//     fetchUserListByOrgId,
//     searchUserList,
//     deleteOrgUser,
//     updateUserOrders
// } from '@/api/user' // 请求方法

export default {
    name: 'handlePerson',
    props: {
        type: {
            type: String,
            default: ''
        }
    },
    data() {
        return {
            loading: false,
            data: [],
            targetData: {}
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
        this.getList()
    },
    methods: {
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
                // const parameters = {
                //     uId: id,
                //     orgId: oId
                // }
                try {
                    // await deleteOrgUser(parameters)
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
                // const res = await fetchUserListByOrgId(params)
                this.targetData = {}
                this.selectedData = []
                // this.data = res.entities
                this.data = [
                    { id: '1', personName: '流程启动人同项目部门下属于项目工程部负责人的人' },
                    { id: '2', personName: '流程启动人同部门下的部门负责人的人' }
                ]
            } catch (error) {
                console.warn(`获取组织用户列表Error:${JSON.stringify(error)}`)
                this.$message.error('获取列表失败')
            } finally {
                this.loading = false
            }
        }
    }
}
</script>