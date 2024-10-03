import { NextResponse, NextRequest } from 'next/server'
const { CohereClientV2 } = require('cohere-ai');
const cohereApiKey = process.env.COHERE_API_KEY
const cohere = new CohereClientV2({
    token: cohereApiKey,
  });

export async function POST(request: NextRequest) {
    if(request.method !== 'POST'){
        return NextResponse.json({ message: "Only POST requests allowed" }, {status: 405})
    }

    const body = await request.json();

    const { keywords } = body

    const prompt = `Write a short story of 750 words based on these 5 words: ${keywords.join(", ")}. Include the story name.`;

    try {
        const response = await cohere.chat({
            model: 'command-r-plus',
            messages: [
              {
                role: 'user',
                content: prompt,
              },
            ],
            max_tokens: 1000
          });
          

        // Extract the story from the response
        const story = response.message?.content?.[0]?.text || "No story generated.";
    
        return NextResponse.json({ story: story }, {status: 200})
    } catch (error) {
        console.error('Error generating story:', error)
        return NextResponse.json({ message: "Internal server error" }, {status: 500})
    }
}