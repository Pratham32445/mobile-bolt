"use client";
import React, { useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import { Send } from "lucide-react";
import { Button } from "./ui/button";
import { toast } from "sonner";
import { useSession } from "next-auth/react";
import axios from "axios";

const PromptScreen = () => {
  const [prompt, setPrompt] = useState("");
  const data = useSession();
  const createProject = async () => {
    if (data && prompt.length > 0) {
      const res = await axios.get("/api/auth/token");
      const project = await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/project`,
        { prompt },
        {
          headers: {
            Authorization: `Bearer ${res.data.token}`,
          },
        }
      );
      console.log(project);
    } else {
      toast.error("Please write your prompt");
    }
  };
  return (
    <div className="max-w-xl m-auto pt-32">
      <div>
        <p className="text-2xl font-bold text-center">
          What did you want to build today ?
        </p>
        <Textarea
          className="my-4 h-28 resize-none"
          placeholder="Create a News App in React Native"
          rows={15}
          onChange={(e) => setPrompt(e.target.value)}
          autoFocus
        />
      </div>
      <Button onClick={createProject} className="float-right">
        <Send />
      </Button>
    </div>
  );
};

export default PromptScreen;
