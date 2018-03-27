import request from '@/utils/request'
import store from '../store'

// 获取数字字典信息
export async function fetchMappingCfg() {
    let mapCfg = await request({
        url: 'dictionary/getDesignatedDics',
        method: 'POST',
        data: []
    })
    await store.commit('setMapCfg', mapCfg.mappingCfg);
}