import { useState, useContext } from "react";
import { ReducerContext } from "../use-context/reducer-context.tsx";
import { Card, Col, Row, Modal, Input, Form } from "antd";
import { MdDelete } from "react-icons/md";
import { toast } from "react-toastify";
import moment from "moment";

type CardType = "Humo" | "Uzcard" | "Visa" | null; // Define the CardType

function Cart() {
    const context = useContext(ReducerContext);
    const [open, setOpen] = useState(false);
    const [confirmLoading, setConfirmLoading] = useState(false);
    const [cardType, setCardType] = useState<CardType>(null); // Use CardType here

    const showModal = () => {
        setOpen(true);
    };

    const handleOk = async (values: { value: any }) => {
        try {
            const response = await fetch("https://7d0c8a116a02469c.mokky.dev/category", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    ...values,
                    date: new Date().toISOString(),
                }),
            });

            if (response.ok) {
                toast.success("Payment successful");
                context?.dispatch({ type: "CLEAR_CART" });
            } else {
                toast.error("Payment failed");
            }
        } catch (error) {
            toast.error("An error occurred");
            console.error(error);
        }

        setConfirmLoading(true);
        setTimeout(() => {
            setOpen(false);
            setConfirmLoading(false);
        }, 1000);
        toast.success('Order is successful');
    };

    const clickPay = () => {
        showModal();
    };

    const detectCardType = (cardNumber: string): CardType => {
        if (cardNumber.startsWith("9860")) return "Humo";
        if (cardNumber.startsWith("8600")) return "Uzcard";
        if (cardNumber.startsWith("4") || cardNumber.startsWith("5")) return "Visa";
        return null; // Return null for unrecognized card types
    };

    const handleCardInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value.replace(/\D/g, ""); // Strip non-digit characters
        setCardType(detectCardType(value)); // Detect and set the card type
    };

    return (
        <div className="px-28 py-16">
            <Row gutter={[16, 16]}>
                {context?.state.cart.map((item) => (
                    <Col key={item.id}>
                        <Card
                            className="h-full"
                            cover={
                                <img
                                    src={item.images[0]}
                                    alt={item.title}
                                    className="h-[200px] bg-contain bg-center object-contain"
                                />
                            }
                        >
                            <div key={item.id}>
                                <h1>{item.title}</h1>
                                <h1 className="font-bold">${item.price}</h1>
                                <div className="flex justify-between">
                                    <button
                                        type="button"
                                        className="mt-5 bg-blue-500 px-12 py-1 rounded-md text-white"
                                        onClick={clickPay}
                                    >
                                        Buy
                                    </button>
                                    <button
                                        type="button"
                                        className="mt-5 bg-red-500 px-4 py-2 rounded-md text-white"
                                        onClick={() => context?.dispatch({ type: 'REMOVE_FROM_CART', payload: item.id })}
                                    >
                                        <MdDelete />
                                    </button>
                                </div>
                            </div>
                        </Card>
                    </Col>
                ))}
            </Row>

            <Modal
                title="Личные данные"
                open={open}
                confirmLoading={confirmLoading}
                onCancel={() => setOpen(false)}
                footer={null}
            >
                <Form layout="vertical" onFinish={handleOk}>
                    <Row gutter={16}>
                        <Col span={12}>
                            <Form.Item label="Enter region" name="region" rules={[{ required: true, message: "Введите область" }]}>
                                <Input placeholder="Ташкент" />
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item label="Enter city / region" name="city" rules={[{ required: true, message: "Введите город / район" }]}>
                                <Input placeholder="Яшнобод район" />
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item label="Enter address" name="address" rules={[{ required: true, message: "Введите адрес" }]}>
                                <Input placeholder="ул.Уста Ширин, рынок Джамий, дом 134" />
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item label="Profession" name="profession" rules={[{ required: true, message: "Введите профессию" }]}>
                                <Input placeholder="Директор фирмы" />
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item label="Name of the workplace" name="workplace" rules={[{ required: true, message: "Введите название рабочего места" }]}>
                                <Input placeholder="Теплодом" />
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item label="Salary" name="salary" rules={[{ required: true, message: "Введите зарплату" }]}>
                                <Input placeholder="10 000 000" />
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item label="Card number" name="cardNumber" rules={[{ required: true, message: "Введите номер карты" }, { pattern: /^\d{16}$/, message: "Введите ровно 16 цифр" }]}>
                                <Input
                                    placeholder="8600 3572 9836 1732"
                                    maxLength={16}
                                    onChange={handleCardInputChange}
                                />
                            </Form.Item>
                            {cardType && (
                                <div className="flex items-center mt-2">
                                    {cardType === "Uzcard" && <img src='/uzCard.png' alt="Uzcard" className="mr-2 mt-2 mb-2 w-10 h-6" />}
                                    {cardType === "Humo" && <img src='/humo-card.png' alt="Humo" className="mr-2 mt-2 mb-2 w-10 h-6" />}
                                    {cardType === "Visa" && <img src='/visa-card.png' alt="Visa" className="mr-2 mt-2 mb-2 w-10 h-6" />}
                                    <span>{cardType}</span>
                                </div>
                            )}
                        </Col>
                        <Col span={12}>
                            <Form.Item
                                label="Card validity period"
                                name="expiryDate"
                                rules={[
                                    { required: true, message: "Введите срок действия карты" },
                                    {
                                        validator: (_, value) => {
                                            if (!value || moment(value, "MM YYYY", true).isValid()) {
                                                return Promise.resolve();
                                            }
                                            return Promise.reject("Введите срок в формате MM YYYY");
                                        }
                                    },
                                    {
                                        validator: (_, value) => {
                                            if (!value || moment(value, "MM YYYY").isAfter(moment())) {
                                                return Promise.resolve();
                                            }
                                            return Promise.reject("The date must be in the future");
                                        }
                                    }
                                ]}
                            >
                                <Input placeholder="01 2025" />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Form.Item>
                        <button type="submit" className="w-full bg-blue-500 text-white px-6 py-2 rounded-md">
                            Buy now
                        </button>
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    );
}

export default Cart;
