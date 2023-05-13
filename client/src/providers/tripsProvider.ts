import apiRequest from "../utils/apiRequest";
import {FreeTrip, Trip, TripWithDriver} from "../types";

const tripsProvider = {
    async listTrips(): Promise<Trip[]> {
        const response = await apiRequest.get("/trips_list");
        return response.data;
    },

    async listTripsByDriver(id: string): Promise<TripWithDriver[]> {
        const response = await apiRequest.get(`/trips_driver/${id}`);
        return response.data;
    },

    async listFreeTrips(): Promise<FreeTrip[]> {
        const response = await apiRequest.get("/trips_free");
        return response.data;
    },

    async editTrip(params: Trip): Promise<void> {
        const response = await apiRequest.post(`/trips_list/${params.trip_list_id}`, params);
        return response.data;
    },

    async createTrip(params: Trip): Promise<void> {
        const response = await apiRequest.post("/trips_list", params);
        return response.data;
    },

    async deleteTrip(id: string): Promise<void> {
        const response = await apiRequest.delete(`/trips_list/${id}`);
        return response.data;
    }
};

export default tripsProvider;
