import Header from './components/Header';
import Hero from './components/Hero';
import Feactures from './components/Features';
import Carousel from './components/Carousel';
import Pricing from './components/Pricing';
import Footer from './components/Footer';
import './assets/landing.css';

const LandingPage = () => {
    return (
        <div className="landing-page">
            <Header />
            <Hero />
            <Feactures/>
            <Carousel />
            <Pricing />
            <Footer />
        </div>
    );
};

export default LandingPage;