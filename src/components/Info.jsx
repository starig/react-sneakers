import React from 'react';
import styles from "./Drawer/Drawer.module.scss";
import AppContext from "../context";

const Info = ( { title, description, image } ) => {
    console.log(image)
    const { setCartOpened } = React.useContext(AppContext);
    return (
        <div className={`${styles.cartEmpty} d-flex align-center justify-center flex-column flex`}>
            <img className={`mb-20`}
                 src={image} alt={`Empty cart`}/>
            <h2>{title}</h2>
            <p className={`opacity-6`}>
                {description}
            </p>
            <button className={styles.greenButton} onClick={() => setCartOpened(false)}>
                <img src={'/img/arrow.svg'} alt={`arrow`}/>
                Вернуться назад
            </button>
        </div>
    )
}

export default Info;