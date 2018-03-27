/*
 * @Author: BaiChong 
 * @Date: 2018-01-27 18:26:52 
 * @Last Modified by: BaiChong
 * @Last Modified time: 2018-01-31 16:09:49
 */
<template>
    <div>
        <el-dialog :visible="visible" @close="close">
            <div slot="title">
                <i class="el-icon-plus"></i>
                <span>{{type}}岗位</span>
            </div>
            <el-form :rules="rules" :model="form" ref="ruleForm" label-width="120px">
                <el-row>
                    <el-col :span="11">
                        <el-form-item label="岗位名称:" prop="fullName">
                            <el-input v-model="form.fullName" @change="getPinyin"></el-input>
                        </el-form-item>
                        <el-form-item label="岗位简称:" prop="name">
                            <el-input v-model="form.name"></el-input>
                        </el-form-item>
                        <el-form-item label="岗位类别:" prop="levelType">
                            <el-select v-model="form.positionId" class="width-100">
                                <el-option v-for="item in positionOptions" :label="item.name" :value="item.id" :key="item.code"></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>

                    <el-col :span="11">
                        <el-form-item label="全拼:" prop="pinyin">
                            <el-input v-model="form.pinyin"></el-input>
                        </el-form-item>
                        <el-form-item label="简拼:" prop="jianpin">
                            <el-input v-model="form.jianpin"></el-input>
                        </el-form-item>
                        <el-form-item label="岗位编码:" prop="stakeholderType">
                            <el-input v-model="form.code"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="cancel">取消</el-button>
                <el-button type="primary" @click="confirm">确定</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
// 接口
import { fetchAllPosition, createPosition, updateOrgInfo } from '@/api/org'
import Job from '@/model/Job'
import DialogOptions from '@/components/Dialog/DialogOptions'
import { mapMutations } from "vuex";
import pinyin from "pinyin";

export default {
    name: "createJob",
    data() {
        return {
            visible: false,
            onClosed: () => { },
            positionOptions: [],
            rules: {},
            form: {},
            isPositionEdit: false,
            // fullName: '',//"string", 用户输入的
            //     name: '',//"string", 简称用户输入
            //     jianpin: '',//
            //     pinyin: '',//"string",// 走接口
            //     positionId: '',  //业务类型,
            //     code: '',  //"string",部门编码
            //     currentId: null, //当前节点id
        }
    },
    computed: {
        type() {
            return this.isPositionEdit ? '更新' : '新建'
        }
    },
    methods: {
        // 全局等待
        ...mapMutations([
            "SHOW_WAITING",
            "CLOSE_WAITING"
        ]),

        // 关闭回调
        close(option = DialogOptions.CLOSE, data) {
            if (!this.visible) return;
            this.visible = false;
            this.onClosed({ option, sender: this })
        },

        // public
        open({ currentId = 0, data = new Job(), isPositionEdit } = { currentId: 0, data: new Job() }) {
            this.visible = true;
            this.isPositionEdit = isPositionEdit;

            // data.currentId = currentId; // 选择的节点id
            data.parentId = currentId; // 选择的节点id
            this.form = data;
            if (this.positionOptions.length === 0) {
                fetchAllPosition().then(res => {
                    this.positionOptions = res;
                })
            }
            this.rules = {
                fullName: [
                    {
                        required: true,
                        validator: data.validatorOf("fullName"),
                        trigger: "blur"
                    }
                ],
                name: [
                    {
                        required: true,
                        validator: data.validatorOf("name"),
                        trigger: "blur"
                    }
                ],
                positionId: [
                    {
                        required: true,
                        validator: data.validatorOf("positionId"),
                        trigger: "change"
                    }
                ],
                pinyin: [
                    {
                        required: true,
                        validator: data.validatorOf("pinyin"),
                        trigger: "blur"
                    }
                ],
                jianpin: [
                    {
                        required: true,
                        validator: data.validatorOf("jianpin"),
                        trigger: "blur"
                    }
                ],
                code: [
                    {
                        required: true,
                        validator: data.validatorOf("code"),
                        trigger: "change"
                    }
                ]
            }
        },
        // 取消
        cancel() {
            this.close(DialogOptions.CANCEL)
        },

        // 提交回调
        confirm() {
            this.$refs.ruleForm.validate(valid => {
                if (valid) {
                    this.SHOW_WAITING();
                    if (this.isPositionEdit) {
                        updateOrgInfo(this.form, null)
                            .then(res => {
                                this.$message.success("更新成功");
                                this.close(DialogOptions.CONFIRM);
                            })
                            .catch(err => {
                                this.$message.error("更新失败");
                            })
                            .finally(e => this.CLOSE_WAITING());
                    } else {
                        createPosition(this.form)
                            .then(res => {
                                this.$message.success("创建成功");
                                this.close(DialogOptions.CONFIRM);
                            })
                            .catch(err => {
                                this.$message.error("创建失败");
                            })
                            .finally(e => this.CLOSE_WAITING());
                    }
                } else {
                    this.$message.warning("校验未通过");
                    return false;
                }
            });
        },
        // 输入的名字转成拼音
        getPinyin(val) {
            this.form.pinyin = pinyin(val, {
                style: pinyin.STYLE_NORMAL // 不带音标的全拼
            }).join("").toUpperCase()
            this.form.jianpin = pinyin(val, {
                style: pinyin.STYLE_FIRST_LETTER // 简拼
            }).join("").toUpperCase()
        },

    }
}
</script>

<style scoped>

</style>
