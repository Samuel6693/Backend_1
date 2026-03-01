# Studera API

Ett enkelt Express API med separata routes for `artists` och `songs`.

## Installation

```bash
npm install
```

## Starta projektet

Utvecklingslage:

```bash
npm run dev
```

Vanligt lage:

```bash
npm start
```

Servern startar som standard pa:

```text
http://localhost:3000
```

## Endpoints

### Root

`GET /`

Svar:

```json
{
  "message": "API is running"
}
```

### Artists

`GET /api/artists`

`GET /api/artists/:id`

`POST /api/artists`

Exempel body:

```json
{
  "name": "Adele"
}
```

`PUT /api/artists/:id`

Exempel body:

```json
{
  "name": "New Artist Name"
}
```

`DELETE /api/artists/:id`

## Songs

`GET /api/songs`

`GET /api/songs/:id`

`POST /api/songs`

Exempel body:

```json
{
  "title": "Yellow",
  "artist": "Coldplay"
}
```

`PUT /api/songs/:id`

Exempel body:

```json
{
  "title": "Yellow",
  "artist": "Coldplay"
}
```

`DELETE /api/songs/:id`

## Teknik

- Node.js
- Express
- CORS
- dotenv

## Notering

Data sparas bara i minnet, inte i en databas. Nar servern startas om, nollstalls datan.
