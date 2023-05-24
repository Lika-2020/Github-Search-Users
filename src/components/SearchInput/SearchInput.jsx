import './style.css';

function SearchInput() {
    return(
        <div className="search-input">
            <h1>GitHab Search Users</h1>
            <input type="text" placeholder="Введите логин пользователя" />
        </div>
    )
}

export default SearchInput