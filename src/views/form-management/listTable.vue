<template>
	<div>
		<!--表单列表     Id 编号 表单名称  表单描述  版本   是否启用   更新人  更新时间 -->
		<el-table :data="list" border style="width: 100%" :height="height" highlight-current-row @current-change="handleCurrentChange" empty-text="暂无数据">
			<el-table-column prop="id" label="ID" align="center">
			</el-table-column>
			<el-table-column prop="code" label="编号" align="center">
			</el-table-column>
			<el-table-column prop="name" label="表单名称">
			</el-table-column>
			<el-table-column prop="remark" label="表单描述">
			</el-table-column>
			<el-table-column prop="versions" label="版本" align="center">
				<template slot-scope="scope">
					<el-button type="text" @click="showHistorylist(scope.row)">{{scope.row.version}}</el-button>
				</template>
			</el-table-column>
			<el-table-column label="是否启用" align="center">
				<template slot-scope="scope">
					<label v-if="scope.row.enabled">启用</label>
					<label v-else style="color: red;">停用</label>
				</template>
			</el-table-column>
			<el-table-column prop="createUserName" label="更新人" align="center">
			</el-table-column>
			<el-table-column prop="createDt" label="更新时间">
			</el-table-column>
		</el-table>
		<!-- 分页 -->
		<div style="float: right;">
			<el-pagination background layout="prev, pager, next" :page-size="pageSize" :current-page="pageNo" :page-count="pageCount" 
				@current-change="handlePageChange"></el-pagination>
		</div>
		<!--历史版本-->
		<history-table ref="history"></history-table>
	</div>
</template>

<script>
import historyTable from '@/components/Dialog/FormHistory'
import {queryFormList,searchFormList} from '@/api/workFlowForm'

export default {
	name:"formListTable",
	components: {
		historyTable
	},
	data() {
		return {
  		total:0,//总条数
  		pageSize:20,//每页显示条目个数
  		pageNo:1,//当前页数
  		pageCount:1,//总页数
			list:[],//表格数据
			searchCode:'',
			searchName:''
		}
	},
	props: {
		height: {
			type: Number,
			default: 700
		}
	},
	computed: {
		
	},
	mounted() {
		this.init();
	},
	methods: {
		init(){//初始化请求获取数据
			this.getList();
		},
		getList() {
			try {
				const params = {
					pageNo: this.pageNo,
					pageSize: this.pageSize
				}		
				queryFormList(params).then(res =>{ 
					this.list = res.entities
					this.total = res.entityCount
					this.pageCount = res.pageCount
				})
				
			} catch(error) {
				this.$message.error('获取列表失败')
			}
		},
		updateFormList(){
			if(this.searchCode === '' && this.searchName === ''){
      	this.getList();
      }else{
      	this.searchForm();
      }
		},
		searchForm(){
			try {
				const params = {
					pageNo: this.pageNo,
					pageSize: this.pageSize,
					code:this.searchCode,
					name:this.searchName
				}		
				searchFormList(params).then(res =>{ 
					this.list = res.entities
					this.total = res.entityCount
					this.pageCount = res.pageCount
				})
				
			} catch(error) {
				this.$message.error('获取列表失败')
			}
		},
		showHistorylist(item) {//显示历史版本列表
			this.$refs['history'].currentVersioninfo = item;
			this.$refs['history'].open(item.code);
		},
		handleCurrentChange(val){
			this.$emit('selectForm',val);
		},
		handlePageChange(val) {
      console.log(`当前页: ${val}`);
      this.pageNo = val;
      this.updateFormList();
    },
    searchList(obj){
    	this.searchCode = obj.code;
			this.searchName = obj.name;
			this.pageNo = 1;
			this.updateFormList();
    }
	}
}
</script>

<style>

</style>