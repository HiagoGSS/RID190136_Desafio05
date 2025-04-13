const express = require('express');
const cors = require('cors');
const livrosRouter = require('./routes/livros');

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/livros', livrosRouter);

app.listen(3001, () => {
  console.log('Servidor rodando em http://localhost:3001');
});