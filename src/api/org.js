import request from '@/utils/request'
import qs from 'qs'
import DepExtColDmnObj from '../model/DepExtColDmnObj'
import DepExtAddCol from '../model/DepExtAddCol'
import DepartInfoDmnObj from '../model/DepartInfoDmnObj'
import LevelClass from '../model/LevelClass'
import OrgBusType from '@/model/OrgBusType'
import OrgJobType from '@/model/OrgJobType'
import Position from '../model/Position'

// 树lazy加载
export function fetchOrgTreeByParentId(id) {
    return request({
        url: 'org/getChildrenNode',
        method: 'GET',
        params: { id }
    })
}

// 树lazy加载 根据系统配置展示组织树结构
export function fetchShowOrgTree(id, filter) {
    return request({
        url: 'org/showOrgTree',
        method: 'GET',
        params: { id, filter }
    })
}

// 获取岗位类别
export async function fetchAllPosition() {
    return (await request({
        url: 'org/getAllPosition',
        method: 'GET'
    })).map(v => new Position().init(v))
}

// 创建岗位
export function createPosition(data) {
    return request({
        url: 'org/createPosition',
        method: 'POST',
        data
    })
}

// 获取级别类型
export async function fetchLevelType(params) {
    return (await request({
        url: '/org/getAllLevelType',
        method: 'GET'
    }))
}

// 获取公司基本信息
export async function fetchAllOrgInfo(id) {
    const data = await request({
        url: '/org/getOrgInfo',
        method: 'GET',
        params: { id }
    })
    return {
        departInfoDmnObj: new DepartInfoDmnObj().init(data.departInfoDmnObj),
        orgExtColDmnObjList: data.orgExtColDmnObjList.map(v => new DepExtColDmnObj().init(v))
    }
}

// 获取点击树显示扩展信息
// export async function fetchOrgExtCOl(id) {
//     return (await request({
//         url: 'org/getOrgExtCOl',
//         method: 'GET',
//         params: { id }
//     })).map(v => new DepExtColDmnObj().init(v))
// }

// 获取集团或公司基本信息
export async function fetchLevelInfo(params) {
    return (await request({
        url: 'org/getAllLevelType',
        method: 'GET',
        params
    })).map(v => new LevelClass().init(v))
}

// 查询级别类别
export async function searchLevelInfo(params) {
    return (await request({
        url: 'org/getLevelTypeByCondition',
        method: 'GET',
        params
    })).map(v => new LevelClass().init(v))
}

// 新增级别类型
export function createLevelData(data) {
    return request({
        url: 'org/insertLevelType',
        method: 'POST',
        data
    })
}

// 更新级别类型
export function updateLevelData(data) {
    return request({
        url: 'org/updateLevelType',
        method: 'POST',
        data
    })
}

// 删除级别类型
export function deleteLevelData(data) {
    return request({
        url: 'org/deleteLevelType',
        method: 'POST',
        data
    })
}

// 校验级别类别code是否重复
export function checkLevelCode(code) {
    return request({
        url: 'org/valid/LevelCode',
        method: 'GET',
        params: {
            code: code
        }
    })
}

// 获取组织扩展属性
export async function fetchOrgInfo(params) {
    return (await request({
        url: 'org/getAllExtCol',
        method: 'GET',
        params
    })).map(v => new DepExtAddCol().init(v))
}

// 新增组织扩展属性
export function createOrgInfo(data) {
    return request({
        url: 'org/addExtCol',
        method: 'POST',
        data
    })
}

// 更新组织扩展属性状态
export function updateOrgProps(data) {
    return request({
        url: 'org/openExtCol',
        method: 'POST',
        data
    })
}

// 删除组织扩展属性
export function deleteOrgProps(data) {
    return request({
        url: 'org/deleteExtCol',
        method: 'POST',
        data
    })
}

// 删除组织节点
export function deleteOrgNode(id) {
    return request({
        url: 'org/deleteOrgNode',
        method: 'POST',
        data: qs.stringify({
            id
        })
    })
}

