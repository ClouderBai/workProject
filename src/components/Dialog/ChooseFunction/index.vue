/*
 * @Author: BAICHONG 
 * @Date: 2018-03-14 10:36:05 
 * @Last Modified by: BAICHONG
 * @Last Modified time: 2018-03-22 13:53:28
 */
 /**
|--------------------------------------------------
| 标准菜单 => 类型选择功能类型,选择功能模块
| 
| 
| 
|--------------------------------------------------
*/
<template>
    <el-dialog
        title="请选择功能"
        :visible="DialogVisible"
        width="30%"
        center
    >
        <MenuTree ref="tree" chooseFunction @treeChange='treeChange'/>
        <span slot="footer" class="dialog-footer">
            <el-button @click="cancel">取 消</el-button>
            <el-button type="primary" @click="confirm">确 定</el-button>
        </span>
    </el-dialog>
</template>

<script>
import MenuTree from '../../Tree/FuncTree'
import Dialog from '../../Dialog/DialogOptions'
export default {
    components: {
        MenuTree
    },
    data() {
        return {
            onClosed: () => {},
            DialogVisible: false,
            selected: {}
        }
    },
    methods: {
        open(param) {
            this.DialogVisible = true
        },
        close(option = Dialog.CLOSE, data) {
            this.DialogVisible = false
            this.onClosed({ option, data, sender: this })
        },
        confirm() {
            // 如果没有选择节点提示
            if (!this.selected.id) {
                this.$message.warning(`请选择节点`)
                return true
            }
            this.close(Dialog.CONFIRM, this.selected)
        },
        cancel() {
            this.close(Dialog.CANCEL)
        },
        treeChange(val) {
            this.selected = val
        }
    }

}

</script>

<style scoped>

</style>
