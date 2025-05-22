
import { useState } from "react";
import Navbar from "@/components/layout/Navbar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { CheckCircle, XCircle, Calendar, BarChart4 } from "lucide-react";

const StudentAttendancePage = () => {
  const [studentName] = useState("John Doe");
  const [selectedSemester, setSelectedSemester] = useState("Current");
  
  // Sample attendance data
  const attendanceData = {
    overallPercentage: 85,
    subjects: [
      { id: 1, name: "Database Management", present: 15, total: 16, percentage: 93.75 },
      { id: 2, name: "Human-Computer Interaction", present: 12, total: 15, percentage: 80 },
      { id: 3, name: "Data Structures & Algorithms", present: 14, total: 18, percentage: 77.78 },
      { id: 4, name: "Computer Networks", present: 16, total: 18, percentage: 88.89 },
      { id: 5, name: "Software Engineering", present: 12, total: 14, percentage: 85.71 },
    ],
    recentSessions: [
      { id: 1, date: "2025-05-18", subject: "Database Management", status: "present" },
      { id: 2, date: "2025-05-18", subject: "Software Engineering", status: "absent" },
      { id: 3, date: "2025-05-17", subject: "Computer Networks", status: "present" },
      { id: 4, date: "2025-05-17", subject: "Data Structures & Algorithms", status: "present" },
      { id: 5, date: "2025-05-16", subject: "Human-Computer Interaction", status: "present" },
      { id: 6, date: "2025-05-16", subject: "Database Management", status: "present" },
      { id: 7, date: "2025-05-15", subject: "Software Engineering", status: "present" },
      { id: 8, date: "2025-05-15", subject: "Computer Networks", status: "absent" },
    ],
  };

  // Calculated attendance status
  const getAttendanceStatus = (percentage: number) => {
    if (percentage >= 90) return { text: "Excellent", color: "text-green-600" };
    if (percentage >= 80) return { text: "Good", color: "text-green-500" };
    if (percentage >= 75) return { text: "Satisfactory", color: "text-yellow-600" };
    return { text: "Needs Improvement", color: "text-red-500" };
  };
  
  const attendanceStatus = getAttendanceStatus(attendanceData.overallPercentage);

  // Format date function
  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', { 
      weekday: 'short', 
      month: 'short', 
      day: 'numeric' 
    });
  };

  // Available semesters
  const semesters = ["Current", "Fall 2024", "Spring 2024", "Fall 2023"];

  return (
    <>
      <Navbar userType="student" userName={studentName} />
      
      <div className="page-container max-w-5xl mx-auto">
        <div className="mb-6">
          <h1 className="text-3xl font-bold">Attendance Dashboard</h1>
          <p className="text-secondary mt-2">Track your attendance statistics</p>
        </div>
        
        <div className="mb-6">
          <Label htmlFor="semester">Filter by Semester</Label>
          <div className="max-w-xs">
            <Select
              value={selectedSemester}
              onValueChange={setSelectedSemester}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select semester" />
              </SelectTrigger>
              <SelectContent>
                {semesters.map((semester) => (
                  <SelectItem key={semester} value={semester}>
                    {semester}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="md:col-span-3">
            <CardContent className="pt-6">
              <div className="flex flex-col md:flex-row md:justify-between items-center">
                <div className="flex items-center mb-4 md:mb-0">
                  <div className="h-20 w-20 rounded-full border-4 border-primary flex items-center justify-center mr-4">
                    <span className="text-2xl font-bold">{attendanceData.overallPercentage}%</span>
                  </div>
                  <div>
                    <h3 className="font-medium text-lg">Overall Attendance</h3>
                    <p className={`text-sm ${attendanceStatus.color}`}>
                      {attendanceStatus.text}
                    </p>
                  </div>
                </div>
                
                <div className="flex flex-wrap justify-center gap-6">
                  <div className="text-center">
                    <p className="text-xs text-secondary">Required</p>
                    <p className="text-2xl font-bold">75%</p>
                    <p className="text-xs text-secondary">Minimum</p>
                  </div>
                  
                  <div className="text-center">
                    <p className="text-xs text-secondary">Current</p>
                    <p className="text-2xl font-bold">{attendanceData.overallPercentage}%</p>
                    <p className="text-xs text-secondary">Attendance</p>
                  </div>
                  
                  <div className="text-center">
                    <p className="text-xs text-secondary">Risk Status</p>
                    <p className={`text-2xl font-bold ${attendanceData.overallPercentage >= 75 ? 'text-green-500' : 'text-red-500'}`}>
                      {attendanceData.overallPercentage >= 75 ? 'Safe' : 'At Risk'}
                    </p>
                    <p className="text-xs text-secondary">Status</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
          <div className="lg:col-span-3">
            <Card className="h-full">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <BarChart4 size={20} className="mr-2" />
                  Subject-wise Attendance
                </CardTitle>
                <CardDescription>Breakdown of attendance by subject</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {attendanceData.subjects.map((subject) => (
                    <div key={subject.id}>
                      <div className="flex justify-between items-center mb-1">
                        <span className="font-medium">{subject.name}</span>
                        <span className={`text-sm font-medium ${
                          subject.percentage >= 75 ? 'text-green-600' : 'text-red-500'
                        }`}>
                          {subject.percentage.toFixed(1)}%
                        </span>
                      </div>
                      <div className="w-full bg-light rounded-full h-2">
                        <div 
                          className={`h-2 rounded-full ${
                            subject.percentage >= 90 ? 'bg-green-500' :
                            subject.percentage >= 75 ? 'bg-green-400' : 'bg-red-500'
                          }`}
                          style={{ width: `${subject.percentage}%` }}
                        />
                      </div>
                      <p className="text-xs text-secondary mt-1">
                        {subject.present} of {subject.total} classes attended
                      </p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
          
          <div className="lg:col-span-2">
            <Card className="h-full">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Calendar size={20} className="mr-2" />
                  Recent Sessions
                </CardTitle>
                <CardDescription>Your last few class attendances</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3 max-h-[400px] overflow-y-auto pr-2">
                  {attendanceData.recentSessions.map((session) => (
                    <div key={session.id} className="flex items-center p-2 bg-light rounded-md">
                      <div className="flex-shrink-0">
                        {session.status === 'present' ? (
                          <CheckCircle className="h-5 w-5 text-green-500" />
                        ) : (
                          <XCircle className="h-5 w-5 text-red-500" />
                        )}
                      </div>
                      <div className="ml-3 flex-grow">
                        <p className="font-medium text-sm">{session.subject}</p>
                        <p className="text-xs text-secondary">{formatDate(session.date)}</p>
                      </div>
                      <div className="text-xs font-medium capitalize">
                        <span className={session.status === 'present' ? 'text-green-500' : 'text-red-500'}>
                          {session.status}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </>
  );
};

export default StudentAttendancePage;