// 新增树部门
export function createOrg(departInfoDmnObj, orgExtColDmnObjList) {
    return request({
        url: 'org/createOrg',
        method: 'POST',
        data: { departInfoDmnObj, orgExtColDmnObjList }
    })
}

// 获取业务类mapping文件
export function fetchMenuFromCache() {
    return request({
        url: 'org/getMenuFromCache',
        method: 'GET'
    }).then(res => res.orgTypeCache)
}

// 业务类别table列表 数据
export async function fetchTableData() {
    return (await request({
        url: 'org/getAllBizType',
        method: 'GET'
    })).map(v => new OrgBusType().init(v))
}

//  删除业务类别
export function deleteBizType(data) {
    return request({
        url: 'org/deleteBizType',
        method: 'POST',
        data
    })
}

// 搜索
export function searchBizTypeByCondition(params) {
    return request({
        url: 'org/getBizTypeByCondition',
        method: 'GET',
        params
    })
}

//  新增业务table列表
export function createBizType(data) {
    return request({
        url: 'org/insertBizType',
        method: 'POST',
        data
    })
}

// 更新业务table列表
export function updateBizType(data) {
    return request({
        url: 'org/updateBizType',
        method: 'POST',
        data
    })
}

// 查询业务类别code
export function searchBizTypeCode(code) {
    return request({
        url: 'org/valid/BizTypeCode',
        method: 'GET',
        params: {
            code
        }
    })
}

// 删除岗位类别
export function deletePosition(data) {
    return request({
        url: 'org/deletePosition',
        method: 'POST',
        data
    })
}

// 新增岗位类别
export function createPositionType(data) {
    return request({
        url: 'org/insertPosition',
        method: 'POST',
        data
    })
}

// 修改岗位类别
export function updatePosition(data) {
    return request({
        url: 'org/updatePosition',
        method: 'POST',
        data
    })
}

// 条件查询岗位类别
export function searchPositionByCondition(params) {
    return request({
        url: 'org/getPositionByCondition',
        method: 'GET',
        params
    })
}

// 分类查询岗位类别
export function searchPositionByCat(params) {
    return request({
        url: 'org/getPositionByCat',
        method: 'GET',
        params
    })
}

// 岗位类别table
export async function fetchAllPositionType() {
    return (await request({
        url: 'org/getAllPosition',
        method: 'GET'
    })).map(v => new OrgJobType().init(v))
}

// 岗位下拉菜单
export function fetchPositionMenuFromCache() {
    return request({
        url: 'org/getMenuFromCache',
        method: 'GET'
    })
}

// 查询岗位类别code
export function searchPositionCode(code) {
    return request({
        url: 'org/valid/positionCode',
        method: 'GET',
        params: {
            code
        }
    })
}

// 创建岗位批量
export function createPositionBatch(orgId, positionList) {
    return request({
        url: 'org/createPositionBatch',
        method: 'POST',
        data: { orgId, positionList }
    })
}

// 修改部门信息
export function updateOrgInfo(departInfoDmnObj, orgExtColDmnObjList) {
    return request({
        url: 'org/updateOrgInfo',
        method: 'POST',
        data: { departInfoDmnObj, orgExtColDmnObjList }
    })
}

// 修改部门信息
export async function fetchGetAll() {
    return (await request({
        url: 'org/extCol/getAll',
        method: 'GET'
    })).map(v => new DepExtColDmnObj().init(v))
}

// 搜索组织树
export async function fetchTOrgByName(name) {
    return (await request({
        url: 'org/getTOrgByName',
        method: 'GET',
        params: { name }
    }))
}

// 重置组织下用户密码
export async function resetPassword(orgId) {
    return (await request({
        url: 'org/orgUser/resetPassword',
        method: 'GET',
        params: { orgId }
    }))
}

// 全展开组织结构组织树
export function fetchOrgTree(filter) {
    return request({
        url: '/org/OrgTree',
        method: 'GET',
        params: { filter }
    })
}
