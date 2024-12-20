import {useEffect, useState} from "react";
import { Card, Col, Row} from "antd";
import {useParams} from "react-router-dom";
import axios from "axios";
import {FaRegHeart} from "react-icons/fa6";
import useReducerContext from "../../hooks/use-reducer-context.tsx";
import useToastify from "../../hooks/use-toasytify.tsx";

function CategoryId() {
    const {slug} = useParams();
    const { dispatch} = useReducerContext()
    const [data, setData] =   useState([]);
    const {toastSuccess} = useToastify()

    useEffect(() => {
        const fetchProductById = async () => {
            try {
                const response = await axios.get(`https://dummyjson.com/products/category/${slug}`);
                setData(response.data.products)
            } catch (error) {
                console.error("Product fetch error:", error);
            }
        };

        fetchProductById();
    }, [slug]);

    return (
        <div className="py-16 px-28 flex flex-wrap gap-3">
            {/*<h1 className="text-2xl">{state.products.length} product(s)</h1>*/}
            <Row gutter={[16, 16]}>
                {data ? data.map((item: Record<string, any>) => (
                    <Col span={6} key={item?.id}>
                        <Card className="w-full object-contain h-full" cover={<img src={item.images[0]} alt="error"
                                                                                   className={"h-[200px] pt-5 object-contain"}/>}>
                            <h1>{item.name}</h1>
                            <span className={'text-[18px]'}>${item.price}</span>
                            <div className={'flex justify-between gap-3'}>
                                <button type="submit"
                                        onClick={() => {
                                            dispatch({
                                                type: 'ADD_TO_CART',
                                                payload: item,
                                            })
                                            toastSuccess("Added the card")
                                        }} className={'mt-5 bg-blue-500 px-10 py-1 rounded-md text-white'}>В корзину</button>
                                <button type="submit" className={'mt-5 bg-yellow-400 px-4 py-1 rounded-md text-white'}
                                        onClick={() => {
                                            dispatch({
                                                type: 'ADD_TO_FAVORITE',
                                                payload: item
                                            })
                                            toastSuccess("Added to favorites")
                                        }}>
                                    <FaRegHeart/>
                                </button>
                            </div>
                        </Card>
                    </Col>
                )) : <div>Loading</div>}
            </Row>
        </div>
    );
}

export default CategoryId;
