import * as React from "react";
import {useMount} from "react-use";
import {Form, Input, Button, Space, FormInstance} from "antd";
import {Route} from "../types";
import {sleep} from "../utils";

interface Props {
    activeItem?: Route;
    onCancel: () => void;
    onFinish: (values: Route, form: FormInstance<Route>) => Promise<void>;
}

const RoutesForm: React.FC<Props> = (props: Props) => {
    const [form] = Form.useForm<Route>();

    useMount(() => {
        if (props.activeItem) {
            form.setFieldsValue(props.activeItem);
        }
    });

    React.useEffect(() => {
        if (props.activeItem) {
            form.setFieldsValue(props.activeItem);
        }
    }, [props.activeItem]);

    const onSubmit = async (values: Route) => {
        await props.onFinish(values, form);
    };

    const onCancel = async () => {
        props.onCancel();

        await sleep(1000);
        form.resetFields();
    };

    return (
        <Form<Route> form={form} onFinish={onSubmit} layout="vertical">
            <Form.Item
                label="route_id"
                name="route_id"
                rules={[{required: true, message: "Field is required"}]}
                validateTrigger="onBlur"
            >
                <Input />
            </Form.Item>
            <Form.Item
                label="route_start_point"
                name="route_start_point"
                rules={[{required: true, message: "Field is required"}]}
                validateTrigger="onBlur"
            >
                <Input />
            </Form.Item>
            <Form.Item
                label="route_end_point"
                name="route_end_point"
                rules={[{required: true, message: "Field is required"}]}
                validateTrigger="onBlur"
            >
                <Input />
            </Form.Item>
            <Form.Item
                label="route_time_start"
                name="route_time_start"
                rules={[{required: true, message: "Field is required"}]}
                validateTrigger="onBlur"
            >
                <Input />
            </Form.Item>
            <Form.Item
                label="route_duration"
                name="route_duration"
                rules={[{required: true, message: "Field is required"}]}
                validateTrigger="onBlur"
            >
                <Input />
            </Form.Item>
            <Form.Item
                label="route_period"
                name="route_period"
                rules={[{required: true, message: "Field is required"}]}
                validateTrigger="onBlur"
            >
                <Input />
            </Form.Item>
            <Form.Item
                label="route_price"
                name="route_price"
                rules={[{required: true, message: "Field is required"}]}
                validateTrigger="onBlur"
            >
                <Input />
            </Form.Item>
            <Space>
                <Button
                    type="primary"
                    htmlType="submit"
                >
                    Save
                </Button>
                <Button danger onClick={onCancel}>
                    Cancel
                </Button>
            </Space>
        </Form>
    );
};

export default RoutesForm;
