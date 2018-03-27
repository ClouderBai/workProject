/*
 * @Author: LiuJunTing
 * @Date: 2018-02-08 17:51:47
 * @Last Modified by: LiuJunTing
 * @Last Modified time: 2018-03-09 13:56:18
 */

import Vue from 'vue'
import {
    randomColor
} from '@/utils'

// 随机颜色
Vue.directive('randomColor', function(e) {
    e.style.color = randomColor()
})

// 随机背景颜色
Vue.directive('randomBgColor', function(e) {
    e.style.backgroundColor = randomColor()
})
