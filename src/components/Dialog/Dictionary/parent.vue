/*
 * @Author: zhanglianhao 
 * @Date: 2018-03-20 17:07:57 
 * @Last Modified by: zhanglianhao
 * @Last Modified time: 2018-03-27 13:37:50
 */

/**
|--------------------------------------------------
| 数据字典左侧新建修改
|--------------------------------------------------
*/
<template>
    <div class="dictionary-container">
        <el-row>
            <el-col :span="24">
                <el-dialog :visible="visible" @close="close">
                    <span slot="title"><i :class="`el-icon-${iconType}`"></i>{{operationTitle}}</span>
                    <!-- dialog-body-start -->
                    <el-form :model="dictionaryForm" :rules="rules" ref="dictionaryForm" label-width="100px" :validate-on-rule-change="false">
                        <el-form-item label="编码：" prop="code">
                            <el-input v-model="dictionaryForm.code" placeholder="请输入编码"></el-input>
                        </el-form-item>
                        <el-form-item label="名称：" prop="name">
                            <el-input v-model="dictionaryForm.name" placeholder="请输入名称"></el-input>   
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
import { addDictionaryCat, uploadDictionaryCat, checkDictionaryCode } from '@/api/dictionary'
export default {
    name: 'addDictionary',
    data() {
        const checkCode = async(rule, value, callback) => {
            if (!value) {
                return callback(new Error('编码不能为空，请填写编码'))
            }
            try {
                const params = {
                    id: this.dictionaryForm.id,
                    code: value,
                    parentCode: this.parentCode
                }
                const valid = await checkDictionaryCode(params)
                if (valid) {
                    callback(new Error('编码重复'))
                } else {
                    callback()
                }
            } catch (e) {
                console.log(e)
            }
        }
        return {
            onClosed() {},
            visible: false,
            dictionaryForm: {},
            operationTitle: '',
            iconType: '',
            rules: {
                name: [
                    { required: true, message: '编码名称不能为空，请填写编码名称', trigger: 'blur' }
                ],
                code: [
                    { required: true, validator: checkCode, trigger: 'blur' }
                ]
            },
            isTop: false,
            parentCode: '',
            fullCode: ''
        }
    },
    methods: {
        open({ title, icon, data = {}, type, parentCode } = { title, icon, data: {}, type, parentCode }) {
            if (this.visible) return
            this.visible = true
            this.dictionaryForm = {} // 清空表单
            this.parentCode = parentCode
            if (data.id) {
                this.operationTitle = title || '修改字典'
                this.iconType = icon || 'edit'
                this.dictionaryForm = data
            } else {
                this.iconType = icon || 'plus'
                if (type === 'TOP') {
                    this.isTop = true
                    this.operationTitle = title || '新增顶级字典'
                    return
                }
                this.isTop = false
                this.operationTitle = title || '新增子集字典'
            }
        },
        close(option = DialogOptions.CLOSE) {
            if (!this.visible) return
            this.visible = false
            this.$refs['dictionaryForm'].clearValidate()
            const payload = {
                option,
                sender: this
            }
            if (typeof this.onClosed === 'function') {
                this.onClosed.call(this, payload) // eslint-disable-line
            }
            this.$refs['dictionaryForm'].resetFields()
        },
        cancel() {
            this.close(DialogOptions.CANCEL)
        },
        async confirm() {
            try {
                const valid = await this.$refs['dictionaryForm'].validate()
                if (valid) {
                    if (this.dictionaryForm.id) {
                        this.editMap()
                        return
                    }
                    this.addMap()
                }
            } catch (e) {
                return false
            }
        },
        // 添加 map
        async addMap() {
            try {
                const data = {
                    name: this.dictionaryForm.name,
                    code: this.dictionaryForm.code,
                    parentCode: this.parentCode,
                    fullCode: `${this.parentCode ? `${this.parentCode}.${this.dictionaryForm.code}` : this.dictionaryForm.code}`
                }
                await addDictionaryCat(data)
                this.$message.success('添加成功')
                this.close(DialogOptions.CONFIRM)
            } catch (e) {
                this.$message.error(`添加失败: ${e.message}`)
                console.warn(`添加code: ${JSON.stringify(e)}`)
            }
        },
        // 修改 map
        async editMap() {
            try {
                await uploadDictionaryCat(this.dictionaryForm)
                this.$message.success('修改成功')
                this.close(DialogOptions.CONFIRM)
            } catch (e) {
                this.$message.error(`修改失败: ${e.message}`)
                console.warn(`修改code: ${JSON.stringify(e)}`)
            }
        },
        checkCode(value) {
            try {
                const params = {
                    id: this.dictionaryForm.id,
                    code: value,
                    parentCode: this.parentCode
                }
                return checkDictionaryCode(params)
            } catch (e) {
                console.warn(`校验编码: ${JSON.stringify(e)}`)
            }
        }
    }
}
</script>

<style lang="scss" scoped>

</style>
