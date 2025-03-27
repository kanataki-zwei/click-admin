// backend/server.js
const express = require('express');
const path = require('path');
const app = express();
const port = 3000;

app.use(express.json());
app.use(express.static(path.join(__dirname, '../public')));

const postgresRoutes = require('./routes/postgres');
app.use('/api', postgresRoutes);

app.listen(port, () => {
  console.log(`ClickAdmin app running at http://localhost:${port}`);
});

// backend/routes/postgres.js
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

router.get('/status-db', (req, res) => {
  runCommand('pg_isready', res);
});

router.post('/start-db', (req, res) => {
  runCommand('sudo systemctl start postgresql', res, 'PostgreSQL started.');
});

router.post('/stop-db', (req, res) => {
  runCommand('sudo systemctl stop postgresql', res, 'PostgreSQL stopped.');
});

router.post('/restart-db', (req, res) => {
  runCommand('sudo systemctl restart postgresql', res, 'PostgreSQL restarted.');
});

module.exports = router;