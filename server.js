const express = require('express')
const request = require('request')
const parser = require('body-parser')
const axios = require('axios')
const app = express()
app.use(parser.json())
app.use(express.static(__dirname))
app.get('/products/:id/images', (req, res) => {
  request(`http://localhost:3004${req.url}`, (error, response, body) => {
    if (error) throw new Error(error)
    res.end(body)
  })
})
app.get('/productDetails/:id', (req, res) => {
  console.log(`http://localhost:3001${req.url}`)
  axios.get(`http://localhost:3001${req.url}`)
    .then((response) => {
      res.send(response.data);
    })
    .catch((err) => {
      console.log('your axios has an error', err)
    });
});
app.get('/reviews-module/reviews/:id', (req, res) => {
  console.log(`http://localhost:3002${req.url}`);
  request(`http://localhost:3002${req.url}`, (error, response, body) => {
    if (error) throw new Error(error);
    res.end(body);
  });
});

app.put('/reviews-module/reviews', (req, res) => {
  console.log('req.body', req.body);
  axios.put(`http://localhost:3002${req.url}`, req.body)
    .then(() => {
      res.status(204).end();
    })
    .catch((err) => {
      throw (err);
    });
});

app.get('/youMayAlsoLike/:id', (req, res) => {
  axios.get(`http://localhost:3003${req.url}`)
    .then((response) => {
      console.log('this is the response', response.data)
      res.send(response.data);
    })
    .catch((err) => {
      console.log('your axios has an error', err)
    });
});

app.get('/products/:id/images', (req, res) => {
  axios.get(`http://localhost:3004${req.url}`)
    .then((response) => {
      console.log('this is the response', response.data)
      res.send(response.data);
    })
    .catch((err) => {
      console.log('your axios has an error', err)
    });
});
app.listen(3000)
