<template>
	<div>
		<el-dialog title="历史版本" :visible.sync="dialogVisible">
			<div>表单编号：{{currentVersioninfo.code}}</div>
			<div>表单名称：{{currentVersioninfo.name}}</div>	
			<div>表单描述：{{currentVersioninfo.desc}}</div>
			<el-table :data="list" border style="width: 100%" :height="height">
				<el-table-column prop="id" label="ID" align="center">
				</el-table-column>
				<el-table-column prop="createUserName" label="更新人" align="center">
				</el-table-column>
				<el-table-column prop="createDt" label="更新时间">
				</el-table-column>
				<el-table-column prop="versionRemark" label="版本备注">
				</el-table-column>
				<el-table-column prop="version"  label="版本" align="center">
				</el-table-column>
				<el-table-column label="操作" align="center">
					<template slot-scope="scope">
						<el-button type="text" size="small" @click="previewForm(scope.row)">预览</el-button>
						<el-button type="text" size="small" @click="editer(scope.row)">编辑</el-button>
					</template>
				</el-table-column>
			</el-table>
			<!-- 分页 -->
			<div style="float: right;">
				<el-pagination background layout="prev, pager, next" :page-size="pageSize" :current-page="pageNo" :page-count="pageCount" 
					@current-change="handlePageChange"></el-pagination>
			</div>
			<div slot="footer" class="dialog-footer">
		    <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
		 </div>
		</el-dialog>
		<!--预览窗口-->
		<preview-form ref="preview" :formId="previewFormid"></preview-form>
	</div>
</template>

<script>
import { openForm, queryFormList } from '@/api/workFlowForm'
import previewForm from '@/components/Dialog/FormPreview'

export default {
    name: 'historyTable',
    components: {
        previewForm
    },
    data() {
        return {
            total: 0, // 总条数
            pageSize: 20, // 每页显示条目个数
            pageNo: 1, // 当前页数
            pageCount: 1, // 总页数
            dialogVisible: false,
            currentVersioninfo: {},
            name: '',
            list: [], // 表格数据
            previewFormid: 0// 当前选择要预览的表单id
        }
    },
    props: {
        height: {
            type: Number,
            default: 500
        }
    },
    computed: {

    },
    mounted() {

    },
    methods: {
        getList() {
            try {
                const params = {
                    pageNo: this.pageNo,
                    pageSize: this.pageSize,
                    code: this.currentVersioninfo.code
                }
                queryFormList(params).then(res => {
                    this.list = res.entities
                    this.total = res.entityCount
                    this.pageCount = res.pageCount
                })
            } catch (error) {
                this.$message.error('获取历史版本列表失败')
            }
        },
        open(data) { // 初始化请求获取数据
            this.dialogVisible = true
            this.getList()
        },
        close() {
            this.dialogVisible = false
        },
        previewForm(item) { // 预览当前表单
            this.previewFormid = item.id
            this.getForm('PREVIEW')
        },
        editer(item) {
            this.previewFormid = item.id
            this.getForm('EDIT')
        },
        handlePageChange(val) {
            console.log(`当前页: ${val}`)
            this.pageNo = val
            this.getList()
        },
        getForm(type) {
            try {
                const params = {
                    id: this.previewFormid
                }
                openForm(params).then(res => {
                    this.currentForm = res
                    if (type === 'EDIT') {
                        this.$router.push({ name: 'formEditer', params: { formId: this.previewFormid, formData: res }})
                    }
                    if (type === 'PREVIEW') {
                        this.$refs['preview'].open(this.currentForm)
                    }
                })
            } catch (error) {
                this.$message.error(error.message)
            }
        }
    }
}
</script>

<style>

</style>