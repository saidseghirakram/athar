/** @format */

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { Dispatch, SetStateAction, useState, useEffect } from "react";
import Spinner from "../../shared/Spinner";
import { Check, Send } from "lucide-react";
import { poster } from "@/lib/fetcher";
import { useRouter } from 'next/router';

const initValidation = {
  name: [],
  email: [],
  phone: [],
  age: [],
  gender: [],
  country: [],
  city: [],
  message: [],
};

const ApplyAsGuidForm = ({
  success,
  setSuccess,
  planId,
}: {
  success: boolean;
  setSuccess: Dispatch<SetStateAction<boolean>>;
  planId?: string;
}) => {
  const [loading, setLoading] = useState(false);

  const [error, setError] = useState<string | null>(null);


  const [validationMsgs, setValidationMsgs] = useState<{
    [key: string]: string[] | undefined;
  }>(initValidation);

  const handleFocus = (field: string) => {
    setValidationMsgs({
      ...validationMsgs,
      [field]: [],
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(e.currentTarget);

    const payload: any = {
      name: formData.get("name") as string,
      email: formData.get("email") as string,
      phone: String(formData.get("phone")),
      age: Number(formData.get("age")),
      gender: (formData.get("gender") as string)?.toUpperCase(),
      country: formData.get("country") as string,
      city: formData.get("city") as string,
      message: formData.get("message") as string,
    };
    if (planId) {
      payload.planId = planId;
    } else if (typeof window !== 'undefined') {
      const match = window.location.pathname.match(/\/plans\/([\w-]+)/);
      if (match && match[1]) {
        payload.planId = match[1];
      }
    }

    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
    const apiUrl = baseUrl ? baseUrl + '/guest/volunteer' : '/volunteer';
    const res = await poster(apiUrl, payload);
    if (res.success) {
      setSuccess(true);
      setError(null);
    } else {
      if (res.errors != null) {
        setValidationMsgs(res.errors!);
      }
      setError("Something went wrong.");
    }

    setLoading(false);
  };

  return success ? (
    <div className="flex items-center mb-6 mt-100">
      <div className="shrink-0 bg-[var(--icon-bg)] p-3 rounded-full">
        <Check className="w-5 h-5 text-[var(--icon-color)]" />
      </div>
      <div className="ml-4">
        <h2 className="text-2xl font-bold text-[var(--foreground)] m-0">
          Message Sent Successfully!
        </h2>
        <p className="text-[var(--text-muted)] mt-1 mb-0">
          Thank you for reaching out.
        </p>
      </div>
    </div>
  ) : (
    <Card className="p-6 bg-[var(--background)] border-none shadow-none">
      <form className="space-y-6" onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label htmlFor="name">Name</Label>
            <Input
              id="name"
              name="name"
              placeholder="Your name"
              onFocus={() => handleFocus("name")}
              error={validationMsgs?.name?.[0]}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              name="email"
              placeholder="Your email"
              onFocus={() => handleFocus("email")}
              error={validationMsgs?.email?.[0]}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="phone">Phone</Label>
            <Input
              id="phone"
              type="number"
              name="phone"
              placeholder="Phone Number"
              onFocus={() => handleFocus("phone")}
              error={validationMsgs?.phone?.[0]}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="age">Age</Label>
            <Input
              id="age"
              type="number"
              name="age"
              placeholder="Age"
              onFocus={() => handleFocus("age")}
              error={validationMsgs?.age?.[0]}
            />
          </div>
        </div>

        <Select name="gender">
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Select your Gender" />
          </SelectTrigger>
          <SelectContent className="bg-[var(--background)]">
            <SelectGroup className="z-10">
              <SelectItem value="male">Male</SelectItem>
              <SelectItem value="female">Female</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label htmlFor="country">Country</Label>
            <Input
              id="country"
              name="country"
              placeholder="Where are you from ?"
              onFocus={() => handleFocus("country")}
              error={validationMsgs?.country?.[0]}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="city">City</Label>
            <Input
              id="city"
              name="city"
              placeholder="City"
              onFocus={() => handleFocus("city")}
              error={validationMsgs?.city?.[0]}
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="message">Message</Label>
          <Textarea
            id="message"
            name="message"
            placeholder="Your message"
            onFocus={() => handleFocus("content")}
            error={validationMsgs?.message?.[0]}
            rows={5}
          />
        </div>
        <div className="flex flex-col space-y-1">
          <div className="w-full flex justify-end">
            <Button
              variant="default"
              type="submit"
              className="!px-6 w-fit !rounded-button whitespace-nowrap cursor-pointer"
            >
              Send
              {loading ? (
                <Spinner className="fill-[var(--background)]" />
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

export default ApplyAsGuidForm;
