import React from 'react';

const Hero = () => {
    return (
        <section class="hero">
            <div class="hero-content">
                <h1 class="hero-title">Organiza tu vida con nuestro To-Do List Inteligente</h1>
                <p class="hero-text">Simplifica tu día a día, prioriza tus tareas y alcanza tus metas con nuestra herramienta de productividad todo en uno. ¡La organización nunca fue tan fácil!</p>
                <button class="cta-btn">Comenzar Gratis</button>
            </div>
            <div class="hero-image">
                <img src="https://images.unsplash.com/photo-1611224923853-80b023f02d71?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80" alt="Task Management Interface" />
            </div>
        </section>
    );
};

export default Hero;