import * as React from "react";
import {Table} from "antd";
import {ColumnsType} from "antd/es/table";
import { RoutePoint } from "../types";
import getTableProvider from "../providers/getTableProvider";

const columns: ColumnsType<RoutePoint> = [
    {
        title: "place_id",
        dataIndex: "place_id",
        key: "place_id",
        render: (_, record) => <span>{record.place_id}</span>
    },
    {
        title: "place_name",
        dataIndex: "place_name",
        key: "place_name",
        render: (_, record) => <span>{record.place_name}</span>
    }
];

const RoutePointsPage: React.FC = () => {
    const [data, changeData] = React.useState<RoutePoint[]>([]);

    const getData = async () => {
        const resp = await getTableProvider.listRoutePoints();
        changeData(resp);
    }

    React.useEffect(() => {
        getData();
    }, []);

    return (
        <Table columns={columns} dataSource={data} loading={!Boolean(data.length)} />
    )
}

export default RoutePointsPage;