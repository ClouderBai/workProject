/*
 * @Author: zhanglianhao 
 * @Date: 2018-03-14 10:57:05 
 * @Last Modified by: zhanglianhao
 * @Last Modified time: 2018-03-27 13:18:34
 */

/**
|--------------------------------------------------
| 数据字典
|--------------------------------------------------
*/
<template>
    <div class="dictionary-container">
        <el-card class="box-card">
            <el-row>
                <el-col :span="12">
                    <div class="dictionary-display">
                        <el-row>
                            <el-col :span="24" class="option-btn margin-bottom-20">
                                <el-button-group>
                                    <el-button size="medium" icon="bimicon-roundaddlight" class="custom-medium-btn primary-btn" @click="addTopMap">
                                        添加顶级字典
                                    </el-button>
                                    <el-button size="medium" icon="bimicon-roundaddlight" class="custom-medium-btn primary-btn" @click="addSubMap">
                                        添加子集字典
                                    </el-button>
                                    <el-button size="medium" icon="bimicon-edit" class="custom-medium-btn primary-btn" @click="editMap">
                                        修改
                                    </el-button>
                                    <el-button size="medium" icon="bimicon-upload" class="custom-medium-btn primary-btn" @click="importData">
                                        导入
                                    </el-button>
                                    <download 
                                        fileName="数据字典.json" 
                                        :propMethod="exportMethod" 
                                        type="" 
                                        size="medium" 
                                        iconType="bimicon-down"
                                        btnClass="custom-medium-btn primary-btn">
                                    </download>
                                    <el-button size="medium" icon="bimicon-upload" class="custom-medium-btn primary-btn" @click="recovery">
                                        恢复
                                    </el-button>
                                    <el-button size="medium" icon="bimicon-delete" class="custom-medium-btn red-btn" @click="removeMap">
                                        删除
                                    </el-button>
                                </el-button-group>
                            </el-col>
                            <el-col :span="24">
                                <tree-grid :dataSource="dataSource" @rowChange="onRowChange" :loading="loading"></tree-grid>
                            </el-col>
                        </el-row>
                    </div>
                </el-col>
                <el-col :span="12">
                    <div class="dictionary-display">
                        <el-row>
                            <el-col :span="24" class="option-btn margin-bottom-20">
                                <el-button-group style="margin-top:5px;margin-right:10px;">
                                    <el-button size="medium" icon="bimicon-roundaddlight" class="custom-medium-btn primary-btn" @click="addTopItem">
                                        添加字典项
                                    </el-button>
                                    <el-button size="medium" icon="bimicon-roundaddlight" class="custom-medium-btn primary-btn" @click="addSubItem">
                                        添加字典字项
                                    </el-button>
                                    <el-button size="medium" icon="bimicon-edit" class="custom-medium-btn primary-btn" @click="editItemMap">
                                        修改
                                    </el-button>
                                    <el-button size="medium" icon="bimicon-delete" class="custom-medium-btn red-btn" @click="removeMapItem">
                                        删除
                                    </el-button>
                                </el-button-group>
                            </el-col>
                            <el-col :span="24">
                                <tree-grid :dataSource="subDataSource" :columns="subColumns" @rowChange="onItemRowChange"></tree-grid>
                            </el-col>
                            <el-col :span="24">
                                <add-dictionary ref="dictionary"></add-dictionary>
                                <add-dictionary-item ref="dictionaryItem"></add-dictionary-item>
                            </el-col>
                        </el-row>
                        <el-row>
                            <el-col :span="24">
                                <!-- 导入数据 -->
                                <import-data  :uploadApi="uploadMehtod" ref="importData" @refresh="onRefresh"></import-data>
                                <!-- 恢复数据 dialog -->
                                <recovery ref="recovery"></recovery>
                            </el-col>
                        </el-row>
                    </div>
                </el-col>
            </el-row>
        </el-card>
    </div>
</template>

