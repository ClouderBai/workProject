<template>
    <div>
        <el-dialog  
            :title="title" 
            @close="close"
            :visible="visible"
            width="30%" 
            append-to-body>
            <el-form 
                :model="targetData" 
                :rules="rules" 
                ref="ruleForm" 
                label-width="100px" 
                class="demo-ruleForm">
                <el-form-item label="公司名称" prop="name">
                    <el-input v-model="targetData.name"></el-input>
                </el-form-item>
                    <el-form-item label="组织类型" prop="type">
                    <el-select v-model="targetData.type" placeholder="请选择活动区域">
                        <el-option label="字符类型" value="字符类型"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="是否启用" prop="inUse">
                    <el-switch v-model="targetData.inUse"></el-switch>
                </el-form-item>
            </el-form> 
            <span slot="footer" class="dialog-footer">
                <el-button class="ljt-btn tiffany-btn" @click="cancel">取 消</el-button>
                <el-button class="ljt-btn primary-btn" @click="confirm">确 定</el-button>
            </span>                       
        </el-dialog>
    </div>
</template>

<script>
import DepExtAddCol from '@/model/DepExtAddCol'
import dialogOptions from '../DialogOptions'
import { createOrgInfo } from '@/api/org'

export default {
    data() {
        return {
            title: '新增组织扩展属性',
            visible: false,
            onClosed: function() {},
            targetData: '',
            rules: '',
            radio: '1'
        }
    },
    methods: {
        open(option) {
            if (this.visible) return this
            this.visible = true
            if (option) {
                if (option.title) {
                    this.title = option.title
                }
            }
            this.createDepExtAddCol()
        },

        // 新建
        createDepExtAddCol() {
            const depExtAddCol = new DepExtAddCol()
            this.targetData = depExtAddCol
            this.rules = {
                name: [
                    {
                        required: true,
                        trigger: 'blur',
                        validator: depExtAddCol.validatorOf('name')
                    }
                ],
                type: [
                    {
                        required: true,
                        trigger: 'blur',
                        validator: depExtAddCol.validatorOf('type')
                    }
                ]
            }
        },

        // 确定
        confirm() {
            this.$refs.ruleForm.validate(valid => {
                if (valid) {
                    this.$store.commit('SHOW_WAITING')
                    let orNot
                    (this.targetData.inUse) ? orNot = 'true' : orNot = 'false'
                    createOrgInfo({
                        name: this.targetData.name,
                        type: this.targetData.type,
                        valid: orNot
                    }).then(res => {
                        this.$message.success('新增成功')
                        this.$store.commit('CLOSE_WAITING')
                        this.close(dialogOptions.CONFIRM, new DepExtAddCol().init(res))
                    }).catch(err => {
                        this.$message.error('新增失败')
                        this.$store.commit('CLOSE_WAITING')
                        console.warn('新增组织扩展属性错误', err)
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
            if (!this.visible) return
            this.visible = false
            this.targetData.cancelEdit()
            if (typeof this.onClosed === 'function') {
                const payload = {
                    option,
                    data,
                    sender: this
                }
                /* eslint-disable */
                this.onClosed.call(this, payload)
                /* eslint-enable */
            }
        }
    }
}
</script>

<style scoped>

</style>
