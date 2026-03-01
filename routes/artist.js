import { Router } from 'express';

const router = Router();

// In-memory artist data used instead of a database.
let artists = [
  { id: 1, name: 'Bad Bunny' },
  { id: 2, name: 'Zara Larsson' },
  { id: 3, name: 'Radiohead' },
];

// GET /artists - Get all artists
router.get('/', (req, res) => {
  res.json(artists);
});

// GET /artists/:id - Get a specific artist by ID
router.get('/:id', (req, res) => {
  const id = Number(req.params.id);
  const artist = artists.find((a) => a.id === id);

  if (!artist) {
    return res.status(404).json({ error: 'Artist not found' });
  }

  res.json(artist);
});

// POST /artists - Create a new artist
router.post('/', (req, res) => {
  const { name } = req.body;

  if (!name) {
    return res.status(400).json({ error: 'name is required' });
  }

  const lastId = artists.length > 0 ? artists[artists.length - 1].id : 0;
  const newArtist = { id: lastId + 1, name };

  artists.push(newArtist);

  res.status(201).json(newArtist);
});

// PUT /artists/:id - Update an existing artist
router.put('/:id', (req, res) => {
  const id = Number(req.params.id);
  const artist = artists.find((a) => a.id === id);
  const { name } = req.body;

  if (!name) {
    return res.status(400).json({ error: 'name is required' });
  }

  if (!artist) {
    return res.status(404).json({ message: 'artist not found' });
  }

  artist.name = name;
  res.json(artist);
});

// DELETE /artists/:id - Delete an artist
router.delete('/:id', (req, res) => {
  const id = Number(req.params.id);
  const artistIndex = artists.findIndex((artist) => artist.id === id);

  if (artistIndex === -1) {
    return res.status(404).json({ error: 'Artist not found' });
  }

  artists.splice(artistIndex, 1);
  res.status(204).send();
});

export default router;
