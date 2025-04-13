const express = require('express');
const fs = require('fs');
const { v4: uuidv4 } = require('uuid');
const router = express.Router();

const caminhoDB = './data/livros.json';

function lerDados() {
  return JSON.parse(fs.readFileSync(caminhoDB));
}

function escreverDados(data) {
  fs.writeFileSync(caminhoDB, JSON.stringify(data, null, 2));
}

router.get('/', (req, res) => {
  const livros = lerDados();
  res.json(livros);
});

router.post('/', (req, res) => {
  const livros = lerDados();
  const novoLivro = { id: uuidv4(), ...req.body };
  livros.push(novoLivro);
  escreverDados(livros);
  res.status(201).json(novoLivro);
});

router.put('/:id', (req, res) => {
  let livros = lerDados();
  const index = livros.findIndex(l => l.id === req.params.id);
  if (index === -1) return res.status(404).send('Livro não encontrado');
  livros[index] = { id: req.params.id, ...req.body };
  escreverDados(livros);
  res.json(livros[index]);
});

router.delete('/:id', (req, res) => {
  let livros = lerDados();
  livros = livros.filter(l => l.id !== req.params.id);
  escreverDados(livros);
  res.status(204).send();
});

module.exports = router;