/*
 * @Author: zhanglianhao 
 * @Date: 2018-03-20 13:27:14 
 * @Last Modified by: zhanglianhao
 * @Last Modified time: 2018-03-27 13:59:47
 */
/**
|--------------------------------------------------
| 新建用户
|--------------------------------------------------
*/
<template>
    <div class="addContainer">
        <el-dialog :visible="visible" @close="close">
            <div slot="title">
                <i :class="`el-icon-${iconType}`"></i>
                <span>{{title}}</span>
            </div>
            <!-- form-start -->
            <el-form :model="userForm" :rules="rules" ref="userForm" label-width="134px" :validate-on-rule-change="false">
                <el-tabs v-model="activeName" type="card">
                    <!-- 基本信息-start -->
                    <el-tab-pane label="基本信息" name="last" class="paneStyle">
                        <ul class="tab-item-contianer">
                            <li>
                                <ul>
                                    <li>
                                        <el-form-item label="姓名：" prop="name">
                                            <el-input v-model="userForm.baseInfo.name" @input="getPinyin"></el-input>
                                        </el-form-item>
                                    </li>
                                    <li>
                                        <el-form-item label="电话：" prop="mobile">
                                            <el-input v-model="userForm.baseInfo.mobile"></el-input>
                                        </el-form-item>
                                    </li>
                                    <li>
                                        <el-form-item label="性别：">
                                            <el-select v-model="userForm.baseInfo.gender" placeholder="请选择" class="selectStyle">
                                                <el-option v-for="item in genderList" :key="item.value" :label="item.label" :value="item.value"></el-option>
                                            </el-select>
                                        </el-form-item>
                                    </li>
                                </ul>
                            </li>
                             <!-- upload-start -->
                            <li>
                                <el-form-item label="头像：" style="margin-bottom:0;">
                                    <upload-avatar class="uploadStyle" :avatar-url="avatarUrl" @getUrl="getAvatarUrl"></upload-avatar>
                                </el-form-item>
                            </li>
                            <!-- upload-end -->
                            <li :class="{showMainJob: isShowMainJob}">
                                <el-form-item label="是否主职：">
                                    <el-radio-group v-model="userForm.baseInfo.mainJob">
                                        <el-radio :label="true">是</el-radio>
                                        <el-radio :label="false">否</el-radio>
                                    </el-radio-group>
                                </el-form-item>
                            </li>
                            <li>
                                 <el-form-item label="是否可用：">
                                    <el-radio-group v-model="userForm.baseInfo.enable">
                                        <el-radio :label="true">是</el-radio>
                                        <el-radio :label="false">否</el-radio>
                                    </el-radio-group>
                                </el-form-item>
                            </li>
                            <li>
                                <el-form-item label="排序：">
                                    <el-input v-model="userForm.baseInfo.order"></el-input>
                                </el-form-item>
                            </li>
                            <li>
                                <el-form-item label="级别类型：">
                                    <el-select v-model="userForm.baseInfo.levelType" placeholder="请选择" class="selectStyle">
                                        <el-option v-for="item in levelTypeList" :key="item.id" :label="item.name" :value="item.code"></el-option>
                                    </el-select>
                                </el-form-item>
                            </li>
                            <li>
                                <el-form-item label="所属部门：">
                                    <el-input v-model="userForm.baseInfo.orgName"></el-input>
                                </el-form-item>
                            </li>
                            <li>
                                <el-form-item label="职务：">
                                    <el-select v-model="userForm.baseInfo.dutyCode" placeholder="请选择" class="selectStyle">
                                        <el-option v-for="item in dutyCodeList" :key="item.id" :label="item.name" :value="item.code"></el-option>
                                    </el-select>
                                </el-form-item>
                            </li>
                            <li>
                                <el-form-item label="身份证号：" prop="idNo">
                                    <el-input v-model="userForm.baseInfo.idNo"></el-input>
                                </el-form-item>
                            </li>
                            <li>
                                <el-form-item label="全拼：">
                                    <el-input v-model="userForm.baseInfo.pinyin"></el-input>
                                </el-form-item>
                            </li>
                            <li>
                                <el-form-item label="简拼：">
                                    <el-input v-model="userForm.baseInfo.jianpin"></el-input>
                                </el-form-item>
                            </li>
                            <li>
                                <el-form-item label="出生日期：">
                                    <el-date-picker v-model="userForm.baseInfo.birthDt" type="date" class="selectStyle"></el-date-picker>
                                </el-form-item>
                            </li>
                            <li>
                                <el-form-item label="文化程度：">
                                    <el-select v-model="userForm.baseInfo.eduDegree" placeholder="请选择" class="selectStyle">
                                        <el-option v-for="item in eduDegreeList" :key="item.value" :label="item.label" :value="item.value"></el-option>
                                    </el-select>
                                </el-form-item>
                            </li>
                            <li>
                                <el-form-item label="职称：">
                                    <el-select v-model="userForm.baseInfo.userTitle" placeholder="请选择" class="selectStyle">
                                        <el-option v-for="item in userTitleList" :key="item.value" :label="item.label" :value="item.value"></el-option>
                                    </el-select>
                                </el-form-item>
                            </li>
                            <li>
                                <el-form-item label="紧急联系人：">
                                    <el-input v-model="userForm.baseInfo.emergencyContactName"></el-input>
                                </el-form-item>
                            </li>
                            <li>
                                <el-form-item label="特种作业证：">
                                    <el-select v-model="userForm.baseInfo.specialOpCert" placeholder="请选择" class="selectStyle">
                                        <el-option v-for="item in specialOpCertList" :key="item.value" :label="item.label" :value="item.value"></el-option>
                                    </el-select>
                                </el-form-item>
                            </li>
                            <li>
                                <el-form-item label="紧急联系人电话：" prop="emergencyContactPhone">
                                    <el-input v-model="userForm.baseInfo.emergencyContactPhone"></el-input>
                                </el-form-item>
                            </li>
                            <li>
                                <el-form-item label="用户类型：">
                                    <el-select v-model="userForm.baseInfo.userType" placeholder="请选择" class="selectStyle">
                                        <el-option v-for="item in userTypeList" :key="item.value" :label="item.label" :value="item.value"></el-option>
                                    </el-select>
                                </el-form-item>
                            </li>
                            <li>
                                <el-form-item label="工种：">
                                    <el-select v-model="userForm.baseInfo.profession" placeholder="请选择" class="selectStyle">
                                        <el-option v-for="item in professionList" :key="item.value" :label="item.label" :value="item.value"></el-option>
                                    </el-select>
                                </el-form-item>
                            </li>
                            <li>
                                <el-form-item label="住址：">
                                    <el-input v-model="userForm.baseInfo.address"></el-input>
                                </el-form-item>
                            </li>
                            <li>
                                <el-form-item label="岗位：">
                                    <el-input v-model="userForm.baseInfo.postName"></el-input>
                                </el-form-item>
                            </li>
                        </ul>
                    </el-tab-pane>
                    <!-- 基本信息-end -->

                    <!-- 用户材料-start -->
                    <el-tab-pane label="用户材料" name="second" class="paneStyle">
                        <template v-for="(item, index) in userForm.materials">
                            <ul class="materials">
                                <li>
                                    <el-tooltip class="item" effect="dark" content="删除" placement="top-start">
                                        <el-button icon="bimicon-roundclose" size="large" type="text" class="remove-btn" @click="removeMaterials(index)">
                                        </el-button>
                                    </el-tooltip>
                                </li>
                                <li>
                                    <ul class="materials-item mt10">
                                        <li>
                                            <ul>
                                                <li>
                                                    <el-form-item label="材料类型：">
                                                        <el-input v-model="item.fileType"></el-input>
                                                    </el-form-item>
                                                </li>
                                                
                                                <li>
                                                    <el-form-item label="颁发日期：">
                                                        <el-date-picker v-model="item.issueDt" type="date" class="selectStyle"></el-date-picker>
                                                    </el-form-item>
                                                </li>
                                                <li>
                                                    <el-form-item label="检查日期：">
                                                        <el-date-picker v-model="item.chechDt" type="date" class="selectStyle"></el-date-picker>
                                                    </el-form-item>
                                                </li>
                                                <li>
                                                    <el-form-item label="过期日期：">
                                                        <el-date-picker v-model="item.expireDt" type="date" class="selectStyle"></el-date-picker>
                                                    </el-form-item>
                                                </li>
                                            </ul>
                                        </li>
                                        <li>
                                            <ul>
                                                <li>
                                                    <el-form-item label="颁发组织：">
                                                        <el-input v-model="item.issueOrg"></el-input>
                                                    </el-form-item>
                                                </li>
                                                <li>
                                                    <el-form-item label="备注信息：">
                                                        <el-input v-model="item.remark"></el-input>
                                                    </el-form-item>
                                                </li>
                                                <li>
                                                    <!-- upload-materials-start -->
                                                    <upload-material class="mat-upload" @submitUpload="submitUpload($event, index)" :file-list="fileListEntity[index]"></upload-material>
                                                    <!-- upload-materials-end -->
                                                </li>
                                            </ul>
                                        </li>
                                    </ul>
                                </li>
                            </ul>
                        </template>
                        <div class="add-btn tac mt20 mb20">
                            <el-tooltip class="item" effect="dark" content="添加" placement="top-start">
                                <el-button size="medium" class='reset-btn' icon="bimicon-friendadd" @click="addMaterials"></el-button>
                            </el-tooltip>
                        </div>
                    </el-tab-pane>
                    <!-- 用户材料-end -->

                    <!-- 用户分值-start -->
                    <el-tab-pane label="用户分值" name="fourth" class="paneStyle">
                        <ul class="tab-item-contianer">
                            <li>
                                <el-form-item label="用户分值：">
                                    <el-input v-model="userForm.score.score"></el-input>
                                </el-form-item>
                            </li>
                        </ul>
                    </el-tab-pane>
                    <!-- 用户分值-end -->
                    
                    <!-- 用户拓展-start -->
                    <el-tab-pane label="用户拓展" name="fifth" class="paneStyle">
                        <ul class="tab-item-contianer">
                            <template v-for="item in userForm.exts">
                                <li>
                                    <el-form-item :label="`${item.extName}：`">
                                        <el-input v-model="item.data"></el-input>
                                    </el-form-item>
                                </li>
                            </template>
                        </ul>
                    </el-tab-pane>
                    <!-- 用户拓展-end -->

                    <!-- 用户分值-start -->
                    <el-tab-pane label="角色信息" name="third" class="paneStyle">
                        <ul>
                            <li class="margin-bottom-20">
                                <el-button 
                                    size="medium" 
                                    icon="bimicon-roundaddlight" 
                                    class="custom-medium-btn primary-btn" 
                                    @click="addRoles">
                                    添加
                                </el-button>
                            </li>
                            <li>
                                <role-view @selectedChange="onRoleSelectedChange" :data="roleData" :showOrg="true" ref="roleTable"></role-view>
                            </li>
                        </ul>
                    </el-tab-pane>
                    <!-- 用户分值-end -->

                </el-tabs>
            </el-form>
            <!-- form-end -->
            <div slot="footer" class="dialog-footer">
                <el-button class="ljt-btn tiffany-btn" @click="cancel">取 消</el-button>
                <el-button class="ljt-btn primary-btn" @click="confirm">确 定</el-button>
            </div>
        </el-dialog>

        <!-- dialog-start -->
        <div class="dialog">
            <choose-user-role ref="userRole"></choose-user-role>
        </div>
    </div>
