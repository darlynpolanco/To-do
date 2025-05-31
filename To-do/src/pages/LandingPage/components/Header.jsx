import React from "react";

const Header = () => {
    return (
        <header>
            <nav>
                <div className="logo">TaskMaster  ⏱</div>
                <div className="auth-buttons">
                    <button className="auth-btn login-btn">Iniciar Sesión</button>
                    <button className="auth-btn signup-btn">Registrarse</button>
                </div>
            </nav>
        </header>
    );
};

export default Header;
