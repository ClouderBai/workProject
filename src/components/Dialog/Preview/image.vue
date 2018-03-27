<template>
    <div class="preview-container">
      <el-row>
        <el-col :span="24">
          <el-dialog :visible="visible" append-to-body @close="close" ref="filePreview">
            <div class="preview-img-box">
              <img width="50%" :src="fileObj.url" alt="">           
            </div>
            <span slot="footer" class="dialog-footer">
              <a :href="fileObj.url" :download="fileObj.name" class="down-btn">下 载</a>
            </span>
          </el-dialog>
        </el-col>
      </el-row>
    </div>
</template>

<script>
import DialogOptions from '@/components/Dialog/DialogOptions'
export default {
    name: 'imgPreview',
    data() {
        return {
            visible: false,
            onClosed() {},
            fileObj: {}
        }
    },
    methods: {
        open(file) {
            if (this.visible) return
            this.visible = true
            this.fileObj = file
        },
        close(option = DialogOptions.CLOSE, data) {
            if (!this.visible) return
            this.visible = false
            const payload = {
                option,
                data,
                sender: this
            }
            if (typeof this.onClosed === 'function') {
                this.onClosed.call(this, payload) // eslint-disable-line
            }
        },
        cancel() {
            this.close(DialogOptions.CANCEL)
        },
        confirm() {
            this.close(DialogOptions.CONFIRM)
        }
    }
}
</script>

<style lang="scss" scoped>
.preview-img-box {
    text-align: center;
    width: 100%;
}
.down-btn {
    display: inline-block;
    background-color: #409eff;
    border-color: 1px solid #dcdfe6;
    border-color: #409eff;
    color: #fff;
    font-size: 14px;
    padding: 10px 20px;
    font-weight: 500; 
    border-radius: 4px;
}
</style>