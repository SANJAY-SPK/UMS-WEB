
import { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import Navbar from "@/components/layout/Navbar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Search, Download, FileText, Clock, User } from "lucide-react";
import { toast } from "@/components/ui/sonner";

interface StudentSubmission {
  id: number;
  name: string;
  rollNumber: string;
  submittedOn: string;
  status: "graded" | "pending";
  grade?: string;
}

const GradeSubmissionsPage = () => {
  const { assignmentId } = useParams<{ assignmentId: string }>();
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredSubmissions, setFilteredSubmissions] = useState<StudentSubmission[]>([]);
  const [facultyName] = useState("Dr. Jane Smith");
  const navigate = useNavigate();

  // Mock data
  const assignment = {
    id: parseInt(assignmentId || "1"),
    title: "Database Design Project",
    dueDate: "May 30, 2025",
    submissionCount: 45,
    gradedCount: 32,
  };

  // Sample student submissions data
  const studentSubmissions: StudentSubmission[] = [
    {
      id: 1,
      name: "Alex Johnson",
      rollNumber: "CS20001",
      submittedOn: "2025-05-25T14:30:00",
      status: "graded",
      grade: "A"
    },
    {
      id: 2,
      name: "Samantha Lee",
      rollNumber: "CS20002",
      submittedOn: "2025-05-26T09:15:00",
      status: "graded",
      grade: "B+"
    },
    {
      id: 3,
      name: "Daniel Brown",
      rollNumber: "CS20003",
      submittedOn: "2025-05-26T16:45:00",
      status: "pending"
    },
    {
      id: 4,
      name: "Emily Davis",
      rollNumber: "CS20004",
      submittedOn: "2025-05-27T11:20:00",
      status: "pending"
    },
    {
      id: 5,
      name: "James Wilson",
      rollNumber: "CS20005",
      submittedOn: "2025-05-27T13:50:00",
      status: "pending"
    },
    {
      id: 6,
      name: "Sophia Martinez",
      rollNumber: "CS20006",
      submittedOn: "2025-05-27T14:10:00",
      status: "pending"
    },
    {
      id: 7,
      name: "Michael Taylor",
      rollNumber: "CS20007",
      submittedOn: "2025-05-27T15:30:00",
      status: "pending"
    },
  ];

  // Filter submissions based on search query
  useState(() => {
    const filtered = studentSubmissions.filter((student) =>
      student.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      student.rollNumber.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredSubmissions(filtered);
  });

  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    };
    return new Date(dateString).toLocaleString(undefined, options);
  };

  const handleDownloadCSV = () => {
    toast.success("Generating CSV report...");
    // In a real app, this would trigger an API call to generate and download the report
  };

  const handleDownloadPDF = () => {
    toast.success("Generating PDF report...");
    // In a real app, this would trigger an API call to generate and download the report
  };

  return (
    <>
      <Navbar userType="faculty" userName={facultyName} />
      
      <div className="page-container">
        <div className="mb-6">
          <Link 
            to="/faculty/assignments" 
            className="text-accent hover:text-accent-dark"
          >
            ← Back to Assignments
          </Link>
          
          <div className="flex flex-col md:flex-row md:justify-between md:items-center mt-4">
            <div>
              <h1 className="text-3xl font-bold">Grade Submissions</h1>
              <h2 className="text-xl text-secondary mt-1">{assignment.title}</h2>
            </div>
            
            <div className="flex flex-col md:flex-row gap-2 mt-4 md:mt-0">
              <Button 
                variant="outline" 
                onClick={handleDownloadCSV}
                className="flex items-center gap-2"
              >
                <Download size={16} />
                Download Report (CSV)
              </Button>
              
              <Button 
                variant="outline"
                onClick={handleDownloadPDF} 
                className="flex items-center gap-2"
              >
                <Download size={16} />
                Download Report (PDF)
              </Button>
            </div>
          </div>
        </div>
        
        <div className="bg-white p-4 rounded-md shadow-sm mb-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-6">
              <div>
                <p className="text-sm text-secondary">Due Date</p>
                <p className="font-medium">{assignment.dueDate}</p>
              </div>
              
              <div>
                <p className="text-sm text-secondary">Submissions</p>
                <p className="font-medium">{assignment.submissionCount}</p>
              </div>
              
              <div>
                <p className="text-sm text-secondary">Graded</p>
                <p className="font-medium">{assignment.gradedCount} / {assignment.submissionCount}</p>
              </div>
            </div>
          </div>
        </div>
        
        <div className="mb-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-secondary" size={18} />
            <Input
              placeholder="Search by student name or roll number..."
              className="pl-9"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
        
        <div className="bg-white rounded-md shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-light">
                  <th className="px-4 py-3 text-left text-sm font-medium text-primary">Student</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-primary">Roll Number</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-primary">Submitted On</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-primary">Status</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-primary">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {filteredSubmissions.map((student) => (
                  <tr key={student.id} className="hover:bg-light">
                    <td className="px-4 py-4">
                      <div className="flex items-center">
                        <div className="h-10 w-10 rounded-full bg-primary-light/20 flex items-center justify-center text-primary">
                          <User size={20} />
                        </div>
                        <div className="ml-3">
                          <p className="font-medium text-primary-dark">{student.name}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-4 text-primary-dark">{student.rollNumber}</td>
                    <td className="px-4 py-4">
                      <div className="flex items-center text-secondary">
                        <Clock size={14} className="mr-1" />
                        {formatDate(student.submittedOn)}
                      </div>
                    </td>
                    <td className="px-4 py-4">
                      {student.status === "graded" ? (
                        <span className="px-2 py-1 text-xs rounded-full bg-green-100 text-green-800">
                          Graded: {student.grade}
                        </span>
                      ) : (
                        <span className="px-2 py-1 text-xs rounded-full bg-amber-100 text-amber-800">
                          Pending
                        </span>
                      )}
                    </td>
                    <td className="px-4 py-4">
                      <Button
                        size="sm"
                        onClick={() => navigate(`/faculty/assignments/${assignmentId}/grade/${student.id}`)}
                        className="text-sm flex items-center gap-1 bg-accent hover:bg-accent-dark"
                      >
                        <FileText size={14} />
                        {student.status === "graded" ? "Review" : "Grade"}
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          {filteredSubmissions.length === 0 && (
            <div className="text-center py-8">
              <FileText size={36} className="mx-auto text-secondary opacity-40" />
              <p className="mt-2 text-secondary">No submissions found</p>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default GradeSubmissionsPage;
