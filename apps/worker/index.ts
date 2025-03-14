import express from "express"
import prismaClient from "db/client"
import cors from "cors";
import { GoogleGenerativeAI } from "@google/generative-ai"
import { systemPrompt } from "./SytemPrompt";
import { ArtifactParser } from "./parser";


const app = express();
app.use(cors());
app.use(express.json());


app.post("/prompt", async (req, res) => {
    const { prompt, projectId } = req.body;
    if (!prompt || !projectId) {
        res.status(411).json({
            message: "Invalid Inputs "
        })
        return;
    }
    const project = await prismaClient.project.findFirst({
        where: {
            Id: projectId
        }
    })
    if (!project) {
        res.status(404).json({
            message: "Project Not found"
        })
        return;
    }
    const allPrompts = await prismaClient.prompt.findMany({
        where: {
            projectId
        }
    })
    const promptHistory = allPrompts.map((prompts) => ({
        role: prompts.type == "USER" ? "user" : "model",
        parts: [{ text: prompts.content }]
    }))
    const apiKey = process.env.GEMINI_API_KEY!;
    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({
        model: "gemini-2.0-flash",
    });
    const chatSession = model.startChat({
        history: [
            {role : "user", parts : [{text : "Hello"}]},
            { role: "model", parts: [{ text: systemPrompt(project.type) }] },
            ...promptHistory,
        ],
    });
    const artifactProcessor = new ArtifactParser();
    const response = await chatSession.sendMessageStream(prompt);
    for await (const chunk of response.stream) {
        artifactProcessor.addText(chunk.text());
        artifactProcessor.parse();
    }
})

app.listen(process.env.PORT || 8081, () => {
    console.log("listening")
})