const template = document.createElement('template');
template.innerHTML = `
  <style>
    :host {
      display: block;
    }
    .buddy-container {
      padding: 1rem;
      background: var(--warm-card-bg, #fff);
      border-radius: var(--warm-radius, 16px);
      box-shadow: 0 2px 16px rgba(0, 0, 0, 0.1);
    }
    .step {
      display: none;
    }
    .step.active {
      display: block;
    }
    .title {
      font-size: 1.15rem;
      font-weight: 600;
      color: var(--warm-text-color, #333);
      margin-bottom: 1rem;
      text-align: center;
    }
    .desc {
      font-size: 0.95rem;
      color: var(--warm-text-secondary, #666);
      margin-bottom: 1rem;
      text-align: center;
      line-height: 1.6;
    }
    .code-display {
      text-align: center;
      padding: 1.5rem;
      margin: 1rem 0;
      background: var(--warm-guide-bg, #FFF9E6);
      border-radius: var(--warm-radius, 12px);
      font-size: 2rem;
      font-weight: 700;
      letter-spacing: 8px;
      color: var(--warm-primary, #4A90D9);
      font-family: monospace;
    }
    .code-input {
      display: block;
      width: 100%;
      padding: 12px 16px;
      font-size: 1.5rem;
      text-align: center;
      letter-spacing: 6px;
      border: 2px solid var(--warm-border, #eee);
      border-radius: var(--warm-radius, 12px);
      box-sizing: border-box;
      outline: none;
      transition: border-color 0.2s;
    }
    .code-input:focus {
      border-color: var(--warm-primary, #4A90D9);
    }
    .actions {
      display: flex;
      gap: 0.75rem;
      justify-content: center;
      margin-top: 1rem;
    }
    .btn {
      padding: 10px 24px;
      border: none;
      border-radius: var(--warm-radius, 12px);
      font-size: 1rem;
      cursor: pointer;
      transition: transform 0.15s;
    }
    .btn:active {
      transform: scale(0.96);
    }
    .btn-primary {
      background: var(--warm-primary, #4A90D9);
      color: #fff;
    }
    .btn-secondary {
      background: var(--warm-border, #eee);
      color: var(--warm-text-color, #333);
    }
    .status-msg {
      margin-top: 0.75rem;
      text-align: center;
      font-size: 0.9rem;
      padding: 8px;
      border-radius: 8px;
    }
    .status-msg.success {
      background: #E8F5E9;
      color: #2E7D32;
    }
    .status-msg.error {
      background: #FFEBEE;
      color: #C62828;
    }
    .status-msg.info {
      background: #E3F2FD;
      color: #1565C0;
    }
    .guide-ring {
      position: fixed;
      pointer-events: none;
      z-index: 9998;
      border: 3px solid var(--warm-primary, #4A90D9);
      border-radius: 8px;
      animation: buddyGuidePulse 1.5s ease-in-out infinite;
      opacity: 0;
      transition: opacity 0.3s;
    }
    .guide-ring.active {
      opacity: 1;
    }
    .guide-speech {
      position: fixed;
      bottom: 30px;
      left: 50%;
      transform: translateX(-50%);
      background: var(--warm-text-color, #333);
      color: #fff;
      padding: 10px 20px;
      border-radius: 20px;
      font-size: 0.95rem;
      z-index: 9999;
      max-width: 80vw;
      text-align: center;
      opacity: 0;
      transition: opacity 0.3s;
    }
    .guide-speech.active {
      opacity: 1;
    }
    @keyframes buddyGuidePulse {
      0%, 100% { box-shadow: 0 0 0 0 rgba(74, 144, 217, 0.4); }
      50% { box-shadow: 0 0 0 12px rgba(74, 144, 217, 0); }
    }
  </style>
  <div class="buddy-container" part="container">
    <div class="step active" id="step-start">
      <div class="title">👋 需要帮助吗？</div>
      <div class="desc">让家人或朋友远程帮您操作。<br>点击"生成安全码"后，把下面的码告诉对方。</div>
      <div class="actions">
        <button class="btn btn-primary" id="btnGenerate">生成安全码</button>
        <button class="btn btn-secondary" id="btnEnterCode">输入对方的安全码</button>
      </div>
    </div>
    <div class="step" id="step-elder-code">
      <div class="title">🔑 您的安全码</div>
      <div class="desc">把这个码告诉您信任的家人或朋友</div>
      <div class="code-display" id="codeDisplay">------</div>
      <div class="desc" style="font-size:0.85rem">⚠️ 安全码 5 分钟后过期，一次性使用</div>
      <div class="desc" id="elderStatus" style="display:none"></div>
      <div class="actions">
        <button class="btn btn-secondary" id="btnBackStart">返回</button>
      </div>
    </div>
    <div class="step" id="step-helper-input">
      <div class="title">🔑 输入对方的安全码</div>
      <div class="desc">请输入家人/朋友告诉您的 6 位安全码</div>
      <input class="code-input" id="codeInput" type="text" maxlength="6" placeholder="输入安全码" inputmode="numeric" pattern="[0-9]*">
      <div class="status-msg" id="helperStatus"></div>
      <div class="actions">
        <button class="btn btn-primary" id="btnConnect">连接</button>
        <button class="btn btn-secondary" id="btnBackStart">返回</button>
      </div>
    </div>
    <div class="step" id="step-connected">
      <div class="title">✅ 已连接</div>
      <div class="desc">您可以在自己的手机上点击操作，对方的屏幕上会出现指引。</div>
      <div class="actions">
        <button class="btn btn-secondary" id="btnDisconnect">断开连接</button>
      </div>
    </div>
  </div>
  <div class="guide-ring" id="guideRing"></div>
  <div class="guide-speech" id="guideSpeech"></div>
`;

