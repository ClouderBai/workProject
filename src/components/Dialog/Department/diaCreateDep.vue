/*
 * @Author: BaiChong 
 * @Date: 2018-01-27 11:07:00 
 * @Last Modified by: BAICHONG
 * @Last Modified time: 2018-02-11 17:12:48

    @desc   public methods:{
                open(){}
    }
 */
<template>
    <div class="bim-dialog1">
        <el-dialog :title="'新建'+type+'部门'" :visible="visible" @close="close">
            <div slot="header" class="plr20">
                <h2>新增用户</h2>
                <div class="line"></div>
            </div>
            <el-form :model="form" label-width="120px" :rules="rules" ref="ruleForm">
                <el-tabs v-model="active" type="card">
                    <el-tab-pane label="基本信息" name="first" class="tabContent">
                        <el-row>
                            <el-col :span="11">
                                <el-form-item label="部门名称:" prop="fullName">
                                    <el-input v-model="form.fullName" @change="getPinyin"></el-input>
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
                <!-- ljt-btn tiffany-btn -->
                <el-button class="" @click="cancel">取 消</el-button>
                <el-button class="ljt-btn primary-btn" @click="confirm">确 定</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
// 接口
import { createOrg, fetchMenuFromCache, fetchGetAll } from "@/api/org";
import DepartInfoDmnObj from "@/model/DepartInfoDmnObj";
import DepExtColDmnObj from "@/model/DepExtColDmnObj";
import DialogOptions from "@/components/Dialog/DialogOptions";
import { mapMutations } from "vuex";
import pinyin from "pinyin";
export default {
    computed: {
        type() {
            return this.currentId === -1 ? "根" : "子";
        }
    },
    data() {
        return {
            visible: false,
            onClosed: () => {},
            active: "first",
            orgExt: [], // 扩展信息
            levelTypeOpt: [], // 级别类型
            bizTypeOpt: [], // 业务类型
            stakeholderTypeOpt: [], // 部门属性
            form: {}, // 部门基本信息
            formLabelWidth: "100px",
            rules: {},
            currentId: -1
        };
    },
    methods: {
        // 全局等待
        ...mapMutations(["SHOW_WAITING", "CLOSE_WAITING"]),

        // public
        open(
            { flagType = 1, currentId = 0, data = new DepartInfoDmnObj() } = {
                flagType: 1,
                currentId: 0,
                data: new DepartInfoDmnObj()
            }
        ) {
            this.visible = true;
            data.flag = flagType; // 根部门 / 子部门
            this.currentId = currentId;
            data.parentId = currentId; // 选择的节点id
            this.form = data;
            // 获取选项数据
            fetchMenuFromCache().then(res => {
                this.levelTypeOpt = res.levelType;
                this.bizTypeOpt = res.bizType;
                this.stakeholderTypeOpt = res.stakeholderType;
            });
            // 获取扩展信息
            fetchGetAll().then(res => {
                this.orgExt = res;
            });
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
                levelType: [
                    {
                        required: true,
                        validator: data.validatorOf("levelType"),
                        trigger: "change"
                    }
                ],
                bizType: [
                    {
                        required: true,
                        validator: data.validatorOf("bizType"),
                        trigger: "change"
                    }
                ],
                pinyin: [
                    {
                        required: true,
                        validator: data.validatorOf("pinyin"),
                        trigger: "change"
                    }
                ],
                jianpin: [
                    {
                        required: true,
                        validator: data.validatorOf("jianpin"),
                        trigger: "change"
                    }
                ],
                stakeholderType: [
                    {
                        required: true,
                        validator: data.validatorOf("stakeholderType"),
                        trigger: "change"
                    }
                ],
                code: [
                    {
                        required: true,
                        validator: data.validatorOf("code"),
                        trigger: "blur"
                    }
                ]
            };
        },

        // 关闭回调
        close(option = DialogOptions.CLOSE) {
            if (!this.visible) return;
            this.visible = false;
            this.onClosed.call(this, { option, sender: this });
        },

        // 取消
        cancel() {
            this.close(DialogOptions.CANCEL);
        },

        // 提交回调
        confirm() {
            this.$refs.ruleForm.validate(valid => {
                console.log("" + JSON.stringify(this.form));
                if (valid) {
                    this.SHOW_WAITING();
                    createOrg(this.form, this.orgExt)
                        .then(res => {
                            this.$message.success("创建成功");
                            this.close(DialogOptions.CONFIRM);
                        })
                        .catch(err => {
                            this.$message.error("创建失败");
                        })
                        .finally(e => this.CLOSE_WAITING());
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
            })
                .join("")
                .toUpperCase();
            this.form.jianpin = pinyin(val, {
                style: pinyin.STYLE_FIRST_LETTER // 简拼
            })
                .join("")
                .toUpperCase();
        }
    }
};
// fullName = ""; // 部门全名
// name = ""; // 部门简称
// levelType = ""; // 级别类型
// bizType = ""; // 业务类型
// pinyin = ""; // 拼音全拼
// jianpin = ""; // 简拼
// stakeholderType = ""; // 部门属性
// code = ""; // 部门编码
// flag = null; // 1 根部门  0 子部门
// currentId = null;
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

