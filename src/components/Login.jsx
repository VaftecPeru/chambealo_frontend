import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await fetch('http://localhost:8000/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify({
          email: email.toLowerCase().trim(),
          password: password
        }),
      });
      
      const data = await response.json();
      console.log('Login Response:', data);

      if (!response.ok) {
        throw new Error(data.message || 'Error en el login');
      }

      // ✅ Login exitoso
      console.log('✅ Login exitoso');
      localStorage.setItem('access_token', data.access_token);
      localStorage.setItem('refresh_token', data.refresh_token);
      localStorage.setItem('currentUser', JSON.stringify(data.user));
      
      navigate('/');
      setTimeout(() => window.location.reload(), 100);

    } catch (error) {
      console.error('❌ Error en login:', error);
      setError(error.message || 'Error al conectar con el servidor');
    } finally {
      setLoading(false);
    }
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
              disabled={loading}
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
              disabled={loading}
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
              disabled={loading}
              className="bg-orange-600 hover:bg-orange-700 text-white font-semibold px-12 py-3 rounded-full transition-colors disabled:bg-orange-400 disabled:cursor-not-allowed"
            >
              {loading ? 'Cargando...' : 'Sign in'}
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