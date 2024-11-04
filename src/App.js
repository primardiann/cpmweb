import {StrictMode} from 'react';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Login from './Login.js';
import Dashboard from './Dashboard.js';
import './App.css';

function App() {
    return (
        <Router>
            <StrictMode>
                <Routes>
                    <Route path="/" element={<Login />}/>
                    <Route path="/*" element={<Dashboard />}/>
                </Routes>
            </StrictMode>
        </Router>
    );
}

export default App;
