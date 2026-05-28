import React from 'react';

/**
 * WarmUI 文本组件 — React 封装
 *
 * @param {Object} props
 * @param {'normal'|'large'} props.size - 文字大小模式
 * @param {boolean} props.plain - 启用"大白话"模式（简化文案）
 * @param {React.ReactNode} props.children
 */
export default function WarmText({ size, plain, children, ...rest }) {
  return (
    <warm-text
      size={size}
      plain={plain ? '' : undefined}
      {...rest}
    >
      {children}
    </warm-text>
  );
}
