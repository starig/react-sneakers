import styles from './Drawer.module.scss';


function Drawer({onClose, items = [], onRemove}) {
    return <div className={styles.overlay}>
        <div className={styles.drawer}>
            <h2 className={`mb-40 d-flex justify-between`}>
                Корзина <img className={styles.removeBtn}
                             src={`/img/btn-remove.svg`}
                             alt={`Close`}
                             onClick={onClose}/>
            </h2>
            {
                items.length > 0 ? <div className={styles.items}>
                    {items.map((obj, index) => (
                        <div className={`${styles.cartItem} d-flex align-center mb-20`} key={index}>
                            <div className={styles.cartItemImg} style={{backgroundImage: `url(${obj.imgUrl})`}}></div>
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
                    <div className={styles.cartTotalBlock}>
                        <ul>
                            <li>
                                <span>Итого:</span>
                                <div></div>
                                <b>21 498 руб.</b>
                            </li>
                            <li>
                                <span>Налог 5%:</span>
                                <div></div>
                                <b>1047 руб.</b>
                            </li>
                        </ul>
                        <button className={styles.greenButton}>
                            Оформить заказ
                            <img src={`/img/arrow.svg`} alt={`Arrow`}/>
                        </button>
                    </div>
                </div> : <div className={`${styles.cartEmpty} d-flex align-center justify-center flex-column flex`}>
                    <img className={`mb-20`} width={120} height={120}
                         src={'/img/cart-empty.png'} alt={`Empty cart`}/>
                    <h2>Корзина пустая</h2>
                    <p className={`opacity-6`}>
                        Добавьте хотя бы одну пару кроссовок, чтобы сделать заказ.
                    </p>
                    <button className={styles.greenButton} onClick={onClose}>
                        <img src={'/img/arrow.svg'} alt={`arrow`}/>
                        Вернуться назад
                    </button>
                </div>
            }


        </div>
    </div>
}

export default Drawer