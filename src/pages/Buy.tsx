import { useState } from "react";
import { Button, Modal, Input, Form, Row, Col } from "antd";

function ShowModal() {
    const [open, setOpen] = useState(false);
    const [confirmLoading, setConfirmLoading] = useState(false);

    const showModal = () => {
        setOpen(true);
    };

    const handleOk = () => {
        setConfirmLoading(true);
        setTimeout(() => {
            setOpen(false);
            setConfirmLoading(false);
        }, 2000);
    };

    const handleCancel = () => {
        setOpen(false);
    };

    return (
        <div>
            <Button type="primary" onClick={showModal}>
                Open Modal
            </Button>
            <Modal
                title="Личные данные"
                open={open}
                onOk={handleOk}
                confirmLoading={confirmLoading}
                onCancel={handleCancel}
                okText="Оформить заказ"
                cancelText="Отмена"
            >
                <Form layout="vertical">
                    <Row gutter={16}>
                        <Col span={12}>
                            <Form.Item label="Введите область">
                                <Input placeholder="Ташкент" />
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item label="Введите город / район">
                                <Input placeholder="Яшнобод район" />
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item label="Введите адрес">
                                <Input placeholder="ул.Уста Ширин, рынок Джамий, дом 134" />
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item label="Профессия">
                                <Input placeholder="Директор фирмы" />
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item label="Название рабочего места">
                                <Input placeholder="Теплодом" />
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item label="Зарплата">
                                <Input placeholder="10 000 000" />
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item label="Номер карты">
                                <Input placeholder="8600 3572 9836 1732" />
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item label="Срок действия карты">
                                <Input placeholder="01 2022" />
                            </Form.Item>
                        </Col>
                    </Row>
                </Form>
            </Modal>
        </div>
    );
}

export default ShowModal;
