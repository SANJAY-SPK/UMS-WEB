
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
import { Button } from "@/components/ui/button";
import { Calendar, Download, FileText } from "lucide-react";
import { toast } from "@/components/ui/sonner";

interface ExamInfo {
  id: number;
  course: string;
  courseCode: string;
  date: string;
  time: string;
  venue: string;
}

const ExamTimetablePage = () => {
  const [userType] = useState<"student" | "faculty">("faculty");
  const [userName] = useState(userType === "faculty" ? "Dr. Jane Smith" : "John Doe");
  const [selectedDepartment, setSelectedDepartment] = useState("");

  // Available departments
  const departments = ["Computer Science", "Information Technology", "Electrical Engineering", "All Departments"];

  // Sample exam timetable data
  const examTimetableData: Record<string, ExamInfo[]> = {
    "Computer Science": [
      { id: 1, course: "Database Management", courseCode: "CS301", date: "2025-06-10", time: "09:00 - 12:00", venue: "Hall A" },
      { id: 2, course: "Data Structures & Algorithms", courseCode: "CS302", date: "2025-06-12", time: "09:00 - 12:00", venue: "Hall B" },
      { id: 3, course: "Computer Networks", courseCode: "CS303", date: "2025-06-14", time: "09:00 - 12:00", venue: "Hall A" },
      { id: 4, course: "Software Engineering", courseCode: "CS304", date: "2025-06-16", time: "09:00 - 12:00", venue: "Hall C" },
      { id: 5, course: "Operating Systems", courseCode: "CS305", date: "2025-06-18", time: "09:00 - 12:00", venue: "Hall D" },
    ],
    "Information Technology": [
      { id: 1, course: "Web Development", courseCode: "IT301", date: "2025-06-10", time: "09:00 - 12:00", venue: "Hall B" },
      { id: 2, course: "Mobile Application Development", courseCode: "IT302", date: "2025-06-12", time: "09:00 - 12:00", venue: "Hall C" },
      { id: 3, course: "Cloud Computing", courseCode: "IT303", date: "2025-06-14", time: "09:00 - 12:00", venue: "Hall D" },
      { id: 4, course: "Big Data Analytics", courseCode: "IT304", date: "2025-06-16", time: "09:00 - 12:00", venue: "Hall A" },
      { id: 5, course: "Internet of Things", courseCode: "IT305", date: "2025-06-18", time: "09:00 - 12:00", venue: "Hall B" },
    ],
    "Electrical Engineering": [
      { id: 1, course: "Circuit Analysis", courseCode: "EE301", date: "2025-06-11", time: "09:00 - 12:00", venue: "Hall A" },
      { id: 2, course: "Digital Electronics", courseCode: "EE302", date: "2025-06-13", time: "09:00 - 12:00", venue: "Hall B" },
      { id: 3, course: "Signals and Systems", courseCode: "EE303", date: "2025-06-15", time: "09:00 - 12:00", venue: "Hall C" },
      { id: 4, course: "Control Systems", courseCode: "EE304", date: "2025-06-17", time: "09:00 - 12:00", venue: "Hall D" },
      { id: 5, course: "Power Systems", courseCode: "EE305", date: "2025-06-19", time: "09:00 - 12:00", venue: "Hall A" },
    ]
  };

  // Format date function
  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', { 
      weekday: 'short', 
      month: 'short', 
      day: 'numeric' 
    });
  };

  const handleDownloadPDF = () => {
    if (!selectedDepartment) {
      toast.error("Please select a department first");
      return;
    }
    
    toast.success(`Downloading ${selectedDepartment} exam timetable as PDF...`);
    // In a real app, this would trigger an API call to generate and download the PDF
  };

  return (
    <>
      <Navbar userType={userType} userName={userName} />
      
      <div className="page-container max-w-5xl mx-auto">
        <div className="mb-6">
          <h1 className="text-3xl font-bold">Exam Timetable</h1>
          <p className="text-secondary mt-2">View and download exam schedules</p>
        </div>
        
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Download Exam Timetable</CardTitle>
            <CardDescription>Select a department to view and download the exam schedule</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col md:flex-row items-start md:items-end gap-4">
              <div className="w-full md:w-64">
                <Label htmlFor="department">Department</Label>
                <Select
                  value={selectedDepartment}
                  onValueChange={setSelectedDepartment}
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
              
              <Button
                onClick={handleDownloadPDF}
                disabled={!selectedDepartment}
                className="bg-primary hover:bg-primary-dark flex items-center gap-2"
              >
                <Download size={16} />
                Download Timetable (PDF)
              </Button>
            </div>
          </CardContent>
        </Card>
        
        {selectedDepartment && selectedDepartment !== "All Departments" && (
          <Card>
            <CardHeader>
              <CardTitle>{selectedDepartment} Exam Schedule</CardTitle>
              <CardDescription>Final Examination - Summer 2025</CardDescription>
            </CardHeader>
            <CardContent>
              {examTimetableData[selectedDepartment] ? (
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="text-left border-b">
                        <th className="px-6 py-3 text-sm font-medium text-primary">Date</th>
                        <th className="px-6 py-3 text-sm font-medium text-primary">Time</th>
                        <th className="px-6 py-3 text-sm font-medium text-primary">Course Code</th>
                        <th className="px-6 py-3 text-sm font-medium text-primary">Course Name</th>
                        <th className="px-6 py-3 text-sm font-medium text-primary">Venue</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y">
                      {examTimetableData[selectedDepartment].map((exam) => (
                        <tr key={exam.id} className="hover:bg-light">
                          <td className="px-6 py-4 font-medium">
                            <div className="flex items-center">
                              <Calendar size={14} className="mr-2 text-secondary" />
                              {formatDate(exam.date)}
                            </div>
                          </td>
                          <td className="px-6 py-4 text-secondary">{exam.time}</td>
                          <td className="px-6 py-4">
                            <span className="px-2 py-1 text-xs rounded-full bg-accent-light/30 text-accent">
                              {exam.courseCode}
                            </span>
                          </td>
                          <td className="px-6 py-4 font-medium">{exam.course}</td>
                          <td className="px-6 py-4 text-secondary">{exam.venue}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <div className="text-center py-12">
                  <FileText size={48} className="mx-auto text-secondary opacity-30" />
                  <p className="mt-4 text-secondary">No exam schedule available for this department</p>
                </div>
              )}
            </CardContent>
          </Card>
        )}
        
        {selectedDepartment === "All Departments" && (
          <div className="space-y-8">
            {Object.entries(examTimetableData).map(([department, exams]) => (
              <Card key={department}>
                <CardHeader>
                  <CardTitle>{department} Exam Schedule</CardTitle>
                  <CardDescription>Final Examination - Summer 2025</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="text-left border-b">
                          <th className="px-6 py-3 text-sm font-medium text-primary">Date</th>
                          <th className="px-6 py-3 text-sm font-medium text-primary">Time</th>
                          <th className="px-6 py-3 text-sm font-medium text-primary">Course Code</th>
                          <th className="px-6 py-3 text-sm font-medium text-primary">Course Name</th>
                          <th className="px-6 py-3 text-sm font-medium text-primary">Venue</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y">
                        {exams.map((exam) => (
                          <tr key={exam.id} className="hover:bg-light">
                            <td className="px-6 py-4 font-medium">
                              <div className="flex items-center">
                                <Calendar size={14} className="mr-2 text-secondary" />
                                {formatDate(exam.date)}
                              </div>
                            </td>
                            <td className="px-6 py-4 text-secondary">{exam.time}</td>
                            <td className="px-6 py-4">
                              <span className="px-2 py-1 text-xs rounded-full bg-accent-light/30 text-accent">
                                {exam.courseCode}
                              </span>
                            </td>
                            <td className="px-6 py-4 font-medium">{exam.course}</td>
                            <td className="px-6 py-4 text-secondary">{exam.venue}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default ExamTimetablePage;
