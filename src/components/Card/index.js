import styles from './Card.module.scss';
import {useState} from "react";

function Card({onFavorite, imageUrl, name, price, onPlus, favorited = false, id}) {
    const [isAdded, setIsAdded] = useState(false);
    const [isFavorite, setIsFavorite] = useState(favorited);

    const onClickPlus = () => {
        onPlus({name, price, imageUrl});
        setIsAdded(!isAdded);
    }

    const onClickFavorite = () => {
        onFavorite({name, price, imageUrl, id});
        setIsFavorite(!isFavorite);
    }

    return <div className={styles.card}>
        <div className={styles.favorite} onClick={onClickFavorite}>
            <img
                src={isFavorite ? `/img/heart-liked.svg` : `/img/heart-unliked.svg`}
                alt={`Unliked`}/>
        </div>
        <img width={133} height={112} src={imageUrl} alt={`sneakers`}/>
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