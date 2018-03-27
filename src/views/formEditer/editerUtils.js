import components from './components/content/componentsList'


/**
 * 定义对象内容
 **/
export class Element{
	constructor({id,name,type,allow,attributes,choose,children,render}){
    this.id = id
    this.name = name
    this.type = type      
    this.allow = allow
    this.attributes = attributes
    this.choose = choose
    this.render = render
    this.children = children
  }
}
/**
 * 创建element
 **/
export function createElement(elData){
  return new Element({
    id:elData.id,
    name:elData.name,
    type:elData.type,
    allow:elData.allow,
    attributes:elData.attributes,
    choose:elData.choose,
    render:elData.render,
    children:[],
  })
}

/**
 * 随机生成组件id
**/
export function guid(){
  return Math.floor((1 + Math.random()) * 10000);
}
/**
 * 类型
 * */
export function typeOf(obj) {
  const toString = Object.prototype.toString;
  const map = {
    '[object Boolean]': 'boolean',
    '[object Number]': 'number',
    '[object String]': 'string',
    '[object Function]': 'function',
    '[object Array]': 'array',
    '[object Date]': 'date',
    '[object RegExp]': 'regExp',
    '[object Undefined]': 'undefined',
    '[object Null]': 'null',
    '[object Object]': 'object'
  };
  return map[toString.call(obj)];
}
/**
 * 复制
**/
export function deepCopy(data) {
  const t = typeOf(data);
  let o;
  if (t === 'array') {
    o = [];
  } else if (t === 'object') {
    o = {};
  } else {
    return data;
  }
  
  if (t === 'array') {
    for (let i = 0; i < data.length; i++) {
      o.push(deepCopy(data[i]));
    }
  } else if (t === 'object') {
    for (let i in data) {
      o[i] = deepCopy(data[i]);
    }
  }
  return o;
}

/**
 * 根据name获取组件信息   创建对象
 **/
export function getElement(name){
	//随机组件id
	let elementInfo = deepCopy(components[name])
	elementInfo.id = guid()
	return createElement(elementInfo)
}
/**查找当前选择组件*/
export function findComponent(id, context) {
	const children = context;
	let childNode = null;
	if(children.length) {
		for(let i = 0; i < children.length; i++) {
			const child = children[i];
			const cid = child.id;
			if(cid === id) {
				childNode = child;
				break;
			}
			if(child.children) {
				let cNode = findComponent(id, child.children);
				if(cNode != null){
					childNode = cNode;
					break;
				}
			}
		}
	}
	return children;
}
/**删除当前选择组件**/
export function delComponent(id,list) {
	let parentList = list;
	if(parentList.length) {
		for(let i = 0; i < parentList.length; i++) {
			let child = parentList[i];
			const cid = child.id;
			if(cid === id) {
				parentList.splice(i, 1);
				break;
			}
			if(child.children){
				delComponent(id, child.children);
			}
		}
	}
	return parentList;
}
/**
 *删除组件后更新表单字段名称 列表
 * **/
export function updateFieldlist(list,fieldL=[]) {
	let parentList = list;
	let fieldList = fieldL;
	if(parentList.length) {
		for(let i = 0; i < parentList.length; i++) {
			let child = parentList[i];
			if(child.attributes.propName) {
				fieldList.push({id:child.id,value:child.attributes.propName.value});
			}
			if(child.children){
				fieldList.concat(updateFieldlist(child.children,fieldList));
			}
		}
	}
	return fieldList;
}
/**
 * 添加组件到列表
 * nodeInfo.parentId   要添加组件的父组件id
 * nodeInfo.parentList 父组件列表
 * nodeInfo.addItem    要添加组件详细信息
 * nodeInfo.newIndex   组件添加的位置
 * */
export function addChildtoComponents(nodeInfo) {
	const pID = nodeInfo.parentId;
	const addItem = nodeInfo.addItem;
	const index = nodeInfo.newIndex;
	let children = nodeInfo.parentList?nodeInfo.parentList:[];
	if(pID == 0) {// pid为0时在根目录添加
		children.splice(index,0,addItem);
	}else{
		for(let i = 0; i < children.length; i++) {
			const child = children[i];
			if(child.id === pID) {
				child.children.splice(index, 0, addItem);
				break;
			}
			if(child.children) {
				let childInfo = {
					parentId: pID,
					addItem: addItem,
					parentList: child.children,
					newIndex: index
				}
				addChildtoComponents(childInfo);
			}
		}
	}
	return children;
}

/**根据参数添加属性**/	
export function getStringTypeAttr(attributes){
	let stringAttr = ''
	Object.keys(attributes).forEach(key =>{
		let attrKey = ''
		let attr = ''
//		if(key !== 'formItemlabel'){
//			attrKey = `:${key}`
			attrKey = `${key}`
			attr = attributes[key].value ? `${attrKey}="${attributes[key].value}" ` : ''
//		}
		stringAttr += attr
	})
	return stringAttr
}

/**
 * 在当前操作之前判断字段名是否不为空且唯一
 * return  empty 空   提示需要填写并返回
 * 				 repeat 重复    提示并返回
 * 				 add  添加   将当前字段添加到列表并继续执行
 * 				 
 **/
export function getFieldState(formFields,currentComponent){
	let state = 'DEFAULT'
	if(Object.keys(currentComponent).length !== 0) {
		if(currentComponent.attributes.propName) {
			if(currentComponent.attributes.propName.value === '') {
				state = 'EMPTY';
				return state;
			}
			for(let i = 0; i < formFields.length; i++) {
				if(formFields[i].id != currentComponent.id && formFields[i].value === currentComponent.attributes.propName.value) {
					state = 'REPEAT';
					return state;
				}
			}
		}
	}
	return state;
}
