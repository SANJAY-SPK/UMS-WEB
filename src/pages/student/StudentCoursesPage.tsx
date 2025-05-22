
import { useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "@/components/layout/Navbar";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { 
  Search, 
  BookOpen, 
  Calendar, 
  Clock, 
  FileEdit,
  Filter
} from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Sidebar } from "@/components/layout/Sidebar";

interface Course {
  id: number;
  name: string;
  instructor: string;
  department: string;
  description: string;
  image: string;
  assignments: Assignment[];
  enrolled: boolean;
}

interface Assignment {
  id: number;
  title: string;
  dueDate: string;
  description: string;
  submitted: boolean;
}

const StudentCoursesPage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [departmentFilter, setDepartmentFilter] = useState("all");
  const [studentName] = useState("John Doe");

  // Sample courses data
  const [courses, setCourses] = useState<Course[]>([
    {
      id: 1,
      name: "Database Management Systems",
      instructor: "Dr. Jane Smith",
      department: "CSE",
      description: "Introduction to database concepts, design and implementation.",
      image: "https://images.unsplash.com/photo-1516116216624-53e697fedbea?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTR8fGRhdGFiYXNlfGVufDB8fDB8fHww",
      assignments: [
        {
          id: 1,
          title: "Database Design Project",
          dueDate: "2025-05-30",
          description: "Design a database schema for a university management system.",
          submitted: false
        },
        {
          id: 2,
          title: "SQL Queries Assignment",
          dueDate: "2025-06-10",
          description: "Write SQL queries to solve the given problems.",
          submitted: true
        }
      ],
      enrolled: true
    },
    {
      id: 2,
      name: "Data Structures and Algorithms",
      instructor: "Prof. Robert Johnson",
      department: "CSE",
      description: "Study of data organization, manipulation and retrieval.",
      image: "https://images.unsplash.com/photo-1509228627152-72ae9ae6848d?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fGNvZGluZ3xlbnwwfHwwfHx8MA%3D%3D",
      assignments: [
        {
          id: 3,
          title: "Algorithm Analysis",
          dueDate: "2025-06-07",
          description: "Analyze the time and space complexity of given algorithms.",
          submitted: false
        }
      ],
      enrolled: true
    },
    {
      id: 3,
      name: "Human-Computer Interaction",
      instructor: "Dr. Emily Brown",
      department: "IT",
      description: "Principles and methods of human-computer interaction.",
      image: "https://images.unsplash.com/photo-1603380353725-f8a4d39cc41e?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8dXNlciUyMGludGVyZmFjZXxlbnwwfHwwfHx8MA%3D%3D",
      assignments: [
        {
          id: 4,
          title: "UI Mockup",
          dueDate: "2025-06-03",
          description: "Create a user interface mockup for a mobile application.",
          submitted: false
        }
      ],
      enrolled: true
    },
    {
      id: 4,
      name: "Power Systems",
      instructor: "Dr. Michael Wilson",
      department: "EEE",
      description: "Study of electrical power generation, transmission and distribution.",
      image: "https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cG93ZXIlMjBlbGVjdHJpY2FsfGVufDB8fDB8fHww",
      assignments: [],
      enrolled: false
    },
    {
      id: 5,
      name: "Network Security",
      instructor: "Prof. Sarah Thompson",
      department: "IT",
      description: "Security concepts and techniques for computer networks.",
      image: "https://images.unsplash.com/photo-1544197150-b99a580bb7a8?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8bmV0d29yayUyMHNlY3VyaXR5fGVufDB8fDB8fHww",
      assignments: [],
      enrolled: false
    },
  ]);

  const toggleEnrollment = (courseId: number) => {
    setCourses(
      courses.map((course) => 
        course.id === courseId 
          ? { ...course, enrolled: !course.enrolled } 
          : course
      )
    );
  };

  const filteredCourses = courses.filter((course) => {
    // Filter by search query
    const matchesQuery = course.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         course.instructor.toLowerCase().includes(searchQuery.toLowerCase());
    
    // Filter by department
    const matchesDepartment = departmentFilter === "all" || course.department === departmentFilter;
    
    return matchesQuery && matchesDepartment;
  });

  const enrolledCourses = filteredCourses.filter(course => course.enrolled);
  const availableCourses = filteredCourses.filter(course => !course.enrolled);
  
  // Get all assignments from enrolled courses
  const assignments = enrolledCourses.flatMap(course => 
    course.assignments.map(assignment => ({
      ...assignment,
      courseName: course.name
    }))
  );

  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const navItems = [
    { title: "Dashboard", href: "/student/dashboard", icon: BookOpen },
    { title: "Courses", href: "/student/courses", icon: BookOpen },
    { title: "Attendance", href: "/student/attendance", icon: Calendar },
  ];

  return (
    <div className="flex h-screen">
      <Sidebar items={navItems} />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Navbar userType="student" userName={studentName} />
        
        <div className="page-container flex-1 overflow-y-auto">
          <h1 className="text-3xl font-bold mb-2">Courses</h1>
          <p className="text-secondary mb-6">Browse, enroll and manage your courses</p>

          <div className="flex flex-col md:flex-row md:items-center gap-4 mb-6">
            <div className="relative flex-grow">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-secondary" size={18} />
              <Input
                placeholder="Search courses..."
                className="pl-9"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div className="flex items-center gap-2">
              <Filter size={18} className="text-secondary" />
              <Select value={departmentFilter} onValueChange={setDepartmentFilter}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Department" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Departments</SelectItem>
                  <SelectItem value="CSE">CSE</SelectItem>
                  <SelectItem value="IT">IT</SelectItem>
                  <SelectItem value="EEE">EEE</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <Tabs defaultValue="enrolled" className="mb-8">
            <TabsList className="mb-6">
              <TabsTrigger value="enrolled">My Courses</TabsTrigger>
              <TabsTrigger value="available">Available Courses</TabsTrigger>
              <TabsTrigger value="assignments">Assignments</TabsTrigger>
            </TabsList>
            
            <TabsContent value="enrolled">
              {enrolledCourses.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {enrolledCourses.map((course) => (
                    <Card key={course.id} className="overflow-hidden shadow-md hover:shadow-lg transition-shadow">
                      <div className="h-40 overflow-hidden">
                        <img 
                          src={course.image} 
                          alt={course.name} 
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <CardContent className="p-4">
                        <div className="flex justify-between items-start">
                          <div>
                            <h3 className="text-lg font-semibold">{course.name}</h3>
                            <p className="text-sm text-secondary">{course.instructor}</p>
                          </div>
                          <span className="inline-block px-2 py-1 text-xs font-medium bg-blue-100 text-primary rounded">
                            {course.department}
                          </span>
                        </div>
                        
                        <div className="mt-2 text-sm">{course.description.substring(0, 100)}...</div>
                        
                        <div className="mt-4 flex items-center justify-between">
                          <Link
                            to={`/student/courses/${course.id}`}
                            className="text-accent hover:text-accent-dark text-sm font-medium"
                          >
                            View Course
                          </Link>
                          
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => toggleEnrollment(course.id)}
                            className="text-red-500 border-red-500 hover:bg-red-50"
                          >
                            Drop Course
                          </Button>
                        </div>
                        
                        {course.assignments.length > 0 && (
                          <div className="mt-3 pt-3 border-t">
                            <p className="text-xs text-secondary flex items-center">
                              <FileEdit size={14} className="mr-1" />
                              {course.assignments.length} {course.assignments.length === 1 ? 'Assignment' : 'Assignments'}
                            </p>
                          </div>
                        )}
                      </CardContent>
                    </Card>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12 bg-light rounded-lg">
                  <BookOpen size={48} className="mx-auto text-secondary opacity-40" />
                  <h3 className="mt-4 text-xl font-semibold text-primary">No courses enrolled</h3>
                  <p className="mt-2 text-secondary">Explore available courses and enroll</p>
                </div>
              )}
            </TabsContent>
            
            <TabsContent value="available">
              {availableCourses.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {availableCourses.map((course) => (
                    <Card key={course.id} className="overflow-hidden shadow-md hover:shadow-lg transition-shadow">
                      <div className="h-40 overflow-hidden">
                        <img 
                          src={course.image} 
                          alt={course.name} 
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <CardContent className="p-4">
                        <div className="flex justify-between items-start">
                          <div>
                            <h3 className="text-lg font-semibold">{course.name}</h3>
                            <p className="text-sm text-secondary">{course.instructor}</p>
                          </div>
                          <span className="inline-block px-2 py-1 text-xs font-medium bg-blue-100 text-primary rounded">
                            {course.department}
                          </span>
                        </div>
                        
                        <div className="mt-2 text-sm">{course.description.substring(0, 100)}...</div>
                        
                        <div className="mt-4 flex items-center justify-between">
                          <Link
                            to={`/student/courses/${course.id}`}
                            className="text-accent hover:text-accent-dark text-sm font-medium"
                          >
                            View Details
                          </Link>
                          
                          <Button 
                            size="sm"
                            onClick={() => toggleEnrollment(course.id)}
                            className="bg-primary hover:bg-primary-dark"
                          >
                            Enroll Course
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12 bg-light rounded-lg">
                  <BookOpen size={48} className="mx-auto text-secondary opacity-40" />
                  <h3 className="mt-4 text-xl font-semibold text-primary">No available courses</h3>
                  <p className="mt-2 text-secondary">All courses are already in your enrollment</p>
                </div>
              )}
            </TabsContent>
            
            <TabsContent value="assignments">
              {assignments.length > 0 ? (
                <div className="space-y-4">
                  {assignments.map((assignment) => (
                    <Card key={assignment.id} className="shadow-sm">
                      <CardContent className="p-4">
                        <div className="flex justify-between">
                          <div>
                            <h3 className="text-lg font-semibold">{assignment.title}</h3>
                            <p className="text-sm text-secondary">{assignment.courseName}</p>
                            <p className="text-sm mt-2">{assignment.description}</p>
                          </div>
                          <div className="text-right">
                            <div className="flex items-center space-x-2 text-sm mb-2">
                              <Calendar size={16} className="text-secondary" />
                              <span>Due: {formatDate(assignment.dueDate)}</span>
                            </div>
                            <Link
                              to={`/student/assignments/${assignment.id}/submit`}
                              className={`inline-block px-3 py-1 rounded text-sm font-medium ${
                                assignment.submitted
                                  ? "bg-green-100 text-green-700"
                                  : "bg-primary text-white"
                              }`}
                            >
                              {assignment.submitted ? "Submitted" : "Submit"}
                            </Link>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12 bg-light rounded-lg">
                  <FileEdit size={48} className="mx-auto text-secondary opacity-40" />
                  <h3 className="mt-4 text-xl font-semibold text-primary">No assignments yet</h3>
                  <p className="mt-2 text-secondary">You have no pending assignments</p>
                </div>
              )}
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default StudentCoursesPage;
