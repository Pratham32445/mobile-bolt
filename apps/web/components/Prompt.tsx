"use client";
import React, { useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "./ui/button";
import { Send } from "lucide-react";
import axios from "axios";

const Prompt = () => {
  const [prompt, setPrompt] = useState("");
  const createProject = async () => {
    const res = await axios.get("/api/token");
    await axios.post(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/project`,
      {
        prompt,
      },
      {
        headers: {
          Authorization: `Bearer ${res.data.jwt_token}`,
        },
      }
    );
  };
  return (
    <div>
      <Textarea
        className="h-32"
        autoFocus
        placeholder="Create a Minecraft Game..."
        onChange={(e) => setPrompt(e.target.value)}
      />
      <div className="flex justify-end mt-5">
        <Button className="cursor-pointer" onClick={createProject}>
          <Send />
        </Button>
      </div>
    </div>
  );
};

export default Prompt;
