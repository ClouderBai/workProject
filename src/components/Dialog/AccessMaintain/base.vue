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
                <el-form-item label="权限名称" prop="name">
                    <el-input v-model="targetData.name"></el-input>
                </el-form-item>
                <el-form-item label="权限编码" prop="code">
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
import RoleCustomizePermission from '@/model/RoleCustomizePermission.js' // 自定义权限类
import RoleCustimizeList from '@/model/RoleCustimizeList.js' // 自定义权限行为类
import { createPermissionClass, createPermissionBehavior, updatePermissionClass, updatePermissionBehavior } from '@/api/roleAccess.js'

export default {
    data() {
        return {
            title: '',
            visible: false,
            onClosed: function() {},
            targetData: [],
            rules: '', // 校验规则
            dialogKind: '', // 弹窗种类
            permissionClassInfo: '', // 选中的权限类别code
            roleInfo: '', // 选中的角色信息
            roleCode: '', // 角色 Code
            preCode: '' // 修改前的权限编码
        }
    },

    methods: {
        open() {
            if (this.visible) return this
            this.visible = true
        },

        // 新增权限类别
        insertClass(roleInfo) {
            this.dialogKind = 'insertClass'
            this.title = '新增权限类别'
            this.open()
            this.roleInfo = roleInfo
            const permissionClass = new RoleCustomizePermission()
            this.targetData = permissionClass
            this.rules = {
                name: [
                    {
                        required: true,
                        trigger: 'blur',
                        validator: permissionClass.validatorOf('name')
                    }
                ],
                code: [
                    {
                        required: true,
                        trigger: 'blur',
                        validator: permissionClass.validatorOf('code', permissionClass.id)
                    }
                ]
            }
        },

        // 新增权限行为
        insertBehavior(roleInfo, permissionClassInfo) {
            this.dialogKind = 'insertBehavior'
            this.title = '新增权限行为'
            this.open()
            this.permissionClassInfo = permissionClassInfo
            this.roleInfoCode = roleInfo.code
            const roleCustimizeList = new RoleCustimizeList()
            this.targetData = roleCustimizeList
            const data = {
                id: roleCustimizeList.id,
                catCode: permissionClassInfo.code
            }
            this.rules = {
                name: [
                    {
                        required: true,
                        trigger: 'blur',
                        validator: roleCustimizeList.validatorOf('name')
                    }
                ],
                code: [
                    {
                        required: true,
                        trigger: 'blur',
                        validator: roleCustimizeList.validatorOf('code', data)
                    }
                ]
            }
        },

        // 修改
        edit(ev) {
            this.open()
            this.targetData = ev.permissionClassData || ev.permissionBehaviorData
            this.preCode = this.targetData.code
            if (this.targetData instanceof RoleCustomizePermission) {
                this.dialogKind = 'editPermissionClass'
                this.rules = {
                    name: [
                        {
                            required: true,
                            trigger: 'blur',
                            validator: this.targetData.validatorOf('name')
                        }
                    ],
                    code: [
                        {
                            required: true,
                            trigger: 'blur',
                            validator: this.targetData.validatorOf('code', this.targetData.id)
                        }
                    ]
                }
            } else if (this.targetData instanceof RoleCustimizeList) {
                this.dialogKind = 'editPermissionBehavior'
                const data = {
                    id: this.targetData.id,
                    catCode: this.permissionClassInfo.code
                }
                this.rules = {
                    name: [
                        {
                            required: true,
                            trigger: 'blur',
                            validator: this.targetData.validatorOf('name')
                        }
                    ],
                    code: [
                        {
                            required: true,
                            trigger: 'blur',
                            validator: this.targetData.validatorOf('code', data)
                        }
                    ]
                }
            }
            this.targetData instanceof RoleCustomizePermission ? this.title = '修改权限类别' : this.title = '修改权限行为'
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
            if (typeof this.onClosed === 'function') {
                const payload = {
                    option,
                    data,
                    sender: this
                }
                this.onClosed.call(this, payload) // eslint-disable-line
            }
        },

        // 确认
        confirm() {
            this.$refs.ruleForm.validate((valid) => {
                this.$store.commit('SHOW_WAITING')
                if (this.dialogKind == 'insertClass') { // eslint-disable-line 
                    createPermissionClass({ // 新建权限类别
                        code: this.targetData.code,
                        name: this.targetData.name
                    }).then(res => {
                        this.$message.success('新增成功')
                        this.$store.commit('CLOSE_WAITING')
                        this.$emit('refresh', this.roleInfo)
                        this.close(dialogOptions.CONFIRM)
                    }).catch(err => {
                        this.$message.error('修改失败')
                        this.$store.commit('CLOSE_WAITING')
                        console.warn('修改级别类别错误', err)
                    })
                } else if (this.dialogKind == 'insertBehavior') { // eslint-disable-line 
                    createPermissionBehavior({ // 新建权限行为
                        catCode: this.permissionClassInfo.code,
                        code: this.targetData.code,
                        name: this.targetData.name,
                        roleCode: this.roleCode
                    }).then(res => {
                        this.$message.success('新增成功')
                        this.$store.commit('CLOSE_WAITING')
                        this.$emit('refresh', this.roleInfo)
                        this.close(dialogOptions.CONFIRM)
                    }).catch(err => {
                        this.$message.error('新增失败')
                        this.$store.commit('CLOSE_WAITING')
                        console.warn('新增权限行为错误', err)
                    })
                } else if (this.dialogKind == 'editPermissionClass') { // eslint-disable-line 
                    updatePermissionClass({ // 修改权限类别
                        code: this.targetData.code,
                        name: this.targetData.name,
                        id: this.targetData.id,
                        preCode: this.preCode,
                        roleCode: this.roleCode
                    }).then(res => {
                        this.$message.success('修改成功')
                        this.$store.commit('CLOSE_WAITING')
                        this.$emit('refresh', this.roleInfo)
                        this.close(dialogOptions.CONFIRM)
                    }).catch(err => {
                        this.$message.error('修改失败')
                        this.$store.commit('CLOSE_WAITING')
                        console.warn('修改权限类别错误', err)
                    })
                } else if (this.dialogKind == 'editPermissionBehavior') { // eslint-disable-line 
                    updatePermissionBehavior({ // 修改权限行为
                        code: this.targetData.code,
                        name: this.targetData.name,
                        id: this.targetData.id,
                        preCode: this.preCode,
                        catCode: this.permissionClassInfo.code,
                        roleCode: this.roleCode
                    }).then(res => {
                        this.$message.success('修改成功')
                        this.$store.commit('CLOSE_WAITING')
                        this.$emit('refresh', this.roleInfo)
                        this.close(dialogOptions.CONFIRM)
                    }).catch(err => {
                        this.$message.error('修改失败')
                        this.$store.commit('CLOSE_WAITING')
                        console.warn('修改权限行为错误', err)
                    })
                }
            })
        }
    }
}
</script>

<style scoped>

</style>
