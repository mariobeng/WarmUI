import React from 'react';

/**
 * WarmUI 语音朗读组件 — React 封装
 *
 * @param {Object} props
 * @param {string} props.text - 朗读文本
 * @param {'text'|'outline'} props.mode - 朗读模式（text=指定文本，outline=页面大纲）
 * @param {React.ReactNode} props.children
 */
export default function WarmSpeech({ text, mode, children, ...rest }) {
  return (
    <warm-speech text={text} mode={mode} {...rest}>
      {children}
    </warm-speech>
  );
}
