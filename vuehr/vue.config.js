let proxyObj = {};
const CompressionPlugin = require("compression-webpack-plugin");
proxyObj['/ws'] = {
    ws: true,
    target: "ws://127.0.0.1:8081"
};
proxyObj['/api'] = {
    ws: false,
    target: 'http://127.0.0.1:8081',
    changeOrigin: true,
    pathRewrite: {
        '^/api': ''
    }
}
module.exports = {
    devServer: {
        host: '127.0.0.1',
        port: 8080,
        proxy: proxyObj,
        disableHostCheck: true,
    },
    configureWebpack: config => {
        if (process.env.NODE_ENV === 'production') {
            return {
                plugins: [
                    new CompressionPlugin({
                        test: /\.js$|\.html$|\.css/,
                        threshold: 1024,
                        deleteOriginalAssets: false
                    })
                ]
            }
        }
    }
}