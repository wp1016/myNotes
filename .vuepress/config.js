module.exports = {
  title: '我的学习记录',
  description: '学习记录',
  port: 8085,
  lastUpdated: '最近一次提交：',
  themeConfig: {
    nav: [
      {
        text: '计算机基础',
        items: [
          { text: '数据结构', link: '/algorithms/' },
          { text: '网络协议', link: '/http/' },
        ],
      },
      {
        text: '前端基础',
        items: [
          {
            text: 'JavaScript',
            items: [
              { text: 'js判断鼠标进入方向', link: '/js/js判断鼠标进入方向.md' },
              { text: 'js事件循环机制', link: '/js/js事件循环机制.md' },
            ],
          },
          {
            text: 'TypeScript',
            items: [
              { text: 'Typescript 学习记录', link: '/typeScript/TypeScript' },
            ],
          },
        ],
      },
      {
        text: '中文文档',
        items: [
          { text: 'PhotoSwipe中文文档', link: '/docs/PhotoSwipe中文文档' },
          { text: 'workbox中文文档', link: '/docs/workbox中文文档' },
        ],
      },
      {
        text: '采坑记录',
        items: [
          {
            text: 'vue+ts采坑记录',
            link: '/records/vue+ts采坑记录',
          },
        ],
      },
      {
        text: '文章',
        link: '/articles/index'
      }
    ],
    sidebarDepth: 2,
    sidebar: 'auto',
    '/articles/': {
      sidebar: 'auto'
    }
  },
  evergreen: true
}
