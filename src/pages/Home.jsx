import React from "react";
import Card from "../components/Card";

function Home({
                  searchValue,
                  onChangeSearchInput,
                  setSearchValue,
                  onAddToFavorite,
                  onAddToCart,
                  sneakers,
                  isLoading
              }) {

    const renderItems = () => {
        const filteredItems = sneakers.filter(item => item.name.toLowerCase().includes(searchValue.toLowerCase()));
        return ((isLoading ? [...Array(8)] : filteredItems).map((item, index) => (
                <Card
                    key={index}
                    onFavorite={(obj) => onAddToFavorite(obj)}
                    onPlus={(obj) => onAddToCart(obj)}
                    loading={isLoading}
                    {...item}
                />
            )));
    }
    return (
        <div className={`content p-40`}>
            <div className={`d-flex align-center justify-between mb-40`}>
                <h1>{searchValue ? `Поиск по запросу : "${searchValue}"` : `Все кроссовки`}</h1>
                <div className={`search-block d-flex`}>
                    <img src={`/img/search.svg`} alt={`Search`}/>
                    <input onChange={onChangeSearchInput} value={searchValue} placeholder={`Поиск...`}/>
                    {searchValue && <img
                        className={`clearBtn`}
                        src={`/img/btn-search-remove.svg`}
                        alt={`Clear`} onClick={() => setSearchValue('')}/>}
                </div>
            </div>
            <div className={`d-flex flex-wrap`}>
                {renderItems()}
            </div>
        </div>
    )
}

export default Home;