import * as React from "react";
import {Table, Row, Typography, Button} from "antd";
import {ColumnsType} from "antd/es/table";
import {FreeTrip} from "../types";
import tripsQueries from "../quries/tripsQueries";
import { useMount } from "react-use";

const columns: ColumnsType<FreeTrip> = [
    {
        title: "trip_list_id",
        dataIndex: "trip_list_id",
        key: "trip_list_id",
        render: (_, record) => <span>{record.route_id}</span>
    },
    {
        title: "trip_id",
        dataIndex: "trip_id",
        key: "trip_id",
        render: (_, record) => <span>{record.route_start_point}</span>
    },
    {
        title: "trip_date",
        dataIndex: "trip_date",
        key: "trip_date",
        render: (_, record) => <span>{record.route_end_point}</span>
    }
];

const FreeTripsPage: React.FC = () => {
    const listFreeTrips = tripsQueries.ListFreeTrips();
    const [data, changeData] = React.useState<FreeTrip[]>(listFreeTrips.data || []);

    useMount(() => {
        listFreeTrips.mutateAsync();
    });

    React.useEffect(() => {
        changeData(listFreeTrips.data || []);
    }, [listFreeTrips.data]);

    return (
        <>
            <Row align="middle" justify="space-between">
                <Typography.Title>Free trips</Typography.Title>
                <Button type="primary" onClick={() => listFreeTrips.mutateAsync()}>Reload data</Button>
            </Row>
            <Table columns={columns} dataSource={data} loading={listFreeTrips.isLoading} />
        </>
    );
};

export default FreeTripsPage;
