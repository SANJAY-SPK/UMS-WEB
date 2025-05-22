
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "@/components/layout/Navbar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar, Upload, Link as LinkIcon, AlertCircle } from "lucide-react";
import { toast } from "@/components/ui/sonner";

const CreateAssignmentPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: "",
    dueDate: "",
    description: "",
    resourceLink: "",
  });
  const [files, setFiles] = useState<File[]>([]);
  const [facultyName] = useState("Dr. Jane Smith");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Form validation
    if (!formData.title || !formData.dueDate || !formData.description || files.length === 0) {
      toast.error("Please fill all required fields and upload at least one file.");
      return;
    }

    // Success message
    toast.success("Assignment created successfully!");
    
    // Navigate back to assignments page after creation
    setTimeout(() => {
      navigate("/faculty/assignments");
    }, 1500);
  };

  return (
    <>
      <Navbar userType="faculty" userName={facultyName} />
      
      <div className="page-container">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold mb-2">Create New Assignment</h1>
          <p className="text-secondary mb-6">Add a new assignment for your students</p>
          
          <Card className="shadow-md">
            <CardHeader>
              <CardTitle>Assignment Details</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="title">Assignment Title <span className="text-red-500">*</span></Label>
                  <Input
                    id="title"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    placeholder="e.g., Final Project Submission"
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="dueDate">Due Date <span className="text-red-500">*</span></Label>
                  <div className="relative">
                    <Calendar className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="dueDate"
                      name="dueDate"
                      type="date"
                      className="pl-10"
                      value={formData.dueDate}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="description">Assignment Description <span className="text-red-500">*</span></Label>
                  <Textarea
                    id="description"
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    placeholder="Provide detailed instructions for the assignment..."
                    rows={6}
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <Label>File Uploads <span className="text-red-500">*</span></Label>
                  <div className="border-2 border-dashed border-secondary/30 rounded-md p-6 text-center">
                    <Input
                      id="files"
                      type="file"
                      multiple
                      className="hidden"
                      onChange={handleFileChange}
                    />
                    <label
                      htmlFor="files"
                      className="flex flex-col items-center justify-center cursor-pointer"
                    >
                      <Upload className="h-12 w-12 text-secondary mb-2" />
                      <p className="text-secondary text-sm mb-1">Drag & drop files here or click to browse</p>
                      <p className="text-xs text-secondary">Supports: PDF, DOC, DOCX, PPT, PPTX, ZIP (Max: 10MB)</p>
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
                            >
                              Remove
                            </Button>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                  
                  {files.length === 0 && (
                    <div className="flex items-center text-amber-600 mt-2">
                      <AlertCircle className="h-4 w-4 mr-1" />
                      <span className="text-xs">At least one file upload is required</span>
                    </div>
                  )}
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="resourceLink">Resource Link (Optional)</Label>
                  <div className="relative">
                    <LinkIcon className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="resourceLink"
                      name="resourceLink"
                      value={formData.resourceLink}
                      onChange={handleChange}
                      className="pl-10"
                      placeholder="e.g., https://example.com/resource"
                    />
                  </div>
                </div>
                
                <div className="flex justify-end space-x-4 pt-4">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => navigate("/faculty/assignments")}
                  >
                    Cancel
                  </Button>
                  <Button type="submit" className="bg-primary hover:bg-primary-dark">
                    Create Assignment
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  );
};

export default CreateAssignmentPage;
