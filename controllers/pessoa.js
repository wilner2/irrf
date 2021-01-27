const pessoas = require('../pessoa.json');

module.exports = (app) => {
  app.get('/pessoas', (req, res) => {
    res.send(pessoas);
  });
};
