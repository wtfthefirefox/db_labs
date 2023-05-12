import * as React from "react";
import {Table, FormInstance, Space, Button, Row, Typography} from "antd";
import {DeleteOutlined, EditOutlined} from "@ant-design/icons";
import {ColumnsType} from "antd/es/table";
import {Route} from "../types";
import routeQueries from "../quries/routesQueries";
import createConfirmPopup from "../utils/createConfirmPopup";
import DrawerForm from "../components/drawerForm";
import RoutesForm from "../components/routesForm";

const RoutesPage: React.FC = () => {
    const listRoutes = routeQueries.ListRoutes();
    const createRoute = routeQueries.CreateRoute();
    const updateRoute = routeQueries.UpdateRoute();
    const deleteRoute = routeQueries.DeleteRoute();
    const [data, changeData] = React.useState<Route[]>(listRoutes.data || []);
    const [isFormOpen, setFormOpen] = React.useState<boolean>(false);
    const [openedCard, changeOpenedCard] = React.useState<Route[]>([]);

    const onEdit = async (record: Route) => {
        changeOpenedCard([record]);
    };

    const onConfirmDelete = async (point: Route) => {
        try {
            await deleteRoute.mutateAsync(point.route_id.toString());
        } catch (error) {
            console.error("error occurred: ", error);
        }
    };

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
            render: (_, record) => (
                <Row align="middle" justify="space-between">
                    <span>{record.route_price}</span>
                    <Space>
                        <Button type="text" icon={<EditOutlined />} onClick={() => onEdit(record)} />
                        <Button
                            type="text"
                            danger
                            icon={<DeleteOutlined />}
                            onClick={() =>
                                createConfirmPopup(
                                    "Delete the route",
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
        changeData(listRoutes.data || []);
    }, [listRoutes.data]);

    const changeIsCardOpen = (value: boolean) => {
        if (!value) {
            changeOpenedCard([]);
        }
    };

    const uploadCreated = async (value: Route, form: FormInstance<Route>) => {
        try {
            await createRoute.mutateAsync(value);
            setFormOpen(false);

            form.resetFields();
        } catch (error) {
            console.error("error occurred: ", error);
        } finally {
        }
    };

    const uploadEdited = async (value: Route, form: FormInstance<Route>) => {
        try {
            await updateRoute.mutateAsync(value);
            changeOpenedCard([]);

            form.resetFields();
        } catch (error) {
            console.error("error occurred: ", error);
        } finally {
        }
    };

    const isLoading =
        listRoutes.isLoading ||
        listRoutes.isFetching ||
        updateRoute.isLoading ||
        deleteRoute.isLoading ||
        createRoute.isLoading;

    return (
        <>
            <Row align="middle" justify="space-between">
                <Typography.Title>Routes</Typography.Title>
                <Button type="primary" onClick={() => setFormOpen(true)} style={{marginTop: 20}}>
                    Create a route
                </Button>
            </Row>
            <Table columns={columns} dataSource={data} loading={isLoading} />
            <DrawerForm
                title="Edit a trip"
                isFormOpen={Boolean(openedCard.length)}
                changeIsFormOpen={changeIsCardOpen}
                formBody={
                    <RoutesForm
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
                formBody={<RoutesForm onCancel={() => setFormOpen(false)} onFinish={uploadCreated} />}
            />
        </>
    );
};

export default RoutesPage;
