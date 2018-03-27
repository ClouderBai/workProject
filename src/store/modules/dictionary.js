import { fetchUserDuty, fetchListExt } from '@/api/user'
import { fetchLevelType, fetchAllPosition, fetchMenuFromCache } from '@/api/org'

const dictionary = {

    state: {
        mappingCfg: null, // 数字字典
        dutyList: [],
        extList: [],
        levelList: [],
        positionOpt: [],
        menuFromOpt: [] // 级别类型 业务类型  部门属性
    },

    mutations: {
        setMapCfg: (state, data) => {
            state.mappingCfg = data
        },
        setDutyList(state, { data }) {
            state.dutyList = data
        },
        setExtLsit(state, { data }) {
            state.extList = data
        },
        setLevelList(state, { data }) {
            state.levelList = data
        },
        setPositionOpt(state, { data }) {
            state.positionOpt = data
        },
        setMenuFromOpt(state, { data }) {
            state.menuFromOpt = data
        }
    },

    actions: {
        // 获取职务列表
        async getDutyList({ commit }) {
            try {
                const data = await fetchUserDuty()
                commit({
                    type: 'setDutyList',
                    data: data
                })
            } catch (e) {
                console.warn(`获取职务列表${e}`)
            }
        },
        // 获取拓展属性
        async getExtList({ commit }) {
            try {
                const data = await fetchListExt()
                commit({
                    type: 'setExtLsit',
                    data: data
                })
            } catch (e) {
                console.warn(`获取拓展属性${e}`)
            }
        },
        async getLevelList({ commit }) {
            try {
                const data = await fetchLevelType()
                commit({
                    type: 'setLevelList',
                    data: data
                })
            } catch (e) {
                console.warn(`${e}`)
            }
        },

        // 岗位类别
        async getPositionOpt({ commit }) {
            try {
                const data = new Map((await fetchAllPosition()).map(v => ([v.id, v.name])))
                commit('setPositionOpt', { data })
            } catch (e) {
                console.warn(`岗位类别${e}`)
            }
        },

        // 级别类型 业务类型  部门属性
        async getMenuFromOpt({ commit }) {
            try {
                const data = await fetchMenuFromCache()
                for (const v of Object.keys(data)) {
                    data[v] = new Map(data[v].map(v => ([v.code, v.name])))
                }
                commit('setMenuFromOpt', { data })
            } catch (e) {
                console.warn(`级别类型 业务类型  部门属性${e}`)
            }
        }
    }
}

export default dictionary
