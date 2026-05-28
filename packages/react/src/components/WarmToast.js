import React, { useRef, useEffect } from 'react';

/**
 * WarmUI 轻提示组件 — React 封装
 *
 * @param {Object} props
 * @param {boolean} props.show - 是否显示
 * @param {'success'|'error'} props.type - 提示类型
 * @param {number} props.duration - 显示时长（毫秒）
 * @param {React.ReactNode} props.children
 */
export default function WarmToast({ show, type, duration, children, ...rest }) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (show) {
      el.show(duration);
    } else {
      el.hide();
    }
  }, [show, duration]);

  return (
    <warm-toast ref={ref} type={type} {...rest}>
      {children}
    </warm-toast>
  );
}
