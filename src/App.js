import SearchInput from './components/SearchInput/SearchInput';
import UserList from './components/UserList/UserList';
import './App.css';

function App() {
  return (
    <div className="App">
      <div className="container">
        <SearchInput />
        <UserList />
      </div>
    </div>
  );
}

export default App;
