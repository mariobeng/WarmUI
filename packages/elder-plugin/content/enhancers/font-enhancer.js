/**
 * 字体放大增强器 v2
 * 语义级字体缩放 + 智能溢出处理 + 容器自适应
 * 核心改进：
 * 1. 文字强制换行，防止溢出
 * 2. 移除文本截断（ellipsis/line-clamp）
 * 3. JS后处理：修复固定高度/overflow:hidden裁剪
 */
export class FontEnhancer {
  static id = 'font';
  static label = '字体放大';

  constructor() {
    this.isActive = false;
    this.styleEl = null;
    this.currentLevel = 1.5;
    this.fixedElements = [];
  }

  enable(config) {
    const level = config.level || '1.5';
    this.currentLevel = parseFloat(level);
    this.disable();

    const scale = this.currentLevel;
    const style = document.createElement('style');
    style.id = 'warm-elder-font';
    style.textContent = this._generateCSS(scale);
    document.head.appendChild(style);
    this.styleEl = style;

    this._fixOverflowIssues();
    this.isActive = true;
  }

  disable() {
    if (this.styleEl) {
      this.styleEl.remove();
      this.styleEl = null;
    }
    this._restoreElements();
    this.isActive = false;
  }

  /** 生成字体放大CSS，包含溢出防护规则 */
  _generateCSS(scale) {
    return [
      '/* === 字体尺寸 === */',
      'body, p, li, td, th, label, legend, figcaption,',
      'dd, dt, blockquote, pre, caption, summary, details {',
      '  font-size: ' + (16 * scale) + 'px !important;',
      '}',
      'h1 { font-size: ' + (28 * scale) + 'px !important; }',
      'h2 { font-size: ' + (22 * scale) + 'px !important; }',
      'h3 { font-size: ' + (19 * scale) + 'px !important; }',
      'h4, h5, h6 { font-size: ' + (16 * scale) + 'px !important; }',

      '/* === 行高 === */',
      'p, li, h1, h2, h3, h4, h5, h6, td, th, label, dd, dt, blockquote {',
      '  line-height: ' + (1.6 + (scale - 1) * 0.4) + ' !important;',
      '}',

      '/* === 文字强制换行，防止溢出容器 === */',
      'p, li, td, th, label, span, h1, h2, h3, h4, h5, h6,',
      'dd, dt, blockquote, figcaption, caption, summary, a, div {',
      '  overflow-wrap: break-word !important;',
      '  word-break: break-word !important;',
      '}',

      '/* === 移除文本截断（内容区域，不含导航标签） === */',
      'p, li, h1, h2, h3, h4, h5, h6, td, th, blockquote,',
      'dd, dt, figcaption, caption, summary, div {',
      '  text-overflow: clip !important;',
      '  -webkit-line-clamp: unset !important;',
      '}',

      '/* === 文本容器允许溢出可见 === */',
      'p, li, blockquote, dd, dt, figcaption, caption, summary,',
      'td, th, label, legend {',
      '  overflow: visible !important;',
      '}',

      '/* === 表格自适应 === */',
      'table {',
      '  table-layout: auto !important;',
      '  width: 100% !important;',
      '}',
      'td, th {',
      '  overflow-wrap: break-word !important;',
      '  word-break: break-word !important;',
      '}',

      '/* === 导航栏允许换行 === */',
      'nav, [role="navigation"] {',
      '  flex-wrap: wrap !important;',
      '  overflow: visible !important;',
      '}',

      '/* === 多列布局退化为单列 === */',
      '[style*="column-count"], [style*="column-width"],',
      '[class*="columns"], [class*="masonry"] {',
      '  column-count: 1 !important;',
      '  column-width: auto !important;',
      '}'
    ].join('\n');
  }

  /** JS后处理：修复CSS无法解决的溢出容器 */
  _fixOverflowIssues() {
    requestAnimationFrame(() => {
      setTimeout(() => {
        this._scanAndFixOverflow();
      }, 150);
    });
  }

  /** 扫描并修复溢出容器 */
  _scanAndFixOverflow() {
    const candidates = document.querySelectorAll(
      'div, section, article, main, aside, header, footer, nav'
    );

    for (const el of candidates) {
      if (!this._isTextContainer(el)) continue;

      const style = getComputedStyle(el);
      const isClipping = el.scrollHeight > el.clientHeight + 4;

      if (!isClipping) continue;

      if (style.overflow === 'hidden' || style.overflowY === 'hidden') {
        const original = el.style.getPropertyValue('overflow');
        el.style.setProperty('overflow', 'visible', 'important');
        this.fixedElements.push({ el, prop: 'overflow', original });
      }

      if (style.height && style.height !== 'auto' && style.height !== '0px') {
        const original = el.style.getPropertyValue('height');
        el.style.setProperty('height', 'auto', 'important');
        el.style.setProperty('min-height', style.height, 'important');
        this.fixedElements.push({ el, prop: 'height', original });
      }

      if (style.maxHeight && style.maxHeight !== 'none') {
        const original = el.style.getPropertyValue('max-height');
        el.style.setProperty('max-height', 'none', 'important');
        this.fixedElements.push({ el, prop: 'max-height', original });
      }
    }
  }

  /** 判断元素是否为文本容器（排除滚动区、弹窗、菜单等） */
  _isTextContainer(el) {
    const style = getComputedStyle(el);

    if (style.overflow === 'auto' || style.overflow === 'scroll' ||
        style.overflowY === 'auto' || style.overflowY === 'scroll' ||
        style.overflowX === 'auto' || style.overflowX === 'scroll') {
      return false;
    }

    const role = el.getAttribute('role');
    if (role && ['dialog', 'menu', 'listbox', 'combobox', 'tooltip', 'alertdialog', 'tablist'].includes(role)) {
      return false;
    }

    if (el.clientWidth < 50 || el.clientHeight < 20) {
      return false;
    }

    if (style.position === 'fixed') {
      return false;
    }

    return true;
  }

  /** 恢复JS修改的元素样式 */
  _restoreElements() {
    for (const fix of this.fixedElements) {
      try {
        if (fix.original) {
          fix.el.style.setProperty(fix.prop, fix.original, 'important');
        } else {
          fix.el.style.removeProperty(fix.prop);
        }
      } catch (_e) {
        // 元素可能已从DOM移除
      }
    }
    this.fixedElements = [];
  }
}
