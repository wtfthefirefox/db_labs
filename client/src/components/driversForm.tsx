import * as React from "react";
import {useMount} from "react-use";
import {Form, Input, Button, Space, FormInstance} from "antd";
import {Driver} from "../types";
import {sleep} from "../utils";

interface Props {
    activeDriver?: Driver;
    onCancel: () => void;
    onFinish: (values: Driver, form: FormInstance<Driver>) => Promise<void>;
}

const DriverForm: React.FC<Props> = (props: Props) => {
    const [form] = Form.useForm<Driver>();

    useMount(() => {
        if (props.activeDriver) {
            form.setFieldsValue(props.activeDriver);
        }
    });

    React.useEffect(() => {
        if (props.activeDriver) {
            form.setFieldsValue(props.activeDriver);
        }
    }, [props.activeDriver]);

    const onSubmit = async (values: Driver) => {
        await props.onFinish(values, form);
    };

    const onCancel = async () => {
        props.onCancel();

        await sleep(1000);
        form.resetFields();
    };

    return (
        <Form<Driver> form={form} onFinish={onSubmit} layout="vertical">
            <Form.Item
                label="driver_id"
                name="driver_id"
                rules={[{required: true, message: "Field is required"}]}
                validateTrigger="onBlur"
            >
                <Input />
            </Form.Item>
            <Form.Item
                label="driver_last_name"
                name="driver_last_name"
                rules={[{required: true, message: "Field is required"}]}
                validateTrigger="onBlur"
            >
                <Input />
            </Form.Item>
            <Form.Item
                label="driver_name"
                name="driver_name"
                rules={[{required: true, message: "Field is required"}]}
                validateTrigger="onBlur"
            >
                <Input />
            </Form.Item>
            <Form.Item
                label="driver_surname"
                name="driver_surname"
                rules={[{required: true, message: "Field is required"}]}
                validateTrigger="onBlur"
            >
                <Input />
            </Form.Item>
            <Form.Item
                label="driver_class"
                name="driver_class"
                rules={[{required: true, message: "Field is required"}]}
                validateTrigger="onBlur"
            >
                <Input />
            </Form.Item>
            <Form.Item
                label="driver_car_number"
                name="driver_car_number"
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

export default DriverForm;
