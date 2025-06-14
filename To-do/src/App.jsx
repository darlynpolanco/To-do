import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage/LandingPage';
import PasswordResetPage from './pages/Login/PasswordResetPage';
import AuthForm4 from './pages/Login/AuthForm4';
import AuthWrapper from './AuthWrapper';
import Pomodoro from './pages/To-do/components/Pomodoro';
import Layout from './pages/To-do/components/Layout';

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<LandingPage />} />
                <Route path="/reset-password" element={<PasswordResetPage />} />
                <Route path="/login" element={<AuthWrapper />} />   
                <Route path="/signup" element={<AuthWrapper />} />  
                <Route path="/todos" element={<AuthWrapper />} />
                <Route path="/pomodoro" element={<Layout><Pomodoro /></Layout>} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
