import {ReducerContext} from "../use-context/reducer-context.tsx";
import {useContext} from "react";
import {Button, Card, Col, Row} from "antd";
import {MdDelete} from "react-icons/md";

function Cart() {
    const context = useContext(ReducerContext);

    return (
        <div className={'px-28 py-16'}>
            <Row gutter={[16, 16]}>
                {context?.state.cart.map((item: any) => (
                    <Col key={item.id}>
                        <Card className={"h-full"} cover={
                            <img src={item.images[0]} alt={item.title}
                                 className={'h-[200px] bg-contain bg-center object-contain'}/>
                        }>
                            <div key={item.id}>
                                <h1>{item.title}</h1>
                                <h1 className={'font-bold'}>${item.price}</h1>
                                <div className={'flex justify-between'}>
                                    <Button type="primary" className={'mt-5 bg-amber-500'}>Купить</Button>
                                    <Button type="primary" className={'mt-5 bg-red-500'} onClick={() => context?.dispatch({type: 'REMOVE_FROM_CART', payload: item.id})}><MdDelete/></Button>
                                </div>
                            </div>
                        </Card>
                    </Col>
                ))}
            </Row>
        </div>
    );
}

export default Cart;