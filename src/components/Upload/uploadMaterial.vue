/*
 * @Author: zhanglianhao 
 * @Date: 2018-03-12 09:29:14 
 * @Last Modified by: zhanglianhao
 * @Last Modified time: 2018-03-20 17:28:12
 */
 
/*
|--------------------------------------------------
| 上传文件组件
|--------------------------------------------------
*/
<template>
    <div class="upload-materials">
        <el-row>
            <el-col :span="24">
                <el-upload
                    class="upload-demo" 
                    ref="uploadMaterial" 
                    action="" 
                    :limit='1' 
                    :auto-upload="true" 
                    :before-upload="beforeUpload"
                    :on-exceed='uploadOverrun' 
                    :on-remove="onRemove"
                    :http-request='submitUpload'
                    :file-list="fileList" 
                    :on-preview="filePreview">  
                    <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
                    <span slot="tip" style="margin-left:10px;">文件大小不超过500M</span>
                </el-upload> 

                <!-- dialog-start -->
                <img-preview ref="imgPreview"></img-preview>
                <!-- dialog-end -->
            </el-col>
        </el-row>
    </div>
</template>

<script>
import FileTypes from '@/components/Dialog/Preview/FileTypes'
import { fileType } from '@/utils'
import imgPreview from '@/components/Dialog/Preview/image'

export default {
    name: 'uploadMaterial',
    components: {
        imgPreview
    },
    props: ['fileList'],
    data() {
        return {}
    },
    methods: {
        // 超过文件个数提示
        uploadOverrun() {
            this.$message.error('上传文件个数超出限制，最多上传 1 张图片！')
            return false
        },
        // 限制文件大小
        beforeUpload(file) {
            const isLt500M = file.size / 1024 / 1024 < 500
            if (!isLt500M) {
                this.$message.error('上传头像文件大小不能超过 500MB！')
            }
            return isLt500M
        },
        // 文件预览
        filePreview(file) {
            // 判断文件类型
            if (fileType(file.name) === FileTypes.IMAGE) {
                this.fileObj = file
                this.$refs['imgPreview'].open(file)
                return
            }
        },
        // 上传材料
        async submitUpload(file) {
            this.$emit('submitUpload', file)
        },
        // 删除文件
        async onRemove(file, fileList) {
            try {
                await this.$confirm('此操作将永久删除该节点, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                })
            } catch (e) {
                fileList.splice(file.index, 0, file) // 显示当前显示的文件
            }
        },
        clear() {
            this.$refs['uploadMaterial'].clearFiles()
        }
    }
}
</script>

<style>
.upload-aterials .upload-demo .el-upload {
    width: 80px;
}
</style>

