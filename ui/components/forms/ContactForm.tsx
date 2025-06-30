/** @format */

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

import { useState } from "react";
// import { FaPaperPlane } from "react-icons/fa6";
import Spinner from "../../shared/Spinner";
import ContactSuccessCard from "../cards/ContactSuccessCard";
import { Send } from "lucide-react";
import { Label } from "@/components/ui/label";
import { ContactProps } from "@/domain/contactProps";
import { ResponseData } from "@/domain/response";

const initValidation = {
  name: [],
  email: [],
  subject: [],
  content: [],
};
const ContactForm = () => {
  const [loading, setLoading] = useState(false);

  const [data, setData] = useState<ContactProps | null>(null);

  const [error, setError] = useState<string | null>(null);

  const [success, setSuccess] = useState<boolean>(false);

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
      name: formData.get("name") as string,
      email: formData.get("email") as string,
      subject: formData.get("subject") as string,
      content: formData.get("content") as string,
    };

    try {
      const res = await fetch("/api/send-email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const data = (await res.json()) as ResponseData;

      if (res.ok) {
        setSuccess(true);
        setError(null);
        setData(data.data);
      } else {
        if (data.errors != null) {
          setValidationMsgs(data.errors!);
        }
        setError(data.message || "Something went wrong.");
      }
    } catch (err) {
      setError("Failed to send message. Try again later.");
    } finally {
      setLoading(false);
    }
  };

  return success ? (
    <ContactSuccessCard
      name={data?.name!}
      email={data?.email!}
      subject={data?.subject!}
      content={data?.content!}
    />
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
        </div>
        <div className="space-y-2">
          <Label htmlFor="subject">Subject</Label>
          <Input
            id="subject"
            name="subject"
            placeholder="Subject"
            onFocus={() => handleFocus("subject")}
            error={validationMsgs?.subject?.[0]}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="message">Message</Label>
          <Textarea
            id="message"
            name="content"
            placeholder="Your message"
            onFocus={() => handleFocus("content")}
            error={validationMsgs?.content?.[0]}
            rows={5}
          />
        </div>
        <div className="flex flex-col space-y-1">
          <Button
            variant="default"
            type="submit"
            className="w-full !rounded-button whitespace-nowrap cursor-pointer"
          >
            Send Message
            {loading ? (
              <Spinner className="fill-[var(--background)]" />
            ) : (
              <Send className="ml-2" />
            )}
          </Button>
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

export default ContactForm;
