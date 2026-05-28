const template = document.createElement('template');
template.innerHTML = `
  <style>
    :host {
      display: block;
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      pointer-events: none;
      z-index: 9999;
      opacity: 0;
      transition: opacity 0.3s;
    }
    :host([show]) {
      opacity: 1;
      pointer-events: auto;
    }
    .container {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      height: 100%;
    }
    .flower {
      font-size: 64px;
      animation: flowerBloom 0.6s ease forwards;
      transform: scale(0);
    }
    .message {
      margin-top: 16px;
      font-size: 1.4rem;
      color: var(--warm-text-color, #333);
      font-weight: 500;
      animation: messageUp 0.5s 0.3s ease forwards;
      opacity: 0;
      transform: translateY(10px);
      text-align: center;
      padding: 0 24px;
    }
    .sub-message {
      margin-top: 8px;
      font-size: 0.95rem;
      color: var(--warm-text-secondary, #666);
      animation: messageUp 0.5s 0.5s ease forwards;
      opacity: 0;
      transform: translateY(10px);
    }
    .sparkle {
      position: absolute;
      font-size: 20px;
      animation: sparkleFloat 1s ease-out forwards;
    }
    @keyframes flowerBloom {
      0% { transform: scale(0) rotate(-30deg); opacity: 0; }
      60% { transform: scale(1.2) rotate(10deg); opacity: 1; }
      100% { transform: scale(1) rotate(0deg); opacity: 1; }
    }
    @keyframes messageUp {
      to { opacity: 1; transform: translateY(0); }
    }
    @keyframes sparkleFloat {
      0% { opacity: 0; transform: translate(0, 0) scale(0); }
      50% { opacity: 1; transform: translate(var(--dx, 30px), var(--dy, -40px)) scale(1); }
      100% { opacity: 0; transform: translate(var(--dx, 30px), var(--dy, -60px)) scale(0.5); }
    }
    @keyframes confettiFall {
      0% { opacity: 1; transform: translateY(0) rotate(0deg); }
      100% { opacity: 0; transform: translateY(100vh) rotate(720deg); }
    }
    .confetti-piece {
      position: absolute;
      width: 8px;
      height: 8px;
      border-radius: 2px;
      animation: confettiFall 2s ease-in forwards;
      animation-delay: var(--delay, 0s);
    }
  </style>
  <div class="container" part="container">
    <div class="flower" part="flower">🌸</div>
    <div class="message" part="message">
      <slot name="message">您真棒，又学会一个新技能！</slot>
    </div>
    <div class="sub-message" part="sub-message">
      <slot name="sub">搞定啦！</slot>
    </div>
  </div>
`;

const PRAISE_MESSAGES = [
  { message: '您真棒，又学会一个新技能！', sub: '搞定啦！' },
  { message: '太厉害了，这次比之前更熟练！', sub: '继续加油 💪' },
  { message: '完成啦，您越来越会用了！', sub: '真为您高兴 😊' },
  { message: '又成功学会了一招！', sub: '没有什么能难倒您' },
  { message: '操作成功！您太了不起了！', sub: '又向前迈了一步' }
];

const SPARKLE_POSITIONS = [
  { dx: -40, dy: -50 },
  { dx: 40, dy: -45 },
  { dx: -20, dy: -60 },
  { dx: 30, dy: -55 },
  { dx: 0, dy: -65 }
];

const CONFETTI_COLORS = ['#FF6B6B', '#4ECDC4', '#FFE66D', '#95E1D3', '#F38181', '#AA96DA'];

export class WarmPraise extends HTMLElement {
  static get observedAttributes() {
    return ['show', 'message', 'voice'];
  }

  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.shadowRoot.appendChild(template.content.cloneNode(true));
    this._container = this.shadowRoot.querySelector('.container');
    this._messageEl = this.shadowRoot.querySelector('.message slot');
  }

  connectedCallback() {
    this._addSparkles();
    this._addConfetti();
  }

  attributeChangedCallback(name, oldVal, newVal) {
    if (name === 'show' && newVal !== null) {
      this._addSparkles();
      this._addConfetti();
      this._trySpeak();
    }
  }

  _addSparkles() {
    const existing = this.shadowRoot.querySelectorAll('.sparkle');
    existing.forEach(el => el.remove());

    SPARKLE_POSITIONS.forEach((pos, i) => {
      const sparkle = document.createElement('span');
      sparkle.className = 'sparkle';
      sparkle.textContent = ['✨', '⭐', '🌟', '💫', '✨'][i];
      sparkle.style.setProperty('--dx', `${pos.dx}px`);
      sparkle.style.setProperty('--dy', `${pos.dy}px`);
      sparkle.style.left = '50%';
      sparkle.style.top = '45%';
      sparkle.style.animationDelay = `${i * 0.1}s`;
      this._container.appendChild(sparkle);
    });
  }

  _addConfetti() {
    const existing = this.shadowRoot.querySelectorAll('.confetti-piece');
    existing.forEach(el => el.remove());

    for (let i = 0; i < 20; i++) {
      const piece = document.createElement('div');
      piece.className = 'confetti-piece';
      piece.style.left = `${Math.random() * 100}%`;
      piece.style.top = `${Math.random() * 40 + 30}%`;
      piece.style.background = CONFETTI_COLORS[i % CONFETTI_COLORS.length];
      piece.style.setProperty('--delay', `${Math.random() * 0.5}s`);
      piece.style.width = `${Math.random() * 6 + 4}px`;
      piece.style.height = `${Math.random() * 6 + 4}px`;
      this._container.appendChild(piece);
    }
  }

  async _trySpeak() {
    if (!this.hasAttribute('voice') || this.getAttribute('voice') === 'false') return;
    try {
      const { speechAdapter } = await import('../speech/speech-adapter.js');
      const message = this.getAttribute('message') || '您真棒，又学会一个新技能！';
      await speechAdapter.speak(message, { rate: 1.0, pitch: 1.2 });
    } catch (err) {
      // 静默处理，语音是加分项不是必需
    }
  }

  show(messageIndex) {
    const index = messageIndex != null ? messageIndex : Math.floor(Math.random() * PRAISE_MESSAGES.length);
    const praise = PRAISE_MESSAGES[index % PRAISE_MESSAGES.length];
    this.setAttribute('message', praise.message);
    this.setAttribute('show', '');
    const msgSlot = this.shadowRoot.querySelector('.message');
    msgSlot.innerHTML = praise.message;
    const subSlot = this.shadowRoot.querySelector('.sub-message');
    const subDefault = subSlot.querySelector('slot');
    if (subDefault) {
      subDefault.innerHTML = praise.sub;
    }
  }

  hide() {
    this.removeAttribute('show');
  }
}

customElements.define('warm-praise', WarmPraise);
