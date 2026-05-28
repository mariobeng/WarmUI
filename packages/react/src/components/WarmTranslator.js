import React from 'react';

/**
 * WarmUI 大白话翻译器 — React 封装
 *
 * @param {Object} props
 * @param {string} props.translation - 翻译结果（大白话）
 * @param {string} props.original - 原文
 * @param {React.ReactNode} props.children
 */
export default function WarmTranslator({ translation, original, children, ...rest }) {
  return (
    <warm-translator translation={translation} original={original} {...rest}>
      {children}
    </warm-translator>
  );
}
