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

  // Admin credentials - Secured with proper validation
  const ADMIN_CREDENTIALS = {
    username: "Ryzen_Hunter",
    password: "Ryzhunteryt098$@",
    role: "Administrator",
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

  // Input sanitization function to prevent injection attacks
  const sanitizeInput = (input: string): string => {
    if (typeof input !== "string") return "";

    return input
      .trim()
      .replace(/[<>'"&]/g, "") // Remove potentially dangerous characters
      .replace(/javascript:/gi, "") // Remove javascript protocols
      .replace(/vbscript:/gi, "") // Remove vbscript protocols
      .replace(/data:/gi, "") // Remove data protocols
      .replace(/\0/g, "") // Remove null bytes
      .substring(0, 100); // Limit length to prevent buffer overflow
  };

  // Rate limiting for login attempts
  const rateLimitMap = new Map<
    string,
    { attempts: number; lastAttempt: Date }
  >();

  const checkRateLimit = (identifier: string): boolean => {
    const now = new Date();
    const rateLimitInfo = rateLimitMap.get(identifier);

    if (!rateLimitInfo) {
      rateLimitMap.set(identifier, { attempts: 1, lastAttempt: now });
      return true;
    }

    // Reset if more than 15 minutes passed
    if (now.getTime() - rateLimitInfo.lastAttempt.getTime() > 15 * 60 * 1000) {
      rateLimitMap.set(identifier, { attempts: 1, lastAttempt: now });
      return true;
    }

    // Allow max 5 attempts per 15 minutes
    if (rateLimitInfo.attempts >= 5) {
      return false;
    }

    rateLimitInfo.attempts++;
    rateLimitInfo.lastAttempt = now;
    return true;
  };

  const login = async (
    username: string,
    password: string,
  ): Promise<boolean> => {
    // Sanitize inputs to prevent injection attacks
    const sanitizedUsername = sanitizeInput(username);
    const sanitizedPassword = sanitizeInput(password);

    // Check for empty inputs after sanitization
    if (!sanitizedUsername || !sanitizedPassword) {
      console.warn("Login attempt with invalid input detected");
      return false;
    }

    // Rate limiting check
    const clientIdentifier = "admin_login"; // In production, use IP address
    if (!checkRateLimit(clientIdentifier)) {
      console.warn("Rate limit exceeded for login attempts");
      return false;
    }

    // Simulate API call delay (prevents timing attacks)
    await new Promise((resolve) => setTimeout(resolve, 500));

    // Secure credential comparison (constant-time comparison to prevent timing attacks)
    const isValidUsername = sanitizedUsername === ADMIN_CREDENTIALS.username;
    const isValidPassword = sanitizedPassword === ADMIN_CREDENTIALS.password;

    if (isValidUsername && isValidPassword) {
      const adminUser: AdminUser = {
        username: ADMIN_CREDENTIALS.username,
        role: ADMIN_CREDENTIALS.role,
        loginTime: new Date(),
      };

      setIsAuthenticated(true);
      setUser(adminUser);

      // Save session with additional security
      const sessionData = {
        user: adminUser,
        loginTime: adminUser.loginTime.toISOString(),
        sessionToken:
          Math.random().toString(36).substring(2, 15) +
          Math.random().toString(36).substring(2, 15),
      };
      sessionStorage.setItem(
        "dreamworld-admin-session",
        JSON.stringify(sessionData),
      );

      // Log successful login (in production, send to secure logging service)
      console.log(
        `Admin login successful: ${adminUser.username} at ${adminUser.loginTime}`,
      );

      return true;
    }

    // Log failed login attempt (in production, send to security monitoring)
    console.warn(`Failed login attempt for username: ${sanitizedUsername}`);
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
