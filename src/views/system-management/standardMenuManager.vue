/*
 * @Author: BAICHONG 
 * @Date: 2018-03-09 18:02:30 
 * @Last Modified by: BAICHONG
 * @Last Modified time: 2018-03-26 16:28:42
 */
 /**
|--------------------------------------------------
| 标准菜单管理: 
| 
| 1.问题: 修改的时候编码需要校验0 -1 null
| 
| 
|--------------------------------------------------
*/
<template>
    <div>
        <el-row :gutter="20">
            <el-col :span="8" class="red">
                <el-card class="margin-bot">
                    <el-button-group>
                        <el-button @click="resetForm('root')" type="primary" size="mini">新增目录</el-button>
                        <el-button @click="resetForm('child')" type="primary" size="mini">新增功能</el-button>
                        <el-button @click="deleteNode" type="danger" size="mini">删除</el-button>
                        <el-button @click="importData" type="primary" size="mini">导入</el-button>
                        <!-- 导出 -->
                        <DownLoad :propMethod='downFile'/>
                    </el-button-group>
                </el-card>
                <!-- 菜单树结构 -->
                <el-card>
                    <Tree ref="tree" height='550' @treeChange='treeChange'/>
                    <StandardMenuTreeExample/>
                </el-card>
            </el-col>
            <el-col :span="16" class="orange">
                <!-- 按钮区 -->
                <el-card class="margin-bot pull-right">
                    <el-button-group>
                        <el-button type="primary" size="mini">撤销</el-button>
                        <el-button @click="submitForm" type="primary" size="mini">保存</el-button>
                    </el-button-group>
                </el-card>
                <!-- 表单提交 -->
                <el-card>
                    <el-form ref="form"  :inline="false" :model="form" label-width="100px">
                        <el-form-item label="编码:" >
                            <el-input v-model="form.code" :disabled="isDisabled"  placeholder="可自动生成" style="width: 40%"></el-input>
                        </el-form-item>
                        <el-form-item label="类型:">
                            <el-radio-group v-model="form.type">
                                <el-radio label="COMMONCONNECTION">普通连接</el-radio>
                                <el-radio label="FUNCTIONALTYPE">功能类型</el-radio>
                            </el-radio-group>
                        </el-form-item>
                        <!-- 功能 -->
                        <el-form-item v-if="!isUrl" label="功能:">
                            <span>质量问题列表:</span>
                            <span><el-button @click="selectFunction" type="text">选择功能</el-button></span>
                        </el-form-item>
                        <el-form-item label="URL:" v-if="isUrl">
                            <el-input v-model="form.linkUrl"></el-input>
                        </el-form-item>

                        <el-form-item label="自定义参数:">
                            <el-col :span="20">
                                <el-input v-model="form.functionParams" placeholder="无"/>
                            </el-col>
                            <el-col :span="4">
                                <el-button @click="customParamsSet" size="mini" type="primary">设置</el-button>
                            </el-col>
                        </el-form-item>
                        <el-form-item label="名称:">
                            <el-input v-model="form.name" style="width: 40%"></el-input>
                        </el-form-item>
                        <el-form-item label="图标:">
                            <span><i :class="form.icon" :style="{ color:form.iconColor }"/></span>
                            <el-button @click="selectIcon" size="text">&nbsp&nbsp选择图标</el-button>
                        </el-form-item>
                        <!-- 导航 -->
                        <el-form-item label="是否可导航:">
                            <el-radio-group v-model="form.navigateType">
                            <el-radio label="DEFAULTOPEN">默认打开</el-radio>
                            <el-radio label="DEFAULTCLOSES">默认关闭</el-radio>
                            <el-radio label="NONNAVIGABLE">不可导航</el-radio>
                            </el-radio-group>
                        </el-form-item>
                        <!-- 描述 -->
                        <el-form-item  label="描述:">
                            <el-input v-model="form.remark" placeholder="无"/>
                        </el-form-item>
                    </el-form>
                </el-card>
            </el-col>
        </el-row>
        <template>
            <!-- 自定义参数dialog  :customParams='form.functionParams'-->
            <CustomParamSet ref="paramSet"/>
            <!-- 自定义图标dialog -->
            <CustomIcon ref="CustomIcon"/>
            <!-- 选择功能dialog -->
            <ChooseFunction ref="ChooseFunction"/>
            <!-- 导入组件 -->
            <backup :uploadApi="uploadMethod" :validatorApi="valitate" ref="backup"></backup>
        </template>
    </div>
</template>

