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

  const navigate = useNavigate();
  const loginStore = useAuthStore((state) => state.login);

  const handleLogin = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    console.log({
      email,
      password,
    });

    try {
        const response = await login({
            email,
            password,
        });

        localStorage.setItem(
        "accessToken",
        response.accessToken
        );

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

        

        console.log(response);

    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle>Login</CardTitle>
        <CardDescription>
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
              required
              minLength={6}
              onChange={(e) =>
                setPassword(e.target.value)
              }
            />
          </div>

          <Button
            type="submit"
            className="w-full"
          >
            Sign In
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}