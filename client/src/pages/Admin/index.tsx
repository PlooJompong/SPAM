import React, { useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';

const AdminPage: React.FC = () => {
  const { isAdmin, logout, token } = useAuth();

  if (!isAdmin) {
    return <p>Du har inte åtkomst till denna sida.</p>;
  }

  useEffect(() => {
    showUsers();
  });

  const showUsers = () => {
    if (!token) {
      console.error('Ingen token tillgänglig');
      return;
    }

    fetch('http://localhost:8000/users', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`, // Use token from context
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Fel: ${response.statusText}`);
        }
        return response.json();
      })
      .then((data) => {
        console.log('Users:', data);
      })
      .catch((error) => {
        console.error('Error fetching users:', error);
      });
  };

  return (
    <div>
      <h1>Välkommen till Admin-sidan!</h1>

      <button
        onClick={logout}
        className="bg-red-500 text-white py-2 px-4 rounded"
      >
        Logga ut
      </button>
    </div>
  );
};

export default AdminPage;
