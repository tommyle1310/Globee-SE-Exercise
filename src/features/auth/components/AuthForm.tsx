import { useState } from "react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { PasswordInput } from "@/components/ui/password-input";
import { login, getMe } from "../services/auth.service";
import { useNavigate } from "react-router";
import { useAuthStore } from "@/stores/useAuthStore";
import { AlertCircle } from "lucide-react";

export default function AuthForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const [isLoginLoading, setIsLoginLoading] = useState(false);

  const navigate = useNavigate();
  const loginStore = useAuthStore((state) => state.login);

  const handleLogin = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();
    setIsLoginLoading(true);
    console.log({
      email,
      password,
    });

    try {
      await login({
        email,
        password,
      });

      const user = await getMe();
      loginStore(user);

      navigate("/");

    } catch (error) {
      console.error("Login failed:", error);
      setErrorMessage("Invalid email or password");
    }
    finally {
      setIsLoginLoading(false);
    }
  };

  return (
    <Card className="w-full max-w-md shadow-lg">
      <CardHeader>
        <CardTitle className="text-center text-2xl font-bold mt-4 mb-2">Login</CardTitle>
        <CardDescription className="text-center text-sm text-muted-foreground mb-4">
          Enter your email and password to continue
        </CardDescription>
      </CardHeader>

      <CardContent>
        <form
          className="space-y-4"
          onSubmit={handleLogin}
        >
          <div className="space-y-2">
            <Label htmlFor="email">
              Email
            </Label>

            <Input
              id="email"
              type="email"
              placeholder="Email"
              value={email}
              required
              onChange={(e) =>
                setEmail(e.target.value)
              }
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="password">
              Password
            </Label>

            <PasswordInput
              id="password"
              placeholder="••••••••"
              value={password}
              required
              minLength={4}
              onChange={(e) =>
                setPassword(e.target.value)
              }
            />
          </div>
          {errorMessage && (
            <div className="flex items-center gap-2 rounded-lg border border-destructive/20 bg-destructive/10 p-3 text-destructive">
              <AlertCircle className="h-4 w-4 shrink-0" />
              <p className="text-sm font-medium">{errorMessage}</p>
            </div>
          )}

          <Button
            type="submit"
            className="w-full cursor-pointer"
          >
            {isLoginLoading ? (
              <span>Signing in...</span>
            ) : (
              <span>Sign In</span>
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}