// public/script.js
function checkStatus() {
    fetch('/api/status-db')
      .then(res => res.json())
      .then(data => {
        const statusEl = document.getElementById('status');
        if (data.status === 'ok') {
          statusEl.textContent = `PostgreSQL Status: ${data.message}`;
          statusEl.style.color = 'green';
        } else {
          statusEl.textContent = 'Error checking PostgreSQL status.';
          statusEl.style.color = 'red';
        }
      })
      .catch(() => {
        const statusEl = document.getElementById('status');
        statusEl.textContent = 'Request failed.';
        statusEl.style.color = 'red';
      });
  }
  
  function dbAction(action) {
    fetch(`/api/${action}-db`, { method: 'POST' })
      .then(res => res.json())
      .then(data => {
        alert(data.message);
        checkStatus();
      })
      .catch(() => alert('Action failed.'));
  }
  