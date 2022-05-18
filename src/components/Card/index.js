import styles from './Card.module.scss';
import {useState} from "react";

function Card({onFavorite, imgUrl, name, price, onPlus, id}) {
    const [isAdded, setIsAdded] = useState(false);
    const [isFavorite, setIsFavorite] = useState(false);

    const onClickPlus = () => {
        onPlus({name, price, imgUrl});
        setIsAdded(!isAdded);
    }

    const onClickFavorite = () => {
        onFavorite({id});
        setIsFavorite(!isFavorite);
    }

    return <div className={styles.card}>
        <div className={styles.favorite} onClick={onClickFavorite}>
            <img
                src={isFavorite ? `/img/heart-liked.svg` : `/img/heart-unliked.svg`}
                alt={`Unliked`}/>
        </div>
        <img width={133} height={112} src={imgUrl} alt={`sneakers`}/>
        <h5>{name}</h5>
        <div className={`d-flex justify-between align-center`}>
            <div className={`d-flex flex-column`}>
                <span>Цена: </span>
                <b>{price} руб.</b>
            </div>
            <img
                className={styles.plus}
                onClick={onClickPlus}
                src={isAdded ? `/img/btn-checked.svg` : `/img/btn-plus.svg`}
                alt={`plus`}/>
        </div>
    </div>
}

export default Card;