<script>
import { fetchAllDictionaryList, deleteDictionaryCat, deleteDictionary, exportDictionary, importDictionary } from '@/api/dictionary'
import treeGrid from '@/components/Table/TreeGrid'
import addDictionary from '@/components/Dialog/Dictionary/parent'
import addDictionaryItem from '@/components/Dialog/Dictionary/item'
import download from '@/components/DownLoad'
import importData from '@/components/ImportData'
import recovery from '@/components/Dialog/Dictionary/recovery'
export default {
    name: 'dictionaryController',
    components: {
        treeGrid,
        addDictionary,
        addDictionaryItem,
        download,
        importData,
        recovery
    },
    data() {
        return {
            dataSource: [],
            subDataSource: [],
            subColumns: [
                {
                    text: '关键字(Key)',
                    dataIndex: 'key'
                },
                {
                    text: '值(Value)',
                    dataIndex: 'value'
                },
                {
                    text: '是否有效',
                    dataIndex: 'valid'
                }
            ],
            tableRowData: {},
            itemTableRowData: {},
            exportMethod: exportDictionary,
            loading: false,
            uploadMehtod: importDictionary
        }
    },
    mounted() {
        this.loadData()
    },
    methods: {
        // 获取数据字典数据
        async loadData() {
            try {
                this.loading = true
                this.dataSource = await fetchAllDictionaryList()
            } catch (e) {
                console.warn(`获取数据字典数据: ${JSON.stringify(e)}`)
            } finally {
                this.loading = false
            }
        },
        // 监听左侧表格行点击事件
        onRowChange(row) {
            this.tableRowData = row
            if (!row.dicts) {
                this.subDataSource = []
                return
            }
            this.subDataSource = row.dicts
        },
        // 监听右侧表格行点击事件
        onItemRowChange(row) {
            this.itemTableRowData = row
        },
        // 添加字典
        addTopMap() {
            this.$refs['dictionary'].open({ type: 'TOP' })
            this.loadData()
        },
        // 添加字典子集
        addSubMap() {
            if (Object.keys(this.tableRowData).length < 1) {
                this.$message.warning('请选择父级字典')
                return
            }
            this.$refs['dictionary'].open({ type: 'SUB', parentCode: this.tableRowData.code })
            this.loadData()
        },
        // 修改map
        editMap() {
            if (Object.keys(this.tableRowData).length < 1) {
                this.$message.warning('请选择修改的数据')
                return
            }
            this.$refs['dictionary'].open({ data: this.tableRowData })
            this.loadData()
        },
        // 添加父级字典项
        addTopItem() {
            if (Object.keys(this.tableRowData).length < 1) {
                this.$message.warning('请选择父级字典')
                return
            }
            this.$refs['dictionaryItem'].open({ type: 'TOP', catCode: this.tableRowData.fullCode })
            this.loadData()
        },
        // 添加子字典项
        addSubItem() {
            if (Object.keys(this.itemTableRowData).length < 1) {
                this.$message.warning('请选择父级字典')
                return
            }
            this.$refs['dictionaryItem'].open({ type: 'SUB', parentKey: this.itemTableRowData.key, catCode: this.tableRowData.fullCode })
            this.loadData()
        },
        editItemMap() {
            if (Object.keys(this.itemTableRowData).length < 1) {
                this.$message.warning('请选择修改的数据')
                return
            }
            this.$refs['dictionaryItem'].open({ data: this.itemTableRowData })
            this.loadData()
        },
        // 删除字典
        async removeMap() {
            try {
                // 判断是否选中数据
                if (Object.keys(this.tableRowData).length < 1) {
                    this.$message.warning('请选择要删除的数据')
                    return
                }
                // 判断是否有子节点
                if (this.tableRowData.hasChild) {
                    this.$message.warning('该条数据有子节点，不能进行删除操作')
                    return
                }

                await this.$confirm('此操作将永久删除该条信息, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                })

                try {
                    await deleteDictionaryCat([this.tableRowData.id])
                    this.loadData()
                    this.$message.success('删除成功')
                } catch (e) {
                    this.$message.error(`删除失败: ${e.message}`)
                    console.warn(`删除字典: ${JSON.stringify(e)}`)
                }
            } catch (e) {
                return e
            }
        },
        // 删除字典项
        async removeMapItem() {
            try {
                // 判断是否选中数据
                if (Object.keys(this.itemTableRowData).length < 1) {
                    this.$message.warning('请选择要删除的数据')
                    return
                }
                // 判断是否有子节点
                if (this.itemTableRowData.hasChild) {
                    this.$message.warning('该条数据有子节点，不能进行删除操作')
                    return
                }

                await this.$confirm('此操作将永久删除该条信息, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                })

                try {
                    await deleteDictionary([this.itemTableRowData.id])
                    this.$message.success('删除成功')
                    this.loadData()
                } catch (e) {
                    this.$message.error(`删除失败: ${e.message}`)
                    console.warn(`删除字典: ${JSON.stringify(e)}`)
                }
            } catch (e) {
                return e
            }
        },
        // 导入数据(按钮)
        importData() {
            this.$refs['importData'].importData()
        },
        // 恢复
        recovery() {
            this.$refs['recovery'].open()
        },
        // 刷新表格数据
        onRefresh(data) {
            this.dataSource = data
        }
    }
}
</script>

<style lang="scss" scoped>
.dictionary-container {
    .box-card {
        height: 820px;
        overflow-y: auto;
        .dictionary-display {
            width: 94%;
            margin: 0 auto;
        }
    }
    .option-btn {
        text-align: center;
    }
}
</style>
