/*
 * @Author: zhanglianhao 
 * @Date: 2018-03-16 11:43:31 
 * @Last Modified by: zhanglianhao
 * @Last Modified time: 2018-03-21 10:04:09
 */
 
/**
|--------------------------------------------------
| 导入文件
| 外部调用 importData 方法  
| 外部通过 props 
|           uploadApi 传入上传文件api名称
|           validatorApi 传入校验api名称
|--------------------------------------------------
*/
<template>
    <div class="upload-container">
        <el-upload 
            class="upload-demo none" 
            action="" 
            :show-file-list="false"
            :http-request="handleHttpRequest"
            auto-upload>
            <el-button size="small" type="primary" id="importBtn" >导入</el-button>
        </el-upload>
    </div>
</template>

<script>
export default {
    name: 'importData',
    props: {
        // 导入数据 api
        uploadApi: {
            type: Function,
            default: ''
        },
        // 校验 api
        validatorApi: {
            type: Function,
            default: () => false
        }
    },
    data() {
        return {
            uploadBtn: ''
        }
    },
    mounted() {
        this.uploadBtn = document.getElementById('importBtn')
    },
    methods: {
        async handleHttpRequest(fileObj) {
            try {
                const formData = new FormData()
                formData.append('file', fileObj.file)
                const res = await this.uploadApi(formData)
                this.$message.success('导入成功! ')
                this.$emit('refresh', res) // 暴露刷新方法
            } catch (e) {
                this.$message.error('导入失败! ')
                console.warn(`上传导入文件: ${JSON.stringify(e)}`)
            }
        },
        async importData() {
            // 判断上传文件之前是否需要校验
            if (this.validatorApi()) {
                try {
                    const valid = await this.validatorApi()
                    if (valid) {
                        try {
                            await this.$confirm('当前数据存在关联, 是否继续?', '提示', {
                                confirmButtonText: '确定',
                                cancelButtonText: '取消',
                                type: 'warning',
                                showClose: false,
                                closeOnPressEscape: false,
                                closeOnClickModal: false
                            })
                            this.uploadBtn.click()
                        } catch (e) {
                            this.$message('已取消导入')
                        }
                    } else {
                        try {
                            await this.$confirm('当前数据无关联, 是否继续?', '提示', {
                                confirmButtonText: '确定',
                                cancelButtonText: '取消',
                                type: 'info',
                                showClose: false,
                                closeOnPressEscape: false,
                                closeOnClickModal: false
                            })
                            this.uploadBtn.click()
                        } catch (e) {
                            this.$message('已取消导入')
                        }
                    }
                } catch (e) {
                    console.log(`检验联系: ${e}`)
                }
                return
            }
            this.uploadBtn.click()
        }
    }
}
</script>

<style lang="scss" scoped>
.upload-container {
    .none{
        display: none;
    }
}
</style>
