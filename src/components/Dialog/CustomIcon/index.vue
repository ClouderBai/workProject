/*
 * @Author: BAICHONG 
 * @Date: 2018-03-13 13:45:22 
 * @Last Modified by: BAICHONG
 * @Last Modified time: 2018-03-22 13:48:04
 */
 /**
|--------------------------------------------------
| 自定义图标dialog弹窗
| 
|--------------------------------------------------
*/
<template>
    <el-dialog
        title="提示"
        :visible="dialogVisible"
        width="60%"
    >
        <template>
            <div class="icon-container">
                <span v-for="item in data" :key="item" class="item">
                    <i :class="item" @click="selectIcon(item)" :key="item"/>
                </span>
            </div>
        </template>
        <span slot="footer" class="dialog-footer">
            
            <el-col :span="6" :offset="6">
                <div class="block-container">
                    <span style="vertical-align:middle;line-height: 28px;">请选择颜色: </span>
                    <el-color-picker v-model="color" size="mini" style="vertical-align:middle"></el-color-picker>
                </div>
            </el-col>
            <el-col :span="4">
                <div class="block-container">
                    <span class="item">
                        <span v-if="!selected" style="line-height: 28px">点击图标预览</span>
                        <i :class="selected" :style="{color:color}"  style="line-height: 28px"/>
                    </span>
                </div>
            </el-col>
            <el-button @click="cancel" size="mini">取 消</el-button>
            <el-button type="primary" @click="confirm" size="mini">确 定</el-button>
        </span>
    </el-dialog>
</template>

<script>
import IconData from './IconData'
import Dialog from '../DialogOptions'
export default {
    data() {
        return {
            onClosed: () => {},
            dialogVisible: false,
            data: IconData,
            color: '#626066',
            selected: ''
        }
    },
    methods: {
        // 打开
        open() {
            this.dialogVisible = true
        },

        // 关闭
        close(option = Dialog.CLOSE, data) {
            this.dialogVisible = false
            this.onClosed({ option, data })
        },

        // 确认按钮
        confirm() {
            if (!this.selected) {
                this.$message.warning(`请选择图标`)
                return
            } // 未选择无法点击确认
            this.close(Dialog.CONFIRM, { icon: this.selected, color: this.color })
        },

        // 取消按钮
        cancel() {
            this.close(Dialog.CANCEL)
        },

        // 选中图标事件
        selectIcon(item) {
            this.selected = item
        },

        //
        handleClose() {

        }
    }
}

</script>

<style lang="scss" scoped>
.icon-container {
    display: flex;
    flex-flow: row wrap;
    height: 430px;
    overflow: auto;
    .item {
        padding: 15px;
        i{
            font-size: 35px;
        }
    }
}
.block-container {
    display: flex;
    -ms-flex-item-align: center;
    justify-content: center;
    .item {
        i {
            font-size: 30px;
        }
    }
}

</style>

