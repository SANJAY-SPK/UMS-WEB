
import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import Navbar from "@/components/layout/Navbar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  BookOpen, 
  Calendar, 
  FileEdit,
  User,
  Clock,
  ArrowLeft
} from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Sidebar } from "@/components/layout/Sidebar";

interface Assignment {
  id: number;
  title: string;
  dueDate: string;
  description: string;
  submitted: boolean;
}

const CourseDetailPage = () => {
  const { courseId } = useParams<{ courseId: string }>();
  const [studentName] = useState("John Doe");

  // This would be fetched from an API in a real application
  const course = {
    id: parseInt(courseId || "1"),
    name: "Database Management Systems",
    instructor: "Dr. Jane Smith",
    department: "CSE",
    description: "This course introduces the fundamental concepts of database management systems, including database design, implementation, and usage. Topics covered include data modeling, relational database design, SQL, transaction management, and database security. Students will gain hands-on experience with database design and implementation through projects and assignments.",
    syllabus: `
      <h3>Course Objectives</h3>
      <ul>
        <li>Understand database concepts and architecture</li>
        <li>Design databases using ER modeling and normalization</li>
        <li>Implement databases using SQL</li>
        <li>Understand transaction processing and concurrency control</li>
        <li>Learn about database security and integrity</li>
      </ul>
      
      <h3>Topics Covered</h3>
      <ol>
        <li>Introduction to Database Systems</li>
        <li>Entity-Relationship Model</li>
        <li>Relational Model and Algebra</li>
        <li>SQL: Data Definition and Manipulation</li>
        <li>Database Design Theory and Normalization</li>
        <li>Transaction Processing</li>
        <li>Concurrency Control</li>
        <li>Database Security and Authorization</li>
        <li>Data Warehousing and Mining Concepts</li>
        <li>NoSQL Databases</li>
      </ol>
    `,
    prerequisites: ["Data Structures", "Computer Architecture"],
    duration: "16 weeks",
    image: "https://images.unsplash.com/photo-1516116216624-53e697fedbea?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTR8fGRhdGFiYXNlfGVufDB8fDB8fHww",
    enrolled: true,
    assignments: [
      {
        id: 1,
        title: "Database Design Project",
        dueDate: "2025-05-30",
        description: "Design a database schema for a university management system with at least 10 entities and appropriate relationships between them. Include ER diagrams and SQL DDL statements.",
        submitted: false
      },
      {
        id: 2,
        title: "SQL Queries Assignment",
        dueDate: "2025-06-10",
        description: "Write SQL queries to solve the given problems based on the sample database provided in class.",
        submitted: true
      },
      {
        id: 3,
        title: "Transaction Management Case Study",
        dueDate: "2025-06-20",
        description: "Analyze the given scenario and implement a solution that handles concurrent transactions with proper isolation levels.",
        submitted: false
      }
    ]
  };

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
          <Link 
            to="/student/courses" 
            className="flex items-center text-accent hover:text-accent-dark mb-4 inline-block"
          >
            <ArrowLeft size={16} className="mr-1" />
            Back to Courses
          </Link>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <div className="bg-white rounded-lg shadow-md overflow-hidden mb-6">
                <div className="h-64 overflow-hidden">
                  <img 
                    src={course.image} 
                    alt={course.name} 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-6">
                  <div className="flex flex-wrap justify-between items-start">
                    <div>
                      <h1 className="text-3xl font-bold text-primary">{course.name}</h1>
                      <p className="text-secondary mt-1">
                        <span className="flex items-center">
                          <User size={16} className="mr-1" /> {course.instructor}
                        </span>
                      </p>
                    </div>
                    <span className="inline-block px-3 py-1 text-sm font-medium bg-blue-100 text-primary rounded mt-2 md:mt-0">
                      {course.department}
                    </span>
                  </div>

                  <div className="mt-6">
                    <h2 className="text-xl font-semibold mb-2">Course Description</h2>
                    <p className="text-secondary">{course.description}</p>
                  </div>

                  <div className="flex flex-wrap gap-6 mt-6">
                    <div>
                      <h3 className="text-sm font-medium text-secondary">Duration</h3>
                      <p className="flex items-center mt-1">
                        <Clock size={16} className="mr-1 text-accent" /> {course.duration}
                      </p>
                    </div>
                    <div>
                      <h3 className="text-sm font-medium text-secondary">Prerequisites</h3>
                      <p>
                        {course.prerequisites.join(", ")}
                      </p>
                    </div>
                  </div>

                  {!course.enrolled && (
                    <div className="mt-6">
                      <Button className="bg-primary hover:bg-primary-dark">
                        Enroll Now
                      </Button>
                    </div>
                  )}
                </div>
              </div>

              <Card className="shadow-md">
                <CardHeader>
                  <CardTitle>Course Details</CardTitle>
                </CardHeader>
                <CardContent>
                  <Tabs defaultValue="syllabus">
                    <TabsList className="mb-4">
                      <TabsTrigger value="syllabus">Syllabus</TabsTrigger>
                      <TabsTrigger value="assignments">Assignments</TabsTrigger>
                    </TabsList>
                    
                    <TabsContent value="syllabus">
                      <div dangerouslySetInnerHTML={{ __html: course.syllabus }} />
                    </TabsContent>
                    
                    <TabsContent value="assignments">
                      {course.assignments.length > 0 ? (
                        <div className="space-y-4">
                          {course.assignments.map((assignment) => (
                            <Card key={assignment.id} className="shadow-sm">
                              <CardContent className="p-4">
                                <div className="flex justify-between">
                                  <div>
                                    <h3 className="text-lg font-semibold">{assignment.title}</h3>
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
                        <div className="text-center py-8">
                          <FileEdit size={36} className="mx-auto text-secondary opacity-40" />
                          <h3 className="mt-2 font-semibold text-primary">No assignments yet</h3>
                        </div>
                      )}
                    </TabsContent>
                  </Tabs>
                </CardContent>
              </Card>
            </div>
            
            <div className="lg:col-span-1">
              <Card className="shadow-md mb-6">
                <CardHeader>
                  <CardTitle>Course Progress</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex justify-between items-center mb-2">
                    <span>Assignments</span>
                    <span>2/3</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2.5">
                    <div className="bg-accent h-2.5 rounded-full" style={{ width: '66%' }}></div>
                  </div>
                  
                  <div className="mt-6">
                    <h3 className="text-lg font-semibold mb-3">Course Actions</h3>
                    <div className="space-y-2">
                      <Button className="w-full bg-accent hover:bg-accent-dark flex items-center justify-center">
                        <FileEdit className="mr-2 h-4 w-4" />
                        View All Assignments
                      </Button>
                      <Button variant="outline" className="w-full flex items-center justify-center">
                        <Calendar className="mr-2 h-4 w-4" />
                        Course Schedule
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseDetailPage;
