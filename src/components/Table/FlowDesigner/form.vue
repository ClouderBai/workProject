/*
 * @Author: LiuJunTing 
 * @Date: 2018-03-15 09:37:00 
 * @Last Modified by: LiuJunTing
 * @Last Modified time: 2018-03-23 16:30:08
 */

/**
|--------------------------------------------------
|
|  表单列表
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
    @method refreshList(*Array) 刷新列表数据
        (1) *data  数组集合  CustomerForm对象
    
    @method remove() 删除点击选中的元素
 */
<template>
    <div>
        <el-table v-loading="loading" id="human-task-form-table" :data="data" :type="type" style="cursor:pointer;" highlight-current-row @row-click="rowClick" border stripe>
            <el-table-column :type="type" v-if="type" width="55" align="center">
            </el-table-column>
            <el-table-column prop="formCode" label="表单编码" align="center"></el-table-column>
            <el-table-column prop="formName" label="表单名称" align="center"></el-table-column>
            <el-table-column prop="belongedToNodeDisplayName" label="所属节点" align="center"></el-table-column>
            <el-table-column align="center" label="拖拽" width="80" v-if="draggable">
                <template slot-scope="scope">
                    <svg-icon class='drag-handler' icon-class="drag"></svg-icon>
                </template>
            </el-table-column>
        </el-table>
    </div>
</template>

<script>
import Sortable from 'sortablejs'

export default {
    name: 'humanTaskForm',
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
            } catch (error) {
                this.data = []
                this.$nextTick(() => (this.data = beBackData))
            }
        },

        // 表格选中行事件
        rowClick(target) {
            this.targetData = target
            this.$emit('row-click', target)
        },

        // 提供给外部的刷新列表方法
        refreshList(data) {
            this.data = data
        },

        // 提供给外部的删除元素方法
        async remove() {
            if (!this.targetData.formId) return this.$message.warning(`请选择要删除的表单`)
            // 删除选中的元素
            this.data.splice(this.data.findIndex(v => v.formId === this.targetData.formId), 1)
            // 重新排序order
            this.data.map((v, i) => { v.order = i + 1 })
        }
    }
}
</script>