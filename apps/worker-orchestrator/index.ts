import express from "express";
import { DescribeAutoScalingInstancesCommand, AutoScalingClient, SetDesiredCapacityCommand } from "@aws-sdk/client-auto-scaling"
import { DescribeInstancesCommand, EC2Client } from "@aws-sdk/client-ec2"

const app = express();
app.use(express.json());

const client = new AutoScalingClient({
    region: "ap-south-1",
    credentials: {
        accessKeyId: process.env.ACCESS_KEY!,
        secretAccessKey: process.env.SECRET_ACCESS_KEY!
    }
})

const ec2Client = new EC2Client({
    region: "ap-south-1",
    credentials: {
        accessKeyId: process.env.ACCESS_KEY!,
        secretAccessKey: process.env.SECRET_ACCESS_KEY!
    }
})

type Machine = {
    ip: string;
    isUsed: boolean;
}

const ALL_MACHINES: Machine[] = [];

async function getAssignedMachines() {
    const cmd = new DescribeAutoScalingInstancesCommand();
    const data = await client.send(cmd);
    const ec2InstanceCmd = new DescribeInstancesCommand({
        InstanceIds: data.AutoScalingInstances?.map((x => x.InstanceId!))
    });
    const ec2Data = await ec2Client.send(ec2InstanceCmd);
    ec2Data.Reservations?.forEach((instance) => {
        const publicIp = instance!.Instances![0].PublicIpAddress;
        const res = ALL_MACHINES.find((machine) => machine.ip == publicIp);
        if (!res) ALL_MACHINES.push({
            ip: publicIp!,
            isUsed: false
        })
    });
}

setInterval(() => { 
    getAssignedMachines();
}, 10 * 1000)


app.get("/get-machine/:proectId", (req, res) => {
    const idleMachines = ALL_MACHINES.find(x => x.isUsed == false);
    if (!idleMachines) {
        return;
    }
    idleMachines.isUsed = true;
    res.send({
        ip: idleMachines.ip
    })
})

const PORT = process.env.PORT || 8082;

app.listen(PORT, () => {
    console.log("running")
})