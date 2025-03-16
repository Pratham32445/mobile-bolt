import express from "express"
import prismaClient from "db/client"
import { GoogleGenerativeAI } from "@google/generative-ai"
import { systemPrompt } from "./systemPrompt";

const app = express();
app.use(express.json())

app.post("/prompt", async (req, res) => {
    const { projectId, prompt } = req.body;
    if (!projectId) {
        res.status(411).json({
            message: "Invalid Inputs"
        })
        return;
    }
    const project = await prismaClient.project.findFirst({
        where: {
            Id: projectId
        }
    })
    console.log(project);
    if (!project) {
        res.status(404).json({
            message: "Project not found"
        })
        return;
    }
    // AI work
    const api_key = process.env.API_KEY!;
    const genAI = new GoogleGenerativeAI(api_key);
    const model = genAI.getGenerativeModel({
        model: "gemini-2.0-flash"
    })
    const allPrompts = await prismaClient.prompt.findMany({
        where: {
            projectId
        }
    })
    const chatHistory = allPrompts.map((prompt) => ({
        role: prompt.type == "USER" ? "user" : "model",
        parts: [{ text: prompt.content }]
    }))
    const session = model.startChat({
        history: [
            { role: "user", parts: [{ text: "Hello" }] },
            {role : "model",parts : [{text : systemPrompt(project.type)}]},
            ...chatHistory,
        ]
    })
    const newPrompt = await session.sendMessageStream(prompt);
    for await (const chunk of newPrompt.stream) {
        console.log(chunk.text());
    }
    res.json({
        message  : "passsing"
    })
})

const PORT = process.env.PORT || 8081; 
app.listen(PORT,() => {
    console.log("worker running")
})