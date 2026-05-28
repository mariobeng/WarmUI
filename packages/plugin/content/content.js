let warmOverlay = null;
let warmStyles = null;

function resetSimulation() {
    document.documentElement.style.filter = '';
    document.documentElement.style.clipPath = '';
    document.documentElement.style.pointerEvents = '';
    document.documentElement.style.transitionDelay = '';
    document.documentElement.style.cursor = '';
    document.querySelectorAll('*').forEach(el => {
        el.style.pointerEvents = '';
        el.style.animation = '';
        el.style.cursor = '';
    });
    if (warmOverlay) {
        warmOverlay.remove();
        warmOverlay = null;
    }
    if (warmStyles) {
        warmStyles.remove();
        warmStyles = null;
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
                el.style.transition = `all ${cfg.transitionDelay}`;
            });
        }
        if (cfg.tremor) {
            style.animation = 'warm-tremor 0.1s infinite';
        }
        if (cfg.tremorCursor) {
            style.cursor = 'none';
            const cursorEl = document.createElement('div');
            cursorEl.id = 'warm-tremor-cursor';
            cursorEl.style.cssText = `
        position: fixed; pointer-events: none; z-index: 2147483647;
        width: 24px; height: 24px; border-radius: 50%;
        border: 2px solid #ff4444; background: rgba(255,68,68,0.2);
        transition: none;
      `;
            document.body.appendChild(cursorEl);
            let offsetX = 0, offsetY = 0;
            document.addEventListener('mousemove', (e) => {
                offsetX += (Math.random() - 0.5) * 12;
                offsetY += (Math.random() - 0.5) * 12;
                offsetX *= 0.7;
                offsetY *= 0.7;
                cursorEl.style.left = `${e.clientX + offsetX - 12}px`;
                cursorEl.style.top = `${e.clientY + offsetY - 12}px`;
            });
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

const tremorStyle = document.createElement('style');
tremorStyle.textContent = `
  @keyframes warm-tremor {
    0% { transform: translate(0, 0); }
    25% { transform: translate(1px, -0.5px); }
    50% { transform: translate(-0.5px, 1px); }
    75% { transform: translate(-1px, 0.5px); }
    100% { transform: translate(0.5px, -0.5px); }
  }
`;
document.head.appendChild(tremorStyle);

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.type === 'WARM_SIMULATE') {
        applySimulation(message.config);
        sendResponse({ status: 'applied' });
    } else if (message.type === 'WARM_RESET') {
        resetSimulation();
        sendResponse({ status: 'reset' });
    }
});

chrome.storage.local.get('warm-config', (result) => {
    if (result['warm-config']) {
        applySimulation(result['warm-config']);
    }
});
