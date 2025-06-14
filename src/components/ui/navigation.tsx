import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "./button";
import { Sheet, SheetContent, SheetTrigger } from "./sheet";
import { Menu, X, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const navigation = [
    { name: "Home", href: "/" },
    { name: "About Us", href: "/about" },
    { name: "Gallery", href: "/gallery" },
    { name: "Contact", href: "/contact" },
  ];

  const isActive = (href: string) => {
    return location.pathname === href;
  };

  return (
    <nav className="sticky top-0 z-50 w-full border-b bg-white/90 backdrop-blur-md">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-rose-400 to-rose-500">
              <Sparkles className="h-5 w-5 text-white" />
            </div>
            <div className="flex flex-col">
              <span className="text-lg font-bold text-rose-800">
                Dream World
              </span>
              <span className="text-xs text-rose-600 -mt-1">
                Beauty Parlour
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex md:items-center md:space-x-8">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className={cn(
                  "px-3 py-2 text-sm font-medium transition-colors hover:text-rose-600",
                  isActive(item.href)
                    ? "text-rose-600 border-b-2 border-rose-400"
                    : "text-gray-700",
                )}
              >
                {item.name}
              </Link>
            ))}
            <Button className="bg-gradient-to-r from-rose-500 to-rose-600 hover:from-rose-600 hover:to-rose-700">
              Book Appointment
            </Button>
            <Link to="/admin/login">
              <Button
                variant="outline"
                size="sm"
                className="ml-2 border-gray-300 text-gray-600 hover:bg-gray-50"
              >
                Admin
              </Button>
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Menu className="h-6 w-6" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-80">
                <div className="flex flex-col space-y-4 pt-8">
                  {navigation.map((item) => (
                    <Link
                      key={item.name}
                      to={item.href}
                      onClick={() => setIsOpen(false)}
                      className={cn(
                        "px-4 py-3 text-lg font-medium transition-colors hover:text-rose-600",
                        isActive(item.href)
                          ? "text-rose-600 bg-rose-50 rounded-lg"
                          : "text-gray-700",
                      )}
                    >
                      {item.name}
                    </Link>
                  ))}
                  <Button
                    className="mt-6 bg-gradient-to-r from-rose-500 to-rose-600 hover:from-rose-600 hover:to-rose-700"
                    onClick={() => setIsOpen(false)}
                  >
                    Book Appointment
                  </Button>
                  <Link to="/admin/login" onClick={() => setIsOpen(false)}>
                    <Button
                      variant="outline"
                      className="mt-2 w-full border-gray-300 text-gray-600 hover:bg-gray-50"
                    >
                      Admin Portal
                    </Button>
                  </Link>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
