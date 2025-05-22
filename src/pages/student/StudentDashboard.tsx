
import { useState } from "react";
import Navbar from "@/components/layout/Navbar";
import { Card, CardContent } from "@/components/ui/card";
import { Calendar, BookOpen, FileEdit, Users } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const StudentDashboard = () => {
  const [studentName] = useState("John Doe");
  const [studentId] = useState("S12345");
  const [attendanceData] = useState([
    { subject: "Mathematics", attendance: 85 },
    { subject: "Physics", attendance: 92 },
    { subject: "Computer Science", attendance: 78 },
    { subject: "English", attendance: 88 },
    { subject: "Chemistry", attendance: 75 },
  ]);

  const [upcomingAssignments] = useState([
    {
      id: 1,
      title: "Database Design",
      course: "Database Management",
      dueDate: "2025-05-28",
    },
    {
      id: 2,
      title: "UI Mockup",
      course: "Human-Computer Interaction",
      dueDate: "2025-06-03",
    },
    {
      id: 3,
      title: "Algorithm Analysis",
      course: "Data Structures",
      dueDate: "2025-06-07",
    },
  ]);

  const [enrolledCourses] = useState([
    { id: 1, name: "Database Management", instructor: "Dr. Jane Smith", progress: 65 },
    { id: 2, name: "Data Structures", instructor: "Prof. Robert Johnson", progress: 75 },
    { id: 3, name: "Human-Computer Interaction", instructor: "Dr. Emily Brown", progress: 40 },
  ]);

  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <>
      <Navbar userType="student" userName={studentName} />
      
      <div className="page-container">
        <h1 className="text-3xl font-bold mb-2">Student Dashboard</h1>
        <p className="text-secondary mb-8">Welcome back, {studentName}</p>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="shadow-md">
            <CardContent className="pt-6">
              <div className="flex items-center">
                <div className="p-3 bg-blue-100 rounded-full mr-4">
                  <BookOpen className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <p className="text-secondary text-sm">Enrolled Courses</p>
                  <h3 className="text-2xl font-bold">{enrolledCourses.length}</h3>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="shadow-md">
            <CardContent className="pt-6">
              <div className="flex items-center">
                <div className="p-3 bg-green-100 rounded-full mr-4">
                  <FileEdit className="h-6 w-6 text-accent" />
                </div>
                <div>
                  <p className="text-secondary text-sm">Pending Assignments</p>
                  <h3 className="text-2xl font-bold">{upcomingAssignments.length}</h3>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="shadow-md">
            <CardContent className="pt-6">
              <div className="flex items-center">
                <div className="p-3 bg-amber-100 rounded-full mr-4">
                  <Calendar className="h-6 w-6 text-amber-500" />
                </div>
                <div>
                  <p className="text-secondary text-sm">Average Attendance</p>
                  <h3 className="text-2xl font-bold">
                    {Math.round(
                      attendanceData.reduce((acc, curr) => acc + curr.attendance, 0) /
                        attendanceData.length
                    )}%
                  </h3>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <Card className="shadow-md">
            <CardContent className="pt-6">
              <h3 className="text-xl font-semibold mb-4">Upcoming Assignments</h3>
              <div className="space-y-4">
                {upcomingAssignments.map((assignment) => (
                  <div key={assignment.id} className="border-b pb-3 last:border-0">
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="font-medium">{assignment.title}</p>
                        <p className="text-sm text-secondary">{assignment.course}</p>
                      </div>
                      <div className="text-sm text-right">
                        <p className="font-medium">Due Date</p>
                        <p className="text-secondary">{formatDate(assignment.dueDate)}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
          
          <Card className="shadow-md">
            <CardContent className="pt-6">
              <h3 className="text-xl font-semibold mb-4">Attendance Overview</h3>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={attendanceData}
                    margin={{
                      top: 5,
                      right: 5,
                      left: 5,
                      bottom: 5,
                    }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="subject" tick={{ fontSize: 12 }} />
                    <YAxis domain={[0, 100]} />
                    <Tooltip />
                    <Bar dataKey="attendance" fill="#3A7CA5" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </div>
        
        <Card className="shadow-md mb-8">
          <CardContent className="pt-6">
            <h3 className="text-xl font-semibold mb-4">Course Progress</h3>
            <div className="space-y-6">
              {enrolledCourses.map((course) => (
                <div key={course.id}>
                  <div className="flex justify-between items-center mb-2">
                    <div>
                      <p className="font-medium">{course.name}</p>
                      <p className="text-sm text-secondary">{course.instructor}</p>
                    </div>
                    <p className="font-medium">{course.progress}%</p>
                  </div>
                  <Progress value={course.progress} className="h-2" />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  );
};

export default StudentDashboard;
