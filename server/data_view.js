const Pool = require('pg').Pool
const pool = new Pool({
  user: 'my_user',
  host: 'localhost',
  database: 'db_labs',
  password: 'root',
  port: 5432,
});

const getDrivers = () => {
  return new Promise(function(resolve, reject) {
    pool.query('SELECT * FROM drivers', (error, results) => {
      if (error) {
        reject(error)
      }
      resolve(results.rows);
    })
  }) 
}

const getRoutePoints = () => {
  return new Promise(function(resolve, reject) {
    pool.query('SELECT * FROM route_points', (error, results) => {
      if (error) {
        reject(error)
      }
      resolve(results.rows);
    })
  }) 
}

const getRoutesList = () => {
  return new Promise(function(resolve, reject) {
    pool.query('SELECT * FROM routes_list', (error, results) => {
      if (error) {
        reject(error)
      }
      resolve(results.rows);
    })
  }) 
}

const getTripList = () => {
  return new Promise(function(resolve, reject) {
    pool.query('SELECT * FROM trip_list', (error, results) => {
      if (error) {
        reject(error)
      }
      resolve(results.rows);
    })
  }) 
}

const getVehicles = () => {
  return new Promise(function(resolve, reject) {
    pool.query('SELECT * FROM vehicles', (error, results) => {
      if (error) {
        reject(error)
      }
      resolve(results.rows);
    })
  }) 
}

module.exports = {
  getDrivers,
  getRoutePoints,
  getRoutesList,
  getTripList,
  getVehicles
}