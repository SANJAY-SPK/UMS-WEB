
import { useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "@/components/layout/Navbar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { User, Users, BookOpen, Building, Activity, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const AdminDashboard = () => {
  const [adminName] = useState("Admin User");
  
  // Sample data
  const stats = {
    facultyCount: 45,
    studentCount: 850,
    coursesCount: 72,
    departmentsCount: 8,
    recentActivities: [
      { id: 1, action: "Registered new faculty", subject: "Dr. Michael Johnson (Computer Science)", time: "2 hours ago" },
      { id: 2, action: "Updated student record", subject: "Emily Davis (IT20005)", time: "1 day ago" },
      { id: 3, action: "Modified course details", subject: "Advanced Database Systems (CS402)", time: "2 days ago" },
      { id: 4, action: "Added new department", subject: "Artificial Intelligence", time: "5 days ago" },
    ],
    faculties: [
      { id: 1, name: "Dr. Jane Smith", department: "Computer Science", students: 120 },
      { id: 2, name: "Prof. Robert Chen", department: "Information Technology", students: 85 },
      { id: 3, name: "Dr. Sarah Wilson", department: "Electrical Engineering", students: 110 },
    ]
  };

  return (
    <>
      <Navbar userType="admin" userName={adminName} />
      
      <div className="page-container">
        <div className="mb-8">
          <h1 className="text-3xl font-bold">Admin Dashboard</h1>
          <p className="text-secondary mt-2">University Management System Overview</p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="card-hover">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-secondary">Total Faculty</p>
                  <p className="text-3xl font-bold">{stats.facultyCount}</p>
                </div>
                <div className="p-3 rounded-full bg-primary-light/10 text-primary">
                  <User size={24} />
                </div>
              </div>
              <Link to="/admin/faculty" className="text-accent hover:text-accent-dark text-sm flex items-center mt-4">
                Manage Faculty <ArrowRight size={14} className="ml-1" />
              </Link>
            </CardContent>
          </Card>
          
          <Card className="card-hover">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-secondary">Total Students</p>
                  <p className="text-3xl font-bold">{stats.studentCount}</p>
                </div>
                <div className="p-3 rounded-full bg-accent-light/10 text-accent">
                  <Users size={24} />
                </div>
              </div>
              <Link to="/admin/students" className="text-accent hover:text-accent-dark text-sm flex items-center mt-4">
                Manage Students <ArrowRight size={14} className="ml-1" />
              </Link>
            </CardContent>
          </Card>
          
          <Card className="card-hover">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-secondary">Active Courses</p>
                  <p className="text-3xl font-bold">{stats.coursesCount}</p>
                </div>
                <div className="p-3 rounded-full bg-primary-light/10 text-primary">
                  <BookOpen size={24} />
                </div>
              </div>
              <Link to="/admin/courses" className="text-accent hover:text-accent-dark text-sm flex items-center mt-4">
                Manage Courses <ArrowRight size={14} className="ml-1" />
              </Link>
            </CardContent>
          </Card>
          
          <Card className="card-hover">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-secondary">Departments</p>
                  <p className="text-3xl font-bold">{stats.departmentsCount}</p>
                </div>
                <div className="p-3 rounded-full bg-accent-light/10 text-accent">
                  <Building size={24} />
                </div>
              </div>
              <Link to="/admin/departments" className="text-accent hover:text-accent-dark text-sm flex items-center mt-4">
                Manage Departments <ArrowRight size={14} className="ml-1" />
              </Link>
            </CardContent>
          </Card>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card className="card-hover">
            <CardHeader>
              <CardTitle>Recent Activities</CardTitle>
              <CardDescription>Latest system activities</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {stats.recentActivities.map((activity) => (
                  <div key={activity.id} className="flex items-start space-x-3">
                    <div className="p-2 rounded-full bg-accent-light/20 text-accent mt-1">
                      <Activity size={16} />
                    </div>
                    <div>
                      <h4 className="font-medium text-primary-dark">{activity.action}</h4>
                      <p className="text-sm text-secondary">{activity.subject}</p>
                      <p className="text-xs text-secondary mt-1">{activity.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
          
          <Card className="card-hover">
            <CardHeader>
              <div className="flex justify-between items-center">
                <div>
                  <CardTitle>Faculty Overview</CardTitle>
                  <CardDescription>Department-wise faculty distribution</CardDescription>
                </div>
                <Button asChild variant="outline" size="sm">
                  <Link to="/admin/faculty">View All</Link>
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {stats.faculties.map((faculty) => (
                  <div key={faculty.id} className="flex items-center justify-between p-3 bg-light rounded-md">
                    <div className="flex items-center space-x-3">
                      <div className="h-10 w-10 rounded-full bg-primary-light/20 flex items-center justify-center text-primary">
                        <User size={20} />
                      </div>
                      <div>
                        <h4 className="font-medium text-primary-dark">{faculty.name}</h4>
                        <p className="text-sm text-secondary">{faculty.department}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm text-secondary">{faculty.students} students</div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  );
};

export default AdminDashboard;
