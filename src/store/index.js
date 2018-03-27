import Vue from 'vue'
import Vuex from 'vuex'
import app from './modules/app'
import user from './modules/user'
import tagsView from './modules/tagsView'
import getters from './getters'
import diaAccess from './modules/diaAccess'
import dictionary from './modules/dictionary'
import permission from './modules/permission'
import formEditer from './modules/formEditer'
import flowDesigner from './modules/flowDesigner.js'

Vue.use(Vuex)

const store = new Vuex.Store({
    modules: {
        app,
        user,
        tagsView,
        diaAccess,
        dictionary,
        permission,
        formEditer,
        flowDesigner
    },
    getters
})

export default store
