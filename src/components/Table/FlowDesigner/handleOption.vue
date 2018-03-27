/*
 * @Author: LiuJunTing 
 * @Date: 2018-03-15 14:34:46 
 * @Last Modified by: LiuJunTing
 * @Last Modified time: 2018-03-16 11:29:15
 */

/**
|--------------------------------------------------
|
|  处理设置列表
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
            <el-table-column prop="btnName" label="按钮名称" align="center"></el-table-column>
            <el-table-column prop="type" label="类型" align="center"></el-table-column>
            <el-table-column prop="targetDom" label="目标节点" align="center"></el-table-column>
            <el-table-column align="center" label="拖拽" width="80" v-if="draggable">
                <template slot-scope="scope">
                    <svg-icon class='drag-handler' icon-class="drag"></svg-icon>
                </template>
            </el-table-column>
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
import Sortable from 'sortablejs'

export default {
    name: 'handleOption',
    props: {
        type: {
            type: String,
            default: ''
        },
        draggable: {
            default: false
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
        // 创建拖拽
        createSortable() {
            const el = document.querySelectorAll('#human-task-form-table tbody')[0]
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
                // await updateUserOrders(params)
                this.$message.success('更新排序成功')
            } catch (error) {
                console.error(`更新用户排序异常${JSON.stringify(error)}`)
                this.$message.error('更新排序失败')
            } finally {
                this.$store.commit('CLOSE_WAITING')
            }
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
                    { id: '1', btnName: '批准', type: '自动', targetDom: '(无)', order: '1' },
                    { id: '2', btnName: '驳回', type: '上一环节', targetDom: '(无)', order: '2' },
                    { id: '3', btnName: '跳转', type: '跳转至', targetDom: '(node5)财务人员计算费用', order: '3' }
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