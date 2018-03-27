/*
 * @Author: zhanglianhao 
 * @Date: 2018-03-20 13:29:18 
 * @Last Modified by: zhanglianhao
 * @Last Modified time: 2018-03-27 17:47:56
 */

/**
|--------------------------------------------------
| 功能模块
|--------------------------------------------------
*/
<template>
    <div class="controller-container">
        <el-row>
            <el-col :span="6">
                <el-card class="box-card">
                    <el-row>
                        <el-col :span="24" class="controller-btn">
                            <el-button-group class="margin-bottom-20">
                                <el-button @click="addModuleToggle" type="primary" size="mini">新增模块</el-button>
                                <el-button @click="addFunctionToggle" type="primary" size="mini">新增功能</el-button>
                                <el-button @click="remove" type="danger" size="mini">删除</el-button>
                                <el-button @click="importData" type="primary" size="mini">导入</el-button>
                                <export-data 
                                    fileName="功能模块.json" 
                                    :propMethod="exportMethod" 
                                    type="primary" 
                                    size="mini">
                                </export-data>
                            </el-button-group>
                        </el-col>
                        <el-col :span="24">
                            <!-- tree -->
                            <tree @treeChange="onTreeChange" ref="tree"></tree>
                            <!-- 导入组件 -->
                            <import-data :uploadApi="uploadMethod" :validatorApi="validatorMethod" ref="importData" @refresh="onRefresh"></import-data>
                        </el-col>
                    </el-row>
                </el-card>
            </el-col>
            <el-col :span="18" class="padding-left-20">
                <el-card class="box-card">
                    <div slot="header" class="clearfix">
                        <el-button-group class="fl" style="margin-top:20px;margin-left:40px;">
                            <el-button size="mini" type="primary" :disabled="operatable" @click="revoke">撤销</el-button>
                            <el-button size="mini" type="primary" :disabled="operatable" @click="save">保存</el-button>
                        </el-button-group>
                    </div>
                    <el-form :model="functionForm" :rules="rules" ref="functionForm" label-width="100px" :validate-on-rule-change="false">
                        <el-form-item label="名称：" class="form-item-width" prop="name">
                            <el-input v-model="functionForm.name"></el-input>
                        </el-form-item>
                        <el-form-item label="编码：" class="form-item-width" prop="code">
                            <el-input v-model="functionForm.code" :disabled="isEditable" placeholder="可自动生成"></el-input>
                        </el-form-item>
                        <template v-if="!isModule">
                            <el-form-item label="类型：" class="form-item-width">
                                <el-radio-group v-model="functionForm.type" @change="onFunctionChange"> 
                                    <el-radio label="SYSTEMFUNCTION">系统功能</el-radio>
                                    <el-radio label="CUSTOMFUNCTION">自定义功能</el-radio>
                                </el-radio-group>
                            </el-form-item>
                            <template v-if="isSystemFunction">
                                <el-form-item label="URL：" class="form-item-width" prop="url">
                                    <el-input v-model="functionForm.url"></el-input>
                                </el-form-item>
                                <el-form-item label="描述：" class="form-item-width">
                                    <el-input type="textarea" :rows="3" v-model="functionForm.remark"></el-input>
                                </el-form-item>
                            </template>
                            <template v-else>
                                <el-form-item label="模板：" class="form-item-width">
                                    <el-radio-group v-model="functionForm.templateType">
                                        <el-radio label="FORM">表单</el-radio>
                                        <el-radio label="WORKFLOW">工作流</el-radio>
                                    </el-radio-group>
                                </el-form-item>
                                <el-form-item label="工作流：" class="form-item-width">
                                    <el-select v-model="functionForm.templateName" placeholder="请选择">
                                        <!-- <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"></el-option> -->
                                    </el-select>
                                </el-form-item>
                            </template>
                        </template>
                    </el-form>
                </el-card>
            </el-col>
        </el-row>
    </div>
</template>

