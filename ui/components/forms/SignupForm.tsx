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
import { Dispatch, SetStateAction, useState } from "react";
import Spinner from "../../shared/Spinner";
import { Check, Send } from "lucide-react";
import { poster } from "@/lib/fetcher";

const initValidation = {
  email: [],
  password: [],
  name: [],
  age: [],
  gender: [],
  country: [],
  city: [],
  profilePicture: [],
  role: [],
};

const SignupForm = ({
  success,
  setSuccess,
}: {
  success: boolean;
  setSuccess: Dispatch<SetStateAction<boolean>>;
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
    const payload = {
      email: formData.get("email") as string,
      password: formData.get("password") as string,
      name: formData.get("name") as string,
      age: Number(formData.get("age")),
      gender: formData.get("gender") as string,
      country: formData.get("country") as string,
      city: formData.get("city") as string,
      profilePicture: formData.get("profilePicture") as string,
      role: formData.get("role") as string,
    };
    const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;
    console.log("BASE_URL:", BASE_URL);
    const res = await poster(`${BASE_URL}/auth/register`, payload);
    if (res.success) {
      setSuccess(true);
      setError(null);
    } else {
      if (typeof res.errors === "string") {
        setError(res.errors);
      } else if (typeof res.errors === "object" && res.errors !== null) {
        if (res.errors.error) {
          setError(res.errors.error);
        } else if (res.errors.general && Array.isArray(res.errors.general) && res.errors.general.length > 0) {
          setError(res.errors.general[0]);
        } else {
          setError("Something went wrong.");
        }
      } else {
        setError("Something went wrong.");
      }
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
          Account Created Successfully!
        </h2>
        <p className="text-[var(--text-muted)] mt-1 mb-0">
          You can now sign in.
        </p>
      </div>
    </div>
  ) : (
    <Card className="p-6 bg-[var(--background)] border-none shadow-none">
      <form className="space-y-6" onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              name="password"
              placeholder="Password"
              onFocus={() => handleFocus("password")}
              error={validationMsgs?.password?.[0]}
            />
          </div>
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
              <SelectItem value="MALE">Male</SelectItem>
              <SelectItem value="FEMALE">Female</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label htmlFor="country">Country</Label>
            <Input
              id="country"
              name="country"
              placeholder="Where are you from?"
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
          <Label htmlFor="profilePicture">Profile Picture URL</Label>
          <Input
            id="profilePicture"
            name="profilePicture"
            placeholder="Profile picture URL"
            onFocus={() => handleFocus("profilePicture")}
            error={validationMsgs?.profilePicture?.[0]}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="role">Role</Label>
          <Select name="role">
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select your Role" />
            </SelectTrigger>
            <SelectContent className="bg-[var(--background)]">
              <SelectGroup className="z-10">
                <SelectItem value="volunteer">Volunteer</SelectItem>
                <SelectItem value="user">User</SelectItem>
                <SelectItem value="admin">Admin</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
        <div className="flex flex-col space-y-1">
          <div className="w-full flex justify-end">
            <Button
              variant="default"
              type="submit"
              className="!px-6 w-fit !rounded-button whitespace-nowrap cursor-pointer"
            >
              Sign up
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

export default SignupForm; 