# webpack 4+ 配置
babel: es6 转化为es5  
babel-plugin-transform-class-properties: class支持属性  
sass-loader: sass转译成css  
terser-webpack-plugin: js压缩  
optimize-css-assets-webpack-plugin: css压缩  
mini-css-extract-plugin: 将项目所有css抽取到单一的css文件中  
image-webpack-loader: 图片压缩  
cssnano: optimize-css-assets-webpack-plugin插件的依赖  
html-webpack-plugin: 对html模板进行拷贝并插入css和js  
postcss-loader: css兼容添加前缀 
@babel/plugin-syntax-dynamic-import 动态import第三方模块，将一些体积较大的模块动态按需分割

threejs体积比较大，采用了代码分割里的按需加载
