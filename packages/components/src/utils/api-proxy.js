/**
 * WarmUI API 代理 — AI 翻译等服务接口
 * 提供默认的免费接口代理，防止滥用可做速率限制
 */
const RATE_LIMIT = {
  maxRequests: 20,
  windowMs: 60000,
  requests: []
};

function checkRateLimit() {
  const now = Date.now();
  RATE_LIMIT.requests = RATE_LIMIT.requests.filter(t => now - t < RATE_LIMIT.windowMs);
  if (RATE_LIMIT.requests.length >= RATE_LIMIT.maxRequests) {
    throw new Error('请求过于频繁，请稍后再试');
  }
  RATE_LIMIT.requests.push(now);
}

/**
 * 大白话翻译 API
 * @param {string} text - 原文
 * @param {string} lang - 语言
 * @returns {Promise<string>} 翻译结果
 */
export async function translateToPlain(text, lang = 'zh-CN') {
  checkRateLimit();
  const response = await fetch('/api/warm/translate', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ text, lang })
  });
  if (!response.ok) throw new Error('翻译请求失败');
  const data = await response.json();
  return data.translation;
}

/**
 * 获取页面导航建议（AI 导航）
 * @param {string} query - 用户想要找的内容
 * @param {Array} pages - 可用页面列表
 * @returns {Promise<Object>} 导航建议
 */
export async function getNavigationSuggestion(query, pages) {
  checkRateLimit();
  const response = await fetch('/api/warm/navigate', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ query, pages })
  });
  if (!response.ok) throw new Error('导航建议请求失败');
  const data = await response.json();
  return data;
}
