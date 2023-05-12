import {useMutation, useQuery, useQueryClient, UseQueryResult} from "@tanstack/react-query";
import tripsProvider from "../providers/tripsProvider";
import {Trip} from "../types";
import {sleep} from "../utils";

const tripsQueries = {
    ListTrips: (): UseQueryResult<Trip[]> => {
        return useQuery(
            ["listTrips"],
            () => {
                return tripsProvider.listTrips();
            },
            {
                staleTime: Infinity,
                retry: 2
            }
        );
    },

    CreateTrip: () => {
        const queryClient = useQueryClient();

        return useMutation(
            (params: Trip) => {
                return tripsProvider.createTrip(params);
            },
            {
                onSuccess: async () => {
                    await sleep(1000);
                    queryClient.invalidateQueries(["listTrips"], {
                        refetchPage: (_page, index, allPages) => index === allPages.length - 1
                    });
                }
            }
        );
    },

    UpdateTrip: () => {
        const queryClient = useQueryClient();

        return useMutation(
            (params: Trip) => {
                return tripsProvider.editTrip(params);
            },
            {
                onSuccess: async () => {
                    await sleep(1000);
                    queryClient.invalidateQueries(["listTrips"], {
                        refetchPage: (_page, index, allPages) => index === allPages.length - 1
                    });
                }
            }
        );
    },

    DeleteTrip: () => {
        const queryClient = useQueryClient();

        return useMutation(
            (id: string) => {
                return tripsProvider.deleteTrip(id);
            },
            {
                onSuccess: async () => {
                    await sleep(1000);
                    queryClient.invalidateQueries(["listTrips"], {
                        refetchPage: (_page, index, allPages) => index === allPages.length - 1
                    });
                }
            }
        );
    }
};

export default tripsQueries;
