import * as React from "react";
import {Table, FormInstance, Space, Button, Row, Typography} from "antd";
import {DeleteOutlined, EditOutlined} from "@ant-design/icons";
import {ColumnsType} from "antd/es/table";
import {Vehicle} from "../types";
import vehicleQueries from "../quries/vehicleQueries";
import createConfirmPopup from "../utils/createConfirmPopup";
import DrawerForm from "../components/drawerForm";
import VehicleForm from "../components/vehicleForm";

const VehiclesPage: React.FC = () => {
    const listVehicles = vehicleQueries.ListVehicles();
    const createVehicle = vehicleQueries.CreateVehicle();
    const updateVehicle = vehicleQueries.UpdateVehicle();
    const deleteVehicle = vehicleQueries.DeleteVehicle();
    const [data, changeData] = React.useState<Vehicle[]>(listVehicles.data || []);
    const [isFormOpen, setFormOpen] = React.useState<boolean>(false);
    const [openedCard, changeOpenedCard] = React.useState<Vehicle[]>([]);

    const onEdit = async (record: Vehicle) => {
        changeOpenedCard([record]);
    };

    const onConfirmDelete = async (item: Vehicle) => {
        try {
            await deleteVehicle.mutateAsync(item.vehicle_gov_number);
        } catch (error) {
            console.error("error occurred: ", error);
        }
    };

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
            render: (_, record) => (
                <Row align="middle" justify="space-between">
                    <span>{record.vehicle_seats_count}</span>
                    <Space>
                        <Button type="text" icon={<EditOutlined />} onClick={() => onEdit(record)} />
                        <Button
                            type="text"
                            danger
                            icon={<DeleteOutlined />}
                            onClick={() =>
                                createConfirmPopup(
                                    "Delete the store",
                                    <span>Are you sure to delete this vehicle?</span>,
                                    () => onConfirmDelete(record)
                                )
                            }
                        />
                    </Space>
                </Row>
            )
        }
    ];

    React.useEffect(() => {
        changeData(listVehicles.data || []);
    }, [listVehicles.data]);

    const changeIsCardOpen = (value: boolean) => {
        if (!value) {
            changeOpenedCard([]);
        }
    };

    const uploadCreated = async (value: Vehicle, form: FormInstance<Vehicle>) => {
        try {
            await createVehicle.mutateAsync(value);
            setFormOpen(false);

            form.resetFields();
        } catch (error) {
            console.error("error occurred: ", error);
        } finally {
        }
    };

    const uploadEdited = async (value: Vehicle, form: FormInstance<Vehicle>) => {
        try {
            await updateVehicle.mutateAsync(value);
            changeOpenedCard([]);

            form.resetFields();
        } catch (error) {
            console.error("error occurred: ", error);
        } finally {
        }
    };

    const isLoading =
        listVehicles.isLoading ||
        listVehicles.isFetching ||
        updateVehicle.isLoading ||
        deleteVehicle.isLoading ||
        createVehicle.isLoading;

    return (
        <>
            <Row align="middle" justify="space-between">
                <Typography.Title>Vehicles</Typography.Title>
                <Button type="primary" onClick={() => setFormOpen(true)} style={{marginTop: 20}}>
                    Create a vehicle
                </Button>
            </Row>
            <Table columns={columns} dataSource={data} loading={isLoading} />
            <DrawerForm
                title="Edit a vehicle"
                isFormOpen={Boolean(openedCard.length)}
                changeIsFormOpen={changeIsCardOpen}
                formBody={
                    <VehicleForm
                        activeItem={openedCard[0]}
                        onCancel={() => changeOpenedCard([])}
                        onFinish={uploadEdited}
                    />
                }
            />
            <DrawerForm
                title="Create a vehicle"
                isFormOpen={isFormOpen}
                changeIsFormOpen={setFormOpen}
                formBody={<VehicleForm onCancel={() => setFormOpen(false)} onFinish={uploadCreated} />}
            />
        </>
    );
};

export default VehiclesPage;
