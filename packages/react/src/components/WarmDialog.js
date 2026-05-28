/*
 * @Descripttion: 
 * @Author: fankai
 * @Date: 2026-05-28 15:45:18
 */
import React, { useRef, useEffect, useCallback } from 'react';

/**
 * WarmUI 对话框组件 — React 封装
 *
 * @param {Object} props
 * @param {boolean} props.open - 是否显示
 * @param {boolean} props.closeOnOverlay - 点击遮罩是否关闭
 * @param {React.ReactNode} props.header - 标题
 * @param {React.ReactNode} props.children - 内容
 * @param {React.ReactNode} props.footer - 底部操作区
 * @param {Function} props.onClose - 关闭回调
 */
export default function WarmDialog({ open, closeOnOverlay, header, children, footer, onClose, ...rest }) {
    const ref = useRef(null);

    const handleClose = useCallback(() => {
        onClose?.();
    }, [onClose]);

    useEffect(() => {
        const el = ref.current;
        if (!el) return;

        if (open) {
            el.open();
        } else {
            el.close();
        }

        el.addEventListener('warm-dialog-close', handleClose);
        return () => el.removeEventListener('warm-dialog-close', handleClose);
    }, [open, handleClose]);

    return (
        <warm-dialog
            ref={ref}
            close-on-overlay={closeOnOverlay ? 'true' : 'false'}
            {...rest}
        >
            <span slot="header">{header}</span>
            {children}
            <span slot="footer">{footer}</span>
        </warm-dialog>
    );
}
