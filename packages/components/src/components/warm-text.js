const template = document.createElement('template');
template.innerHTML = `
  <style>
    :host {
      display: inline;
    }
    .warm-text {
      font-size: var(--warm-font-size, 1rem);
      line-height: var(--warm-line-height, 1.8);
      color: var(--warm-text-color, #333);
      transition: font-size 0.3s;
    }
    .warm-text.size-heading {
      font-size: calc(var(--warm-font-size, 1rem) * 1.5);
      font-weight: 600;
    }
    .warm-text.size-body {
      font-size: var(--warm-font-size, 1rem);
    }
    .warm-text.size-button {
      font-size: calc(var(--warm-font-size, 1rem) * 1.1);
      font-weight: 500;
    }
    .warm-text.size-caption {
      font-size: calc(var(--warm-font-size, 1rem) * 0.85);
      color: var(--warm-text-secondary, #999);
    }
    .warm-text.size-large {
      font-size: calc(var(--warm-font-size, 1rem) * 1.25);
    }
    .warm-text.plain {
      color: var(--warm-text-secondary, #666);
    }
  </style>
  <span class="warm-text" part="text"><slot></slot></span>
`;

const SEMANTIC_SIZES = ['heading', 'body', 'button', 'caption', 'large', 'normal'];

export class WarmText extends HTMLElement {
    static get observedAttributes() {
        return ['size', 'plain', 'level'];
    }

    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this.shadowRoot.appendChild(template.content.cloneNode(true));
        this._text = this.shadowRoot.querySelector('.warm-text');
    }

    connectedCallback() {
        this._updateAttributes();
    }

    attributeChangedCallback() {
        this._updateAttributes();
    }

    _updateAttributes() {
        const size = this.getAttribute('size') || 'body';
        const level = this.getAttribute('level');

        SEMANTIC_SIZES.forEach(s => {
            this._text.classList.toggle(`size-${s}`, s === size);
        });

        if (level) {
            this._text.classList.add(`scale-${level}`);
            const scale = 1 + (parseInt(level) || 0) * 0.08;
            this._text.style.setProperty('--warm-font-scale', scale);
            this._text.style.fontSize = `calc(var(--warm-font-size, 1rem) * ${scale})`;
        }

        this._text.classList.toggle('plain', this.hasAttribute('plain'));
    }
}

customElements.define('warm-text', WarmText);
