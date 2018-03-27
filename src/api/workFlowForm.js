import request from '@/utils/request'

//添加\发布表单
export function addForm(data) {
	return request({
		url: 'form/addForm',
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		data
	})
}

//删除指定表单
export async function deleteForm(data) {
	return request({
		url: 'form/deleteForm',
		method: 'GET',
		params: data
	})
}

//获取指定表单
export function openForm(data) {
	return request({
		url: 'form/openForm',
		method: 'GET',
		params: data
	})
}

//获取表单列表
export async function queryFormList(data) {
	return request({
		url: 'form/queryFormList',
		method: 'GET',
		params: data
	})
}

//根据条件检索
export function searchFormList(data) {
	return request({
		url: 'form/searchFormList',
		method: 'GET',
		params: data
	})
}

//启用或停用表单
export function switchEnable(data) {
	return request({
		url: 'form/switchEnable',
		method: 'POST',
		params: data
	})
}