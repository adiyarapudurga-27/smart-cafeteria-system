import React, { createContext, useContext, useState, ReactNode } from 'react';

export type UserRole = 'employee' | 'staff' | 'admin';

export interface User {
  id: string;
  role: UserRole;
  fullName: string;
  employeeId?: string;
  email?: string;
  phoneNumber?: string;
  location?: string;
  orderHistory?: string[];
}

interface AuthContextType {
  user: User | null;
  login: (user: User) => void;
  logout: () => void;
  updateLocation: (location: string) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);

  const login = (userData: User) => {
    setUser(userData);
  };

  const logout = () => {
    setUser(null);
  };

  const updateLocation = (location: string) => {
    if (user) {
      setUser({ ...user, location });
    }
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, updateLocation }}>
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
