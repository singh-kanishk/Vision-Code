import express from "express";
import type { Request, Response } from "express";
import ollama from "ollama";

export const apiRouter = express.Router();

// Using the E4B model as requested
const MODEL_NAME = "gemma4:e4b";

apiRouter.post('/generate', async (req: Request, res: Response) => {
  const { prompt, image } = req.body; 

  try {
    const systemInstruction = `You are an elite UX/UI Designer and Expert React Developer.
Your task is to analyze a wireframe/sketch and transform it into a production-ready React component.

CORE DIRECTIVES:
1. Interpret intent: Replace 'X' boxes with realistic placeholders (e.g. <img> with src="https://placehold.co/600x400").
2. Replace squiggly lines with realistic, context-appropriate placeholder text.
3. Scale the UI: Use realistic padding (p-8) and modern Tailwind aesthetics (rounded-xl, shadow-md).

TECHNICAL CONSTRAINTS:
- Framework: React with TypeScript (TSX). Functional component with default export.
- Styling: Tailwind CSS ONLY.
- Icons: Use 'lucide-react' (e.g., <Home className="w-5 h-5" />).
- Output: Raw code ONLY. No markdown backticks, no explanations.`;

    // Gemma 4 handles images via the 'images' array in the message object.
    // Ensure the image string from the frontend is stripped of the data URI prefix if present.
    const base64Image = image?.split(',')[1] || image;

    const response = await ollama.chat({
      model: MODEL_NAME,
      messages: [
        {
          role: 'system',
          content: systemInstruction,
        },
        {
          role: 'user',
          content: `User Requirement: ${prompt || "Build the UI exactly as shown in the sketch."}`,
          images: base64Image ? [base64Image] : [],
        },
      ],
      options: {
        temperature: 0.1, // Keep it deterministic for code generation
      },
    });

    let cleanCode = response.message.content;

    // Safety regex to remove markdown blocks if the model ignores system instructions
    cleanCode = cleanCode
      .replace(/^```(tsx|typescript|jsx|javascript)?\n/i, '')
      .replace(/```$/i, '')
      .trim();

    res.json({
      body: cleanCode,
      success: true,
    });

  } catch (error) {
    console.error("Local AI Generation Error:", error);
    res.status(500).json({
      body: `Error generating code via Gemma 4: ${error instanceof Error ? error.message : 'Unknown error'}`,
      success: false,
    });
  }
});

// import express from "express";
// import type { Request, Response } from "express";
// import { ChatGoogleGenerativeAI } from "@langchain/google-genai"
// import { HumanMessage, SystemMessage } from "@langchain/core/messages";
// import { Ollama } from "ollama";

// export const apiRouter = express.Router();

// const isLocalHosted=true
// const googleApiKey = process.env.GOOGLE_API_KEY;
// // Note: 'gemini-2.5-pro' is vastly superior to 'flash' for complex coding and vision tasks
// const modelName = process.env.GOOGLE_MODEL || "gemini-2.5-flash" 

// const model = new ChatGoogleGenerativeAI({ 
//   model: modelName, 
//   // Lowered temperature to 0.1. Code generation requires deterministic logic, 
//   // 0.7 is too creative and will result in hallucinations or broken syntax.
//   temperature: 0.1, 
//   apiKey: googleApiKey
// });

// apiRouter.post('/generate', async (req: Request, res: Response) => {
//     const { prompt, image } = req.body; 
    
//     try {
//         if (!googleApiKey) {
//             res.status(500).json({
//                 body: "Missing GOOGLE_API_KEY in backend environment.",
//                 success: false
//             });
//             return;
//         }

//        const systemInstruction = `You are an elite UX/UI Designer and Expert React Developer.
// Your task is to analyze a hand-drawn wireframe/sketch and the user's text prompt, and transform them into a production-ready, highly polished React component.

// CORE DIRECTIVES:
// 1. Interpret intent, don't just copy literal lines. If you see a box with an 'X' or an image icon, output a realistic image placeholder (e.g., an <img> tag with src="https://placehold.co/600x400" or a beautiful gradient background), NOT a tiny grey square.
// 2. Replace squiggly lines with realistic, context-appropriate placeholder text (e.g., use actual sentences, titles, or paragraphs instead of generating empty <div> bars).
// 3. Scale the UI appropriately. If a box takes up half the canvas, make it take up half the screen in CSS (e.g., w-1/2 or flex-1). Use realistic padding (p-6, p-8) and gaps (gap-4).

// TECHNICAL CONSTRAINTS:
// - Framework: React with TypeScript (TSX). Use functional components with a default export.
// - Styling: Tailwind CSS ONLY. Use modern aesthetics (rounded corners 'rounded-xl', soft shadows 'shadow-md', subtle borders, and good typography spacing).
// - Responsiveness: Ensure the component is responsive. Use Tailwind breakpoints (sm:, md:, lg:) where appropriate to stack elements on smaller screens.
// - Icons: If icons are needed, assume 'lucide-react' is installed (e.g., <Home className="w-5 h-5 text-gray-500" />).
// - Output: DO NOT wrap the code in markdown blocks (no \`\`\`tsx). DO NOT include greetings, explanations, or any text other than the raw code.`;

//         //  Construct the Multimodal Array
//         // We separate the System rules from the Human request
//         const messages = [
//             new SystemMessage(systemInstruction),
//             new HumanMessage({
//                 content: [
//                     {
//                         type: "text",
//                         text: `User Requirement: ${prompt || "Build the UI exactly as shown in the sketch."}`
//                     },
//                     // Dynamically inject the image only if it was successfully captured
//                     ...(image ? [{
//                         type: "image_url",
//                         image_url: { url: image }
//                     }] : [])
//                 ]
//             })
//         ];

//         //  Invoke the model directly with the message array
//         const response = await model.invoke(messages);
        

//         // Even if we tell the AI not to use markdown, it sometimes disobeys. 
//         // This regex ensures you don't render ```tsx on your frontend UI.
//         let cleanCode = response.content.toString();
//         cleanCode = cleanCode.replace(/^```(tsx|typescript|jsx|javascript)?\n/i, '').replace(/```$/i, '').trim();

//         res.json({
//             body: cleanCode,
//             success: true
//         });
//     } catch (error) {
//         console.error("AI Generation Error:", error);
//         res.status(500).json({
//             body: `Error generating code: ${error instanceof Error ? error.message : 'Unknown error'}`,
//             success: false
//         });
//     }
// });