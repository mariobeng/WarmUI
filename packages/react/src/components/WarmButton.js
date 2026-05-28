import React from 'react';

/**
 * WarmUI 按钮组件 — React 封装
 *
 * @param {Object} props
 * @param {boolean} props.elderFriendly - 启用适老化模式（大触控区、防抖）
 * @param {boolean} props.disabled - 禁用状态
 * @param {React.ReactNode} props.children - 子元素
 * @param {Function} props.onWarmClick - 点击回调
 */
export default function WarmButton({ elderFriendly, disabled, children, onWarmClick, ...rest }) {
  return (
    <warm-button
      elder-friendly={elderFriendly ? '' : undefined}
      disabled={disabled ? '' : undefined}
      onWarmClick={onWarmClick}
      {...rest}
    >
      {children}
    </warm-button>
  );
}
