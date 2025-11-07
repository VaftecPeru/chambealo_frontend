import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    
    // Obtener usuarios del localStorage
    const users = JSON.parse(localStorage.getItem('users')) || [];
    
    console.log('=== DEBUG LOGIN ===');
    console.log('Usuarios en localStorage:', users);
    console.log('Email que ingresaste:', email);
    console.log('Password que ingresaste:', password);
    
    // Buscar si el usuario existe
    const user = users.find(
      u => u.email.toLowerCase() === email.toLowerCase()
    );
    
    console.log('Usuario encontrado:', user);
    
    if (!user) {
      console.log('❌ Usuario NO encontrado');
      setError('Usuario no registrado');
      return;
    }
    
    console.log('Comparando passwords:');
    console.log('- Password guardado:', user.password);
    console.log('- Password ingresado:', password);
    console.log('- ¿Son iguales?:', user.password === password);
    
    if (user.password !== password) {
      console.log('❌ Contraseña incorrecta');
      setError('Contraseña incorrecta');
      return;
    }
    
    // Login exitoso
    console.log('✅ Login exitoso');
    localStorage.setItem('currentUser', JSON.stringify({ email }));
    navigate('/');
    window.location.reload(); // Esto hace que NavbarHeader se actualice
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <h1 className="text-4xl font-bold text-center text-gray-800 mb-12">
          Iniciar Sesión
        </h1>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                setError('');
              }}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent placeholder-gray-500"
              required
            />
          </div>

          <div>
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                setError('');
              }}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent placeholder-gray-500"
              required
            />
          </div>

          {error && (
            <div className="bg-red-50 border border-red-300 text-red-700 px-4 py-3 rounded-lg text-sm">
              {error}
            </div>
          )}

          <div className="text-left">
            <a href="#" className="text-teal-700 hover:text-teal-800 text-sm">
              Forgot your password?
            </a>
          </div>

          <div className="flex justify-center pt-2">
            <button
              type="submit"
              className="bg-orange-600 hover:bg-orange-700 text-white font-semibold px-12 py-3 rounded-full transition-colors"
            >
              Sign in
            </button>
          </div>

          <div className="text-center pt-2">
            <p className="text-gray-700">
              No account?{' '}
              <Link to="/RegisterPrueba" className="text-teal-700 hover:text-teal-800">
                Create one here
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}