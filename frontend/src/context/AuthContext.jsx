import React, { createContext, useState, useEffect } from "react";

// Tạo Context
export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  // Khi web vừa load, kiểm tra xem trước đó đã đăng nhập chưa
  useEffect(() => {
    const storedAdmin = localStorage.getItem("adminUser");
    if (storedAdmin) {
      setUser(JSON.parse(storedAdmin));
    }
  }, []);

  // Hàm gọi khi đăng nhập thành công
  const login = (userData) => {
    setUser(userData);
    localStorage.setItem("adminUser", JSON.stringify(userData)); // Lưu tạm để giữ phiên
  };

  // Hàm gọi khi đăng xuất
  const logout = () => {
    setUser(null);
    localStorage.removeItem("adminUser");
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
