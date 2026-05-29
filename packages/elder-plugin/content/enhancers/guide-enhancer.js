/**
 * 页面引导增强器
 * 自动识别页面核心操作区域，提供视觉引导提示
 */
export class GuideEnhancer {
    static id = 'guide';
    static label = '页面引导';

    constructor() {
        this.isActive = false;
        this.styleEl = null;
        this.overlay = null;
    }

    enable(config) {
        this.disable();

        const style = document.createElement('style');
        style.id = 'warm-elder-guide';
        style.textContent = [
            '@keyframes warm-guide-pulse {',
            '  0% { box-shadow: 0 0 0 0 rgba(43,108,176,0.6); }',
            '  50% { box-shadow: 0 0 0 12px rgba(43,108,176,0.2); }',
            '  100% { box-shadow: 0 0 0 0 rgba(43,108,176,0.6); }',
            '}',
            '.warm-guide-highlight {',
            '  animation: warm-guide-pulse 2s ease-in-out infinite !important;',
            '  position: relative !important;',
            '  z-index: 2147483645 !important;',
            '  border-radius: 8px !important;',
            '}'
        ].join('\n');
        document.head.appendChild(style);
        this.styleEl = style;

        this.highlight();
        this.isActive = true;
    }

    disable() {
        if (this.styleEl) {
            this.styleEl.remove();
            this.styleEl = null;
        }
        if (this.overlay) {
            this.overlay.remove();
            this.overlay = null;
        }
        this.removeHighlights();
        this.isActive = false;
    }

    highlight() {
        const selectors = [
            'button[type="submit"]',
            'a.btn',
            'button:not([class*="close"]):not([class*="cancel"])'
        ];

        let target = null;
        for (const selector of selectors) {
            target = document.querySelector(selector);
            if (target && this.isVisible(target)) break;
            target = null;
        }

        if (target) {
            target.classList.add('warm-guide-highlight');

            this.overlay = document.createElement('div');
            this.overlay.textContent = '💡 试试点击这个按钮继续';
            this.overlay.style.cssText = [
                'position:fixed',
                'bottom:20px',
                'right:20px',
                'z-index:2147483646',
                'background:#2b6cb0',
                'color:#fff',
                'padding:14px 20px',
                'border-radius:16px',
                'font-size:16px',
                'font-family:-apple-system,BlinkMacSystemFont,"PingFang SC",sans-serif',
                'box-shadow:0 4px 20px rgba(0,0,0,0.2)',
                'max-width:260px',
                'line-height:1.5',
                'cursor:pointer'
            ].join(';');

            this.overlay.addEventListener('click', () => {
                this.disable();
            });
            document.body.appendChild(this.overlay);
        }
    }

    isVisible(el) {
        const rect = el.getBoundingClientRect();
        const style = window.getComputedStyle(el);
        return (
            rect.width > 0 &&
            rect.height > 0 &&
            style.display !== 'none' &&
            style.visibility !== 'hidden' &&
            style.opacity !== '0'
        );
    }

    removeHighlights() {
        const els = document.querySelectorAll('.warm-guide-highlight');
        for (const el of els) {
            el.classList.remove('warm-guide-highlight');
        }
    }
}
