import BindableObject from './BindableObject'
import ValidatableObject from './ValidatableObject'

const callbacks = Symbol()
const decorators = Symbol()

export class DecoratorDescriptor {
    constructor(type, property, serializable, meta) {
        this.type = type
        this.property = property
        this.serializable = serializable
        this.meta = meta
    }

    type = ''
    property = ''
    serializable = false
    meta = null
}

export class DecoratorContext {
    constructor(o, property, type) {
        let proto = Object.getPrototypeOf(o)
        while (proto) {
            const decos = proto[decorators]
            if (decos) this.decorators.push(...decos)
            proto = Object.getPrototypeOf(proto)
        }
        if (typeof (property) === 'string') {
            this.decorators = this.decorators.filter(d => d.property === property)
        }
        if (typeof (type) === 'string') {
            this.decorators = this.decorators.filter(d => d.type === type)
        }
    }

    decorators = []
}

function decorate(target, descriptor) {
    if (!target.hasOwnProperty(decorators)) {
        Object.defineProperty(
            target,
            decorators,
            {
                value: [],
                enumerable: false,
                configurable: false,
                writable: false
            }
        )
    }
    target[decorators].push(descriptor)
}

function property(alias, type, meta, callback) {
    return function decorator(target, name, descriptor) {
        const accessor = alias || name.replace(/^_/, '')
        decorate(target, new DecoratorDescriptor(type, accessor, true, meta))
        if (!target.hasOwnProperty(callbacks)) {
            Object.defineProperty(
                target,
                callbacks,
                {
                    value: [],
                    enumerable: false,
                    configurable: false,
                    writable: false
                }
            )
        }
        if (!target.hasOwnProperty(accessor)) {
            Object.defineProperty(
                target,
                accessor,
                {
                    get: function getter() {
                        return this[name]
                    },
                    set: function setter(value) {
                        if (this[name] !== value) {
                            this[name] = value
                            this[callbacks].forEach(cb => {
                                cb.call(this, accessor, value)
                            })
                        }
                    },
                    configurable: false
                }
            )
        }
        if (typeof (callback) === 'function') {
            target[callbacks].push(callback)
        }
        descriptor.writable = true
        descriptor.enumerable = true
        descriptor.configurable = true
    }
}

export function ignoreImpl() {
    return function decorator(target, name, descriptor) {
        decorate(target, new DecoratorDescriptor('ignore', name, false))
    }
}

export function accessorImpl(alias) {
    return property(alias, 'accessor', null, function (p, v) {
        if (this instanceof BindableObject) {
            this.invokePropertyChanged.call(this, p, v)
        }
    })
}

export function validatorImpl(ins, alias) {
    return property(alias, 'validator', ins, async function (p, v) {
        if (this instanceof ValidatableObject && this.$enable) {
            const valid = await ins.validate(val)
            const args = {
                property: p,
                error: valid ? '' : ins.errorMessage
            }
            this.onValidated.call(this, args)
        }
    })
}

export function typeImpl(type, alias) {
    return property(alias, 'type', type)
}
