const express = require('express');
const server = express();

const bd = require('./database/db');

server.use(express.static('public'));

server.use(express.urlencoded({ extended: true }));

server.listen(3000);

const nunjucks = require('nunjucks');
const db = require('./database/db');
nunjucks.configure('src/views', {
  express: server,
  noCache: true,
});

server.get('/', (req, res) => {
  return res.render('index.html');
});

server.get('/create-customer', (req, res) => {
  return res.render('create-customer.html');
});

server.post('/savepoint', (req, res) => {
  const query = `
     INSERT INTO customers (
      name,
      cpf,
      birth,
      dateRegister,
      salary
  ) VALUES (?,?,?,?,?);
 `;

  const values = [
    req.body.name,
    req.body.cpf,
    req.body.birth,
    req.body.dateRegister,
    req.body.salary,
  ];

  function afterInsertData(err) {
    if (err) {
      console.log(err);
      return res.send('Erro no cadastro!');
    }

    console.log('cadastrado com sucesso');
    console.log(this);

    return res.render('create-customer.html', { saved: true });
  }

  db.run(query, values, afterInsertData);
});

server.get('/customer-list', (req, res) => {
  db.all(`SELECT name, salary FROM customers`, function (err, rows) {
    if (err) {
      return console.log(err);
    }
    console.log(rows);
    return res.render('customer-list.html', { customers: rows });
  });
});
