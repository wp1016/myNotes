# 项目中用到的技术栈
 
 1. 主要技术栈VUE+TS+PWA
 2. 移动端适配方案采用纯CSS适配方案，运用postcss实现 VW适配方案
 postcss.config.js配置如下
 ```  js{4}
 module.exports = {
  plugins: {
    'postcss-import': {},
    'postcss-url': {},
    'postcss-aspect-ratio-mini': {}, // 用来处理元素容器宽高比。
    'postcss-write-svg': {// 用来处理移动端1px的解决方案
      utf8: false
    },
    'postcss-cssnext': {},
    'postcss-px-to-viewport': {
      viewportWidth: 750, // 视窗的宽度，对应的是我们设计稿的宽度，一般是750
      viewportHeight: 1334, // 视窗的高度，根据750设备的宽度来指定，一般指定1334，也可以不配置
      unitPrecision: 3, // 指定`px`转换为视窗单位值的小数位数（很多时候无法整除）
      viewportUnit: 'vw', // 指定需要转换成的视窗单位，建议使用vw
      selectorBlackList: ['.gkui'], // 指定不转换为视窗单位的类，可以自定义，可以无限添加,建议定义一至两个通用的类名
      minPixelValue: 1, // 小于或等于`1px`不转换为视窗单位，你也可以设置为你想要的值
      mediaQuery: false // 允许在媒体查询中转换`px`
    },
    'postcss-viewport-units': {},
    cssnano: {
      preset: 'advanced',
      autoprefixer: false,
      'postcss-zindex': false
    }
  }
}

 ```
 3. 性能优化方面运用SW离线缓存静态资源文件
 
# 采坑日志

## vue-cli3脚手架项目favicon如何修改

**使用官方脚手架生成的项目中**

修改public目录下的index.html文件 打包后favicon未生效
```  js{4}
    <link rel="apple-touch-icon" sizes="180x180" href="//static001.geekbang.org/static/icon/time/apple-touch-icon.png">
    <link rel="icon" type="image/png" sizes="32x32" href="//static001.geekbang.org/static/icon/time/favicon-32x32.png">
    <link rel="icon" type="image/png" sizes="16x16" href="//static001.geekbang.org/static/icon/time/favicon-16x16.png">
```
查阅配置文档发现 是pwa选项的默认配置导致；

将配置修改为如下配置后favicon终于生效
```  js{4}
pwa:{
    iconPaths: {
      favicon32: '/static/icon/time/favicon-32x32.png',
      favicon16: '/static/icon/time/favicon-16x16.png',
      appleTouchIcon: '/static/icon/time/apple-touch-icon.png'
    }
}
```
## 在使用postcss-px-to-viewport 插件转换CSS与第三方插件冲突问题

**在使用gkui过程中由于插件自动转换PX导致postcss-loader发出警告**
```  js{4}
 warning  in ./src/assets/css/gkui.scss

Module Warning (from ./node_modules/postcss-loader/src/index.js):
Warning

(45:7) '.gkui-message-content-wrap .gkui-message-close .defaultClose:before, .gkui-message-content-wrap .gkui-message-close .defaultClose:after' already has a 'content' property, give up to overwrite it.

 @ ./src/assets/css/gkui.scss 4:14-232 14:3-18:5 15:22-240
 @ ./node_modules/cache-loader/dist/cjs.js??ref--14-0!./node_modules/babel-loader/lib!./node_modules/ts-loader??ref--14-2!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/App.vue?vue&type=script&lang=ts&
 @ ./src/App.vue?vue&type=script&lang=ts&
 @ ./src/App.vue
 @ ./src/main.ts
 @ multi (webpack)-dev-server/client?https://social.geekbang.org:8090/sockjs-node (webpack)/hot/dev-server.js ./src/main.ts
```
- 原因：postcss-px-to-viewport 插件会默认给每一个css类添加 content属性，而gkui内部分样式也有content属性触发警告

在postcss.config.js中添加过滤类名后warning消失
``` js{4}
'postcss-px-to-viewport': {
      ...
      selectorBlackList: ['.gkui'], // 指定不转换为视窗单位的类，可以自定义，可以无限添加,建议定义一至两个通用的类名
      ...
    },
```
## 骨架屏方案vue-cli3端口冲突问题
在skeletonPlugin.js中修改如下代码即可
``` js{4}
SkeletonPlugin.prototype.createServer = function () { // eslint-disable-line func-names
  if (!this.server) {
    const server = this.server = new Server(this.options) // eslint-disable-line no-multi-assign
    server.listen().catch(err => server.log.warn(err))
  }
}
```
问题：写入的骨架屏没有生效

原因是 html-webpack-plugin 插件会将打包后的html文件中的注释去掉
而骨架屏插件 根据 ```<--shell-->```动态插入骨架屏代码，修改html-webpack-plugins中的注释选项即可，由于自动生成的骨架屏文件略大，效果不佳。**弃用**


## 引入自定义第三方插件时显示未找到模块

在引入geekui时提示未找到模块
``` js{4}
import MessagePlugin from 'gkui/message'

//报错信息为
ERROR in /Users/wangpan/Documents/git/social.geekbang.org/src/utils/index.ts
4:27 Cannot find module 'gkui/message'.
    2 | import Vue from 'vue'
    3 | import { KVAny, WindowType } from '@/interfaces'
  > 4 | import MessagePlugin from 'gkui/message'
      |                           ^
    5 | declare let window: WindowType
    6 | Vue.use(MessagePlugin)
    7 | const utils: KVAny = {

Type checking in progress.
```
修改为commonjs模式引入后提示信息消失
``` js{4}
const MessagePlugin = require('gkui/message')
```
补充：提示信息消失但问题并未解决，使用TS重写message组件后本地引用解决

