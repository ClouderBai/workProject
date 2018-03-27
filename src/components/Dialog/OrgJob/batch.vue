/*
 * @Author: BaiChong 
 * @Date: 2018-01-29 13:52:20 
 * @Last Modified by: BaiChong
 * @Last Modified time: 2018-02-01 17:56:29
 */
<template>
    <div >
        <el-dialog :visible="visible" @close="close">
            <div slot="title">
                <i class="el-icon-plus"></i>
                <span>新建岗位</span>
            </div>

            <job type="selection" checkedChange @checkedChange="checkedChange" @createPositionBatch></job>

            <div slot="footer" class="dialog-footer">
                <el-button @click="cancel">取消</el-button>
                <el-button  class="ljt-btn primary-btn" @click="confirm">确定</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
import { createPositionBatch } from '@/api/org'
import job from '../../Table/Job'
import diaOpt from '../DialogOptions'
import { mapMutations } from "vuex";
export default {
    name: "batch",
    components: {
        job
    },
    data() {
        return {
            visible: false,
            onClosed: () => { },
            currentId: null,
            data: []
        }
    },
    methods: {
        ...mapMutations([
            "SHOW_WAITING",
            "CLOSE_WAITING"
        ]),
        close(option = diaOpt.CLOSE, data) {
            if (!this.visible) return;
            this.visible = false;
            this.onClosed({ option, sender: this })
        },
        open({ currentId = 0 }) {
            this.visible = true;
            this.currentId = currentId;
        },
        cancel() {
            this.close(diaOpt.CANCEL)
        },
        confirm() {
            if (this.data.length === 0) {
                this.close(diaOpt.CONFIRM)
                return;
            };
            this.SHOW_WAITING();
            createPositionBatch(this.currentId, this.data)
                .then(res => {
                    this.close(diaOpt.CONFIRM)
                }).catch(e => {
                    this.$message.error('创建失败');
                    console.warn(`批量创建岗位失败${e}`);
                }).finally(e => this.CLOSE_WAITING())
        },

        // 多选选中的数据
        checkedChange(checked) {
            this.data = checked;
        }

    }
}
// const _import = require('./_import_' + process.env.NODE_ENV) 
</script>

<style>

</style>
