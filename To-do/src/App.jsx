import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage/LandingPage';
import PasswordResetPage from './pages/Login/PasswordResetPage';
import AuthForm3 from './pages/Login/AuthForm3';

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<LandingPage />} />
                <Route path="/reset-password" element={<PasswordResetPage />} />
                <Route path="/login" element={<AuthForm3 />} />
                <Route path="/signup" element={<AuthForm3 />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;