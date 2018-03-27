/*
 * @Author: ShaXin 
 * @Date: 2018-01-29 10:22:10 
 * @Last Modified by: zhanglianhao
 * @Last Modified time: 2018-03-27 17:34:24
 */
<template>
    <!-- 弹窗 -->
    <el-dialog :title='diaTitle' :visible="visible" @close="close()" @keyup.enter.native='confirm()' v-if="visible">
        <el-form :model="jobForm" :rules="rules" ref="ruleForm" :validate-on-rule-change="false">
            <el-form-item label="类别名称" :label-width="formLabelWidth" prop="name">
                <el-input v-model="jobForm.name" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="类别编码" :label-width="formLabelWidth" prop="code">
                <el-input v-model="jobForm.code" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="分类" :label-width="formLabelWidth"  prop="category">
                <el-select v-model="jobForm.category" placeholder="请选择活动区域">
                    <el-option 
                        v-for="v in typeoptions" 
                        :key="v.id" 
                        :label="v.category" 
                        :value="v.category">
                    </el-option>
                </el-select>
            </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
            <el-button @click="cancel()" class="ljt-btn pink-btn">取 消</el-button>
            <el-button type="primary" @click="confirm()" class="ljt-btn primary-btn">确 定</el-button>
        </div>
    </el-dialog>
</template>
<script>
import {
    createPositionType, // 新增
    updatePosition, // 修改
    fetchPositionMenuFromCache // 岗位下拉菜单
} from '@/api/org'
import OrgJobType from '@/model/OrgJobType'
import DialogOptions from '../DialogOptions'
export default {
    data() {
        return {
            rules: {},
            jobForm: {},
            currentDia: '',
            diaTitle: '标题',
            visible: false, // 弹窗值
            formLabelWidth: '120px',
            typeoptions: [], // 选择分类
            onClosed: function() {}

        }
    },
    mounted() {
        this.init()
    },
    methods: {
        init() {
            fetchPositionMenuFromCache().then(res => {
                this.typeoptions = res.orgTypeCache.positionCat
            })
        },
        // 打开弹窗
        open({ data = new OrgJobType() } = { data: new OrgJobType() }) {
            if (this.visible) return
            this.visible = true
            if (data.id === -1) {
                this.diaTitle = '岗位类别维护新增'
            } else {
                this.diaTitle = '岗位类别维护修改'
            }
            data.beginEdit()
            this.jobForm = data
            this.rules = {
                name: [
                    { required: true, trigger: 'blur', validator: data.validatorOf('name') }
                ],
                code: [
                    { required: true, trigger: 'blur', validator: data.validatorOf('code', this.jobForm.id) }
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
            this.jobForm.cancelEdit()
            this.close(DialogOptions.CANCEL)
        },
        async confirm() {
            try {
                const valid = await this.$refs.ruleForm.validate()
                if (valid) {
                    this.$store.commit('SHOW_WAITING')
                    if (this.jobForm.id === -1) {
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
                const res = await createPositionType(this.jobForm)
                this.$message({ type: 'success', message: '新增成功' })
                this.jobForm.endEdit()
                this.close(DialogOptions.CONFIRM, res)
            } catch (error) {
                this.$store.commit('CLOSE_WAITING')
                this.$message.error(`新增失败: ${error.message}`)
            }
        },
        // 修改
        async edit() {
            try {
                await updatePosition(this.jobForm)
                this.$message({ type: 'success', message: '修改成功' })
                this.jobForm.endEdit()
                this.close(DialogOptions.CONFIRM)
            } catch (error) {
                this.$store.commit('CLOSE_WAITING')
                this.$message.error(`修改失败: ${error.message}`)
            }
        }
    }
}
</script>
<style>

</style>
