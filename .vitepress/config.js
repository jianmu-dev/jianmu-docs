module.exports = {
  title: 'jianmu(建木)',
  description: '建木文档',
  lang: 'zh-CN',
  head: [
    // 改变title的图标
    [
      'link',
      {
        rel: 'icon',
        href: '/favicon.ico',
      },
    ],
  ],
  // 主题配置
  themeConfig: {
    // 头部导航
    nav: [
      {text: '首页', link: '/'},
      {text: '教程', link: '/guide/index'},
    ],
    // 侧边导航
    sidebar: [
      {
        text: 'Getting Started',
        link: '/guide/index',
        children: [
          {text: '第一章', link: '/guide/chapter-1'},
          {text: '第二章', link: '/guide/chapter-2'},
        ]
      }
    ]
  }
}