const diaAccess = {
    state: {
        //====================================权限维护=============================================
        // 权限维护
        accessCategory: false,
        accessUser: false,

    },

    mutations: {
        accessCategory: (state, { status, type,code,name }) => {
            state.accessCategory = status
            state.accessType = type
            state.accessCode = code
            state.accessName = name
        },
        accessUser: (state, { status, type }) => {
            state.accessCategory = status
            state.accessType = type
        },


    }
}

export default diaAccess
