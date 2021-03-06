module.exports = {
    publicPath: './',
	assetsDir: 'static',
	devServer: {
		port: 8888,
		proxy: {
			'/api': {
				target: 'https://www.wanandroid.com',
				changeOrigin: true,
				pathRewrite: {
					'^/api': ''
				}
			}
		}
	},
}