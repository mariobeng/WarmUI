/**
 * Speech Adapter — 语音能力适配器
 * 封装 TTS 和语音识别能力，支持切换不同云服务商
 */
export class SpeechAdapter {
  constructor(options = {}) {
    this.provider = options.provider || 'browser';
    this.lang = options.lang || 'zh-CN';
    this.rate = options.rate || 0.9;
    this.pitch = options.pitch || 1.1;
    this.volume = options.volume || 1;
    this._providerMap = {
      browser: this._browserTTS.bind(this),
      webspeech: this._browserTTS.bind(this)
    };
    this._recognitionProviderMap = {
      browser: this._browserRecognition.bind(this),
      webspeech: this._browserRecognition.bind(this)
    };
  }

  /**
   * 注册自定义 TTS 提供商
   */
  registerProvider(name, handler) {
    this._providerMap[name] = handler;
  }

  /**
   * 注册自定义语音识别提供商
   */
  registerRecognitionProvider(name, handler) {
    this._recognitionProviderMap[name] = handler;
  }

  /**
   * 文字转语音朗读
   * @param {string} text - 要朗读的文字
   * @param {Object} options - 覆盖默认选项
   * @returns {Promise<void>}
   */
  speak(text, options = {}) {
    const provider = this._providerMap[options.provider || this.provider];
    if (!provider) {
      return Promise.reject(new Error(`语音提供商 ${options.provider || this.provider} 不可用`));
    }
    return provider(text, { ...this, ...options });
  }

  /**
   * 朗读页面大纲摘要
   * @param {Object} pageOutline - 页面结构大纲 { title, sections: [{ name, description }] }
   * @param {Object} options
   * @returns {Promise<void>}
   */
  speakOutline(pageOutline, options = {}) {
    const text = this._buildOutlineText(pageOutline);
    return this.speak(text, options);
  }

  /**
   * 构建自然语言大纲
   */
  _buildOutlineText(outline) {
    if (!outline || !outline.sections || outline.sections.length === 0) {
      return outline?.title || '当前页面没有可描述的内容';
    }
    const sectionList = outline.sections
      .map(s => `${s.name}：${s.description}`)
      .join('、');
    return `这个页面有 ${outline.sections.length} 个部分：${sectionList}。您想进哪个？`;
  }

  /**
   * 开始语音识别
   * @param {Object} options
   * @param {Function} onResult - 识别结果回调
   * @param {Function} onError - 错误回调
   * @returns {Promise<Object>} 识别控制器
   */
  startRecognition(options = {}) {
    const provider = this._recognitionProviderMap[options.provider || this.provider];
    if (!provider) {
      return Promise.reject(new Error(`语音识别提供商 ${options.provider || this.provider} 不可用`));
    }
    return provider(options);
  }

  /**
   * 浏览器原生 TTS
   */
  _browserTTS(text, options) {
    return new Promise((resolve, reject) => {
      if (!window.speechSynthesis) {
        reject(new Error('当前浏览器不支持语音合成'));
        return;
      }
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = options.lang || this.lang;
      utterance.rate = options.rate ?? this.rate;
      utterance.pitch = options.pitch ?? this.pitch;
      utterance.volume = options.volume ?? this.volume;
      utterance.onend = () => resolve();
      utterance.onerror = (e) => reject(e);
      window.speechSynthesis.speak(utterance);
    });
  }

  /**
   * 浏览器原生语音识别
   */
  _browserRecognition(options) {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      return Promise.reject(new Error('当前浏览器不支持语音识别'));
    }
    const recognition = new SpeechRecognition();
    recognition.lang = options.lang || this.lang;
    recognition.continuous = options.continuous ?? false;
    recognition.interimResults = options.interimResults ?? false;

    const controller = {
      stop: () => recognition.stop(),
      abort: () => recognition.abort()
    };

    if (options.onResult) {
      recognition.onresult = (event) => {
        const transcript = Array.from(event.results)
          .map(r => r[0].transcript)
          .join('');
        options.onResult(transcript, event.results[event.results.length - 1]?.isFinal);
      };
    }
    if (options.onError) {
      recognition.onerror = (event) => options.onError(event.error);
    }
    if (options.onEnd) {
      recognition.onend = () => options.onEnd();
    }

    recognition.start();
    return Promise.resolve(controller);
  }

  /**
   * 停止朗读
   */
  stop() {
    if (window.speechSynthesis) {
      window.speechSynthesis.cancel();
    }
  }

  /**
   * 检测浏览器是否支持 TTS
   */
  static isTTSSupported() {
    return 'speechSynthesis' in window;
  }

  /**
   * 检测浏览器是否支持语音识别
   */
  static isRecognitionSupported() {
    return 'SpeechRecognition' in window || 'webkitSpeechRecognition' in window;
  }
}

export const speechAdapter = new SpeechAdapter();
