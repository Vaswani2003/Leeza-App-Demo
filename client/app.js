import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from './pages/login';
import Signup from './pages/signup';
import Home from './pages/home';
import Results from './pages/results';
import Testing from './pages/testing';

function App() {
  return (
    <div className="App">
      <BrowserRouter>

        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/home" element={<Home />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/results" element={<Results />} />
          <Route path="/testing" element={<Testing />} />
        </Routes>

      </BrowserRouter>
    </div>
  );
}

export default App;
