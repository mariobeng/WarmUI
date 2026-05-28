/**
 * WarmUI 高对比度动态配色系统
 * 预设红绿色盲、蓝黄色盲等多套主题
 */
export const THEMES = {
  default: {
    name: '默认主题',
    tokens: {
      '--warm-primary': '#4A90D9',
      '--warm-primary-hover': '#357ABD',
      '--warm-success': '#52c41a',
      '--warm-error': '#ff4d4f',
      '--warm-warning': '#faad14',
      '--warm-text-color': '#333',
      '--warm-text-secondary': '#666',
      '--warm-card-bg': '#fff',
      '--warm-border': '#eee',
      '--warm-note-bg': '#FFFBF0',
      '--warm-note-border': '#FFE4B5',
      '--warm-guide-bg': '#FFF9E6',
      '--warm-rescue-bg': '#FFF0F0',
      '--warm-rescue-border': '#FFCDD2',
      '--warm-radius': '16px'
    }
  },
  'deuteranopia': {
    name: '红绿色盲（绿色弱）',
    tokens: {
      '--warm-primary': '#0055A4',
      '--warm-primary-hover': '#003D7A',
      '--warm-success': '#0077BB',
      '--warm-error': '#CC3300',
      '--warm-warning': '#FF8800',
      '--warm-text-color': '#222',
      '--warm-text-secondary': '#555',
      '--warm-card-bg': '#FAFAFA',
      '--warm-border': '#CCC',
      '--warm-note-bg': '#FFF5E6',
      '--warm-note-border': '#FFCC80',
      '--warm-guide-bg': '#FFF3CC',
      '--warm-rescue-bg': '#FFEBEE',
      '--warm-rescue-border': '#EF9A9A',
      '--warm-radius': '16px'
    }
  },
  'protanopia': {
    name: '红绿色盲（红色弱）',
    tokens: {
      '--warm-primary': '#0066CC',
      '--warm-primary-hover': '#004C99',
      '--warm-success': '#2E7D32',
      '--warm-error': '#D84315',
      '--warm-warning': '#F57F17',
      '--warm-text-color': '#222',
      '--warm-text-secondary': '#555',
      '--warm-card-bg': '#FAFAFA',
      '--warm-border': '#CCC',
      '--warm-note-bg': '#FFF8E1',
      '--warm-note-border': '#FFD54F',
      '--warm-guide-bg': '#FFF9C4',
      '--warm-rescue-bg': '#FBE9E7',
      '--warm-rescue-border': '#FFAB91',
      '--warm-radius': '16px'
    }
  },
  'tritanopia': {
    name: '蓝黄色盲',
    tokens: {
      '--warm-primary': '#C62828',
      '--warm-primary-hover': '#B71C1C',
      '--warm-success': '#00695C',
      '--warm-error': '#E65100',
      '--warm-warning': '#F9A825',
      '--warm-text-color': '#1A1A1A',
      '--warm-text-secondary': '#4A4A4A',
      '--warm-card-bg': '#F5F5F5',
      '--warm-border': '#BDBDBD',
      '--warm-note-bg': '#FFF3E0',
      '--warm-note-border': '#FFB74D',
      '--warm-guide-bg': '#FFF8E1',
      '--warm-rescue-bg': '#FCE4EC',
      '--warm-rescue-border': '#F48FB1',
      '--warm-radius': '16px'
    }
  },
  'high-contrast': {
    name: '高对比度',
    tokens: {
      '--warm-primary': '#0000FF',
      '--warm-primary-hover': '#0000CC',
      '--warm-success': '#008000',
      '--warm-error': '#FF0000',
      '--warm-warning': '#FF6600',
      '--warm-text-color': '#000',
      '--warm-text-secondary': '#333',
      '--warm-card-bg': '#fff',
      '--warm-border': '#000',
      '--warm-note-bg': '#FFFFCC',
      '--warm-note-border': '#000',
      '--warm-guide-bg': '#FFFF99',
      '--warm-rescue-bg': '#FFCCCC',
      '--warm-rescue-border': '#000',
      '--warm-radius': '12px'
    }
  }
};

/**
 * 应用主题到全局
 * @param {string} themeName - 主题名称
 */
export function applyTheme(themeName) {
  const theme = THEMES[themeName] || THEMES.default;
  const root = document.documentElement;
  Object.entries(theme.tokens).forEach(([key, value]) => {
    root.style.setProperty(key, value);
  });
  root.setAttribute('data-warm-theme', themeName);
  localStorage.setItem('warm-theme', themeName);
}

/**
 * 获取已保存的主题
 */
export function getSavedTheme() {
  return localStorage.getItem('warm-theme') || 'default';
}

/**
 * 获取所有可用主题
 */
export function getAvailableThemes() {
  return Object.entries(THEMES).map(([key, value]) => ({
    id: key,
    name: value.name
  }));
}
