import * as React from "react";
import {Table} from "antd";
import {ColumnsType} from "antd/es/table";
import { Vehicle } from "../types";
import getTableProvider from "../providers/getTableProvider";

const columns: ColumnsType<Vehicle> = [
    {
        title: "vehicle_gov_number",
        dataIndex: "vehicle_gov_number",
        key: "vehicle_gov_number",
        render: (_, record) => <span>{record.vehicle_gov_number}</span>
    },
    {
        title: "vehicle_mark",
        dataIndex: "vehicle_mark",
        key: "vehicle_mark",
        render: (_, record) => <span>{record.vehicle_mark}</span>
    },
    {
        title: "vehicle_seats_count",
        dataIndex: "vehicle_seats_count",
        key: "vehicle_seats_count",
        render: (_, record) => <span>{record.vehicle_seats_count}</span>
    }
];

const VehiclesPage: React.FC = () => {
    const [data, changeData] = React.useState<Vehicle[]>([]);

    const getData = async () => {
        const resp = await getTableProvider.listVehicles();
        changeData(resp);
    }

    React.useEffect(() => {
        getData();
    }, []);

    return (
        <Table columns={columns} dataSource={data} loading={!Boolean(data.length)} />
    )
}

export default VehiclesPage;