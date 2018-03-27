<template>
	<el-dialog :title="title" :visible.sync="dialogPreviewVisible">
	  <el-form>
	    <preview-item v-for="(element,index) in list" :item="element" :key="index"></preview-item>
	  </el-form>
	  <div slot="footer" class="dialog-footer">
	    <el-button type="primary" @click="close">确 定</el-button>
	  </div>
	</el-dialog>
</template>

<script>
import previewItem from './previewItem'
export default {
    name: 'previewForm',
    components: {
        previewItem
    },
    data() {
        return {
            title: '预览',
            dialogPreviewVisible: false,
            list: [],
            currentForm: {}// 表单数据
        }
    },
    props: {
        isEditer: {// 在编辑页面预览 读取本地数据信息   在其他页面预览需要请求获取预览表单详细信息
            type: Boolean,
            default: false
        }

    },
    computed: {

    },
    mounted() {

    },
    methods: {
        open(data) {
            console.log('open预览', Array.isArray(data.layout))
            this.formData = data
            this.title = '预览--' + this.formData.name
            this.list = Array.isArray(data.layout) ? data.layout : Object.values(JSON.parse(data.layout))
            this.dialogPreviewVisible = true
        },
        close() {
            this.dialogPreviewVisible = false
        }
    }
}
</script>

<style>	
	
</style>