import styles from './Drawer.module.scss';
import Info from "../Info";
import { useState} from "react";
import React from "react";
import axios from "axios";
import {useCart} from "../../hooks/useCart";

const delay = (ms) => new Promise((resolve, reject) => setTimeout(resolve, ms));

function Drawer({onClose, items = [], onRemove}) {
    const { cartItems, setCartItems, totalPrice} = useCart();
    const [isOrderCompleted, setIsOrderCompleted] = useState(false);
    const [orderId, setOrderId] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const onClickOrder = async () => {
        try{
            setIsLoading(true);
            const { data } = await axios.post('https://6281c6409fac04c65409389b.mockapi.io/orders', {
                items: cartItems,
            });
            setOrderId(data.id);
            setIsOrderCompleted(true);
            setCartItems([]);

            for (let i = 0; i < cartItems.length; i++) {
                const item = cartItems[i];
                await axios.delete(`https://6281c6409fac04c65409389b.mockapi.io/cart/${item.id}`);
                await delay(1000);
            }

        } catch (error) {
            console.error(error);
        }
        setIsLoading(false);
    }

    return <div className={styles.overlay}>
        <div className={styles.drawer}>
            <h2 className={`mb-40 d-flex justify-between`}>
                Корзина <img className={styles.removeBtn}
                             src={`/img/btn-remove.svg`}
                             alt={`Close`}
                             onClick={onClose}/>
            </h2>
            {
                items.length > 0 ? <div className={`d-flex flex-column `}>
                    <div className={`${styles.items} flex`}>
                        {items.map((obj, index) => (
                            <div className={`${styles.cartItem} d-flex align-center mb-20`} key={index}>
                                <div className={styles.cartItemImg}
                                     style={{backgroundImage: `url(${obj.imageUrl})`}}></div>
                                <div className={`mr-20 flex`}>
                                    <p className={`mb-5`}>{obj.name}</p>
                                    <b>{obj.price} руб.</b>
                                </div>
                                <img
                                    className={styles.removeBtn}
                                    src={`/img/btn-remove.svg`}
                                    alt={`Remove`}
                                    onClick={() => onRemove(obj.id)}
                                />
                            </div>
                        ))}
                        <div className={styles.cartTotalBlockAbsolute}>
                            <div className={`${styles.cartTotalBlock}`}>
                                <ul>
                                    <li>
                                        <span>Итого:</span>
                                        <div></div>
                                        <b>{totalPrice} руб.</b>
                                    </li>
                                    <li>
                                        <span>Налог 5%:</span>
                                        <div></div>
                                        <b>{totalPrice / 100 * 5} руб.</b>
                                    </li>
                                </ul>
                                <button disabled={isLoading} className={styles.greenButton} onClick={onClickOrder}>
                                    Оформить заказ
                                    <img src={`/img/arrow.svg`} alt={`Arrow`}/>
                                </button>
                            </div>
                        </div>
                    </div>
                </div> : <Info
                    title={isOrderCompleted ? `Заказ оформлен!` : `Корзина пустая`}
                    description={isOrderCompleted ? `Ваш заказ #${orderId} скоро будет передан курьерской доставке`
                        : `Добавьте хотя бы одну пару кроссовок, чтобы сделать заказ!`}
                    image={isOrderCompleted ? `/img/complete-order.jpg` : `/img/cart-empty.png`}/>
            }


        </div>
    </div>
}

export default Drawer