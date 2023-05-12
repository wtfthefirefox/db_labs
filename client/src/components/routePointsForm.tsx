import * as React from "react";
import {useMount} from "react-use";
import {Form, Input, Button, Space, FormInstance} from "antd";
import {RoutePoint} from "../types";
import {sleep} from "../utils";

interface Props {
    activeItem?: RoutePoint;
    onCancel: () => void;
    onFinish: (values: RoutePoint, form: FormInstance<RoutePoint>) => Promise<void>;
}

const RoutePointsForm: React.FC<Props> = (props: Props) => {
    const [form] = Form.useForm<RoutePoint>();

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

    const onSubmit = async (values: RoutePoint) => {
        await props.onFinish(values, form);
    };

    const onCancel = async () => {
        props.onCancel();

        await sleep(1000);
        form.resetFields();
    };

    return (
        <Form<RoutePoint> form={form} onFinish={onSubmit} layout="vertical">
            <Form.Item
                label="place_id"
                name="place_id"
                rules={[{required: true, message: "Field is required"}]}
                validateTrigger="onBlur"
            >
                <Input />
            </Form.Item>
            <Form.Item
                label="place_name"
                name="place_name"
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

export default RoutePointsForm;
