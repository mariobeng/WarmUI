/**
 * WarmUI 适老化助手 — Popup 控制面板
 * 管理增强器的启用/禁用状态，与 content script 同步配置
 */

// ===== 增强器配置映射 =====
const ENHANCER_CONFIGS = {
    font: {
        id: 'font',
        label: '字体放大',
        defaultLevel: '1.5',
        levels: {
            '1.25': { label: '小', scale: 1.25 },
            '1.5': { label: '中', scale: 1.5 },
            '2.0': { label: '大', scale: 2.0 }
        }
    },
    contrast: {
        id: 'contrast',
        label: '高对比度',
        defaultTheme: 'high-contrast',
        themes: {
            'high-contrast': { label: '高对比' },
            'deuteranopia': { label: '色盲' },
            'dark': { label: '深色' }
        }
    },
    layout: { id: 'layout', label: '阅读模式' },
    click: { id: 'click', label: '防误触' },
    speech: { id: 'speech', label: '语音朗读' },
    guide: { id: 'guide', label: '页面引导' }
};

// ===== 预设场景配置 =====
const PRESETS = {
    font: {
        label: '大字号模式',
        config: { font: { enabled: true, level: '1.5' }, contrast: { enabled: true, theme: 'high-contrast' } }
    },
    clean: {
        label: '简洁模式',
        config: { layout: { enabled: true }, click: { enabled: true }, font: { enabled: true, level: '1.25' } }
    },
    speech: {
        label: '语音优先',
        config: { speech: { enabled: true }, font: { enabled: true, level: '2.0' }, contrast: { enabled: true, theme: 'high-contrast' } }
    },
    night: {
        label: '夜间模式',
        config: { contrast: { enabled: true, theme: 'dark' }, font: { enabled: true, level: '1.25' } }
    },
    custom: {
        label: '自定义',
        config: {}
    }
};

// ===== 默认状态：全部开启 =====
const DEFAULT_STATE = {
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

// ===== DOM 引用 =====
const presetBtns = document.querySelectorAll('.preset-btn');
const resetBtn = document.getElementById('resetBtn');
const statusBtn = document.getElementById('statusBtn');
const checkboxes = {
    font: document.getElementById('enhancerFont'),
    contrast: document.getElementById('enhancerContrast'),
    layout: document.getElementById('enhancerLayout'),
    click: document.getElementById('enhancerClick'),
    speech: document.getElementById('enhancerSpeech'),
    guide: document.getElementById('enhancerGuide')
};

let currentState = JSON.parse(JSON.stringify(DEFAULT_STATE));
let statusTimer = null;

// ===== 初始化 =====
function init() {
    restoreState(() => {
        applyStateToUI();
        bindEvents();
    });
}

// ===== 状态持久化 =====
function saveState() {
    try {
        chrome.storage.sync.set({ 'warm-elder-config': currentState });
        showStatus('设置已自动保存');
    } catch (err) {
        console.error('[WarmUI] save state error:', err);
    }
}

function restoreState(callback) {
    try {
        chrome.storage.sync.get('warm-elder-config', (result) => {
            if (result['warm-elder-config']) {
                currentState = deepMerge(JSON.parse(JSON.stringify(DEFAULT_STATE)), result['warm-elder-config']);
            }
            if (callback) callback();
        });
    } catch (err) {
        console.warn('[WarmUI] restore state error:', err);
        if (callback) callback();
    }
}

/** 深度合并对象，source 覆盖 target */
function deepMerge(target, source) {
    const result = {};
    for (const key in target) {
        if (target.hasOwnProperty(key)) {
            result[key] = target[key];
        }
    }
    for (const key in source) {
        if (source.hasOwnProperty(key)) {
            if (
                source[key] && typeof source[key] === 'object' && !Array.isArray(source[key]) &&
                target[key] && typeof target[key] === 'object'
            ) {
                result[key] = deepMerge(target[key], source[key]);
            } else {
                result[key] = source[key];
            }
        }
    }
    return result;
}

// ===== 状态 → UI 同步 =====
function applyStateToUI() {
    // 预设按钮高亮
    for (const btn of presetBtns) {
        const isActive = btn.dataset.preset === currentState.activePreset;
        btn.classList.toggle('preset-active', isActive);
        btn.setAttribute('aria-checked', isActive.toString());
    }

    // 同步 checkbox
    for (const id of Object.keys(checkboxes)) {
        const cb = checkboxes[id];
        if (cb && currentState.enhancers[id]) {
            cb.checked = currentState.enhancers[id].enabled;
            cb.setAttribute('aria-checked', currentState.enhancers[id].enabled.toString());
        }
    }

    // 同步级别按钮
    syncLevelButtons('fontLevel', currentState.enhancers.font.level, currentState.enhancers.font.enabled);
    syncLevelButtons('contrastLevel', currentState.enhancers.contrast.theme, currentState.enhancers.contrast.enabled);
}

function syncLevelButtons(containerId, currentValue, isEnabled) {
    const container = document.getElementById(containerId);
    if (!container) return;
    const btns = container.querySelectorAll('.level-btn');
    for (const btn of btns) {
        const btnValue = btn.dataset.level || btn.dataset.theme;
        btn.classList.toggle('level-active', btnValue === currentValue && isEnabled);
    }
}

// ===== 收集所有增强器配置（包含启用和禁用状态） =====
function collectFullConfig() {
    const config = { enhancers: {} };
    for (const id of Object.keys(currentState.enhancers)) {
        const enhancer = currentState.enhancers[id];
        const cfg = { enabled: !!enhancer.enabled };
        if (enhancer.level) cfg.level = enhancer.level;
        if (enhancer.theme) cfg.theme = enhancer.theme;
        config.enhancers[id] = cfg;
    }
    return config;
}

// ===== 发送配置到当前页面（含脚本注入回退）=====
function applyToPage() {
    try {
        chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
            if (!tabs || !tabs[0]) return;
            const tab = tabs[0];
            const config = collectFullConfig();

            // 先尝试发送消息给已注入的 content script
            chrome.tabs.sendMessage(tab.id, {
                type: 'WARM_ELDER_APPLY',
                config
            }, (response) => {
                if (chrome.runtime.lastError) {
                    // content script 未注入，使用 chrome.scripting API 注入
                    injectContentScript(tab.id, config);
                }
            });
        });
    } catch (err) {
        console.error('[WarmUI] applyToPage error:', err);
    }
}

