/*
 * @Author: LiuJunTing 
 * @Date: 2018-01-30 17:01:37 
 * @Last Modified by: LiuJunTing
 * @Last Modified time: 2018-03-07 09:14:02
 */

/*
@method open 打开模态框
@param {Object}
    (1) *orgId 组织id
        title  模态框标题
        data   对象  要修改的role对象
 
@method onClosed 模态框关闭时回调方法
@param {*Object}
    (1) *option  模态框关闭状态
        *sender  组件this指向
        data     返回数据
 */

 
<template>
    <div>
        <el-dialog :title="title" :visible="visible" @close="close()" width="550px" append-to-body v-if="visible">
            <el-form :model="submitData" :rules="rules" ref="form" label-width="130px" class="roleName" :validate-on-rule-change="false">
                <el-form-item label="编码" prop="code">
                    <el-input v-model="submitData.code"></el-input>
                </el-form-item>
                <el-form-item label="角色名" prop="name">
                    <el-input v-model="submitData.name"></el-input>
                </el-form-item>
                <el-form-item label="是否可用" prop="valid">
                    <el-switch v-model="submitData.valid"></el-switch>
                </el-form-item>
                <el-form-item label="排序号" prop="order">
                    <el-input v-model="submitData.order"></el-input>
                </el-form-item>
                <el-form-item label="备注" prop="desc">
                    <el-input type="textarea" :rows="2" v-model=" submitData.desc">
                    </el-input>
                </el-form-item>
            </el-form>
            <!-- 确认取消 -->
            <div slot="footer" class="dialog-footer">
                <el-button class="ljt-btn tiffany-btn" @click="cancel()">取 消</el-button>
                <el-button class="ljt-btn primary-btn" @click="confirm()">确 定</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
import DialogOptions from '../DialogOptions'
import { createRole, updateRole } from '@/api/userAccess'
import Role from '@/model/Role'

export default {
    name: 'roleBase',
    data() {
        return {
            visible: false,
            onClosed: function() {},
            title: '',
            submitData: {},
            rules: {},
            isEdit: false,
            resData: null
        }
    },

    methods: {
        open(
            { title, data = new Role(), orgId } = {
                title,
                data: new Role()
            }
        ) {
            if (this.visible) return
            if (!orgId) return this.$message.warning('请先选择组织')
            if (data instanceof Role) {
                this.isEdit = data.id > 0
                this.title = title || data.id > 0 ? (this.title = '修改角色') : (this.title = '新增角色')
                this.submitData = data
                this.submitData.orgId = orgId
                this.submitData.beginEdit()
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
                            trigger: 'blur',
                            validator: data.validatorOf('code', data.id)
                        }
                    ],
                    order: [
                        {
                            required: true,
                            trigger: 'blur',
                            validator: data.validatorOf('order')
                        }
                    ]
                }
                this.visible = true
            } else {
                console.warn('该组件接收的data必须是Role对象')
            }
        },

        close(option = DialogOptions.CLOSE) {
            if (!this.visible) return
            this.submitData.cancelEdit()
            this.visible = false
            if (typeof this.onClosed === 'function') {
                const payload = {
                    option,
                    sender: this,
                    data: this.resData
                }
                this.onClosed.call(this, payload) // eslint-disable-line
            }
        },

        confirm() {
            if (this.isEdit) {
                this.update()
            } else {
                this.create()
            }
        },

        cancel() {
            this.close(DialogOptions.CANCEL)
        },

        // 新增角色
        async create() {
            try {
                const valid = await this.$refs.form.validate()
                if (valid) {
                    try {
                        this.$store.commit('SHOW_WAITING')
                        this.resData = await createRole(this.submitData)
                        this.$message({ type: 'success', message: '新增成功' })
                        this.close(DialogOptions.CONFIRM)
                    } catch (error) {
                        console.warn(`新增角色Error:${JSON.stringify(error)}`)
                        this.$message.error('新增失败')
                    } finally {
                        this.$store.commit('CLOSE_WAITING')
                    }
                }
            } catch (error) {} // eslint-disable-line
        },
        // 修改角色
        async update() {
            try {
                const valid = await this.$refs.form.validate()
                if (valid) {
                    try {
                        this.$store.commit('SHOW_WAITING')
                        await updateRole(this.submitData)
                        this.$message({ type: 'success', message: '修改成功' })
                        this.submitData.endEdit()
                        this.close(DialogOptions.CONFIRM)
                    } catch (error) {
                        console.warn(`修改角色Error:${JSON.stringify(error)}`)
                        this.$message.error('修改失败')
                    } finally {
                        this.$store.commit('CLOSE_WAITING')
                    }
                }
            } catch (error) {} // eslint-disable-line
        }
    }
}
</script>
