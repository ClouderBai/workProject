import { accessor } from './Decorators'
import { DecoratorContext } from './DecoratorUtil'

class ObjectBase {

    @accessor()
    _id = -1

    getType() {
        return this.constructor.name
    }

    equals(o) {
        if (!(o instanceof ObjectBase)) { return false }
        if (this._id !== o._id) { return false }
        if (this.getType() !== o.getType()) { return false }
        return true
    }

    decoratorOf(property, type) {
        return this.decoratorsOf(property, type)[0]
    }

    decoratorsOf(property, type) {
        const ctx = new DecoratorContext(this, property, type)
        return ctx.decorators
    }

    init(data) {
        for (let k in data) {
            if (k in this) {
                if (this[k] instanceof ObjectBase) {
                    this[k].init(data[k])
                } else {
                    const deco = this.decoratorOf(k, 'type')
                    if (deco) {
                        const proto = deco.meta
                        if (typeof (proto) !== 'function') {
                            throw new Error('Invalid prototype')
                        }
                        const test = new proto()
                        if (!(test instanceof ObjectBase)) {
                            throw new Error('Unsupported prototype')
                        }
                        if (data[k] instanceof Array) {
                            const arr = []
                            data[k].forEach(d => {
                                arr.push(new proto().init(d))
                            })
                            this[k] = arr
                        } else {
                            this[k] = new proto().init(data[k])
                        }
                    } else {
                        this[k] = data[k]
                    }
                }
            }
        }
        return this
    }

    toJSON() {
        const o = {}
        const ctx = new DecoratorContext(this)
        ctx.decorators.forEach(d => {
            if (d.serializable) {
                const v = this[d.property]
                if (v !== undefined && v !== null)
                    o[d.property] = v
            }
        })
        return o
    }

}

export default ObjectBase
