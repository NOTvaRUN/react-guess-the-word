import './App.css';
import Main from './components/main';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from 'react-router-dom';
import Controller from './components/controller';

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path='/game' element={ <Main />}></Route>
        <Route exact path='/controller' element={ <Controller />}></Route>
      </Routes>
    </Router>
   
  );
}

export default App;
