import React from 'react';

/**
 * WarmUI 家人便签组件 — React 封装
 *
 * @param {Object} props
 * @param {React.ReactNode} props.author - 便签作者
 * @param {React.ReactNode} props.children - 便签内容
 */
export default function WarmNote({ author, children, ...rest }) {
  return (
    <warm-note {...rest}>
      {children}
      <span slot="author">{author}</span>
    </warm-note>
  );
}
