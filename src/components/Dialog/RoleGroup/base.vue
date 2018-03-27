<template>
    <div>
        <el-dialog  
        :title="title" 
        :visible="visible" 
        @close="close" 
        width="550px" 
        append-to-body>
            <el-form 
                :model="targetData" 
                :rules="rules"
                ref="ruleForm" 
                label-width="130px" 
                class="roleName">
                <el-form-item label="角色组名称" prop="name">
                    <el-input v-model="targetData.name"></el-input>
                </el-form-item>
                <el-form-item label="角色组编码" prop="code">
                    <el-input v-model="targetData.code"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer">
                <el-button class="ljt-btn tiffany-btn" @click="cancel">取 消</el-button>
                <el-button class="ljt-btn primary-btn" @click="confirm">确 定</el-button>
            </div>                                   
        </el-dialog>
    </div>
</template>

<script>
import dialogOptions from '../DialogOptions'
import RoleGroup from '@/model/RoleGroup.js'
import { createRoleGroup, updateRoleGroup } from '@/api/roleAccess.js'

export default {
    data() {
        return {
            title: '',
            visible: false,
            onClosed: function() {},
            targetData: '',
            rules: '', // 验证规则
            editType: '' // 编辑类型
        }
    },

    methods: {
        // 打开
        open({ title, data = new RoleGroup(), code } = {}) {
            if (this.visible) return this
            this.visible = true
            this.title = title || '新增角色组'
            if (data instanceof RoleGroup || code) {
                this.targetData = data
                this.targetData.beginEdit()
                this.rules = {
                    name: [
                        {
                            required: true,
                            trigger: 'blur',
                            validator: data.validatorOf('name')
                        }
                    ],
                    code: [
                        {
                            required: true,
                            trigger: 'blur',
                            validator: data.validatorOf('code', data.id)
                        }
                    ]
                }
                code ? (this.editType = 'copy') : (this.targetData.id > 0) ? (this.editType = 'edit') : (this.editType = 'create')
            } else {
                console.warn('传入的对象不是 RoleGroup 对象')
            }
        },

        // 确定
        confirm() {
            switch (this.editType) {
                case 'create': // 新建
                    this.submitCreate()
                    break
                case 'edit': // 编辑
                    this.submitEdit()
                    break
            }
        },

        // 提交新建
        submitCreate() {
            this.$refs.ruleForm.validate(valid => {
                this.targetData.endEdit()
                if (valid) {
                    this.$store.commit('SHOW_WAITING')
                    createRoleGroup({
                        code: this.targetData.code,
                        name: this.targetData.name
                    }).then(res => {
                        console.log(res)
                        this.$store.commit('CLOSE_WAITING')
                        this.$message.success('新增成功')
                        this.close(dialogOptions.CONFIRM, new RoleGroup().init(res))
                        this.editType = ''
                    }).catch(err => {
                        this.$store.commit('CLOSE_WAITING')
                        console.warn('新增角色组出错', err)
                    })
                }
            })
        },

        // 提交修改
        submitEdit() {
            this.$refs.ruleForm.validate(valid => {
                if (valid) {
                    this.$store.commit('SHOW_WAITING')
                    updateRoleGroup({
                        code: this.targetData.code,
                        id: this.targetData.id,
                        name: this.targetData.name
                    }).then(res => {
                        this.targetData.endEdit()
                        this.$store.commit('CLOSE_WAITING')
                        this.$message.success('修改成功')
                        this.close(dialogOptions.CONFIRM)
                    }).catch(err => {
                        this.targetData.beginEdit()
                        this.$store.commit('CLOSE_WAITING')
                        this.$message.warning('修改失败')
                        console.warn('修改角色组出错', err)
                    })
                }
            })
        },

        // 取消
        cancel() {
            this.close(dialogOptions.CANCEL)
        },

        // 关闭
        close(option = dialogOptions.CLOSE, data) {
            // {option:xxx args:xxx sender:this }
            if (!this.visible) return
            this.visible = false
            this.targetData.cancelEdit()
            if (typeof this.onClosed === 'function') {
                const payload = {
                    option,
                    data,
                    sender: this
                }
                this.onClosed.call(this, payload) // eslint-disable-line
            }
        }
    }
}
</script>

<style scoped>

</style>
