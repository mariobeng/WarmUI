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

async function applyToPage() {
    const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
    const config = getActiveSimulations();
    await chrome.tabs.sendMessage(tab.id, {
        type: 'WARM_SIMULATE',
        config
    });
}

async function resetPage() {
    const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
    await chrome.tabs.sendMessage(tab.id, {
        type: 'WARM_RESET'
    });
}

document.getElementById('applyBtn').addEventListener('click', applyToPage);
document.getElementById('resetBtn').addEventListener('click', resetPage);
