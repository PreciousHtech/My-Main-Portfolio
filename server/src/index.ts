import dotenv from 'dotenv';
dotenv.config();

import { createApp } from './app.js';

const app = createApp();
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`[Server] Portfolio API listening on http://localhost:${PORT}`);
});
