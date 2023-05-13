import {useMutation, useQuery, useQueryClient, UseQueryResult} from "@tanstack/react-query";
import routeProvider from "../providers/routesProvider";
import {Route} from "../types";
import {sleep} from "../utils";

const routeQueries = {
    ListRoutes: (): UseQueryResult<Route[]> => {
        return useQuery(
            ["listRoutes"],
            () => {
                return routeProvider.listRoutes();
            },
            {
                staleTime: Infinity,
                retry: 2
            }
        );
    },

    ListAverRouteLoad: () => {
        return useMutation(
            () => {
                return routeProvider.listAverRoutesLoad();
            },
            {
                onSuccess: async () => {
                    await sleep(1000);
                }
            }
        );
    },

    CreateRoute: () => {
        const queryClient = useQueryClient();

        return useMutation(
            (params: Route) => {
                return routeProvider.createRoute(params);
            },
            {
                onSuccess: async () => {
                    await sleep(1000);
                    queryClient.invalidateQueries(["listRoutes"], {
                        refetchPage: (_page, index, allPages) => index === allPages.length - 1
                    });
                }
            }
        );
    },

    UpdateRoute: () => {
        const queryClient = useQueryClient();

        return useMutation(
            (params: Route) => {
                return routeProvider.editRoute(params);
            },
            {
                onSuccess: async () => {
                    await sleep(1000);
                    queryClient.invalidateQueries(["listRoutes"], {
                        refetchPage: (_page, index, allPages) => index === allPages.length - 1
                    });
                }
            }
        );
    },

    DeleteRoute: () => {
        const queryClient = useQueryClient();

        return useMutation(
            (id: string) => {
                return routeProvider.deleteRoute(id);
            },
            {
                onSuccess: async () => {
                    await sleep(1000);
                    queryClient.invalidateQueries(["listRoutes"], {
                        refetchPage: (_page, index, allPages) => index === allPages.length - 1
                    });
                }
            }
        );
    }
};

export default routeQueries;
