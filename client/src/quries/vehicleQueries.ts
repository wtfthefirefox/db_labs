import {useMutation, useQuery, useQueryClient, UseQueryResult} from "@tanstack/react-query";
import vehicleProvider from "../providers/vehicleProvider";
import {Vehicle} from "../types";
import {sleep} from "../utils";

const vehicleQueries = {
    ListVehicles: (): UseQueryResult<Vehicle[]> => {
        return useQuery(
            ["listVehicles"],
            () => {
                return vehicleProvider.listVehicles();
            },
            {
                staleTime: Infinity,
                retry: 2
            }
        );
    },

    CreateVehicle: () => {
        const queryClient = useQueryClient();

        return useMutation(
            (params: Vehicle) => {
                return vehicleProvider.createVehicle(params);
            },
            {
                onSuccess: async () => {
                    await sleep(1000);
                    queryClient.invalidateQueries(["listVehicles"], {
                        refetchPage: (_page, index, allPages) => index === allPages.length - 1
                    });
                }
            }
        );
    },

    UpdateVehicle: () => {
        const queryClient = useQueryClient();

        return useMutation(
            (params: Vehicle) => {
                return vehicleProvider.editVehicle(params);
            },
            {
                onSuccess: async () => {
                    await sleep(1000);
                    queryClient.invalidateQueries(["listVehicles"], {
                        refetchPage: (_page, index, allPages) => index === allPages.length - 1
                    });
                }
            }
        );
    },

    DeleteVehicle: () => {
        const queryClient = useQueryClient();

        return useMutation(
            (id: string) => {
                return vehicleProvider.deleteVehicle(id);
            },
            {
                onSuccess: async () => {
                    await sleep(1000);
                    queryClient.invalidateQueries(["listVehicles"], {
                        refetchPage: (_page, index, allPages) => index === allPages.length - 1
                    });
                }
            }
        );
    }
};

export default vehicleQueries;
