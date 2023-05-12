import * as React from "react";
import {Table, FormInstance, Space, Button, Row, Typography} from "antd";
import {DeleteOutlined, EditOutlined} from "@ant-design/icons";
import {ColumnsType} from "antd/es/table";
import {RoutePoint} from "../types";
import routePointsQueries from "../quries/routePointsQueries";
import DrawerForm from "../components/drawerForm";
import RoutePointsForm from "../components/routePointsForm";
import createConfirmPopup from "../utils/createConfirmPopup";

const RoutePointsPage: React.FC = () => {
    const listRoutePoints = routePointsQueries.ListRoutePoints();
    const createRoutePoint = routePointsQueries.CreateRoutePoint();
    const updateRoutePoint = routePointsQueries.UpdateRoutePoint();
    const deleteRoutePoint = routePointsQueries.DeleteRoutePoint();
    const [data, changeData] = React.useState<RoutePoint[]>(listRoutePoints.data || []);
    const [isFormOpen, setFormOpen] = React.useState<boolean>(false);
    const [openedCard, changeOpenedCard] = React.useState<RoutePoint[]>([]);

    const onEdit = async (record: RoutePoint) => {
        changeOpenedCard([record]);
    };

    const onConfirmDelete = async (point: RoutePoint) => {
        try {
            await deleteRoutePoint.mutateAsync(point.place_id);
        } catch (error) {
            console.error("error occurred: ", error);
        }
    };

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
            render: (_, record) => (
                <Row align="middle" justify="space-between">
                    <span>{record.place_name}</span>
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
        changeData(listRoutePoints.data || []);
    }, [listRoutePoints.data]);

    const changeIsCardOpen = (value: boolean) => {
        if (!value) {
            changeOpenedCard([]);
        }
    };

    const uploadCreated = async (value: RoutePoint, form: FormInstance<RoutePoint>) => {
        try {
            await createRoutePoint.mutateAsync(value);
            setFormOpen(false);

            form.resetFields();
        } catch (error) {
            console.error("error occurred: ", error);
        } finally {
        }
    };

    const uploadEdited = async (value: RoutePoint, form: FormInstance<RoutePoint>) => {
        try {
            await updateRoutePoint.mutateAsync(value);
            changeOpenedCard([]);

            form.resetFields();
        } catch (error) {
            console.error("error occurred: ", error);
        } finally {
        }
    };

    const isLoading =
        listRoutePoints.isLoading ||
        listRoutePoints.isFetching ||
        updateRoutePoint.isLoading ||
        deleteRoutePoint.isLoading ||
        createRoutePoint.isLoading;

    return (
        <>
            <Row align="middle" justify="space-between">
                <Typography.Title>Route points</Typography.Title>
                <Button type="primary" onClick={() => setFormOpen(true)} style={{marginTop: 20}}>
                    Create a route point
                </Button>
            </Row>
            <Table columns={columns} dataSource={data} loading={isLoading} />
            <DrawerForm
                title="Edit a route point"
                isFormOpen={Boolean(openedCard.length)}
                changeIsFormOpen={changeIsCardOpen}
                formBody={
                    <RoutePointsForm
                        activeItem={openedCard[0]}
                        onCancel={() => changeOpenedCard([])}
                        onFinish={uploadEdited}
                    />
                }
            />
            <DrawerForm
                title="Create a route point"
                isFormOpen={isFormOpen}
                changeIsFormOpen={setFormOpen}
                formBody={<RoutePointsForm onCancel={() => setFormOpen(false)} onFinish={uploadCreated} />}
            />
        </>
    );
};

export default RoutePointsPage;
