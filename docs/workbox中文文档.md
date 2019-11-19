# workbox中文文档
## 开始

本指南将向您展示如何启动和运行Workbox以路由网页的常见请求，并演示如何使用通用策略进行缓存。

由于大多数网站都包含CSS,JavaScript和图片,让我们看看如何使用service worker 和 workbox 来缓存和服务这些文件

### 创建和注册一个serviceworker 文件

在我们使用workbox之前，我们需要创建一个service worker 文件并注册到我们的网站

首先在网站根目录下创建一个service-worker.js文件,然后添加一个console.log ，这样我们就能看到他的加载

``` js{4}
console.log('Hello from service-worker.js');
```
如下所示在您的网页上注册 service worker文件
``` js{4}
<script>
// Check that service workers are registered
if ('serviceWorker' in navigator) {
  // Use the window load event to keep the page load performant
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/service-worker.js');
  });
}
</script>
```

用于告诉浏览器将其当做 service-worker文件来使用

如果你刷新页面，你会看到 service-worker文件下输出的日志

在chrome浏览器开发者工具中的 Application 选项里，你能看到service worker 已注册

**勾选 Update on reload 选项**