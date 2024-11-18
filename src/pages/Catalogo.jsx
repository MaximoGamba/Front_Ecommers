import { useEffect, useState } from 'react'; 
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../components/AuthProvider'; 

function Catalogo() {
  const [categorias, setCategorias] = useState([]);
  const [error, setError] = useState(null); 
  const navigate = useNavigate(); 
  const { auth } = useAuth(); 

  useEffect(() => {
    const obtenerCategorias = async () => {
      try {
        const res = await fetch('http://localhost:4002/categorias/ObtenerCategorias');
        if (!res.ok) throw new Error('Error al obtener categorías.');
        const data = await res.json();
        setCategorias(data);
      } catch (err) {
        setError(err.message);
        console.error('Error al obtener categorías:', err);
      }
    };
    obtenerCategorias();
  }, []);

  const handleVerProducto = (productoId) => {
    if (auth.role === 'USER') { 
      navigate(`/producto/${productoId}`);
    } else {
      alert('Necesitas ser un usuario con rol USER para ver este producto.');
      navigate('/login');
    }
  };

  if (error) return <p className="text-danger">Error: {error}</p>;

  return (
    <div className="container mt-5">
      {/* Barra de navegación con botones de acceso rápido */}
      <div className="d-flex justify-content-end gap-2 mb-4">
        <button onClick={() => navigate('/')} className="btn btn-outline-primary">Inicio</button>
        <button onClick={() => navigate('/login')} className="btn btn-outline-secondary">Iniciar Sesión</button>
        <button onClick={() => navigate('/register')} className="btn btn-outline-secondary">Registrarse</button>
      </div>

      <h1 className="text-center">Catálogo de Productos</h1>
      <div className="row">
        {categorias.map(cat => (
          <div key={cat.id} className="col-md-4 mb-4">
            <div className="card">
              <div className="card-body">
                <h3 className="card-title">{cat.nombre}</h3>
                <div>
                  {cat.catalogo
                    .filter((prod) => prod.stock >= 1) 
                    .map((prod) => (
                      <div key={prod.id} className="mb-3">
                        <h4 className="card-subtitle mb-2">{prod.titulo}</h4>
                        <p className="card-text">{prod.descripcion}</p>
                        <p className="font-weight-bold">${prod.precio}</p>
                        {auth.role === 'USER' && ( 
                          <button 
                            onClick={() => handleVerProducto(prod.id)} 
                            className="btn btn-primary"
                          >
                            Ver Producto
                          </button>
                        )}
                      </div>
                    ))}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      {auth.role === 'USER' && ( 
        <div className="text-center mt-4">
          <button onClick={() => navigate('/filtrado')} className="btn btn-secondary">
            Ir a filtrado
          </button>
        </div>
      )}
    </div>
  );
}

export default Catalogo;