/**
 * 使用 scripting API 向页面注入 content script 并发送配置
 * 适用于：content script 尚未加载的页面（如安装前打开的标签页）
 */
function injectContentScript(tabId, config) {
    chrome.scripting.executeScript({
        target: { tabId },
        files: ['content.js']
    }).then(() => {
        // 注入成功后延迟发送配置（等待引擎初始化）
        setTimeout(() => {
            chrome.tabs.sendMessage(tabId, {
                type: 'WARM_ELDER_APPLY',
                config
            });
        }, 200);
    }).catch((err) => {
        console.warn('[WarmUI] injection failed:', err);
    });
}

// ===== 应用预设 =====
function applyPreset(presetId) {
    if (presetId === 'custom') {
        currentState.activePreset = 'custom';
        applyStateToUI();
        saveState();
        applyToPage();
        return;
    }

    const preset = PRESETS[presetId];
    if (!preset) return;

    // 先重置所有增强器为默认状态并禁用
    for (const id of Object.keys(DEFAULT_STATE.enhancers)) {
        currentState.enhancers[id] = JSON.parse(JSON.stringify(DEFAULT_STATE.enhancers[id]));
        currentState.enhancers[id].enabled = false;
    }

    // 仅启用预设中指定的增强器，并应用预设配置
    for (const enhancerId of Object.keys(preset.config)) {
        if (preset.config.hasOwnProperty(enhancerId) && currentState.enhancers[enhancerId]) {
            for (const key of Object.keys(preset.config[enhancerId])) {
                currentState.enhancers[enhancerId][key] = preset.config[enhancerId][key];
            }
        }
    }

    currentState.activePreset = presetId;
    applyStateToUI();
    saveState();
    applyToPage();
}

// ===== 切换增强器开关 =====
function toggleEnhancer(enhancerId, enabled) {
    if (currentState.enhancers[enhancerId]) {
        currentState.enhancers[enhancerId].enabled = enabled;
        currentState.activePreset = 'custom';
        applyStateToUI();
        saveState();
        applyToPage();
    }
}

// ===== 设置增强器级别/主题 =====
function setEnhancerLevel(enhancerId, value) {
    const enhancer = currentState.enhancers[enhancerId];
    if (!enhancer) return;
    if (enhancer.level !== undefined) enhancer.level = value;
    if (enhancer.theme !== undefined) enhancer.theme = value;
    enhancer.enabled = true;
    currentState.activePreset = 'custom';
    applyStateToUI();
    saveState();
    applyToPage();
}

// ===== 重置为默认 =====
function resetAll() {
    currentState = JSON.parse(JSON.stringify(DEFAULT_STATE));
    applyStateToUI();
    saveState();
    applyToPage();
    showStatus('已恢复默认设置');
}

// ===== 状态提示 =====
function showStatus(msg) {
    if (!statusBtn) return;
    statusBtn.textContent = msg;
    statusBtn.style.opacity = '1';
    if (statusTimer) clearTimeout(statusTimer);
    statusTimer = setTimeout(() => {
        statusBtn.style.opacity = '0.8';
    }, 3000);
}

// ===== 事件绑定 =====
function bindEvents() {
    // 预设按钮点击
    for (const btn of presetBtns) {
        btn.addEventListener('click', function () {
            applyPreset(this.dataset.preset);
        });
    }

    // 增强器开关（统一绑定）
    for (const id of Object.keys(checkboxes)) {
        const cb = checkboxes[id];
        if (cb) {
            cb.addEventListener('change', function () {
                toggleEnhancer(id, this.checked);
            });
        }
    }

    // 字体放大级别按钮
    const fontLevel = document.getElementById('fontLevel');
    if (fontLevel) {
        fontLevel.addEventListener('click', (e) => {
            const btn = e.target.closest('.level-btn');
            if (!btn || !btn.dataset.level) return;
            setEnhancerLevel('font', btn.dataset.level);
        });
    }

    // 对比度主题按钮
    const contrastLevel = document.getElementById('contrastLevel');
    if (contrastLevel) {
        contrastLevel.addEventListener('click', (e) => {
            const btn = e.target.closest('.level-btn');
            if (!btn || !btn.dataset.theme) return;
            setEnhancerLevel('contrast', btn.dataset.theme);
        });
    }

    // 重置按钮
    resetBtn.addEventListener('click', resetAll);
}

// ===== 监听外部存储变化 =====
chrome.storage.onChanged.addListener((changes, areaName) => {
    if (areaName === 'sync' && changes['warm-elder-config']) {
        const newState = changes['warm-elder-config'].newValue;
        if (newState) {
            currentState = deepMerge(JSON.parse(JSON.stringify(DEFAULT_STATE)), newState);
            applyStateToUI();
        }
    }
});

// ===== 启动 =====
document.addEventListener('DOMContentLoaded', init);
