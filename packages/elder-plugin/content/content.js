/**
 * WarmUI 适老化助手 — 内容脚本核心引擎
 * 默认开启所有增强器，用户可在 popup 中单独关闭
 * 彻底关闭请到 chrome://extensions/ 禁用整个插件
 */
import { EnhancerManager } from './enhancers/index.js';

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

/**
 * 适老化增强引擎
 * 负责配置的持久化存储、消息通信和增强器生命周期管理
 */
class ElderlyEnhancerEngine {
    constructor() {
        this.manager = new EnhancerManager();
        this.initialized = false;
    }

    /** 初始化引擎，恢复配置并应用 */
    async init() {
        if (this.initialized) return;
        this.initialized = true;
        this.registerMessageHandler();
        await this.restoreConfig();
    }

    /** 注册 Chrome 消息监听器，接收来自 popup 的指令 */
    registerMessageHandler() {
        chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
            try {
                if (message.type === 'WARM_ELDER_APPLY') {
                    this.applyConfig(message.config);
                    this.saveConfig(message.config);
                    sendResponse({ status: 'applied' });
                } else if (message.type === 'WARM_ELDER_RESET') {
                    this.resetAll();
                    this.clearConfig();
                    sendResponse({ status: 'reset' });
                } else if (message.type === 'WARM_ELDER_GET_STATUS') {
                    sendResponse({ status: 'ok' });
                }
            } catch (err) {
                console.error('[WarmUI] msg error:', err);
                sendResponse({ status: 'error', message: err.message });
            }
            return true;
        });
    }

    /** 应用配置到增强器管理器 */
    applyConfig(config) {
        const enhancers = config && config.enhancers ? config.enhancers : config || {};
        this.manager.applyAll(enhancers);
    }

    /** 停用所有增强器 */
    resetAll() {
        this.manager.disableAll();
    }

    /** 保存配置到 Chrome Storage */
    async saveConfig(config) {
        try {
            await chrome.storage.sync.set({ 'warm-elder-config': config });
        } catch (err) {
            // 静默处理存储异常
        }
    }

    /** 从 Chrome Storage 恢复配置，无配置时使用默认值 */
    async restoreConfig() {
        try {
            chrome.storage.sync.get('warm-elder-config', (result) => {
                if (result['warm-elder-config']) {
                    this.applyConfig(result['warm-elder-config']);
                } else {
                    this.applyConfig(DEFAULT_CONFIG);
                    this.saveConfig(DEFAULT_CONFIG);
                }
            });
        } catch (err) {
            // 静默处理存储异常
        }
    }

    /** 清除持久化配置 */
    async clearConfig() {
        try {
            await chrome.storage.sync.remove('warm-elder-config');
        } catch (err) {
            // 静默处理存储异常
        }
    }
}

// ===== 启动引擎（防止重复初始化） =====
if (window.__warmElderInitialized) {
    // 已初始化（manifest自动注入 + popup编程注入可能同时存在），不重复创建
} else {
    window.__warmElderInitialized = true;

    const engine = new ElderlyEnhancerEngine();

    function onReady() {
        engine.init().catch((err) => {
            console.warn('[WarmUI] init:', err);
        });
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', onReady);
    } else {
        onReady();
    }
}
