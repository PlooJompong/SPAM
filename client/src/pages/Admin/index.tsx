import React from 'react';
import { useAuth } from '../../context/AuthContext';

const AdminPage: React.FC = () => {
  const { isAdmin, logout } = useAuth();

  if (!isAdmin) {
    return <p>Du har inte åtkomst till denna sida.</p>;
  }

  return (
    <div>
      <h1>Välkommen till Admin-sidan!</h1>
      <button onClick={logout} className="bg-red-500 text-white py-2 px-4 rounded">
        Logga ut
      </button>
    </div>
  );
};

export default AdminPage;
