const template = document.createElement('template');
template.innerHTML = `
  <style>
    :host {
      display: inline;
      position: relative;
      cursor: help;
    }
    .translator-trigger {
      display: inline;
      border-bottom: 1px dashed var(--warm-primary, #4A90D9);
      transition: background 0.2s;
    }
    .translator-trigger.active {
      background: rgba(74, 144, 217, 0.08);
    }
    .bubble {
      display: none;
      position: absolute;
      bottom: calc(100% + 8px);
      left: 50%;
      transform: translateX(-50%);
      max-width: 320px;
      min-width: 200px;
      padding: 12px 16px;
      background: var(--warm-card-bg, #fff);
      border: 1px solid var(--warm-primary, #4A90D9);
      border-radius: var(--warm-radius, 12px);
      box-shadow: 0 4px 20px rgba(0, 0, 0, 0.12);
      font-size: calc(var(--warm-font-size, 1rem) * 1.05);
      line-height: 1.6;
      color: var(--warm-text-color, #333);
      z-index: 1000;
      animation: bubbleIn 0.25s ease;
    }
    .bubble.show {
      display: block;
    }
    .bubble::after {
      content: '';
      position: absolute;
      top: 100%;
      left: 50%;
      transform: translateX(-50%);
      border: 8px solid transparent;
      border-top-color: var(--warm-primary, #4A90D9);
    }
    .bubble-header {
      font-weight: 600;
      font-size: 0.85rem;
      color: var(--warm-text-secondary, #666);
      margin-bottom: 6px;
    }
    .bubble-original {
      font-size: 0.8rem;
      color: var(--warm-text-secondary, #999);
      margin-top: 8px;
      padding-top: 8px;
      border-top: 1px solid var(--warm-border, #eee);
    }
    .loading {
      color: var(--warm-text-secondary, #999);
      font-style: italic;
    }
    @keyframes bubbleIn {
      from { opacity: 0; transform: translateX(-50%) translateY(4px); }
      to { opacity: 1; transform: translateX(-50%) translateY(0); }
    }
  </style>
  <span class="translator-trigger" part="trigger">
    <slot></slot>
  </span>
  <div class="bubble" part="bubble">
    <div class="bubble-header">💬 说人话</div>
    <div class="translation"><slot name="translation"></slot></div>
    <div class="bubble-original"></div>
  </div>
`;

export class WarmTranslator extends HTMLElement {
  static get observedAttributes() {
    return ['translation', 'original'];
  }

  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.shadowRoot.appendChild(template.content.cloneNode(true));
    this._trigger = this.shadowRoot.querySelector('.translator-trigger');
    this._bubble = this.shadowRoot.querySelector('.bubble');
    this._translationEl = this.shadowRoot.querySelector('.translation');
    this._originalEl = this.shadowRoot.querySelector('.bubble-original');
    this._showTimer = null;
    this._hideTimer = null;
    this._cache = new Map();
  }

  connectedCallback() {
    this._trigger.addEventListener('mouseenter', () => this._startShow());
    this._trigger.addEventListener('mouseleave', () => this._startHide());
    this._trigger.addEventListener('touchstart', (e) => {
      e.preventDefault();
      this._toggleTouch();
    }, { passive: true });
    this._bubble.addEventListener('mouseenter', () => this._cancelHide());
    this._bubble.addEventListener('mouseleave', () => this._startHide());
    this._updateContent();
  }

  disconnectedCallback() {
    clearTimeout(this._showTimer);
    clearTimeout(this._hideTimer);
  }

  attributeChangedCallback() {
    this._updateContent();
  }

  _updateContent() {
    const original = this.getAttribute('original') || this.textContent.trim();
    this._originalEl.textContent = `原文：${original}`;
    const translation = this.getAttribute('translation');
    if (translation) {
      this._translationEl.textContent = translation;
      this._cache.set(original, translation);
    }
  }

  _startShow() {
    clearTimeout(this._hideTimer);
    this._showTimer = setTimeout(() => {
      this._tryShow();
    }, 800);
  }

  _startHide() {
    clearTimeout(this._showTimer);
    this._hideTimer = setTimeout(() => {
      this._bubble.classList.remove('show');
      this._trigger.classList.remove('active');
    }, 300);
  }

  _cancelHide() {
    clearTimeout(this._hideTimer);
  }

  _toggleTouch() {
    if (this._bubble.classList.contains('show')) {
      this._bubble.classList.remove('show');
      this._trigger.classList.remove('active');
    } else {
      this._tryShow();
    }
  }

  async _tryShow() {
    const original = this.getAttribute('original') || this.textContent.trim();
    const translationAttr = this.getAttribute('translation');

    if (translationAttr) {
      this._bubble.classList.add('show');
      this._trigger.classList.add('active');
      return;
    }

    if (this._cache.has(original)) {
      this._translationEl.textContent = this._cache.get(original);
      this._bubble.classList.add('show');
      this._trigger.classList.add('active');
      return;
    }

    this._translationEl.innerHTML = '<span class="loading">正在翻译...</span>';
    this._bubble.classList.add('show');
    this._trigger.classList.add('active');

    try {
      const translation = await this._fetchTranslation(original);
      this._cache.set(original, translation);
      this._translationEl.textContent = translation;
    } catch (err) {
      this._translationEl.textContent = '翻译服务暂不可用，请稍后再试。';
    }
  }

  async _fetchTranslation(text) {
    try {
      const response = await fetch('https://api.example.com/warm-translate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text, lang: 'zh-CN' })
      });
      if (!response.ok) throw new Error('翻译API请求失败');
      const data = await response.json();
      return data.translation;
    } catch (err) {
      const fallbackTranslations = {
        '请您核实身份信息以确保账户安全': '就是让你确认一下，你是本人，不是骗子在用你的号',
        '提交': '发送',
        '确认': '好的',
        '终止': '停止'
      };
      return fallbackTranslations[text] || null;
    }
  }
}

customElements.define('warm-translator', WarmTranslator);
