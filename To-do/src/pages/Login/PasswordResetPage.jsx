import { useState, useEffect } from 'react';
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import './assets/login.css'

const PasswordResetPage = () => {
    // Usamos los hooks reales de react-router-dom
    const navigate = useNavigate();
    const location = useLocation();
    const [searchParams] = useSearchParams();
    
    const [token, setToken] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [message, setMessage] = useState('');
    const [isSuccess, setIsSuccess] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [isTokenValid, setIsTokenValid] = useState(true);
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    // Configuración de la API
    const API_BASE_URL = "https://localhost:7089";

    // Obtener el token de la URL cuando el componente se monta
    useEffect(() => {
        const urlToken = searchParams.get('token');
        
        if (urlToken) {
            setToken(urlToken);
            console.log("Token obtenido:", urlToken);
        } else {
            console.error("No se encontró token en la URL");
            setIsTokenValid(false);
            setMessage("Token inválido o faltante");
        }
    }, [searchParams]);

    // Función para hacer peticiones a la API
    const apiRequest = async (endpoint, method, body) => {
        setIsLoading(true);
        setMessage('');
        
        try {
            const response = await fetch(`${API_BASE_URL}${endpoint}`, {
                method,
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json"
                },
                body: JSON.stringify(body)
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || `Error en la solicitud: ${response.status}`);
            }

            return await response.json();
        } catch (err) {
            console.error("Error en la solicitud API:", err);
            setMessage(err.message || "Error de conexión con el servidor");
            throw err;
        } finally {
            setIsLoading(false);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (newPassword !== confirmPassword) {
            setMessage('Las contraseñas no coinciden');
            return;
        }

        if (newPassword.length < 6) {
            setMessage('La contraseña debe tener al menos 6 caracteres');
            return;
        }

        try {
            await apiRequest('/api/Auth/reset-password', 'POST', {
                token,
                newPassword
            });
            
            setIsSuccess(true);
            setMessage('¡Contraseña actualizada con éxito!');
            
            setTimeout(() => navigate('/login'), 3000);
        } catch (err) {
            console.error("Error al restablecer contraseña:", err);
        }
    };

    // Si no hay token válido, mostrar mensaje de error
    if (!isTokenValid) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 flex items-center justify-center p-4 relative overflow-hidden">
                {/* Elementos decorativos de fondo */}
                <div className="absolute top-0 left-0 w-full h-full">
                    <div className="absolute top-20 left-20 w-96 h-96 bg-blue-400/20 rounded-full filter blur-3xl animate-pulse"></div>
                    <div className="absolute bottom-20 right-20 w-80 h-80 bg-cyan-400/15 rounded-full filter blur-3xl animate-pulse animation-delay-2s"></div>
                    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-72 h-72 bg-indigo-400/10 rounded-full filter blur-3xl animate-pulse animation-delay-4s"></div>
                </div>

                <div className="w-full max-w-md relative z-10">
                    <div className="bg-white/5 backdrop-blur-xl rounded-2xl shadow-2xl border border-white/10 overflow-hidden transform hover:scale-105 transition-all duration-500">
                        <div className="bg-gradient-to-r from-red-500 to-orange-500 p-6 text-center relative">
                            <div className="absolute inset-0 bg-gradient-to-r from-red-600/20 to-orange-600/20"></div>
                            <h1 className="text-2xl font-bold text-white relative z-10">Error</h1>
                        </div>
                        
                        <div className="p-8 text-center">
                            <div className="text-red-400 mb-6 animate-bounce">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                                </svg>
                            </div>
                            
                            <p className="text-gray-300 text-lg mb-6">
                                El enlace de restablecimiento es inválido o ha expirado.
                            </p>
                            
                            <button
                                onClick={() => navigate('/forgot-password')}
                                className="w-full mb-4 px-6 py-3 bg-gradient-to-r from-blue-500 to-cyan-500 text-white rounded-xl font-medium hover:from-blue-600 hover:to-cyan-600 transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl"
                            >
                                Solicitar nuevo enlace
                            </button>
                            
                            <button 
                                onClick={() => navigate('/login')}
                                className="text-blue-400 hover:text-blue-300 transition-colors duration-200 flex items-center justify-center mx-auto"
                            >
                                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                                </svg>
                                Volver al inicio de sesión
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    // Renderizar el formulario de restablecimiento
    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 flex items-center justify-center p-4 relative overflow-hidden">
            {/* Elementos decorativos de fondo */}
            <div className="absolute top-0 left-0 w-full h-full">
                <div className="absolute top-20 left-20 w-96 h-96 bg-blue-400/20 rounded-full filter blur-3xl animate-pulse"></div>
                <div className="absolute bottom-20 right-20 w-80 h-80 bg-cyan-400/15 rounded-full filter blur-3xl animate-pulse animation-delay-2s"></div>
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-72 h-72 bg-indigo-400/10 rounded-full filter blur-3xl animate-pulse animation-delay-4s"></div>
            </div>

            <div className="w-full max-w-md relative z-10">
                <div className="bg-white/5 backdrop-blur-xl rounded-2xl shadow-2xl border border-white/10 overflow-hidden transform hover:scale-105 transition-all duration-500">
                    <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-6 text-center relative">
                        <div className="absolute inset-0 bg-gradient-to-r from-blue-700/20 to-indigo-700/20"></div>
                        <h1 className="text-2xl font-bold text-white relative z-10">Restablecer Contraseña</h1>
                        <p className="text-blue-100 mt-2 relative z-10">Ingresa tu nueva contraseña segura</p>
                    </div>
                    
                    <div className="p-8">
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="space-y-2">
                                <label className="block text-gray-300 font-medium">
                                    Nueva contraseña
                                </label>
                                <div className="relative group">
                                    <input
                                        type={showPassword ? "text" : "password"}
                                        placeholder="Ingresa tu nueva contraseña"
                                        value={newPassword}
                                        onChange={(e) => setNewPassword(e.target.value)}
                                        className="w-full px-4 py-3 bg-white/5 backdrop-blur-sm border border-gray-600 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all duration-300 group-hover:border-gray-500"
                                        required
                                        disabled={isLoading}
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white transition-colors duration-200"
                                    >
                                        {showPassword ? (
                                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21" />
                                            </svg>
                                        ) : (
                                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                            </svg>
                                        )}
                                    </button>
                                </div>
                            </div>
                            
                            <div className="space-y-2">
                                <label className="block text-gray-300 font-medium">
                                    Confirmar contraseña
                                </label>
                                <div className="relative group">
                                    <input
                                        type={showConfirmPassword ? "text" : "password"}
                                        placeholder="Confirma tu nueva contraseña"
                                        value={confirmPassword}
                                        onChange={(e) => setConfirmPassword(e.target.value)}
                                        className="w-full px-4 py-3 bg-white/5 backdrop-blur-sm border border-gray-600 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all duration-300 group-hover:border-gray-500"
                                        required
                                        disabled={isLoading}
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white transition-colors duration-200"
                                    >
                                        {showConfirmPassword ? (
                                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21" />
                                            </svg>
                                        ) : (
                                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                            </svg>
                                        )}
                                    </button>
                                </div>
                            </div>
                            
                            <button
                                type="submit"
                                disabled={isLoading}
                                className={`w-full py-3 px-6 rounded-xl text-white font-medium transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl relative overflow-hidden ${
                                    isLoading 
                                        ? 'bg-gray-600/50 cursor-not-allowed' 
                                        : 'bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600'
                                }`}
                            >
                                <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-cyan-600/20 opacity-0 hover:opacity-100 transition-opacity duration-300"></div>
                                <div className="relative z-10">
                                    {isLoading ? (
                                        <div className="flex items-center justify-center">
                                            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                            </svg>
                                            Procesando...
                                        </div>
                                    ) : (
                                        'Restablecer contraseña'
                                    )}
                                </div>
                            </button>
                        </form>
                        
                        {message && (
                            <div className={`mt-6 p-4 rounded-xl text-center backdrop-blur-sm border transition-all duration-300 ${
                                isSuccess 
                                    ? 'bg-green-500/10 text-green-400 border-green-500/30 shadow-lg shadow-green-500/10' 
                                    : 'bg-red-500/10 text-red-400 border-red-500/30 shadow-lg shadow-red-500/10'
                            }`}
                            >
                                <div className="flex items-center justify-center">
                                    {isSuccess ? (
                                        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                        </svg>
                                    ) : (
                                        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                        </svg>
                                    )}
                                    {message}
                                </div>
                            </div>
                        )}
                        
                        <div className="mt-8 text-center">
                            <button 
                                onClick={() => navigate('/login')}
                                className="text-blue-400 hover:text-blue-300 transition-colors duration-200 flex items-center justify-center mx-auto group"
                            >
                                <svg className="w-4 h-4 mr-2 transform group-hover:-translate-x-1 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                                </svg>
                                Volver al inicio de sesión
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <style jsx>{`
                .animation-delay-2s {
                    animation-delay: 2s;
                }
                .animation-delay-4s {
                    animation-delay: 4s;
                }
            `}</style>
        </div>
    );
};

export default PasswordResetPage;