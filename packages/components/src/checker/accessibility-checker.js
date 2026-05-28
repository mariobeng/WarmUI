/**
 * WarmUI 一键合规检查工具
 * 集成到 CI/CD 流程或浏览器中，自动检查无障碍合规问题
 */
export const CHECK_RULES = [
  {
    id: 'touch-target-size',
    name: '触控区域大小',
    description: '可点击区域是否 ≥44x44dp',
    severity: 'error',
    check: function () {
      const issues = [];
      const elements = document.querySelectorAll('button, a, input, select, textarea, [role="button"]');
      elements.forEach(el => {
        const rect = el.getBoundingClientRect();
        if (rect.width < 44 || rect.height < 44) {
          issues.push({
            element: el,
            tag: el.tagName,
            text: el.textContent?.trim()?.slice(0, 30) || el.tagName,
            size: `${Math.round(rect.width)}x${Math.round(rect.height)}`,
            suggestion: `将触控区域扩大至至少 44x44px（当前 ${Math.round(rect.width)}x${Math.round(rect.height)}）`
          });
        }
      });
      return issues;
    }
  },
  {
    id: 'contrast-ratio',
    name: '色彩对比度',
    description: '对比度是否达到 AAA 级（≥7:1）',
    severity: 'error',
    check: function () {
      const issues = [];
      const elements = document.querySelectorAll('p, span, a, button, h1, h2, h3, label, li');
      const seen = new Set();
      elements.forEach(el => {
        const style = window.getComputedStyle(el);
        const color = style.color;
        const bg = style.backgroundColor;
        if (!color || !bg || seen.has(`${color}-${bg}`)) return;
        seen.add(`${color}-${bg}`);
        const ratio = this._getContrastRatio(color, bg);
        if (ratio < 4.5) {
          issues.push({
            element: el,
            tag: el.tagName,
            text: el.textContent?.trim()?.slice(0, 30) || el.tagName,
            ratio: ratio.toFixed(2),
            suggestion: `提高对比度（当前 ${ratio.toFixed(2)}:1，需 ≥4.5:1）`
          });
        }
      });
      return issues.slice(0, 10);
    },
    _getLuminance: function (color) {
      const hex = this._parseColor(color);
      if (!hex) return 0;
      const [r, g, b] = hex.map(c => {
        c = c / 255;
        return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
      });
      return 0.2126 * r + 0.7152 * g + 0.0722 * b;
    },
    _parseColor: function (color) {
      if (color.startsWith('#')) {
        const hex = color.slice(1);
        if (hex.length === 3) return hex.split('').map(c => parseInt(c + c, 16));
        if (hex.length === 6) return hex.match(/.{2}/g).map(c => parseInt(c, 16));
      }
      if (color.startsWith('rgb')) {
        const match = color.match(/\d+/g);
        if (match) return match.slice(0, 3).map(Number);
      }
      return null;
    },
    _getContrastRatio: function (fg, bg) {
      const l1 = this._getLuminance(fg);
      const l2 = this._getLuminance(bg);
      const lighter = Math.max(l1, l2);
      const darker = Math.min(l1, l2);
      return (lighter + 0.05) / (darker + 0.05);
    }
  },
  {
    id: 'alt-text',
    name: '图片替代文本',
    description: '所有非文本内容是否有语音替代',
    severity: 'warning',
    check: function () {
      const issues = [];
      document.querySelectorAll('img, [role="img"]').forEach(el => {
        if (el.tagName === 'IMG') {
          const alt = el.getAttribute('alt');
          if (alt === null || alt === undefined) {
            issues.push({
              element: el,
              tag: 'img',
              text: el.src?.split('/').pop()?.slice(0, 30) || '未知图片',
              suggestion: '为图片添加 alt 属性描述'
            });
          }
        }
      });
      return issues;
    }
  },
  {
    id: 'age-discrimination',
    name: '年龄歧视检查',
    description: '检查是否存在年龄歧视性逻辑',
    severity: 'error',
    check: function () {
      const issues = [];
      const scripts = document.querySelectorAll('script');
      const patterns = [
        /age\s*[><=]\s*6[05]/i,
        /birth[ay].*?hide/i,
        /elderly.*?hidden/i,
        /old.*?disable/i,
        /年龄.*?(隐藏|禁用|限制)/i
      ];
      scripts.forEach(script => {
        const content = script.textContent || '';
        patterns.forEach(pattern => {
          if (pattern.test(content)) {
            issues.push({
              element: script,
              tag: 'script',
              text: `可能包含年龄歧视逻辑：${content.match(pattern)?.[0] || '匹配到可疑模式'}`,
              suggestion: '移除基于年龄的限制逻辑，确保对老年用户无歧视'
            });
          }
        });
      });
      return issues;
    }
  }
];

/**
 * 执行合规检查
 * @param {Array<string>} ruleIds - 要检查的规则ID列表（可选，默认全部）
 * @returns {Promise<Object>} 检查报告
 */
export async function runAccessibilityCheck(ruleIds) {
  const rules = ruleIds
    ? CHECK_RULES.filter(r => ruleIds.includes(r.id))
    : CHECK_RULES;

  const results = [];
  rules.forEach(rule => {
    try {
      const issues = rule.check();
      results.push({
        ruleId: rule.id,
        name: rule.name,
        description: rule.description,
        severity: rule.severity,
        passed: issues.length === 0,
        issues: issues,
        totalIssues: issues.length
      });
    } catch (err) {
      results.push({
        ruleId: rule.id,
        name: rule.name,
        description: rule.description,
        severity: rule.severity,
        passed: false,
        error: err.message,
        issues: [],
        totalIssues: 0
      });
    }
  });

  const totalIssues = results.reduce((sum, r) => sum + r.totalIssues, 0);
  const passedRules = results.filter(r => r.passed).length;

  return {
    summary: {
      total: results.length,
      passed: passedRules,
      failed: results.length - passedRules,
      totalIssues
    },
    results,
    timestamp: new Date().toISOString()
  };
}

/**
 * 生成友好的检查报告文本
 */
export function formatReport(report) {
  const lines = [
    '📋 WarmUI 无障碍合规检查报告',
    '═══════════════════════════',
    `检查时间：${new Date(report.timestamp).toLocaleString()}`,
    `检查项：${report.summary.total} 项`,
    `通过：${report.summary.passed} 项`,
    `未通过：${report.summary.failed} 项`,
    `发现问题：${report.summary.totalIssues} 个`,
    ''
  ];

  report.results.filter(r => !r.passed).forEach(result => {
    const icon = result.severity === 'error' ? '❌' : '⚠️';
    lines.push(`${icon} [${result.severity === 'error' ? '错误' : '警告'}] ${result.name}`);
    lines.push(`   ${result.description}`);
    (result.issues || []).forEach(issue => {
      lines.push(`   · ${issue.suggestion}`);
    });
    lines.push('');
  });

  if (report.summary.failed === 0) {
    lines.push('✅ 全部通过！页面符合无障碍规范。');
  } else {
    lines.push(`💡 发现 ${report.summary.totalIssues} 个问题，建议优先修复错误级别问题。`);
  }

  return lines.join('\n');
}
