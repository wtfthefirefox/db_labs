import apiRequest from "../utils/apiRequest";
import {Trip} from "../types";

const tripsProvider = {
    async listTrips(): Promise<Trip[]> {
        const response = await apiRequest.get("/trips_list");
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
