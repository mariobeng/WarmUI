const template = document.createElement('template');
template.innerHTML = `
  <style>
    :host {
      display: block;
      margin: 0.5rem 0;
    }
    .guide {
      background: var(--warm-guide-bg, #FFF9E6);
      border-left: 4px solid var(--warm-primary, #4A90D9);
      padding: 1rem 1.25rem;
      border-radius: 0 var(--warm-radius, 12px) var(--warm-radius, 12px) 0;
      font-size: calc(var(--warm-font-size, 1rem) * 0.95);
      line-height: 1.6;
      color: var(--warm-text-color, #333);
    }
    .guide-icon {
      font-size: 1.2em;
      margin-right: 0.5rem;
    }
    .guide-close {
      float: right;
      border: none;
      background: none;
      font-size: 1.1rem;
      cursor: pointer;
      padding: 2px 6px;
      border-radius: 4px;
      color: var(--warm-text-secondary, #999);
    }
    .guide-close:hover {
      background: rgba(0,0,0,0.05);
    }

    :host([overlay]) {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      z-index: 9997;
      margin: 0;
      display: flex;
      align-items: flex-end;
      justify-content: center;
      pointer-events: none;
    }
    :host([overlay]) .guide {
      pointer-events: auto;
      max-width: 500px;
      margin-bottom: 40px;
      box-shadow: 0 4px 24px rgba(0, 0, 0, 0.15);
      animation: guideSlideUp 0.4s ease;
    }
    @keyframes guideSlideUp {
      from { opacity: 0; transform: translateY(20px); }
      to { opacity: 1; transform: translateY(0); }
    }

    :host([target]) {
      --guide-target-top: 0px;
      --guide-target-left: 0px;
      --guide-target-width: 0px;
      --guide-target-height: 0px;
    }

    .highlight-ring {
      display: none;
      position: fixed;
      pointer-events: none;
      z-index: 9996;
      border: 3px solid var(--warm-primary, #4A90D9);
      border-radius: 8px;
      animation: guideBreathing 1.5s ease-in-out infinite;
    }
    .highlight-ring.active {
      display: block;
    }

    @keyframes guideBreathing {
      0%, 100% {
        box-shadow: 0 0 0 0 rgba(74, 144, 217, 0.5),
                    inset 0 0 0 0 rgba(74, 144, 217, 0.1);
      }
      50% {
        box-shadow: 0 0 0 8px rgba(74, 144, 217, 0),
                    inset 0 0 0 2px rgba(74, 144, 217, 0.15);
      }
    }

    .overlay-backdrop {
      display: none;
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: rgba(0, 0, 0, 0.3);
      z-index: 9995;
    }
    .overlay-backdrop.active {
      display: block;
    }
  </style>
  <div class="overlay-backdrop" part="backdrop"></div>
  <div class="highlight-ring" part="ring"></div>
  <div class="guide" part="guide">
    <button class="guide-close" part="close">✕</button>
    <span class="guide-icon">💡</span>
    <slot></slot>
  </div>
`;

export class WarmGuide extends HTMLElement {
    static get observedAttributes() {
        return ['overlay', 'target', 'voice'];
    }

    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this.shadowRoot.appendChild(template.content.cloneNode(true));
        this._guide = this.shadowRoot.querySelector('.guide');
        this._closeBtn = this.shadowRoot.querySelector('.guide-close');
        this._ring = this.shadowRoot.querySelector('.highlight-ring');
        this._backdrop = this.shadowRoot.querySelector('.overlay-backdrop');
        this._spoken = false;
    }

    connectedCallback() {
        this._closeBtn.addEventListener('click', () => this.dismiss());
        if (this.hasAttribute('overlay')) {
            const target = this.getAttribute('target');
            if (target) {
                setTimeout(() => this._highlightTarget(target), 100);
            }
            this._trySpeak();
        }
    }

    attributeChangedCallback(name, oldVal, newVal) {
        if (name === 'target' && newVal) {
            setTimeout(() => this._highlightTarget(newVal), 100);
        }
        if (name === 'overlay' && newVal !== null && !this._spoken) {
            this._trySpeak();
        }
    }

    _highlightTarget(selector) {
        const target = selector ? document.querySelector(selector) : null;
        if (!target) return;
        const rect = target.getBoundingClientRect();
        this._ring.style.left = `${rect.left - 6}px`;
        this._ring.style.top = `${rect.top - 6}px`;
        this._ring.style.width = `${rect.width + 12}px`;
        this._ring.style.height = `${rect.height + 12}px`;
        this._ring.classList.add('active');
        this._backdrop.classList.add('active');
    }

    dismiss() {
        this._ring.classList.remove('active');
        this._backdrop.classList.remove('active');
        if (this.hasAttribute('overlay')) {
            this.removeAttribute('overlay');
        }
        this.dispatchEvent(new CustomEvent('warm-guide-dismiss', {
            bubbles: true,
            composed: true
        }));
    }

    async _trySpeak() {
        if (this._spoken) return;
        const voice = this.getAttribute('voice');
        if (voice === 'false') return;
        try {
            const { speechAdapter } = await import('../speech/speech-adapter.js');
            const text = this.textContent.trim();
            if (text) {
                this._spoken = true;
                await speechAdapter.speak(text, { rate: 0.9 });
            }
        } catch (err) {
            // 语音是加分项，静默处理
        }
    }

    /**
     * 显示带有目标高亮的引导
     * @param {string} targetSelector - 目标选择器
     */
    showWithTarget(targetSelector) {
        this.setAttribute('overlay', '');
        if (targetSelector) {
            this.setAttribute('target', targetSelector);
        }
    }
}

customElements.define('warm-guide', WarmGuide);
