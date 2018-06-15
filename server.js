const express = require('express')
const request = require('request')
const parser = require('body-parser')
const axios = require('axios')

const app = express()
app.use(express.static(__dirname))
app.get('/products/:id/images', (req, res) => {
  request(`http://localhost:3004${req.url}`, (error, response, body) => {
    if (error) throw new Error(error)
    res.end(body)
  })
})
app.get('/productDetails/:id', (req, res) => {
  request(`http://localhost:3001${req.url}`, (error, response, body) => {
    if (error) throw new Error(error)
    res.end(body)
  })
})
app.get('/youMayAlsoLike/:id', (req, res) => {
  console.log("Request from", req.url)
  request(`http://localhost:3003${req.url}`, (error, response, body) => {
    if (error) throw new Error(error)
    res.end(body)
  })
})
app.get('/reviews/:id', (req, res) => {
  console.log("Request from", req.url)
  axios.get(`http://localhost:3002${req.url}`)
    .then((response) => {
      res.send(response)
    })
    .catch((err) => {
      throw err
    })
})
app.get('/reviews/public/:file', (req, res) => {
  request(`http://localhost:3002${req.url}`, (error, response, body) => {
    if (error) throw new Error(error)
    res.end(body)
  })
})
app.listen(3000)
