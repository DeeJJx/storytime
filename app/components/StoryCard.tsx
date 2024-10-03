import { useState, useEffect } from "react";

interface StoryCardProps {
    generatedStory: string;
  }

export default function StoryCard({generatedStory}: StoryCardProps): JSX.Element {

  return (
    <>
      {generatedStory && (
        <div className="mt-8">
          <h2 className="text-2xl font-bold mb-4">Generated Story</h2>
          <p className="whitespace-pre-line bg-gray-100 p-4 rounded-lg">
            {generatedStory}
          </p>
        </div>
      )}
    </>
  );
}
