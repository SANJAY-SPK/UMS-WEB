
import { useState } from "react";
import Navbar from "@/components/layout/Navbar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { FileEdit, Users, Calendar, BarChart4, CheckCircle } from "lucide-react";

const FacultyDashboard = () => {
  const [facultyName] = useState("Dr. Jane Smith");
  
  // Sample data for the dashboard
  const dashboardData = {
    assignments: 12,
    pendingGrading: 5,
    students: 120,
    courses: 4,
    upcomingDeadlines: [
      { id: 1, title: "Project Submission", course: "CS101", date: "2025-05-28" },
      { id: 2, title: "Mid-term Paper", course: "CS205", date: "2025-05-31" },
      { id: 3, title: "Lab Report", course: "CS103", date: "2025-06-05" },
    ],
    recentActivity: [
      { id: 1, action: "Created new assignment", subject: "Data Structures", time: "2 hours ago" },
      { id: 2, action: "Graded submissions", subject: "Web Development", time: "1 day ago" },
      { id: 3, action: "Updated course material", subject: "Algorithms", time: "2 days ago" },
    ]
  };

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  };

  return (
    <>
      <Navbar userType="faculty" userName={facultyName} />
      
      <div className="page-container">
        <div className="mb-8">
          <h1 className="text-3xl font-bold">Welcome back, {facultyName}</h1>
          <p className="text-secondary mt-2">Here's an overview of your academic activities</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="card-hover">
            <CardContent className="pt-6">
              <div className="flex items-center space-x-4">
                <div className="p-3 rounded-full bg-primary-light/10 text-primary">
                  <FileEdit size={24} />
                </div>
                <div>
                  <p className="text-sm text-secondary">Total Assignments</p>
                  <h3 className="text-2xl font-bold">{dashboardData.assignments}</h3>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="card-hover">
            <CardContent className="pt-6">
              <div className="flex items-center space-x-4">
                <div className="p-3 rounded-full bg-accent-light/10 text-accent">
                  <CheckCircle size={24} />
                </div>
                <div>
                  <p className="text-sm text-secondary">Pending Grading</p>
                  <h3 className="text-2xl font-bold">{dashboardData.pendingGrading}</h3>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="card-hover">
            <CardContent className="pt-6">
              <div className="flex items-center space-x-4">
                <div className="p-3 rounded-full bg-primary-light/10 text-primary">
                  <Users size={24} />
                </div>
                <div>
                  <p className="text-sm text-secondary">Students</p>
                  <h3 className="text-2xl font-bold">{dashboardData.students}</h3>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="card-hover">
            <CardContent className="pt-6">
              <div className="flex items-center space-x-4">
                <div className="p-3 rounded-full bg-accent-light/10 text-accent">
                  <BarChart4 size={24} />
                </div>
                <div>
                  <p className="text-sm text-secondary">Active Courses</p>
                  <h3 className="text-2xl font-bold">{dashboardData.courses}</h3>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card className="card-hover">
            <CardHeader>
              <CardTitle>Upcoming Deadlines</CardTitle>
              <CardDescription>Assignments due in the next 14 days</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {dashboardData.upcomingDeadlines.map((deadline) => (
                  <div key={deadline.id} className="flex items-center space-x-3 bg-light p-3 rounded-md">
                    <div className="p-2 rounded-full bg-primary text-white">
                      <Calendar size={16} />
                    </div>
                    <div className="flex-grow">
                      <h4 className="font-medium text-primary-dark">{deadline.title}</h4>
                      <p className="text-sm text-secondary">{deadline.course}</p>
                    </div>
                    <div className="text-sm text-secondary font-medium">
                      {formatDate(deadline.date)}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
          
          <Card className="card-hover">
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
              <CardDescription>Your latest actions in the system</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {dashboardData.recentActivity.map((activity) => (
                  <div key={activity.id} className="flex items-start space-x-3">
                    <div className="p-2 rounded-full bg-accent-light/30 text-accent mt-1">
                      <FileEdit size={16} />
                    </div>
                    <div>
                      <h4 className="font-medium text-primary-dark">{activity.action}</h4>
                      <p className="text-sm text-secondary">{activity.subject}</p>
                      <p className="text-xs text-secondary-light mt-1">{activity.time}</p>
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

export default FacultyDashboard;
