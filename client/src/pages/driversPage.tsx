import * as React from "react";
import {Table} from "antd";
import {ColumnsType} from "antd/es/table";
import { Driver } from "../types";
import getTableProvider from "../providers/getTableProvider";

const columns: ColumnsType<Driver> = [
    {
        title: "driver_id",
        dataIndex: "driver_id",
        key: "driver_id",
        render: (_, record) => <span>{record.driver_id}</span>
    },
    {
        title: "driver_last_name",
        dataIndex: "driver_last_name",
        key: "driver_last_name",
        render: (_, record) => <span>{record.driver_last_name}</span>
    },
    {
        title: "driver_name",
        dataIndex: "driver_name",
        key: "driver_name",
        render: (_, record) => <span>{record.driver_name}</span>
    },
    {
        title: "driver_surname",
        dataIndex: "driver_surname",
        key: "driver_surname",
        render: (_, record) => <span>{record.driver_surname}</span>
    },
    {
        title: "driver_class",
        dataIndex: "driver_class",
        key: "driver_class",
        render: (_, record) => <span>{record.driver_class}</span>
    },
    {
        title: "driver_car_number",
        dataIndex: "driver_car_number",
        key: "driver_car_number",
        render: (_, record) => <span>{record.driver_car_number}</span>
    }
];

const DriversPage: React.FC = () => {
    const [data, changeData] = React.useState<Driver[]>([]);

    const getData = async () => {
        const resp = await getTableProvider.listDrivers();
        changeData(resp);
    }

    React.useEffect(() => {
        getData();
    }, []);

    return (
        <Table columns={columns} dataSource={data} loading={!Boolean(data.length)} />
    )
}

export default DriversPage;