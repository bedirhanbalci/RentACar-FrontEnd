import React, { createContext, useState, useContext, ReactNode } from "react";
import { jwtDecode } from "jwt-decode";

// Kullanıcı objesinin tip tanımı
interface User {
  sub: string;
  roles: string;
  // Diğer kullanıcı özellikleri eklenirse buraya ekleyebilirsiniz
}

// AuthContext değerinin tip tanımı
interface AuthContextValue {
  user: User | null;
  handleLogin: (token: string) => void;
  handleLogout: () => void;
}

// createContext fonksiyonu ile bir context oluşturuluyor
export const AuthContext = createContext<AuthContextValue>({
  user: null,
  handleLogin: (token: string) => {},
  handleLogout: () => {},
});

// AuthProvider bileşeni
export const AuthProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(null);

  const handleLogin = (token: string) => {
    const decodedUser = jwtDecode<User>(token);
    localStorage.setItem("userId", decodedUser.sub);
    localStorage.setItem("userRole", decodedUser.roles);
    localStorage.setItem("token", token);
    setUser(decodedUser);
  };

  const handleLogout = () => {
    localStorage.removeItem("userId");
    localStorage.removeItem("userRole");
    localStorage.removeItem("token");
    setUser(null);
  };

  // AuthContext.Provider ile değeri sağlanıyor
  return (
    <AuthContext.Provider value={{ user, handleLogin, handleLogout }}>
      {children}
    </AuthContext.Provider>
  );
};

// useAuth hook'u
export const useAuth = (): AuthContextValue => {
  return useContext(AuthContext);
};
