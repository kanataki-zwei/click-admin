const express = require('express');
const router = express.Router();
const { exec } = require('child_process');

const runCommand = (cmd, res, successMsg) => {
  exec(cmd, (error, stdout, stderr) => {
    if (error) {
      return res.status(500).json({ status: 'error', message: stderr });
    }
    res.json({ status: 'ok', message: successMsg || stdout });
  });
};

// Check PostgreSQL status
router.get('/status-db', (req, res) => {
  exec('pg_isready', (error, stdout, stderr) => {
    console.log("Running pg_isready...");
    console.log("stdout:", stdout);
    console.log("stderr:", stderr);
    console.log("error:", error);

    if (error) {
      return res.status(500).json({ status: 'error', message: stderr });
    }
    res.json({ status: 'ok', message: stdout });
  });
});


// Start PostgreSQL
router.post('/start-db', (req, res) => {
  runCommand('sudo systemctl start postgresql', res, 'PostgreSQL started.');
});

// Stop PostgreSQL
router.post('/stop-db', (req, res) => {
  runCommand('sudo systemctl stop postgresql', res, 'PostgreSQL stopped.');
});

// Restart PostgreSQL
router.post('/restart-db', (req, res) => {
  runCommand('sudo systemctl restart postgresql', res, 'PostgreSQL restarted.');
});

module.exports = router;
