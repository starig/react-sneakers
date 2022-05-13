import Card from "./components/Card";
import Header from "./components/Header";
import Drawer from "./components/Drawer";


const sneakers = [
    {name: 'Мужские Кроссовки Nike Blazer Mid Suede', price: 12999, imageUrl: './img/sneakers/1.jpg'},
    {name: 'Мужские Кроссовки Nike Air Max 270', price: 11299, imageUrl: './img/sneakers/2.jpg'},
]

function App() {
    return (<div className={`wrapper clear`}>
        <Drawer/>
        <Header/>
        <div className={`content p-40`}>
            <div className={`d-flex align-center justify-between mb-40`}>
                <h1>Все кроссовки</h1>
                <div className={`search-block d-flex`}>
                    <img src={`/img/search.svg`} alt={`Search`}/>
                    <input placeholder={`Поиск...`}/>
                </div>
            </div>

            <div className={`d-flex`}>
                {
                    sneakers.map((obj) => (
                        <Card name={obj.name} price={obj.price} imgUrl={obj.imageUrl}/>
                    ))
                }
            </div>
        </div>
    </div>);
}

export default App;
