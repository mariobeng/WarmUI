import React from 'react';

/**
 * WarmUI 引导提示组件 — React 封装
 *
 * @param {Object} props
 * @param {React.ReactNode} props.children
 */
export default function WarmGuide({ children, ...rest }) {
  return (
    <warm-guide {...rest}>
      {children}
    </warm-guide>
  );
}
