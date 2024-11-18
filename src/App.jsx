import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import Home from './pages/Home';
import Catalogo from './pages/Catalogo';
import Login from './pages/Login';
import Register from './pages/Register';
import Carrito from './pages/Carrito';
import AdminProductos from './pages/AdminProductos';
import Filtrado from './pages/Filtrado';
import Producto from './pages/Producto';
import Navbar from './components/Navbar';
import PedidosUser from './pages/PedidosUser';
import CrearProducto from './pages/CrearProducto';
import ProductoAdmin from './pages/ProductoAdmin';
import PedidosAdmin from './pages/PedidosAdmin';
import FormularioErrores from './pages/FormularioErrores';
import { AuthProvider, useAuth } from './components/AuthProvider';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

function App() {
  return (
    <AuthProvider>
      <Router>
        <AppContent />
      </Router>
    </AuthProvider>
  );
}

function AppContent() {
  const { auth, logout } = useAuth();
  const location = useLocation();

  const hideNavbarPaths = ['/', '/login', '/register']; 

  useEffect(() => {
    const rootElement = document.getElementById('root');
    if (location.pathname === '/login') {
      rootElement.className = 'login-page';
    } else if (location.pathname === '/') {
      rootElement.className = 'home';
    } else {
      rootElement.className = 'not-login-page';
    }
  }, [location]);

  return (
    <>
      {!hideNavbarPaths.includes(location.pathname) && (
        <Navbar isAuthenticated={!!auth.token} onLogout={logout} />
      )}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/catalogo" element={<Catalogo />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/carrito" element={<Carrito />} />
        <Route path="/admin" element={<AdminProductos />} />
        <Route path="/filtrado" element={<Filtrado />} />
        <Route path="/producto/:id" element={<Producto />} />
        <Route path="/pedidosUser" element={<PedidosUser />} />
        <Route path="/crearProducto" element={<CrearProducto />} />
        <Route path="/productoAdmin/:id" element={<ProductoAdmin />} />
        <Route path="/pedidosAdmin" element={<PedidosAdmin />} />
        <Route path="/formularioErrores" element={<FormularioErrores />} />
      </Routes>
    </>
  );
}

export default App;