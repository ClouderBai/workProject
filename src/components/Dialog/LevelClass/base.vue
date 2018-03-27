<template>
  <div>
    <el-dialog  
        :title="title" 
        :visible="visible" 
        @close="close" 
        width="30%" 
        append-to-body>
        <el-form 
            :model="targetData" 
            :rules="rules"
            ref="ruleForm" 
            label-width="100px" 
            class="demo-ruleForm">
            <el-form-item label="类别名称" prop="name">
                <el-input v-model="targetData.name"></el-input>
            </el-form-item>
            <el-form-item label="类别编码" prop="code">
                <el-input v-model="targetData.code"></el-input>
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
import LevelClass from '@/model/LevelClass'
import dialogOptions from '../DialogOptions'
import { createLevelData, updateLevelData } from '@/api/org'

export default {
    data() {
        return {
            title: '新增级别类别',
            visible: false,
            onClosed: function() {},
            targetData: '',
            rules: ''
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
                if (option.data && option.data instanceof LevelClass) { // 修改
                    this.updateLevelData(option.data)
                } else if (option.data && !(option.data instanceof LevelClass)) {
                    console.warn('传入的对象不是 LevelClass 对象')
                }
            } else { // 新建
                this.createLevelClass()
            }
        },
        confirm() {
            this.$refs.ruleForm.validate((valid) => {
                if (valid) {
                    this.$store.commit('SHOW_WAITING')
                    if (this.targetData.id > 0) { // 修改
                        updateLevelData({
                            code: this.targetData.code,
                            id: this.targetData.id,
                            name: this.targetData.name
                        }).then(res => {
                            this.targetData.endEdit()
                            this.$message.success('修改成功')
                            this.$store.commit('CLOSE_WAITING')
                            this.close(dialogOptions.CONFIRM)
                        }).catch(err => {
                            this.targetData.cancelEdit()
                            this.$message.error('修改失败')
                            this.$store.commit('CLOSE_WAITING')
                            console.warn('修改级别类别错误', err)
                        })
                    } else { // 新建
                        createLevelData({
                            code: this.targetData.code,
                            name: this.targetData.name
                        }).then(res => {
                            this.$message.success('新增成功')
                            this.$store.commit('CLOSE_WAITING')
                            this.close(dialogOptions.CONFIRM, new LevelClass().init(res))
                        }).catch(err => {
                            this.$message.error('新增失败')
                            this.$store.commit('CLOSE_WAITING')
                            console.warn('新增级别类别错误', err)
                        })
                    }
                }
            })
        },
        cancel() {
            this.close(dialogOptions.CANCEL)
        },
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
                /* eslint-disable */
                this.onClosed.call(this, payload) 
                /* eslint-enable */
            }
        },
        // 新建
        createLevelClass() {
            const levelClass = new LevelClass()
            this.targetData = levelClass
            this.rules = {
                name: [
                    {
                        required: true,
                        trigger: 'blur',
                        validator: levelClass.validatorOf('name')
                    }
                ],
                code: [
                    {
                        required: true,
                        trigger: 'blur',
                        validator: levelClass.validatorOf('code', levelClass.id)
                    }
                ]
            }
        },
        // 修改
        updateLevelData(ev) {
            this.targetData = ev
            this.targetData.beginEdit()
            this.rules = {
                name: [
                    {
                        required: true,
                        trigger: 'blur',
                        validator: ev.validatorOf('name')
                    }
                ],
                code: [
                    {
                        required: true,
                        trigger: 'blur',
                        validator: ev.validatorOf('code', ev.id)
                    }
                ]
            }
        }
    }
}
</script>

<style scoped>

</style>
