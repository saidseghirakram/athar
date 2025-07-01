'use client';
import { useState, Dispatch, SetStateAction } from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Check, Send } from "lucide-react";
import Spinner from "../../shared/Spinner";
import { poster } from "@/lib/fetcher"; // Uses cookie logic now
import { useSetAtom } from 'jotai';
import { tokenAtom } from '@/atom/auth'; // adjust path as needed

type LoginResponse = {
  email: string;
  token: string;
};

const LoginForm = ({
  success,
  setSuccess,
}: {
  success: boolean;
  setSuccess: Dispatch<SetStateAction<boolean>>;
}) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const setToken = useSetAtom(tokenAtom);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const formData = new FormData(e.currentTarget);
    const payload = {
      email: formData.get("email") as string,
      password: formData.get("password") as string,
    };

    const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "";
    const res = await poster<LoginResponse>(`${BASE_URL}/auth/login`, payload);

    if (res.success) {
      setToken(res.data.token);
      setSuccess(true);
    } else {
      const err =
        typeof res.errors === "string"
          ? res.errors
          : res.errors?.general?.[0] || "Login failed.";
      setError(err);
    }

    setLoading(false);
  };

  return success ? (
    <div className="flex items-center mb-6">
      <div className="shrink-0 bg-[var(--icon-bg)] p-3 rounded-full">
        <Check className="w-5 h-5 text-[var(--icon-color)]" />
      </div>
      <div className="ml-4">
        <h2 className="text-2xl font-bold text-[var(--foreground)] m-0">
          Login Successful!
        </h2>
        <p className="text-[var(--text-muted)] mt-1 mb-0">Welcome back.</p>
      </div>
    </div>
  ) : (
    <Card className="p-6 bg-[var(--background)] border-none shadow-none">
      <form className="space-y-6" onSubmit={handleSubmit}>
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input id="email" type="email" name="email" placeholder="Your email" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="password">Password</Label>
          <Input id="password" type="password" name="password" placeholder="Your password" />
        </div>
        <div className="flex flex-col space-y-1">
          <div className="w-full flex justify-end">
            <Button
              variant="default"
              type="submit"
              className="!px-6 w-fit !rounded-button whitespace-nowrap cursor-pointer"
              disabled={loading}
            >
              Login
              {loading ? (
                <Spinner className="fill-[var(--background)] ml-2" />
              ) : (
                <Send className="ml-2" />
              )}
            </Button>
          </div>
          {error && (
            <p className="text-[10px] text-[var(--error)]" role="alert">
              {error}
            </p>
          )}
        </div>
      </form>
    </Card>
  );
};

export default LoginForm;
