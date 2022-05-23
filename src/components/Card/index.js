import styles from './Card.module.scss';
import {useState} from "react";
import React from 'react';
import ContentLoader from "react-content-loader";
import AppContext from "../../context";

function Card({
                  onFavorite,
                  imageUrl,
                  name,
                  price,
                  onPlus,
                  favorited = false,
                  id,
                  loading = false
              }) {
    const { isItemAdded } = React.useContext(AppContext);
    const [isFavorite, setIsFavorite] = useState(favorited);


    const onClickPlus = () => {
        onPlus({name, price, imageUrl, id});
    }

    const onClickFavorite = () => {
        onFavorite({name, price, imageUrl, id});
        setIsFavorite(!isFavorite);
    }

    return <div className={styles.card}>
        {
            loading ? (
                    <ContentLoader
                        speed={2}
                        width={150}
                        height={190}
                        viewBox="0 0 150 190"
                        backgroundColor="#f3f3f3"
                        foregroundColor="#ecebeb">
                        <rect x="0" y="0" rx="10" ry="10" width="150" height="90"/>
                        <rect x="0" y="105" rx="10" ry="10" width="150" height="15"/>
                        <rect x="0" y="125" rx="10" ry="10" width="100" height="15"/>
                        <rect x="2" y="160" rx="10" ry="10" width="80" height="24"/>
                        <rect x="118" y="152" rx="10" ry="10" width="32" height="32"/>
                    </ContentLoader>
                ) : (
                <>
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
                            src={isItemAdded(id) ? `/img/btn-checked.svg` : `/img/btn-plus.svg`}
                            alt={`plus`}/>
                    </div>
                </>
                )
        }
    </div>
}

export default Card;