/**
 * 高对比度配色增强器 v2
 * 核心改进：
 * 1. 覆盖所有内容元素背景为transparent，防止子元素保留原背景导致颜色冲突
 * 2. 移除背景图和渐变，替换为纯色
 * 3. 覆盖伪元素背景
 * 4. 专门处理表单、表格、代码块
 * 5. 覆盖CSS变量颜色
 */
export class ContrastEnhancer {
  static id = 'contrast';
  static label = '高对比度';

  constructor() {
    this.isActive = false;
    this.styleEl = null;
  }

  enable(config) {
    const theme = config.theme || 'high-contrast';
    this.disable();

    const cssRules = this._generateThemeCSS(theme);
    if (cssRules) {
      const style = document.createElement('style');
      style.id = 'warm-elder-contrast';
      style.textContent = cssRules;
      document.head.appendChild(style);
      this.styleEl = style;
    }
    this.isActive = true;
  }

  disable() {
    if (this.styleEl) {
      this.styleEl.remove();
      this.styleEl = null;
    }
    this.isActive = false;
  }

  /** 生成指定主题的完整CSS规则 */
  _generateThemeCSS(theme) {
    switch (theme) {
      case 'high-contrast':
        return this._highContrastCSS();
      case 'deuteranopia':
        return this._deuteranopiaCSS();
      case 'dark':
        return this._darkCSS();
      default:
        return '';
    }
  }

  /** 高对比度模式：白底黑字，最高可读性 */
  _highContrastCSS() {
    return [
      '/* === 页面基础 === */',
      'html, body { background: #ffffff !important; color: #000000 !important; }',

      '/* === 所有内容元素背景透明（继承body白色） === */',
      'div, section, article, main, aside, header, footer, nav,',
      'p, span, ul, ol, li, dl, dt, dd, h1, h2, h3, h4, h5, h6,',
      'table, thead, tbody, tfoot, tr, td, th,',
      'form, fieldset, details, summary, figure, figcaption, blockquote, pre,',
      'label, legend, caption {',
      '  background-color: transparent !important;',
      '  background-image: none !important;',
      '  color: #000000 !important;',
      '}',

      '/* === 伪元素背景移除 === */',
      'div::before, div::after, section::before, section::after,',
      'header::before, header::after, footer::before, footer::after,',
      'nav::before, nav::after, article::before, article::after,',
      'main::before, main::after, aside::before, aside::after {',
      '  background-image: none !important;',
      '}',

      '/* === 链接 === */',
      'a { color: #0000EE !important; text-decoration: underline !important; background-color: transparent !important; background-image: none !important; }',
      'a:visited { color: #551A8B !important; }',

      '/* === 按钮 === */',
      'button, input[type="button"], input[type="submit"], input[type="reset"], [role="button"] {',
      '  background: #000000 !important; color: #ffffff !important;',
      '  border: 2px solid #000000 !important;',
      '}',

      '/* === 表单输入 === */',
      'input[type="text"], input[type="email"], input[type="password"],',
      'input[type="search"], input[type="tel"], input[type="url"],',
      'input[type="number"], textarea, select {',
      '  background: #ffffff !important; color: #000000 !important;',
      '  border: 2px solid #000000 !important;',
      '}',

      '/* === 表格边框 === */',
      'table, td, th { border: 1px solid #000000 !important; }',

      '/* === 代码块 === */',
      'pre, code { background: #f0f0f0 !important; color: #000000 !important; border: 1px solid #000000 !important; }',

      '/* === 分隔线 === */',
      'hr { border-color: #000000 !important; }',

      '/* === CSS变量覆盖 === */',
      ':root {',
      '  --color: #000000 !important; --text-color: #000000 !important; --fg: #000000 !important;',
      '  --bg: #ffffff !important; --background: #ffffff !important; --bg-color: #ffffff !important;',
      '  --primary: #0000EE !important; --link: #0000EE !important;',
      '  --border: #000000 !important;',
      '}'
    ].join('\n');
  }