<script>
// 组件
import Tree from '@/components/Tree/StandardMenuTree'
import StandardMenuTreeExample from '@/components/Tree/StandardMenuTreeExample'
import StandardMenu from '@/model/StandardMenu'
import CustomParamSet from '../../components/Dialog/CustomParamSet'
import CustomIcon from '../../components/Dialog/CustomIcon'
import ChooseFunction from '../../components/Dialog/ChooseFunction'
import DownLoad from '../../components/DownLoad'
import backup from '@/components/ImportData' // 导入
// 接口
import { createStandardMenu, deleteStandardMenu, updateStandardMenu, fetchStandardMenuTree, importStandardMenuTree, checkJsonImportEstimateRelation } from '../../api/standardMenu'
// 配置
import Dialog from '../../components/Dialog/DialogOptions'
export default {
    components: {
        Tree,
        CustomParamSet,
        CustomIcon,
        ChooseFunction,
        DownLoad,
        backup,
        StandardMenuTreeExample
    },
    data() {
        return {
            formStatus: 'show', // show展示 create创建 delete删除 modify修改
            searchFormData: {
                orgSearchValue: ''
            },
            selected: null, // 当前选中节点
            nodeType: '',
            form: {
                code: '',
                name: '',
                type: '', // 默认普通链接类型
                navigateType: '', // 导航默认打开
                remark: '', // 备注
                icon: '',
                linkUrl: '',
                functionParams: ''// 'pid=23&abc=344'
            },
            downFile: fetchStandardMenuTree,
            valitate: checkJsonImportEstimateRelation,
            uploadMethod: importStandardMenuTree
        }
    },
    watch: {
    },
    computed: {
        isUrl() { // 是否是点选了 '普通链接'
            return this.form.type === 'COMMONCONNECTION'
        },
        isDisabled() {
            return this.formStatus === 'show'
        }
    },
    methods: {
        // 树点事件
        treeChange(val) {
            this.formStatus = 'show'
            this.selected = val
            console.log('%c%s', 'color:red;font-size: 20px', 'val  : ', JSON.stringify(val.id))
            const data = new StandardMenu().init(val)
            this.form = data
        },
        // 开始创建节点
        resetForm(val) {
            this.formStatus = 'create'
            this.nodeType = val // root||child
            this.form = new StandardMenu()
        },
        // 重置表单
        // resetForm() {
        //     this.$refs.form.resetFields()
        // },

        // 提交表单
        submitForm() {
            if (this.formStatus === 'create') {
                this.createNode()
            }
            if (this.formStatus === 'show') {
                // zheli
                this.updateMenu()
            }
        },

        // 创建节点
        createNode() {
            if (this.nodeType === 'child') {
                this.form.parentCode = this.selected.code
            }
            this.$refs.form.validate(valid => {
                if (valid) {
                    createStandardMenu(this.form)
                        .then(res => {
                            if (this.nodeType === 'child') {
                                this.$refs.tree.append(res, this.selected.id)
                            } else {
                                this.$refs.tree.insertAfter(res, this.selected.id)
                            }
                        })
                        .catch(err => (this.$message.error(`添加失败${err}`)))
                        .finally()
                } else {
                    this.$message.error(`校验失败`)
                }
            })
        },

        // 删除节点
        deleteNode() {
            if (!this.selected) return
            deleteStandardMenu(this.selected.id)
                .then(res => {
                    this.$message.success(`删除成功`)
                    this.$refs.tree.remove(this.selected.id)
                    this.resetForm()
                })
                .catch(e => (this.$message.error(`删除失败: ${e && e.message}`)))
                .finally()
        },

        // 自定义参数dialog显示
        customParamsSet() {
            this.$refs.paramSet.open(this.form.functionParams)
            this.$refs.paramSet.onClosed = ({ data }) => {
                console.log('%c%s', 'color:red;font-size:20px', 'data  : ', data)
                this.form.functionParams = data
            }
        },

        // 选择图标
        selectIcon() {
            this.$refs.CustomIcon.open()
            this.$refs.CustomIcon.onClosed = ({ option, data }) => {
                if (option === Dialog.CONFIRM) {
                    console.log('%c%s', 'color:red;font-size:20px', 'option  : ', data)
                    this.form.icon = data.icon
                    this.form.iconColor = data.color
                }
            }
        },

        updateMenu() {
            updateStandardMenu(this.form)
                .then(res => {
                    this.$refs.tree.reSetTree(res)
                })
        },

        // 选择功能
        selectFunction() {
            this.$refs.ChooseFunction.open()
            this.$refs.ChooseFunction.onClosed = ({ data, option }) => {

            }
        },

        // 导入
        importData() {
            this.$refs['backup'].importData()
        }
    }

}
</script>

<style scoped>
.pull-right{
    display: flex;
    justify-content: flex-end;
}
.orange{
    height: 84.5vh;
}
.red{
    height: 84.5vh;
}
.margin-bot{
    margin-bottom: 20px
}
</style>
