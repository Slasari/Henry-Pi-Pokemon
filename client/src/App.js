import './App.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import LandingPage from './components/LandingPage';
import Home from './components/Home';
import Style from './App.css'
import PokemonCreate from './components/PokemonCreate';
import Detail from './components/Detail';

function App() {
  return (
    <BrowserRouter>
      <div className={Style.App}>
        <Switch>
          <Route exact path='/' component={LandingPage} />
          <Route path='/home' component={Home} />
          <Route exact path='/pokemons' component={PokemonCreate} />
          <Route exact path='/pokemons/:id' component={Detail} />
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
