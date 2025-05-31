const Footer = () => {
    return(
        <footer>
        <p>&copy; 2025 TaskMaster. Todos los derechos reservados (DArlyn POlanco M.).</p>
        <h3>Redes Sociales!!!</h3>
        <div className="redes">
            <a href="">
                <img src="/To-do/src/assets/img/facebook.png" alt="Facebook" />
            </a>
            <a href="">
                <img src="/To-do/src/assets/img/instagram.png" alt="Instagram" />
            </a>
            <a href="">
                <img src="/To-do/src/assets/img/github.png" alt="GitHub" />
            </a>
        </div>

        <h3>Habla con nosotros📲</h3>
            
        <div className="contacto-footer" style={{marginTop: "2rem"}}>
            <form style={{maxWidth: "400px", margin: "0 auto", display: "flex", flexDirection: "column", gap: "0.7rem"}}>
            <label htmlFor="nombre">Nombre:</label>
            <input type="text" id="nombre" name="nombre" required style={{padding: "0.5rem", borderRadius: "5px", border: "1px solid #ccc"}} />
            <label htmlFor="email">Email:</label>
            <input type="email" id="email" name="email" required style={{padding: "0.5rem", borderRadius: "5px", border: "1px solid #ccc"}} />
            <label htmlFor="mensaje">Mensaje:</label>
            <textarea id="mensaje" name="mensaje" rows="3" required style={{padding: "0.5rem", borderRadius: "5px", border: "1px solid #ccc"}}></textarea>
            <button type="submit" style={{padding: "0.7rem 1.5rem", border: "none", borderRadius: "20px", background: "#3498db", color: "#fff", fontWeight: "bold", cursor: "pointer"}}>Enviar</button>
            </form>
        </div>
    </footer>
    )
}
export default Footer;