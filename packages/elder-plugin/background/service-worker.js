/**
 * WarmUI 适老化助手 — Service Worker
 * 管理扩展生命周期，初始化默认配置，处理消息中转
 */

/** 默认配置：所有增强器全部开启 */
const DEFAULT_CONFIG = {
    activePreset: 'font',
    enhancers: {
        font: { enabled: true, level: '1.5' },
        contrast: { enabled: true, theme: 'high-contrast' },
        layout: { enabled: true },
        click: { enabled: true },
        speech: { enabled: true },
        guide: { enabled: true }
    }
};

/** 扩展安装或更新时初始化配置 */
chrome.runtime.onInstalled.addListener((details) => {
    if (details.reason === 'install') {
        chrome.storage.sync.set({ 'warm-elder-config': DEFAULT_CONFIG });
    } else if (details.reason === 'update') {
        // 更新时合并配置，保留用户自定义设置
        chrome.storage.sync.get('warm-elder-config', (result) => {
            if (!result['warm-elder-config']) {
                chrome.storage.sync.set({ 'warm-elder-config': DEFAULT_CONFIG });
            }
        });
    }
});

/** 处理来自 content script 或 popup 的消息 */
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.type === 'WARM_ELDER_GET_DEFAULT_CONFIG') {
        sendResponse({ config: DEFAULT_CONFIG });
    }
    return true;
});
