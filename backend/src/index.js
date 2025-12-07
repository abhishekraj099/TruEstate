import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import salesRoutes from './routes/salesRoutes.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/sales', salesRoutes);

// Health check
app.get('/', (req, res) => {
  res.json({ message: 'TruEstate Sales API is running' });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
