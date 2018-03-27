import {addChildtoComponents,deepCopy} from '@/views/formEditer/editerUtils'

const editer= {
  state: {
  	currentDragname:'',//当前拖拽的对象名
    currentComponent: {}, //编辑页面选中组件
    componentList: [], //编辑页面全部组件
    elementList:[],//编辑页面全部组件  不包含结构
    formFields:[],//当前编辑页面表单字段名称   当前表单内唯一 {id：字段名}
    currentForm:{},//当前编辑表单信息 全部信息 
    originalForm:{},//原始表单数据，   默认为空     选择编辑表单时对比是否修改了表单 
    currentFormId:0,//当前编辑表单id
    hackReset:true,//强制刷新页面
  },
  mutations: {
  	currentDragname(state, data){
   	  state.currentDragname = data;
    },
    currentComponent(state, data){
   	  state.currentComponent = data;
    },
    componentList(state, {data}) {
    	state.componentList = data;
    	state.currentForm.data = data;
    },
    hackReset(state, data) {
    	state.hackReset = data;
    },
    updateCurrentAttr(state, vm) {
    	if(vm.name === 'options'){
    		state.currentComponent.attributes[vm.name] = vm.value;
    	}else{
    		state.currentComponent.attributes[vm.name].value = vm.value;
    	}
    },
    formFields(state,data){
    	state.formFields = data;
    },
    currentForm(state,{data}){
    	state.currentForm = data;
    	state.componentList = data.layout;
    	state.currentFormId = data.id;
    	if(data.layout && data.layout.length <= 0){
    		state.currentDragname = '';
		    state.currentComponent = {};
		    state.elementList = [];
		    state.formFields = [];
    	}
    },
    currentFormId(state,data){
    	state.currentFormId = data;
    },
    originalForm(state,data){
    	state.originalForm = deepCopy(data);
    },
  },
  actions: {
  	addComponent(context, componentInfo) {
    	let data = addChildtoComponents(componentInfo);
    	context.commit({type: 'componentList',data: data})
		}
  }
};

export default editer;
