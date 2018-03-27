/*
 * @Author: zhanglianhao 
 * @Date: 2018-03-20 17:08:29 
 * @Last Modified by: zhanglianhao
 * @Last Modified time: 2018-03-27 13:36:47
 */
/**
|--------------------------------------------------
| 数据字典右侧新建修改
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
                        <el-form-item label="关键字：" prop="key">
                            <el-input v-model="dictionaryForm.key" placeholder="请输入关键字"></el-input>
                        </el-form-item>
                        <el-form-item label="值：" prop="value">
                            <el-input v-model="dictionaryForm.value" placeholder="请输入值"></el-input>   
                        </el-form-item>
                        <el-form-item label="是否可用：">
                            <el-radio-group v-model="dictionaryForm.valid">
                                <el-radio :label="true">是</el-radio>
                                <el-radio :label="false">否</el-radio>
                            </el-radio-group>
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
import { addDictionary, uploadDictionary, checkDictionaryChildCode } from '@/api/dictionary'
export default {
    name: 'addDictionaryItem',
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
                const valid = await checkDictionaryChildCode(params)
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
                value: [
                    { required: true, message: '值不能为空，请填写值', trigger: 'blur' }
                ],
                key: [
                    { required: true, validator: checkCode, trigger: 'blur' }
                ]
            },
            isTop: false,
            catCode: '',
            parentKey: ''
        }
    },
    methods: {
        open({ title, icon, data = {}, type, catCode, parentKey } = { title, icon, data: {}, type, catCode, parentKey }) {
            if (this.visible) return
            this.visible = true
            this.dictionaryForm = { valid: true } // 清空表单
            this.catCode = catCode
            this.parentKey = parentKey
            if (data.id) {
                this.operationTitle = title || '修改字典'
                this.iconType = icon || 'edit'
                this.dictionaryForm = data
            } else {
                this.iconType = icon || 'plus'
                if (type === 'TOP') {
                    this.isTop = true
                    this.operationTitle = title || '添加字典项'
                    return
                }
                this.isTop = false
                this.operationTitle = title || '添加子字典项'
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
                        this.editItem()
                        return
                    }
                    this.addItem()
                }
            } catch (e) {
                return false
            }
        },
        // 添加字典
        async addItem() {
            try {
                const data = {
                    key: this.dictionaryForm.key,
                    value: this.dictionaryForm.value,
                    valid: this.dictionaryForm.valid,
                    catCode: this.catCode,
                    parentKey: this.parentKey
                }
                await addDictionary(data)
                this.$message.success('添加成功')
                this.close(DialogOptions.CONFIRM)
            } catch (e) {
                this.$message.error(`添加失败: ${e.message}`)
                console.warn(`添加code: ${JSON.stringify(e)}`)
            }
        },
        // 修改字典
        async editItem() {
            try {
                await uploadDictionary(this.dictionaryForm)
                this.$message.success('修改成功')
                this.close(DialogOptions.CONFIRM)
            } catch (e) {
                this.$message.error(`修改失败: ${e.message}`)
                console.warn(`修改code: ${JSON.stringify(e)}`)
            }
        }
    }
}
</script>

<style lang="scss" scoped>

</style>