  /** 色盲友好模式：仅调整链接和按钮颜色，保留原始背景 */
  _deuteranopiaCSS() {
    return [
      '/* === 链接（蓝橙配色，红绿色盲可辨） === */',
      'a { color: #0055A4 !important; }',
      'a:visited { color: #A45300 !important; }',

      '/* === 按钮 === */',
      'button, input[type="button"], input[type="submit"], input[type="reset"], [role="button"] {',
      '  background: #0055A4 !important; color: #ffffff !important;',
      '  border: 2px solid #0055A4 !important;',
      '}',

      '/* === 边框统一 === */',
      '* { border-color: #999999 !important; }',

      '/* === 表单输入 === */',
      'input[type="text"], input[type="email"], input[type="password"],',
      'input[type="search"], input[type="tel"], input[type="url"],',
      'input[type="number"], textarea, select {',
      '  border: 2px solid #0055A4 !important;',
      '}',

      '/* === CSS变量覆盖 === */',
      ':root {',
      '  --primary: #0055A4 !important; --link: #0055A4 !important;',
      '  --accent: #E65100 !important;',
      '}'
    ].join('\n');
  }

  /** 深色模式：全面覆盖所有元素背景，防止颜色冲突 */
  _darkCSS() {
    return [
      '/* === 页面基础 === */',
      'html, body { background: #1a1a2e !important; color: #e0e0e0 !important; }',

      '/* === 所有内容元素背景透明（继承body深色）+ 移除背景图 === */',
      'div, section, article, main, aside, header, footer, nav,',
      'p, span, ul, ol, li, dl, dt, dd, h1, h2, h3, h4, h5, h6,',
      'table, thead, tbody, tfoot, tr, td, th,',
      'form, fieldset, details, summary, figure, figcaption, blockquote, pre,',
      'label, legend, caption {',
      '  background-color: transparent !important;',
      '  background-image: none !important;',
      '  color: #e0e0e0 !important;',
      '}',

      '/* === 伪元素背景移除 === */',
      'div::before, div::after, section::before, section::after,',
      'header::before, header::after, footer::before, footer::after,',
      'nav::before, nav::after, article::before, article::after,',
      'main::before, main::after, aside::before, aside::after {',
      '  background-image: none !important;',
      '}',

      '/* === 结构区域微调色差（保留视觉层次） === */',
      'header, footer { background-color: #16213e !important; }',
      'nav { background-color: #16213e !important; }',

      '/* === 链接 === */',
      'a { color: #90cdf4 !important; background-color: transparent !important; background-image: none !important; }',
      'a:visited { color: #b794f4 !important; }',

      '/* === 按钮 === */',
      'button, input[type="button"], input[type="submit"], input[type="reset"], [role="button"] {',
      '  background: #2d3748 !important; color: #e0e0e0 !important;',
      '  border: 2px solid #4a5568 !important;',
      '}',

      '/* === 表单输入 === */',
      'input[type="text"], input[type="email"], input[type="password"],',
      'input[type="search"], input[type="tel"], input[type="url"],',
      'input[type="number"], textarea, select {',
      '  background: #2d3748 !important; color: #e0e0e0 !important;',
      '  border: 2px solid #4a5568 !important;',
      '}',

      '/* === 表格边框 === */',
      'table, td, th { border: 1px solid #4a5568 !important; }',

      '/* === 代码块 === */',
      'pre, code { background: #2d3748 !important; color: #e0e0e0 !important; border: 1px solid #4a5568 !important; }',

      '/* === 分隔线 === */',
      'hr { border-color: #4a5568 !important; }',

      '/* === 图片降低亮度 === */',
      'img { opacity: 0.85 !important; }',

      '/* === CSS变量覆盖 === */',
      ':root {',
      '  --color: #e0e0e0 !important; --text-color: #e0e0e0 !important; --fg: #e0e0e0 !important;',
      '  --bg: #1a1a2e !important; --background: #1a1a2e !important; --bg-color: #1a1a2e !important;',
      '  --primary: #90cdf4 !important; --link: #90cdf4 !important;',
      '  --border: #4a5568 !important;',
      '}'
    ].join('\n');
  }
}
