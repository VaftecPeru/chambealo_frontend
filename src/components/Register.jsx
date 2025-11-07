import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Register() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    
    // Validaciones
    if (password !== confirmPassword) {
      setError('Las contraseñas no coinciden');
      return;
    }
    
    if (password.length < 6) {
      setError('La contraseña debe tener al menos 6 caracteres');
      return;
    }
    
    // Obtener usuarios existentes del localStorage
    const existingUsers = JSON.parse(localStorage.getItem('users')) || [];
    
    // Verificar si el email ya está registrado
    const userExists = existingUsers.find(
      user => user.email.toLowerCase() === email.toLowerCase()
    );
    
    if (userExists) {
      setError('Este correo ya está registrado');
      return;
    }
    
    // Agregar nuevo usuario
    const newUser = { email, password };
    existingUsers.push(newUser);
    
    // Guardar en localStorage
    localStorage.setItem('users', JSON.stringify(existingUsers));
    
    setSuccess('¡Registro exitoso! Redirigiendo al login...');
    
    // Redirigir al login después de 2 segundos
    setTimeout(() => {
      navigate('/LoginPrueba');
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <h1 className="text-4xl font-bold text-center text-gray-800 mb-12">
          Registrarse
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

          <div>
            <input
              type="password"
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => {
                setConfirmPassword(e.target.value);
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

          {success && (
            <div className="bg-green-50 border border-green-300 text-green-700 px-4 py-3 rounded-lg text-sm">
              {success}
            </div>
          )}

          <div className="flex justify-center pt-2">
            <button
              type="submit"
              className="bg-orange-600 hover:bg-orange-700 text-white font-semibold px-12 py-3 rounded-full transition-colors"
            >
              Register
            </button>
          </div>

          <div className="text-center pt-2">
            <p className="text-gray-700">
              Already have an account?{' '}
              <a href="/login" className="text-teal-700 hover:text-teal-800">
                Login here
              </a>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}