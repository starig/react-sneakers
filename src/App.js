import React from 'react';
import { Route } from 'react-router-dom';
import Header from "./components/Header";
import Drawer from "./components/Drawer";
import {useEffect, useState} from "react";
import axios from "axios";
import Home from "./pages/Home";
import Favorites from "./pages/Favorites";


function App() {
    const [sneakers, setSneakers] = useState([]);
    const [cartItems, setCartItems] = useState([]);
    const [favorites, setFavorites] = useState([]);
    const [searchValue, setSearchValue] = useState('');
    const [cartOpened, setCartOpened] = useState(false);

    useEffect(() => {
        axios.get('https://6281c6409fac04c65409389b.mockapi.io/items').then(res => {
            setSneakers(res.data);
        });
        axios.get('https://6281c6409fac04c65409389b.mockapi.io/cart').then(res => {
            setCartItems(res.data);
        });
        axios.get('https://6281c6409fac04c65409389b.mockapi.io/favorites').then(res => {
            setFavorites(res.data);
        });
    }, []);

    const onAddToCart = (obj) => {
        axios.post('https://6281c6409fac04c65409389b.mockapi.io/cart', obj);
        console.log(obj);
        setCartItems(prev => [...prev, obj]);
    }

    const onAddToFavorite = async (obj) => {
        try {
            if(favorites.find(item => item.id === obj.id)) {
                axios.delete(`https://6281c6409fac04c65409389b.mockapi.io/favorites/${obj.id}`);
            } else {
                const { data } = await axios.post('https://6281c6409fac04c65409389b.mockapi.io/favorites', obj);
                setFavorites((prev) => [...prev, data]);
            }
        } catch (error) {
            console.error('Не удалось добавить в фавориты');
        }
    }

    const onRemoveItem = (id) => {
        axios.delete(`https://6281c6409fac04c65409389b.mockapi.io/cart/${id}`);
        setCartItems(prev => prev.filter(item => item.id !== id));
    }

    const onChangeSearchInput = (event) => {
        setSearchValue(event.target.value);
    }

    return (<div className={`wrapper clear`}>
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
            />
        </Route>
        <Route path={'/favorites'} exact>
            <Favorites items={favorites} onAddToFavorite={onAddToFavorite}/>
        </Route>
    </div>);
}

export default App;
