import styles from './Drawer.module.scss';

function Drawer() {
    return <div className={styles.overlay} style={{display: "none"}}>
        <div className={styles.drawer}>
            <h2 className={`mb-40 d-flex justify-between`}>Корзина <img className={`removeBtn cu-p`}
                                                                        src={`/img/btn-remove.svg`} alt={`Remove`}/>
            </h2>
            <div className={styles.items}>
                <div className={`${styles.cartItem} d-flex align-center mb-20`}>
                    <div className={styles.cartItemImg} style={{backgroundImage: 'url(/img/sneakers/1.jpg)'}}></div>
                    <div className={`mr-20 flex`}>
                        <p className={`mb-5`}>Мужские Кроссовки Nike Air Max 270</p>
                        <b>12 999 руб.</b>
                    </div>
                    <img className={styles.removeBtn} src={`/img/btn-remove.svg`} alt={`Remove`}/>
                </div>
            </div>
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
                <button className={styles.greenButton}>Оформить заказ <img src={`/img/arrow.svg`} alt={`Arrow`}/></button>
            </div>
        </div>
    </div>
}

export default Drawer