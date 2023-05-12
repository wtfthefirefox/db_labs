import apiRequest from "../utils/apiRequest";
import {Vehicle} from "../types";

const vehicleProvider = {
    async listVehicles(): Promise<Vehicle[]> {
        const response = await apiRequest.get("/vehicles");
        return response.data;
    },

    async editVehicle(params: Vehicle): Promise<void> {
        const response = await apiRequest.post(`/vehicles/${params.vehicle_gov_number}`, params);
        return response.data;
    },

    async createVehicle(params: Vehicle): Promise<void> {
        const response = await apiRequest.post("/vehicles", params);
        return response.data;
    },

    async deleteVehicle(id: string): Promise<void> {
        const response = await apiRequest.delete(`/vehicles/${id}`);
        return response.data;
    }
};

export default vehicleProvider;
