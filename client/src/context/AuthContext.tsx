import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from 'react';
import { useNavigate } from 'react-router-dom';

interface AuthContextType {
  user: { username: string; admin: boolean } | null;
  login: (username: string, admin: boolean, token: string) => void;
  logout: () => void;
  isAdmin: boolean;
  token: string | null;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<{ username: string; admin: boolean } | null>(
    null
  );
  const [token, setToken] = useState<string | null>(() =>
    sessionStorage.getItem('token')
  );

  const navigate = useNavigate();

  const login = (username: string, admin: boolean, token: string) => {
    setUser({ username, admin });
    setToken(token);

    sessionStorage.setItem('token', token); // Store token in sessionStorage
    sessionStorage.setItem(
      'user',
      JSON.stringify({ username, admin }) // Optional: store user details for quick access
    );

    if (admin) {
      navigate('/admin');
    } else {
      navigate('/orderhistory');
    }
  };

  const logout = () => {
    setUser(null);
    setToken(null);

    sessionStorage.removeItem('token');
    sessionStorage.removeItem('user');

    navigate('/');
  };

  useEffect(() => {
    const token = sessionStorage.getItem('token');

    if (token) {
      const userData = JSON.parse(sessionStorage.getItem('user') || '{}');
      setUser(userData);
    }
  }, []);

  const isAdmin = user?.admin || false;

  return (
    <AuthContext.Provider value={{ user, login, logout, isAdmin, token }}>
      {children}
    </AuthContext.Provider>
  );
};

// export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
//   const [user, setUser] = useState<{ username: string; admin: boolean } | null>(
//     () => {
//       const storedUser = localStorage.getItem('user'); // Hämta användaren från localStorage
//       return storedUser ? JSON.parse(storedUser) : null;
//     }
//   );

//   const navigate = useNavigate();

//   const login = (username: string, admin: boolean) => {
//     const userData = { username, admin };
//     setUser(userData);
//     localStorage.setItem('user', JSON.stringify(userData)); // Spara användaren i localStorage

//     if (admin) {
//       navigate('/admin'); // Vidarebefordra till admin-sidan
//     } else {
//       navigate('/orderhistory'); // Vidarebefordra till en vanlig användarsida
//     }
//   };

//   const logout = () => {
//     setUser(null);
//     localStorage.removeItem('user'); // Ta bort användaren från localStorage
//     navigate('/'); // Tillbaka till startsidan vid utloggning
//   };

//   const isAdmin = user?.admin || false;

//   useEffect(() => {
//     const storedUser = localStorage.getItem('user');
//     if (storedUser) {
//       setUser(JSON.parse(storedUser)); // Återställ användaren från localStorage vid sidladdning
//     }
//   }, []);

//   return (
//     <AuthContext.Provider value={{ user, login, logout, isAdmin }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
