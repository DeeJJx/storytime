"use client";

import { useState, useEffect } from "react";
import StoryCard from "./StoryCard";

export default function GenerateStory() {
  const [keywords, setKeywords] = useState<string[]>(["", "", "", "", ""]);
  const [generatedStory, setGeneratedStory] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const placeholders = ["Red", "Truck", "Dog", "Tom", "Adventure"]
  const handleInputChange = (index: number, value: string) => {
    const updatedKeywords = [...keywords];
    updatedKeywords[index] = value;
    setKeywords(updatedKeywords);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    if (keywords.some((word) => word.trim() === "")) {
      alert("Please fill in all keyword fields");
      return;
    }

    const response = await fetch("/api/cohere", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ keywords }),
    });

    const data = await response.json();
    setGeneratedStory(data.story);
    setIsLoading(false);
  };

  const handleClear = () => {
    setKeywords(["", "", "", "", ""]);
    setGeneratedStory("");
  }

  return (
    <div className="container mx-auto p-6">
      <form onSubmit={handleSubmit}>
        <div className="flex items-center justify-center gap-8 flex-wrap">
            {keywords.map((keyword, index) => (
            <input
                key={index}
                type="text"
                value={keyword}
                onChange={(e) => handleInputChange(index, e.target.value)}
                placeholder={placeholders[index]}
                className="input input-bordered input-primary w-full max-w-xs"
                required
            />
            ))}
        </div>
        <div className="flex space-x-4 mt-4 items-center justify-center">
          <button type="submit" className="btn btn-primary">
            Generate Story
          </button>
          <button
            type="button"
            onClick={handleClear}
            className="btn btn-outline"
          >
            Clear
          </button>
        </div>
      </form>
    {isLoading && <h3>Furiously typing away...</h3>}
    <StoryCard generatedStory={generatedStory} />
    </div>
  );
}
