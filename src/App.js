import { StrictMode } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './Login.js';
import Dashboard from './Dashboard.js';
import DashboardEmployee from './DashboardEmployee.js';
import './App.css';

function App() {
    return (
        <Router>
            <StrictMode>
                <Routes>
                    <Route path="/" element={<Login />} />
                    <Route path="/dashboard/*" element={<Dashboard />} />
                    <Route path="/DashboardEmployee/*" element={<DashboardEmployee />} /> {/* Menambahkan rute untuk DashboardEmployee */}
                    {/* Rute fallback */}
                    <Route path="*" element={<div>Page Not Found</div>} />
                </Routes>
            </StrictMode>
        </Router>
    );
}

export default App;
