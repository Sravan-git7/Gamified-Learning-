// backend/server.js
import dotenv from 'dotenv';
dotenv.config();

// Debug logging for environment variables
console.log('Environment variables loaded:', {
  JUDGE0_API_KEY: process.env.JUDGE0_API_KEY ? 'Present' : 'Missing',
  NODE_ENV: process.env.NODE_ENV || 'development'
});

import express from 'express';
import cors from 'cors';
import gptRouter from './routes/gpt.js';
import codeRouter from './routes/code.js';
import compileRouter from './routes/compile.js';
import axios from 'axios';

const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/assistant', gptRouter); // actual GPT assistant route
app.use('/api/code', codeRouter);     // code save/load route
app.use('/api/compile', compileRouter); // code compilation route

// Add this new test route before the /run route
app.get('/test-api', async (req, res) => {
  try {
    console.log('Testing RapidAPI connection...');
    const response = await axios.get(
      'https://judge0-ce.p.rapidapi.com/languages',
      {
        headers: {
          'X-RapidAPI-Key': process.env.JUDGE0_API_KEY,
          'X-RapidAPI-Host': 'judge0-ce.p.rapidapi.com',
        },
      }
    );
    console.log('API Test Response:', response.data);
    res.json({ 
      status: 'success',
      message: 'API connection successful',
      data: response.data
    });
  } catch (err) {
    console.error('API Test Error:', {
      message: err.message,
      response: err.response?.data,
      status: err.response?.status
    });
    res.status(500).json({
      status: 'error',
      message: 'API connection failed',
      error: err.response?.data || err.message
    });
  }
});

// Optional: Health check route
app.get('/', (req, res) => {
  res.send('Server is running...');
});

// Language name to Judge0 language ID mapping
function getLanguageId(language) {
  const map = {
    javascript: 63,
    python: 71,
    cpp: 54,
    c: 50,
    java: 62,
  };
  return map[language.toLowerCase()] || 63;
}

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    error: 'Something went wrong!',
    message: process.env.NODE_ENV === 'development' ? err.message : undefined
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
