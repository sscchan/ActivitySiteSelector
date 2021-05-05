const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

app.use(express.static('build'))

app.get('/sites', (req, res) => {
  res.send('Hello World!');
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});