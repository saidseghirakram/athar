"use client";

import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { ImageUp, Sparkles } from "lucide-react";
import Image from "next/image";
import React, { useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

const ImageToTripPage = () => {
  const [image, setImage] = useState<File | null>(null);
  const [preview, setPreview] =useState<string | null>(null);
  const [prompt, setPrompt] = useState(
    "Suggest 3 similar destinations in Algeria for a trip, including the nearest major city and why it's a good match."
  );
  const [response, setResponse] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setImage(file);
      setPreview(URL.createObjectURL(file));
      setError("");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!image || !prompt) {
      setError("Please upload an image and provide a prompt.");
      return;
    }

    setIsLoading(true);
    setResponse("");
    setError("");

    const formData = new FormData();
    formData.append("image", image);
    formData.append("prompt", prompt);

    try {
      const res = await fetch("/api/ai/image-to-trip", {
        method: "POST",
        body: formData,
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.details || "Failed to get response from AI");
      }

      const data = await res.json();
      setResponse(data.response);
    } catch (err: any) {
      setError(err.message || "An unexpected error occurred.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-12 mt-16">
      <div className="text-center mb-10">
        <h1 className="text-4xl md:text-5xl font-bold text-[var(--text)] mb-4">
          Image-to-Trip
        </h1>
        <p className="text-lg text-[var(--text-muted)] max-w-2xl mx-auto">
          Upload a photo of a place you love, and let our AI suggest similar
          destinations in Algeria for your next adventure.
        </p>
      </div>

      <div className="bg-[var(--card-bg)] p-8 rounded-2xl shadow-lg">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label
              htmlFor="image-upload"
              className="cursor-pointer block w-full border-2 border-dashed border-[var(--primary-color)] rounded-xl text-center p-8 hover:bg-[var(--card-bg-hover)] transition-colors"
            >
              {preview ? (
                <div className="relative w-full h-64">
                    <Image src={preview} alt="Image preview" layout="fill" objectFit="contain" className="rounded-lg"/>
                </div>
              ) : (
                <div className="flex flex-col items-center gap-2 text-[var(--text)]">
                  <ImageUp className="w-10 h-10 text-[var(--primary-color)]" />
                  <span className="font-semibold">
                    Click to upload an image
                  </span>
                  <p className="text-sm text-[var(--text-muted)]">
                    PNG, JPG, or WEBP
                  </p>
                </div>
              )}
            </label>
            <input
              id="image-upload"
              type="file"
              accept="image/png, image/jpeg, image/webp"
              className="hidden"
              onChange={handleImageChange}
            />
          </div>

          <div>
            <label htmlFor="prompt" className="block text-lg font-semibold text-[var(--text)] mb-2">
              Your Request
            </label>
            <Textarea
              id="prompt"
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="e.g., 'Find places like this for a peaceful vacation'"
              rows={3}
              className="w-full bg-white border-[var(--input-border)] focus-visible:ring-1 focus-visible:ring-[var(--primary-color)]"
            />
          </div>

          <Button
            type="submit"
            disabled={isLoading || !image}
            className="w-full text-lg py-6 bg-[var(--button-primary)] text-[var(--button-text-primary)] hover:bg-opacity-90 flex items-center gap-2"
          >
            {isLoading ? (
              "Analyzing..."
            ) : (
              <>
                <Sparkles size={20}/>
                Generate Suggestions
              </>
            )}
          </Button>
          {error && <p className="text-[var(--error)] text-center">{error}</p>}
        </form>
      </div>
      
      {isLoading && (
         <div className="text-center p-10">
            <div className="flex justify-center items-center space-x-2">
                <span className="w-3 h-3 bg-[var(--primary-color)] rounded-full animate-pulse delay-75"></span>
                <span className="w-3 h-3 bg-[var(--primary-color)] rounded-full animate-pulse delay-200"></span>
                <span className="w-3 h-3 bg-[var(--primary-color)] rounded-full animate-pulse delay-300"></span>
            </div>
            <p className="mt-4 text-[var(--text-muted)]">Dahman is thinking...</p>
         </div>
      )}

      {response && (
        <div className="mt-10 bg-white p-8 rounded-2xl shadow-lg border">
          <h2 className="text-2xl font-bold text-[var(--text)] mb-4">AI Suggestions</h2>
          <div className="prose prose-sm max-w-none text-current">
            <ReactMarkdown remarkPlugins={[remarkGfm]}>{response}</ReactMarkdown>
          </div>
        </div>
      )}
    </div>
  );
};

export default ImageToTripPage; 