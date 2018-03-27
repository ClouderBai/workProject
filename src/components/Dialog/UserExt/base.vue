/*
 * @Author: LiuJunTing 
 * @Date: 2018-01-26 09:29:56 
 * @Last Modified by: LiuJunTing
 * @Last Modified time: 2018-02-13 10:34:23
 */

/*
@method open 打开模态框
@param {Object}
    (1) title  模态框标题
 
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
                <el-form-item label="属性名称" prop="colName">
                    <el-input v-model="submitData.colName"></el-input>
                </el-form-item>
                <el-form-item label="属性类型" prop="colType">
                    <el-select v-model="submitData.colType" placeholder="请选择属性类型">
                        <el-option v-for="item in indicatorType" :key="item.value" :label="item.label" :value="item.value"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="属性排序" prop="order">
                    <el-input v-model="submitData.order"></el-input>
                </el-form-item>
                <el-form-item label="是否启用" prop="valid">
                    <el-switch v-model="submitData.valid"></el-switch>
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
import { createUserExt } from '@/api/user'
import UserExt from '@/model/UserExt'
import { filterSelect } from '@/utils/index' // 过滤select

export default {
    name: 'userExtBase',
    data() {
        return {
            visible: false,
            onClosed: function() {},
            title: '',
            submitData: {},
            rules: {},
            resData: null
        }
    },

    computed: {
        indicatorType() {
            return filterSelect(
                this.$store.getters.mappingCfg[
                    'material.maintain.monitorIndicatorTypeOptions'
                ]
            )
        }
    },

    methods: {
        open(
            { title } = {
                title
            }
        ) {
            if (this.visible) return
            this.title = title || '新增扩展属性'
            this.submitData = new UserExt()
            this.rules = {
                colName: [
                    {
                        required: true,
                        trigger: 'blur',
                        validator: this.submitData.validatorOf('colName')
                    }
                ],
                colType: [
                    {
                        required: true,
                        trigger: 'change',
                        validator: this.submitData.validatorOf('colType')
                    }
                ],
                order: [
                    {
                        required: true,
                        trigger: 'blur',
                        validator: this.submitData.validatorOf('order')
                    }
                ]
            }
            this.visible = true
        },
        close(option = DialogOptions.CLOSE) {
            if (!this.visible) return
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
            this.create()
        },
        cancel() {
            this.close(DialogOptions.CANCEL)
        },
        // 提交新增属性扩展
        async create() {
            try {
                const valid = await this.$refs.form.validate()
                if (valid) {
                    try {
                        this.$store.commit('SHOW_WAITING')
                        this.resData = await createUserExt(this.submitData)
                        this.$message({ type: 'success', message: '新增成功' })
                        this.close(DialogOptions.CONFIRM)
                    } catch (error) {
                        console.warn(
                            `新增属性扩展Error:${JSON.stringify(error)}`
                        )
                        this.$message.error('新增失败')
                    } finally {
                        this.$store.commit('CLOSE_WAITING')
                    }
                }
            } catch (error) {} // eslint-disable-line
        }
    }
}
</script>