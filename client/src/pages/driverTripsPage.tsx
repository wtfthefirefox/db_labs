import * as React from "react";
import {Table, Button, Space, Input, Row, Typography} from "antd";
import type {InputRef} from "antd";
import {SearchOutlined} from "@ant-design/icons";
import Highlighter from "react-highlight-words";
import {ColumnsType, ColumnType} from "antd/es/table";
import type {FilterConfirmProps} from "antd/es/table/interface";
import {TripWithDriver} from "../types";
import tripsQueries from "../quries/tripsQueries";

type DataIndex = keyof TripWithDriver;

const TripByDriversPage: React.FC = () => {
    const listTripByDrivers = tripsQueries.ListTripByDrivers();
    const [data, changeData] = React.useState<TripWithDriver[]>(listTripByDrivers.data || []);
    const [driverId, changeDriverId] = React.useState<string>("");
    const [searchText, setSearchText] = React.useState("");
    const [searchedColumn, setSearchedColumn] = React.useState("");
    const searchInput = React.useRef<InputRef>(null);

    React.useEffect(() => {
        changeData(listTripByDrivers.data || []);
    }, [listTripByDrivers.data]);

    const FindData = async () => {
        await listTripByDrivers.mutateAsync(driverId);
    };

    const handleSearch = (
        selectedKeys: string[],
        confirm: (param?: FilterConfirmProps) => void,
        dataIndex: DataIndex
    ) => {
        confirm();
        setSearchText(selectedKeys[0]);
        setSearchedColumn(dataIndex);
    };

    const handleReset = (clearFilters: () => void) => {
        clearFilters();
        setSearchText("");
    };

    const getColumnSearchProps = (dataIndex: DataIndex): ColumnType<TripWithDriver> => ({
        filterDropdown: ({setSelectedKeys, selectedKeys, confirm, clearFilters, close}) => (
            <div style={{padding: 8}} onKeyDown={(e) => e.stopPropagation()}>
                <Input
                    ref={searchInput}
                    placeholder={`Search ${dataIndex}`}
                    value={selectedKeys[0]}
                    onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
                    onPressEnter={() => handleSearch(selectedKeys as string[], confirm, dataIndex)}
                    style={{marginBottom: 8, display: "block"}}
                />
                <Space>
                    <Button
                        type="primary"
                        onClick={() => handleSearch(selectedKeys as string[], confirm, dataIndex)}
                        icon={<SearchOutlined />}
                        size="small"
                        style={{width: 90}}
                    >
                        Search
                    </Button>
                    <Button onClick={() => clearFilters && handleReset(clearFilters)} size="small" style={{width: 90}}>
                        Reset
                    </Button>
                    <Button
                        type="link"
                        size="small"
                        onClick={() => {
                            close();
                        }}
                    >
                        close
                    </Button>
                </Space>
            </div>
        ),
        filterIcon: (filtered: boolean) => <SearchOutlined style={{color: filtered ? "#1890ff" : undefined}} />,
        onFilter: (value, record) =>
            record[dataIndex]
                .toString()
                .toLowerCase()
                .includes((value as string).toLowerCase()),
        onFilterDropdownOpenChange: (visible: boolean) => {
            if (visible) {
                setTimeout(() => searchInput.current?.select(), 100);
            }
        },
        render: (text: string) =>
            searchedColumn === dataIndex ? (
                <Highlighter
                    highlightStyle={{backgroundColor: "#ffc069", padding: 0}}
                    searchWords={[searchText]}
                    autoEscape
                    textToHighlight={text ? text.toString() : ""}
                />
            ) : (
                text
            )
    });

    const columns: ColumnsType<TripWithDriver> = [
        {
            title: "trip_list_id",
            dataIndex: "trip_list_id",
            key: "trip_list_id",
            render: (_, record) => <span>{record.trip_list_id}</span>,
            ...getColumnSearchProps("trip_list_id")
        },
        {
            title: "trip_id",
            dataIndex: "trip_id",
            key: "trip_id",
            render: (_, record) => <span>{record.trip_id}</span>,
            ...getColumnSearchProps("trip_id")
        },
        {
            title: "trip_date",
            dataIndex: "trip_date",
            key: "trip_date",
            render: (_, record) => <span>{record.trip_date}</span>,
            ...getColumnSearchProps("trip_date")
        },
        {
            title: "trip_tickets_count",
            dataIndex: "trip_tickets_count",
            key: "trip_tickets_count",
            render: (_, record) => <span>{record.trip_tickets_count}</span>
        },
        {
            title: "driver",
            dataIndex: "driver",
            key: "driver",
            render: (_, record) => (
                <span>{`${record.driver_last_name} ${record.driver_name} ${record.driver_surname}`}</span>
            )
        },
        {
            title: "driver_car_number",
            dataIndex: "driver_car_number",
            key: "driver_car_number",
            render: (_, record) => <span>{record.driver_car_number}</span>
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
    

    return (
        <>
            <Row align="middle" justify="space-between">
                <Typography.Title>
                    {driverId.length ? `Trips of ${driverId} driver` : "Select a driver for a search"}
                </Typography.Title>
                <Space.Compact style={{width: "200px"}}>
                    <Input onChange={(e) => changeDriverId(e.target.value)} />
                    <Button type="primary" onClick={() => FindData()}>
                        Find
                    </Button>
                </Space.Compact>
            </Row>
            <Table columns={columns} dataSource={data} loading={listTripByDrivers.isLoading} />
        </>
    );
};

export default TripByDriversPage;
