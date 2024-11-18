import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '@/components/Styles/Login.css'; // Asegúrate de que esta ruta sea correcta

function Login() {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    fetch('http://localhost:4002/usuarios/authenticate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.access_token && data.roles) {
          navigate('/');
        } else {
          alert('Error: No se recibieron las credenciales correctas');
        }
      })
      .catch((error) => {
        console.error('Error:', error);
        alert('Ocurrió un error durante la solicitud');
      });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="login-container d-flex justify-content-center align-items-center vh-100 login-page">
      <div className="login-form p-4 shadow-lg rounded bg-white">
        <h2 className="text-center mb-4">Iniciar Sesión</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <input
              type="email"
              name="email"
              placeholder="Email"
              className="form-control"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-3">
            <input
              type="password"
              name="password"
              placeholder="Contraseña"
              className="form-control"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>
          <div className="d-flex justify-content-between gap-3 mt-4">
            <button type="submit" className="btn btn-primary w-100">Iniciar Sesión</button>
            <button type="button" className="btn btn-secondary w-100" onClick={() => navigate('/register')}>Registrarme</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
