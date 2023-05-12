import * as React from "react";
import {Table, FormInstance, Space, Button, Row, Typography} from "antd";
import {DeleteOutlined, EditOutlined} from "@ant-design/icons";
import {ColumnsType} from "antd/es/table";
import driverQueries from "../quries/driverQueries";
import {Driver} from "../types";
import DrawerForm from "../components/drawerForm";
import DriverForm from "../components/driversForm";
import createConfirmPopup from "../utils/createConfirmPopup";

const DriversPage: React.FC = () => {
    const listDrivers = driverQueries.ListDrivers();
    const createDriver = driverQueries.CreateDriver();
    const updateDriver = driverQueries.UpdateDriver();
    const deleteDriver = driverQueries.DeleteDriver();
    const [data, changeData] = React.useState<Driver[]>(listDrivers.data || []);
    const [isFormOpen, setFormOpen] = React.useState<boolean>(false);
    const [openedCard, changeOpenedCard] = React.useState<Driver[]>([]);

    const onEdit = async (record: Driver) => {
        changeOpenedCard([record]);
    };

    const onConfirmDeleteDriver = async (driver: Driver) => {
        try {
            await deleteDriver.mutateAsync(driver.driver_id);
        } catch (error) {
            console.error("error occurred: ", error);
        }
    };

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
            render: (_, record) => (
                <Row align="middle" justify="space-between">
                    <span>{record.driver_car_number}</span>
                    <Space>
                        <Button type="text" icon={<EditOutlined />} onClick={() => onEdit(record)} />
                        <Button
                            type="text"
                            danger
                            icon={<DeleteOutlined />}
                            onClick={() =>
                                createConfirmPopup(
                                    "Delete the store",
                                    <span>Are you sure to delete this driver?</span>,
                                    () => onConfirmDeleteDriver(record)
                                )
                            }
                        />
                    </Space>
                </Row>
            )
        }
    ];

    React.useEffect(() => {
        changeData(listDrivers.data || []);
    }, [listDrivers.data]);

    const changeIsCardOpen = (value: boolean) => {
        if (!value) {
            changeOpenedCard([]);
        }
    };

    const uploadCreatedDriver = async (value: Driver, form: FormInstance<Driver>) => {
        try {
            await createDriver.mutateAsync(value);
            setFormOpen(false);

            form.resetFields();
        } catch (error) {
            console.error("error occurred: ", error);
        } finally {
        }
    };

    const uploadEditedDriver = async (value: Driver, form: FormInstance<Driver>) => {
        try {
            await updateDriver.mutateAsync(value);
            changeOpenedCard([]);

            form.resetFields();
        } catch (error) {
            console.error("error occurred: ", error);
        } finally {
        }
    };

    const isLoading =
        listDrivers.isLoading ||
        listDrivers.isFetching ||
        updateDriver.isLoading ||
        deleteDriver.isLoading ||
        createDriver.isLoading;

    return (
        <>
            <Row align="middle" justify="space-between">
                <Typography.Title>Drivers</Typography.Title>
                <Button type="primary" onClick={() => setFormOpen(true)} style={{marginTop: 20}}>
                    Create a driver
                </Button>
            </Row>

            <Table columns={columns} dataSource={data} loading={isLoading} />
            <DrawerForm
                title="Edit a driver"
                isFormOpen={Boolean(openedCard.length)}
                changeIsFormOpen={changeIsCardOpen}
                formBody={<DriverForm activeDriver={openedCard[0]} onCancel={() => changeOpenedCard([])} onFinish={uploadEditedDriver} />}
            />
            <DrawerForm
                title="Create a driver"
                isFormOpen={isFormOpen}
                changeIsFormOpen={setFormOpen}
                formBody={<DriverForm onCancel={() => setFormOpen(false)} onFinish={uploadCreatedDriver} />}
            />
        </>
    );
};

export default DriversPage;
