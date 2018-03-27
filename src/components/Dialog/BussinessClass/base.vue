/*
 * @Author: ShaXin 
 * @Date: 2018-01-29 10:22:07 
 * @Last Modified by: ShaXin
 * @Last Modified time: 2018-01-29 13:55:37
 */
<template>
  <!-- 弹窗 -->
    <el-dialog :title="diaTitle" :visible="visible" @close="close"  @keyup.enter.native='confirm()'>
          <el-form :model="typeForm" :rules="rules" ref="ruleForm">
            <el-form-item label="类别名称" :label-width="formLabelWidth" prop="name">
                <el-input v-model="typeForm.name" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="类别编码" :label-width="formLabelWidth" prop="code">
                <el-input v-model="typeForm.code" auto-complete="off"></el-input>
            </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
            <el-button @click="cancel()" class="ljt-btn pink-btn">取 消</el-button>
            <el-button type="primary" @click="confirm()" class="ljt-btn primary-btn">确 定</el-button>
        </div>
    </el-dialog>
</template>
<script>
import {
  createBizType,
  updateBizType,
  getBizTypeByCondition,
  getAllBizType
} from "@/api/org";
import OrgBusType from "@/model/OrgBusType";
import DialogOptions from "../DialogOptions";
import EditableObject from "@/model/base/EditableObject";
export default {
  data() {
    return {
      visible: false,
      typeForm: {},
      rules: {},
      formLabelWidth: "80px",
      diaTitle: "",
      currentia: "", // 页面传过来的数据name
      onClosed:function(){},
    };
  },
  mounted() {},
  methods: {
    // 打开弹窗
    open(v) {
      if (v.name == "bussinessmodify") {
        this.diaTitle = "业务类别维护修改";
        this.typeForm = v.data;
        this.setBus(this.typeForm);
      } else {
        this.diaTitle = "业务类别维护新增";
        this.setBus();
      }
      this.visible = true;
      this.currentDia = v.name;
    },

    close(option = DialogOptions.CLOSE,data,isEdit) {
      if(!this.visible) return;
      this.visible = false;
      if (typeof this.onClosed === "function") {
        let payload = {
          option,
          data,
          isEdit,
          sender: this
        };
        this.onClosed(payload);
      }
    },

    cancel() {
      // 取消
      this.$refs.ruleForm.resetFields();
      this.close(DialogOptions.CANCEL);
    },

    // 注意循环new
    setBus(orgbustype = new OrgBusType()) {
      this.typeForm = orgbustype;
      this.rules = {
        name: [
          {
            required: true,
            trigger: "blur",
            validator: orgbustype.validatorOf("name")
          }
        ],
        code: [
          {
            required: true,
            trigger: "blur",
            validator: orgbustype.validatorOf("code", orgbustype.code)
          }
        ]
      };
    },

    async confirm() {
      var _this = this;
      let valid = await this.$refs.ruleForm.validate();
      if (valid) {
        this.$store.commit("SHOW_WAITING");
        if (_this.currentDia == "bussinessAdd") {
          try {
            let res = await createBizType(_this.typeForm);
            this.$store.commit("CLOSE_WAITING");
            _this.$message({ type: "success", message: "新增成功" });
            _this.close(DialogOptions.CONFIRM,_this.typeForm);
          } catch (error) {
            this.$store.commit("CLOSE_WAITING");
            _this.$message.error("新增失败" + error);
          }
        } else {
          try {
            let res = await updateBizType(_this.typeForm);
            this.$store.commit("CLOSE_WAITING");
            _this.$message({ type: "success", message: "修改成功" });
            _this.close(DialogOptions.CONFIRM,_this.typeForm,true);
          } catch (error) {
            this.$store.commit("CLOSE_WAITING");
            _this.$message.error("修改失败" + error);
          }
        }
      } else {
        this.$store.commit("CLOSE_WAITING");
        this.$message.error("error");
        return false;
      }
    }
  }
};
</script>
