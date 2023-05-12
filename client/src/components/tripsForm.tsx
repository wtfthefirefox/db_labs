import * as React from "react";
import {useMount} from "react-use";
import {Form, Input, Button, Space, FormInstance} from "antd";
import {Trip} from "../types";
import {sleep} from "../utils";

interface Props {
    activeItem?: Trip;
    onCancel: () => void;
    onFinish: (values: Trip, form: FormInstance<Trip>) => Promise<void>;
}

const TripsForm: React.FC<Props> = (props: Props) => {
    const [form] = Form.useForm<Trip>();

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

    const onSubmit = async (values: Trip) => {
        await props.onFinish(values, form);
    };

    const onCancel = async () => {
        props.onCancel();

        await sleep(1000);
        form.resetFields();
    };

    return (
        <Form<Trip> form={form} onFinish={onSubmit} layout="vertical">
            <Form.Item
                label="trip_list_id"
                name="trip_list_id"
                rules={[{required: true, message: "Field is required"}]}
                validateTrigger="onBlur"
            >
                <Input />
            </Form.Item>
            <Form.Item
                label="trip_id"
                name="trip_id"
                rules={[{required: true, message: "Field is required"}]}
                validateTrigger="onBlur"
            >
                <Input />
            </Form.Item>
            <Form.Item
                label="trip_date"
                name="trip_date"
                rules={[{required: true, message: "Field is required"}]}
                validateTrigger="onBlur"
            >
                <Input />
            </Form.Item>
            <Form.Item
                label="trip_driver"
                name="trip_driver"
                rules={[{required: true, message: "Field is required"}]}
                validateTrigger="onBlur"
            >
                <Input />
            </Form.Item>
            <Form.Item
                label="trip_tickets_count"
                name="trip_tickets_count"
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

export default TripsForm;
