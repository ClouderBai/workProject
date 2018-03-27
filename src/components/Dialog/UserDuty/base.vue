/*
 * @Author: LiuJunTing 
 * @Date: 2018-01-26 09:29:56 
 * @Last Modified by: zhanglianhao
 * @Last Modified time: 2018-02-13 16:31:33
 */

/*
@method open 打开模态框
@param {Object}
    (1) title  模态框标题
        date   Duty对象  不传为新增
 
@method onClosed 模态框关闭时回调方法
@param {*Object}
    (1) *option  模态框关闭状态
        *sender  组件this指向
        data     返回数据
 */

 
<template>
    <div>
        <el-dialog :title="title" :visible="visible" @close="close()" width="550px" append-to-body>
            <el-form :model="submitData" :rules="rules" ref="form" label-width="130px" class="roleName">
                <el-form-item label="类别名称" prop="name">
                    <el-input v-model="submitData.name"></el-input>
                </el-form-item>
                <el-form-item label="类别编码" prop="code">
                    <el-input v-model="submitData.code"></el-input>
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
import Duty from '@/model/Duty'
import { createUserDuty, updateUserDuty } from '@/api/user'

export default {
    name: 'userDutyBase',
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
            { title, data = new Duty() } = {
                title,
                data: new Duty()
            }
        ) {
            if (this.visible) return
            if (data instanceof Duty) {
                this.isEdit = data.id > 0
                this.title =
                    title || data.id > 0
                        ? (this.title = '修改职位类别')
                        : (this.title = '新增职位类别')
                this.submitData = data
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
                            required: true,
                            trigger: 'blur',
                            validator: data.validatorOf('code', data.id)
                        }
                    ]
                }
                this.visible = true
            } else {
                console.warn('该组件接收的data必须是Duty对象')
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
        // 提交新增职位类别
        async create() {
            try {
                const valid = await this.$refs.form.validate()
                if (valid) {
                    try {
                        this.$store.commit('SHOW_WAITING')
                        this.resData = await createUserDuty(
                            this.submitData.name,
                            this.submitData.code
                        )
                        this.$message({ type: 'success', message: '新增成功' })
                        this.close(DialogOptions.CONFIRM)
                    } catch (error) {
                        console.warn(
                            `新增职位类别Error:${JSON.stringify(error)}`
                        )
                        this.$message.error('新增失败')
                    } finally {
                        this.$store.commit('CLOSE_WAITING')
                    }
                }
            } catch (error) {} // eslint-disable-line
        },
        // 提交修改职位类别
        async update() {
            const valid = await this.$refs.form.validate()
            if (valid) {
                try {
                    this.$store.commit('SHOW_WAITING')
                    await updateUserDuty(
                        this.submitData.id,
                        this.submitData.name,
                        this.submitData.code
                    )
                    this.$message({ type: 'success', message: '修改成功' })
                    this.submitData.endEdit()
                    this.close(DialogOptions.CONFIRM)
                } catch (error) {
                    console.warn(`修改职位类别Error:${JSON.stringify(error)}`)
                    this.$message.error('修改失败')
                } finally {
                    this.$store.commit('CLOSE_WAITING')
                }
            }
        }
    }
}
</script>