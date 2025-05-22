
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { BookOpen, User, Users } from "lucide-react";

const Index = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-primary to-primary-light">
      <header className="w-full py-6 px-4 md:px-8">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl font-bold text-white">UniManager</h1>
        </div>
      </header>

      <main className="flex-grow flex items-center justify-center p-4">
        <div className="max-w-5xl w-full mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              University Management System
            </h2>
            <p className="text-xl text-white/80 max-w-2xl mx-auto">
              A comprehensive platform for managing academic activities, assignments, attendance, and more.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            <Card className="bg-white/10 backdrop-blur-sm border-white/20 text-white hover:bg-white/20 transition-all">
              <CardContent className="p-6 flex flex-col items-center text-center">
                <User className="h-12 w-12 mb-4" />
                <h3 className="text-xl font-medium mb-2">Faculty Portal</h3>
                <p className="text-sm text-white/80 mb-4">
                  Manage assignments, track student attendance, and upload course materials.
                </p>
                <Button 
                  className="bg-white text-primary hover:bg-white/90" 
                  onClick={() => navigate("/login")}
                >
                  Faculty Login
                </Button>
              </CardContent>
            </Card>

            <Card className="bg-white/10 backdrop-blur-sm border-white/20 text-white hover:bg-white/20 transition-all">
              <CardContent className="p-6 flex flex-col items-center text-center">
                <BookOpen className="h-12 w-12 mb-4" />
                <h3 className="text-xl font-medium mb-2">Student Portal</h3>
                <p className="text-sm text-white/80 mb-4">
                  Access courses, submit assignments, and view attendance records.
                </p>
                <Button 
                  className="bg-white text-primary hover:bg-white/90"
                  onClick={() => navigate("/login")}
                >
                  Student Login
                </Button>
              </CardContent>
            </Card>

            <Card className="bg-white/10 backdrop-blur-sm border-white/20 text-white hover:bg-white/20 transition-all">
              <CardContent className="p-6 flex flex-col items-center text-center">
                <Users className="h-12 w-12 mb-4" />
                <h3 className="text-xl font-medium mb-2">Administration</h3>
                <p className="text-sm text-white/80 mb-4">
                  Manage faculty, students, departments, and system settings.
                </p>
                <Button 
                  className="bg-white text-primary hover:bg-white/90"
                  onClick={() => navigate("/login")}
                >
                  Admin Login
                </Button>
              </CardContent>
            </Card>
          </div>

          <div className="text-center">
            <p className="text-white/80 mb-4">Don't have an account yet?</p>
            <Button 
              variant="outline" 
              className="border-white text-white hover:bg-white hover:text-primary"
              onClick={() => navigate("/signup")}
            >
              Create Account
            </Button>
          </div>
        </div>
      </main>

      <footer className="w-full py-6 px-4 md:px-8 text-center text-white/60 text-sm">
        <p>© 2025 University Management System. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Index;
