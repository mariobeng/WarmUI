const template = document.createElement('template');
template.innerHTML = `
  <style>
    :host {
      display: block;
    }
    .note {
      background: var(--warm-note-bg, #FFFBF0);
      border: 1px solid var(--warm-note-border, #FFE4B5);
      border-radius: var(--warm-radius, 16px);
      padding: 1rem 1.25rem;
      position: relative;
    }
    .note.remote {
      border-style: dashed;
      border-color: var(--warm-primary, #4A90D9);
      background: #F0F7FF;
    }
    .note-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: 0.5rem;
    }
    .note-badge {
      display: inline-flex;
      align-items: center;
      gap: 4px;
      font-size: 0.75rem;
      padding: 2px 8px;
      border-radius: 10px;
      background: rgba(74, 144, 217, 0.1);
      color: var(--warm-primary, #4A90D9);
    }
    .note-badge.remote {
      background: rgba(74, 144, 217, 0.15);
    }
    .note-time {
      font-size: 0.75rem;
      color: var(--warm-text-secondary, #bbb);
    }
    .content {
      font-size: calc(var(--warm-font-size, 1rem) * 1.05);
      line-height: 1.7;
      color: var(--warm-text-color, #333);
    }
    .author {
      font-size: 0.85rem;
      color: var(--warm-text-secondary, #999);
      margin-top: 0.5rem;
    }
    .author::before {
      content: '—— ';
    }
    .actions {
      margin-top: 0.75rem;
      display: flex;
      gap: 8px;
    }
    .action-btn {
      font-size: 0.8rem;
      padding: 4px 12px;
      border: 1px solid var(--warm-border, #eee);
      border-radius: 6px;
      background: transparent;
      cursor: pointer;
      color: var(--warm-text-secondary, #666);
      transition: all 0.15s;
    }
    .action-btn:hover {
      border-color: var(--warm-primary, #4A90D9);
      color: var(--warm-primary, #4A90D9);
    }
    .note-type-reminder .content::before {
      content: '📌 ';
    }
    .note-type-tip .content::before {
      content: '💡 ';
    }
    .note-type-warning .content::before {
      content: '⚠️ ';
    }
    .note-type-encourage .content::before {
      content: '❤️ ';
    }
  </style>
  <div class="note" part="note">
    <div class="note-header">
      <span class="note-badge" id="badge">📌 便签</span>
      <span class="note-time" id="time"></span>
    </div>
    <div class="content"><slot></slot></div>
    <div class="author" part="author"><slot name="author"></slot></div>
    <div class="actions" id="actions"></div>
  </div>
`;

const NOTE_TYPES = {
    reminder: { label: '提醒', icon: '📌', className: 'note-type-reminder' },
    tip: { label: '提示', icon: '💡', className: 'note-type-tip' },
    warning: { label: '注意', icon: '⚠️', className: 'note-type-warning' },
    encourage: { label: '鼓励', icon: '❤️', className: 'note-type-encourage' }
};

export class WarmNote extends HTMLElement {
    static get observedAttributes() {
        return ['author', 'type', 'time', 'note-id', 'remote', 'dismissable'];
    }

    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this.shadowRoot.appendChild(template.content.cloneNode(true));
        this._note = this.shadowRoot.querySelector('.note');
        this._badge = this.shadowRoot.getElementById('badge');
        this._time = this.shadowRoot.getElementById('time');
        this._actions = this.shadowRoot.getElementById('actions');
    }

    connectedCallback() {
        this._updateAttributes();
        this._renderActions();
        if (this.hasAttribute('remote')) {
            this._loadRemoteNote();
        }
    }

    attributeChangedCallback() {
        this._updateAttributes();
    }

    _updateAttributes() {
        const type = this.getAttribute('type') || 'reminder';
        const noteType = NOTE_TYPES[type] || NOTE_TYPES.reminder;

        this._note.className = `note ${noteType.className}`;
        this._badge.textContent = `${noteType.icon} ${noteType.label}`;

        if (this.hasAttribute('remote')) {
            this._note.classList.add('remote');
            this._badge.classList.add('remote');
            this._badge.textContent = '👪 ' + (this._badge.textContent || '家人的便签');
        }

        const timeVal = this.getAttribute('time');
        if (timeVal) {
            this._time.textContent = timeVal;
        } else {
            this._time.textContent = '';
        }
    }

    _renderActions() {
        this._actions.innerHTML = '';
        if (this.hasAttribute('dismissable')) {
            const dismissBtn = document.createElement('button');
            dismissBtn.className = 'action-btn';
            dismissBtn.textContent = '我知道了';
            dismissBtn.addEventListener('click', () => {
                this.style.display = 'none';
                this.dispatchEvent(new CustomEvent('warm-note-dismiss', {
                    bubbles: true,
                    composed: true,
                    detail: { noteId: this.getAttribute('note-id') }
                }));
            });
            this._actions.appendChild(dismissBtn);
        }
        if (this.hasAttribute('remote') && this.getAttribute('remote') === 'own') {
            const deleteBtn = document.createElement('button');
            deleteBtn.className = 'action-btn';
            deleteBtn.textContent = '删除便签';
            deleteBtn.addEventListener('click', () => this._deleteRemoteNote());
            this._actions.appendChild(deleteBtn);
        }
    }

    _loadRemoteNote() {
        const noteId = this.getAttribute('note-id');
        if (!noteId) return;
        try {
            const stored = localStorage.getItem(`warm-note-${noteId}`);
            if (stored) {
                const data = JSON.parse(stored);
                const contentSlot = this.shadowRoot.querySelector('.content slot');
                if (contentSlot) {
                    const textNode = document.createTextNode(data.content);
                    this.append(textNode);
                }
                if (data.author) {
                    const authorSlot = this.shadowRoot.querySelector('.author slot[name="author"]');
                    if (authorSlot) {
                        const authorText = document.createTextNode(data.author);
                        const span = document.createElement('span');
                        span.setAttribute('slot', 'author');
                        span.textContent = data.author;
                        this.appendChild(span);
                    }
                }
            }
        } catch (e) {
            // 静默处理
        }
    }

    _deleteRemoteNote() {
        const noteId = this.getAttribute('note-id');
        if (noteId) {
            localStorage.removeItem(`warm-note-${noteId}`);
        }
        this.remove();
    }

    /**
     * 保存为远程便签（供子女端调用）
     */
    static saveRemoteNote(noteId, data) {
        localStorage.setItem(`warm-note-${noteId}`, JSON.stringify({
            ...data,
            createdAt: new Date().toISOString()
        }));
    }

    /**
     * 获取所有远程便签
     */
    static listRemoteNotes() {
        const notes = [];
        for (let i = 0; i < localStorage.length; i++) {
            const key = localStorage.key(i);
            if (key.startsWith('warm-note-')) {
                try {
                    notes.push({
                        id: key.replace('warm-note-', ''),
                        ...JSON.parse(localStorage.getItem(key))
                    });
                } catch (e) {
                    // skip invalid
                }
            }
        }
        return notes;
    }
}

customElements.define('warm-note', WarmNote);
