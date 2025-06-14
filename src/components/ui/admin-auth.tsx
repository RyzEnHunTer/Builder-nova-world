import { useState, useEffect } from "react";
import { Button } from "./button";
import { Input } from "./input";
import { Card, CardContent, CardHeader, CardTitle } from "./card";
import { Badge } from "./badge";
import { Dialog, DialogContent, DialogTitle } from "./dialog";
import { Lock, Eye, EyeOff, Shield, LogOut } from "lucide-react";

interface AdminAuthProps {
  children: React.ReactNode;
  onAuthChange?: (isAuthenticated: boolean) => void;
}

const AdminAuth = ({ children, onAuthChange }: AdminAuthProps) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [attempts, setAttempts] = useState(0);

  // Admin password - In production, this should be environment variable or database
  const ADMIN_PASSWORD = "dreamworld2024"; // Change this to your secure password

  useEffect(() => {
    // Check if already authenticated in this session
    const savedAuth = sessionStorage.getItem("dreamworld-admin-auth");
    if (savedAuth === "true") {
      setIsAuthenticated(true);
      onAuthChange?.(true);
    }
  }, [onAuthChange]);

  const handleLogin = () => {
    if (password === ADMIN_PASSWORD) {
      setIsAuthenticated(true);
      setError("");
      setPassword("");
      setAttempts(0);
      // Save auth state for this session only
      sessionStorage.setItem("dreamworld-admin-auth", "true");
      onAuthChange?.(true);
    } else {
      setError("Incorrect password. Please try again.");
      setAttempts((prev) => prev + 1);
      setPassword("");

      // Block after too many attempts
      if (attempts >= 2) {
        setError(
          "Too many failed attempts. Please refresh the page and try again.",
        );
        setTimeout(() => {
          window.location.reload();
        }, 3000);
      }
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    sessionStorage.removeItem("dreamworld-admin-auth");
    onAuthChange?.(false);
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-[400px] flex items-center justify-center">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <div className="mx-auto mb-4 p-3 bg-rose-100 rounded-full w-fit">
              <Lock className="h-8 w-8 text-rose-600" />
            </div>
            <CardTitle className="text-2xl font-bold text-gray-900">
              Admin Access Required
            </CardTitle>
            <p className="text-gray-600">
              Enter the admin password to manage gallery images
            </p>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="relative">
              <Input
                type={showPassword ? "text" : "password"}
                placeholder="Enter admin password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && handleLogin()}
                className={error ? "border-red-500" : ""}
                disabled={attempts >= 3}
              />
              <Button
                type="button"
                variant="ghost"
                size="sm"
                className="absolute right-2 top-1/2 transform -translate-y-1/2 h-8 w-8 p-0"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? (
                  <EyeOff className="h-4 w-4" />
                ) : (
                  <Eye className="h-4 w-4" />
                )}
              </Button>
            </div>

            {error && (
              <div className="text-red-600 text-sm text-center bg-red-50 p-3 rounded-lg">
                {error}
              </div>
            )}

            <Button
              onClick={handleLogin}
              disabled={!password || attempts >= 3}
              className="w-full bg-gradient-to-r from-rose-500 to-pink-600 hover:from-rose-600 hover:to-pink-700"
            >
              <Shield className="h-4 w-4 mr-2" />
              Access Admin Panel
            </Button>

            <div className="bg-blue-50 p-4 rounded-lg">
              <h4 className="font-semibold text-blue-800 mb-2">
                🔒 Security Information
              </h4>
              <ul className="text-sm text-blue-700 space-y-1">
                <li>• Admin access is required to manage images</li>
                <li>• Session expires when you close the browser</li>
                <li>• Only authorized personnel should have this password</li>
                <li>• All admin actions are logged for security</li>
              </ul>
            </div>

            <div className="bg-yellow-50 p-4 rounded-lg">
              <h4 className="font-semibold text-yellow-800 mb-2">
                📋 Default Password
              </h4>
              <p className="text-sm text-yellow-700">
                Default password:{" "}
                <code className="bg-white px-2 py-1 rounded">
                  dreamworld2024
                </code>
                <br />
                <strong>Change this immediately in production!</strong>
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div>
      {/* Admin Header */}
      <div className="bg-rose-50 border border-rose-200 rounded-lg p-4 mb-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Badge className="bg-green-500 text-white">
              <Shield className="h-3 w-3 mr-1" />
              Admin Mode
            </Badge>
            <span className="text-sm text-gray-600">
              You are logged in as administrator
            </span>
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={handleLogout}
            className="border-rose-300 text-rose-600 hover:bg-rose-50"
          >
            <LogOut className="h-4 w-4 mr-2" />
            Logout
          </Button>
        </div>
      </div>

      {/* Admin Content */}
      {children}
    </div>
  );
};

export default AdminAuth;
