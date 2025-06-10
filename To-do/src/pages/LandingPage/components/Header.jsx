// import React from "react";

// const Header = () => {
//     return (
//         <header>
//             <nav>
//                 <div className="logo">DoDo  🦤</div>
//                 <div className="auth-buttons">
//                     <button className="auth-btn login-btn">Iniciar Sesión</button>
//                     {/* <button className="auth-btn signup-btn">Registrarse</button> */}
//                 </div>
//             </nav>
//         </header>
//     );
// };

// export default Header;

import React from "react";
import { Link } from "react-router-dom"; // 👈 Importa Link

const Header = () => {
    return (
        <header>
            <nav>
                <div className="logo">DoDo 🦤</div>
                <div className="auth-buttons">
                    <Link to="/login">
                        <button className="auth-btn login-btn">Iniciar Sesión</button>
                    </Link>
                    {/* <button className="auth-btn signup-btn">Registrarse</button> */}
                </div>
            </nav>
        </header>
    );
};

export default Header;