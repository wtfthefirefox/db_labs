interface Driver {
    driver_id: string;
	driver_last_name: string;
	driver_name: string;
	driver_surname: string;
	driver_class: string;
	driver_car_number: string;
}

interface Vehicle {
    vehicle_gov_number: string;
	vehicle_mark: string;
	vehicle_seats_count: number;
}

interface RoutePoint {
    place_id: string;
	place_name: string;
}

interface Route {
    route_id: number;
	route_start_point: string;
	route_end_point: string;
	route_time_start: string;
	route_duration: string;
	route_period: string;
	route_price: number;
}

interface RouteAverLoad {
	route_id: number;
    trips_count: string;
	average_load: string;
}

interface Trip {
	trip_list_id: number;
    trip_id: number;
	trip_date: string;
	trip_driver: string;
	trip_tickets_count: number;
}

interface TripWithDriver {
	trip_list_id: number;
    trip_id: number;
	trip_date: string;
	trip_tickets_count: number;
	driver_last_name: string;
	driver_name: string;
	driver_surname: string;
	driver_car_number: string;
	vehicle_mark: string;
	vehicle_seats_count: string;
}

interface FreeTrip {
	route_id: number;
    route_start_point: string;
	route_end_point: string;
}

export type {
    Driver,
    Vehicle,
    RoutePoint,
    Route,
    Trip,
	TripWithDriver,
	FreeTrip,
	RouteAverLoad
}