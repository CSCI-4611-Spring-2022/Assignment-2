const { merge } = require('webpack-merge')
const common = require('./webpack.common.js')
var WebpackObfuscator = require('webpack-obfuscator')

module.exports = merge(common, {
    mode: 'production',
    performance: {
        hints: false,
    },
    plugins: [
        new WebpackObfuscator({rotateStringArray: true, reservedStrings: [ '\s*' ]}, [])
    ],
    module: {
        rules: [
            {
                enforce: 'post',
                use: {
                    loader: WebpackObfuscator.loader,
                    options: {
                        reservedStrings: [ '\s*' ],
                        rotateStringArray: true
                    }
                }
            }
        ],
    }
})