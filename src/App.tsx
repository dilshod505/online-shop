import './App.css'
import {useContext} from "react";
import {Button, Card, Col, Row} from "antd";
import {FaRegHeart} from "react-icons/fa6";
import {ReducerContext} from "./use-context/reducer-context.tsx";
import {Link} from "react-router-dom";
import useToastify from "./hooks/use-toasytify.tsx";

function App() {
    const context = useContext(ReducerContext);
    const {toastSuccess} = useToastify()

    return (
        <>
            <div className={"px-28"}>
                <div className={"flex items-center justify-between bg text-white px-28 py-10 rounded-xl"}>
                    <div className={'max-w-[600px]'}>
                        <h1 className={'text-5xl font-bold'}>
                            Пеноплекс Основа
                        </h1>
                        <span className={"text-gray-500"}>
                            Пеноплэкс» — российская компания, производитель тепло- и гидроизоляционных, а также декоративно-отделочных материалов на основе полимеров, основной вид продукции — теплоизоляционные плиты из экструзионного пенополистирола
                        </span>
                    </div>
                    <div>
                        <img src="/bg-picture.png" alt="" className={'w-full'} height={300}/>
                    </div>
                </div>
                <div className={'py-12'}>
                    <div className={'flex items-center justify-between w-full'}>
                        <h1 className={'text-2xl font-bold'}>Category</h1>
                        <Link to={'/categories'}>
                            <Button type={'link'}>
                                View all
                            </Button>
                        </Link>
                    </div>
                    <Row gutter={[16, 16]}>
                        {context?.state.categories.slice(0, 6).map((category: Record<string, any>) => (
                            <Col key={category.id} span={4}>
                                <Card cover={
                                    <img src={`https://picsum.photos/300/300?random${category.id}`}
                                         alt={category.name}
                                         className={'w-full  object-contain mt-5'}/>
                                }>
                                    <Card.Meta title={category.name} description={category.description}/>
                                </Card>
                            </Col>
                        ))}
                    </Row>
                </div>
                <Row gutter={[16, 16]}>
                    {context?.state.products.map(
                        (product: Record<string, any>) => (
                            <Col key={product.id} span={6}>
                                <Card className={"h-full"} cover={
                                    <img src={product.images[0]} alt={product.title}
                                         className={'h-[200px] bg-contain bg-center object-contain'}/>
                                }>
                                    <Card.Meta title={product.title} description={product.description}/>
                                    <div className={'flex justify-between gap-3'}>
                                        <Button type="primary"
                                                onClick={() => {
                                                    context?.dispatch({
                                                        type: 'ADD_TO_CART',
                                                        payload: product,
                                                    })
                                                    toastSuccess("Added the card")
                                                }}
                                                className={'mt-10 bg-amber-500 w-full'}>В
                                            корзину</Button>
                                        <Button type="primary" className={'mt-10 bg-amber-500'}
                                                onClick={() => {
                                                    context?.dispatch({
                                                        type: 'ADD_TO_FAVORITE',
                                                        payload: product
                                                    })
                                                    toastSuccess("Added to favorites")
                                                }}>
                                            <FaRegHeart/>
                                        </Button>
                                    </div>
                                </Card>
                            </Col>
                        )
                    )}
                </Row>
            </div>
        </>
    )
}

export default App
