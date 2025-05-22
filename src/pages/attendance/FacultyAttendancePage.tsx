
import { useState } from "react";
import Navbar from "@/components/layout/Navbar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { toast } from "@/components/ui/sonner";
import { Calendar, FileText } from "lucide-react";
import { Link } from "react-router-dom";

interface Student {
  id: number;
  name: string;
  rollNumber: string;
  isPresent: boolean;
}

const FacultyAttendancePage = () => {
  const [facultyName] = useState("Dr. Jane Smith");
  const [formData, setFormData] = useState({
    batch: "",
    department: "",
    date: new Date().toISOString().split("T")[0],
    session: "FN", // FN = Forenoon, AN = Afternoon
  });
  
  // Available departments
  const departments = ["Computer Science", "Information Technology", "Electrical Engineering"];
  
  // Available batches
  const batches = ["2022-2026", "2023-2027", "2024-2028"];
  
  const [students, setStudents] = useState<Student[]>([]);
  const [isFormSubmitted, setIsFormSubmitted] = useState(false);
  const [absenteeCount, setAbsenteeCount] = useState(0);
  
  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleGenerateList = () => {
    // Validate form data
    if (!formData.batch || !formData.department || !formData.date) {
      toast.error("Please fill all required fields");
      return;
    }
    
    // Generate mock student list based on department and batch
    const mockStudents: Student[] = [];
    const count = Math.floor(Math.random() * 10) + 30; // Random count between 30-40
    
    for (let i = 1; i <= count; i++) {
      const deptCode = formData.department === "Computer Science" ? "CS" : 
                      formData.department === "Information Technology" ? "IT" : "EE";
      const year = formData.batch.split("-")[0].substring(2);
      
      mockStudents.push({
        id: i,
        name: `Student ${i}`,
        rollNumber: `${deptCode}${year}${i.toString().padStart(3, '0')}`,
        isPresent: true, // Default to present
      });
    }
    
    setStudents(mockStudents);
    setIsFormSubmitted(false);
    setAbsenteeCount(0);
    toast.success("Student list generated successfully");
  };

  const handleToggleAttendance = (id: number) => {
    setStudents((prev) =>
      prev.map((student) =>
        student.id === id ? { ...student, isPresent: !student.isPresent } : student
      )
    );
  };

  const handleSubmitAttendance = () => {
    if (students.length === 0) {
      toast.error("No students to mark attendance for");
      return;
    }
    
    // Calculate absentee count
    const absentees = students.filter((student) => !student.isPresent).length;
    setAbsenteeCount(absentees);
    setIsFormSubmitted(true);
    
    toast.success("Attendance marked successfully");
  };

  return (
    <>
      <Navbar userType="faculty" userName={facultyName} />
      
      <div className="page-container max-w-4xl mx-auto">
        <div className="mb-6">
          <h1 className="text-3xl font-bold">Attendance Marking</h1>
          <p className="text-secondary mt-2">Mark student attendance for a specific session</p>
        </div>
        
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Select Class Details</CardTitle>
            <CardDescription>Fill in the details to generate the student list</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="department">Department <span className="text-red-500">*</span></Label>
                <Select
                  value={formData.department}
                  onValueChange={(value) => handleSelectChange("department", value)}
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
                <Label htmlFor="batch">Batch <span className="text-red-500">*</span></Label>
                <Select
                  value={formData.batch}
                  onValueChange={(value) => handleSelectChange("batch", value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select a batch" />
                  </SelectTrigger>
                  <SelectContent>
                    {batches.map((batch) => (
                      <SelectItem key={batch} value={batch}>
                        {batch}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="date">Date <span className="text-red-500">*</span></Label>
                <div className="relative">
                  <Calendar className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="date"
                    type="date"
                    className="pl-10"
                    value={formData.date}
                    onChange={(e) => setFormData((prev) => ({ ...prev, date: e.target.value }))}
                    required
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="session">Session <span className="text-red-500">*</span></Label>
                <Select
                  value={formData.session}
                  onValueChange={(value) => handleSelectChange("session", value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select session" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="FN">Forenoon (FN)</SelectItem>
                    <SelectItem value="AN">Afternoon (AN)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            <Button
              onClick={handleGenerateList}
              className="mt-6 bg-primary hover:bg-primary-dark"
            >
              Generate Student List
            </Button>
          </CardContent>
        </Card>
        
        {students.length > 0 && (
          <Card>
            <CardHeader>
              <CardTitle>Mark Attendance</CardTitle>
              <CardDescription>
                {formData.department} - {formData.batch} ({formData.session === "FN" ? "Forenoon" : "Afternoon"} Session)
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full mb-4">
                  <thead>
                    <tr className="text-left border-b">
                      <th className="px-4 py-3 text-sm font-medium text-primary">Roll Number</th>
                      <th className="px-4 py-3 text-sm font-medium text-primary">Name</th>
                      <th className="px-4 py-3 text-sm font-medium text-primary text-center">Attendance</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y">
                    {students.map((student) => (
                      <tr key={student.id}>
                        <td className="px-4 py-3 text-secondary">{student.rollNumber}</td>
                        <td className="px-4 py-3 font-medium">{student.name}</td>
                        <td className="px-4 py-3 text-center">
                          <div className="flex justify-center items-center">
                            <Label htmlFor={`attendance-${student.id}`} className="mr-2 text-sm">
                              {student.isPresent ? "Present" : "Absent"}
                            </Label>
                            <Switch
                              id={`attendance-${student.id}`}
                              checked={student.isPresent}
                              onCheckedChange={() => handleToggleAttendance(student.id)}
                            />
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              
              <div className="flex justify-between items-center mt-6">
                <div className="flex space-x-4">
                  <Button asChild variant="outline">
                    <Link to="/faculty/attendance/view">View Previous Attendance</Link>
                  </Button>
                </div>
                <Button
                  onClick={handleSubmitAttendance}
                  className="bg-primary hover:bg-primary-dark"
                >
                  Submit Attendance
                </Button>
              </div>
              
              {isFormSubmitted && (
                <div className="mt-6 p-4 bg-accent-light/10 rounded-md">
                  <div className="flex items-start">
                    <FileText className="mt-1 h-5 w-5 text-accent" />
                    <div className="ml-2">
                      <h4 className="font-medium">Attendance Summary</h4>
                      <p className="text-secondary text-sm mt-1">
                        Total Students: {students.length}
                      </p>
                      <p className="text-secondary text-sm">
                        Present: {students.length - absenteeCount}
                      </p>
                      <p className="text-secondary text-sm">
                        Absent: {absenteeCount}
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        )}
      </div>
    </>
  );
};

export default FacultyAttendancePage;
