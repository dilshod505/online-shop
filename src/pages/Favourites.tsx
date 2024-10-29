import {ReducerContext} from "../use-context/reducer-context.tsx";
import {useContext} from "react";
import {Button, Card, Col, Row} from "antd";
import {MdDelete} from "react-icons/md";

function Favourites() {
    const context = useContext(ReducerContext);

    return (
        <div className={'px-28 py-16'}>
            <Row gutter={[16, 16]}>
                {context?.state.favourites.map(
                    (product: Record<string, any>) => (
                        <div key={product.id}>
                            <Col>
                                <Card className={"h-full"} cover={<img src={product.images[0]} alt=""
                                                                       className={'h-[200px] bg-contain bg-center object-contain'}/>}>
                                    <h1>{product.title}</h1>
                                    <h1 className={'font-bold'}>${product.price}</h1>
                                    <div className={'flex justify-between gap-8'}>
                                        <Button type="primary" className={'mt-5 bg-amber-500'}>Купить</Button>
                                        <Button type="primary" className={'mt-5 bg-red-500'} onClick={() => context?.dispatch({type:'REMOVE_FROM_FAVORITE', payload: product.id})}><MdDelete/></Button>
                                    </div>
                                </Card>
                            </Col>
                        </div>
                    )
                )}
            </Row>
        </div>
    );
}

export default Favourites;