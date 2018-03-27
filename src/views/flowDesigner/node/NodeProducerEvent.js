import events from 'events'

export const BUILD_FLOW_CONFIG = 'build_flow_config'// 点击空白
export const BUILD_START_CONFIG = 'build_start_config'// 点击开始节点
export const BUILD_ACTION_CONFIG = 'build_action_config'// 点击动作
export const BUILD_TASK_CONFIG = 'build_task_config'// 点击人工任务
export const BUILD_COUNTERSIGN_CONFIG = 'build_countersign_config'// 点击会签任务
export const BUILD_FOREACH_CONFIG = 'build_foreach_config'// 点击动态分支节点
export const BUILD_SUBPROCESS_CONFIG = 'build_subprocess_config'// 点击子流程节点
export const BUILD_DECISION_CONFIG = 'build_decision_config'// 点击路由决策节点
export const BUILD_END_CONFIG = 'build_end_config'// 点击结束分支节点
export const BUILD_END_TERMINAL_CONFIG = 'build_end_terminal_config'// 点击结束流程节点
export const BUILD_FORK_CONFIG = 'build_fork_config'// 点击分支节点
export const BUILD_JOIN_CONFIG = 'build_join_config'// 点击聚合节点

export const eventEmitter = new events.EventEmitter()
