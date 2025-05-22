
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "@/components/layout/Navbar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, BookOpen, Calendar, User, Lock, Eye, EyeOff } from "lucide-react";
import { toast } from "@/components/ui/sonner";
import { Sidebar } from "@/components/layout/Sidebar";

const UpdatePasswordPage = () => {
  const navigate = useNavigate();
  const [userType] = useState<"student" | "faculty" | "admin">("student");
  const [userName] = useState("John Doe");
  const [formData, setFormData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: ""
  });
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validation
    if (!formData.currentPassword || !formData.newPassword || !formData.confirmPassword) {
      toast.error("All fields are required");
      return;
    }
    
    if (formData.newPassword.length < 8) {
      toast.error("New password must be at least 8 characters long");
      return;
    }
    
    if (formData.newPassword !== formData.confirmPassword) {
      toast.error("New password and confirm password do not match");
      return;
    }
    
    // In a real app, this would call an API to update the password
    toast.success("Password updated successfully");
    
    // Navigate back to profile after successful update
    setTimeout(() => {
      getProfilePath();
    }, 1500);
  };

  const navItems = userType === "student" 
    ? [
        { title: "Dashboard", href: "/student/dashboard", icon: BookOpen },
        { title: "Courses", href: "/student/courses", icon: BookOpen },
        { title: "Attendance", href: "/student/attendance", icon: Calendar },
      ]
    : userType === "faculty"
    ? [
        { title: "Dashboard", href: "/faculty/dashboard", icon: BookOpen },
        { title: "Assignments", href: "/faculty/assignments", icon: BookOpen },
        { title: "Attendance", href: "/faculty/attendance", icon: Calendar },
      ]
    : [
        { title: "Dashboard", href: "/admin/dashboard", icon: BookOpen },
        { title: "Faculty", href: "/admin/faculty", icon: User },
        { title: "Students", href: "/admin/students", icon: User },
      ];

  const getProfilePath = () => {
    switch (userType) {
      case "student":
        return "/student/profile";
      case "faculty":
        return "/faculty/profile";
      case "admin":
        return "/admin/profile";
      default:
        return "/";
    }
  };

  return (
    <div className="flex h-screen">
      <Sidebar items={navItems} />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Navbar userType={userType} userName={userName} />
        
        <div className="page-container flex-1 overflow-y-auto">
          <Link 
            to={getProfilePath()} 
            className="flex items-center text-accent hover:text-accent-dark mb-4 inline-block"
          >
            <ArrowLeft size={16} className="mr-1" />
            Back to Profile
          </Link>

          <h1 className="text-3xl font-bold mb-2">Update Password</h1>
          <p className="text-secondary mb-8">Change your account password</p>

          <div className="max-w-md mx-auto">
            <Card className="shadow-md">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Lock className="mr-2 h-5 w-5" />
                  Password Settings
                </CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="currentPassword">Current Password</Label>
                    <div className="relative">
                      <Input
                        id="currentPassword"
                        name="currentPassword"
                        type={showCurrentPassword ? "text" : "password"}
                        value={formData.currentPassword}
                        onChange={handleChange}
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                        onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                      >
                        {showCurrentPassword ? (
                          <EyeOff className="h-4 w-4 text-secondary" />
                        ) : (
                          <Eye className="h-4 w-4 text-secondary" />
                        )}
                      </Button>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="newPassword">New Password</Label>
                    <div className="relative">
                      <Input
                        id="newPassword"
                        name="newPassword"
                        type={showNewPassword ? "text" : "password"}
                        value={formData.newPassword}
                        onChange={handleChange}
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                        onClick={() => setShowNewPassword(!showNewPassword)}
                      >
                        {showNewPassword ? (
                          <EyeOff className="h-4 w-4 text-secondary" />
                        ) : (
                          <Eye className="h-4 w-4 text-secondary" />
                        )}
                      </Button>
                    </div>
                    <p className="text-xs text-secondary">
                      Password must be at least 8 characters long
                    </p>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="confirmPassword">Confirm New Password</Label>
                    <div className="relative">
                      <Input
                        id="confirmPassword"
                        name="confirmPassword"
                        type={showConfirmPassword ? "text" : "password"}
                        value={formData.confirmPassword}
                        onChange={handleChange}
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      >
                        {showConfirmPassword ? (
                          <EyeOff className="h-4 w-4 text-secondary" />
                        ) : (
                          <Eye className="h-4 w-4 text-secondary" />
                        )}
                      </Button>
                    </div>
                  </div>
                  
                  <div className="flex justify-between pt-4">
                    <Link to={getProfilePath()}>
                      <Button 
                        type="button" 
                        variant="outline"
                      >
                        Cancel
                      </Button>
                    </Link>
                    
                    <Button 
                      type="submit"
                      className="bg-primary hover:bg-primary-dark"
                    >
                      Update Password
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpdatePasswordPage;
