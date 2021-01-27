const express = require('express');
const CustomExpress = require('./config/custom-express');
const app = CustomExpress();
app.use(express.json());

app.listen(8000, () => {
  console.log('Servidor rodando na porta 8000');
});
