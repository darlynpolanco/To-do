import React from "react";

const Feactures = () => {
    return (
        <section class="features">
            <h2 class="section-title">Características Principales</h2>
            <div class="features-grid">
                <div class="feature-card">
                    <div class="feature-icon">✓</div>
                    <h3 class="feature-title">Gestión Inteligente</h3>
                    <p class="feature-text">Organiza tus tareas con prioridades, categorías y recordatorios inteligentes.</p>
                </div>
                <div class="feature-card">
                    <div class="feature-icon">⏱</div>
                    <h3 class="feature-title">Seguimiento de Tiempo</h3>
                    <p class="feature-text">Mide tu productividad con nuestro sistema integrado de seguimiento de tiempo.</p>
                </div>
                <div class="feature-card">
                    <div class="feature-icon">📲</div>
                    <h3 class="feature-title">Multiplataforma</h3>
                    <p class="feature-text">Accede a tus tareas desde cualquier dispositivo, en cualquier momento.</p>
                </div>
            </div>
        </section>
    );
};

export default Feactures;