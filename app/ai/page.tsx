import {
  BrainCircuit,
  CalendarDays,
  Camera,
  HeartHandshake,
  ImageUp,
  Map,
  MessageCircle,
  Mic,
  PenSquare,
  Sparkles,
  Swords,
} from "lucide-react";
import Link from "next/link";
import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const aiFeatures = [
  {
    icon: <MessageCircle size={28} className="text-primary-color" />,
    title: "AI Chat Assistant",
    slug: "chat-assistant",
    description:
      "Ask anything about Algeria in natural language. Get personalized guidance on places, activities, and culture.",
    comingSoon: false,
  },
  {
    icon: <Map size={28} className="text-primary-color" />,
    title: "AI-Powered Itinerary Generator",
    slug: "itinerary-generator",
    description:
      "Select your interests, budget, and travel duration to generate a customized daily itinerary.",
    comingSoon: false,
  },
  {
    icon: <HeartHandshake size={28} className="text-primary-color" />,
    title: "Volunteer Program Recommender",
    slug: "volunteer-recommender",
    description:
      "Take a quick quiz and get matched with volunteer programs that fit your personality and values.",
    comingSoon: false,
  },
  {
    icon: <Sparkles size={28} className="text-primary-color" />,
    title: "Smart Map Filters",
    slug: "smart-map-filters",
    description:
      "Use AI-powered filters on an interactive map to find exactly what you're looking for.",
    comingSoon: false,
  },
  {
    icon: <ImageUp size={28} className="text-primary-color" />,
    title: "Image-to-Trip",
    slug: "image-to-trip",
    description:
      "Upload a photo of a place you like, and our AI will suggest similar destinations in Algeria.",
    comingSoon: false,
  },
  {
    icon: <Swords size={28} className="text-primary-color" />,
    title: "AI-Powered Comparison Engine",
    slug: "comparison-engine",
    description:
      "Compare two destinations like 'Djanet vs. Tamanrasset' for a detailed breakdown of costs, climate, and vibes.",
    comingSoon: false,
  },
  {
    icon: <Mic size={28} className="text-primary-color" />,
    title: "Voice Chat for Accessibility",
    slug: "voice-chat",
    description:
      "Ask questions using your voice in Algerian Arabic or Tamazight. Ideal for elderly and rural users.",
    comingSoon: false,
  },
  {
    icon: <BrainCircuit size={28} className="text-primary-color" />,
    title: "Personalized Recommendations",
    slug: "personalized-recommendations",
    description:
      "Our AI learns your preferences and suggests new places and activities you're likely to love.",
    comingSoon: false,
  },
  {
    icon: <PenSquare size={28} className="text-primary-color" />,
    title: "AI Story Generator",
    slug: "story-generator",
    description:
      "Turn your travel photos into beautifully written stories, ready to be shared on social media.",
    comingSoon: false,
  },
  {
    icon: <CalendarDays size={28} className="text-primary-color" />,
    title: "AI Travel Calendar Optimizer",
    slug: "travel-calendar-optimizer",
    description:
      "Find the best time to travel based on weather, budget seasons, local festivals, and more.",
    comingSoon: false,
  },
];

const AiPage = () => {
  return (
    <div className="bg-[var(--background)] min-h-screen mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-[var(--text)] mb-4">
            AI-Powered Travel Tools
          </h1>
          <p className="text-lg text-[var(--text-muted)] max-w-3xl mx-auto">
            Explore Algeria like never before with our suite of intelligent tools.
            Powered by Gemini, these features help you plan, discover, and share
            your perfect journey.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {aiFeatures.map((feature, index) => (
            <Card
              key={index}
              className="bg-[var(--card-bg)] border-none rounded-xl shadow-lg hover:shadow-2xl transition-shadow duration-300 flex flex-col"
            >
              <CardHeader className="flex flex-row items-center gap-4 space-y-0 pb-4">
                <div className="bg-[var(--icon-bg)] p-3 rounded-full">
                  {feature.icon}
                </div>
                <CardTitle className="text-xl font-semibold text-[var(--text)]">
                  {feature.title}
                </CardTitle>
              </CardHeader>
              <CardContent className="flex-grow">
                <p className="text-[var(--text-muted)]">
                  {feature.description}
                </p>
              </CardContent>
              <div className="p-6 pt-0 mt-auto">
                <Link href={`/ai/${feature.slug}`} className="w-full">
                  <Button
                    className="w-full bg-[var(--button-primary)] text-[var(--button-text-primary)] hover:bg-opacity-90"
                  >
                    Launch
                  </Button>
                </Link>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AiPage;