/*
* @Author: zhanglianhao
* @Date:   2018-02-24 10:53:10
* @Last Modified by:   zhanglianhao
* @Last Modified time: 2018-02-24 11:02:33
*/
import ObjectBase from './base/ObjectBase'
import { accessor } from './base/Decorators'

class FileEntity extends ObjectBase {
	@accessor()
	_createDate = '' // 创建日期

	@accessor()
	_createUserId = '' // 创建人id

	@accessor()
	_fileName = '' // 文件名

	@accessor()
	_filePath = '' // 文件路径

	@accessor()
	_fileSize = '' // 文件大小

	@accessor()
	_remark = '' // 备注

	@accessor()
	_thumbnail = '' // 缩略图
}

export default FileEntity