<template>
    <div>
        <el-table :data="tableData" style="width: 100%;cursor:pointer;" @selection-change="checkedChange" :height="500" stripe border highlight-current-row>
            <el-table-column :type="type" v-if="type" width="55">
            </el-table-column>
            <el-table-column prop="name" label="类别名称" width="290" align="center">
            </el-table-column>
            <el-table-column prop="code" label="类别编码" width="290" align="center">
            </el-table-column>
            <el-table-column prop="category" label="分类" align="center">
            </el-table-column>
        </el-table>
    </div>
</template>

<script>
import { fetchAllPosition } from '@/api/org'

export default {
    props: {
        type: {
            type: String,
        }
    },
    mounted() {
        this.init()
    },
    data() {
        return {
            tableData: []
        }
    },
    methods: {
        init() {
            fetchAllPosition().then(res => {
                this.tableData = res;
            })
        },
        checkedChange(checked) {
            this.$emit('checkedChange', checked)
        }
    }
}
</script>

<style>

</style>
