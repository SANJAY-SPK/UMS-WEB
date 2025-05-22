
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";

// Auth Pages
import LoginPage from "./pages/auth/LoginPage";
import SignupPage from "./pages/auth/SignupPage";
import ForgotPasswordPage from "./pages/auth/ForgotPasswordPage";

// Student Pages
import StudentDashboard from "./pages/student/StudentDashboard";
import StudentCoursesPage from "./pages/student/StudentCoursesPage";
import CourseDetailPage from "./pages/student/CourseDetailPage";
import AssignmentSubmitPage from "./pages/student/AssignmentSubmitPage";

// Faculty Pages
import FacultyDashboard from "./pages/faculty/FacultyDashboard";
import AssignmentsPage from "./pages/faculty/AssignmentsPage";
import CreateAssignmentPage from "./pages/faculty/CreateAssignmentPage";
import GradeSubmissionsPage from "./pages/faculty/GradeSubmissionsPage";
import GradeStudentSubmissionPage from "./pages/faculty/GradeStudentSubmissionPage";

// Admin Pages
import AdminDashboard from "./pages/admin/AdminDashboard";
import ManageFacultyPage from "./pages/admin/ManageFacultyPage";
import RegisterFacultyPage from "./pages/admin/RegisterFacultyPage";

// Profile Pages
import UserProfilePage from "./pages/profile/UserProfilePage";
import EditProfilePage from "./pages/profile/EditProfilePage";
import UpdatePasswordPage from "./pages/profile/UpdatePasswordPage";

// Attendance Pages
import FacultyAttendancePage from "./pages/attendance/FacultyAttendancePage";
import StudentAttendancePage from "./pages/attendance/StudentAttendancePage";
import ExamTimetablePage from "./pages/attendance/ExamTimetablePage";

// Others
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          {/* Default landing page */}
          <Route path="/" element={<LoginPage />} />
          
          {/* Auth Routes */}
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/forgot-password" element={<ForgotPasswordPage />} />
          
          {/* Student Routes */}
          <Route path="/student/dashboard" element={<StudentDashboard />} />
          <Route path="/student/courses" element={<StudentCoursesPage />} />
          <Route path="/student/courses/:courseId" element={<CourseDetailPage />} />
          <Route path="/student/assignments/:assignmentId/submit" element={<AssignmentSubmitPage />} />
          <Route path="/student/attendance" element={<StudentAttendancePage />} />
          <Route path="/student/profile" element={<UserProfilePage />} />
          <Route path="/student/profile/edit" element={<EditProfilePage />} />
          <Route path="/student/profile/details" element={<UserProfilePage />} />
          
          {/* Faculty Routes */}
          <Route path="/faculty/dashboard" element={<FacultyDashboard />} />
          <Route path="/faculty/assignments" element={<AssignmentsPage />} />
          <Route path="/faculty/assignments/create" element={<CreateAssignmentPage />} />
          <Route path="/faculty/assignments/:assignmentId/grade" element={<GradeSubmissionsPage />} />
          <Route path="/faculty/assignments/:assignmentId/grade/:studentId" element={<GradeStudentSubmissionPage />} />
          <Route path="/faculty/attendance" element={<FacultyAttendancePage />} />
          <Route path="/faculty/profile" element={<UserProfilePage />} />
          <Route path="/faculty/profile/edit" element={<EditProfilePage />} />
          <Route path="/faculty/profile/details" element={<UserProfilePage />} />
          
          {/* Admin Routes */}
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
          <Route path="/admin/faculty" element={<ManageFacultyPage />} />
          <Route path="/admin/faculty/register" element={<RegisterFacultyPage />} />
          <Route path="/admin/profile" element={<UserProfilePage />} />
          <Route path="/admin/profile/edit" element={<EditProfilePage />} />
          <Route path="/admin/profile/details" element={<UserProfilePage />} />
          
          {/* Shared Routes */}
          <Route path="/exams/timetable" element={<ExamTimetablePage />} />
          <Route path="/update-password" element={<UpdatePasswordPage />} />
          
          {/* Catch-all route */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
