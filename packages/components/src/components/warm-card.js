const template = document.createElement('template');
template.innerHTML = `
  <style>
    :host {
      display: block;
    }
    .card {
      background: var(--warm-card-bg, #fff);
      border-radius: var(--warm-radius, 16px);
      padding: var(--warm-card-padding, 1.5rem);
      box-shadow: 0 2px 12px rgba(0, 0, 0, 0.08);
      border: 1px solid var(--warm-border, #eee);
    }
    .card.highlight {
      border-color: var(--warm-primary, #4A90D9);
      box-shadow: 0 2px 16px rgba(74, 144, 217, 0.15);
    }
  </style>
  <div class="card" part="card">
    <slot></slot>
  </div>
`;

export class WarmCard extends HTMLElement {
  static get observedAttributes() {
    return ['highlight'];
  }

  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.shadowRoot.appendChild(template.content.cloneNode(true));
    this._card = this.shadowRoot.querySelector('.card');
  }

  connectedCallback() {
    this._updateAttributes();
  }

  attributeChangedCallback() {
    this._updateAttributes();
  }

  _updateAttributes() {
    if (this.hasAttribute('highlight')) {
      this._card.classList.add('highlight');
    } else {
      this._card.classList.remove('highlight');
    }
  }
}

customElements.define('warm-card', WarmCard);
