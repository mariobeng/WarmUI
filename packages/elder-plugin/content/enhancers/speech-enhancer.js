/**
 * 语音朗读增强器
 * 选中文本后TTS朗读，支持语速和音调调节
 */
export class SpeechEnhancer {
    static id = 'speech';
    static label = '语音朗读';

    constructor() {
        this.isActive = false;
        this.btnWrapper = null;
        this.speechBtn = null;
        this.selectedText = '';
        this.currentUtterance = null;
        this.boundHandleSelection = this.handleSelection.bind(this);
        this.boundHandleClick = this.handleClick.bind(this);
    }

    enable(config) {
        this.disable();
        this.createButton();
        document.addEventListener('selectionchange', this.boundHandleSelection);
        this.isActive = true;
    }

    disable() {
        document.removeEventListener('selectionchange', this.boundHandleSelection);
        if (this.btnWrapper) {
            this.btnWrapper.remove();
            this.btnWrapper = null;
        }
        if (this.currentUtterance) {
            window.speechSynthesis.cancel();
            this.currentUtterance = null;
        }
        this.isActive = false;
    }

    createButton() {
        this.btnWrapper = document.createElement('div');
        this.btnWrapper.id = 'warm-elder-speech-btn';
        this.btnWrapper.style.cssText = 'display:none;position:fixed;z-index:2147483646;background:transparent;pointer-events:none;';

        this.speechBtn = document.createElement('button');
        this.speechBtn.textContent = '🔊 朗读';
        this.speechBtn.style.cssText = [
            'padding:10px 18px',
            'font-size:16px',
            'border:none',
            'border-radius:24px',
            'background:#2b6cb0',
            'color:#fff',
            'cursor:pointer',
            'box-shadow:0 4px 12px rgba(0,0,0,0.2)',
            'pointer-events:auto',
            'font-family:-apple-system,BlinkMacSystemFont,"Segoe UI","PingFang SC",sans-serif',
            'transition:transform 0.15s,background 0.15s',
            'min-width:80px'
        ].join(';');

        this.speechBtn.addEventListener('mouseenter', () => {
            if (this.speechBtn) this.speechBtn.style.transform = 'scale(1.05)';
        });
        this.speechBtn.addEventListener('mouseleave', () => {
            if (this.speechBtn) this.speechBtn.style.transform = 'scale(1)';
        });
        this.speechBtn.addEventListener('click', this.boundHandleClick);

        this.btnWrapper.appendChild(this.speechBtn);
        document.body.appendChild(this.btnWrapper);
    }

    handleSelection() {
        const sel = window.getSelection();
        const text = sel.toString().trim();

        if (text && text.length > 2) {
            const range = sel.getRangeAt(0);
            const rect = range.getBoundingClientRect();
            const left = Math.min(rect.left + window.scrollX, window.innerWidth - 120);
            const top = rect.bottom + window.scrollY + 8;

            this.btnWrapper.style.display = 'block';
            this.btnWrapper.style.left = left + 'px';
            this.btnWrapper.style.top = top + 'px';
            this.selectedText = text;
        } else {
            this.btnWrapper.style.display = 'none';
            this.selectedText = '';
        }
    }

    handleClick() {
        if (!this.selectedText) return;

        if (this.currentUtterance) {
            window.speechSynthesis.cancel();
        }

        const utterance = new SpeechSynthesisUtterance(this.selectedText);
        utterance.lang = 'zh-CN';
        utterance.rate = 0.9;
        utterance.pitch = 1.1;

        utterance.onend = () => {
            this.currentUtterance = null;
            if (this.speechBtn) this.speechBtn.textContent = '🔊 朗读';
        };
        utterance.onerror = () => {
            this.currentUtterance = null;
            if (this.speechBtn) this.speechBtn.textContent = '🔊 朗读';
        };

        this.currentUtterance = utterance;
        this.speechBtn.textContent = '⏹ 停止';
        window.speechSynthesis.speak(utterance);
    }
}
