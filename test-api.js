import { GoogleGenerativeAI } from '@google/generative-ai';
import * as fs from 'fs';
import * as path from 'path';

const envPath = path.resolve(process.cwd(), '.env');
const envContent = fs.readFileSync(envPath, 'utf-8');
const match = envContent.match(/VITE_GEMINI_API_KEY=(.*)/);
const API_KEY = match ? match[1].trim() : null;

if (!API_KEY) {
   console.error('No API Key found in .env');
   process.exit(1);
}

const genAI = new GoogleGenerativeAI(API_KEY);
const model = genAI.getGenerativeModel({ model: 'gemini-2.5-flash' });

async function test() {
   try {
      const result = await model.generateContent('Hello');
      console.log('API Test Success:', result.response.text());
   } catch (error) {
      console.error('API Test Failed:', error);
   }
}

test();
