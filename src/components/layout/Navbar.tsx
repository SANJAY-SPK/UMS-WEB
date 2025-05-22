
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import {
  User,
  LogOut,
  Menu,
  X,
  Bookmark,
  BookOpen,
  Calendar,
  FileEdit,
  Bell,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";

interface NavbarProps {
  userType?: "student" | "faculty" | "admin" | undefined;
  userName?: string;
}

const Navbar = ({ userType, userName = "User" }: NavbarProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    // In a real application, clear auth tokens, etc.
    navigate("/login");
  };

  const getNavLinks = () => {
    switch (userType) {
      case "student":
        return [
          { name: "Dashboard", path: "/student/dashboard", icon: BookOpen },
          { name: "Courses", path: "/student/courses", icon: Bookmark },
          { name: "Attendance", path: "/student/attendance", icon: Calendar },
        ];
      case "faculty":
        return [
          { name: "Dashboard", path: "/faculty/dashboard", icon: BookOpen },
          { name: "Assignments", path: "/faculty/assignments", icon: FileEdit },
          { name: "Attendance", path: "/faculty/attendance", icon: Calendar },
        ];
      case "admin":
        return [
          { name: "Dashboard", path: "/admin/dashboard", icon: BookOpen },
          { name: "Faculty", path: "/admin/faculty", icon: User },
          { name: "Students", path: "/admin/students", icon: User },
        ];
      default:
        return [];
    }
  };

  const navLinks = getNavLinks();

  return (
    <nav className="bg-white shadow-md w-full">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex-shrink-0 flex items-center">
              <span className="text-primary text-xl font-bold">UniManager</span>
            </Link>
          </div>

          {/* Desktop navigation */}
          <div className="hidden md:flex items-center space-x-4">
            {userType && (
              <>
                {navLinks.map((link) => (
                  <Link
                    key={link.path}
                    to={link.path}
                    className="flex items-center px-3 py-2 text-sm font-medium text-primary-dark hover:text-accent transition-colors"
                  >
                    <link.icon className="h-4 w-4 mr-1" />
                    {link.name}
                  </Link>
                ))}
                
                <Button 
                  variant="ghost" 
                  size="icon"
                  className="text-primary-dark hover:text-accent"
                >
                  <Bell className="h-5 w-5" />
                </Button>

                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button 
                      variant="ghost" 
                      className="flex items-center text-primary-dark hover:text-accent space-x-1"
                    >
                      <User className="h-5 w-5" />
                      <span>{userName}</span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-48">
                    <DropdownMenuItem asChild>
                      <Link to={`/${userType}/profile`} className="flex items-center">
                        <User className="mr-2 h-4 w-4" />
                        <span>My Profile</span>
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={handleLogout}>
                      <LogOut className="mr-2 h-4 w-4" />
                      <span>Logout</span>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </>
            )}
            
            {!userType && (
              <>
                <Link
                  to="/login"
                  className="px-4 py-2 text-sm font-medium text-primary-dark hover:text-accent"
                >
                  Login
                </Link>
                <Link
                  to="/signup"
                  className="px-4 py-2 text-sm font-medium bg-primary text-white rounded-md hover:bg-primary-dark"
                >
                  Sign Up
                </Link>
              </>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="flex items-center md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-primary hover:text-accent focus:outline-none"
            >
              {isMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {userType && navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className="flex items-center px-3 py-2 text-base font-medium text-primary-dark hover:text-accent block"
                onClick={() => setIsMenuOpen(false)}
              >
                <link.icon className="h-4 w-4 mr-2" />
                {link.name}
              </Link>
            ))}
            
            {userType && (
              <>
                <Link
                  to={`/${userType}/profile`}
                  className="flex items-center px-3 py-2 text-base font-medium text-primary-dark hover:text-accent block"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <User className="h-4 w-4 mr-2" />
                  My Profile
                </Link>
                <button
                  onClick={() => {
                    handleLogout();
                    setIsMenuOpen(false);
                  }}
                  className="flex w-full items-center px-3 py-2 text-base font-medium text-primary-dark hover:text-accent"
                >
                  <LogOut className="h-4 w-4 mr-2" />
                  Logout
                </button>
              </>
            )}
            
            {!userType && (
              <>
                <Link
                  to="/login"
                  className="block px-3 py-2 text-base font-medium text-primary-dark hover:text-accent"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Login
                </Link>
                <Link
                  to="/signup"
                  className="block px-3 py-2 text-base font-medium bg-primary text-white rounded-md hover:bg-primary-dark mx-2"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Sign Up
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
