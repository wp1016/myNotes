module.exports = {
  title: '我的学习记录',
  description: '学习记录',
  port: 8085,
  lastUpdated: '最近一次提交：',
  themeConfig: {
    nav: [
      { text: '数据结构', link: '/algorithms/' },
      { text: '网络协议', link: '/http/' },
      { text: '中文文档', link: '/docs/' },
      { text: 'js基础', link: '/js/' },
      { text: '采坑记录', link: '/records/' },
    ],
    sidebarDepth: 2,
    sidebar: {
      '/algorithms/': ['/algorithms/'],
      '/http/': ['/http/'],
      '/docs/': [
          {
            title: 'PhotoSwipe中文文档',
            collapsable: true,
            children: ['./PhotoSwipe中文文档.md'],
          },
          {
            title: 'workbox中文文档',
            collapsable: false,
            children: ['./workbox中文文档'],
          }
      ],
      '/js/': [
        {
          title: 'js判断鼠标进入方向',
          collapsable: true,
          children: ['./js判断鼠标进入方向'],
        },
        {
          title: 'js事件循环机制',
          collapsable: true,
          children: ['./js事件循环机制'],
        },
      ],
      '/records/': [
        {
          title: 'vue+ts采坑记录',
          collapsable: true,
          children: ['./vue+ts采坑记录'],
        },
      ],
    },
  },
}
