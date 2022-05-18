import React from 'react';
import { Route } from 'react-router-dom';
import Header from "./components/Header";
import Drawer from "./components/Drawer";
import {useEffect, useState} from "react";
import axios from "axios";
import Home from "./pages/Home";


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
        })
    }, []);

    const onAddToCart = (obj) => {
        axios.post('https://6281c6409fac04c65409389b.mockapi.io/cart', obj);
        setCartItems(prev => [...prev, obj]);
    }

    const onAddToFavorite = (obj) => {
        axios.post('https://6281c6409fac04c65409389b.mockapi.io/favorites', obj);
        setFavorites((prev) => [...prev, obj])
    }

    const onRemoveItem = (id) => {
        console.log(id);
        axios.delete(`https://6281c6409fac04c65409389b.mockapi.io/cart/${id}`);
        setCartItems(prev => prev.filter(item => item.id !== id));
    }

    const onChangeSearchInput = (event) => {
        setSearchValue(event.target.value);
    }

    return (<div className={`wrapper clear`}>
        {cartOpened && <Drawer items={cartItems} onClose={() => setCartOpened(false)} onRemove={onRemoveItem}/>}
        <Header onClickCart={() => setCartOpened(true)}/>
        <Route path={''}>
            <Home
                searchValue={searchValue}
                onChangeSearchInput={onChangeSearchInput}
                setSearchValue={setSearchValue}
                onAddToFavorite={onAddToFavorite}
                onAddToCart={onAddToCart}
                sneakers={sneakers}
            />
        </Route>
    </div>);
}

export default App;
