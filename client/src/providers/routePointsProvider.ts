import apiRequest from "../utils/apiRequest";
import {RoutePoint} from "../types";

const routePointsProvider = {
    async listRoutePoints(): Promise<RoutePoint[]> {
        const response = await apiRequest.get("/route_points");
        return response.data;
    },

    async editRoutePoint(params: RoutePoint): Promise<void> {
        const response = await apiRequest.post(`/route_points/${params.place_id}`, params);
        return response.data;
    },

    async createRoutePoint(params: RoutePoint): Promise<void> {
        const response = await apiRequest.post("/route_points", params);
        return response.data;
    },

    async deleteRoutePoint(id: string): Promise<void> {
        const response = await apiRequest.delete(`/route_points/${id}`);
        return response.data;
    }
};

export default routePointsProvider;