function generateCode() {
  return Math.random().toString(36).substring(2, 8).toUpperCase();
}

export class WarmBuddy extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.shadowRoot.appendChild(template.content.cloneNode(true));
    this._code = '';
    this._isConnected = false;
    this._guideRing = this.shadowRoot.getElementById('guideRing');
    this._guideSpeech = this.shadowRoot.getElementById('guideSpeech');
    this._bindEvents();
  }

  _bindEvents() {
    const buttons = this.shadowRoot.querySelectorAll('[id^="btn"]');
    buttons.forEach(btn => {
      btn.addEventListener('click', (e) => {
        const handler = this[`_on${btn.id.replace('btn', '')}`];
        if (handler) handler.call(this, e);
      });
    });

    const input = this.shadowRoot.getElementById('codeInput');
    if (input) {
      input.addEventListener('input', () => {
        input.value = input.value.replace(/[^0-9A-Za-z]/g, '').toUpperCase();
      });
    }
  }

  _showStep(stepId) {
    this.shadowRoot.querySelectorAll('.step').forEach(s => s.classList.remove('active'));
    this.shadowRoot.getElementById(stepId).classList.add('active');
  }

  _onGenerate() {
    this._code = generateCode();
    const display = this.shadowRoot.getElementById('codeDisplay');
    display.textContent = this._code;
    this._showStep('step-elder-code');
    this.dispatchEvent(new CustomEvent('warm-buddy-code', {
      bubbles: true,
      composed: true,
      detail: { code: this._code }
    }));
    setTimeout(() => {
      if (!this._isConnected) {
        const status = this.shadowRoot.getElementById('elderStatus');
        status.style.display = 'block';
        status.textContent = '⏰ 安全码已过期，如需帮助请重新生成';
        this._code = '';
      }
    }, 300000);
  }

  _onEnterCode() {
    this._showStep('step-helper-input');
  }

  _onConnect() {
    const input = this.shadowRoot.getElementById('codeInput');
    const status = this.shadowRoot.getElementById('helperStatus');
    if (input.value.length < 4) {
      status.className = 'status-msg error';
      status.textContent = '请输入有效的安全码';
      return;
    }
    this._isConnected = true;
    status.className = 'status-msg success';
    status.textContent = '✅ 连接成功！您可以开始远程协助了。';
    this._showStep('step-connected');
    this.dispatchEvent(new CustomEvent('warm-buddy-connected', {
      bubbles: true,
      composed: true
    }));
  }

  _onBackStart() {
    this._showStep('step-start');
  }

  _onDisconnect() {
    this._isConnected = false;
    this._code = '';
    this._showStep('step-start');
    this._guideRing.classList.remove('active');
    this._guideSpeech.classList.remove('active');
    this.dispatchEvent(new CustomEvent('warm-buddy-disconnected', {
      bubbles: true,
      composed: true
    }));
  }

  /**
   * 在老人屏幕上高亮指引目标
   * @param {string} selector - 目标元素选择器
   * @param {string} speech - 语音说明
   */
  highlightTarget(selector, speech) {
    const target = document.querySelector(selector);
    if (!target) return;
    const rect = target.getBoundingClientRect();
    this._guideRing.style.left = `${rect.left - 6}px`;
    this._guideRing.style.top = `${rect.top - 6}px`;
    this._guideRing.style.width = `${rect.width + 12}px`;
    this._guideRing.style.height = `${rect.height + 12}px`;
    this._guideRing.classList.add('active');

    if (speech) {
      this._guideSpeech.textContent = speech;
      this._guideSpeech.classList.add('active');
    }

    import('../speech/speech-adapter.js').then(mod => {
      mod.speechAdapter.speak(speech, { rate: 0.9 });
    }).catch(() => {});
  }

  /**
   * 清除高亮指引
   */
  clearHighlight() {
    this._guideRing.classList.remove('active');
    this._guideSpeech.classList.remove('active');
  }
}

customElements.define('warm-buddy', WarmBuddy);
