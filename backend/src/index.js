import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './config/db.config.js';
import salesRoutes from './routes/salesRoutes.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use('/api', salesRoutes);

app.get('/', (req, res) => {
  res.json({ message: 'TruEstate Sales API is running' });
});


const startServer = async () => {
  try {
    await connectDB();
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (err) {
    console.error('Failed to start server:', err.message);
  }
};

startServer();
