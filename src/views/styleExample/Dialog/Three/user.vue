<template>
   <!-- 块4 begin-->

            <!-- form表单 begin -->
            <!-- <el-col :span="16"> -->
             <div class="addContainer bim-dialog1">
                <el-dialog 
                title="form表单"
                :visible="visible"
                @close="close"
                >
                  <div slot="header" class="plr20">
                    <h2>新增用户</h2>
                    <!-- <div class="line"></div> -->
                  </div>

                  <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="120px">
                      
                  <template v-for="(item, index) in bimList3">
                      <!-- <div class="newline1111">   -->
              
                
                  <ul class="bimList3 clearfix ml20 mr20">
                      <el-tooltip class="item" effect="light" content="删除" placement="top-start">
                                 <i class="bimicon-roundclose"></i>

                                <!-- </el-button> -->
                            </el-tooltip>
                    <li>
                        <el-form-item label="姓名:" prop="message">
                            <el-input v-model="item.message"></el-input>
                        </el-form-item>
                    </li>
                    <li>
                        <el-form-item label="年龄:" prop="age">
                            <el-input v-model="item.age"></el-input>
                        </el-form-item>
                    </li>
                    <li>
                        <el-form-item label="性别:" prop="sex">
                            <el-input v-model="item.sex"></el-input>
                        </el-form-item>
                    </li>
                    <li>
                        <el-form-item label="电话:" prop="number">
                            <el-input v-model="item.number"></el-input>
                        </el-form-item>
                    </li>

                </ul>
                
                <!-- </div>  -->
                </template>

                <div style="clear:both"></div>
                <div class="addbtn tac mt20 mb20">
                    <el-tooltip class="item" effect="light" content="添加" placement="top-start">
                        <el-button size="medium" class='reset-btn' icon="bimicon-friendadd" @click="openDetail"></el-button>
                <!-- </el-button> -->
                        </el-tooltip>
                </div>
               
                <!-- <div style="clear:both"></div>
                <div class="online mt15"></div>
                <div class="editorbtn tac mt20">
                    <el-button @click="cancel" class="mlr10">取消</el-button>
                    <el-button type="primary" class="mlr10" @click="confirm">确定</el-button>
                </div> -->

                </el-form>
                <div slot="footer" class="dialog-footer">
                        <el-button class="ljt-btn tiffany-btn" @click="cancel()">取 消</el-button>
                        <el-button class="ljt-btn primary-btn" @click="confirm()">确 定</el-button>
                </div>
                
            </el-dialog>
        </div>            
            <!-- form表单 end -->
            <!-- 块4 end -->

</template>
<script>
export default {
    name: 'threeUser',
    data() {
        return {

            visible: false,
            ruleForm: {},
            onClosed: function() {},
            ruleForm: {
                name: '',
                number: '',
                sex: '',
                reorder: '',
                ID: '',
                jianpin: '',
                education: '',
                level: '',
                job: '',
                quanpin: '',
                birthday: '',
                technical: '',
                contactphone: '',
                type: '',
                address: '',
                station: ''
            },
            rules: {
                name: [
                    { required: true, message: '请输入姓名', trigger: 'blur' },
                    { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
                ],
                number: [
                    { required: true, message: '请输入电话号码', trigger: 'blur' }
                ],
                sex: [
                    { required: true, message: '请输入性别', trigger: 'blur' }
                ],
                ID: [
                    { required: true, message: '请输入身份证号码', trigger: 'blur' }
                ],
                address: [
                    { required: true, message: '请输入电话号码', trigger: 'blur' }
                ]
            },
            bimList3: [
                { message: 'Foo', age: 18, sex: '男', number: 15122222222 }
                // { message: 'Bar', age: 20 ,sex:'女',number:151666666666}
            ]

        }
    },
    methods: {
        open(option) {
            if (this.visible) return // 如果visible为true 返回，避免重复调用此函数
            this.visible = true
            console.log(111)
        },
        cancel() {
            this.close('cancel')
        },
        close(option = close, data) {
            if (!this.visible) return
            this.visible = false
            this.onClosed({ option, sender: this })
        },
        confirm() {
            // success callback  this.close('confirm' , data)
            //

        },
        init() {
            this.openDetail()
        },
        // 添加用户材料
        openDetail() {
            const item = { message: 'Foo', age: 18, sex: '男', number: 15122222222 }
            //    const item = { message: 'Bar', age: 20 ,sex:'女',number:151666666666}
            this.bimList3.push(item)
        },
        remove(index, type) {}
    }

}
</script>
<style scoped>
   
</style>

