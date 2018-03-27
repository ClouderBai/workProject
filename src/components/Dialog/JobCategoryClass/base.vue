/*
 * @Author: ShaXin 
 * @Date: 2018-01-29 10:22:10 
 * @Last Modified by: ShaXin
 * @Last Modified time: 2018-01-29 13:57:02
 */
<template>
    <!-- 弹窗 -->
    <el-dialog :title='diaTitle' :visible="visible" @close="close()" @keyup.enter.native='confirm()'>
            <el-form :model="jobForm" :rules="rules" ref="ruleForm">
            <el-form-item label="类别名称" :label-width="formLabelWidth" prop="name">
                <el-input v-model="jobForm.name" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="类别编码" :label-width="formLabelWidth" prop="code">
                <el-input v-model="jobForm.code" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="分类" :label-width="formLabelWidth"  prop="category">
                <el-select v-model="jobForm.category" placeholder="请选择活动区域">
                    <el-option 
                        v-for="v in typeoptions" 
                        :key="v.id" 
                        :label="v.category" 
                        :value="v.category"></el-option>
                </el-select>
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
  createPositionType, // 新增
  updatePosition, // 修改
  fetchPositionMenuFromCache, // 岗位下拉菜单
  fetchAllPosition // 岗位类别table
} from "@/api/org";
import OrgJobType from "@/model/OrgJobType";
import DialogOptions from "../DialogOptions";
export default {
  data() {
    return {
      rules: {},
      jobForm: {},
      currentDia: "",
      diaTitle: "标题",
      visible: false, // 弹窗值
      formLabelWidth: "120px",
      typeoptions: [], // 选择分类
      onClosed:function(){},
      
    };
  },
  mounted() {
    this.init();
  },
  methods: {
    open(v) {
      if (v.name == "positionModify") {
        this.diaTitle = "岗位类别维护修改";
        this.jobForm = v.data;
        this.setJob(this.jobForm);
      } else {
        this.setJob();
        this.diaTitle = "岗位类别维护新增";
      }
      this.visible = true;
      this.currentDia = v.name;
    },
    init() {
      fetchPositionMenuFromCache().then(res => {
        this.typeoptions = res.orgTypeCache.positionCat;
      });
    },
    close(option = DialogOptions.CLOSE, data,isEdit) {
      if (!this.visible) return;
      if (typeof this.onClosed == "function") {
        let payload = {
          option,
          data,
          isEdit,
          sender: this
        };
        this.onClosed(payload);
      }
      this.visible = false;
    },
    // 关闭小弹窗
    cancel() {
      this.$refs.ruleForm.resetFields();
      this.close(DialogOptions.CANCEL);
    },
    // 注意循环new
    setJob(orgjobtype = new OrgJobType()) {
      this.jobForm = orgjobtype;
      this.rules = {
        name: [
          {
            required: true,
            trigger: "blur",
            validator: orgjobtype.validatorOf("name")
          }
        ],
        code: [
          {
            required: true,
            trigger: "blur",
            validator: orgjobtype.validatorOf("code", orgjobtype.code)
          }
        ],
        category: [
          {
            required: true,
            trigger: "change",
            validator: orgjobtype.validatorOf("category")
          }
        ]
      };
    },
    // 删除u
    del() {
      this.$confirm("此操作将删除该数据, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          var arr = [];
          for (var i = 0; i < this.multipleSelection.length; i++) {
            arr.push(this.multipleSelection[i].code);
          }
          var params = {
            codes: arr
          };
          deletePosition(arr)
            .then(res => {
              this.canModify = true;
              this.$message({
                message: "删除成功",
                type: "success"
              });
              this.init();
            })
            .catch(res => {
              this.$message({
                message: "删除失败 请稍后重试",
                type: "error"
              });
            });
        })
        .catch(() => {
          this.$message({ type: "info", message: "已取消删除" });
        });
    },
    // 提交
    async confirm() {
      var _this = this;
      let valid = await this.$refs.ruleForm.validate();
      if (valid) {
        if (_this.currentDia == "positionAdd") {
          try {
            let res = await createPositionType(_this.jobForm);
            _this.close(DialogOptions.CONFIRM,_this.jobForm);
            _this.$message({ type: "success", message: "新增成功" });
          } catch (error) {
            _this.$message.error("新增失败" + error);
            console.log("提交" + error);
          }
        } else {
          try {
            let res = await updatePosition(_this.jobForm);
            _this.close(DialogOptions.CONFIRM,_this.jobForm,true);
            _this.$message({ type: "success", message: "修改成功" });
          } catch (error) {
            _this.$message.error("修改失败" + error);
            console.log(error)
          }
        }
      } else {
        this.$message.error("error");
        return false;
      }
    },
  }
};
</script>
<style>

</style>
