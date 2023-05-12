import {useMutation, useQuery, useQueryClient, UseQueryResult} from "@tanstack/react-query";
import routePointsProvider from "../providers/routePointsProvider";
import {RoutePoint} from "../types";
import {sleep} from "../utils";

const routePointsQueries = {
    ListRoutePoints: (): UseQueryResult<RoutePoint[]> => {
        return useQuery(
            ["listRoutePoints"],
            () => {
                return routePointsProvider.listRoutePoints();
            },
            {
                staleTime: Infinity,
                retry: 2
            }
        );
    },

    CreateRoutePoint: () => {
        const queryClient = useQueryClient();

        return useMutation(
            (params: RoutePoint) => {
                return routePointsProvider.createRoutePoint(params);
            },
            {
                onSuccess: async () => {
                    await sleep(1000);
                    queryClient.invalidateQueries(["listRoutePoints"], {
                        refetchPage: (_page, index, allPages) => index === allPages.length - 1
                    });
                }
            }
        );
    },

    UpdateRoutePoint: () => {
        const queryClient = useQueryClient();

        return useMutation(
            (params: RoutePoint) => {
                return routePointsProvider.editRoutePoint(params);
            },
            {
                onSuccess: async () => {
                    await sleep(1000);
                    queryClient.invalidateQueries(["listRoutePoints"], {
                        refetchPage: (_page, index, allPages) => index === allPages.length - 1
                    });
                }
            }
        );
    },

    DeleteRoutePoint: () => {
        const queryClient = useQueryClient();

        return useMutation(
            (id: string) => {
                return routePointsProvider.deleteRoutePoint(id);
            },
            {
                onSuccess: async () => {
                    await sleep(1000);
                    queryClient.invalidateQueries(["listRoutePoints"], {
                        refetchPage: (_page, index, allPages) => index === allPages.length - 1
                    });
                }
            }
        );
    }
};

export default routePointsQueries;
