import Navbar from '../../components/Navbar';
import React, { useState } from 'react';

const Login: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [admin, setAdmin] = useState(false);
  const [message, setMessage] = useState('');
  const [loginMessage, setLoginMessage] = useState('');

  // Hantera skapande av användare
  const handleCreateUser = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:8000/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password, admin }),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage('Användare skapad!');
        setUsername('');
        setPassword('');
        setAdmin(false);
      } else {
        setMessage(`Fel: ${data.message}`);
      }
    } catch (err) {
      console.error("Fel vid kommunikation med servern:", err);
      setMessage('Kunde inte ansluta till servern.');
    }
  };

  // Hantera inloggning
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:8000/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();

      if (response.ok) {
        setLoginMessage(`Välkommen, ${data.user.username}!`);
        // Reset login form
        setUsername('');
        setPassword('');
      } else {
        setLoginMessage(`Fel: ${data.message}`);
      }
    } catch (err) {
      console.error("Fel vid kommunikation med servern:", err);
      setLoginMessage('Kunde inte ansluta till servern.');
    }
  };

  return (
    <>
            <Navbar />
      <div className=" flex items-center justify-center space-x-4">
        <div style={{ marginBottom: '2rem' }} className="font-primary text-teal-900 ">
          <h2>Skapa ny användare</h2>
          <form onSubmit={handleCreateUser}>
            <div>
              <label htmlFor="username">Användarnamn:</label>
              <input
                type="text"
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                className='mb-4 mt-2 w-full border border-gray-300 p-2'
              />
            </div>
            <div>
              <label htmlFor="password">Lösenord:</label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className='mb-4 mt-2 w-full border border-gray-300 p-2'
              />
            </div>
            <button type="submit" className="bg-teal-900 text-white py-2 px-4 rounded">Skapa användare</button>
          </form>
          {message && <p>{message}</p>}
        </div>

        {/* Formulär för inloggning */}
        <div className="font-primary text-teal-900">
          <h2 >Logga in</h2>
          <form onSubmit={handleLogin}>
            <div>
              <label htmlFor="login-username">Användarnamn:</label>
              <input
                type="text"
                id="login-username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                className='mb-4 mt-2 w-full border border-gray-300 p-2'
              />
            </div>
            <div>
              <label htmlFor="login-password">Lösenord:</label>
              <input
                type="password"
                id="login-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className='mb-4 mt-2 w-full border border-gray-300 p-2'
              />
            </div>
            <button type="submit" className="bg-teal-900 text-white py-2 px-4 rounded">Logga in</button>
          </form>
          {loginMessage && <p>{loginMessage}</p>}
        </div>
      </div>
    </>
  );
};

export default Login;


