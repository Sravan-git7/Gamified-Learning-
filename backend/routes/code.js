// backend/routes/code.js
import express from 'express';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const router = express.Router();

// Support for __dirname in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Directory to save code files
const SAVE_DIR = path.join(__dirname, '../savedFiles');
if (!fs.existsSync(SAVE_DIR)) fs.mkdirSync(SAVE_DIR);

// Save code
router.post('/save', (req, res) => {
  const { filename, content } = req.body;
  if (!filename || !content) {
    return res.status(400).json({ error: 'Filename and content are required.' });
  }

  const filePath = path.join(SAVE_DIR, filename);
  fs.writeFile(filePath, content, (err) => {
    if (err) return res.status(500).json({ error: 'Failed to save file.' });
    res.json({ message: 'File saved successfully.' });
  });
});

// Load code
router.get('/load/:filename', (req, res) => {
  const { filename } = req.params;
  const filePath = path.join(SAVE_DIR, filename);
  if (!fs.existsSync(filePath)) {
    return res.status(404).json({ error: 'File not found.' });
  }

  try {
    const content = fs.readFileSync(filePath, 'utf-8');
    res.json({ content });
  } catch (err) {
    res.status(500).json({ error: 'Failed to read file.' });
  }
});

export default router;
