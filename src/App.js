import React from 'react';
import {Route} from 'react-router-dom';
import Header from "./components/Header";
import Drawer from "./components/Drawer";
import {useEffect, useState} from "react";
import axios from "axios";
import Home from "./pages/Home";
import Favorites from "./pages/Favorites";
import AppContext from "./context";
import Orders from "./pages/Orders";


function App() {
    const [sneakers, setSneakers] = useState([]);
    const [cartItems, setCartItems] = useState([]);
    const [favorites, setFavorites] = useState([]);
    const [searchValue, setSearchValue] = useState('');
    const [cartOpened, setCartOpened] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        async function fetchData() {
            const cartResponse = await axios.get('https://6281c6409fac04c65409389b.mockapi.io/cart');
            const favoritesResponse = await axios.get('https://6281c6409fac04c65409389b.mockapi.io/favorites');
            const itemsResponse = await axios.get('https://6281c6409fac04c65409389b.mockapi.io/items');

            setIsLoading(false);
            setCartItems(cartResponse.data);
            setFavorites(favoritesResponse.data);
            setSneakers(itemsResponse.data);
        }

        fetchData();
    }, []);

    const onAddToCart = (obj) => {
        if (cartItems.find((item) => Number(item.id) === Number(obj.id))) {
            axios.delete(`https://6281c6409fac04c65409389b.mockapi.io/cart/${obj.id}`);
            setCartItems(prev => prev.filter(item => Number(item.id) !== Number(obj.id)));
        } else {
            setCartItems(prev => [...prev, obj]);
            axios.post('https://6281c6409fac04c65409389b.mockapi.io/cart', obj);
        }
    };

    const onAddToFavorite = async (obj) => {
        try {
            if (favorites.find((item) => Number(item.id) === Number(obj.id))) {
                axios.delete(`https://6281c6409fac04c65409389b.mockapi.io/favorites/${obj.id}`);
                setFavorites(prev => prev.filter(item => Number(item.id) !== Number(obj.id)));
            } else {
                const {data} = await axios.post('https://6281c6409fac04c65409389b.mockapi.io/favorites', obj);
                setFavorites((prev) => [...prev, data]);
            }
        } catch (error) {
            console.error('Не удалось добавить в фавориты');
        }
    };

    const onRemoveItem = (id) => {
        axios.delete(`https://6281c6409fac04c65409389b.mockapi.io/cart/${id}`);
        setCartItems(prev => prev.filter(item => item.id !== id));
    };

    const onChangeSearchInput = (event) => {
        setSearchValue(event.target.value);
    };

    const isItemAdded = (id) => {
        return cartItems.some((obj) => Number(obj.id) === Number(id));
    }

    return (
        <AppContext.Provider value={{
            sneakers,
            cartItems,
            favorites,
            isItemAdded,
            onAddToFavorite,
            setCartOpened,
            setCartItems,
            onAddToCart,
        }}>
            <div className={`wrapper clear`}>
                {cartOpened && <Drawer items={cartItems} onClose={() => setCartOpened(false)} onRemove={onRemoveItem}/>}
                <Header onClickCart={() => setCartOpened(true)}/>
                <Route path={'/'} exact>
                    <Home
                        searchValue={searchValue}
                        onChangeSearchInput={onChangeSearchInput}
                        setSearchValue={setSearchValue}
                        onAddToFavorite={onAddToFavorite}
                        onAddToCart={onAddToCart}
                        sneakers={sneakers}
                        isLoading={isLoading}
                    />
                </Route>
                <Route path={'/favorites'} exact>
                    <Favorites/>
                </Route>
                <Route path={'/orders'}>
                    <Orders />
                </Route>
            </div>
        </AppContext.Provider>
    );
}

export default App;
