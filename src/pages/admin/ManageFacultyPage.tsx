
import { useState } from "react";
import Navbar from "@/components/layout/Navbar";
import { Sidebar } from "@/components/layout/Sidebar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Search, UserPlus, MoreHorizontal, User, Edit, Trash2 } from "lucide-react";
import { Link } from "react-router-dom";

// Faculty data structure
interface Faculty {
  id: number;
  name: string;
  email: string;
  facultyId: string;
  department: string;
  courses: number;
  joinDate: string;
}

const ManageFacultyPage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [adminName] = useState("Admin User");
  
  // Sample faculty data
  const facultyData: Faculty[] = [
    {
      id: 1,
      name: "Dr. Jane Smith",
      email: "jane.smith@university.edu",
      facultyId: "FAC001",
      department: "Computer Science",
      courses: 4,
      joinDate: "2022-03-15"
    },
    {
      id: 2,
      name: "Prof. Robert Chen",
      email: "robert.chen@university.edu",
      facultyId: "FAC002",
      department: "Information Technology",
      courses: 3,
      joinDate: "2021-08-10"
    },
    {
      id: 3,
      name: "Dr. Sarah Wilson",
      email: "sarah.wilson@university.edu",
      facultyId: "FAC003",
      department: "Electrical Engineering",
      courses: 5,
      joinDate: "2020-01-25"
    },
    {
      id: 4,
      name: "Prof. Michael Johnson",
      email: "michael.johnson@university.edu",
      facultyId: "FAC004",
      department: "Computer Science",
      courses: 2,
      joinDate: "2022-07-05"
    },
    {
      id: 5,
      name: "Dr. Emily Davis",
      email: "emily.davis@university.edu",
      facultyId: "FAC005",
      department: "Mathematics",
      courses: 3,
      joinDate: "2021-05-20"
    },
    {
      id: 6,
      name: "Prof. Daniel Brown",
      email: "daniel.brown@university.edu",
      facultyId: "FAC006",
      department: "Physics",
      courses: 4,
      joinDate: "2023-01-10"
    },
    {
      id: 7,
      name: "Dr. Olivia Wilson",
      email: "olivia.wilson@university.edu",
      facultyId: "FAC007",
      department: "Chemistry",
      courses: 3,
      joinDate: "2021-11-15"
    }
  ];

  // Filter faculty based on search query
  const filteredFaculty = facultyData.filter((faculty) =>
    faculty.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    faculty.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
    faculty.department.toLowerCase().includes(searchQuery.toLowerCase()) ||
    faculty.facultyId.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric'
    };
    return new Date(dateString).toLocaleDateString(undefined, options);
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
          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold">Manage Faculty</h1>
              <p className="text-secondary mt-2">View and manage faculty members</p>
            </div>
            
            <Link to="/admin/faculty/register">
              <Button className="mt-4 md:mt-0 bg-primary hover:bg-primary-dark flex items-center gap-2">
                <UserPlus size={18} />
                Register New Faculty
              </Button>
            </Link>
          </div>
          
          <div className="mb-6">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-secondary" size={18} />
              <Input
                placeholder="Search faculty by name, email, ID, or department..."
                className="pl-9"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
          
          <Card>
            <CardHeader>
              <CardTitle>Faculty Members</CardTitle>
              <CardDescription>
                Total faculty members: {facultyData.length}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="text-left text-sm font-medium text-primary border-b">
                      <th className="px-4 py-3">Name</th>
                      <th className="px-4 py-3">Faculty ID</th>
                      <th className="px-4 py-3">Department</th>
                      <th className="px-4 py-3">Email</th>
                      <th className="px-4 py-3">Courses</th>
                      <th className="px-4 py-3">Join Date</th>
                      <th className="px-4 py-3 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y">
                    {filteredFaculty.map((faculty) => (
                      <tr key={faculty.id} className="hover:bg-light">
                        <td className="px-4 py-4">
                          <div className="flex items-center">
                            <div className="h-10 w-10 rounded-full bg-primary-light/20 flex items-center justify-center text-primary">
                              <User size={18} />
                            </div>
                            <span className="ml-3 font-medium">{faculty.name}</span>
                          </div>
                        </td>
                        <td className="px-4 py-4 text-secondary">
                          {faculty.facultyId}
                        </td>
                        <td className="px-4 py-4 text-secondary">
                          {faculty.department}
                        </td>
                        <td className="px-4 py-4 text-secondary">
                          {faculty.email}
                        </td>
                        <td className="px-4 py-4 text-secondary">
                          {faculty.courses}
                        </td>
                        <td className="px-4 py-4 text-secondary">
                          {formatDate(faculty.joinDate)}
                        </td>
                        <td className="px-4 py-4 text-right">
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                                <MoreHorizontal size={16} />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end" className="w-36">
                              <DropdownMenuItem className="flex items-center cursor-pointer">
                                <Edit size={14} className="mr-2" />
                                Edit
                              </DropdownMenuItem>
                              <DropdownMenuItem className="flex items-center cursor-pointer text-red-500 focus:text-red-500">
                                <Trash2 size={14} className="mr-2" />
                                Remove
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                
                {filteredFaculty.length === 0 && (
                  <div className="text-center py-8">
                    <User size={36} className="mx-auto text-secondary opacity-40" />
                    <p className="mt-2 text-secondary">No faculty members found</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  );
};

export default ManageFacultyPage;
