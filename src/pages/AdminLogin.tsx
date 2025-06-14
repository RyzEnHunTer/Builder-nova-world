import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import {
  Shield,
  Lock,
  User,
  Eye,
  EyeOff,
  Loader2,
  CheckCircle,
  AlertTriangle,
} from "lucide-react";
import { useAdmin } from "@/contexts/AdminContext";

const AdminLogin = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [attempts, setAttempts] = useState(0);

  const { login } = useAdmin();
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!username || !password) {
      setError("Please enter both username and password");
      return;
    }

    setIsLoading(true);
    setError("");

    try {
      const success = await login(username, password);

      if (success) {
        // Redirect to admin dashboard
        navigate("/admin");
      } else {
        setAttempts((prev) => prev + 1);
        setError("Invalid username or password");

        // Block after too many attempts
        if (attempts >= 2) {
          setError("Too many failed attempts. Please wait and try again.");
          setTimeout(() => {
            setAttempts(0);
            setError("");
          }, 30000); // 30 second cooldown
        }
      }
    } catch (error) {
      setError("Login failed. Please try again.");
    } finally {
      setIsLoading(false);
      setPassword(""); // Clear password for security
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 via-pink-50 to-purple-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-rose-400 to-rose-500">
              <Shield className="h-7 w-7 text-white" />
            </div>
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Admin Portal
          </h1>
          <p className="text-gray-600">Dream World Beauty Parlour</p>
        </div>

        {/* Login Card */}
        <Card className="shadow-2xl border-0">
          <CardHeader className="text-center pb-4">
            <CardTitle className="flex items-center justify-center gap-2 text-xl">
              <Lock className="h-5 w-5 text-rose-600" />
              Admin Login
            </CardTitle>
            <p className="text-sm text-gray-600 mt-2">
              Enter your credentials to access the admin panel
            </p>
          </CardHeader>

          <CardContent className="space-y-6">
            <form onSubmit={handleLogin} className="space-y-4">
              {/* Username Field */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">
                  Username
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    type="text"
                    placeholder="Enter your username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="pl-10"
                    disabled={isLoading || attempts >= 3}
                  />
                </div>
              </div>

              {/* Password Field */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">
                  Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="pl-10 pr-10"
                    disabled={isLoading || attempts >= 3}
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-2 top-1/2 transform -translate-y-1/2 h-8 w-8 p-0"
                    onClick={() => setShowPassword(!showPassword)}
                    disabled={isLoading}
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                  </Button>
                </div>
              </div>

              {/* Error Message */}
              {error && (
                <Alert variant="destructive">
                  <AlertTriangle className="h-4 w-4" />
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}

              {/* Login Button */}
              <Button
                type="submit"
                className="w-full bg-gradient-to-r from-rose-500 to-pink-600 hover:from-rose-600 hover:to-pink-700"
                disabled={isLoading || attempts >= 3 || !username || !password}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    Logging in...
                  </>
                ) : (
                  <>
                    <Shield className="h-4 w-4 mr-2" />
                    Login to Admin Panel
                  </>
                )}
              </Button>
            </form>

            {/* Credentials Info */}
            <div className="space-y-3 pt-4 border-t">
              <div className="bg-blue-50 p-4 rounded-lg">
                <h4 className="font-semibold text-blue-800 mb-2 flex items-center gap-2">
                  <CheckCircle className="h-4 w-4" />
                  Default Admin Accounts
                </h4>
                <div className="text-sm text-blue-700 space-y-2">
                  <div>
                    <Badge variant="secondary" className="mr-2">
                      Admin
                    </Badge>
                    <code className="bg-white px-2 py-1 rounded text-xs">
                      admin / dreamworld2024
                    </code>
                  </div>
                  <div>
                    <Badge variant="secondary" className="mr-2">
                      Owner
                    </Badge>
                    <code className="bg-white px-2 py-1 rounded text-xs">
                      owner / beautyparlour123
                    </code>
                  </div>
                </div>
              </div>

              <div className="bg-yellow-50 p-4 rounded-lg">
                <h4 className="font-semibold text-yellow-800 mb-2">
                  🔒 Security Features
                </h4>
                <ul className="text-sm text-yellow-700 space-y-1">
                  <li>• Session expires automatically after 8 hours</li>
                  <li>• Account lockout after failed attempts</li>
                  <li>• Secure session management</li>
                  <li>• Admin activity logging</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Footer */}
        <div className="text-center mt-6 text-sm text-gray-500">
          <p>© 2024 Dream World Beauty Parlour. All rights reserved.</p>
          <p className="mt-1">Secure Admin Portal v1.0</p>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
