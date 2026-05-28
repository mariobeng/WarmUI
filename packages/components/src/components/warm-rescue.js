const template = document.createElement('template');
template.innerHTML = `
  <style>
    :host {
      display: block;
    }
    .rescue {
      background: var(--warm-rescue-bg, #FFF0F0);
      border: 1px solid var(--warm-rescue-border, #FFCDD2);
      border-radius: var(--warm-radius, 16px);
      padding: 1rem 1.25rem;
      text-align: center;
    }
    .title {
      font-size: 1.1rem;
      font-weight: 600;
      color: var(--warm-text-color, #333);
      margin-bottom: 0.75rem;
    }
    .desc {
      font-size: 0.9rem;
      color: var(--warm-text-secondary, #666);
      margin-bottom: 1rem;
      line-height: 1.5;
    }
    .actions {
      display: flex;
      gap: 0.75rem;
      justify-content: center;
      flex-wrap: wrap;
    }
    ::slotted(warm-button) {
      --warm-button-padding: 0.6em 1.5em;
    }
    .voice-btn {
      display: inline-flex;
      align-items: center;
      gap: 6px;
      padding: 8px 16px;
      border: 1px dashed var(--warm-primary, #4A90D9);
      border-radius: var(--warm-radius, 12px);
      background: transparent;
      color: var(--warm-primary, #4A90D9);
      font-size: 0.9rem;
      cursor: pointer;
      transition: all 0.2s;
      margin-top: 0.5rem;
    }
    .voice-btn:hover {
      background: rgba(74, 144, 217, 0.06);
    }
    .voice-btn.listening {
      background: var(--warm-primary, #4A90D9);
      color: #fff;
      animation: voicePulse 1s infinite;
    }
    .voice-result {
      margin-top: 0.75rem;
      padding: 8px 12px;
      background: #fff;
      border-radius: 8px;
      font-size: 0.9rem;
      color: var(--warm-text-color, #333);
      display: none;
    }
    .voice-result.show {
      display: block;
    }
    @keyframes voicePulse {
      0%, 100% { opacity: 1; }
      50% { opacity: 0.6; }
    }

    :host([float]) {
      position: fixed;
      bottom: 24px;
      right: 24px;
      z-index: 9999;
    }
    :host([float]) .rescue {
      padding: 0;
      border-radius: 50%;
      width: 56px;
      height: 56px;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      box-shadow: 0 4px 16px rgba(0, 0, 0, 0.15);
      transition: transform 0.2s;
      animation: rescueFloat 3s ease-in-out infinite;
    }
    :host([float]) .rescue:hover {
      transform: scale(1.1);
    }
    :host([float]) .title,
    :host([float]) .desc,
    :host([float]) .actions,
    :host([float]) .voice-btn,
    :host([float]) .voice-result {
      display: none;
    }
    :host([float]) .title {
      display: block;
      margin: 0;
      font-size: 1.5rem;
    }
    :host([float].expanded) .rescue {
      border-radius: var(--warm-radius, 16px);
      width: auto;
      height: auto;
      padding: 1rem 1.25rem;
      animation: none;
      cursor: default;
    }
    :host([float].expanded) .title,
    :host([float].expanded) .desc,
    :host([float].expanded) .actions,
    :host([float].expanded) .voice-btn,
    :host([float].expanded) .voice-result {
      display: block;
    }
    :host([float].expanded) .actions {
      display: flex;
    }
    :host([float].expanded) .voice-btn {
      display: inline-flex;
    }
    @keyframes rescueFloat {
      0%, 100% { transform: translateY(0); }
      50% { transform: translateY(-4px); }
    }
    @media (max-width: 480px) {
      :host([float]) {
        bottom: 16px;
        right: 16px;
      }
    }
  </style>
  <div class="rescue" part="rescue">
    <div class="title" part="title">🛟 别着急，我在这里</div>
    <div class="desc" part="desc">
      您当前在：<span id="pageName"><slot name="page">当前页面</slot></span>
    </div>
    <div class="actions" part="actions">
      <slot></slot>
    </div>
    <button class="voice-btn" id="voiceBtn" part="voice">
      🎤 用语音告诉我您要找什么
    </button>
    <div class="voice-result" id="voiceResult" part="voice-result"></div>
  </div>
`;

