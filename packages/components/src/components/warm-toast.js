const template = document.createElement('template');
template.innerHTML = `
  <style>
    :host {
      position: fixed;
      top: 20px;
      left: 50%;
      transform: translateX(-50%);
      z-index: 2000;
      display: none;
    }
    :host([show]) {
      display: block;
      animation: toastIn 0.3s;
    }
    .toast {
      background: var(--warm-text-color, #333);
      color: #fff;
      padding: 0.75rem 1.5rem;
      border-radius: var(--warm-radius, 12px);
      font-size: 1rem;
      text-align: center;
      max-width: 80vw;
      box-shadow: 0 4px 16px rgba(0, 0, 0, 0.15);
    }
    .toast.success {
      background: var(--warm-success, #52c41a);
    }
    .toast.error {
      background: var(--warm-error, #ff4d4f);
    }
    @keyframes toastIn {
      from { opacity: 0; transform: translateY(-10px); }
      to { opacity: 1; transform: translateY(0); }
    }
  </style>
  <div class="toast" part="toast"><slot></slot></div>
`;

export class WarmToast extends HTMLElement {
  static get observedAttributes() {
    return ['show', 'type'];
  }

  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.shadowRoot.appendChild(template.content.cloneNode(true));
    this._toast = this.shadowRoot.querySelector('.toast');
  }

  connectedCallback() {
    this._updateAttributes();
  }

  attributeChangedCallback() {
    this._updateAttributes();
  }

  _updateAttributes() {
    const type = this.getAttribute('type');
    this._toast.className = 'toast';
    if (type) {
      this._toast.classList.add(type);
    }
  }

  show(duration = 3000) {
    this.setAttribute('show', '');
    clearTimeout(this._hideTimer);
    this._hideTimer = setTimeout(() => {
      this.removeAttribute('show');
    }, duration);
  }

  hide() {
    clearTimeout(this._hideTimer);
    this.removeAttribute('show');
  }
}

customElements.define('warm-toast', WarmToast);
