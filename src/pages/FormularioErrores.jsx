import React, { useState } from 'react';
import '@/components/Styles/FormularioErrores.css';

function FormularioErrores() {
  console.log("FormularioErrores cargado");  // Verifica que el componente se carga

  const [formData, setFormData] = useState({
    nombre: '',
    problematica: '',
    fotos: [],
    descripcion: '',
  });
  const [success, setSuccess] = useState(false);

  // Maneja los cambios en los campos del formulario
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Maneja la carga de fotos
  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    setFormData({ ...formData, fotos: files });
  };

  // Maneja el envío del formulario
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Formulario enviado:', formData);
    setSuccess(true); // Muestra la pantalla de éxito
  };

  console.log("Success:", success);  // Verifica el valor de success

  if (success) {
    return (
      <div className="formulario-errores">
        <div className="success-message">
          <h2>¡Gracias por ayudarnos a mejorar!</h2>
          <p>Tu problema ha sido registrado correctamente.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="formulario-errores">
      <h1>Reportar un problema</h1>
      <form onSubmit={handleSubmit} className="form">
        {/* Campo: Nombre y Apellido */}
        <div className="form-group">
          <label htmlFor="nombre">Nombre y Apellido:</label>
          <input
            type="text"
            id="nombre"
            name="nombre"
            value={formData.nombre}
            onChange={handleChange}
            required
          />
        </div>

        {/* Campo: Problemática */}
        <div className="form-group">
          <label htmlFor="problematica">Problemática:</label>
          <input
            type="text"
            id="problematica"
            name="problematica"
            value={formData.problematica}
            onChange={handleChange}
            required
          />
        </div>

        {/* Campo: Carga de fotos */}
        <div className="form-group">
          <label htmlFor="fotos">Carga de fotos:</label>
          <input
            type="file"
            id="fotos"
            name="fotos"
            onChange={handleFileChange}
            multiple
            accept="image/*"
          />
        </div>

        {/* Campo: Descripción del problema */}
        <div className="form-group">
          <label htmlFor="descripcion">Descripción del problema:</label>
          <textarea
            id="descripcion"
            name="descripcion"
            value={formData.descripcion}
            onChange={handleChange}
            rows="5"
            required
          ></textarea>
        </div>

        {/* Botón: Enviar */}
        <button type="submit" className="btn-submit">
          Enviar
        </button>
      </form>
    </div>
  );
}

export default FormularioErrores;
