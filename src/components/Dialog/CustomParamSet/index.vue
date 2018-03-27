/*
 * @Author: BAICHONG 
 * @Date: 2018-03-13 13:30:41 
 * @Last Modified by: BAICHONG
 * @Last Modified time: 2018-03-22 13:56:58
 */
 /**
|--------------------------------------------------
| 自定义参数设置, 
| 
| id=1&name=aa' 显示为  [{key: id, value: 1},{key:name, value: aa}]
| 
|--------------------------------------------------
*/
<template>
    <el-dialog title="自定义参数" :visible="dialogVisible" width="25%" >
        <!-- 内层Dialog -->
        <el-dialog
            width="25%"
            title="添加参数"
            :visible.sync="innerVisible"
            append-to-body
        >
            <el-form ref="form" :rules="rules" :inline="true" :model="form" label-width="0">
                <el-form-item prop="key" style="width:45%">
                    <el-input v-model="form.key" size="mini" placeholder="key"></el-input>
                </el-form-item>
                <el-form-item prop="value" style="width:45%">
                    <el-input v-model="form.value" size="mini" placeholder="value"></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer">
                <el-button @click="innerDiaCancel" size="mini">取消</el-button>
                <el-button @click="innerDiaConfirm" type="primary" size="mini">确定</el-button>
            </span>
        </el-dialog>
        <!-- 参数列表 -->
        <el-table
            :data="tableData"
            height='250'
        >   

            <el-table-column label="key" width="100">
                <template slot-scope="scope">
                    <span style="margin-left: 10px">{{ scope.row.key }}</span>
                </template>
            </el-table-column>

            <el-table-column label="value" width="100">
                <template slot-scope="scope">
                    <div slot="reference" class="name-wrapper">
                            {{ scope.row.value }}
                    </div>
                    </el-popover>
                </template>
            </el-table-column>
            
            <el-table-column label="操作">
                <template slot-scope="scope">
                    <el-button size="mini" type="text" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
                </template>
            </el-table-column>

        </el-table>
        <!-- 点击增加参数 -->
        <div style="text-align:center;"><el-button @click="addParams" type="text" icon="el-icon-plus"/></div>
        <!-- footer -->
        <span slot="footer" class="dialog-footer">
            <el-button @click="cancel" size="mini">取 消</el-button>
            <el-button type="primary" size="mini" @click="confirm">确 定</el-button>
        </span>
    </el-dialog>
</template>

<script>

import Dialog from '../DialogOptions'
import { arrObjToStr, strToArrObj } from '../../../utils'
export default {
    // props: {
    //     customParams: {
    //         type: String
    //     }
    // },
    // computed: {
    //     tableData() {
    //         return strToArrObj(this.customParams)
    //     }
    // },
    data() {
        return {// pid=23&abc=344 {pid:23,abc:344}
            onClosed: () => {},
            dialogVisible: false,
            tableData: [],
            innerVisible: false, // 内层Dialog
            form: {
                key: '',
                value: ''
            },
            rules: {
                key: [{ required: true, message: '请输入key', trigger: 'blur' }],
                value: [{ required: true, message: '请输入value', trigger: 'blur' }]
            }
        }
    },

    methods: {
        confirm() {
            console.log('%c%s', 'color:red;font-size:20px', 'this.tableData  : ', this.tableData)
            this.close(Dialog.CONFIRM)
        },
        cancel() {
            this.close(Dialog.CANCEL)
        },
        // 打开模态框
        open(param) {
            this.dialogVisible = true
            if (!param) { this.tableData = []; return }
            this.tableData = strToArrObj(param)
        },

        // 关闭模态框
        close(option = Dialog.CLOSE) {
            this.dialogVisible = false
            this.onClosed({ data: arrObjToStr(this.tableData), sender: this, option })
        },

        // 处理删除键值对
        handleDelete(index, row) {
            this.tableData.splice(index, 1)
        },
        // 添加参数
        addParams() {
            // this.$refs.form.resetFields()
            this.form.key = ''
            this.form.value = ''
            this.innerVisible = true
        },
        // 内层Dialog确定
        innerDiaConfirm() {
            this.$refs.form.validate(valid => {
                if (valid) {
                    this.tableData.push(Object.assign({}, this.form))
                    this.innerVisible = false
                } else {
                    this.$message.warning(`添加失败`)
                }
            })
        },
        // 内层Dialog取消
        innerDiaCancel() {
            this.innerVisible = false
        }
    }
}
</script>