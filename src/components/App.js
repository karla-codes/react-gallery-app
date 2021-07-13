import { BrowserRouter, Route, Switch } from 'react-router-dom';
import SearchForm from './SearchForm';
import Nav from './Nav';
import PhotoContainer from './PhotoContainer';
import apiKey from '../config';

function App() {
  // const key = apiKey;

  return (
    <BrowserRouter>
      <div className="container">
        <SearchForm />
        <Nav />
        <Switch>
          <Route exact path="/" component={PhotoContainer} />
          <Route path="/cats" component={PhotoContainer} />
          <Route path="/dogs" component={PhotoContainer} />
          <Route path="/computers" component={PhotoContainer} />
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
