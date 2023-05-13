const express = require('express')
const app = express()
const port = 3001

const data_model = require('./data_view')

app.use(express.json())
app.use(function (req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  res.append('Access-Control-Allow-Credentials', 'true');
  next();
});

app.param('name', function(req, res, next, name) {
    req.name = name;
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

app.post('/drivers', (req, res) => {
    data_model.createDriver(req.body)
    .then(response => {
        res.status(200).send(response);
    })
    .catch(error => {
        res.status(500).send(error);
    })
})

app.post('/drivers/:name', (req, res) => {
    data_model.updateDriver(req.name, req.body)
    .then(response => {
        res.status(200).send(response);
    })
    .catch(error => {
        res.status(500).send(error);
    })
})

app.delete('/drivers/:name', (req, res) => {
    data_model.deleteDriver(req.name)
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

app.post('/route_points', (req, res) => {
    data_model.createRoutePoint(req.body)
    .then(response => {
        res.status(200).send(response);
    })
    .catch(error => {
        res.status(500).send(error);
    })
})

app.post('/route_points/:name', (req, res) => {
    data_model.updateRoutePoint(req.name, req.body)
    .then(response => {
        res.status(200).send(response);
    })
    .catch(error => {
        res.status(500).send(error);
    })
})

app.delete('/route_points/:name', (req, res) => {
    data_model.deleteRoutePoint(req.name)
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

app.post('/routes_list', (req, res) => {
    data_model.createRoutesList(req.body)
    .then(response => {
        res.status(200).send(response);
    })
    .catch(error => {
        res.status(500).send(error);
    })
})

app.post('/routes_list/:name', (req, res) => {
    data_model.updateRoutesList(req.name, req.body)
    .then(response => {
        res.status(200).send(response);
    })
    .catch(error => {
        res.status(500).send(error);
    })
})

app.delete('/routes_list/:name', (req, res) => {
    data_model.deleteRoutesList(req.name)
    .then(response => {
        res.status(200).send(response);
    })
    .catch(error => {
        res.status(500).send(error);
    })
})

app.get('/route_aver_load', (req, res) => {
    data_model.getAverRouteLoadList()
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

app.post('/trips_list', (req, res) => {
    data_model.createTripList(req.body)
    .then(response => {
        res.status(200).send(response);
    })
    .catch(error => {
        res.status(500).send(error);
    })
})

app.post('/trips_list/:name', (req, res) => {
    data_model.updateTripList(req.name, req.body)
    .then(response => {
        res.status(200).send(response);
    })
    .catch(error => {
        res.status(500).send(error);
    })
})

app.delete('/trips_list/:name', (req, res) => {
    data_model.deleteTripList(req.name)
    .then(response => {
        res.status(200).send(response);
    })
    .catch(error => {
        res.status(500).send(error);
    })
})

app.get('/trips_driver/:name', (req, res) => {
    data_model.getTripsListByDriver(req.name)
    .then(response => {
        res.status(200).send(response);
    })
    .catch(error => {
        res.status(500).send(error);
    })
})

app.get('/trips_free', (req, res) => {
    data_model.getFreeRoutePoints()
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

app.post('/vehicles', (req, res) => {
    data_model.createVehicle(req.body)
    .then(response => {
        res.status(200).send(response);
    })
    .catch(error => {
        res.status(500).send(error);
    })
})

app.post('/vehicles/:name', (req, res) => {
    data_model.updateVehicle(req.name, req.body)
    .then(response => {
        res.status(200).send(response);
    })
    .catch(error => {
        res.status(500).send(error);
    })
})

app.delete('/vehicles/:name', (req, res) => {
    data_model.deleteDriver(req.name)
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
