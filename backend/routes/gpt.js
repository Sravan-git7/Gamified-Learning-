// backend/routes/gpt.js
import express from 'express';
import axios from 'axios';

const router = express.Router();

router.post('/gpt', async (req, res) => {
  const { message } = req.body;

  if (!message) {
    return res.status(400).json({ error: 'Message is required' });
  }

  try {
    const response = await axios.post('http://localhost:11434/api/generate', {
      model: 'mistral', // You can also use 'llama2' or others if downloaded
      prompt: message,
      stream: false
    });

    res.json({ response: response.data.response });
  } catch (error) {
    console.error('Ollama error:', error.message);
    res.status(500).json({ error: 'Ollama error' });
  }
});

export default router;
