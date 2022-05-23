import styles from './Header.module.scss';
import React from 'react';
import {Link} from 'react-router-dom'
import {useCart} from "../../hooks/useCart";

function Header(props) {
    const { totalPrice} = useCart();

    return <header className={`d-flex justify-between align-center p-40`}>

            <Link to={`/`}>
                <div className={`d-flex align-center`}>
                    <img width={40} height={40} src={`/img/logo.png`}/>
                    <div>
                        <h3 className={`text-uppercase`}>React Sneakers</h3>
                        <p className={`opacity-5`}>Магазин лучших кроссовок</p>
                    </div>
                </div>
            </Link>
        <ul className={`d-flex`}>
            <li className={`mr-30 cu-p`} onClick={props.onClickCart}>
                <img width={18} height={18} src={`/img/cart.svg`} alt={`Cart`}/>
                <span>{totalPrice} ₽</span>
            </li>
            <li className={`mr-10 cu-p`}>
                <Link to={`/favorites`}>
                    <img src={`/img/heart.svg`} width={18} height={18} alt={`Favorites`}/>
                </Link>
            </li>
            <li className={`mr-30 cu-p`}>
                <Link to={`/orders`}>
                    <img src={`/img/user.svg`} width={18} height={18} alt={`User`}/>
                </Link>
            </li>
        </ul>
    </header>
}

export default Header;