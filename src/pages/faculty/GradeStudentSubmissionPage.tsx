
import { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import Navbar from "@/components/layout/Navbar";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { FileText, Calendar, Download, Eye } from "lucide-react";
import { toast } from "@/components/ui/sonner";

const GradeStudentSubmissionPage = () => {
  const { assignmentId, studentId } = useParams<{
    assignmentId: string;
    studentId: string;
  }>();
  const navigate = useNavigate();
  const [facultyName] = useState("Dr. Jane Smith");
  const [feedback, setFeedback] = useState("");
  const [grade, setGrade] = useState("");

  // Mock data for this demo
  const studentSubmission = {
    id: parseInt(studentId || "1"),
    name: "Alex Johnson",
    rollNumber: "CS20001",
    submittedOn: "2025-05-25T14:30:00",
    document: "Database_ER_Diagram_Final.pdf",
    assignment: {
      id: parseInt(assignmentId || "1"),
      title: "Database Design Project",
    },
  };

  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    };
    return new Date(dateString).toLocaleString(undefined, options);
  };

  const handleSubmitGrade = () => {
    if (!grade) {
      toast.error("Please select a grade for this submission");
      return;
    }
    
    // Success message
    toast.success(`Grade submitted successfully for ${studentSubmission.name}`);
    
    // Navigate back to the grading overview
    setTimeout(() => {
      navigate(`/faculty/assignments/${assignmentId}/grade`);
    }, 1500);
  };

  const handleViewDocument = () => {
    toast.info("Opening document viewer...");
    // In a real app, this would open the document in a viewer or new tab
  };

  return (
    <>
      <Navbar userType="faculty" userName={facultyName} />
      
      <div className="page-container max-w-4xl mx-auto">
        <div className="mb-6">
          <Link
            to={`/faculty/assignments/${assignmentId}/grade`}
            className="text-accent hover:text-accent-dark"
          >
            ← Back to All Submissions
          </Link>

          <h1 className="text-3xl font-bold mt-4">Grade Submission</h1>
          <h2 className="text-xl text-secondary mt-1">
            {studentSubmission.assignment.title}
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Student Information */}
          <div className="lg:col-span-1">
            <Card className="shadow-md">
              <CardHeader>
                <CardTitle className="text-lg">Student Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <p className="text-sm text-secondary">Name</p>
                  <p className="font-medium">{studentSubmission.name}</p>
                </div>
                
                <div>
                  <p className="text-sm text-secondary">Roll Number</p>
                  <p className="font-medium">{studentSubmission.rollNumber}</p>
                </div>
                
                <div>
                  <p className="text-sm text-secondary">Submitted On</p>
                  <div className="flex items-center">
                    <Calendar size={14} className="mr-1 text-secondary" />
                    <p className="font-medium">
                      {formatDate(studentSubmission.submittedOn)}
                    </p>
                  </div>
                </div>
                
                <div>
                  <p className="text-sm text-secondary">Submitted Document</p>
                  <div className="mt-2 p-3 bg-light rounded-md flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="h-8 w-8 bg-primary rounded flex items-center justify-center text-white text-xs">
                        PDF
                      </div>
                      <p className="ml-2 font-medium truncate max-w-[120px]">
                        {studentSubmission.document}
                      </p>
                    </div>
                    <div className="flex space-x-1">
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={handleViewDocument}
                        className="h-8 w-8 p-0"
                      >
                        <Eye size={16} />
                      </Button>
                      <Button
                        size="sm"
                        variant="ghost"
                        className="h-8 w-8 p-0"
                      >
                        <Download size={16} />
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Grading Section */}
          <div className="lg:col-span-2">
            <Card className="shadow-md">
              <CardHeader>
                <CardTitle className="text-lg">Grading</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <h3 className="font-medium mb-3">Select Grade</h3>
                  <RadioGroup value={grade} onValueChange={setGrade} className="grid grid-cols-3 gap-2">
                    <div>
                      <RadioGroupItem value="O" id="O" className="peer sr-only" />
                      <Label
                        htmlFor="O"
                        className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-white p-3 hover:bg-light hover:text-accent-foreground peer-data-[state=checked]:border-accent peer-data-[state=checked]:bg-accent/10"
                      >
                        O
                        <span className="text-xs text-secondary">Outstanding</span>
                      </Label>
                    </div>
                    
                    <div>
                      <RadioGroupItem value="A+" id="A+" className="peer sr-only" />
                      <Label
                        htmlFor="A+"
                        className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-white p-3 hover:bg-light hover:text-accent-foreground peer-data-[state=checked]:border-accent peer-data-[state=checked]:bg-accent/10"
                      >
                        A+
                        <span className="text-xs text-secondary">Excellent</span>
                      </Label>
                    </div>
                    
                    <div>
                      <RadioGroupItem value="A" id="A" className="peer sr-only" />
                      <Label
                        htmlFor="A"
                        className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-white p-3 hover:bg-light hover:text-accent-foreground peer-data-[state=checked]:border-accent peer-data-[state=checked]:bg-accent/10"
                      >
                        A
                        <span className="text-xs text-secondary">Very Good</span>
                      </Label>
                    </div>
                    
                    <div>
                      <RadioGroupItem value="B+" id="B+" className="peer sr-only" />
                      <Label
                        htmlFor="B+"
                        className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-white p-3 hover:bg-light hover:text-accent-foreground peer-data-[state=checked]:border-accent peer-data-[state=checked]:bg-accent/10"
                      >
                        B+
                        <span className="text-xs text-secondary">Good</span>
                      </Label>
                    </div>
                    
                    <div>
                      <RadioGroupItem value="B" id="B" className="peer sr-only" />
                      <Label
                        htmlFor="B"
                        className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-white p-3 hover:bg-light hover:text-accent-foreground peer-data-[state=checked]:border-accent peer-data-[state=checked]:bg-accent/10"
                      >
                        B
                        <span className="text-xs text-secondary">Above Average</span>
                      </Label>
                    </div>
                    
                    <div>
                      <RadioGroupItem value="C" id="C" className="peer sr-only" />
                      <Label
                        htmlFor="C"
                        className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-white p-3 hover:bg-light hover:text-accent-foreground peer-data-[state=checked]:border-accent peer-data-[state=checked]:bg-accent/10"
                      >
                        C
                        <span className="text-xs text-secondary">Average</span>
                      </Label>
                    </div>
                  </RadioGroup>
                </div>
                
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="font-medium">Feedback</h3>
                    <span className="text-xs text-secondary">
                      {feedback.length}/500 characters
                    </span>
                  </div>
                  <Textarea
                    placeholder="Provide feedback on the student's work..."
                    className="min-h-32"
                    value={feedback}
                    onChange={(e) => setFeedback(e.target.value)}
                    maxLength={500}
                  />
                </div>
                
                <Button
                  onClick={handleSubmitGrade}
                  className="w-full bg-primary hover:bg-primary-dark flex items-center gap-2"
                >
                  <FileText size={16} />
                  Submit Grade
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </>
  );
};

export default GradeStudentSubmissionPage;
