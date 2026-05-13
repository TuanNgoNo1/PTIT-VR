const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;
const buildPath = path.join(__dirname, 'build');

// Serve static files from build folder (including vr-tour/)
app.use(express.static(buildPath));

// SPA fallback: any route that doesn't match a static file → index.html
app.get('*', (req, res) => {
  res.sendFile(path.join(buildPath, 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Frontend server running on port ${PORT}`);
});
