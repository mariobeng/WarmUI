/**
 * 阅读模式增强器 v2
 * 核心改进：
 * 1. 移除装饰性背景大图，替换为纯色
 * 2. 简化页面布局（侧边栏折叠、内容区最大化）
 * 3. 隐藏明确广告iframe
 * 4. 增加内容区可读性（最大宽度、居中）
 */
export class LayoutEnhancer {
  static id = 'layout';
  static label = '阅读模式';

  constructor() {
    this.isActive = false;
    this.styleEl = null;
  }

  enable(config) {
    this.disable();

    const style = document.createElement('style');
    style.id = 'warm-elder-layout';
    style.textContent = this._generateCSS();
    document.head.appendChild(style);
    this.styleEl = style;

    this._removeBackgroundImages();
    this.isActive = true;
  }

  disable() {
    if (this.styleEl) {
      this.styleEl.remove();
      this.styleEl = null;
    }
    this._restoreBackgroundImages();
    this.isActive = false;
  }

  /** 生成阅读模式CSS */
  _generateCSS() {
    return [
      '/* === 隐藏明确广告iframe === */',
      'iframe[src*="doubleclick"], iframe[src*="googlead"],',
      'iframe[src*="adsystem"], iframe[src*="adservice"],',
      'iframe[src*="googlesyndication"], iframe[src*="facebook.com/plugins"],',
      'iframe[src*="adnxs"], iframe[src*="amazon-adsystem"] {',
      '  display: none !important;',
      '}',

      '/* === 移除装饰性背景图（大容器） === */',
      'body, div, section, article, main, header, footer, nav, aside {',
      '  background-image: none !important;',
      '}',

      '/* === 伪元素装饰背景移除 === */',
      'div::before, div::after, section::before, section::after,',
      'header::before, header::after, footer::before, footer::after {',
      '  background-image: none !important;',
      '}',

      '/* === 内容区最大化可读性 === */',
      'article, main, [role="main"] {',
      '  max-width: 800px !important;',
      '  margin-left: auto !important;',
      '  margin-right: auto !important;',
      '  padding: 16px !important;',
      '}',

      '/* === 侧边栏缩小提示 === */',
      'aside, [role="complementary"], [class*="sidebar"], [class*="side-bar"] {',
      '  opacity: 0.6 !important;',
      '  max-height: 200px !important;',
      '  overflow: auto !important;',
      '}',

      '/* === 弹窗/浮层降低干扰 === */',
      '[class*="popup"]:not([role="dialog"]), [class*="modal"]:not([role="dialog"]),',
      '[class*="overlay"]:not([role="dialog"]) {',
      '  display: none !important;',
      '}',

      '/* === 浮动广告隐藏 === */',
      '[class*="float-ad"], [class*="sticky-ad"], [id*="float-ad"], [id*="sticky-ad"] {',
      '  display: none !important;',
      '}'
    ].join('\n');
  }

  /** JS后处理：移除大尺寸背景图元素 */
  _removeBackgroundImages() {
    const containers = document.querySelectorAll(
      'div, section, header, footer, nav, aside, article, main'
    );

    this._originalBgImages = [];

    for (const el of containers) {
      const style = getComputedStyle(el);
      const bgImage = style.backgroundImage;

      if (!bgImage || bgImage === 'none') continue;

      // 判断是否为装饰性背景图（元素较大且有文字内容）
      const isDecorative = el.clientWidth > 300 && el.clientHeight > 100;
      const hasText = this._hasTextContent(el);

      if (isDecorative && hasText) {
        this._originalBgImages.push({
          el,
          originalBgImage: el.style.backgroundImage,
          originalBgColor: el.style.backgroundColor
        });

        // 根据当前页面背景色选择替代色
        const pageBg = this._getPageBackgroundColor();
        el.style.setProperty('background-image', 'none', 'important');
        el.style.setProperty('background-color', pageBg, 'important');
      }
    }
  }

  /** 恢复被移除的背景图 */
  _restoreBackgroundImages() {
    if (!this._originalBgImages) return;

    for (const item of this._originalBgImages) {
      try {
        if (item.originalBgImage) {
          item.el.style.setProperty('background-image', item.originalBgImage, 'important');
        } else {
          item.el.style.removeProperty('background-image');
        }
        if (item.originalBgColor) {
          item.el.style.setProperty('background-color', item.originalBgColor, 'important');
        } else {
          item.el.style.removeProperty('background-color');
        }
      } catch (_e) {
        // 元素可能已从DOM移除
      }
    }
    this._originalBgImages = [];
  }

  /** 判断元素是否包含文本内容 */
  _hasTextContent(el) {
    const text = el.textContent.trim();
    if (text.length > 10) return true;

    const textChildren = el.querySelectorAll('p, h1, h2, h3, h4, h5, h6, span, a, li');
    return textChildren.length > 0;
  }

  /** 获取页面有效背景色 */
  _getPageBackgroundColor() {
    let el = document.body;
    while (el) {
      const bg = getComputedStyle(el).backgroundColor;
      if (bg && bg !== 'rgba(0, 0, 0, 0)' && bg !== 'transparent') {
        return bg;
      }
      el = el.parentElement;
    }
    return '#ffffff';
  }
}
