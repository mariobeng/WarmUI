import React, { useRef } from 'react';

/**
 * WarmUI 老友模式联机协助 — React 封装
 *
 * @param {Object} props
 * @param {React.ReactNode} props.children
 */
export default function WarmBuddy({ children, ...rest }) {
  const ref = useRef(null);

  /**
   * 在远程屏幕上高亮指引目标
   */
  const highlightTarget = (selector, speech) => {
    ref.current?.highlightTarget(selector, speech);
  };

  /**
   * 清除高亮
   */
  const clearHighlight = () => {
    ref.current?.clearHighlight();
  };

  return (
    <warm-buddy ref={ref} {...rest}>
      {children}
    </warm-buddy>
  );
}
