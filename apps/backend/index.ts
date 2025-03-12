import express from "express"
import prismaClient from "db/client"
import cors from "cors";

const app = express();

app.use(cors());
app.use(express.json());

const USER_ID = "abc";

app.post("/project", async (req, res) => {
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
            userId: USER_ID
        }
    })
    res.json({
        message: "Project Created",
        project
    })
})

app.get("/projects", async (req, res) => {
    const projects = await prismaClient.project.findMany({
        where: {
            userId: USER_ID
        }
    })
    res.json({
        projects
    })
})