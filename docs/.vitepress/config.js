import { defineConfig } from 'vitepress';

export default defineConfig({
  title: 'WarmUI',
  description: '为长辈而生的适老化体验增强层',
  lang: 'zh-CN',
  themeConfig: {
    nav: [
      { text: '指南', link: '/guide/' },
      { text: '组件', link: '/components/button' },
      { text: '故事', link: '/stories/' },
      { text: '开发者工具', link: '/tools/' },
      { text: 'GitHub', link: 'https://github.com/user/warm-ui' }
    ],
    sidebar: {
      '/guide/': [
        { text: '为什么是 WarmUI', link: '/guide/' },
        { text: '快速开始', link: '/guide/getting-started' },
        { text: '设计哲学', link: '/guide/philosophy' },
        { text: '无障碍合规', link: '/guide/accessibility' }
      ],
      '/components/': [
        { text: 'Button 按钮', link: '/components/button' },
        { text: 'Text 文字', link: '/components/text' },
        { text: 'Card 卡片', link: '/components/card' },
        { text: 'Dialog 对话框', link: '/components/dialog' },
        { text: 'Toast 轻提示', link: '/components/toast' },
        { text: 'Guide 引导', link: '/components/guide' },
        { text: 'Note 便签', link: '/components/note' },
        { text: 'Rescue 救援', link: '/components/rescue' },
        { text: 'Speech 语音朗读', link: '/components/speech' },
        { text: 'Translator 翻译器', link: '/components/translator' },
        { text: 'Praise 夸赞', link: '/components/praise' },
        { text: 'Buddy 老友模式', link: '/components/buddy' }
      ],
      '/tools/': [
        { text: '合规检查', link: '/tools/' },
        { text: '主题系统', link: '/tools/themes' },
        { text: '老龄化模拟器', link: '/tools/simulator' }
      ]
    },
    socialLinks: [
      { icon: 'github', link: 'https://github.com/user/warm-ui' }
    ]
  }
});
