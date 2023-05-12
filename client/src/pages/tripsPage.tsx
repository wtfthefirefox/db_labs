import * as React from "react";
import {Table, FormInstance, Space, Button, Row, Typography} from "antd";
import {DeleteOutlined, EditOutlined} from "@ant-design/icons";
import {ColumnsType} from "antd/es/table";
import {Trip} from "../types";
import tripsQueries from "../quries/tripsQueries";
import createConfirmPopup from "../utils/createConfirmPopup";
import DrawerForm from "../components/drawerForm";
import TripsForm from "../components/tripsForm";

const TripsPage: React.FC = () => {
    const listTrips = tripsQueries.ListTrips();
    const createTrip = tripsQueries.CreateTrip();
    const updateTrip = tripsQueries.UpdateTrip();
    const deleteTrip = tripsQueries.DeleteTrip();
    const [data, changeData] = React.useState<Trip[]>(listTrips.data || []);
    const [isFormOpen, setFormOpen] = React.useState<boolean>(false);
    const [openedCard, changeOpenedCard] = React.useState<Trip[]>([]);

    const onEdit = async (record: Trip) => {
        changeOpenedCard([record]);
    };

    const onConfirmDelete = async (point: Trip) => {
        try {
            await deleteTrip.mutateAsync((point.trip_list_id).toString());
        } catch (error) {
            console.error("error occurred: ", error);
        }
    };

    const columns: ColumnsType<Trip> = [
        {
            title: "trip_list_id",
            dataIndex: "trip_list_id",
            key: "trip_list_id",
            render: (_, record) => <span>{record.trip_list_id}</span>
        },
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
            render: (_, record) => (
                <Row align="middle" justify="space-between">
                    <span>{record.trip_tickets_count}</span>
                    <Space>
                        <Button type="text" icon={<EditOutlined />} onClick={() => onEdit(record)} />
                        <Button
                            type="text"
                            danger
                            icon={<DeleteOutlined />}
                            onClick={() =>
                                createConfirmPopup(
                                    "Delete the store",
                                    <span>Are you sure to delete this point?</span>,
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
        changeData(listTrips.data || []);
    }, [listTrips.data]);

    const changeIsCardOpen = (value: boolean) => {
        if (!value) {
            changeOpenedCard([]);
        }
    };

    const uploadCreated = async (value: Trip, form: FormInstance<Trip>) => {
        try {
            await createTrip.mutateAsync(value);
            setFormOpen(false);

            form.resetFields();
        } catch (error) {
            console.error("error occurred: ", error);
        } finally {
        }
    };

    const uploadEdited = async (value: Trip, form: FormInstance<Trip>) => {
        try {
            await updateTrip.mutateAsync(value);
            changeOpenedCard([]);

            form.resetFields();
        } catch (error) {
            console.error("error occurred: ", error);
        } finally {
        }
    };

    const isLoading =
        listTrips.isLoading ||
        listTrips.isFetching ||
        updateTrip.isLoading ||
        deleteTrip.isLoading ||
        createTrip.isLoading;

    return (
        <>
            <Row align="middle" justify="space-between">
                <Typography.Title>Trips</Typography.Title>
                <Button type="primary" onClick={() => setFormOpen(true)} style={{marginTop: 20}}>
                    Create a trip
                </Button>
            </Row>
            <Table columns={columns} dataSource={data} loading={isLoading} />
            <DrawerForm
                title="Edit a trip"
                isFormOpen={Boolean(openedCard.length)}
                changeIsFormOpen={changeIsCardOpen}
                formBody={
                    <TripsForm
                        activeItem={openedCard[0]}
                        onCancel={() => changeOpenedCard([])}
                        onFinish={uploadEdited}
                    />
                }
            />
            <DrawerForm
                title="Create a trip"
                isFormOpen={isFormOpen}
                changeIsFormOpen={setFormOpen}
                formBody={<TripsForm onCancel={() => setFormOpen(false)} onFinish={uploadCreated} />}
            />
        </>
    );
};

export default TripsPage;
