import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import MainPage from './pages/MainPage';
import GamePage from './pages/GamePage';
import { sampleGames } from './data/sampleGames';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <main className="main-content">
          <Routes>
            <Route 
              path="/" 
              element={<MainPage games={sampleGames} />} 
            />
            <Route 
              path="/game/:id" 
              element={<GamePage games={sampleGames} />} 
            />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
