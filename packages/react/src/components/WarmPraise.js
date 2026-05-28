import React, { useRef, useEffect } from 'react';

/**
 * WarmUI 完成夸赞微动效 — React 封装
 *
 * @param {Object} props
 * @param {boolean} props.show - 是否显示
 * @param {number} props.messageIndex - 消息索引
 * @param {React.ReactNode} props.children
 */
export default function WarmPraise({ show, messageIndex, children, ...rest }) {
  const ref = useRef(null);
  const prevShow = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (show && !prevShow.current) {
      el.show(messageIndex);
    } else if (!show) {
      el.hide();
    }
    prevShow.current = show;
  }, [show, messageIndex]);

  return (
    <warm-praise ref={ref} {...rest}>
      {children}
    </warm-praise>
  );
}
