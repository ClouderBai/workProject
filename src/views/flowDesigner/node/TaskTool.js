/**
 * Created by Jacky.Gao on 2017-07-06.
 */
import BaseTool from './BaseTool.js'
import TaskNode from './TaskNode.js'
import * as nodeEvent from './NodeProducerEvent.js'

export default class TaskTool extends BaseTool {
    getType() {
        return '人工任务'
    }
    getIcon() {
        return `<i class="uflo uflo-task" style="color:#737383"></i>`
    }
    newNode() {
        return new TaskNode()
    }
    getConfigs() {
        return {
            in: -1,
            out: -1,
            single: false
        }
    }

    buildTaskBasicConfig(target) {

    }

    buildTaskAssign(target) {

    }

    buildSpecifyAssignTable(target) {

    }

    buildTab(target) {

    }

    buildComponentAuthorityGroup(target) {

    }

    buildCustomData(target) {

    }

    buildComponentAuthority(componentAuthorities, data, body, dialog) {

    }

    buildCustomDataBody(userData, data, body, dialog) {

    }

    buildDueConfig(target) {

    }

    buildDueReminder(target) {

    }

    buildPeriodReminder(target) {

    }

    buildDueAction(target) {

    }

    buildPeriodDate(obj, title, tail, newObjectFun) {

    }

    buildHolidayTable(target, newCalendarsFun) {

    }

    getPropertiesProducer(target) {
        nodeEvent.eventEmitter.emit(nodeEvent.BUILD_TASK_CONFIG, target)
    }
}
