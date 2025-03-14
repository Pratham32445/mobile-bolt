import express from "express"
import prismaClient from "db/client"
import cors from "cors";
import { authMiddleware } from "./middleware";

const app = express();

app.use(cors());
app.use(express.json());


app.post("/project",authMiddleware, async (req, res) => {
    console.log("calling")
    const { prompt } = req.body;
    if (!prompt) {
        res.json(401).json({
            message: "Please Provide Prompt"
        })
        return;
    }
    const project = await prismaClient.project.create({
        data: {
            description: prompt.split(" ")[1],
            userId: req.userId!
        }
    })
    res.json({
        message: "Project Created",
        project
    })
})

app.get("/projects", authMiddleware, async (req, res) => {
    const projects = await prismaClient.project.findMany({
        where: {
            userId: req.userId!
        }
    })
    res.json({
        projects
    })
})

app.listen(process.env.PORT || 8080,()=>{
    console.log("listening")
})