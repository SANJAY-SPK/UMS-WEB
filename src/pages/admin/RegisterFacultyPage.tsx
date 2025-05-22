
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "@/components/layout/Navbar";
import { Sidebar } from "@/components/layout/Sidebar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "@/components/ui/sonner";
import { UserPlus, User } from "lucide-react";

const RegisterFacultyPage = () => {
  const navigate = useNavigate();
  const [adminName] = useState("Admin User");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    facultyId: "",
    department: "",
    password: "",
    confirmPassword: "",
  });

  // Available departments
  const departments = [
    "Computer Science",
    "Information Technology",
    "Electrical Engineering",
    "Mechanical Engineering",
    "Civil Engineering",
    "Mathematics",
    "Physics",
    "Chemistry",
  ];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (value: string) => {
    setFormData((prev) => ({ ...prev, department: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Form validation
    if (!formData.name || !formData.email || !formData.facultyId || !formData.department || !formData.password) {
      toast.error("Please fill in all required fields");
      return;
    }
    
    // Password validation
    if (formData.password.length < 6) {
      toast.error("Password must be at least 6 characters long");
      return;
    }
    
    if (formData.password !== formData.confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }
    
    // Email validation
    if (!formData.email.includes("@")) {
      toast.error("Please enter a valid email address");
      return;
    }
    
    // Success message
    toast.success("Faculty member registered successfully!");
    
    // Redirect to faculty management page
    setTimeout(() => {
      navigate("/admin/faculty");
    }, 1500);
  };

  // Generate random faculty ID
  const generateFacultyId = () => {
    const prefix = "FAC";
    const randomNum = Math.floor(1000 + Math.random() * 9000);
    setFormData((prev) => ({ ...prev, facultyId: `${prefix}${randomNum}` }));
  };

  // Generate random password
  const generatePassword = () => {
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*";
    let password = "";
    for (let i = 0; i < 10; i++) {
      password += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    setFormData((prev) => ({ 
      ...prev, 
      password: password,
      confirmPassword: password
    }));
  };

  // Sidebar items
  const sidebarItems = [
    {
      title: "Register Faculty",
      href: "/admin/faculty/register",
      icon: UserPlus,
    },
    {
      title: "Manage Faculty",
      href: "/admin/faculty",
      icon: User,
    },
    {
      title: "Manage Students",
      href: "/admin/students",
      icon: User,
    },
  ];

  return (
    <>
      <Navbar userType="admin" userName={adminName} />
      
      <div className="flex min-h-screen bg-light">
        <Sidebar items={sidebarItems} />
        
        <div className="flex-1 p-6">
          <div className="mb-8">
            <h1 className="text-3xl font-bold">Register Faculty</h1>
            <p className="text-secondary mt-2">Add a new faculty member to the system</p>
          </div>
          
          <Card className="max-w-2xl mx-auto">
            <CardHeader>
              <CardTitle>Faculty Registration Form</CardTitle>
              <CardDescription>
                Enter faculty member details to register them in the system
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name <span className="text-red-500">*</span></Label>
                  <Input
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="e.g., Dr. John Doe"
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="email">Email Address <span className="text-red-500">*</span></Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="e.g., john.doe@university.edu"
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="department">Department <span className="text-red-500">*</span></Label>
                  <Select 
                    value={formData.department} 
                    onValueChange={handleSelectChange}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select a department" />
                    </SelectTrigger>
                    <SelectContent>
                      {departments.map((dept) => (
                        <SelectItem key={dept} value={dept}>
                          {dept}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <Label htmlFor="facultyId">Faculty ID <span className="text-red-500">*</span></Label>
                    <Button 
                      type="button" 
                      variant="outline" 
                      size="sm"
                      onClick={generateFacultyId}
                    >
                      Generate ID
                    </Button>
                  </div>
                  <Input
                    id="facultyId"
                    name="facultyId"
                    value={formData.facultyId}
                    onChange={handleChange}
                    placeholder="e.g., FAC1234"
                    required
                  />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <Label htmlFor="password">Password <span className="text-red-500">*</span></Label>
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={generatePassword}
                      >
                        Generate Password
                      </Button>
                    </div>
                    <Input
                      id="password"
                      name="password"
                      type="password"
                      value={formData.password}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="confirmPassword">Confirm Password <span className="text-red-500">*</span></Label>
                    <Input
                      id="confirmPassword"
                      name="confirmPassword"
                      type="password"
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>
                
                <div className="flex justify-end space-x-4 pt-4">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => navigate("/admin/faculty")}
                  >
                    Cancel
                  </Button>
                  <Button type="submit" className="bg-primary hover:bg-primary-dark">
                    Register Faculty
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  );
};

export default RegisterFacultyPage;
