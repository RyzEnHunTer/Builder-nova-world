import React, { createContext, useContext, useState, useEffect } from "react";

interface AdminUser {
  username: string;
  role: string;
  loginTime: Date;
}

interface AdminContextType {
  isAuthenticated: boolean;
  user: AdminUser | null;
  login: (username: string, password: string) => Promise<boolean>;
  logout: () => void;
  checkAuth: () => boolean;
}

const AdminContext = createContext<AdminContextType | undefined>(undefined);

export const useAdmin = () => {
  const context = useContext(AdminContext);
  if (context === undefined) {
    throw new Error("useAdmin must be used within an AdminProvider");
  }
  return context;
};

interface AdminProviderProps {
  children: React.ReactNode;
}

export const AdminProvider: React.FC<AdminProviderProps> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<AdminUser | null>(null);

  // Admin credentials - In production, these should be in environment variables or database
  const ADMIN_CREDENTIALS = {
    username: "admin",
    password: "dreamworld2024",
    role: "Administrator",
  };

  // Alternative admin account
  const OWNER_CREDENTIALS = {
    username: "owner",
    password: "beautyparlour123",
    role: "Owner",
  };

  useEffect(() => {
    // Check if user is already authenticated
    const savedAuth = sessionStorage.getItem("dreamworld-admin-session");
    if (savedAuth) {
      try {
        const authData = JSON.parse(savedAuth);
        const loginTime = new Date(authData.loginTime);
        const now = new Date();
        const hoursSinceLogin =
          (now.getTime() - loginTime.getTime()) / (1000 * 60 * 60);

        // Session expires after 8 hours
        if (hoursSinceLogin < 8) {
          setIsAuthenticated(true);
          setUser(authData.user);
        } else {
          // Session expired, clear it
          sessionStorage.removeItem("dreamworld-admin-session");
        }
      } catch (error) {
        console.error("Error parsing saved auth:", error);
        sessionStorage.removeItem("dreamworld-admin-session");
      }
    }
  }, []);

  const login = async (
    username: string,
    password: string,
  ): Promise<boolean> => {
    // Simulate API call delay
    await new Promise((resolve) => setTimeout(resolve, 500));

    let validCredentials = null;

    if (
      username === ADMIN_CREDENTIALS.username &&
      password === ADMIN_CREDENTIALS.password
    ) {
      validCredentials = ADMIN_CREDENTIALS;
    } else if (
      username === OWNER_CREDENTIALS.username &&
      password === OWNER_CREDENTIALS.password
    ) {
      validCredentials = OWNER_CREDENTIALS;
    }

    if (validCredentials) {
      const adminUser: AdminUser = {
        username: validCredentials.username,
        role: validCredentials.role,
        loginTime: new Date(),
      };

      setIsAuthenticated(true);
      setUser(adminUser);

      // Save session
      const sessionData = {
        user: adminUser,
        loginTime: adminUser.loginTime.toISOString(),
      };
      sessionStorage.setItem(
        "dreamworld-admin-session",
        JSON.stringify(sessionData),
      );

      return true;
    }

    return false;
  };

  const logout = () => {
    setIsAuthenticated(false);
    setUser(null);
    sessionStorage.removeItem("dreamworld-admin-session");
  };

  const checkAuth = (): boolean => {
    return isAuthenticated && user !== null;
  };

  const contextValue: AdminContextType = {
    isAuthenticated,
    user,
    login,
    logout,
    checkAuth,
  };

  return (
    <AdminContext.Provider value={contextValue}>
      {children}
    </AdminContext.Provider>
  );
};
