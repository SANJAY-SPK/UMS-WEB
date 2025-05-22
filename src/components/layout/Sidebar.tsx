
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";

interface SidebarProps {
  items: {
    title: string;
    href: string;
    icon?: React.ComponentType<{ className?: string }>;
  }[];
  className?: string;
}

export function Sidebar({ items, className }: SidebarProps) {
  const location = useLocation();

  return (
    <div className={cn("py-4 w-64 bg-white h-full shadow-md", className)}>
      <div className="space-y-1">
        {items.map((item) => {
          const isActive = location.pathname === item.href;
          return (
            <Link
              key={item.href}
              to={item.href}
              className={cn(
                "flex items-center px-4 py-3 text-sm font-medium border-l-4",
                isActive
                  ? "border-primary bg-primary-light/10 text-primary"
                  : "border-transparent text-primary-dark hover:bg-secondary/5 hover:border-secondary"
              )}
            >
              {item.icon && <item.icon className="mr-2 h-5 w-5" />}
              <span>{item.title}</span>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
