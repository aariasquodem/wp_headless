import {BrowserRouter} from 'react-router-dom';
import Header from './components/Header';
import Main from './components/Main';

import './App.css';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Header/>
        <Main/>
      </BrowserRouter>
    </div>
  );
}

export default App;
