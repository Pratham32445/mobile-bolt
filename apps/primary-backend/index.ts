import express from "express"
import prismaClient from "db/client"

const app = express();
app.use(express.json());

const USER_ID = "197fd101-49c9-4afc-a589-801af034e191"

app.post("/project", async (req, res) => {
    const { description, type } = req.body;
    if (!description || !type) {
        res.status(411).json({
            message: "Invalid Inputs"
        })
        return;
    }
    await prismaClient.project.create({
        data: {
            description,
            type,
            userId: USER_ID
        }
    })
    res.json({
        message: "Project Created"
    })
})
const PORT = process.env.PORT || 8080; 
app.listen(PORT,() => {
    console.log("backen running")
})