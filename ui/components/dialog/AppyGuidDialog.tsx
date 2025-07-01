/** @format */

import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import ApplyAsGuidForm from "../forms/ApplyAsGuidForm";
import { useState } from "react";

export function ApplyGuidDialog({ planId }: { planId?: string }) {
  const [success, setSuccess] = useState<boolean>(false);

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Apply As Guid</Button>
      </DialogTrigger>
      <DialogContent className="bg-[var(--background)] max-h-[500px] overflow-y-auto mt-16">
        <DialogHeader>
          {!success && (
            <DialogTitle>
              Ready to guide? Tell us a bit about yourself
            </DialogTitle>
          )}
        </DialogHeader>
        <ApplyAsGuidForm success={success} setSuccess={setSuccess} planId={planId} />
      </DialogContent>
    </Dialog>
  );
}
