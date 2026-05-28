import React from 'react';

/**
 * WarmUI 卡片组件 — React 封装
 *
 * @param {Object} props
 * @param {boolean} props.highlight - 高亮模式
 * @param {React.ReactNode} props.children
 */
export default function WarmCard({ highlight, children, ...rest }) {
  return (
    <warm-card highlight={highlight ? '' : undefined} {...rest}>
      {children}
    </warm-card>
  );
}
