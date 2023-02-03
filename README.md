
# uni-app + vue3 + vite + uView-v1

* 该脚手架默认使用 `cli` 开发
* 如果需要使用 `hBuilderx` 开发可在导入项目时，导入`src`目录即可


## 已安装的库
* uView-v1 (官方uView 1.0 只支持vue2,这里所使用的库是vk-uview-ui版本兼容vue3.0)： [https://ext.dcloud.net.cn/plugin?id=6692]

* 秋云 echarts图表库 [https://www.ucharts.cn/v2/#/]

## cli 方式开发


1. 启动小程序服务
`yarn dev:mp-weixin` 服务启动后会将小程序的包构建在 `dist/dev/mp-weixin` 目录，然后用 `微信开发者工具` 导入项目

2. 打包小程序
`yarn build:mp-weixin` 服务启动后会将小程序的包构建在 `dist/build/mp-weixin` 目录，然后用 `微信开发者工具` 导入项目


## hBuilderX 工具开发

在`hBuilderX` 打开 `src` 目录打开进行开发,编辑器里面启动会自动安装依赖 

1. 启动服务
点击 `运行 > 运行到小程序模拟器 > 微信开发者工具 ` 启动后会将小程序构建在 `unpackage/dist/dev/mp-weixin` 目录，然后用 `微信开发者工具` 导入项目

2. 打包小程序
点击 `发行 > 小程序-微信 ` 启动后会将小程序构建在 `unpackage/dist/dev/mp-weixin` 目录，然后用 `微信开发者工具` 导入项目