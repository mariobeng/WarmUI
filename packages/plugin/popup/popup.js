const SIMULATION_CONFIG = {
  'vision-blur': {
    filter: 'blur(2px)'
  },
  'vision-yellow': {
    filter: 'sepia(0.6) saturate(0.8)'
  },
  'vision-tunnel': {
    clipPath: 'circle(30% at 50% 50%)'
  },
  'vision-contrast': {
    filter: 'contrast(0.6) brightness(1.1)'
  },
  'motor-tremor': {
    tremor: true
  },
  'motor-tremor-cursor': {
    tremorCursor: true
  },
  'motor-reduced': {
    pointerEvents: 'none',
    opacity: '0.8'
  },
  'cognitive-speed': {
    transitionDelay: '0.5s'
  },
  'cognitive-distraction': {
    overlay: true
  },
  'cognitive-degrade': {
    cognitiveDegrade: true
  }
};

function getActiveSimulations() {
  const active = {};
  const checkboxes = document.querySelectorAll('input[type="checkbox"]');
  checkboxes.forEach(cb => {
    if (cb.checked && SIMULATION_CONFIG[cb.id]) {
      active[cb.id] = SIMULATION_CONFIG[cb.id];
    }
  });
  return active;
}

function showStatus(message, isError) {
  const status = document.getElementById('statusMsg');
  if (!status) return;
  status.textContent = message;
  status.style.color = isError ? '#e74c3c' : '#27ae60';
  status.style.display = 'block';
  setTimeout(() => {
    status.style.display = 'none';
  }, 3000);
}

async function applyToPage() {
  const applyBtn = document.getElementById('applyBtn');
  applyBtn.disabled = true;
  applyBtn.textContent = '应用中...';

  try {
    const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
    if (!tab) {
      showStatus('无法获取当前标签页', true);
      return;
    }

    const config = getActiveSimulations();
    const modeCount = Object.keys(config).length;

    if (modeCount === 0) {
      showStatus('请先勾选至少一种模拟模式', true);
      return;
    }

    await chrome.tabs.sendMessage(tab.id, {
      type: 'WARM_SIMULATE',
      config
    });

    showStatus(`已应用 ${modeCount} 种模拟模式`, false);
  } catch (err) {
    showStatus('应用失败：内容脚本未响应，请刷新页面后重试', true);
    console.error('[WarmUI] applyToPage error:', err);
  } finally {
    applyBtn.disabled = false;
    applyBtn.textContent = '应用到当前页面';
  }
}

async function resetPage() {
  const resetBtn = document.getElementById('resetBtn');
  resetBtn.disabled = true;

  try {
    const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
    if (!tab) {
      showStatus('无法获取当前标签页', true);
      return;
    }

    await chrome.tabs.sendMessage(tab.id, {
      type: 'WARM_RESET'
    });

    document.querySelectorAll('input[type="checkbox"]').forEach(cb => {
      cb.checked = false;
    });

    showStatus('已重置所有模拟效果', false);
  } catch (err) {
    showStatus('重置失败：内容脚本未响应，请刷新页面后重试', true);
    console.error('[WarmUI] resetPage error:', err);
  } finally {
    resetBtn.disabled = false;
  }
}

document.getElementById('applyBtn').addEventListener('click', applyToPage);
document.getElementById('resetBtn').addEventListener('click', resetPage);
