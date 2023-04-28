const express = require('express')
const app = express()
const port = 3001

const data_model = require('./data_view')

app.use(express.json())
app.use(function (req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,OPTIONS');
  res.append('Access-Control-Allow-Credentials', 'true');
  next();
});

app.get('/drivers', (req, res) => {
    data_model.getDrivers()
    .then(response => {
        res.status(200).send(response);
    })
    .catch(error => {
        res.status(500).send(error);
    })
})

app.get('/route_points', (req, res) => {
    data_model.getRoutePoints()
    .then(response => {
      res.status(200).send(response);
    })
    .catch(error => {
      res.status(500).send(error);
    })
})

app.get('/routes_list', (req, res) => {
    data_model.getRoutesList()
    .then(response => {
        res.status(200).send(response);
    })
    .catch(error => {
        res.status(500).send(error);
    })
})

app.get('/trips_list', (req, res) => {
    data_model.getTripList()
    .then(response => {
        res.status(200).send(response);
    })
    .catch(error => {
        res.status(500).send(error);
    })
})

app.get('/vehicles', (req, res) => {
    data_model.getVehicles()
    .then(response => {
        res.status(200).send(response);
    })
    .catch(error => {
        res.status(500).send(error);
    })
})

app.listen(port, () => {
  console.log(`App running on port ${port}.`)
})
