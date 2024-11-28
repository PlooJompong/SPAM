
import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

interface AuthContextType {
  user: { username: string; admin: boolean } | null;
  login: (username: string, admin: boolean) => void;
  logout: () => void;
  isAdmin: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<{ username: string; admin: boolean } | null>(() => {
    const storedUser = localStorage.getItem('user'); // Hämta användaren från localStorage
    return storedUser ? JSON.parse(storedUser) : null;
  });

  const navigate = useNavigate();

  const login = (username: string, admin: boolean) => {
    const userData = { username, admin };
    setUser(userData);
    localStorage.setItem('user', JSON.stringify(userData)); // Spara användaren i localStorage

    if (admin) {
      navigate('/admin'); // Vidarebefordra till admin-sidan
    } else {
      navigate('/orderhistory'); // Vidarebefordra till en vanlig användarsida
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user'); // Ta bort användaren från localStorage
    navigate('/'); // Tillbaka till startsidan vid utloggning
  };

  const isAdmin = user?.admin || false;

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser)); // Återställ användaren från localStorage vid sidladdning
    }
  }, []);

  return (
    <AuthContext.Provider value={{ user, login, logout, isAdmin }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
