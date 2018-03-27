import {
    Dialog
} from '../types'

const dialog = {
    state: {
    // ====================================组织维护=============================================
    // 设置
        typeofBusiness: false, // 业务类别维护
        jobCategory: false, // 岗位类别维护
        classMainten: false, // 级别类别维护
        orgPropsExt: false, // 组织属性扩展
        // 树
        treeAddDep: false, // 新增根部门
        treeData: null, // 创建根部门 | 子部门
        treeAddDepCb: null, // callback回调
        treeAddDepStatus: null, // 创建部门是否成功
        treeAddJob: false, // 树新增岗位
        treeSelectId: null,
        treeAddJobMore: false,
        treeModif: false,
        treeBaseData: null,
        treeExtData: null,
        // ====================================用户维护=============================================
        // 用户
        addUser: false, // 新增用户
        dutyMaintain: false, // 职位类别
        userPropsExt: false // 属性扩展
    },

    mutations: {
    // ====================================组织维护=============================================
        typeofBusiness: (state, status) => {
            state.typeofBusiness = status
        },
        jobCategory: (state, status) => {
            state.jobCategory = status
        },
        classMainten: (state, status) => {
            state.classMainten = status
        },
        orgPropsExt: (state, status) => {
            state.orgPropsExt = status
        },
        treeAddDep: (state, {
            status,
            data,
            callback
        }) => {
            state.treeAddDep = status
            state.treeData = data
            state.treeSelectId = data.treeSelectId
            state.treeAddDepCb = callback
        },
        treeAddJob: (state, {
            id,
            status
        }) => {
            state.treeAddJob = status
            state.treeSelectId = id
        },
        treeAddJobMore: (state, {
            id,
            status
        }) => {
            state.treeAddJobMore = status
            state.treeSelectId = id
        },
        treeModif: (state, {
            data,
            status
        }) => {
            state.treeBaseData = data
            state.treeModif = status
        },
        setTreeAddDepStatus: (state, {
            status
        }) => {
            state.treeAddDepStatus = status
        },

        // ====================================用户维护=============================================
        [Dialog.ADD_USER]: (state, status) => {
            state.addUser = status
        },
        dutyMaintain: (state, status) => {
            state.dutyMaintain = status
        },
        userPropsExt: (state, status) => {
            state.userPropsExt = status
        }
    },
    actions: {
        addDep: ({
            commit,
            state
        }, {
            status,
            args,
            error,
            callback
        }) => {
            commit('treeAddDep', {
                status,
                args,
                error,
                callback
            })
            new Promise((resolve, reject) => {

            })
        }

    }
}

export default dialog
