import {useMutation, useQuery, useQueryClient, UseQueryResult} from "@tanstack/react-query";
import driversProvider from "../providers/driversProvider";
import {Driver} from "../types";
import {sleep} from "../utils";

const driverQueries = {
    ListDrivers: (): UseQueryResult<Driver[]> => {
        return useQuery(
            ["listDrivers"],
            () => {
                return driversProvider.listDrivers();
            },
            {
                staleTime: Infinity,
                retry: 2
            }
        );
    },

    CreateDriver: () => {
        const queryClient = useQueryClient();

        return useMutation(
            (params: Driver) => {
                return driversProvider.createDriver(params);
            },
            {
                onSuccess: async () => {
                    await sleep(1000);
                    queryClient.invalidateQueries(["listDrivers"], {
                        refetchPage: (_page, index, allPages) => index === allPages.length - 1
                    });
                }
            }
        );
    },

    UpdateDriver: () => {
        const queryClient = useQueryClient();

        return useMutation(
            (params: Driver) => {
                return driversProvider.editDriver(params);
            },
            {
                onSuccess: async () => {
                    await sleep(1000);
                    queryClient.invalidateQueries(["listDrivers"], {
                        refetchPage: (_page, index, allPages) => index === allPages.length - 1
                    });
                }
            }
        );
    },

    DeleteDriver: () => {
        const queryClient = useQueryClient();

        return useMutation(
            (id: string) => {
                return driversProvider.deleteDriver(id);
            },
            {
                onSuccess: async () => {
                    await sleep(1000);
                    queryClient.invalidateQueries(["listDrivers"], {
                        refetchPage: (_page, index, allPages) => index === allPages.length - 1
                    });
                }
            }
        );
    }
};

export default driverQueries;
