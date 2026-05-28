import React from 'react';

/**
 * WarmUI 迷路救援组件 — React 封装
 *
 * @param {Object} props
 * @param {boolean} props.float - 是否悬浮模式（固定在右下角）
 * @param {Array} props.pages - 页面列表（用于语音导航匹配）
 * @param {React.ReactNode} props.children - 救援操作按钮
 */
export default function WarmRescue({ float, pages, children, ...rest }) {
    return (
        <warm-rescue
            float={float ? '' : undefined}
            pages={pages ? JSON.stringify(pages) : undefined}
            {...rest}
        >
            {children}
        </warm-rescue>
    );
}
