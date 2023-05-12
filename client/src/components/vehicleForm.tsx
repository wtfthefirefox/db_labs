import * as React from "react";
import {useMount} from "react-use";
import {Form, Input, Button, Space, FormInstance} from "antd";
import {Vehicle} from "../types";
import {sleep} from "../utils";

interface Props {
    activeItem?: Vehicle;
    onCancel: () => void;
    onFinish: (values: Vehicle, form: FormInstance<Vehicle>) => Promise<void>;
}

const VehicleForm: React.FC<Props> = (props: Props) => {
    const [form] = Form.useForm<Vehicle>();

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

    const onSubmit = async (values: Vehicle) => {
        await props.onFinish(values, form);
    };

    const onCancel = async () => {
        props.onCancel();

        await sleep(1000);
        form.resetFields();
    };

    return (
        <Form<Vehicle> form={form} onFinish={onSubmit} layout="vertical">
            <Form.Item
                label="vehicle_gov_number"
                name="vehicle_gov_number"
                rules={[{required: true, message: "Field is required"}]}
                validateTrigger="onBlur"
            >
                <Input />
            </Form.Item>
            <Form.Item
                label="vehicle_mark"
                name="vehicle_mark"
                rules={[{required: true, message: "Field is required"}]}
                validateTrigger="onBlur"
            >
                <Input />
            </Form.Item>
            <Form.Item
                label="vehicle_seats_count"
                name="vehicle_seats_count"
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

export default VehicleForm;
