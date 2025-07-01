import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import SignupForm from "../forms/SignupForm";
import LoginForm from "../forms/LoginForm";
import { useState } from "react";

export function AuthDialog() {
  const [success, setSuccess] = useState<boolean>(false);
  const [mode, setMode] = useState<'signup' | 'login'>('signup');

  const handleToggle = () => {
    setSuccess(false);
    setMode(mode === 'signup' ? 'login' : 'signup');
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Sign up</Button>
      </DialogTrigger>
      <DialogContent className="bg-[var(--background)] max-h-[500px] overflow-y-auto mt-16">
        <DialogHeader>
          {!success && (
            <DialogTitle>
              {mode === 'signup' ? 'Create your account' : 'Login to your account'}
            </DialogTitle>
          )}
        </DialogHeader>
        {mode === 'signup' ? (
          <SignupForm success={success} setSuccess={setSuccess} />
        ) : (
          <LoginForm success={success} setSuccess={setSuccess} />
        )}
        <div className="w-full flex justify-center mt-2">
          <button
            type="button"
            className="text-xs text-[#2E7D32] hover:underline"
            onClick={handleToggle}
          >
            {mode === 'signup'
              ? 'Already have an account? Login'
              : "Don't have an account? Sign up"}
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default AuthDialog; 