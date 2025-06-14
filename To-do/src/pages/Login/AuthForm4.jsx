import React, { useState } from "react";
import { FaFacebookF, FaGoogle, FaLinkedinIn, FaArrowLeft } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
//import './assets/login.css';

const API_BASE_URL = "https://localhost:7089";

export default function AuthForm({ onLoginSuccess }) {
  const [authMode, setAuthMode] = useState("login");
  const [correoElectronico, setCorreoElectronico] = useState("");
  const [contrasena, setContrasena] = useState("");
  const [nombre, setNombre] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [resetEmailSent, setResetEmailSent] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const toggleForm = (mode) => {
    setError(null);
    setAuthMode(mode);
  };

  const apiRequest = async (endpoint, method, body) => {
    setIsLoading(true);
    setError(null);
    
    try {
      const response = await fetch(`${API_BASE_URL}${endpoint}`, {
        method,
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify(body)
      });

      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.message || "Error en la solicitud");
      }

      return data;
    } catch (err) {
      setError(err.message || "Error de conexión con el servidor");
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const data = await apiRequest("/api/Auth/login", "POST", { 
        correoElectronico, 
        contrasena 
      });
      
      // Notifica el éxito del login al componente padre
      if (onLoginSuccess) {
        onLoginSuccess(data.token, data.user);
      }
      
      // Redirige al dashboard
      navigate("/todos");
    } catch (err) {
      console.error("Error en login:", err);
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const data = await apiRequest("/api/Auth/register", "POST", { 
        nombre, 
        correoElectronico, 
        contrasena 
      });
      
      // Notifica el éxito del registro al componente padre
      if (onLoginSuccess) {
        onLoginSuccess(data.token, data.user);
      }
      
      // Redirige al dashboard
      navigate("/todos");
    } catch (err) {
      console.error("Error en registro:", err);
    }
  };

  const handleForgotPassword = async (e) => {
    e.preventDefault();
    try {
      await apiRequest("/api/Auth/send-reset-link", "POST", {
        Email: correoElectronico  
      });
      setResetEmailSent(true);
      setTimeout(() => {
        setResetEmailSent(false);
        setAuthMode("login");
      }, 5000);
    } catch (err) {
      console.error("Error enviando enlace:", err);
      setError(err.message || "Error enviando enlace de recuperación");
      setTimeout(() => setError(""), 5000);
    }
  };

  const renderForm = () => {
    switch (authMode) {
      case "register":
        return (
          <>
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-4 text-gray-800">
              Crear cuenta
            </h2>
            <div className="flex justify-center gap-6 mb-6 text-blue-600 text-xl">
              <FaFacebookF className="cursor-pointer hover:text-blue-700" />
              <FaGoogle className="cursor-pointer hover:text-red-600" />
              <FaLinkedinIn className="cursor-pointer hover:text-blue-800" />
            </div>
            <p className="text-sm text-center text-gray-500 mb-6">
              Usa tu email para registrarte
            </p>
            <form onSubmit={handleRegister} className="flex flex-col gap-4">
              <input
                type="text"
                placeholder="Nombre"
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
                className="border rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                required
                minLength={3}
              />
              <input
                type="email"
                placeholder="Correo electrónico"
                value={correoElectronico}
                onChange={(e) => setCorreoElectronico(e.target.value)}
                className="border rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                required
              />
              <input
                type="password"
                placeholder="Contraseña"
                value={contrasena}
                onChange={(e) => setContrasena(e.target.value)}
                className="border rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                required
                minLength={6}
              />
              <button
                type="submit"
                disabled={isLoading}
                className="bg-blue-500 hover:bg-blue-600 text-white rounded-full py-2 font-semibold transition disabled:opacity-70 flex items-center justify-center"
              >
                {isLoading ? (
                  <span className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></span>
                ) : (
                  "Registrarse"
                )}
              </button>
              {error && <p className="text-red-500 text-center mt-2">{error}</p>}
            </form>
          </>
        );

      case "forgot":
        return (
          <>
            <button 
              onClick={() => toggleForm("login")}
              className="absolute top-4 left-4 text-blue-600 hover:text-blue-800 flex items-center"
            >
              <FaArrowLeft className="mr-2" /> Volver
            </button>
            
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-4 text-gray-800">
              Recuperar contraseña
            </h2>
            
            {resetEmailSent ? (
              <div className="text-center py-6">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">¡Email enviado!</h3>
                <p className="text-gray-600">
                  Hemos enviado instrucciones para restablecer tu contraseña a {correoElectronico}
                </p>
              </div>
            ) : (
              <>
                <p className="text-sm text-center text-gray-500 mb-6">
                  Ingresa tu correo electrónico para recibir un enlace de recuperación
                </p>
                <form onSubmit={handleForgotPassword} className="flex flex-col gap-4">
                  <input
                    type="email"
                    placeholder="Correo electrónico"
                    value={correoElectronico}
                    onChange={(e) => setCorreoElectronico(e.target.value)}
                    className="border rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                    required
                  />
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="bg-blue-500 hover:bg-blue-600 text-white rounded-full py-2 font-semibold transition disabled:opacity-70 flex items-center justify-center"
                  >
                    {isLoading ? (
                      <span className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></span>
                    ) : (
                      "Enviar enlace"
                    )}
                  </button>
                  {error && <p className="text-red-500 text-center mt-2">{error}</p>}
                </form>
              </>
            )}
          </>
        );

      default: // login
        return (
          <>
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-4 text-gray-800">
              Iniciar sesión
            </h2>
            <div className="flex justify-center gap-6 mb-6 text-blue-600 text-xl">
              <FaFacebookF className="cursor-pointer hover:text-blue-700" />
              <FaGoogle className="cursor-pointer hover:text-red-600" />
              <FaLinkedinIn className="cursor-pointer hover:text-blue-800" />
            </div>
            <p className="text-sm text-center text-gray-500 mb-6">
              Usa tu cuenta de email
            </p>
            <form onSubmit={handleLogin} className="flex flex-col gap-4">
              <input
                type="email"
                placeholder="Correo electrónico"
                value={correoElectronico}
                onChange={(e) => setCorreoElectronico(e.target.value)}
                className="border rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                required
              />
              <input
                type="password"
                placeholder="Contraseña"
                value={contrasena}
                onChange={(e) => setContrasena(e.target.value)}
                className="border rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                required
                minLength={6}
              />
              <button
                type="button"
                onClick={() => toggleForm("forgot")}
                className="text-blue-600 text-sm text-right hover:text-blue-800 -mt-2"
              >
                ¿Olvidaste tu contraseña?
              </button>
              <button
                type="submit"
                disabled={isLoading}
                className="bg-blue-500 hover:bg-blue-600 text-white rounded-full py-2 font-semibold transition disabled:opacity-70 flex items-center justify-center"
              >
                {isLoading ? (
                  <span className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></span>
                ) : (
                  "Iniciar sesión"
                )}
              </button>
              {error && <p className="text-red-500 text-center mt-2">{error}</p>}
            </form>
          </>
        );
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0f172a] px-4 py-10">
      <div className="bg-white w-full max-w-6xl h-auto md:h-[520px] rounded-3xl shadow-2xl flex flex-col md:flex-row overflow-hidden relative">
        {/* Sección del formulario */}
        <div className="w-full md:w-1/2 h-full p-10 relative overflow-hidden bg-gray-100">
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={authMode}
              variants={{
                initial: (direction) => ({
                  x: direction === "left" ? -100 : 100,
                  opacity: 0,
                }),
                animate: {
                  x: 0,
                  opacity: 1,
                  transition: { duration: 0.4 },
                },
                exit: (direction) => ({
                  x: direction === "left" ? 100 : -100,
                  opacity: 0,
                  transition: { duration: 0.3 },
                }),
              }}
              initial="initial"
              animate="animate"
              exit="exit"
              custom={authMode === "register" ? "left" : "right"}
              className="absolute top-0 left-0 w-full h-full px-4 md:px-8 flex flex-col justify-center"
            >
              {renderForm()}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Panel lateral */}
        <motion.div
          key={`panel-${authMode}`}
          initial={{ opacity: 0, x: authMode === "register" ? 100 : -100 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4 }}
          className={`w-full md:w-1/2 h-[300px] md:h-full flex flex-col items-center justify-center p-6 ${
            authMode === "forgot" 
              ? "bg-gradient-to-br from-purple-300 to-purple-500" 
              : "bg-gradient-to-br from-blue-300 to-blue-500"
          } text-white`}
        >
          <h2 className="text-2xl md:text-4xl font-bold mb-4 text-center">
            {authMode === "register" 
              ? "¡Bienvenido de vuelta!" 
              : authMode === "forgot"
                ? "¿Necesitas ayuda?"
                : "¡Hola, amigo!"}
          </h2>
          
          <p className="text-center text-sm md:text-base mb-6 px-4 md:px-6">
            {authMode === "register"
              ? "Para mantenerte conectado, inicia sesión con tus datos personales"
              : authMode === "forgot"
                ? "Te ayudaremos a recuperar tu contraseña"
                : "Ingresa tus datos personales y comienza tu viaje con nosotros"}
          </p>
          
          {authMode === "forgot" ? (
            <button
              onClick={() => toggleForm("login")}
              className="border border-white rounded-full px-8 py-2 font-semibold hover:bg-white hover:text-purple-600 transition"
            >
              Volver a login
            </button>
          ) : (
            <button
              onClick={() => toggleForm(authMode === "login" ? "register" : "login")}
              className="border border-white rounded-full px-8 py-2 font-semibold hover:bg-white hover:text-blue-600 transition"
            >
              {authMode === "login" ? "Registrarse" : "Iniciar sesión"}
            </button>
          )}
        </motion.div>
      </div>
    </div>
  );
}