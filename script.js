let lastFetchTime = null;

function updateTimestamp() {
    const timestamp = document.getElementById('timestamp');
    if (lastFetchTime) {
        timestamp.textContent = `Last fetch: ${lastFetchTime.toLocaleTimeString()}`;
    }
}

function updateStatus(message, isError = false) {
    const status = document.getElementById('status');
    status.textContent = `Status: ${message}`;
    status.style.color = isError ? '#ff4444' : '#666';
}

function clearOutput() {
    document.getElementById('output').textContent = 'Data akan muncul di sini...';
    document.getElementById('output').style.color = '#00ff00';
    updateStatus('Cleared');
}

async function fetchFirebaseData() {
    const output = document.getElementById('output');
    const loading = document.getElementById('loading');
    const fetchBtn = document.getElementById('fetchBtn');
    const url = document.getElementById('firebaseUrl').value.trim();
    
    if (!url) {
        output.textContent = '⚠️ Silakan masukkan URL Firebase terlebih dahulu!';
        output.style.color = '#ff4444';
        updateStatus('Error: URL kosong', true);
        return;
    }

    if (!url.startsWith('https://')) {
        output.textContent = '⚠️ URL harus dimulai dengan https://';
        output.style.color = '#ff4444';
        updateStatus('Error: Invalid URL', true);
        return;
    }

    loading.style.display = 'block';
    fetchBtn.disabled = true;
    output.textContent = 'Menghubungkan ke Firebase...';
    output.style.color = '#00ff00';
    updateStatus('Mengambil data...');

    try {
        const response = await fetch(url + '/.json');
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        output.textContent = JSON.stringify(data, null, 2);
        output.style.color = '#00ff00';
        lastFetchTime = new Date();
        updateTimestamp();
        updateStatus('Data berhasil diambil');
    } catch (error) {
        output.textContent = '❌ Error: ' + error.message;
        output.style.color = '#ff4444';
        updateStatus('Error: ' + error.message, true);
    } finally {
        loading.style.display = 'none';
        fetchBtn.disabled = false;
    }
}

// Enter key listener
document.getElementById('firebaseUrl').addEventListener('keypress', function(event) {
    if (event.key === 'Enter') {
        fetchFirebaseData();
    }
});

// Copy to clipboard functionality
document.getElementById('output').addEventListener('click', async function() {
    const text = this.textContent;
    try {
        await navigator.clipboard.writeText(text);
        updateStatus('Teks disalin ke clipboard!');
        setTimeout(() => updateStatus('Siap'), 2000);
    } catch (err) {
        updateStatus('Gagal menyalin teks', true);
    }
});

// Initial status
updateStatus('Siap');

function updateStatus(message, isError = false, isBreaking = false) {
    const status = document.getElementById('status');
    status.textContent = `Status: ${message}`;
    status.style.color = isError ? '#ff4444' : (isBreaking ? '#ff3e3e' : '#666');
    status.className = `status ${isBreaking ? 'breaking' : ''}`;
}

async function fetchFirebaseData() {
    const output = document.getElementById('output');
    const loading = document.getElementById('loading');
    const fetchBtn = document.getElementById('fetchBtn');
    const url = document.getElementById('firebaseUrl').value.trim();
    
    if (!url) {
        output.textContent = '⚠️ Masukkan URL Firebase yang valid!';
        output.style.color = '#ff4444';
        updateStatus('Error: URL kosong', true);
        return;
    }

    if (!url.startsWith('https://')) {
        output.textContent = '⚠️ URL harus dimulai dengan https://';
        output.style.color = '#ff4444';
        updateStatus('Error: Invalid URL', true);
        return;
    }

    loading.style.display = 'block';
    fetchBtn.disabled = true;
    output.textContent = 'Breaking into Firebase database...';
    output.style.color = '#ff3e3e';
    updateStatus('Breaking in progress...', false, true);

    try {
        const response = await fetch(url + '/.json');
        
        if (!response.ok) {
            throw new Error(`Break attempt failed! Status: ${response.status}`);
        }
        
        const data = await response.json();
        output.textContent = JSON.stringify(data, null, 2);
        output.style.color = '#00ff00';
        lastFetchTime = new Date();
        updateTimestamp();
        updateStatus('Break successful! Data extracted');
    } catch (error) {
        output.textContent = '❌ Break Failed: ' + error.message;
        output.style.color = '#ff4444';
        updateStatus('Error: ' + error.message, true);
    } finally {
        loading.style.display = 'none';
        fetchBtn.disabled = false;
    }
}

// Particle.js Configuration
document.addEventListener('DOMContentLoaded', function() {
    particlesJS('particles-js',
      {
        "particles": {
          "number": {
            "value": 80,
            "density": {
              "enable": true,
              "value_area": 800
            }
          },
          "color": {
            "value": "#ff3e3e"
          },
          "shape": {
            "type": "circle"
          },
          "opacity": {
            "value": 0.5,
            "random": false
          },
          "size": {
            "value": 3,
            "random": true
          },
          "line_linked": {
            "enable": true,
            "distance": 150,
            "color": "#ff3e3e",
            "opacity": 0.4,
            "width": 1
          },
          "move": {
            "enable": true,
            "speed": 6,
            "direction": "none",
            "random": false,
            "straight": false,
            "out_mode": "out",
            "bounce": false
          }
        },
        "interactivity": {
          "detect_on": "canvas",
          "events": {
            "onhover": {
              "enable": true,
              "mode": "repulse"
            },
            "onclick": {
              "enable": true,
              "mode": "push"
            },
            "resize": true
          }
        },
        "retina_detect": true
      }
    );
});

// Line Numbers for Terminal
function updateLineNumbers() {
    const output = document.getElementById('output');
    const lineNumbers = document.querySelector('.line-numbers');
    const lines = output.textContent.split('\n').length;
    let numbersHTML = '';
    for(let i = 1; i <= lines; i++) {
        numbersHTML += `${i}\n`;
    }
    lineNumbers.textContent = numbersHTML;
}

// Update stats
let totalBreaks = 0;
let successfulBreaks = 0;

function updateStats() {
    document.getElementById('total-breaks').textContent = `Total Breaks: ${totalBreaks}`;
    const successRate = totalBreaks === 0 ? 100 : Math.round((successfulBreaks/totalBreaks) * 100);
    document.getElementById('success-rate').textContent = `Success Rate: ${successRate}%`;
}

// Modify existing fetchFirebaseData function
const originalFetchFirebaseData = fetchFirebaseData;
fetchFirebaseData = async function() {
    totalBreaks++;
    try {
        await originalFetchFirebaseData();
        successfulBreaks++;
    } catch (error) {
        // Error handling remains the same
    }
    updateStats();
}