**原因** :由于第三方组件非TS实现且没有d.ts的声明文件导致

由于TS完美兼容JS，也可使用JS组件引入模块的方式

## 使用postcss-wtite-svg 解决移动端1px边框显示问题

定义全局css函数
``` css{4}
  @svg 1px-border {
    width: 4px;
    height: 4px;
    @rect {
      fill: transparent;  
      width: 100%;  
      height: 100%;  
      stroke-width: 25%;  
      stroke: var(--color, #e8e8e8);  
    }
  }
```

使用时
``` css{4}
  border 0 // 如果不设置border:0 在ios下会显示4个方向的边框
  border-bottom 1px solid
  border-image @css{svg(1px-border) 2 1 stretch} 
```

**当border-image 设置为 @css{svg(1px-border) 1 stretch} 时在安卓下只能显示出左边框和上边框；需改为border-image @css{svg(1px-border) 2 1 stretch}**

扩展 
border-image属性介绍
- border-image-source 图片路径
- border-image-slice 图片剪裁位置 
- border-image-repeat 重复性

### border-image-source 
使用url()函数即可
### border-image-slice
1. 没有单位，专指像素
2. 支持百分比
3. 裁剪特性(九宫格特性)

### border-image-repeat
- round 平铺
- repeat 重复
- stretch 拉伸

**详情见[张鑫旭大佬博客](https://www.zhangxinxu.com/wordpress/2010/01/css3-border-image/)**

## 做列表惰性加载时的高度计算问题

[vue-virtual-scroller](https://github.com/Akryum/vue-virtual-scroller)

[vue-virtual-scroll-list](https://github.com/tangbc/vue-virtual-scroll-list)


在研究列表惰性加载时需要计算每一项的高度值传入组件做惰性加载，由于动态内容支持富文本，所以需要计算富文本区域的高度。**计算太复杂而且会有滑动过快白屏的问题，改用原生滚动**


## 优化个人中心滑动问题
- 问题1：由于 -webkit-overflow-scrolling touch 会导致页面锁死产生下拉时可能滑动事件冲突出现咧嘴的现象。

  改用better-scroll模拟滚动效果
  1. 当浮动块处于顶部，列表滚动到顶部时可下拉触发浮动块移动，此时若手指触发的区域为列表区域会导致列表滚动事件触发阻止浮动块滚动事件
  2. 考虑在滚动时动态禁止或开启列表滚动事件，手势冲突问题结局，但是又出现新的问题，动态方法有延迟会出现滑动体验不连续问题

  解决方案，重新梳理滑动逻辑，当滑动块处于顶部且列表向下滚动时禁止列表滚动向上滚动时开启列表滚动

- 问题2：当列表滚动时容易触发跳转详情页或者查看大图等点击事件，需要在滑动时阻止默认事件，查看betterscroll文档发现有preventDefault选项阻止默认时间，此时出现了横向滑动返回事件被阻止的情况，继续查看文档，eventPassthrough 属性可以不阻止交叉方向滑动的默认事件
**遗留: 由于betterscroll在移动端的滑动效果差强人意，后期准备完全弃用这个组件**


已弃用betterscroll，改用原生滚动实现，咧嘴问题通过滑动时动态设置overflow:hidden属性解决。


## TS中 高阶函数中的this问题以及在组件内使用this.$style时提示属性不存在

- 问题：在使用防抖函数等高阶函数 对返回的函数中执行上下文的赋值导致编辑器报错,提示信息如下
``` js{4}
'this' implicitly has type 'any' because it does not have a type annotation.Vetur(2683)
```
需要在函数参数上指定this的类型
``` js{4}
function(){
    return function(this:any){
        this.xxx=xxx
    }
}
```

## 代码生成缩略图第一次生成失败问题
- 问题：在使用代码生成缩略图的时候第一次点击渲染生成的图为带背景空白图，第二次生成的正常

- 原因：未知
- 解决：牺牲少量渲染时间使用V-IF每次点击提交时加载代码高亮的组件进行渲染


## html2canvas safari下文案丢失问题
- 问题：在safari 下富文本 最后一行样式异常
- 修改CSS属性将 富文本容器属性 overflow:hidden去掉后恢复正常

## 长按复制需求中点击事件与touch事件冲突问题
- 问题：长按复制需求中由于点击其他区域会跳转到详情页，绑定click事件在父元素上，由于长按手势是模拟实现，绑定touchstart 事件延迟触发。此时会出现复制按钮无法点击，每次触发了touchstart事件后不触发click事件

- 原因：分析原因是因为父元素的touchstart事件会先于子元素的click事件，由于touchstart中会关闭复制状态并且删除DOM，导致click事件无法触发

- 解决：
 1. 刚开始将复制按钮的click事件改成touchstartt事件冲突解决，但发现复制操作无法完成，document.execCommend('copy')一直返回false
 2. 只能用click事件才能完成复制操作，在复制按钮上绑定touchstart事件并阻止冒泡使点击复制时不触发父元素的touchstart事件解决
 
## 微信中接口获取UA不一致问题

由于每次路由跳转都会重新请求 auth接口获取用户信息，为了更好的用户体验选择使用SW缓存auth接口数据，导致在微信端登录时auth接口UA不一致问题。取消接口数据缓存后问题解决

- 原因：未知,可能跟x5内核有关

## PWA应用
 PWA快速入门 [lavas](https://lavas.baidu.com/pwa?tdsourcetag=s_pctim_aiomsg&qq-pf-to=pcqq.c2c)
    
 项目中运用了谷歌开源的库 workbox，也是vuecli默认的PWA库
 [https://developers.google.com/web/tools/workbox](https://developers.google.com/web/tools/workbox)