<template>
	<div>
		<el-dialog title="发布" :visible.sync="dialogVisible">
			<div>
				<label>发布后将会产生新版本</label>
			</div>
			<p>版本备注</p>
			<el-input type="textarea" :autosize="{ minRows: 2, maxRows: 4}" placeholder="请输入内容" v-model="notes">
			</el-input>
			<div slot="footer" class="dialog-footer">
		    <el-button type="primary" @click="release">发布</el-button>
		 </div>
		</el-dialog>
	</div>
</template>

<script>
import previewForm from '@/components/Dialog/FormPreview'
import { addForm } from '@/api/workFlowForm'

export default {
    name: 'historyTable',
    components: {
        previewForm
    },
    data() {
        return {
            notes: '',
            dialogVisible: false,
            formData: {}// 要提交的表单信息
        }
    },
    props: {
        model: {
            type: Object
        }
    },
    computed: {

    },
    methods: {
        open(data) {
            this.dialogVisible = true
            // 处理数据
            this.formData = this.setData(data)
        },
        release() {
            this.formData.versionRemark = this.notes
            console.log(this.formData.element.length, '要发布的表单内容')
            this.releaseForm()
        },
        releaseForm() {
            try {
                addForm(this.formData).then(res => {
                    this.dialogVisible = false
                    this.$router.push({ path: '/form-management/index' })
                })
            } catch (error) {
                this.$message.error(error.message)
            }
        },
        close() {
            this.dialogVisible = false
        },
        setData(data) {
            const elements = []
            let parameter = {}
            if (data.id !== 0) {
                parameter = data
            }
            parameter.name = data.name
            parameter.remark = data.remark
            parameter.layout = JSON.stringify(data.layout)
            parameter.element = JSON.stringify(this.getElement(elements, data.layout))
            return parameter
        },
        getElement(elements, data) {
            for (let i = 0; i < data.length; i++) {
                const child = data[i]
                if (child.type !== 'row' && child.type !== 'col') {
                    elements.push(child)
                }
                if (child.children) {
                    this.getElement(elements, child.children)
                }
            }
            return elements
        }
    }
}
</script>

<style>

</style>