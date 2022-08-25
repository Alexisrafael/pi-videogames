import { Route, Routes } from 'react-router-dom';
import './App.css';
import Create from './Components/Create';
import Home from './Components/Home';
import LandingPage from './Components/LandingPage';
import VideoDetail from './Components/VideoDetail';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route exact path='/' element={<LandingPage/>}/>
        <Route path='/videogames' element={<Home/>}/>
        <Route path='/videogame/:id' element={<VideoDetail/>}/>
        <Route path='/createVideogames' element={<Create/>}/>
      </Routes>
    </div>
  );
}

export default App;