<script>
import tree from '@/components/Tree/FuncTree'
import exportData from '@/components/DownLoad'
import importData from '@/components/ImportData'
import {
    createFunc,
    createFuncCategory,
    updateFunc,
    updateFuncCategory,
    deleteFunc,
    deleteFuncCategory,
    exportFunc,
    checkImportRelation,
    importFunc
} from '@/api/funcModule'
import Module from '@/model/Module'
import Func from '@/model/Function'
export default {
    name: 'function-controller',
    components: {
        tree,
        exportData,
        importData
    },
    data() {
        return {
            treeData: {},
            functionForm: {},
            rules: {},
            isModule: true, // 是否是模块
            isSystemFunction: true, // 是否是系统功能
            exportMethod: exportFunc, // 导出接口
            isEditable: true, // 是否可修改
            uploadMethod: importFunc, // 上传文件接口
            validatorMethod: checkImportRelation, // 校验是否关联接口
            operatable: false // 是否可操作撤销修
        }
    },
    watch: {
        // 监听表单
        functionForm: {
            handler() {
                this.functionForm.beginEdit()
            },
            deep: true
        }
    },
    methods: {
        // 监听树改变
        onTreeChange(val) {
            this.treeData = val
            this.functionForm = val
            this.isEditable = true
            this.functionForm.cancelEdit()
            this.operatable = false // 可进行撤销保存操作
            if (val.moduleType === 'FunctionCategory') {
                this.isModule = true
                return
            }
            this.isModule = false
            this.rules = {
                name: [
                    { required: true, trigger: 'blur', validator: val.validatorOf('name') }
                ]
            }
        },
        // 未保存提示
        async saveTip() {
            try {
                await this.$confirm('您有未保存的更改, 是否保存?', '提示', {
                    confirmButtonText: '保存',
                    cancelButtonText: '取消',
                    type: 'warning'
                })
                this.save()
            } catch (e) {
                this.cancelEdit()
                console.log(e)
            }
        },
        // 增加模块切换
        addModuleToggle() {
            this.functionForm = new Module()
            this.isModule = true
            this.isEditable = false
            this.operatable = false // 可进行撤销保存操作
            this.rules = {
                name: [
                    { required: true, trigger: 'blur', validator: this.functionForm.validatorOf('name') }
                ]
            }
        },
        // 增加功能切换
        addFunctionToggle() {
            this.functionForm = new Func()
            // radio默认选中
            this.functionForm.type = 'SYSTEMFUNCTION'
            this.functionForm.templateType = 'FORM'
            this.isModule = false
            this.isEditable = false
            this.operatable = false // 可进行撤销保存操作
            this.rules = {
                name: [
                    { required: true, trigger: 'blur', validator: this.functionForm.validatorOf('name') }
                ]
            }
        },
        // 监听功能类型
        onFunctionChange(val) {
            if (val === 'SYSTEMFUNCTION') {
                this.isSystemFunction = true
                return
            }
            this.isSystemFunction = false
        },
        // 撤销按钮
        revoke() {
            this.functionForm.cancelEdit() // 撤销编辑
        },
        // 新建模块
        async addModule() {
            try {
                const data = this.functionForm
                const res = await createFuncCategory(data)
                this.$message.success('添加成功')
                this.operatable = true // 不可进行撤销保存操作
                this.$refs['tree'].insertAfter(res)
            } catch (e) {
                this.$message.error(`添加失败：${e.message}`)
                console.warn(`新建模块: ${e}`)
            }
        },
        // 修改模块
        async editModule() {
            try {
                const data = this.functionForm
                data.children = []
                await updateFuncCategory(data)
                this.operatable = true // 不可进行撤销保存操作
                this.$message.success('修改成功')
            } catch (e) {
                this.$message.error(`修改失败: ${e.message}`)
                console.warn(`修改模块: ${e}`)
            }
        },
        // 新建功能
        async addFunc() {
            try {
                const data = this.functionForm
                data.catCode = this.treeData.code
                const res = await createFunc(data)
                this.$refs['tree'].append(res, this.treeData.id)
                this.operatable = true // 不可进行撤销保存操作
                this.$message.success('添加成功')
            } catch (e) {
                this.$message.error(`添加失败: ${e.message}`)
                console.warn(`新建功能: ${e}`)
            }
        },
        // 修改功能
        async editFunc() {
            try {
                const data = this.functionForm
                data.children = []
                await updateFunc(data)
                this.operatable = true // 不可进行撤销保存操作
                this.$message.success('修改成功')
            } catch (e) {
                this.$message.error(`修改失败: ${e.message}`)
                console.warn(`修改功能: ${e}`)
            }
        },
        // 删除模块
        async removeModule() {
            try {
                await deleteFuncCategory([this.treeData.id])
                this.$refs['tree'].remove()
                this.$message.success('删除成功')
            } catch (e) {
                this.$message.error(`修改失败: ${e.message}`)
                console.warn(`删除模块: ${e}`)
            }
        },
        // 删除功能
        async removeFunc() {
            try {
                await deleteFunc([this.treeData.id])
                this.$refs['tree'].remove()
                this.$message.success('删除成功')
            } catch (e) {
                this.$message.error(`修改失败: ${e.message}`)
                console.warn(`删除功能: ${e}`)
            }
        },
        // 删除按钮
        async remove() {
            try {
                if (!this.treeData.id) {
                    this.$message.warning('请选择要删除的条目')
                    return
                }

                if (this.treeData.hasChild) {
                    this.$message.warning('当前节点包含子节点，不能进行删除操作')
                    return
                }

                await this.$confirm('此操作将永久删除该条信息, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                })

                if (this.treeData.moduleType === 'FunctionCategory') {
                    this.removeModule()
                    return
                }
                this.removeFunc()
            } catch (e) {
                console.log(e)
            }
        },
        // 保存按钮
        async save() {
            try {
                const valid = await this.$refs['functionForm'].validate()
                if (valid) {
                    if (this.functionForm.id === -1) {
                        if (this.functionForm.hasOwnProperty('_catCode')) {
                            this.addFunc() // 新建功能
                        } else {
                            this.addModule() // 新建模块
                        }
                        this.functionForm.endEdit()
                    } else {
                        if (this.functionForm.moduleType === 'FunctionCategory') {
                            this.editModule() // 修改模块
                        } else {
                            this.editFunc() // 修改功能
                        }
                        this.functionForm.endEdit()
                    }
                }
            } catch (e) {
                console.warn(`保存: ${JSON.stringify(e)}`)
                return false
            }
        },
        // 导入按钮
        async importData() {
            this.$refs['importData'].importData()
        },
        // 导入之后刷新
        onRefresh(data) {
            this.$refs['tree'].refresh(data)
        }
    }
}
</script>

<style lang="scss" scoped>
.controller-container {
    .controller-btn {
        text-align: center;
    }
    .form-item-width {
        width: 50%;
    }
    .box-card {
        height: 820px;
        overflow-y: auto;
    }
}
</style>
