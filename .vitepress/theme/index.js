import DefaultTheme from 'vitepress/dist/client/theme-default'
import './custom.css'

const HOME_PAGE = '/guide/'

export default {
  ...DefaultTheme,
  enhanceApp({router}) {
    // 保证页面渲染完成
    setTimeout(() => {
      if (router.route.path === '/') {
        router.go(HOME_PAGE)
      }

      document.getElementsByClassName('nav-bar-title')[0].href = HOME_PAGE
    }, 200);
  }
}