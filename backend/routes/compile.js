import { Router } from 'express';
import axios from 'axios';
const router = Router();

const JUDGE0_API_URL = 'https://judge0-ce.p.rapidapi.com/submissions?base64_encoded=false&wait=true';

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

router.post('/', async (req, res) => {
  console.log('=== Compile Request ===');
  console.log('Request body:', req.body);
  
  const { language, source_code, stdin } = req.body;

  if (!language || !source_code) {
    console.log('Missing required fields:', { language, source_code });
    return res.status(400).json({ error: 'Missing language or source_code' });
  }

  if (!process.env.JUDGE0_API_KEY) {
    console.log('JUDGE0_API_KEY is missing from environment variables');
    return res.status(500).json({ 
      error: 'Server configuration error',
      message: 'JUDGE0_API_KEY is not set in environment variables'
    });
  }

  const language_id = getLanguageId(language);
  console.log('Language ID for', language, ':', language_id);

  try {
    console.log('Making request to Judge0 API...');
    const response = await axios.post(
      JUDGE0_API_URL,
      {
        language_id,
        source_code,
        stdin: stdin || '',
      },
      {
        headers: {
          'Content-Type': 'application/json',
          'X-RapidAPI-Key': process.env.JUDGE0_API_KEY,
          'X-RapidAPI-Host': 'judge0-ce.p.rapidapi.com',
        },
      }
    );

    console.log('Judge0 API Response:', response.data);
    const { stdout, stderr, compile_output, message } = response.data;
    const output = stdout || stderr || compile_output || message || 'No output';
    
    res.status(200).json({ output });
  } catch (err) {
    console.error('Error details:', {
      message: err.message,
      response: err.response?.data,
      status: err.response?.status,
      headers: err.response?.headers
    });
    
    res.status(500).json({ 
      error: 'Failed to compile code',
      message: err.response?.data?.message || err.message,
      details: process.env.NODE_ENV === 'development' ? {
        status: err.response?.status,
        data: err.response?.data
      } : undefined
    });
  }
});

export default router;
