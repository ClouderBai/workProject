/*
 * @Author: LiuJunTing
 * @Date: 2018-01-29 21:00:46
 * @Last Modified by: LiuJunTing
 * @Last Modified time: 2018-03-19 17:25:47
 */

import Vue from 'vue'
import store from '@/store/index'

// 过滤属性类型
Vue.filter('indicatorType', function(value) {
    const mappingConfig = store.getters.mappingCfg[
        'material.maintain.monitorIndicatorTypeOptions'
    ]
    return mappingConfig[value] || ''
})

// 过滤性别
Vue.filter('gender', function(value) {
    const mappingConfig = store.getters.mappingCfg[
        'common.gender'
    ]
    return mappingConfig[value] || ''
})
