
import { accessorImpl, ignoreImpl, typeImpl, validatorImpl } from './DecoratorUtil'
import { Required, Regex } from './Validators'

export function accessor(alias) {
    return accessorImpl(alias)
}

export function ignore() {
    return ignoreImpl()
}

export function type(t) {
    return typeImpl(t)
}

export function required(allowEmptyString, errorMessage) {
    return validatorImpl(new Required(allowEmptyString, errorMessage))
}

export function regex(regex, errorMessage) {
    return validatorImpl(new Regex(regex, errorMessage))
}
