/*
 * @Author: zhanglianhao 
 * @Date: 2018-03-12 09:29:07 
 * @Last Modified by: zhanglianhao
 * @Last Modified time: 2018-03-20 17:27:57
 */

/*
|--------------------------------------------------
| 上传头像组件
|--------------------------------------------------
*/

<template>
    <div class="upload-avatar">
        <el-row>
            <el-col :span="24">
                <el-upload
                    ref="uploadAvatar" 
                    class="avatar-uploader"
                    action="" 
                    :show-file-list="false"
                    :on-success="handleAvatarSuccess"
                    :before-upload="beforeAvatarUpload"
                    :http-request='submitUpload'>
                    <img v-if="imageUrl" :src="imageUrl" class="avatar">
                    <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                </el-upload>
            </el-col>
        </el-row>
    </div>
</template>

<script>
import { uploadAvatar } from '@/api/user'
export default {
    name: 'uploadAvatar',
    props: {
        avatarUrl: {
            type: String,
            default: ''
        }
    },
    data() {
        return {
            url: this.avatarUrl
        }
    },
    computed: {
        imageUrl: {
            get: function() {
                return this.avatarUrl
            },
            set: function(newVal) {
                this.avatarUrl = newVal
            }
        }
    },
    methods: {
        handleAvatarSuccess(response, file, fileList) {
            this.imageUrl = URL.createObjectURL(file.raw)
        },
        beforeAvatarUpload(file) {
            // 判断图片类型和大小
            const isIMAGE = file.type === 'image/jpeg' || file.type === 'image/png'
            const isLt2M = file.size / 1024 / 1024 < 2

            if (!isIMAGE) {
                this.$message.error('上传头像图片只能是 jpg 或者 png 格式！')
            }
            if (!isLt2M) {
                this.$message.error('上传头像图片大小不能超过 2MB！')
            }
            return isIMAGE && isLt2M
        },
        // 上传头像
        async submitUpload(content) {
            const formData = new FormData()
            formData.append('avatar', content.file)

            try {
                const res = await uploadAvatar(null, formData)
                this.$emit('getUrl', res) // 发出url
                this.$message.success('上传成功')
            } catch (error) {
                console.warn(`上传材料：${error}`)
            }
        },
        clear() {
            this.$refs['uploadAvatar'].clearFiles()
        }
    }
}
</script>

<style>
.upload-avatar .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
}
.upload-avatar .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
}
.upload-avatar .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 170px;
    height: 170px;
    line-height: 170px;
    text-align: center;
}
.upload-avatar .avatar {
    width: 160px;
    height: 160px;
    display: block;
}
</style>
