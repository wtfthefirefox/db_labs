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

const createDriver = (body) => {
  return new Promise(function(resolve, reject) {
    try {
      pool.query(`insert into drivers values ('${body.driver_id}', '${body.driver_last_name}', '${body.driver_name}', '${body.driver_surname}', '${body.driver_class}', '${body.driver_car_number}')`, (error, results) => {
        if (error) {
          reject(error)
        }
        resolve();
      })
    } catch {
      reject("error");
    }
  }) 
}

const deleteDriver = (id) => {
  return new Promise(function(resolve, reject) {
    try {
      pool.query(`delete from drivers where driver_id = '${id}'`, (error, results) => {
        if (error) {
          reject(error)
        }
        resolve();
      })
    } catch {
      reject("error");
    }
  }) 
}

const updateDriver = (id, body) => {
  return new Promise(function(resolve, reject) {
    try {
      pool.query(`update drivers set driver_id = '${body.driver_id}', driver_last_name = '${body.driver_last_name}', driver_name = '${body.driver_name}', driver_surname = '${body.driver_surname}', driver_class = '${body.driver_class}', driver_car_number = '${body.driver_car_number}' where driver_id = '${id}'`, (error, results) => {
        if (error) {
          reject(error)
        }
        resolve();
      })
    } catch {
      reject("error");
    }
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

const createRoutePoint = (body) => {
  return new Promise(function(resolve, reject) {
    try {
      pool.query(`insert into route_points values ('${body.place_id}', '${body.place_name}')`, (error, results) => {
        if (error) {
          reject(error)
        }
        resolve();
      })
    } catch {
      reject("error");
    }
  }) 
}

const deleteRoutePoint = (id) => {
  return new Promise(function(resolve, reject) {
    try {
      pool.query(`delete from route_points where place_id = '${id}'`, (error, results) => {
        if (error) {
          reject(error)
        }
        resolve();
      })
    } catch {
      reject("error");
    }
  }) 
}

const updateRoutePoint = (id, body) => {
  return new Promise(function(resolve, reject) {
    try {
      pool.query(`update route_points set place_id = '${body.place_id}', place_name = '${body.place_name}' where place_id = '${body.place_id}'`, (error, results) => {
        if (error) {
          reject(error)
        }
        resolve();
      })
    } catch {
      reject("error");
    }
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

const createRoutesList = (body) => {
  return new Promise(function(resolve, reject) {
    try {
      pool.query(`insert into routes_list values (${body.route_id}, '${body.route_start_point}', '${body.route_end_point}', '${body.route_time_start}', '${body.route_duration}', '${body.route_period}', ${body.route_price})`, (error, results) => {
        if (error) {
          reject(error)
        }
        resolve();
      })
    } catch {
      reject("error");
    }
  }) 
}

const deleteRoutesList = (id) => {
  return new Promise(function(resolve, reject) {
    try {
      pool.query(`delete from routes_list where route_id = ${id}`, (error, results) => {
        if (error) {
          reject(error)
        }
        resolve();
      })
    } catch {
      reject("error");
    }
  }) 
}

const updateRoutesList = (id, body) => {
  return new Promise(function(resolve, reject) {
    try {
      pool.query(`update routes_list set route_id = ${body.route_id}, route_start_point = '${body.route_start_point}', route_end_point = '${body.route_end_point}', route_time_start = '${body.route_time_start}', route_duration = '${body.route_duration}', route_period = '${body.route_period}', route_price = ${body.route_price} where route_id = ${body.route_id}`, (error, results) => {
        if (error) {
          reject(error)
        }
        resolve();
      })
    } catch {
      reject("error");
    }
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

const createTripList = (body) => {
  return new Promise(function(resolve, reject) {
    try {
      pool.query(`insert into trip_list values (${body.trip_list_id}, ${body.trip_id}, '${body.trip_date}', '${body.trip_driver}', ${body.trip_tickets_count})`, (error, results) => {
        if (error) {
          reject(error)
        }
        resolve();
      })
    } catch {
      reject("error");
    }
  }) 
}

const deleteTripList = (id) => {
  return new Promise(function(resolve, reject) {
    try {
      pool.query(`delete from trip_list where trip_list_id = ${id}`, (error, results) => {
        if (error) {
          reject(error)
        }
        resolve();
      })
    } catch {
      reject("error");
    }
  }) 
}

const updateTripList = (id, body) => {
  return new Promise(function(resolve, reject) {
    try {
      pool.query(`update trip_list set trip_list_id = ${body.trip_list_id}, trip_id = ${body.trip_id}, trip_date = '${body.trip_date}', trip_driver = '${body.trip_driver}', trip_tickets_count = ${body.trip_tickets_count} where trip_list_id = ${body.trip_list_id}`, (error, results) => {
        if (error) {
          reject(error)
        }
        resolve();
      })
    } catch {
      reject("error");
    }
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

const createVehicle = (body) => {
  return new Promise(function(resolve, reject) {
    try {
      pool.query(`insert into vehicles values ('${body.vehicle_gov_number}', '${body.vehicle_mark}', ${body.vehicle_seats_count})`, (error, results) => {
        if (error) {
          reject(error)
        }
        resolve();
      })
    } catch {
      reject("error");
    }
  }) 
}

const deleteVehicle = (id) => {
  return new Promise(function(resolve, reject) {
    try {
      pool.query(`delete from vehicles where vehicle_gov_number = '${id}'`, (error, results) => {
        if (error) {
          reject(error)
        }
        resolve();
      })
    } catch {
      reject("error");
    }
  }) 
}

const updateVehicle = (id, body) => {
  return new Promise(function(resolve, reject) {
    try {
      pool.query(`update vehicles set vehicle_gov_number = '${body.vehicle_gov_number}', vehicle_mark = '${body.vehicle_mark}', vehicle_seats_count = ${body.vehicle_seats_count} where vehicle_gov_number = '${body.vehicle_gov_number}'`, (error, results) => {
        if (error) {
          reject(error)
        }
        resolve();
      })
    } catch {
      reject("error");
    }
  }) 
}

const getTripsListByDriver = (id) => {
  return new Promise(function(resolve, reject) {
    try {
      pool.query(`SELECT trip_list.trip_list_id, trip_list.trip_id, trip_list.trip_date, trip_list.trip_tickets_count, drivers.driver_last_name, drivers.driver_name, drivers.driver_surname, drivers.driver_car_number, vehicles.vehicle_mark, vehicles.vehicle_seats_count
      FROM trip_list, drivers, vehicles
      where trip_list.trip_driver = drivers.driver_id and trip_list.trip_driver = '${id}' and vehicles.vehicle_gov_number = drivers.driver_car_number
      ORDER BY trip_list.trip_date`, (error, results) => {
        if (error || !results) {
          reject(error)
        }
        resolve(results.rows);
      })
    } catch {
      reject("error");
    }
  }) 
}

const getFreeRoutePoints = () => {
  return new Promise(function(resolve, reject) {
    try {
      pool.query(`SELECT route_id, route_start_point, route_end_point
      FROM public.ROUTES_LIST routes 
      WHERE routes.route_id NOT IN (
        SELECT routes.route_id
        FROM public.TRIP_LIST trips
        WHERE trips.trip_id = route_id
      )
      `, (error, results) => {
        if (error) {
          reject(error)
        }
        resolve(results.rows);
      })
    } catch {
      reject("error");
    }
  }) 
}

const getAverRouteLoadList = () => {
  return new Promise(function(resolve, reject) {
    try {
      pool.query(`SELECT route_id, COUNT(trip_id) AS trips_count, SUM(trip_tickets_count) / SUM(vehicle_seats_count) AS average_load
      FROM TRIP_LIST
      JOIN ROUTES_LIST ON TRIP_LIST.trip_id = ROUTES_LIST.route_id
      JOIN DRIVERS ON TRIP_LIST.trip_driver = DRIVERS.driver_id
      JOIN VEHICLES ON DRIVERS.driver_car_number = VEHICLES.vehicle_gov_number
      GROUP BY route_id
      `, (error, results) => {
        if (error) {
          reject(error)
        }
        resolve(results.rows);
      })
    } catch {
      reject("error");
    }
  }) 
}

module.exports = {
  getDrivers,
  createDriver,
  updateDriver,
  deleteDriver,
  getRoutePoints,
  createRoutePoint,
  updateRoutePoint,
  deleteRoutePoint,
  getRoutesList,
  createRoutesList,
  updateRoutesList,
  deleteRoutesList,
  getTripList,
  createTripList,
  updateTripList,
  deleteTripList,
  getVehicles,
  createVehicle,
  updateVehicle,
  deleteVehicle,
  getTripsListByDriver,
  getFreeRoutePoints,
  getAverRouteLoadList
}