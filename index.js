import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import artistRoutes from './routes/artist.js';
import songRoutes from './routes/songs.js';

const app = express();

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.json({ message: 'API is running' });
});

app.use('/api/artists', artistRoutes);
app.use('/api/songs', songRoutes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
