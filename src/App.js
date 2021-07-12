import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <div className="container">
      {/* Search form - stateful component */}
      <Form />

      {/* Navigation - stateless component */}
      <Nav />

      {/* Photo container - stateful component */}
      <PhotoContainer />
    </div>
  );
}

export default App;
