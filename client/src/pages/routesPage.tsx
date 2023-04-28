import * as React from "react";
import {Table} from "antd";
import {ColumnsType} from "antd/es/table";
import { Route } from "../types";
import getTableProvider from "../providers/getTableProvider";

const columns: ColumnsType<Route> = [
    {
        title: "route_id",
        dataIndex: "route_id",
        key: "route_id",
        render: (_, record) => <span>{record.route_id}</span>
    },
    {
        title: "route_start_point",
        dataIndex: "route_start_point",
        key: "route_start_point",
        render: (_, record) => <span>{record.route_start_point}</span>
    },
    {
        title: "route_end_point",
        dataIndex: "route_end_point",
        key: "route_end_point",
        render: (_, record) => <span>{record.route_end_point}</span>
    },
    {
        title: "route_time_start",
        dataIndex: "route_time_start",
        key: "route_time_start",
        render: (_, record) => <span>{record.route_time_start}</span>
    },
    {
        title: "route_duration",
        dataIndex: "route_duration",
        key: "route_duration",
        render: (_, record) => <span>{record.route_duration}</span>
    },
    {
        title: "route_period",
        dataIndex: "route_period",
        key: "route_period",
        render: (_, record) => <span>{record.route_period}</span>
    },
    {
        title: "route_price",
        dataIndex: "route_price",
        key: "route_price",
        render: (_, record) => <span>{record.route_price}</span>
    }
];

const RoutesPage: React.FC = () => {
    const [data, changeData] = React.useState<Route[]>([]);

    const getData = async () => {
        const resp = await getTableProvider.listRoutes();
        changeData(resp);
    }

    React.useEffect(() => {
        getData();
    }, []);

    return (
        <Table columns={columns} dataSource={data} loading={!Boolean(data.length)} />
    )
}

export default RoutesPage;