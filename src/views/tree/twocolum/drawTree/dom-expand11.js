if (!window.HTMLElement) {
    console.error('当前浏览器不支持HTMLElement属性')
} else {
    // 添加子节点到尾部
    HTMLElement.prototype.append = function(newElm) {
        this.appendChild(newElm)
        return this
    }
    // 添加子节点到头部
    HTMLElement.prototype.prepend = function(newElm) {
        const children = this.children
        if (children.length === 0) {
            this.appendChild(newElm)
        } else {
            this.insertBefore(newElm, children[0])
        }
        return this
    }
    // 删除节点
    HTMLElement.prototype.remove = function(elm) {
        if (elm) {
            this.removeChild(elm)
        } else {
            this.parentNode.removeChild(this)
        }
        return this
        // if (elm) { // 删除子节点
        //   this.removeChild(elm)
        // } else { // 删除自身
        //   this.parentNode.removeChild(this)
        // }
        // return this
    }
    // 替换节点
    HTMLElement.prototype.replaceWith = function(newElm) {
        this.parentNode.insertBefore(newElm, this)
        this.parentNode.removeChild(this)
        return newElm
    }
    // 节点在父节点内的位置
    HTMLElement.prototype.index = function() {
        const elms = this.parentNode.children
        for (let i = 0; i < elms.length; i++) {
            if (elms[i] === this) {
                return i
            }
        }
        return -1
    }
    // 节点所处位置的所有同胞元素
    HTMLElement.prototype.siblings = function(tagName) {
        const siblingElms = []
        const parent = this.parentNode
        const isAllChild = !tagName
        if (!parent) {
            return siblingElms
        }
        const elms = parent.children
        for (let i = 0; i < elms.length; i++) {
            if (elms[i] === this) continue
            if (isAllChild || elms[i].tagName.toLowerCase() === tagName) {
                siblingElms.push(elms[i])
            }
        }
        console.log('siblingelms' + siblingElms)
        return siblingElms
    }
    // 添加兄弟节点到后面
    HTMLElement.prototype.after = function(newElm) {
        const parent = this.parentNode
        if (parent.lastChild === this) {
            parent.appendChild(newElm)
        } else {
            parent.insertBefore(newElm, this.nextSibling)
        }
        return this
    }
    // 添加兄弟节点到前面
    HTMLElement.prototype.before = function(newElm) {
        this.parentNode.insertBefore(newElm, this)
        return this
    }
    // 设置样式
    HTMLElement.prototype.css = function() {
        if (arguments.length > 0) {
            const option = arguments[0]
            if (typeof option === 'object') {
                for (const key in option) {
                    this.style[key] = option[key]
                }
            } else if (arguments[1] !== null && arguments[1] !== undefined) {
                this.style[option] = arguments[1]
            }
        }
        return this
    }
    // 判断包含class
    HTMLElement.prototype.hasClass = function(className) {
        return this.classList.contains(className)
    }
    // 添加class
    HTMLElement.prototype.addClass = function(className) {
        this.classList.add(className)
        return this
    }
    // 删除class
    HTMLElement.prototype.removeClass = function(className) {
        this.classList.remove(className)
        return this
    }
    // 绑定事件
    HTMLElement.prototype.bind = function(evtName, fn) {
        if (this.attachEvent) {
            this.attachEvent(`on` + evtName, fn)
        } else if (this.addEventListener) {
            this.addEventListener(evtName, fn)
        }
        return this
    }
    // 解除绑定事件
    HTMLElement.prototype.unbind = function(evtName, fn) {
        if (this.attachEvent) {
            this.detachEvent(`on${evtName}`, fn)
        } else if (this.addEventListener) {
            this.removeEventListener(evtName, fn)
        }
        return this
    }
    // 获取和设置属性
    HTMLElement.prototype.attr = function(attr, value) {
        if (arguments.length === 2) { // 设置
            this.setAttribute(attr, value)
        } else if (arguments.length === 1) {
            this.getAttribute(attr)
        }
        return this
    }
    HTMLDocument.prototype.bind = HTMLElement.prototype.bind
    HTMLDocument.prototype.unbind = HTMLElement.prototype.unbind
}
