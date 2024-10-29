import {Badge, Button, Form, FormProps, Input, Modal} from "antd";
import {FaShoppingCart} from "react-icons/fa";
import {FaRegHeart} from "react-icons/fa6";
import {useContext, useState} from "react";
import {Link} from "react-router-dom";
import {ReducerContext} from "../use-context/reducer-context.tsx";
import {toast} from "react-toastify";

type FieldType = {
    username?: string;
    password?: string;
};

const onFinish: FormProps<FieldType>['onFinish'] = (values) => {
    console.log('Success:', values);
};

const onFinishFailed: FormProps<FieldType>['onFinishFailed'] = (errorInfo) => {
    console.log('Failed:', errorInfo);
};

function MainHeader() {
    const context = useContext(ReducerContext)
    const favouriteCount = context?.state.favourites.length || 0;
    const cardCount = context?.state.cart.length || 0;
    const [activeButton, setActiveButton] = useState<number | null>(null);
    const [open, setOpen] = useState(false);
    const [confirmLoading, setConfirmLoading] = useState(false);
    const [, setModalText] = useState('Content of the modal');

    const showModal = () => {
        setOpen(true);
    };

    const handleOk = () => {
        setModalText('The modal will be closed after two seconds');
        setConfirmLoading(true);
        setTimeout(() => {
            setOpen(false);
            setConfirmLoading(false);
        }, 1000);
        toast('Success');
    };

    const handleCancel = () => {
        console.log('Clicked cancel button');
        setOpen(false);
    };


    const handleClick = (button: number): void => {
        setActiveButton(button);
    };

    const buttons = [
        {id: 1, label: 'Products on sale', link: '/products'},
        {id: 2, label: 'New products', link: '/new'},
        {id: 3, label: 'For suppliers', link: '/suppliers'},
        {id: 4, label: 'Contacts', link: '/products'},
        {id: 6, label: 'Account', link: '/products'},
    ];

    // style={{background: "rgba(0,0,0,0.3)", backdropFilter: "blur(15px)"}}
    // className={`w-[100%] text-white fixed top-0 z-50 transition-all duration-300`}

    return (
        <header style={{background: 'rgba(0,0,0,1,3)', backdropFilter: "blur(15px)"}}
                className={'w-full sticky top-0 z-50'}>
            <div className={'flex items-center justify-between py-5 px-28'}>
                <div className={'flex items-center space-x-3'}>
                    <Link to={'/'}>
                        <img src="/header-logo.svg" alt="" width={50}/>
                    </Link>
                    <div className={'max-h-[500px]'}>
                        <h1 className={'font-bold text-orange-500'}>TEPLODOM</h1>
                        <p className={'text-sm'}>Интернет магазин <br/> строй материалов</p>
                    </div>
                </div>
                <div>
                    <Input.Search
                        placeholder="Поиск..."
                        allowClear
                        className="w-[350px]"
                    />
                </div>
                <div className={'flex items-center space-x-3'}>
                    <Link to={'/favourites'}>
                        <Badge count={favouriteCount}>
                            <div
                                className={'flex items-center space-x-3 bg-white rounded-full px-3 py-3 shadow-md cursor-pointer'}>
                                <FaRegHeart size={20}/>
                            </div>
                        </Badge>
                    </Link>
                    <div>
                        <Link to={'/cart'}>
                            <Badge count={cardCount}>
                                <div
                                    className={'flex items-center space-x-3 bg-white rounded-full px-3 py-3 shadow-md cursor-pointer'}>
                                    <button>
                                        <FaShoppingCart size={20}/>
                                    </button>
                                </div>
                            </Badge>
                        </Link>
                    </div>
                </div>
                <div>
                    <div>
                        <Button type="primary" className={'py-5 px-5'} onClick={showModal}>Login</Button>
                        <Modal
                            title="Login"
                            open={open}
                            onOk={handleOk}
                            confirmLoading={confirmLoading}
                            onCancel={handleCancel}
                        >
                            <Form
                                name="basic"
                                labelCol={{span: 8}}
                                wrapperCol={{span: 16}}
                                style={{maxWidth: 600}}
                                initialValues={{remember: true}}
                                onFinish={onFinish}
                                onFinishFailed={onFinishFailed}
                                autoComplete="off"
                            >
                                <Form.Item<FieldType>
                                    label="Username"
                                    name="username"
                                    rules={[{required: true, message: 'Please input your username!'}]}
                                >
                                    <Input/>
                                </Form.Item>

                                <Form.Item<FieldType>
                                    label="Password"
                                    name="password"
                                    rules={[{required: true, message: 'Please input your password!'}]}
                                >
                                    <Input.Password/>
                                </Form.Item>
                            </Form>
                        </Modal>
                    </div>
                </div>
            </div>
            <div className={'flex items-center justify-between px-28'}>
                <div
                    className={`flex items-center justify-between space-x-20 font-semibold text-black uppercase w-full py-5 cursor-pointer`}>
                    {buttons.map(button => (
                        <Link to={button.link} key={button.id}>
                            <div
                                key={button.id}
                                className={`rounded-md px-2 py-1 cursor-pointer ${activeButton === button.id ? 'bg-orange-500' : 'bg-gray-100'}`}
                                onClick={() => handleClick(button.id)}
                            >
                                <span className={'text-sm'}>{button.label}</span>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </header>
    );
}

export default MainHeader;