</template>

<script>
import { createUser, fetchListExt, uploadMaterial as uploadM, updateUserInfo } from '@/api/user'
import uploadAvatar from '@/components/Upload/uploadAvatar' // 上传头像组件
import uploadMaterial from '@/components/Upload/uploadMaterial' // 上传文件组件
import roleView from '@/components/Table/Role/userRoleView.vue' // 显示角色表格
import chooseUserRole from '@/components/Dialog/User/chooseUserRole' // 选择角色 dialog
import { filterSelect, elementFilelist } from '@/utils' // 过滤 select
import { mapState } from 'vuex'
import pinyin from 'pinyin' // 拼音库
import UserInfo from '@/model/UserInfo'
import UserBaseInfo from '@/model/UserBaseInfo'
import UserMaterials from '@/model/UserMaterials'
import UserExtInfo from '@/model/UserExtInfo'
import UserScore from '@/model/UserScore'
import type from '../DialogOptions'

export default {
    name: 'add-user',
    components: {
        uploadAvatar,
        uploadMaterial,
        roleView,
        chooseUserRole
    },
    props: {
        // 组织id
        orgId: {
            default: 'null'
        }
    },
    data() {
        return {
            visible: false,
            title: '',
            iconType: '',
            userId: '', // 用户id
            onOpened() {},
            onClosed() {},
            activeName: 'last', // 默认显示tab第一项
            userForm: {
                baseInfo: {},
                materials: [],
                score: {},
                exts: [],
                roles: []
            },
            rules: {},
            src: '',
            roleList: [], // 角色列表
            avatarUrl: '',
            fileListEntity: [], // 材料文件集合
            roleData: [], // 角色 table 数据
            selected: [], // 新增时选中的角色
            isShowMainJob: false // 是否显示主职 / 控制角色删除按钮显示隐藏
        }
    },
    computed: {
        ...mapState({
            // 学历
            eduDegreeList: state => filterSelect(state.dictionary.mappingCfg['common.eduDegree']),
            // 职称
            userTitleList: state => filterSelect(state.dictionary.mappingCfg['common.title']),
            // 工种
            professionList: state => filterSelect(state.dictionary.mappingCfg['common.user.profession']),
            // 特种作业证
            specialOpCertList: state => filterSelect(state.dictionary.mappingCfg['device.DeviceEntryType']),
            // 用户类型
            userTypeList: state => filterSelect(state.dictionary.mappingCfg['common.user.userType']),
            // 性别
            genderList: state => filterSelect(state.dictionary.mappingCfg['common.gender']),
            // 职务类别
            dutyCodeList: state => state.dictionary.dutyList,
            // 级别类型
            levelTypeList: state => state.dictionary.levelList
        }),
        // orgId
        oId() {
            return this.orgId
        }
    },
    methods: {
        // dialog事件
        async open({ data = new UserInfo() } = { data: new UserInfo() }) {
            if (this.visible) { return this }
            this.visible = true
            this.$store.dispatch('getDutyList') // 新建用户职务类别
            if (data.baseInfo.id) {
                this.editInit(data)
                return
            }
            this.createInit()
        },
        async confirm() {
            try {
                const valid = await this.$refs['userForm'].validate()
                if (valid) {
                    this.comfirmOption()
                }
            } catch (e) {
                return false
            }
        },
        cancel() {
            this.close(type.CANCEL)
        },
        close(option = type.CLOSE, sender) {
            if (!this.visible) { return }
            this.visible = false
            // 清除表单
            this.userForm = {
                baseInfo: {},
                materials: [],
                score: {},
                exts: [],
                roles: []
            }
            this.fileList = [] // 清除文件
            this.roleData = [] // 清空角色
            this.$refs['userForm'].clearValidate() // 清空校验规则

            const payload = {
                option,
                sender: this
            }
            if (typeof this.onClosed === 'function') {
                this.onClosed.call(this, payload) // eslint-disable-line
            }
        },
        // 新建初始化
        createInit() {
            this.title = '新建用户'
            this.iconType = 'plus'
            this.isShowMainJob = true // 隐藏是否主职
            this.avatarUrl = '' // 清空头像 url
            Object.assign(this.userForm,
                { baseInfo: new UserBaseInfo() }, // 初始化用户基本信息
                { score: new UserScore() } // 初始化用户分值
            )
            console.log(this.userForm)
            this.userForm.baseInfo.orgId = this.oId // orgId
            this.addMaterials() // 初始化用户材料
            this.userExts() // 初始化用户扩展
            this.fileListEntity = [] // 清空材料文件集合

            // 表单校验
            this.rules = {
                name: [
                    { required: true, trigger: 'blur', validator: this.userForm.baseInfo.validatorOf('name') }
                ],
                mobile: [
                    { required: true, trigger: 'blur', validator: this.userForm.baseInfo.validatorOf('mobile') }
                ]
                /* emergencyContactPhone: [
                    { trigger: 'blur', validator: this.userForm.baseInfo.validatorOf('emergencyContactPhone') }
                ],
                idNo: [
                    { trigger: 'blur', validator: this.userForm.baseInfo.validatorOf('idNo') }
                ]*/
            }
        },
        // 修改初始化
        async editInit(data) {
            this.title = '修改用户'
            this.iconType = 'edit'
            this.isShowMainJob = false // 显示是否主职
            this.userId = data.baseInfo.id // 用户 id
            try {
                this.fileListEntity = [] // 清空材料文件集合
                this.roleData = data.roles // 角色信息
                this.$nextTick(() => void this.$refs['roleTable'].toggleSelect(this.roleData)) // 默认选中角色
                data.materials.forEach((v, i) => {
                    if (!v.fileId) {
                        this.fileListEntity[i] = []
                    } else {
                        // 文件列表
                        this.fileListEntity.push(data._eleFilelist()[i]) // 类中的方法 装换成 element-upload 文件列表格式
                    }
                })
                // 判断是否有头像地址
                if (data.baseInfo.avatarUri) {
                    this.avatarUrl = `${process.env.API_ENDPOINT.slice(0, -5)}${data.baseInfo.avatarUri}`
                } else {
                    this.avatarUrl = ''
                }

                // 表单校验
                this.rules = {
                    name: [
                        { required: true, trigger: 'blur', validator: data.baseInfo.validatorOf('name') }
                    ],
                    mobile: [
                        { required: true, trigger: 'blur', validator: data.baseInfo.validatorOf('mobile') }
                    ]
                    /* emergencyContactPhone: [
                        { trigger: 'blur', validator: data.baseInfo.validatorOf('emergencyContactPhone') }
                    ],
                    idNo: [
                        { trigger: 'blur', validator: data.baseInfo.validatorOf('idNo') }
                    ]*/
                }
                this.userForm = data
                this.userForm.baseInfo.orgId = this.oId // orgid
                this.userForm.roles = this.selected // 传入角色列表数据
            } catch (error) {
                console.warn(`修改初始化${error}`)
            }
        },
        // 添加用户材料
        addMaterials() {
            const materials = new UserMaterials() // 用户材料类
            materials.userId = this.userId // 用户 id
            this.userForm.materials.push(materials)
        },
        // 添加用户角色
        addRoles() {
            const self = this
            this.$refs['userRole'].open()
            this.$refs['userRole'].onClosed = function(payload) {
                if (payload.option === type.CONFIRM) {
                    // 选中的角色传入角色列表
                    payload.data.forEach(v => {
                        self.roleData.push(v)
                    })
                    // 默认选中角色
                    self.$nextTick(() => void self.$refs['roleTable'].toggleSelect(payload.data))
                }
            }
        },
        // 选中的角色
        onRoleSelectedChange(selected) {
            this.userForm.roles = selected
            this.userForm.roles.forEach(v => {
                v.userId = this.userId // 角色添加用户 id
            })
        },
        // 用户拓展属性
        async userExts() {
            const extList = await fetchListExt() // 获取用户扩展属性
            extList.forEach(v => {
                // 过滤扩展属性是否可用
                if (v.valid) {
                    const exts = new UserExtInfo() // 初始化用户扩展属性
                    // 将获取到的属性扩展添加到用户的属性扩展中
                    Object.assign(exts,
                        { extName: v.colName }, // 扩展属性名称
                        { extType: v.colType }, // 扩展属性类型
                        { order: v.order }, // 排序
                        { extId: v.id }, // 扩展属性 id
                        { userId: this.userId } // 用户 id
                    )
                    this.userForm.exts.push(exts)
                }
            })
        },
        // 过滤用户材料是否上传文件
        filterMaterials() {
            this.userForm.materials.forEach((v, i) => {
                // 判断是否上传文件，若没有上传则删除该条材料
                if (!v.fileId) {
                    this.userForm.materials.splice(i, 1)
                }
            })
        },
        // 新建用户
        async createUser() {
            try {
                this.$store.commit('SHOW_WAITING')
                this.filterMaterials() // 过滤材料
                // 如果未选择性别，默认未知
                if (!this.userForm.baseInfo.gender) {
                    this.userForm.baseInfo.gender = 0
                }
                const data = this.userForm
                console.log(JSON.stringify(this.userForm))
                const create = await createUser(data)

                if (create.error) {
                    this.$message.error(`创建失败: ${create.error}`)
                    return false
                }

                this.$message.success('创建成功')
                this.close(type.CONFIRM)
            } catch (error) {
                this.$message.error(`创建失败: ${error.message}`)
                console.warn(`新建用户：${JSON.stringify(error)}`)
                return
            } finally {
                this.$store.commit('CLOSE_WAITING')
            }
        },
        // 修改用户信息
        async updateUser() {
            try {
                this.$store.commit('SHOW_WAITING')
                this.filterMaterials() // 过滤材料
                // 如果未选择性别，默认未知
                if (!this.userForm.baseInfo.gender) {
                    this.userForm.baseInfo.gender = 0
                }
                const data = this.userForm
                console.log(JSON.stringify(data))
                await updateUserInfo(data)
                this.$message.success('修改成功')
                this.close(type.CONFIRM)
            } catch (error) {
                this.$message.error(`修改失败: ${error.message}`)
                console.warn(`修改用户信息：${JSON.stringify(error)}`)
                return
            } finally {
                this.$store.commit('CLOSE_WAITING')
            }
        },
        // 点击确定按钮执行操作
        async comfirmOption() {
            try {
                if (this.userForm.baseInfo.id !== -1) {
                    await this.updateUser()
                    this.$refs['userForm'].resetFields()
                } else {
                    await this.createUser()
                    this.$refs['userForm'].resetFields()
                }
            } catch (e) {
                console.warn(JSON.stringify(e))
            }
        },
        // 获取全拼简拼
        getPinyin(val) {
            this.userForm.baseInfo.pinyin = pinyin(val, {
                style: pinyin.STYLE_NORMAL // 不带音标的全拼
            }).join('')
            this.userForm.baseInfo.jianpin = pinyin(val, {
                style: pinyin.lastFIRST_LETTER // 简拼
            }).join('')
        },
        // 删除用户材料、用户角色
        async removeMaterials(index) {
            try {
                await this.$confirm('此操作将会把该条记录从当前用户的材料中删除, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                })
                this.userForm.materials.splice(index, 1) // 删除对应材料的显示
                this.fileListEntity.splice(index, 1) // 删除对应材料文件的显示
                this.$message.success('删除成功')
            } catch (e) {
                this.$message.info('已取消删除')
            }
        },
        // 获取头像url
        getAvatarUrl(res) {
            this.userForm.baseInfo.avatarUri = res.filePath
        },
        // 上传材料
        async submitUpload(file, index) {
            try {
                const formData = new FormData()
                formData.append('material', file.file)
                const res = await uploadM(formData)
                Object.assign(this.userForm.materials[index],
                    { fileEntity: res }, // 文件实体
                    { fileUrl: res.filePath }, // 材料 url
                    { fileId: res.id }, // 文件 id 关联材料id
                    { id: res.id } // 材料id
                )
                this.fileListEntity.push(elementFilelist(this.fileList, res)) // 转换成 element fileList格式
                this.$message.success('上传成功')
            } catch (error) {
                this.$message.error(`上传失败: ${error.message}`)
                console.warn(`上传材料：${error}`)
            }
        }
    }
}
</script>

<style scoped>
ul, li {
    list-style-type: none;
}
.addContainer .materials {
    border-bottom: 1px dashed #ccc;
    /* margin-top: 22px; */
    display: flex;
    flex-flow: row wrap;
    padding: 0;
    margin: 0 20px;
    margin-bottom: 20px;
}
.addContainer .materials:last-child {
    margin-top: 0;
}
.addContainer .materials>li:last-child {
    width: 90%;
}
.addContainer .materials>li:first-child {
    width: 8%;
    position: relative;
}
.addContainer .materials>li:last-child>ul {
    display: flex;
    flex-flow: row wrap;
    padding: 0;
}
.addContainer .materials>li:last-child>ul>li {
    width: 50%;
}
.roles-desc {
    display: inline-block;
    width: 100%;
    color: #606266;
    font-size: 12px;
    overflow: hidden;
    text-overflow:ellipsis;
    white-space: nowrap;
}
.roles-desc-limit {
    width: 300px;
}
.tab-item-contianer {
    display: flex;
    flex-flow: row wrap;
}
.tab-item-contianer>li {
    width: 48%;
}
.tab-item-contianer .upload-container>li {
    text-align: center;
}
.tab-item-contianer>li>ul {
    padding: 0;
}
.selectStyle {
    width: 100%;
}
.paneStyle {
    height: 500px;
    overflow-y: auto
}
.uploadStyle {
    text-align: center;
}
.remove-btn {
    font-size: 20px;
    border-radius: 100%;
    position: absolute;
    top: 50%;
    margin-top: -42px;
}
.materials-item, .materials-item ul {
    padding: 0;
}
.mat-upload {
    margin-left: 50px;
}
#formSize>li>.el-form-item {
    margin-bottom: 10px;
}
.showMainJob {
    display: none;
}
</style>
