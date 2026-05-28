const template = document.createElement('template');
template.innerHTML = `
  <style>
    :host {
      display: none;
      position: fixed;
      inset: 0;
      z-index: 1000;
    }
    :host([open]) {
      display: block;
    }
    .overlay {
      position: fixed;
      inset: 0;
      background: rgba(0, 0, 0, 0.4);
      animation: fadeIn 0.2s;
    }
    .dialog {
      position: fixed;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      background: var(--warm-card-bg, #fff);
      border-radius: var(--warm-radius, 16px);
      padding: var(--warm-dialog-padding, 2rem);
      max-width: 90vw;
      width: 400px;
      box-shadow: 0 8px 32px rgba(0, 0, 0, 0.15);
      animation: slideUp 0.25s;
      z-index: 1001;
    }
    .header {
      font-size: 1.25rem;
      font-weight: 600;
      margin-bottom: 1rem;
      color: var(--warm-text-color, #333);
    }
    .body {
      margin-bottom: 1.5rem;
      color: var(--warm-text-secondary, #666);
      line-height: 1.6;
    }
    .footer {
      display: flex;
      gap: 0.75rem;
      justify-content: flex-end;
    }
    @keyframes fadeIn {
      from { opacity: 0; }
      to { opacity: 1; }
    }
    @keyframes slideUp {
      from { opacity: 0; transform: translate(-50%, -50%) scale(0.95); }
      to { opacity: 1; transform: translate(-50%, -50%) scale(1); }
    }
  </style>
  <div class="overlay" part="overlay"></div>
  <div class="dialog" part="dialog" role="dialog">
    <div class="header" part="header"><slot name="header"></slot></div>
    <div class="body" part="body"><slot></slot></div>
    <div class="footer" part="footer"><slot name="footer"></slot></div>
  </div>
`;

export class WarmDialog extends HTMLElement {
  static get observedAttributes() {
    return ['open'];
  }

  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.shadowRoot.appendChild(template.content.cloneNode(true));
    this._overlay = this.shadowRoot.querySelector('.overlay');
    this._onOverlayClick = this._onOverlayClick.bind(this);
  }

  connectedCallback() {
    this._overlay.addEventListener('click', this._onOverlayClick);
  }

  disconnectedCallback() {
    this._overlay.removeEventListener('click', this._onOverlayClick);
  }

  _onOverlayClick() {
    if (!this.hasAttribute('close-on-overlay') || this.getAttribute('close-on-overlay') === 'false') {
      return;
    }
    this.close();
  }

  open() {
    this.setAttribute('open', '');
    this.dispatchEvent(new CustomEvent('warm-dialog-open', {
      bubbles: true,
      composed: true
    }));
  }

  close() {
    this.removeAttribute('open');
    this.dispatchEvent(new CustomEvent('warm-dialog-close', {
      bubbles: true,
      composed: true
    }));
  }
}

customElements.define('warm-dialog', WarmDialog);
