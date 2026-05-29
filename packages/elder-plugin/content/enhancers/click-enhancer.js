/**
 * 防误触增强器
 * 扩大可点击元素的交互区域，使用min-width/min-height确保触控目标尺寸
 */
export class ClickEnhancer {
  static id = 'click';
  static label = '防误触';

  constructor() {
    this.isActive = false;
    this.styleEl = null;
  }

  enable(config) {
    this.disable();

    const style = document.createElement('style');
    style.id = 'warm-elder-click';
    style.textContent = [
      'a, button, [role="button"], input[type="submit"],',
      'input[type="button"], input[type="reset"], select {',
      '  min-width: 44px !important;',
      '  min-height: 44px !important;',
      '  cursor: pointer !important;',
      '}',
      'a:hover, button:hover, [role="button"]:hover {',
      '  opacity: 0.85 !important;',
      '}',
      'a:active, button:active, [role="button"]:active {',
      '  opacity: 0.7 !important;',
      '}'
    ].join('\n');
    document.head.appendChild(style);
    this.styleEl = style;
    this.isActive = true;
  }

  disable() {
    if (this.styleEl) {
      this.styleEl.remove();
      this.styleEl = null;
    }
    this.isActive = false;
  }
}
