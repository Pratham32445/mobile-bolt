"use client";
import React, { useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import { Send } from "lucide-react";
import { Button } from "./ui/button";
import axios from "axios";

const Prompt = () => {
  const [prompt, setPrompt] = useState("");
  const createProject =async () => {
    await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/project`,{
      prompt
    },{
      headers : {
        Authorization : `Bearer ${}`
      }
    })
  }
  return (
    <div>
      <Textarea
        onChange={(e) => setPrompt(e.target.value)}
        autoFocus
        className="w-full h-32"
        placeholder="Create sudoku game..."
      />
      <div className="flex justify-end mt-5">
        <Button onClick={createProject}>
          <Send />
        </Button>
      </div>
    </div>
  );
};

export default Prompt;
