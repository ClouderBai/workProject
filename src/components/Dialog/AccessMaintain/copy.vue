<template>
    <div>
        <el-dialog  
        :title="title" 
        :visible="visible" 
        @close="close" 
        width="25%" 
        append-to-body>
            <el-table 
                :data="roleData" 
                border 
                highlight-current-row 
                @row-click="choseClicked"
                v-loading="loading">
                <el-table-column 
                    label="编码" 
                    prop="code" 
                    align="center">
                </el-table-column>
                <el-table-column 
                    label="角色名" 
                    prop="name" 
                    align="center">
                </el-table-column>
            </el-table>
            <div class="pageNum">   
                <el-pagination
                    background
                    layout="prev, pager, next"
                    @current-change="pageChange"
                    :total="totalPage">
                </el-pagination>
            </div>
            <div slot="footer">
                <el-button class="ljt-btn tiffany-btn" @click="cancel">取 消</el-button>
                <el-button :disabled="disabled" class="ljt-btn primary-btn" @click="confirm">确 定</el-button>          
            </div>                       
        </el-dialog>
    </div>
</template>

<script>
import dialogOptions from '../DialogOptions'
import { fetchRoleList, copyPermission } from '@/api/roleAccess'

export default {
    computed: {
        disabled() {
            return !(this.srcRoleCode != '') // eslint-disable-line
        }
    },
    data() {
        return {
            title: '选择复制角色来源',
            visible: false,
            onClosed: function() {},
            target: '', // 目标角色组
            targetCode: '', // 目标角色组 code
            srcRoleCode: '', // 被复制的 code
            roleData: [], // 复制源数据
            totalPage: 1,
            pageSize: 5,
            loading: false
        }
    },

    methods: {
        // 加载数据
        init(ev) {
            fetchRoleList({
                pageNo: 1,
                pageSize: this.pageSize
            }).then(res => {
                const filtData = res.entities.filter(item => {
                    return item.id != ev  // eslint-disable-line
                })
                this.roleData = filtData
                this.totalPage = res.entityCount
            }).catch(err => {
                console.warn('获取可复制角色出错', err)
            })
        },

        // 打开
        open(ev) {
            if (this.visible) return this
            this.visible = true
            this.init(ev.id)
            this.targetCode = ev.code
            this.target = ev
        },

        // 取消
        cancel() {
            this.close(dialogOptions.CANCEL)
        },

        // 确认
        confirm() {
            this.$store.commit('SHOW_WAITING')
            copyPermission({
                srcRoleCode: this.srcRoleCode,
                targetRoleCode: this.targetCode
            }).then(res => {
                this.$store.commit('CLOSE_WAITING')
                this.$message.success('复制成功')
                this.$emit('refresh', this.target)
                this.close(dialogOptions.CONFIRM)
            }).catch(err => {
                console.warn('角色权限复制出错', err)
                this.$store.commit('CLOSE_WAITING')
                this.$message.warning('复制失败')
                this.close(dialogOptions.CONFIRM)
            })
        },

        // 关闭
        close(option = dialogOptions.CLOSE, data) {
            // {option:xxx args:xxx sender:this }
            if (!this.visible) return
            this.visible = false
            if (typeof this.onClosed === 'function') {
                const payload = {
                    option,
                    data,
                    sender: this
                }
                this.onClosed.call(this, payload) // eslint-disable-line
            }
        },

        // 选中
        choseClicked(row) {
            this.srcRoleCode = row.code
        },

        // 页码改变
        pageChange(pageNum) {
            this.pageNum = pageNum
        }
    }
}
</script>

<style scoped>
    .pageNum {
        margin-top: 20px;   
        margin-bottom: 20px;        
    }
</style>
