export class Validator {
    constructor(errorMessage) {
        this.errorMessage = errorMessage
    }

    errorMessage = "Invalid Data"

    async validate(value, args) {
    }
}

export class Required extends Validator {
    constructor(allowEmptyString, errorMessage) {
        super(errorMessage)
        this.allowEmptyString = allowEmptyString;
    }

    allowEmptyString = false

    async validate(value, args) {
        return (!!value) && (this.allowEmptyString || !(/^\s*$/.test(value)))
    }
}

export class Regex extends Validator {
    constructor(regex, errorMessage) {
        super(errorMessage)
        this.regex = regex;
    }

    regex = /^.*$/

    async validate(value, args) {
        return this.regex.test(value)
    }
}

export function validatorOf(v, args) {
    return async function (rule, value, callback) {
        if (v instanceof Validator) {
            if (await v.validate(value, args)) {
                callback()
            } else {
                callback(new Error(v.errorMessage))
            }
        } else {
            throw (new Error('Invalid validator'))
        }
    }
}