/*
 * @Author: zhanglianhao 
 * @Date: 2018-03-20 17:13:28 
 * @Last Modified by: zhanglianhao
 * @Last Modified time: 2018-03-20 17:14:06
 */

/**
|--------------------------------------------------
| 编码新增修改 dialog
|--------------------------------------------------
*/
<template>
    <div class="code-container">
        <el-row>
            <el-col :span="24">
                <el-dialog :visible="visible" @close="close">
                    <span slot="title"><i :class="`el-icon-${iconType}`"></i>{{operationTitle}}</span>
                    <!-- dialog-body-start -->
                    <el-form :model="codeForm" :rules="rules" ref="codeForm" label-width="100px" class="demo-ruleForm">
                        <el-form-item label="编码：" prop="code">
                            <el-input v-model="codeForm.code" placeholder="请输入编码"></el-input>
                        </el-form-item>
                        <el-form-item label="格式：" prop="format">
                            <el-input v-model="codeForm.format" placeholder="请输入格式"></el-input>   
                        </el-form-item>
                        <el-form-item label="备注：">
                            <el-input v-model="codeForm.desc" type="textarea" :row="2" placeholder="请输入备注"></el-input>
                        </el-form-item>
                    </el-form>
                    <!-- dialog-body-end -->
                    <span slot="footer" class="dialog-footer">
                        <el-button class="ljt-btn tiffany-btn" @click="cancel">取 消</el-button>
                        <el-button class="ljt-btn primary-btn" @click="confirm">确 定</el-button>
                    </span>
                </el-dialog>
            </el-col>
        </el-row>
    </div>
</template>

<script>
import DialogOptions from '@/components/Dialog/DialogOptions'
import { addCode, updateCode } from '@/api/code'
import Code from '@/model/Code'
export default {
    name: 'codeDialog',
    props: {},
    data() {
        return {
            operationTitle: '',
            iconType: '',
            visible: false,
            onClosed() {},
            codeForm: {},
            rules: {}
        }
    },
    methods: {
        open({ title, icon, data = new Code() } = { title, icon, data: new Code() }) {
            if (this.visible) return
            this.visible = true
            if (data.id === -1) {
                this.operationTitle = title || '新增编码'
                this.iconType = icon || 'plus'
            } else {
                this.operationTitle = title || '修改编码'
                this.iconType = icon || 'edit'
                data.beginEdit()
            }
            this.codeForm = data

            this.rules = {
                code: [
                    { required: true, trigger: 'blur', validator: data.validatorOf('code', data.id) }
                ],
                format: [
                    { required: true, trigger: 'blur', validator: data.validatorOf('format', data.id) }
                ]
            }
        },
        close(option = DialogOptions.CLOSE, data) {
            if (!this.visible) return
            this.visible = false
            const payload = {
                option: option,
                data,
                sender: this
            }
            if (typeof this.onClosed === 'function') {
                this.onClosed.call(this, payload) // eslint-disable-line
            }
        },
        async confirm() {
            try {
                const valid = await this.$refs['codeForm'].validate() // 校验表单
                if (valid) {
                    // 新增
                    if (this.codeForm.id === -1) {
                        this.addCode()
                        return
                    }
                    // 修改
                    this.editCode()
                }
            } catch (e) {
                console.log(e)
            }
        },
        cancel() {
            this.close(DialogOptions.CANCEL)
            if (this.codeForm.id !== -1) {
                this.codeForm.cancelEdit()
            }
        },
        // 新增code
        async addCode() {
            try {
                const data = {
                    code: this.codeForm.code,
                    format: this.codeForm.format,
                    desc: this.codeForm.desc
                }
                await addCode(data)
                this.$message.success('添加成功')
                this.close(DialogOptions.CONFIRM, data)
            } catch (e) {
                this.$message.error('添加失败')
                console.warn(`新增code: ${e}`)
            }
        },
        // 修改code
        async editCode() {
            try {
                await updateCode(this.codeForm)
                this.codeForm.endEdit()
                this.$message.success('修改成功')
                this.close(DialogOptions.CONFIRM)
            } catch (e) {
                this.$message.error('修改失败')
                console.warn(`修改code: ${e}`)
            }
        }
    }
}
</script>

<style lang="scss" scoped></style>