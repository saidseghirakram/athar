/** @format */

import { Check, CircleCheck } from "lucide-react";
import React from "react";

interface ContactProps {
  name: string;
  email: string;
  subject: string;
  content: string;
}

const ContactSuccessCard: React.FC<ContactProps> = ({
  name,
  email,
  subject,
}) => {
  return (
    <div className="max-w-[28rem] mx-auto bg-[var(--background)] rounded-xl shadow-[0_4px_20px_rgba(0,0,0,0.05)] overflow-hidden border border-[var(--input-border)]">
      <div className="p-8">
        {/* Header with checkmark */}
        <div className="flex items-center mb-6">
          <div className="shrink-0 bg-[var(--icon-bg)] p-3 rounded-full">
            <Check className="w-5 h-5 text-[var(--icon-color)]" />
          </div>
          <div className="ml-4">
            <h2 className="text-2xl font-bold text-[var(--foreground)] m-0">
              Message Sent Successfully!
            </h2>
            <p className="text-[var(--text-muted)] mt-1 mb-0">
              Thank you for reaching out, {name}.
            </p>
          </div>
        </div>

        {/* Message details */}
        <div className="relative overflow-hidden border-l-4 border-[var(--background)] bg-[var(--background)]  text-[var(--text)] rounded-xl shadow-lg p-6">
          <h3 className="text-[1.125rem] font-medium text-[var(--primary-color)] mb-3">
            Your Message Details
          </h3>
          <div className="grid gap-2">
            <div className="flex gap-x-2 flex-wrap">
              <span className="text-[var(--text-muted)] font-medium w-20">
                Email:
              </span>
              <span className="text-[var(--text)]">{email}</span>
            </div>
            <div className="flex gap-x-2 flex-wrap">
              <span className="text-[var(--text-muted)] font-medium w-20">
                Subject:
              </span>
              <span className="text-[var(--text)]">
                {subject || "No subject"}
              </span>
            </div>
          </div>
        </div>

        {/* Next steps */}
        {/* <div className="bg-[var(--background)] p-6 rounded-md mt-6">
          <h3 className="text-[1.125rem] font-medium text-[var(--primary-color)] mb-3">
            What's Next?
          </h3>
          <ul className="list-none p-0 m-0 grid gap-2">
            <li className="flex items-start">
              <CircleCheck className="w-5 h-5 text-[var(--primary-color)] mt-1 mr-2 shrink-0" />
              <span className="text-[var(--text)]">
                I'll review your message and respond shortly
              </span>
            </li>
            <li className="flex items-start">
              <CircleCheck className="w-5 h-5 text-[var(--primary-color)] mt-1 mr-2 shrink-0" />
              <span className="text-[var(--text)]">
                Typical response time: 24–48 hours
              </span>
            </li>
            <li className="flex items-start">
              <CircleCheck className="w-5 h-5 text-[var(--primary-color)] mt-1 mr-2 shrink-0" />
              <span className="text-[var(--text)]">
                Check spam folder if you don't see my reply
              </span>
            </li>
          </ul>
        </div> */}

        {/* Action button */}
        <div className="mt-8 text-center">
          <button
            className="px-6 py-2 bg-[var(--button-primary)] text-[var(--button-text-primary)] font-medium rounded-md cursor-pointer transition-colors text-base leading-6 hover:bg-[var(--input-focus)] focus-visible:ring-2 focus-visible:ring-[var(--primary-color)]"
            onClick={() => window.location.reload()}
          >
            Send Another Message
          </button>
        </div>
      </div>
    </div>
  );
};

export default ContactSuccessCard;
