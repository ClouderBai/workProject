<template>
  <div class="e2-container">
    <el-card class="box-card" style="width:800px;margin:0 auto;">
        <el-form :model="user" :rules="rules" ref="form" label-width="120px">
            <el-row>
                <el-col :span="16">
                    <el-form-item label="用户名:" prop="name">
                        <el-input v-model="user.name"></el-input>
                    </el-form-item>
                    <el-form-item label="手机号:" prop="mobile">
                        <el-input v-model="user.mobile"></el-input>
                    </el-form-item>
                    <el-form-item label="性别:" prop="">
                        <el-input v-model="user.gender"></el-input>
                    </el-form-item>
                </el-col>
                 <el-col :span="8" style="text-align:center;vertical-align:middle;">
                     <img :src="user.avatarUri" width="150" height="150" alt="头像">
                </el-col>
            </el-row>
            <el-form-item label="头像地址:" prop="">
                <el-input v-model="user.avatarUri"></el-input>
            </el-form-item>
            <el-form-item label="员工id:" prop="">
                <el-input v-model="user.staffNo"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="onSubmit">确定</el-button>
                <el-button @click="onCancel">取消</el-button>
            </el-form-item>
        </el-form>
    </el-card>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import User from "../../model/User";

export default {
  name: "e2",
  data() {
    var user = new User();
    user.name = "vue";
    user.mobile = "13262629698";
    user.avatarUri = "http://localhost:9528/src/assets/404_images/404.png";
    user.gender = "男";
    user.staffNo = "007";

    return {
      user: user,
      rules: {
        name: [
            { required: true, trigger: "blur", validator: user.validatorOf("name") }
        ],
        mobile: [
            { required: true, trigger: "blur", validator: user.validatorOf("mobile") }
        ]
      },
      datePickerStyle: {
        width: "100%"
      }
    };
  },
  computed: {
    ...mapGetters(["name", "roles"])
  },
  created: function() {
    this.user.beginEdit();
  },
  methods: {
    onSubmit() {
      this.user.endEdit();
    },
    onCancel() {
      this.user.cancelEdit();
    }
  }
};
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.e2 {
  &-container {
    margin: 30px;
  }
  &-text {
    font-size: 30px;
    line-height: 46px;
  }
}
</style>
