import apiRequest from "../utils/apiRequest";
import {Driver} from "../types";

const driversProvider = {
    async listDrivers(): Promise<Driver[]> {
        const response = await apiRequest.get("/drivers");
        return response.data;
    },

    async editDriver(params: Driver): Promise<void> {
        const response = await apiRequest.post(`/drivers/${params.driver_id}`, params);
        return response.data;
    },

    async createDriver(params: Driver): Promise<void> {
        const response = await apiRequest.post("/drivers", params);
        return response.data;
    },

    async deleteDriver(id: string): Promise<void> {
        const response = await apiRequest.delete(`/drivers/${id}`);
        return response.data;
    }
};

export default driversProvider;
