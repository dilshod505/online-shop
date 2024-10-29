import useReducerContext from "../../hooks/use-reducer-context.tsx";
import {Card, Col, Row, Typography} from "antd";
import {Link} from "react-router-dom";

function Categories() {
    const {state} = useReducerContext();

    return (
        <div className={'px-28 mb-10'}>
            <Typography.Title level={2} className={'text-5xl py-5'}>All Categories</Typography.Title>
            {state?.categories.length > 0 && (
                <div className={'flex flex-wrap gap-3'}>
                    <Row gutter={[16, 16]}>
                        {state?.categories.map((category: any) => (
                            <Col key={category.id} span={6}>
                                <Link to={`/categories/${category.slug}`}>
                                    <Card cover={
                                        <img src={`https://picsum.photos/300/300?random${category.id}`}
                                             alt={category.name}
                                             className={'w-full  object-contain'}/>
                                    }>
                                        <Card.Meta title={category.name} description={category.description}/>
                                    </Card>
                                </Link>
                            </Col>
                        ))}
                    </Row>
                </div>
            )}
        </div>
    );
}

export default Categories;