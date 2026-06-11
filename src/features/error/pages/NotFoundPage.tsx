import { useNavigate } from "react-router-dom";
import { Compass, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function NotFoundPage() {
  const navigate = useNavigate();

  return (
    <div className="flex min-h-[70vh] flex-col items-center justify-center p-4 relative overflow-hidden">
      <div className="relative flex w-full max-w-md flex-col items-center text-center">
        <h1 className="bg-gradient-to-r from-primary via-foreground to-muted-foreground bg-clip-text text-8xl font-extrabold tracking-tighter text-transparent">
          404
        </h1>

        <h2 className="mt-4 text-xl font-bold tracking-tight">
          Page Not Found
        </h2>

        <p className="mt-2 text-sm text-muted-foreground max-w-[280px]">
          The route you are trying to access does not exist, or has been moved.
        </p>

        <Button
          onClick={() => navigate("/")}
          className="mt-8 gap-2 cursor-pointer shadow-sm hover:shadow-md transition-all duration-200"
          size="lg"
        >
          <ArrowLeft className="h-4 w-4" />
          <span>Go Back Home</span>
        </Button>
      </div>
    </div>
  );
}
