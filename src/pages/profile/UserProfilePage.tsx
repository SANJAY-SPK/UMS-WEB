
import { useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "@/components/layout/Navbar";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { User, Mail, Phone, BookOpen, Calendar, PencilLine } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Sidebar } from "@/components/layout/Sidebar";

interface UserType {
  type: "student" | "faculty" | "admin";
  details: {
    name: string;
    email: string;
    contact?: string;
    department?: string;
    rollNumber?: string;
    facultyId?: string;
    adminId?: string;
    joinDate?: string;
  };
}

const UserProfilePage = () => {
  // This would come from a context or state management in a real app
  const [user] = useState<UserType>({
    type: "student",
    details: {
      name: "John Doe",
      email: "john.doe@university.edu",
      contact: "+1 (555) 123-4567",
      department: "Computer Science",
      rollNumber: "CS2023001",
      joinDate: "2023-08-15",
    }
  });

  const navItems = user.type === "student" 
    ? [
        { title: "Dashboard", href: "/student/dashboard", icon: BookOpen },
        { title: "Courses", href: "/student/courses", icon: BookOpen },
        { title: "Attendance", href: "/student/attendance", icon: Calendar },
      ]
    : user.type === "faculty"
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

  const getProfileEditLink = () => {
    switch (user.type) {
      case "student":
        return "/student/profile/edit";
      case "faculty":
        return "/faculty/profile/edit";
      case "admin":
        return "/admin/profile/edit";
      default:
        return "/";
    }
  };

  const getProfileDetailsLink = () => {
    switch (user.type) {
      case "student":
        return "/student/profile/details";
      case "faculty":
        return "/faculty/profile/details";
      case "admin":
        return "/admin/profile/details";
      default:
        return "/";
    }
  };

  const getIdFieldName = () => {
    switch (user.type) {
      case "student":
        return "Roll Number";
      case "faculty":
        return "Faculty ID";
      case "admin":
        return "Admin ID";
      default:
        return "ID";
    }
  };

  const getIdValue = () => {
    switch (user.type) {
      case "student":
        return user.details.rollNumber;
      case "faculty":
        return user.details.facultyId;
      case "admin":
        return user.details.adminId;
      default:
        return "";
    }
  };

  return (
    <div className="flex h-screen">
      <Sidebar items={navItems} />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Navbar userType={user.type} userName={user.details.name} />
        
        <div className="page-container flex-1 overflow-y-auto">
          <h1 className="text-3xl font-bold mb-2">My Profile</h1>
          <p className="text-secondary mb-8">View and manage your profile information</p>

          <div className="flex flex-col items-center">
            <Avatar className="h-32 w-32 mb-6">
              <AvatarImage src="" alt={user.details.name} />
              <AvatarFallback className="text-4xl bg-primary text-white">
                {user.details.name.split(" ").map(n => n[0]).join("")}
              </AvatarFallback>
            </Avatar>
            
            <h2 className="text-2xl font-bold text-center">{user.details.name}</h2>
            <p className="text-secondary text-center mb-6">{user.details.email}</p>
            
            <div className="flex flex-wrap gap-4 justify-center mb-8">
              <Link to={getProfileEditLink()}>
                <Button className="bg-primary hover:bg-primary-dark">
                  <PencilLine className="mr-2 h-4 w-4" />
                  Edit Profile
                </Button>
              </Link>
              
              <Link to={getProfileDetailsLink()}>
                <Button variant="outline">
                  <User className="mr-2 h-4 w-4" />
                  View Profile Details
                </Button>
              </Link>

              <Link to="/update-password">
                <Button variant="outline" className="border-accent text-accent hover:bg-accent/10">
                  Update Password
                </Button>
              </Link>
            </div>

            <Card className="w-full max-w-2xl shadow-md">
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold mb-4">Basic Information</h3>
                
                <div className="space-y-4">
                  <div className="flex flex-col md:flex-row md:items-center py-2 border-b">
                    <div className="md:w-1/3 font-medium flex items-center">
                      <User className="text-secondary mr-2 h-4 w-4" />
                      Full Name
                    </div>
                    <div className="md:w-2/3">{user.details.name}</div>
                  </div>
                  
                  <div className="flex flex-col md:flex-row md:items-center py-2 border-b">
                    <div className="md:w-1/3 font-medium flex items-center">
                      <Mail className="text-secondary mr-2 h-4 w-4" />
                      Email
                    </div>
                    <div className="md:w-2/3">{user.details.email}</div>
                  </div>
                  
                  {user.details.contact && (
                    <div className="flex flex-col md:flex-row md:items-center py-2 border-b">
                      <div className="md:w-1/3 font-medium flex items-center">
                        <Phone className="text-secondary mr-2 h-4 w-4" />
                        Contact
                      </div>
                      <div className="md:w-2/3">{user.details.contact}</div>
                    </div>
                  )}
                  
                  <div className="flex flex-col md:flex-row md:items-center py-2 border-b">
                    <div className="md:w-1/3 font-medium flex items-center">
                      <BookOpen className="text-secondary mr-2 h-4 w-4" />
                      {getIdFieldName()}
                    </div>
                    <div className="md:w-2/3">{getIdValue()}</div>
                  </div>
                  
                  {user.details.department && (
                    <div className="flex flex-col md:flex-row md:items-center py-2 border-b">
                      <div className="md:w-1/3 font-medium">Department</div>
                      <div className="md:w-2/3">{user.details.department}</div>
                    </div>
                  )}

                  {user.details.joinDate && (
                    <div className="flex flex-col md:flex-row md:items-center py-2">
                      <div className="md:w-1/3 font-medium flex items-center">
                        <Calendar className="text-secondary mr-2 h-4 w-4" />
                        Join Date
                      </div>
                      <div className="md:w-2/3">
                        {new Date(user.details.joinDate).toLocaleDateString()}
                      </div>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfilePage;