export class WarmRescue extends HTMLElement {
    static get observedAttributes() {
        return ['float', 'pages'];
    }

    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this.shadowRoot.appendChild(template.content.cloneNode(true));
        this._rescue = this.shadowRoot.querySelector('.rescue');
        this._voiceBtn = this.shadowRoot.getElementById('voiceBtn');
        this._voiceResult = this.shadowRoot.getElementById('voiceResult');
        this._recognitionController = null;
        this._isListening = false;
    }

    connectedCallback() {
        this._voiceBtn.addEventListener('click', () => this._toggleVoiceInput());
        if (this.hasAttribute('float')) {
            this._rescue.addEventListener('click', (e) => {
                if (e.target === this._rescue || e.target.closest('.title')) {
                    this._toggleExpand();
                }
            });
        }
    }

    disconnectedCallback() {
        this._stopVoiceInput();
    }

    _toggleExpand() {
        this.classList.toggle('expanded');
    }

    async _toggleVoiceInput() {
        if (this._isListening) {
            this._stopVoiceInput();
            return;
        }
        this._isListening = true;
        this._voiceBtn.classList.add('listening');
        this._voiceBtn.innerHTML = '🔴 正在听...点击停止';

        try {
            const { SpeechAdapter } = await import('../speech/speech-adapter.js');
            const adapter = new SpeechAdapter();
            this._recognitionController = await adapter.startRecognition({
                lang: 'zh-CN',
                continuous: false,
                onResult: (transcript, isFinal) => {
                    if (isFinal) {
                        this._voiceResult.textContent = `您说：${transcript}`;
                        this._voiceResult.classList.add('show');
                        this._handleVoiceQuery(transcript);
                        this._stopVoiceInput();
                    } else {
                        this._voiceResult.textContent = `正在听：${transcript}...`;
                        this._voiceResult.classList.add('show');
                    }
                },
                onError: (error) => {
                    this._voiceResult.textContent = `听不清，请稍后重试`;
                    this._voiceResult.classList.add('show');
                    this._stopVoiceInput();
                },
                onEnd: () => {
                    this._stopVoiceInput();
                }
            });
        } catch (err) {
            this._voiceResult.textContent = '语音功能暂不可用，请手动选择';
            this._voiceResult.classList.add('show');
            this._stopVoiceInput();
        }
    }

    _stopVoiceInput() {
        this._isListening = false;
        this._voiceBtn.classList.remove('listening');
        this._voiceBtn.innerHTML = '🎤 用语音告诉我您要找什么';
        if (this._recognitionController) {
            this._recognitionController.stop();
            this._recognitionController = null;
        }
    }

    async _handleVoiceQuery(query) {
        if (!query) return;
        const pages = this.getAttribute('pages');
        let pageList = [];
        try {
            pageList = pages ? JSON.parse(pages) : [];
        } catch (e) {
            pageList = [];
        }

        const matched = pageList.filter(p =>
            p.name.includes(query) || query.includes(p.name) ||
            p.keywords?.some(k => query.includes(k))
        );

        if (matched.length > 0) {
            this._voiceResult.textContent += ` → 找到「${matched[0].name}」，正在为您跳转...`;
            this.dispatchEvent(new CustomEvent('warm-rescue-navigate', {
                bubbles: true,
                composed: true,
                detail: { query, matched: matched[0] }
            }));
        } else {
            this._voiceResult.textContent += ` → 没找到相关内容，您可以试试「返回首页」或「联系客服」`;
        }
    }

    expand() {
        this.classList.add('expanded');
    }

    collapse() {
        this.classList.remove('expanded');
    }
}

customElements.define('warm-rescue', WarmRescue);
