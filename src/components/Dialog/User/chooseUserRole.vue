/*
 * @Author: zhanglianhao 
 * @Date: 2018-03-20 13:28:14 
 * @Last Modified by: zhanglianhao
 * @Last Modified time: 2018-03-22 14:40:43
 */
 
/**
|--------------------------------------------------
| 新建用户选择角色弹窗
|--------------------------------------------------
*/
<template>
  <div class="choose-container">
      <el-dialog :visible="visible" @close="close">
            <div slot="title">
                <i class="el-icon-plus"></i>
                <span>选择角色</span>
            </div>
            <el-row>
                <el-col :span="8">
                    <tree @changeTree="onTreeChange"></tree>
                </el-col>
                <el-col :span="16">
                    <role-view @selectedChange="onSelectedChange" :data="tableData" :showCode="true" ref="roleTable"></role-view>
                </el-col>
            </el-row>
        <div slot="footer" class="dialog-footer">
            <el-button class="ljt-btn tiffany-btn" @click="cancel">取 消</el-button>
            <el-button class="ljt-btn primary-btn" @click="confirm">确 定</el-button>
        </div>
        </el-dialog>
  </div>
</template>

<script>
import type from '../DialogOptions'
import tree from '@/components/Tree/orgTreeCustom' // 角色树组件
import roleView from '@/components/Table/Role/userRoleView.vue' // 显示角色表格
import { fetchRoleList } from '@/api/userAccess' // 请求方法
export default {
    name: 'chooseUserRole',
    components: {
        tree,
        roleView
    },
    data() {
        return {
            onClosed() {},
            visible: false,
            tableData: [],
            pageNo: 1,
            pageSize: 999,
            selected: []
        }
    },
    methods: {
        open() {
            if (this.visible) return
            this.visible = true
        },
        confirm() {
            this.close(type.CONFIRM, this.selected)
        },
        cancel() {
            this.close(type.CANCEL)
        },
        close(option = type.CLOSE, data) {
            if (!this.visible) return
            this.visible = false
            this.$refs['roleTable'].clearSelect() // 清空角色
            const payload = {
                option,
                data,
                sender: this
            }
            if (typeof this.onClosed === 'function') {
                this.onClosed.call(this, payload) // eslint-disable-line
            }
        },
        onTreeChange(val) {
            this.getList(val.id)
        },
        // 获取列表数据
        async getList(orgId) {
            try {
                const params = {
                    orgId: orgId,
                    pageNo: this.pageNo,
                    pageSize: this.pageSize
                }
                const res = await fetchRoleList(params)
                this.tableData = res.entities
            } catch (error) {
                console.warn(`获取角色列表Error:${JSON.stringify(error)}`)
                this.$message.error('获取列表失败')
            }
        },
        onSelectedChange(selected) {
            this.selected = selected
        }
    }
}
</script>

<style>

</style>
