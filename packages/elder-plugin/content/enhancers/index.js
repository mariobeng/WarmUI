/**
 * 增强器模块注册中心
 * 统一管理所有增强器的注册、应用和停用
 */
import { FontEnhancer } from './font-enhancer.js';
import { ContrastEnhancer } from './contrast-enhancer.js';
import { LayoutEnhancer } from './layout-enhancer.js';
import { ClickEnhancer } from './click-enhancer.js';
import { SpeechEnhancer } from './speech-enhancer.js';
import { GuideEnhancer } from './guide-enhancer.js';

export class EnhancerManager {
  constructor() {
    this.enhancers = new Map();
    this.enhancerIds = [];

    this.register(FontEnhancer);
    this.register(ContrastEnhancer);
    this.register(LayoutEnhancer);
    this.register(ClickEnhancer);
    this.register(SpeechEnhancer);
    this.register(GuideEnhancer);
  }

  /** 注册增强器类 */
  register(EnhancerClass) {
    const instance = new EnhancerClass();
    this.enhancers.set(EnhancerClass.id, instance);
    this.enhancerIds.push(EnhancerClass.id);
  }

  /**
   * 根据配置应用所有增强器
   * 配置中明确 enabled: false 则禁用，否则启用
   */
  applyAll(config) {
    for (const enhancerId of this.enhancerIds) {
      const enhancer = this.enhancers.get(enhancerId);
      if (!enhancer) continue;

      const enhancerConfig = config[enhancerId];
      if (enhancerConfig && enhancerConfig.enabled !== false) {
        enhancer.enable(enhancerConfig);
      } else {
        enhancer.disable();
      }
    }
  }

  /** 停用所有增强器 */
  disableAll() {
    for (const enhancer of this.enhancers.values()) {
      enhancer.disable();
    }
  }

  /** 获取当前活跃的增强器ID列表 */
  getActiveEnhancers() {
    const active = [];
    for (const [id, enhancer] of this.enhancers) {
      if (enhancer.isActive) {
        active.push(id);
      }
    }
    return active;
  }
}
