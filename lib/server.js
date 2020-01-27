

const express = require('express');
const app = express();
const { timeStamp, logRequest } = require('./logger.js');
const Model = require('../in-memory-data-model');

app.use(express.json());
app.use(timeStamp);
app.use(logRequest);

let newModel = new Model;


// basic routing


function errorHandler(err, req, res, next) {
  res.status(500);
  res.statusMessage = 'Generic Server Error!';
  res.json({ error: err });
}

function notFoundHandler(req, res, next) {
  res.status(404);
  res.statusMessage = 'Not Found!';
  res.json({ error: 'Not Found' });
}


app.get('/real-error', (req, res) => {
  throw new Error('my first real error');
});





app.get('/products', (req, res) => {
  console.log('request obj:', req.query);

  let output = {
    type: req.query.type,
    productsWorked: true,
  };
  res.status(200).json(output);
});

app.get('/categories', (req, res) => {
  console.log('request obj:', req.query);

  let output = {
    type: req.query.type,
    ctegoriesWorked: true,
  };
  res.status(200).json(output);
});




let db = [];



// API routes for products

app.get('/api/v1/products', (req, res, next) => {
  newModel.get();
  let count = db.length;
  let results = db;
  res.json({ count, results });
});

app.get('/api/v1/products/:id', (req, res, next) => {

  let id = req.params.id;
  newModel.get(id);
  let record = db.filter((record) => record.id === parseInt(id));
  res.json(record);
});

app.post('/api/v1/products', (req, res, next) => {
  let { name } = req.body;
  let record = { name };
  newModel.create(record,record.id);
  record.id = db.length + 1;
  db.push(record);
  res.status(201).json(record);
});

app.put('/api/v1/products/:id', (req, res, next) => {
  let idToUpdate = req.params.id;
  let { name, id } = req.body;
  let updatedRecord = { name, id };
  newModel.update(name,id);
  db = db.map((record) => (record.id === parseInt(idToUpdate)) ? updatedRecord : record);
  res.json(updatedRecord);
});

app.delete('/api/v1/products/:id', (req, res, next) => {
  let id = req.params.id;
  newModel.delete(id);
  db = db.filter((record) => record.id !== parseInt(id));
  res.json({ msg: 'item deleted' });
});








// API routes for categories

app.get('/api/v1/categories', (req, res, next) => {
  newModel.get();
  let count = db.length;
  let results = db;
  res.json({ count, results });
});

app.get('/api/v1/categories/:id', (req, res, next) => {

  let id = req.params.id;
  newModel.get(id);
  let record = db.filter((record) => record.id === parseInt(id));
  res.json(record);
});

app.post('/api/v1/categories', (req, res, next) => {
  let { name } = req.body;
  let record = { name };
  newModel.create(record,record.id);
  record.id = db.length + 1;
  db.push(record);
  res.status(201).json(record);
});

app.put('/api/v1/categories/:id', (req, res, next) => {
  let idToUpdate = req.params.id;
  let { name, id } = req.body;
  let updatedRecord = { name, id };
  newModel.update(name,id);
  db = db.map((record) => (record.id === parseInt(idToUpdate)) ? updatedRecord : record);
  res.json(updatedRecord);
});

app.delete('/api/v1/categories/:id', (req, res, next) => {
  let id = req.params.id;
  newModel.delete(id);
  db = db.filter((record) => record.id !== parseInt(id));
  res.json({ msg: 'item deleted' });
});





module.exports = {
  server: app,
  start: port => {
    let PORT = port || process.env.PORT || 8080;
    app.listen(PORT, () => console.log(`listening on ${PORT}`));
  },
};