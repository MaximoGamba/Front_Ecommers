import React from 'react';
import { useNavigate } from 'react-router-dom';
import '@/components/Styles/Home.css';

function Home() {
  const browse = useNavigate();

  // Funciones para manejar los clics en los botones
  const handleLogin = () => browse('/login');
  const handleRegister = () => browse('/register');
  const handleHelp =() => browse('/formularioErrores');

  return (
    <div className="home">
      {/* Barra de navegación */}
      <nav className="navbar navbar-expand-lg navbar-light custom-navbar">
        <div className="container-fluid">
          {/* Logo y nombre */}
          <a className="navbar-brand d-flex align-items-center" href="/">
            <img src="/path-to-logo.png" alt="Logo" className="logo me-2" />
            <span className="brand-name">Gambaro</span>
          </a>

          {/* Botón de toggle para vista móvil */}
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          {/* Elementos colapsables en vista móvil */}
          <div className="collapse navbar-collapse" id="navbarNav">
            {/* Buscador de productos */}
            <form className="d-flex mx-auto" role="search">
              <input
                className="form-control me-2"
                type="search"
                placeholder="Buscar productos..."
                aria-label="Buscar"
              />
              <button className="btn custom-btn" type="submit">
                Buscar
              </button>
            </form>

            {/* Botones de inicio de sesión y registro */}
            <div className="d-flex ms-auto">
              <button onClick={handleLogin} className="btn custom-btn me-3">
                Iniciar sesión
              </button>
              <button onClick={handleRegister} className="btn custom-btn">
                Registrarse
              </button>
              <button onClick={handleHelp} className="btn btn-help">
                Ayuda
                </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Contenido principal de la página de bienvenida */}
      <div className="home-content text-center">
        <h1>Bienvenido a Gambaro</h1>
        <p>Encuentra los mejores muebles de madera para tu hogar.</p>
      </div>
    </div>
  );
}

export default Home;


