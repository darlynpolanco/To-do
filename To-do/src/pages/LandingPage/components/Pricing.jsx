const Pricing = () => {
    return(
        <section class="pricing-section">
            <h2 class="section-title">Planes y Precios</h2>
            <div class="pricing-grid">
                <div class="pricing-card">
                    <h3>Básico</h3>
                    <div class="price">$0<span>/mes</span></div>
                    <ul class="features-list">
                        <li>Hasta 5 proyectos</li>
                        <li>3 colaboradores</li>
                        <li>Características básicas</li>
                    </ul>
                    <button class="cta-btn">Empezar Gratis</button>
                </div>

                <div class="pricing-card highlighted">
                    <h3>Profesional</h3>
                    <div class="price">$9<span>/mes</span></div>
                    <ul class="features-list">
                        <li>Proyectos ilimitados</li>
                        <li>Colaboradores ilimitados</li>
                        <li>Soporte prioritario</li>
                        <li>Estadísticas avanzadas</li>
                    </ul>
                    <button class="cta-btn">Prueba Gratis</button>
                </div>

                <div class="pricing-card">
                    <h3>Empresa</h3>
                    <div class="price">$29<span>/mes</span></div>
                    <ul class="features-list">
                        <li>Todos los features Pro</li>
                        <li>Cuentas de equipo</li>
                        <li>SSO</li>
                        <li>Soporte 24/7</li>
                    </ul>
                    <button class="cta-btn">Contactar Ventas</button>
                </div>
            </div>
        </section>
    )
}

export default Pricing;