import Card from "../components/Card";

function Home({
                  searchValue,
                  onChangeSearchInput,
                  setSearchValue,
                  onAddToFavorite,
                  onAddToCart,
                  sneakers,
              }) {
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
                {
                    sneakers.filter(item => item.name.toLowerCase().includes(searchValue.toLowerCase())).map((item) => (
                        <Card
                            key={item.id}
                            name={item.name}
                            price={item.price}
                            imgUrl={item.imageUrl}
                            onFavorite={(obj) => onAddToFavorite(obj)}
                            onPlus={(obj) => onAddToCart(obj)}
                        />
                    ))
                }
            </div>
        </div>
    )
}

export default Home;