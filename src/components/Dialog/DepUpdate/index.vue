/*
 * @Author: BaiChong 
 * @Date: 2018-01-27 11:07:00 
 * @Last Modified by: BaiChong
 * @Last Modified time: 2018-02-04 09:44:25

    @desc   public methods:{
                open(){}
    }
 */
<template>
    <div>
        <el-dialog :visible="visible" @close="close">
            <div slot="title">
                <i class="el-icon-plus"></i>
                <span>修改部门信息</span>
            </div>

            <el-form :model="form" label-width="120px" :rules="rules" ref="ruleForm">
                <el-tabs v-model="active" type="card">
                    <el-tab-pane label="基本信息" name="first" class="tabContent">
                        <el-row>
                            <el-col :span="11">
                                <el-form-item label="部门名称:" prop="fullName">
                                    <el-input v-model="form.fullName"></el-input>
                                </el-form-item>
                                <el-form-item label="部门简称" prop="name">
                                    <el-input v-model="form.name"></el-input>
                                </el-form-item>
                                <el-form-item label="级别类型" prop="levelType">
                                    <el-select v-model="form.levelType" style="width:100%">
                                        <el-option v-for="item in levelTypeOpt" :label="item.name" :key="item.code" :value="item.code"></el-option>
                                    </el-select>
                                </el-form-item>
                                <el-form-item label="业务类型" prop="bizType">
                                    <el-select v-model="form.bizType" style="width:100%">
                                        <el-option v-for="item in bizTypeOpt" :label="item.name" :key="item.code" :value="item.code"></el-option>
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
                                <el-form-item label="部门属性" prop="stakeholderType">
                                    <el-select v-model="form.stakeholderType" style="width:100%">
                                        <el-option v-for="item in stakeholderTypeOpt" :label="item.name" :key="item.code" :value="item.code"></el-option>
                                    </el-select>
                                </el-form-item>
                                <el-form-item label="部门编码:" prop="code">
                                    <el-input v-model="form.code"></el-input>
                                </el-form-item>
                            </el-col>
                        </el-row>
                    </el-tab-pane>

                    <el-tab-pane label="扩展信息" name="second" class="tabContent">
                        <el-form-item v-for="item in orgExt" :key="item.id" :label="item.colName">
                            <el-input v-model="item.data" class="secondPaneInput"></el-input>
                        </el-form-item>
                    </el-tab-pane>
                </el-tabs>
            </el-form>

            <div slot="footer" class="dialog-footer">
                <!--  class="ljt-btn tiffany-btn" -->
                <el-button @click="cancel">取 消</el-button>
                <el-button class="ljt-btn primary-btn" @click="confirm">确 定</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
// 接口
import { fetchMenuFromCache, updateOrgInfo } from "@/api/org";
import DepartInfoDmnObj from "@/model/DepartInfoDmnObj";
import DepExtColDmnObj from "@/model/DepExtColDmnObj";
import DialogOptions from '@/components/Dialog/DialogOptions'
import { mapMutations } from "vuex";



export default {
    data() {
        return {
            visible: false,
            onClosed: () => { },
            active: "first",
            orgExt: [], // 扩展信息
            levelTypeOpt: [],// 级别类型
            bizTypeOpt: [],// 业务类型
            stakeholderTypeOpt: [],// 部门属性
            form: {}, // 部门基本信息
            formLabelWidth: "100px",
            rules: {}
        };
    },
    methods: {
        // 全局等待
        ...mapMutations([
            "SHOW_WAITING",
            "CLOSE_WAITING"
        ]),

        // public
        open({ orgInfo, currentId = 0 }) {
            this.visible = true;
            orgInfo.departInfoDmnObj.beginEdit()
            // 获取选项数据
            fetchMenuFromCache().then(res => {
                this.levelTypeOpt = res.levelType;
                this.bizTypeOpt = res.bizType;
                this.stakeholderTypeOpt = res.stakeholderType;
            });
            this.form = orgInfo.departInfoDmnObj;
            this.orgExt = orgInfo.orgExtColDmnObjList
            this.rules = {
                fullName: [
                    {
                        required: true,
                        validator: orgInfo.departInfoDmnObj.validatorOf("fullName"),
                        trigger: "blur"
                    }
                ],
                name: [
                    {
                        required: true,
                        validator: orgInfo.departInfoDmnObj.validatorOf("name"),
                        trigger: "blur"
                    }
                ],
                levelType: [
                    {
                        required: true,
                        validator: orgInfo.departInfoDmnObj.validatorOf("levelType"),
                        trigger: "change"
                    }
                ],
                bizType: [
                    {
                        required: true,
                        validator: orgInfo.departInfoDmnObj.validatorOf("bizType"),
                        trigger: "change"
                    }
                ],
                pinyin: [
                    {
                        required: true,
                        validator: orgInfo.departInfoDmnObj.validatorOf("pinyin"),
                        trigger: "change"
                    }
                ],
                jianpin: [
                    {
                        required: true,
                        validator: orgInfo.departInfoDmnObj.validatorOf("jianpin"),
                        trigger: "change"
                    }
                ],
                stakeholderType: [
                    {
                        required: true,
                        validator: orgInfo.departInfoDmnObj.validatorOf("stakeholderType"),
                        trigger: "change"
                    }
                ],
                code: [
                    {
                        required: true,
                        validator: orgInfo.departInfoDmnObj.validatorOf("code"),
                        trigger: "blur"
                    }
                ]
            }
        },

        // 关闭回调
        close(option = DialogOptions.CLOSE, data) {
            if (!this.visible) return;
            this.visible = false;
            this.onClosed({ option, sender: this })
            this.form.cancelEdit();
        },

        // 取消
        cancel() {
            this.close(DialogOptions.CANCEL);

        },

        // 提交回调
        confirm() {
            this.$refs.ruleForm.validate(valid => {
                if (valid) {
                    this.SHOW_WAITING();
                    updateOrgInfo(this.form, this.orgExt)
                        .then(res => {
                            this.form.endEdit();
                            this.$message.success("修改成功");
                            this.close(DialogOptions.CONFIRM);
                        })
                        .catch(err => {
                            this.$message.error("修改失败");
                        })
                        .finally(e => this.CLOSE_WAITING());
                } else {
                    this.$message.warning("校验未通过");
                    return false;
                }
            });
        },
    }
};
</script>

<style scoped>
.tabContent {
    height: 250px;
    overflow-y: auto;
}
.secondPaneInput {
    width: 45%;
}
</style>

