
import express from 'express';
import connectDB from './db';

const app = express();

connectDB();

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port `);
});