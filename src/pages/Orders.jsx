import Card from "../components/Card";
import {useEffect, useState} from "react";
import axios from "axios";

function Orders() {
    const [orders, setOrders] = useState([]);
    useEffect(() => {
        (async () => {
            const { data } = await axios.get(`https://6281c6409fac04c65409389b.mockapi.io/orders`);
        })();
    }, []);
    return (
        <div className={`content p-40`}>
            <div className={`d-flex align-center justify-between mb-40`}>
                <h1>Мои заказы</h1>
            </div>
            <div className={`d-flex flex-wrap`}>
                {
                    [].favorites.map((item, index) => (
                        <Card />
                    ))
                }
            </div>
        </div>
    )
}

export default Orders;