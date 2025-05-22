
import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import Navbar from "@/components/layout/Navbar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  BookOpen, 
  Calendar, 
  FileEdit,
  Upload,
  ArrowLeft,
  X,
  Check,
  User
} from "lucide-react";
import { toast } from "@/components/ui/sonner";
import { Sidebar } from "@/components/layout/Sidebar";

const AssignmentSubmitPage = () => {
  const { assignmentId } = useParams<{ assignmentId: string }>();
  const [studentName] = useState("John Doe");
  const [files, setFiles] = useState<File[]>([]);
  const [isSubmitted, setIsSubmitted] = useState(false);

  // This would be fetched from an API in a real application
  const assignment = {
    id: parseInt(assignmentId || "1"),
    title: "Database Design Project",
    dueDate: "2025-05-30",
    courseName: "Database Management Systems",
    courseId: 1,
    description: "Design a database schema for a university management system with at least 10 entities and appropriate relationships between them. Include ER diagrams and SQL DDL statements.",
    feedback: isSubmitted ? {
      facultyName: "Dr. Jane Smith",
      grade: "A",
      comment: "Excellent work on the ER diagram. The relationships between entities are well thought out."
    } : null
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const fileArray = Array.from(e.target.files);
      setFiles((prev) => [...prev, ...fileArray]);
    }
  };

  const removeFile = (index: number) => {
    setFiles((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = () => {
    if (files.length === 0) {
      toast.error("Please upload at least one file");
      return;
    }
    
    toast.success("Assignment submitted successfully");
    setIsSubmitted(true);
  };

  const handleUnsubmit = () => {
    if (confirm("Are you sure you want to unsubmit this assignment? This will remove your current submission.")) {
      setIsSubmitted(false);
      setFiles([]);
      toast.info("Assignment unsubmitted");
    }
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
            to={`/student/courses/${assignment.courseId}`} 
            className="flex items-center text-accent hover:text-accent-dark mb-4 inline-block"
          >
            <ArrowLeft size={16} className="mr-1" />
            Back to Course
          </Link>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <Card className="shadow-md mb-6">
                <CardHeader>
                  <CardTitle>Assignment Details</CardTitle>
                </CardHeader>
                <CardContent>
                  <h2 className="text-2xl font-bold text-primary mb-2">{assignment.title}</h2>
                  <p className="text-secondary mb-4">{assignment.courseName}</p>
                  
                  <div className="flex items-center text-sm text-secondary mb-6">
                    <Calendar size={16} className="mr-1" />
                    <span>Due: {formatDate(assignment.dueDate)}</span>
                  </div>
                  
                  <div className="mb-6">
                    <h3 className="text-lg font-semibold mb-2">Description</h3>
                    <p>{assignment.description}</p>
                  </div>
                </CardContent>
              </Card>

              <Card className="shadow-md">
                <CardHeader>
                  <CardTitle>Submit Your Work</CardTitle>
                </CardHeader>
                <CardContent>
                  {!isSubmitted ? (
                    <>
                      <div className="border-2 border-dashed border-secondary/30 rounded-md p-6 text-center">
                        <input
                          id="file-upload"
                          type="file"
                          multiple
                          className="hidden"
                          onChange={handleFileChange}
                          disabled={isSubmitted}
                        />
                        <label
                          htmlFor="file-upload"
                          className="flex flex-col items-center justify-center cursor-pointer"
                        >
                          <Upload className="h-12 w-12 text-secondary mb-2" />
                          <p className="text-secondary text-sm mb-1">Drag & drop files here or click to browse</p>
                          <p className="text-xs text-secondary">Supports: PDF, DOC, DOCX, ZIP (Max: 10MB)</p>
                        </label>
                      </div>
                      
                      {files.length > 0 && (
                        <div className="mt-4">
                          <h4 className="text-sm font-medium mb-2">Uploaded Files:</h4>
                          <div className="space-y-2">
                            {files.map((file, index) => (
                              <div
                                key={index}
                                className="flex items-center justify-between bg-light p-2 rounded"
                              >
                                <div className="flex items-center">
                                  <div className="flex-shrink-0 h-8 w-8 bg-primary rounded flex items-center justify-center text-white text-xs">
                                    {file.name.split('.').pop()?.toUpperCase()}
                                  </div>
                                  <div className="ml-3">
                                    <p className="text-sm font-medium truncate max-w-[200px]">
                                      {file.name}
                                    </p>
                                    <p className="text-xs text-secondary">
                                      {(file.size / 1024).toFixed(1)} KB
                                    </p>
                                  </div>
                                </div>
                                <Button
                                  type="button"
                                  variant="ghost"
                                  size="sm"
                                  className="text-red-500 hover:text-red-700 hover:bg-red-50"
                                  onClick={() => removeFile(index)}
                                  disabled={isSubmitted}
                                >
                                  <X size={16} />
                                </Button>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      <div className="mt-6">
                        <Button 
                          onClick={handleSubmit} 
                          className="bg-primary hover:bg-primary-dark"
                          disabled={files.length === 0}
                        >
                          Submit Assignment
                        </Button>
                      </div>
                    </>
                  ) : (
                    <div className="space-y-4">
                      <div className="bg-green-50 border border-green-200 rounded-md p-4 flex items-start">
                        <Check size={20} className="text-green-500 mr-3 mt-1" />
                        <div>
                          <h3 className="font-medium text-green-700">Assignment Submitted</h3>
                          <p className="text-green-600 text-sm">Your assignment has been successfully submitted.</p>
                          <p className="text-green-600 text-sm">Submitted on: {new Date().toLocaleDateString()}</p>
                        </div>
                      </div>
                      
                      <div>
                        <h4 className="text-sm font-medium mb-2">Submitted Files:</h4>
                        <div className="space-y-2">
                          {files.map((file, index) => (
                            <div
                              key={index}
                              className="flex items-center justify-between bg-light p-2 rounded"
                            >
                              <div className="flex items-center">
                                <div className="flex-shrink-0 h-8 w-8 bg-primary rounded flex items-center justify-center text-white text-xs">
                                  {file.name.split('.').pop()?.toUpperCase()}
                                </div>
                                <div className="ml-3">
                                  <p className="text-sm font-medium truncate max-w-[200px]">
                                    {file.name}
                                  </p>
                                  <p className="text-xs text-secondary">
                                    {(file.size / 1024).toFixed(1)} KB
                                  </p>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                      
                      <div className="mt-4">
                        <Button 
                          onClick={handleUnsubmit} 
                          variant="outline"
                          className="text-red-500 border-red-500 hover:bg-red-50"
                        >
                          Unsubmit
                        </Button>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
            
            <div className="lg:col-span-1">
              {assignment.feedback && (
                <Card className="shadow-md">
                  <CardHeader>
                    <CardTitle>Feedback</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="mb-4 flex items-center">
                      <User size={18} className="text-secondary mr-2" />
                      <span className="font-medium">{assignment.feedback.facultyName}</span>
                    </div>
                    
                    <div className="mb-4">
                      <h4 className="text-sm font-medium mb-1">Grade</h4>
                      <div className="flex items-center">
                        <div className="w-10 h-10 rounded-full bg-green-100 text-green-700 flex items-center justify-center font-bold">
                          {assignment.feedback.grade}
                        </div>
                      </div>
                    </div>
                    
                    <div>
                      <h4 className="text-sm font-medium mb-1">Comments</h4>
                      <p className="bg-light p-3 rounded text-sm">
                        {assignment.feedback.comment}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AssignmentSubmitPage;
