
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Navbar from "@/components/layout/Navbar";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Search, Plus, Calendar, Book, Users, CheckCircle, FileEdit } from "lucide-react";

interface Assignment {
  id: number;
  title: string;
  dueDate: string;
  course: string;
  submissionCount: number;
  gradedCount: number;
}

const AssignmentsPage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredAssignments, setFilteredAssignments] = useState<Assignment[]>([]);
  const [facultyName] = useState("Dr. Jane Smith");

  // Sample assignments data
  const assignments: Assignment[] = [
    {
      id: 1,
      title: "Database Design Project",
      dueDate: "2025-05-30",
      course: "Database Management",
      submissionCount: 45,
      gradedCount: 32,
    },
    {
      id: 2,
      title: "User Interface Mockups",
      dueDate: "2025-06-05",
      course: "Human-Computer Interaction",
      submissionCount: 38,
      gradedCount: 15,
    },
    {
      id: 3,
      title: "Algorithm Analysis",
      dueDate: "2025-06-10",
      course: "Data Structures & Algorithms",
      submissionCount: 42,
      gradedCount: 0,
    },
    {
      id: 4,
      title: "Network Security Case Study",
      dueDate: "2025-06-15",
      course: "Computer Networks",
      submissionCount: 36,
      gradedCount: 0,
    },
    {
      id: 5,
      title: "Software Requirements Doc",
      dueDate: "2025-06-20",
      course: "Software Engineering",
      submissionCount: 40,
      gradedCount: 0,
    },
  ];

  // Filter assignments based on search query
  useEffect(() => {
    const filtered = assignments.filter((assignment) =>
      assignment.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      assignment.course.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredAssignments(filtered);
  }, [searchQuery]);

  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <>
      <Navbar userType="faculty" userName={facultyName} />
      
      <div className="page-container">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold">Assignments</h1>
            <p className="text-secondary mt-2">Manage and grade student assignments</p>
          </div>
          
          <Link to="/faculty/assignments/create">
            <Button className="mt-4 md:mt-0 bg-primary hover:bg-primary-dark flex items-center gap-2">
              <Plus size={18} />
              Create New Assignment
            </Button>
          </Link>
        </div>
        
        <div className="flex flex-col md:flex-row md:items-center gap-4 mb-8">
          <div className="relative flex-grow">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-secondary" size={18} />
            <Input
              placeholder="Search assignments..."
              className="pl-9"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
        
        {filteredAssignments.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredAssignments.map((assignment) => (
              <Card key={assignment.id} className="overflow-hidden card-hover">
                <CardContent className="p-0">
                  <div className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h3 className="text-xl font-semibold text-primary">{assignment.title}</h3>
                        <div className="flex items-center text-sm text-secondary mt-1">
                          <Book size={14} className="mr-1" />
                          {assignment.course}
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center text-sm text-secondary mb-4">
                      <Calendar size={14} className="mr-1" />
                      <span>Due: {formatDate(assignment.dueDate)}</span>
                    </div>
                    
                    <div className="flex justify-between items-center mb-4">
                      <div className="flex items-center text-sm">
                        <Users size={14} className="mr-1 text-secondary" />
                        <span className="text-secondary">Submitted: {assignment.submissionCount}</span>
                      </div>
                      
                      <div className="flex items-center text-sm">
                        <CheckCircle size={14} className="mr-1 text-secondary" />
                        <span className="text-secondary">Graded: {assignment.gradedCount}</span>
                      </div>
                    </div>
                    
                    <Link 
                      to={`/faculty/assignments/${assignment.id}/grade`}
                      className="flex items-center justify-center w-full py-2 mt-2 bg-accent hover:bg-accent-dark text-white rounded transition-colors duration-300"
                    >
                      <FileEdit size={16} className="mr-2" />
                      Grade Submissions
                    </Link>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <div className="text-center py-12 bg-light rounded-lg">
            <FileEdit size={48} className="mx-auto text-secondary opacity-40" />
            <h3 className="mt-4 text-xl font-semibold text-primary">No assignments found</h3>
            <p className="mt-2 text-secondary">Try adjusting your search or create a new assignment</p>
          </div>
        )}
      </div>
    </>
  );
};

export default AssignmentsPage;
