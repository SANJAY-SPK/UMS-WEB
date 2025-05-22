
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "@/components/layout/Navbar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, BookOpen, Calendar, User } from "lucide-react";
import { toast } from "@/components/ui/sonner";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Sidebar } from "@/components/layout/Sidebar";

interface UserType {
  type: "student" | "faculty" | "admin";
  details: {
    name: string;
    email: string;
    contact: string;
    department?: string;
    rollNumber?: string;
    facultyId?: string;
    adminId?: string;
    education?: {
      degree: string;
      institution: string;
      year: string;
    }[];
    workExperience?: {
      position: string;
      organization: string;
      duration: string;
    }[];
  };
}

const EditProfilePage = () => {
  const navigate = useNavigate();
  
  // This would come from a context or state management in a real app
  const [user, setUser] = useState<UserType>({
    type: "student",
    details: {
      name: "John Doe",
      email: "john.doe@university.edu",
      contact: "+1 (555) 123-4567",
      department: "Computer Science",
      rollNumber: "CS2023001",
      education: [
        {
          degree: "High School Diploma",
          institution: "Lincoln High School",
          year: "2021"
        }
      ]
    }
  });

  const [formData, setFormData] = useState({
    name: user.details.name,
    email: user.details.email,
    contact: user.details.contact,
    education: user.details.education || [],
    workExperience: user.details.workExperience || []
  });

  const [educationForm, setEducationForm] = useState({
    degree: "",
    institution: "",
    year: ""
  });

  const [workExperienceForm, setWorkExperienceForm] = useState({
    position: "",
    organization: "",
    duration: ""
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleEducationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setEducationForm(prev => ({ ...prev, [name]: value }));
  };

  const handleWorkExperienceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setWorkExperienceForm(prev => ({ ...prev, [name]: value }));
  };

  const addEducation = () => {
    if (!educationForm.degree || !educationForm.institution || !educationForm.year) {
      toast.error("Please fill all education fields");
      return;
    }
    
    setFormData(prev => ({
      ...prev,
      education: [...prev.education, { ...educationForm }]
    }));
    
    setEducationForm({
      degree: "",
      institution: "",
      year: ""
    });
  };

  const removeEducation = (index: number) => {
    setFormData(prev => ({
      ...prev,
      education: prev.education.filter((_, i) => i !== index)
    }));
  };

  const addWorkExperience = () => {
    if (!workExperienceForm.position || !workExperienceForm.organization || !workExperienceForm.duration) {
      toast.error("Please fill all work experience fields");
      return;
    }
    
    setFormData(prev => ({
      ...prev,
      workExperience: [...(prev.workExperience || []), { ...workExperienceForm }]
    }));
    
    setWorkExperienceForm({
      position: "",
      organization: "",
      duration: ""
    });
  };

  const removeWorkExperience = (index: number) => {
    setFormData(prev => ({
      ...prev,
      workExperience: prev.workExperience!.filter((_, i) => i !== index)
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // In a real app, this would call an API to update the user profile
    setUser(prev => ({
      ...prev,
      details: {
        ...prev.details,
        name: formData.name,
        email: formData.email,
        contact: formData.contact,
        education: formData.education,
        workExperience: formData.workExperience
      }
    }));
    
    toast.success("Profile updated successfully");
  };

  const navItems = user.type === "student" 
    ? [
        { title: "Dashboard", href: "/student/dashboard", icon: BookOpen },
        { title: "Courses", href: "/student/courses", icon: BookOpen },
        { title: "Attendance", href: "/student/attendance", icon: Calendar },
      ]
    : user.type === "faculty"
    ? [
        { title: "Dashboard", href: "/faculty/dashboard", icon: BookOpen },
        { title: "Assignments", href: "/faculty/assignments", icon: BookOpen },
        { title: "Attendance", href: "/faculty/attendance", icon: Calendar },
      ]
    : [
        { title: "Dashboard", href: "/admin/dashboard", icon: BookOpen },
        { title: "Faculty", href: "/admin/faculty", icon: User },
        { title: "Students", href: "/admin/students", icon: User },
      ];

  const getProfilePath = () => {
    switch (user.type) {
      case "student":
        return "/student/profile";
      case "faculty":
        return "/faculty/profile";
      case "admin":
        return "/admin/profile";
      default:
        return "/";
    }
  };

  return (
    <div className="flex h-screen">
      <Sidebar items={navItems} />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Navbar userType={user.type} userName={user.details.name} />
        
        <div className="page-container flex-1 overflow-y-auto">
          <Link 
            to={getProfilePath()} 
            className="flex items-center text-accent hover:text-accent-dark mb-4 inline-block"
          >
            <ArrowLeft size={16} className="mr-1" />
            Back to Profile
          </Link>

          <h1 className="text-3xl font-bold mb-2">Edit Profile</h1>
          <p className="text-secondary mb-6">Update your profile information</p>

          <div className="grid grid-cols-1 md:grid-cols-[240px_1fr] gap-6">
            <div>
              <div className="bg-white p-4 rounded-lg shadow-md">
                <div className="flex flex-col items-center mb-6">
                  <Avatar className="h-24 w-24 mb-4">
                    <AvatarImage src="" alt={user.details.name} />
                    <AvatarFallback className="text-3xl bg-primary text-white">
                      {user.details.name.split(" ").map(n => n[0]).join("")}
                    </AvatarFallback>
                  </Avatar>
                  <Button size="sm" variant="outline">Change Photo</Button>
                </div>

                <nav className="space-y-1">
                  <a 
                    href="#basic-details"
                    className="flex items-center px-3 py-2 text-sm font-medium rounded-md bg-primary/10 text-primary"
                  >
                    Basic Details
                  </a>
                  
                  {user.type === "student" && (
                    <a 
                      href="#education"
                      className="flex items-center px-3 py-2 text-sm font-medium rounded-md text-secondary hover:bg-primary/5 hover:text-primary"
                    >
                      Education Details
                    </a>
                  )}
                  
                  {user.type === "faculty" && (
                    <a 
                      href="#work-experience"
                      className="flex items-center px-3 py-2 text-sm font-medium rounded-md text-secondary hover:bg-primary/5 hover:text-primary"
                    >
                      Work Experience
                    </a>
                  )}
                </nav>
              </div>
              
              <div className="mt-4 text-center">
                <Link to={getProfilePath()}>
                  <Button 
                    variant="outline" 
                    className="w-full"
                  >
                    Cancel
                  </Button>
                </Link>
              </div>
            </div>

            <div>
              <Card className="shadow-md">
                <CardHeader>
                  <CardTitle>Edit Profile Details</CardTitle>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div id="basic-details">
                      <h3 className="text-lg font-semibold mb-4">Basic Details</h3>
                      
                      <div className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="name">Full Name</Label>
                            <Input
                              id="name"
                              name="name"
                              value={formData.name}
                              onChange={handleChange}
                            />
                          </div>
                          
                          <div className="space-y-2">
                            <Label htmlFor="email">Email Address</Label>
                            <Input
                              id="email"
                              name="email"
                              type="email"
                              value={formData.email}
                              onChange={handleChange}
                            />
                          </div>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="contact">Contact Number</Label>
                            <Input
                              id="contact"
                              name="contact"
                              value={formData.contact}
                              onChange={handleChange}
                            />
                          </div>
                          
                          <div className="space-y-2">
                            <Label htmlFor="department">Department</Label>
                            <Input
                              id="department"
                              name="department"
                              value={user.details.department || ""}
                              disabled
                            />
                          </div>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="id">
                              {user.type === "student" ? "Roll Number" : 
                               user.type === "faculty" ? "Faculty ID" : "Admin ID"}
                            </Label>
                            <Input
                              id="id"
                              name="id"
                              value={
                                user.type === "student" ? user.details.rollNumber || "" :
                                user.type === "faculty" ? user.details.facultyId || "" : 
                                user.details.adminId || ""
                              }
                              disabled
                            />
                          </div>
                        </div>
                      </div>
                    </div>

                    {user.type === "student" && (
                      <div id="education" className="pt-4 border-t">
                        <h3 className="text-lg font-semibold mb-4">Education Details</h3>
                        
                        {formData.education.map((edu, index) => (
                          <div key={index} className="mb-4 p-3 bg-light rounded-md">
                            <div className="flex justify-between items-start mb-2">
                              <h4 className="font-medium">{edu.degree}</h4>
                              <Button 
                                type="button" 
                                variant="ghost" 
                                size="sm"
                                className="h-8 px-2 text-red-500"
                                onClick={() => removeEducation(index)}
                              >
                                Remove
                              </Button>
                            </div>
                            <p className="text-sm">{edu.institution}</p>
                            <p className="text-sm text-secondary">{edu.year}</p>
                          </div>
                        ))}
                        
                        <div className="p-4 border rounded-md mt-4">
                          <h4 className="font-medium mb-3">Add New Education</h4>
                          <div className="space-y-4">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                              <div className="space-y-2">
                                <Label htmlFor="degree">Degree/Certificate</Label>
                                <Input
                                  id="degree"
                                  name="degree"
                                  value={educationForm.degree}
                                  onChange={handleEducationChange}
                                  placeholder="e.g., Bachelor of Science"
                                />
                              </div>
                              
                              <div className="space-y-2">
                                <Label htmlFor="institution">Institution</Label>
                                <Input
                                  id="institution"
                                  name="institution"
                                  value={educationForm.institution}
                                  onChange={handleEducationChange}
                                  placeholder="e.g., University Name"
                                />
                              </div>
                            </div>
                            
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                              <div className="space-y-2">
                                <Label htmlFor="year">Year</Label>
                                <Input
                                  id="year"
                                  name="year"
                                  value={educationForm.year}
                                  onChange={handleEducationChange}
                                  placeholder="e.g., 2022"
                                />
                              </div>
                            </div>
                            
                            <Button 
                              type="button"
                              className="bg-accent hover:bg-accent-dark"
                              onClick={addEducation}
                            >
                              Add Education
                            </Button>
                          </div>
                        </div>
                      </div>
                    )}

                    {user.type === "faculty" && (
                      <div id="work-experience" className="pt-4 border-t">
                        <h3 className="text-lg font-semibold mb-4">Work Experience</h3>
                        
                        {formData.workExperience?.map((exp, index) => (
                          <div key={index} className="mb-4 p-3 bg-light rounded-md">
                            <div className="flex justify-between items-start mb-2">
                              <h4 className="font-medium">{exp.position}</h4>
                              <Button 
                                type="button" 
                                variant="ghost" 
                                size="sm"
                                className="h-8 px-2 text-red-500"
                                onClick={() => removeWorkExperience(index)}
                              >
                                Remove
                              </Button>
                            </div>
                            <p className="text-sm">{exp.organization}</p>
                            <p className="text-sm text-secondary">{exp.duration}</p>
                          </div>
                        ))}
                        
                        <div className="p-4 border rounded-md mt-4">
                          <h4 className="font-medium mb-3">Add New Work Experience</h4>
                          <div className="space-y-4">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                              <div className="space-y-2">
                                <Label htmlFor="position">Position</Label>
                                <Input
                                  id="position"
                                  name="position"
                                  value={workExperienceForm.position}
                                  onChange={handleWorkExperienceChange}
                                  placeholder="e.g., Assistant Professor"
                                />
                              </div>
                              
                              <div className="space-y-2">
                                <Label htmlFor="organization">Organization</Label>
                                <Input
                                  id="organization"
                                  name="organization"
                                  value={workExperienceForm.organization}
                                  onChange={handleWorkExperienceChange}
                                  placeholder="e.g., University Name"
                                />
                              </div>
                            </div>
                            
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                              <div className="space-y-2">
                                <Label htmlFor="duration">Duration</Label>
                                <Input
                                  id="duration"
                                  name="duration"
                                  value={workExperienceForm.duration}
                                  onChange={handleWorkExperienceChange}
                                  placeholder="e.g., 2018-2022"
                                />
                              </div>
                            </div>
                            
                            <Button 
                              type="button"
                              className="bg-accent hover:bg-accent-dark"
                              onClick={addWorkExperience}
                            >
                              Add Experience
                            </Button>
                          </div>
                        </div>
                      </div>
                    )}

                    <div className="flex justify-between pt-4">
                      <Link to="/profile/details">
                        <Button 
                          type="button" 
                          variant="outline"
                        >
                          View Profile
                        </Button>
                      </Link>
                      
                      <Button 
                        type="submit"
                        className="bg-primary hover:bg-primary-dark"
                      >
                        Save Changes
                      </Button>
                    </div>
                  </form>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditProfilePage;
