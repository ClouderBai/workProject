/*
 * @Author: ShaXin 
 * @Date: 2018-01-29 10:22:07 
 * @Last Modified by: zhanglianhao
 * @Last Modified time: 2018-03-27 17:28:58
 */
<template>
  <!-- 弹窗 -->
    <el-dialog :title="diaTitle" :visible="visible" @close="close" v-if="visible" @keyup.enter.native='confirm()'>
          <el-form :model="typeForm" :rules="rules" ref="ruleForm" :validate-on-rule-change="false">
            <el-form-item label="类别名称" :label-width="formLabelWidth" prop="name">
                <el-input v-model="typeForm.name" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="类别编码" :label-width="formLabelWidth" prop="code">
                <el-input v-model="typeForm.code" auto-complete="off"></el-input>
            </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
            <el-button @click="cancel()" class="ljt-btn pink-btn">取 消</el-button>
            <el-button type="primary" @click="confirm()" class="ljt-btn primary-btn">确 定</el-button>
        </div>
    </el-dialog>
</template>
<script>
import { createBizType, updateBizType } from '@/api/org'
import OrgBusType from '@/model/OrgBusType'
import DialogOptions from '../DialogOptions'
export default {
    data() {
        return {
            visible: false,
            typeForm: {},
            rules: {},
            formLabelWidth: '80px',
            diaTitle: '',
            currentia: '', // 页面传过来的数据name
            onClosed: function() {}
        }
    },
    methods: {
        // 打开弹窗
        open({ data = new OrgBusType() } = { data: new OrgBusType() }) {
            if (this.visible) return
            this.visible = true
            if (data.id === -1) {
                this.diaTitle = '业务类别维护新增'
            } else {
                this.diaTitle = '业务类别维护修改'
            }
            data.beginEdit()
            this.typeForm = data
            this.rules = {
                name: [
                    { required: true, trigger: 'blur', validator: data.validatorOf('name') }
                ],
                code: [
                    { required: true, trigger: 'blur', validator: data.validatorOf('code', this.typeForm.id) }
                ]
            }
        },
        close(option = DialogOptions.CLOSE, data, isEdit) {
            if (!this.visible) return
            this.visible = false
            this.$refs['ruleForm'].clearValidate()
            if (typeof this.onClosed === 'function') {
                const payload = {
                    option,
                    data,
                    sender: this
                }
                this.onClosed.call(this, payload) // eslint-disable-line
            }
        },
        cancel() {
            // 取消
            this.typeForm.cancelEdit()
            this.close(DialogOptions.CANCEL)
        },
        async confirm() {
            try {
                const valid = await this.$refs.ruleForm.validate()
                if (valid) {
                    this.$store.commit('SHOW_WAITING')
                    if (this.typeForm.id === -1) {
                        this.add()
                        return
                    }
                    this.edit()
                }
            } catch (error) {
                return
            } finally {
                this.$store.commit('CLOSE_WAITING')
            }
        },
        // 新增
        async add() {
            try {
                const res = await createBizType(this.typeForm)
                this.$message({ type: 'success', message: '新增成功' })
                this.typeForm.endEdit()
                this.close(DialogOptions.CONFIRM, res)
            } catch (error) {
                this.$store.commit('CLOSE_WAITING')
                this.$message.error(`新增失败: ${error.message}`)
            }
        },
        // 修改
        async edit() {
            try {
                await updateBizType(this.typeForm)
                this.$message({ type: 'success', message: '修改成功' })
                this.typeForm.endEdit()
                this.close(DialogOptions.CONFIRM)
            } catch (error) {
                this.$store.commit('CLOSE_WAITING')
                this.$message.error(`修改失败: ${error.message}`)
            }
        }
    }
}
</script>
