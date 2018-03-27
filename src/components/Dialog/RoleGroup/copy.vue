<template>
  <div>
       <el-dialog  
        :title="title" 
        :visible="visible" 
        @close="close" 
        width="550px" 
        append-to-body>
            <roleGroupTable ref="roleGroupTable" @row-click="choseClicked"/> 
            <div slot="footer">
                <el-button class="ljt-btn tiffany-btn" @click="cancel">取 消</el-button>
                <el-button :disabled="disabled" class="ljt-btn primary-btn" @click="confirm">确 定</el-button>          
            </div>                       
        </el-dialog>
  </div>
</template>

<script>
import dialogOptions from '../DialogOptions'
import roleGroupTable from '@/components/Table/RoleGroup/index.vue'
import { copyRoleGroup } from '@/api/roleAccess.js'

export default {
    components: {
        roleGroupTable
    },

    computed: {
        disabled() {
            return !(this.sourceGroupCode != '') // eslint-disable-line
        }
    },

    data() {
        return {
            targetData: [],
            title: '选择复制角色组来源',
            visible: false,
            onClosed: function() {},
            targetGroupCode: '', // 目标角色组 code
            sourceGroupCode: '' // 被复制的 code
        }
    },

    methods: {
        // 打开
        open(ev) {
            this.targetGroupCode = ev.code
            if (this.visible) return this
            this.visible = true
            this.$nextTick(() => {
                this.$refs.roleGroupTable.init(ev.id)
            })
        },

        // 取消
        cancel() {
            this.close(dialogOptions.CANCEL)
        },

        // 确认
        confirm() {
            this.$store.commit('SHOW_WAITING')
            copyRoleGroup(
                this.sourceGroupCode,
                this.targetGroupCode
            ).then(res => {
                this.$store.commit('CLOSE_WAITING')
                this.$message.success('复制成功')
                this.$emit('refresh')
                this.close(dialogOptions.CONFIRM)
                this.sourceGroupCode = ''
            }).catch(err => {
                this.$store.commit('CLOSE_WAITING')
                this.$message.error('复制失败')
                console.warn('复制角色组出错', err)
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
            this.sourceGroupCode = row.code
        }
    }
}
</script>

<style scoped>
</style>
