const template = document.createElement('template');
template.innerHTML = `
  <style>
    :host {
      display: inline-block;
    }
    .speech-btn {
      display: inline-flex;
      align-items: center;
      gap: 6px;
      padding: 6px 12px;
      border: 1px solid var(--warm-border, #eee);
      border-radius: 20px;
      background: var(--warm-card-bg, #fff);
      color: var(--warm-text-secondary, #666);
      font-size: 0.85rem;
      cursor: pointer;
      transition: all 0.2s;
      user-select: none;
    }
    .speech-btn:hover {
      border-color: var(--warm-primary, #4A90D9);
      color: var(--warm-primary, #4A90D9);
    }
    .speech-btn.speaking {
      border-color: var(--warm-primary, #4A90D9);
      background: var(--warm-primary, #4A90D9);
      color: #fff;
      animation: pulse 1s infinite;
    }
    .speech-btn.outline-mode {
      border-style: dashed;
    }
    @keyframes pulse {
      0%, 100% { opacity: 1; }
      50% { opacity: 0.7; }
    }
    .icon {
      font-size: 1.1em;
    }
  </style>
  <button class="speech-btn" part="button">
    <span class="icon">🔊</span>
    <span class="label"><slot></slot></span>
  </button>
`;

export class WarmSpeech extends HTMLElement {
  static get observedAttributes() {
    return ['text', 'mode', 'lang', 'rate'];
  }

  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.shadowRoot.appendChild(template.content.cloneNode(true));
    this._btn = this.shadowRoot.querySelector('.speech-btn');
    this._label = this.shadowRoot.querySelector('.label');
  }

  connectedCallback() {
    this._btn.addEventListener('click', () => this._toggleSpeech());
    import('../speech/speech-adapter.js').then(mod => {
      this._adapter = mod.speechAdapter;
    });
  }

  disconnectedCallback() {
    if (this._adapter) {
      this._adapter.stop();
    }
  }

  attributeChangedCallback() {
    this._updateMode();
  }

  _updateMode() {
    const mode = this.getAttribute('mode');
    this._btn.classList.toggle('outline-mode', mode === 'outline');
    if (mode === 'outline') {
      this._label.textContent = this.textContent || '朗读页面结构';
    }
  }

  async _toggleSpeech() {
    if (this._btn.classList.contains('speaking')) {
      if (this._adapter) this._adapter.stop();
      this._btn.classList.remove('speaking');
      return;
    }

    this._btn.classList.add('speaking');
    const mode = this.getAttribute('mode') || 'text';
    const text = this.getAttribute('text') || this.textContent;

    try {
      const adapter = this._adapter || (await import('../speech/speech-adapter.js')).speechAdapter;
      if (mode === 'outline') {
        const outline = this._parseOutline();
        await adapter.speakOutline(outline, {
          rate: parseFloat(this.getAttribute('rate')) || 0.9,
          lang: this.getAttribute('lang') || 'zh-CN'
        });
      } else {
        await adapter.speak(text, {
          rate: parseFloat(this.getAttribute('rate')) || 0.9,
          lang: this.getAttribute('lang') || 'zh-CN'
        });
      }
    } catch (err) {
      console.warn('语音朗读失败:', err.message);
    }
    this._btn.classList.remove('speaking');
  }

  _parseOutline() {
    const sections = [];
    const headings = document.querySelectorAll('h1, h2, h3, h4');
    headings.forEach(h => {
      const name = h.textContent.trim();
      let description = '';
      let next = h.nextElementSibling;
      while (next && !/^H[1-4]$/i.test(next.tagName)) {
        description += next.textContent?.trim()?.slice(0, 50) + ' ';
        next = next.nextElementSibling;
      }
      if (name) {
        sections.push({ name, description: description.trim() || '相关内容' });
      }
    });
    return {
      title: document.title,
      sections: sections.length > 0 ? sections : [{ name: '页面内容', description: '请浏览页面查看详情' }]
    };
  }
}

customElements.define('warm-speech', WarmSpeech);
