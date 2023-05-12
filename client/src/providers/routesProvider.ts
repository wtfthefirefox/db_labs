import apiRequest from "../utils/apiRequest";
import {Route} from "../types";

const routeProvider = {
    async listRoutes(): Promise<Route[]> {
        const response = await apiRequest.get("/routes_list");
        return response.data;
    },

    async editRoute(params: Route): Promise<void> {
        const response = await apiRequest.post(`/routes_list/${params.route_id}`, params);
        return response.data;
    },

    async createRoute(params: Route): Promise<void> {
        const response = await apiRequest.post("/routes_list", params);
        return response.data;
    },

    async deleteRoute(id: string): Promise<void> {
        const response = await apiRequest.delete(`/routes_list/${id}`);
        return response.data;
    }
};

export default routeProvider;
