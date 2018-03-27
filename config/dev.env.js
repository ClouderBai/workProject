'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
    ENV_NAME: '"development"',
    API_ENDPOINT: '"http://bim001.320.io/bimsapi/rest"',
})
