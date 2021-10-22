import DefaultTheme from 'vitepress/dist/client/theme-default'
import './custom.css'

export default {
  ...DefaultTheme,
  enhanceApp({router}) {
    // 保证页面渲染完成
    setTimeout(() => {
      if (router.route.path === '/') {
        router.go('/guide/')
      }
    }, 200);
  }
}