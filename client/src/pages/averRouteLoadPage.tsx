import * as React from "react";
import {Table, Button, Row, Typography} from "antd";
import {ColumnsType} from "antd/es/table";
import {RouteAverLoad} from "../types";
import routeQueries from "../quries/routesQueries";
import { useMount } from "react-use";

const columns: ColumnsType<RouteAverLoad> = [
    {
        title: "route_id",
        dataIndex: "route_id",
        key: "route_id",
        render: (_, record) => <span>{record.route_id}</span>
    },
    {
        title: "trips_count",
        dataIndex: "trips_count",
        key: "trips_count",
        render: (_, record) => <span>{record.trips_count}</span>
    },
    {
        title: "average_load",
        dataIndex: "average_load",
        key: "average_load",
        render: (_, record) => <span>{record.average_load}</span>
    }
];

const AverRouteLoadPage: React.FC = () => {
    const listAverRouteLoad = routeQueries.ListAverRouteLoad();
    const [data, changeData] = React.useState<RouteAverLoad[]>(listAverRouteLoad.data || []);

    React.useEffect(() => {
        changeData(listAverRouteLoad.data || []);
    }, [listAverRouteLoad.data]);

    useMount(() => listAverRouteLoad.mutateAsync());

    return (
        <>
            <Row align="middle" justify="space-between">
                <Typography.Title>Trips Aver Load</Typography.Title>
                <Button type="primary" onClick={() => listAverRouteLoad.mutateAsync()}>
                    Reload data
                </Button>
            </Row>
            <Table columns={columns} dataSource={data} loading={listAverRouteLoad.isLoading} />
        </>
    );
};

export default AverRouteLoadPage;
