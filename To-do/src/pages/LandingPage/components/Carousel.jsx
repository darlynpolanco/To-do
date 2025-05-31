import React, { useState, useEffect, useRef } from "react";

const Carousel = () => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const trackRef = useRef(null);
    const intervalRef = useRef(null);

    const slides = [
        {
            title: "¡La mejor app de tareas!",
            text: "TaskMaster ha transformado completamente mi productividad. Ahora nunca olvido mis tareas importantes.",
            author: "María González",
        },
        {
            title: "Simple y efectiva",
            text: "La interfaz es intuitiva y fácil de usar. ¡Justo lo que necesitaba para organizar mi día!",
            author: "Juan Pérez",
        },
        {
            title: "Imprescindible",
            text: "Desde que uso TaskMaster, mi estrés ha disminuido notablemente. Totalmente recomendada.",
            author: "Ana Sánchez",
        },
    ];

    const numSlides = slides.length;

    const moveToSlide = (index) => {
        setCurrentIndex(index);
    };

    // Iniciar autoplay
    const startAutoPlay = () => {
        intervalRef.current = setInterval(() => {
            setCurrentIndex((prev) => (prev + 1) % numSlides);
        }, 3000);
    };

    // Pausar autoplay
    const pauseAutoPlay = () => {
        clearInterval(intervalRef.current);
    };

    useEffect(() => {
        startAutoPlay();
        return () => {
            clearInterval(intervalRef.current);
        };
    }, []);

    useEffect(() => {
        if (trackRef.current) {
            trackRef.current.style.transform = `translateX(-${currentIndex * 100}%)`;
        }
    }, [currentIndex]);

    return (
        <section className="carousel-section">
            <h2 className="section-title">Testimonios de Usuarios</h2>
            <div
                className="carousel-container"
                onMouseEnter={pauseAutoPlay}
                onMouseLeave={startAutoPlay}
            >
                <div className="carousel-track" ref={trackRef}>
                    {slides.map((slide, index) => (
                        <div className="carousel-slide" key={index}>
                            <h3>{slide.title}</h3>
                            <p>"{slide.text}"</p>
                            <p>- {slide.author}</p>
                        </div>
                    ))}
                </div>

                <button
                    className="carousel-nav carousel-prev"
                    onClick={() =>
                        setCurrentIndex((prev) => (prev - 1 + numSlides) % numSlides)
                    }
                >
                    &#10094;
                </button>
                <button
                    className="carousel-nav carousel-next"
                    onClick={() =>
                        setCurrentIndex((prev) => (prev + 1) % numSlides)
                    }
                >
                    &#10095;
                </button>

                <div className="carousel-dots">
                    {slides.map((_, index) => (
                        <button
                            key={index}
                            className={`carousel-dot ${currentIndex === index ? "active" : ""}`}
                            onClick={() => moveToSlide(index)}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Carousel;