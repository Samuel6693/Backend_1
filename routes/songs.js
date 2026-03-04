import { Router } from 'express';

const router = Router();

// In-memory song data used instead of a database.
let songs = [
  { id: 1, title: 'Espresso', artist: 'Sabrina Carpenter' },
  { id: 2, title: 'Creep', artist: 'Radiohead' },
  { id: 3, title: 'Titi Me Pregunto', artist: 'Bad Bunny' },
];

// GET /songs - list + filter + sort + limit (A1–A5)
router.get('/', (req, res) => {
  const artistQuery = (req.query.artist || '').toString().trim().toLowerCase();
  const q = (req.query.q || '').toString().trim().toLowerCase();
  const sort = req.query.sort;
  const limitRaw = req.query.limit;

  let result = songs;

  // 1) Filter: artist (case-insensitive exact match)
  if (artistQuery) {
    result = result.filter(
      (s) => (s.artist || '').toLowerCase() === artistQuery
    );
  }

  // 2) Filter: q (case-insensitive contains in title OR artist)
  if (q) {
    result = result.filter(
      (s) =>
        (s.title || '').toLowerCase().includes(q) ||
        (s.artist || '').toLowerCase().includes(q)
    );
  }

  // 3) Sort: only title or artist
  if (sort !== undefined) {
    if (sort !== 'title' && sort !== 'artist') {
      return res.status(400).json({ error: 'invalid sort field' });
    }

    // copy to avoid mutating original array
    result = [...result].sort((a, b) =>
      (a[sort] || '').localeCompare((b[sort] || ''), 'sv')
    );
  }

  // 4) Limit: positive integer
  if (limitRaw !== undefined) {
    const limit = Number(limitRaw);
    if (!Number.isInteger(limit) || limit < 1) {
      return res.status(400).json({ error: 'limit must be a positive integer' });
    }
    result = result.slice(0, limit);
  }

  return res.json(result);
});

// POST /songs - Create a new song
router.post('/', (req, res) => {
  const { title, artist } = req.body;

  // Require both fields when creating a new song.
  if (!title || !artist) {
    return res.status(400).json({ error: 'title and artist are required' });
  }

  const lastId = songs.length > 0 ? songs[songs.length - 1].id : 0;
  const newSong = { id: lastId + 1, title, artist };

  songs.push(newSong);
  res.status(201).json(newSong);
});

// PUT /songs/:id - Update an existing song
router.put('/:id', (req, res) => {
  const id = Number(req.params.id);

  if (Number.isNaN(id)) {
    return res.status(400).json({ error: 'id must be a number' });
  }

  const song = songs.find((s) => s.id === id);

  if (!song) {
    return res.status(404).json({ error: 'Song not found' });
  }

  const { title, artist } = req.body;

  // Allow partial updates, but require at least one field.
  if (title === undefined && artist === undefined) {
    return res.status(400).json({ error: 'Provide title and/or artist' });
  }

  if (title !== undefined) song.title = title;
  if (artist !== undefined) song.artist = artist;

  res.json(song);
});

// DELETE /songs/:id - Delete a song
router.delete('/:id', (req, res) => {
  const id = Number(req.params.id);

  if (Number.isNaN(id)) {
    return res.status(400).json({ error: 'id must be a number' });
  }

  const index = songs.findIndex((s) => s.id === id);

  if (index === -1) {
    return res.status(404).json({ error: 'Song not found' });
  }

  songs.splice(index, 1);
  res.status(204).send();
});

export default router;
