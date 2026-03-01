import express from 'express' // Importera Express-biblioteket
const app = express(); // Skapa en Express-applikation
const port = 3000;

app.get('/', (req, res) => { // Definiera en route för GET-förfrågningar till root URL
  res.status(200).send('Hej från Node.js server!'); // Skicka en 200 OK status och ett meddelande som svar
}); // När en GET-förfrågan görs till root URL, kommer servern att svara med "Hej från Node.js server!"

app.listen(port, () => { // Starta servern och lyssna på den angivna porten
  console.log(`Servern körs på port ${port}`); // När servern startar, logga ett meddelande i konsolen som indikerar att servern körs och på vilken port
});
