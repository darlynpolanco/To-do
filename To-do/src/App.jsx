import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage/LandingPage';
// Importa otros componentes que necesites

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<LandingPage />} />
                {/* Agrega aquí otras rutas más adelante */}
                {/* <Route path="/login" element={<LoginPage />} /> */}
                {/* <Route path="/app" element={<TodoApp />} /> */}
            </Routes>
        </BrowserRouter>
    );
}

export default App;