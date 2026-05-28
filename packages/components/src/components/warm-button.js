const template = document.createElement('template');
template.innerHTML = `
  <style>
    :host {
      display: inline-block;
      --debounce-delay: 0ms;
      --tolerance: 0px;
    }
    .button-wrapper {
      position: relative;
      display: inline-block;
    }
    button {
      font-size: var(--warm-font-size, 1rem);
      padding: var(--warm-button-padding, 0.75em 2em);
      border-radius: var(--warm-radius, 12px);
      border: none;
      background: var(--warm-primary, #4A90D9);
      color: #fff;
      cursor: pointer;
      touch-action: manipulation;
      transition: transform 0.15s, box-shadow 0.15s, opacity 0.2s;
      user-select: none;
      -webkit-tap-highlight-color: transparent;
      position: relative;
    }
    button:active {
      transform: scale(0.96);
    }
    button.elder-friendly {
      min-width: 120px;
      min-height: 48px;
      font-size: calc(var(--warm-font-size, 1rem) * 1.2);
    }
    button:disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }
    .tolerance-zone {
      position: absolute;
      top: calc(var(--tolerance, 0px) * -1);
      left: calc(var(--tolerance, 0px) * -1);
      right: calc(var(--tolerance, 0px) * -1);
      bottom: calc(var(--tolerance, 0px) * -1);
      border-radius: inherit;
    }
  </style>
  <div class="button-wrapper" part="wrapper">
    <div class="tolerance-zone" part="tolerance"></div>
    <button part="button"><slot></slot></button>
  </div>
`;

export class WarmButton extends HTMLElement {
    static get observedAttributes() {
        return ['elder-friendly', 'disabled', 'debounce-delay', 'tolerance'];
    }

    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this.shadowRoot.appendChild(template.content.cloneNode(true));
        this._wrapper = this.shadowRoot.querySelector('.button-wrapper');
        this._button = this.shadowRoot.querySelector('button');
        this._toleranceZone = this.shadowRoot.querySelector('.tolerance-zone');
        this._lastClickTime = 0;
        this._isCooldown = false;
    }

    connectedCallback() {
        this._updateAttributes();
        this._button.addEventListener('click', this._onClick.bind(this));
        this._button.addEventListener('touchstart', this._onTouchStart.bind(this), { passive: true });
        this._toleranceZone.addEventListener('click', this._onToleranceClick.bind(this));
    }

    attributeChangedCallback() {
        this._updateAttributes();
    }

    _updateAttributes() {
        const isElderFriendly = this.hasAttribute('elder-friendly');
        this._button.classList.toggle('elder-friendly', isElderFriendly);

        this._button.disabled = this.hasAttribute('disabled');

        const delay = parseInt(this.getAttribute('debounce-delay')) || (isElderFriendly ? 300 : 0);
        this._wrapper.style.setProperty('--debounce-delay', `${delay}ms`);

        const tolerance = parseInt(this.getAttribute('tolerance')) || (isElderFriendly ? 12 : 0);
        this._wrapper.style.setProperty('--tolerance', `${tolerance}px`);
    }

    _onClick(event) {
        if (this.hasAttribute('disabled')) {
            event.preventDefault();
            return;
        }
        if (this._isCooldown) {
            event.preventDefault();
            event.stopPropagation();
            return;
        }
        const delay = parseInt(this.getAttribute('debounce-delay')) || 0;
        if (delay > 0) {
            this._isCooldown = true;
            this._button.style.opacity = '0.7';
            setTimeout(() => {
                this._isCooldown = false;
                this._button.style.opacity = '';
            }, delay);
        }
        this.dispatchEvent(new CustomEvent('warm-click', {
            bubbles: true,
            composed: true,
            detail: { source: 'warm-button' }
        }));
    }

    _onToleranceClick(event) {
        if (!this.hasAttribute('elder-friendly')) return;
        this._button.click();
    }

    _onTouchStart() {
        if (!this.hasAttribute('disabled')) {
            this._button.style.transform = 'scale(0.96)';
            setTimeout(() => {
                this._button.style.transform = '';
            }, 150);
        }
    }
}

customElements.define('warm-button', WarmButton);
