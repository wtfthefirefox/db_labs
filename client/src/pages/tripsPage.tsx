import * as React from "react";
import {Table} from "antd";
import {ColumnsType} from "antd/es/table";
import { Trip } from "../types";
import getTableProvider from "../providers/getTableProvider";

const columns: ColumnsType<Trip> = [
    {
        title: "trip_id",
        dataIndex: "trip_id",
        key: "trip_id",
        render: (_, record) => <span>{record.trip_id}</span>
    },
    {
        title: "trip_date",
        dataIndex: "trip_date",
        key: "trip_date",
        render: (_, record) => <span>{record.trip_date}</span>
    },
    {
        title: "trip_driver",
        dataIndex: "trip_driver",
        key: "trip_driver",
        render: (_, record) => <span>{record.trip_driver}</span>
    },
    {
        title: "trip_tickets_count",
        dataIndex: "trip_tickets_count",
        key: "trip_tickets_count",
        render: (_, record) => <span>{record.trip_tickets_count}</span>
    }
];

const TripsPage: React.FC = () => {
    const [data, changeData] = React.useState<Trip[]>([]);

    const getData = async () => {
        const resp = await getTableProvider.listTrips();
        changeData(resp);
    }

    React.useEffect(() => {
        getData();
    }, []);

    return (
        <Table columns={columns} dataSource={data} loading={!Boolean(data.length)} />
    )
}

export default TripsPage;