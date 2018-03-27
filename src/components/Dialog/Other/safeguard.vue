/*
 * @Author: LiuJunTing 
 * @Date: 2018-02-02 13:37:55 
 * @Last Modified by: LiuJunTing
 * @Last Modified time: 2018-02-02 17:14:21
 */

/* 这是防止误操作的组件  需要输入特定值来确定执行某操作  用来在一些重要操作之前做校验  例如重置组织下所有用户密码 */

 /*
@method open(*String,*String) 打开模态框
@params (1) *title 模态框的标题  无默认值  所以请使用者一定要填写符合当前业务的标题
        (2) *condition 条件  用户需要输入与条件一致的值才能通过校验

@method close(String,Object) 关闭模态框
@params (1) option 模态框关闭状态
        (2) data 要载荷的自定义数据 

@method onClosed(*Object) 模态框点击确认按钮时关闭时回调方法
@params (1) *option  模态框关闭状态
            *sender  组件this指向
 */
<template>
    <div>
        <el-dialog :title="title" :visible="visible" @close="close()" width="30%" append-to-body>
            <div class="condition">
                <span v-for="(str,index) in conditionList" :key="index" :class="str === valueList[index]? 'success': 'error'">{{str}}</span>
            </div>
            <el-input v-model="value" :maxlength="conditionList.length"></el-input>
            <!-- 确认取消 -->
            <div slot="footer" class="dialog-footer">
                <el-button class="ljt-btn tiffany-btn" @click="cancel()">取 消</el-button>
                <el-button class="ljt-btn primary-btn" :disabled="disabled" @click="confirm()">确 定</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
import DialogOptions from "../DialogOptions";

export default {
    name: "safeguard",
    data() {
        return {
            visible: false,
            onClosed: function() {},
            title: "",
            condition: "",
            conditionList: [],
            value: ""
        };
    },

    computed: {
        valueList() {
            return [...this.value];
        },
        disabled() {
            return this.value != this.condition;
        }
    },

    methods: {
        open(title, condition) {
            if(!condition){
                console.warn("safeguard必须传入条件");
                return
            }
            this.title = title;
            this.condition = condition;
            this.conditionList = [...condition];
            this.visible = true;
        },

        close(option = DialogOptions.CLOSE, hold) {
            if (!this.visible) return;
            if (!hold) {
                this.visible = false;
                this.condition;
                this.conditionList = [];
                this.value = "";
            }
            if (typeof this.onClosed === "function") {
                let payload = {
                    option,
                    sender: this
                };
                this.onClosed(payload);
            }
        },

        confirm() {
            // 值不一样的时候按钮做了disabled处理  是不可点击的  所以这行判断没什么卵用  就当做是双保险吧
            if (this.value != this.condition) {
                this.$message.warning("请核对输入值");
                return;
            }
            this.close(DialogOptions.CONFIRM, true);
        },
        
        cancel() {
            this.close(DialogOptions.CANCEL);
        }
    }
};
</script>
 <style scoped>
.success {
    color: #409eff;
}
.error {
    color: #c03639;
}
.condition {
    background-color: #fff;
    color: #606266;
    height: 40px;
    line-height: 40px;
    padding: 0 15px;
    width: 100%;
}
</style>
