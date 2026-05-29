let warmOverlay = null;
let warmStyles = null;
let warmCursor = null;
let warmCursorHandler = null;

function injectTremorStyles() {
    const styleId = 'warm-tremor-keyframes';
    if (document.getElementById(styleId)) return;

    const style = document.createElement('style');
    style.id = styleId;
    style.textContent = `
    @keyframes warm-tremor {
      0% { transform: translate(0, 0); }
      25% { transform: translate(1px, -0.5px); }
      50% { transform: translate(-0.5px, 1px); }
      75% { transform: translate(-1px, 0.5px); }
      100% { transform: translate(0.5px, -0.5px); }
    }
  `;
    document.documentElement.appendChild(style);
}

function resetSimulation() {
    document.documentElement.style.filter = '';
    document.documentElement.style.clipPath = '';
    document.documentElement.style.pointerEvents = '';
    document.documentElement.style.transitionDelay = '';
    document.documentElement.style.cursor = '';
    document.documentElement.style.animation = '';

    document.querySelectorAll('*').forEach(el => {
        el.style.pointerEvents = '';
        el.style.animation = '';
        el.style.cursor = '';
        el.style.transition = '';
    });

    if (warmOverlay) {
        warmOverlay.remove();
        warmOverlay = null;
    }
    if (warmStyles) {
        warmStyles.remove();
        warmStyles = null;
    }
    if (warmCursor) {
        warmCursor.remove();
        warmCursor = null;
    }
    if (warmCursorHandler) {
        document.removeEventListener('mousemove', warmCursorHandler);
        warmCursorHandler = null;
    }

    chrome.storage.local.remove('warm-config');
}

function applySimulation(config) {
    resetSimulation();

    const style = document.documentElement.style;
    const filters = [];

    Object.values(config).forEach(cfg => {
        if (cfg.filter) filters.push(cfg.filter);
        if (cfg.clipPath) style.clipPath = cfg.clipPath;

        if (cfg.pointerEvents) {
            document.querySelectorAll('button, a, input, select, textarea').forEach(el => {
                el.style.pointerEvents = cfg.pointerEvents;
            });
        }

        if (cfg.transitionDelay) {
            document.querySelectorAll('*').forEach(el => {
                if (el !== document.documentElement) {
                    el.style.transition = `all ${cfg.transitionDelay}`;
                }
            });
        }

        if (cfg.tremor) {
            injectTremorStyles();
            style.animation = 'warm-tremor 0.1s infinite';
        }

        if (cfg.tremorCursor) {
            injectTremorStyles();
            style.cursor = 'none';

            warmCursor = document.createElement('div');
            warmCursor.id = 'warm-tremor-cursor';
            warmCursor.style.cssText = `
        position: fixed; pointer-events: none; z-index: 2147483647;
        width: 24px; height: 24px; border-radius: 50%;
        border: 2px solid #ff4444; background: rgba(255,68,68,0.2);
        transition: none;
      `;
            document.body.appendChild(warmCursor);

            let offsetX = 0;
            let offsetY = 0;
            warmCursorHandler = function onMouseMove(e) {
                offsetX += (Math.random() - 0.5) * 12;
                offsetY += (Math.random() - 0.5) * 12;
                offsetX *= 0.7;
                offsetY *= 0.7;
                warmCursor.style.left = `${e.clientX + offsetX - 12}px`;
                warmCursor.style.top = `${e.clientY + offsetY - 12}px`;
            };
            document.addEventListener('mousemove', warmCursorHandler);
        }

        if (cfg.cognitiveDegrade) {
            warmStyles = document.createElement('style');
            warmStyles.textContent = `
        nav, header, footer { opacity: 0 !important; pointer-events: none !important; }
        [aria-label], [title] { position: relative !important; }
        [aria-label]::after, [title]::after {
          content: attr(aria-label) attr(title) !important;
          font-size: 14px !important; color: #333 !important;
          background: #fff !important; padding: 2px 6px !important;
          border-radius: 4px !important; border: 1px solid #ddd !important;
        }
        svg, i[class*="icon"] { display: none !important; }
        img { opacity: 0.6 !important; }
      `;
            document.head.appendChild(warmStyles);
        }

        if (cfg.overlay && !warmOverlay) {
            warmOverlay = document.createElement('div');
            warmOverlay.id = 'warm-distraction-overlay';
            warmOverlay.style.cssText = `
        position: fixed; top: 0; left: 0; right: 0; bottom: 0;
        background: radial-gradient(circle, transparent 30%, rgba(0,0,0,0.4) 100%);
        pointer-events: none; z-index: 2147483647;
      `;
            document.body.appendChild(warmOverlay);
        }
    });

    if (filters.length > 0) {
        style.filter = filters.join(' ');
    }

    chrome.storage.local.set({ 'warm-config': config });
}

/* 消息监听器立即注册，确保在任何加载阶段都能响应弹出窗口 */
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    try {
        if (message.type === 'WARM_SIMULATE') {
            applySimulation(message.config);
            sendResponse({ status: 'applied' });
        } else if (message.type === 'WARM_RESET') {
            resetSimulation();
            sendResponse({ status: 'reset' });
        }
    } catch (err) {
        console.error('[WarmUI] message handler error:', err);
        sendResponse({ status: 'error', message: err.message });
    }
    return true;
});

/* DOM 依赖的操作延迟到 DOMContentLoaded 之后执行 */
function onDomReady() {
    try {
        injectTremorStyles();
    } catch (e) {
        console.warn('[WarmUI] inject tremor styles failed:', e);
    }

    chrome.storage.local.get('warm-config', (result) => {
        if (result['warm-config']) {
            applySimulation(result['warm-config']);
        }
    });
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', onDomReady);
} else {
    onDomReady();
}
