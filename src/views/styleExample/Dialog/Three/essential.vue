<template>
    <!-- 块4 begin-->
    <!-- form表单 begin -->
    <div class="addContainer bim-dialog1">
        <el-dialog 
        title="新增用户"
        :visible="visible"
        @close="close"
        >
        <div slot="header" class="plr20">
            <h2>新增用户</h2>
        </div>
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="120px" >                     
            <ul class="bimList4 clearfix ml20 mr20" >
                <li class="float">
                    <el-form-item label="姓名:" prop="name" class="">
                    <el-input v-model="ruleForm.name"></el-input>
                    </el-form-item>
                </li>                               
                <!-- upload-start -->
                <li class="float" style="float:right">
                <div class="uploadbtn tac mt20">
                    <el-tooltip class="item" effect="light" content="添加" placement="top-start">
                    <el-button size="medium" class='revise-btn' icon="bimicon-friendadd" @click="openDetail"></el-button>
                    </el-tooltip>
                </div>
                </li>                  
                <!-- upload-end -->
                <li class="float">
                    <el-form-item label="电话:" prop="number">
                    <el-input v-model="ruleForm.number"></el-input>
                    </el-form-item> 
                </li>
                <li class="float">
                    <el-form-item label="性别:" prop="sex">
                    <el-input v-model="ruleForm.sex"></el-input>
                    </el-form-item>  
                </li>                   
                <li class="float">
                    <el-form-item label="排序:" prop=" reorder">
                    <el-input v-model="ruleForm. reorder"></el-input>
                    </el-form-item> 
                </li>
                <li class="float">
                    <el-form-item label="身份证号:" prop="ID">
                    <el-input v-model="ruleForm.ID"></el-input>
                    </el-form-item>
                </li>
                <li class="float">
                    <el-form-item label="简拼:" prop="jianpin">
                    <el-input v-model="ruleForm.jianpin"></el-input>
                    </el-form-item>
                </li>
                <li class="float">
                    <el-form-item label="文化程度:" prop="education">
                    <el-input v-model="ruleForm.education"></el-input>
                    </el-form-item> 
                </li>
            
                <li class="float">
                    <el-form-item label="级别类型:" prop="level">
                    <el-input v-model="ruleForm.level"></el-input>
                    </el-form-item>  
                </li>
                <li class="float">
                    <el-form-item label="职务:" prop="job">
                    <el-input v-model="ruleForm.job"></el-input>
                    </el-form-item> 
                </li>
                <li class="float">
                    <el-form-item label="全拼:" prop="quanpin">
                    <el-input v-model="ruleForm.quanpin"></el-input>
                    </el-form-item> 
                </li>
                <li class="float">
                    <el-form-item label="出生日期:" prop="birthday">
                    <el-input v-model="ruleForm.birthday"></el-input>
                    </el-form-item> 
                </li>
                <li class="float">
                    <el-form-item label="职称:" prop=" technical">
                    <el-input v-model="ruleForm. technical"></el-input>
                    </el-form-item>  
                </li>
                <li class="float">
                    <el-form-item label="紧急联系人电话:" prop="contactphone">
                    <el-input v-model="ruleForm.contactphone"></el-input>
                    </el-form-item> 
                </li>
                <li class="float">
                    <el-form-item label="用户类型:" prop="type">
                    <el-input v-model="ruleForm.type"></el-input>
                    </el-form-item>
                </li>
                <li class="float">
                    <el-form-item label="住址:" prop="address">
                    <el-input v-model="ruleForm.address"></el-input>
                    </el-form-item> 
                </li>
                <li class="float">
                    <el-form-item label="岗位:" prop="station">
                    <el-input v-model="ruleForm.station"></el-input>
                    </el-form-item> 
                </li>
            </ul>  
                <!-- <div style="clear:both"></div>
                <div class="online mt15"></div>
                <div class="editorbtn tac mt20">
                    <el-button @click="cancel" class="mlr10">取消</el-button>
                    <el-button type="primary" class="mlr10" @click="confirm">确定</el-button>
                </div>    class="ljt-btn tiffany-btn" class="ljt-btn primary-btn"-->
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
    name: 'threeBase',
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
            }

        }
    },
    methods: {
        openDetail() {

        },
        open(option) {
            if (this.visible) return
            this.visible = true
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

        }
    }

}
</script>
<style scoped>
   
</style>

