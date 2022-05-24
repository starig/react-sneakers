import React from 'react';
import Card from "../components/Card";
import {useEffect, useState} from "react";
import axios from "axios";

function Orders() {
    const [orders, setOrders] = useState(   []);
    const [isLoading, setIsLoading] = useState(   false);
    useEffect(() => {
        setIsLoading(true);
        (async () => {
            try {
                const { data } = await axios.get(`https://6281c6409fac04c65409389b.mockapi.io/orders`);
                setOrders(data.reduce((prev, obj) => [...prev, ...obj.items], []));
            } catch (error) {
                console.error(error);
            }
            setIsLoading(false);
        })();
    }, []);
    return (
        <div className={`content p-40`}>
            <div className={`d-flex align-center justify-between mb-40`}>
                <h1>Мои заказы</h1>
            </div>
            <div className={`d-flex flex-wrap`}>
                {
                    (isLoading ? [...Array(8)] : orders).map((item, index) => (
                        <Card
                            key={index}
                            loading={isLoading}
                            {...item}
                        />
                    ))
                }
            </div>
        </div>
    )
}

export default Orders;