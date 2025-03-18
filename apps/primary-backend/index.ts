import express from "express"
import prismaClient from "db/client"
import cors from "cors";
import { isUserAuthenticated } from "./middleware";
import { GoogleGenerativeAI } from "@google/generative-ai"
import { title_prompt } from "./prompt";

const app = express();
app.use(express.json());
app.use(cors());


app.post("/project", isUserAuthenticated, async (req, res) => {
    const { prompt } = req.body;
    if (!prompt) {
        res.status(411).json({
            message: "Invalid Inputs"
        })
        return;
    }
    const api_key = process.env.API_KEY!;
    const genAI = new GoogleGenerativeAI(api_key);
    const model = genAI.getGenerativeModel({
        model: "gemini-2.0-flash"
    })
    const session = model.startChat({
        history: [
            { role: "user", parts: [{ text: title_prompt }] }
        ]
    });
    const result = await session.sendMessage(prompt);
    await prismaClient.project.create({
        data: {
            description: result.response.text(),
            type: "REACT_NATIVE",
            userId: req.user.id
        }
    })
    res.json({
        message: "Project Created"
    })
})
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log("backen running")
})