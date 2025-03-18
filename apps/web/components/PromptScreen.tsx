import React from "react";
import { Textarea } from "@/components/ui/textarea";
import { Send } from "lucide-react";
import { Button } from "./ui/button";

const PromptScreen = () => {
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
          autoFocus
        />
      </div>
      <Button className="float-right">
        <Send />
      </Button>
    </div>
  );
};

export default PromptScreen;
