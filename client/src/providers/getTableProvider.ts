import apiRequest from "../utils/apiRequest";
import { Route, RoutePoint, Vehicle, Driver, Trip } from "../types";

const getTableProvider = {
  async listDrivers(): Promise<Driver[]> {
    const response = await apiRequest.get("/drivers");
    return response.data;
  },

  async listRoutes(): Promise<Route[]> {
    const response = await apiRequest.get("/routes_list");
    return response.data;
  },

  async listRoutePoints(): Promise<RoutePoint[]> {
    const response = await apiRequest.get("/route_points");
    return response.data;
  },

  async listVehicles(): Promise<Vehicle[]> {
    const response = await apiRequest.get("/vehicles");
    return response.data;
  },

  async listTrips(): Promise<Trip[]> {
    const response = await apiRequest.get("/trips_list");
    return response.data;
  }
};

export default getTableProvider;
