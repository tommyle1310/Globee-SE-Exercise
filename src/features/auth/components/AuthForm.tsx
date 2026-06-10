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
import { login } from "../services/auth.service";
import { useNavigate } from "react-router";
import { useAuthStore } from "@/stores/useAuthStore";

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
        const response = await login({
            email,
            password,
        });
        // if (response.accessToken) {
        // console.log("Login successful!");
        // // Bạn có thể thực hiện các hành động sau khi đăng nhập thành công, ví dụ: chuyển hướng trang, cập nhật trạng thái người dùng, v.v.
        // }

        loginStore(
          email,
          response.accessToken,
          response.refreshToken
        );

        navigate("/");

        setErrorMessage("");

        console.log(response);

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
              className="w-full cursor-pointer"
              onChange={(e) =>
                setPassword(e.target.value)
              }
            />
          </div>
          <Card className="border-red-500 border bg-red-200 p-2 flex flex-col gap-2 items-center rounded-lg">
            <CardContent className="p-0">
              {errorMessage && (
                <p className="text-red-600 text-sm">
                  {errorMessage}
                </p>
              )}
            </CardContent>
          </Card>

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