import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '@/components/Styles/Register.css';

function Register() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    nombre: '',
    apellido: '',
    role: 'USER',
  });
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    fetch('http://localhost:4002/usuarios/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        firstname: formData.nombre,
        lastname: formData.apellido,
        email: formData.email,
        password: formData.password,
        role: formData.role,
      }),
    })
      .then((res) => {
        if (res.ok) {
          alert('Registro exitoso. Por favor, inicia sesión.');
          navigate('/login');
        } else {
          alert('Error al registrarse. Inténtalo de nuevo.');
        }
      })
      .catch((error) => {
        console.error('Error:', error);
        alert('Ocurrió un error durante la solicitud.');
      });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="register-page d-flex justify-content-center align-items-center vh-100"> {/* Aplica la clase para el fondo y centrar */}
      <div className="register-form-container p-4 shadow-lg rounded bg-white"> {/* Formulario con sombra y fondo blanco */}
        <h2 className="text-center mb-4 text-button-color">Registro</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <input
              type="text"
              name="nombre"
              placeholder="Nombre"
              value={formData.nombre}
              onChange={handleChange}
              required
              className="form-control"
            />
          </div>
          <div className="mb-3">
            <input
              type="text"
              name="apellido"
              placeholder="Apellido"
              value={formData.apellido}
              onChange={handleChange}
              required
              className="form-control"
            />
          </div>
          <div className="mb-3">
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              required
              className="form-control"
            />
          </div>
          <div className="mb-3">
            <input
              type="password"
              name="password"
              placeholder="Contraseña"
              value={formData.password}
              onChange={handleChange}
              required
              className="form-control"
            />
          </div>
          <div className="mb-3">
            <select
              name="role"
              value={formData.role}
              onChange={handleChange}
              className="form-select"
            >
              <option value="USER">Usuario</option>
              <option value="ADMIN">Vendedor</option>
            </select>
          </div>
          <button type="submit" className="btn btn-primary w-100">
            Registrarse
          </button>
        </form>
        <div className="text-center mt-3">
          <button
            onClick={() => navigate('/login')}
            className="btn btn-link styled-link"
          >
            Ya tengo una cuenta
          </button>
        </div>
      </div>
    </div>
  );
}

export default Register;



