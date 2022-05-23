import Card from "../components/Card";
import {useContext} from "react";
import AppContext from "../context";

function Favorites() {
    const state = useContext(AppContext);

    return (
        <div className={`content p-40`}>
            <div className={`d-flex align-center justify-between mb-40`}>
                <h1>Мои закладки</h1>
            </div>
            <div className={`d-flex flex-wrap`}>
                {
                    state.favorites.map((item, index) => (
                        <Card
                            key={index}
                            favorited={true}
                            onFavorite={state.onAddToFavorite}
                            {...item}
                        />
                    ))
                }
            </div>
        </div>
    )
}

export default Favorites;