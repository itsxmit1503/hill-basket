import React, { createContext, useContext, useEffect, useState } from 'react';

export interface User {
  id: string;
  email: string;
  name: string;
  role: 'admin' | 'user';
  address?: string;
  phone?: string;
  dob?: string;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  signup: (name: string, email: string, password: string) => Promise<boolean>;
  updateUser: (data: Partial<User>) => Promise<boolean>;
  logout: () => void;
  isAuthenticated: boolean;
  isAdmin: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const ADMIN_CREDENTIALS = {
  email: 'admin@1234gmail.com',
  password: 'admin@1234'
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(() => {
    try {
      const saved = localStorage.getItem('user');
      return saved ? JSON.parse(saved) : null;
    } catch (e) {
      console.error('Error parsing user from localStorage', e);
      return null;
    }
  });

  useEffect(() => {
    if (user) {
      localStorage.setItem('user', JSON.stringify(user));
    } else {
      localStorage.removeItem('user');
    }
  }, [user]);

  const login = async (email: string, password: string): Promise<boolean> => {
    // Mock API call
    if (email === ADMIN_CREDENTIALS.email && password === ADMIN_CREDENTIALS.password) {
      setUser({ id: 'admin-1', email, name: 'Admin User', role: 'admin' });
      return true;
    }
    
    // Simple mock logic for other users
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const foundUser = users.find((u: any) => u.email === email && u.password === password);
    
    if (foundUser) {
      setUser({ id: foundUser.id, email: foundUser.email, name: foundUser.name, role: 'user', phone: foundUser.phone, dob: foundUser.dob });
      return true;
    }
    
    return false;
  };

  const signup = async (name: string, email: string, password: string): Promise<boolean> => {
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    if (users.some((u: any) => u.email === email)) return false;
    
    const newUser = { id: Math.random().toString(36).substr(2, 9), name, email, password };
    users.push(newUser);
    localStorage.setItem('users', JSON.stringify(users));
    
    setUser({ id: newUser.id, email: newUser.email, name: newUser.name, role: 'user' });
    return true;
  };

  const updateUser = async (data: Partial<User>): Promise<boolean> => {
    if (!user) return false;
    
    const updatedUser = { ...user, ...data };
    setUser(updatedUser);
    
    // Update in "database" (localStorage)
    if (user.role !== 'admin') {
      const users = JSON.parse(localStorage.getItem('users') || '[]');
      const updatedUsers = users.map((u: any) => u.id === user.id ? { ...u, ...data } : u);
      localStorage.setItem('users', JSON.stringify(updatedUsers));
    }
    
    return true;
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ 
      user, 
      login, 
      signup, 
      updateUser,
      logout, 
      isAuthenticated: !!user,
      isAdmin: user?.role === 'admin'
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within an AuthProvider');
  return context;
};
