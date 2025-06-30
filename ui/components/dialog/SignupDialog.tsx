import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import SignupForm from "../forms/SignupForm";
import { useState } from "react";

export function SignupDialog() {
  const [success, setSuccess] = useState<boolean>(false);

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Sign up</Button>
      </DialogTrigger>
      <DialogContent className="bg-[var(--background)] max-h-[500px] overflow-y-auto">
        <DialogHeader>
          {!success && (
            <DialogTitle>
              Create your account
            </DialogTitle>
          )}
        </DialogHeader>
        <SignupForm success={success} setSuccess={setSuccess} />
      </DialogContent>
    </Dialog>
  );
}

export default SignupDialog; 